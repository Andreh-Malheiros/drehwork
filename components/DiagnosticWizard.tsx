"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { objectives, whatsappUrl } from "@/content/site";
import { submitDiagnostic } from "@/lib/diagnostic-service";
import { DIAGNOSTIC_FIELDS, MAX_FIELD_LENGTH, type DiagnosticField } from "@/lib/diagnostic-schema";
import { track } from "@/lib/analytics";
import { FIELD_MASKS } from "@/lib/masks";

type Answers = Record<string, string | boolean>;
type Status = "editing" | "sending" | "sent";
const STORAGE = "dreh:diagnostic:v1";
const steps = [
  { id: "company", title: "Sobre a empresa", fields: [["company", "Nome da empresa", "text"], ["responsible", "Seu nome", "text"], ["segment", "Segmento", "select"]] },
  { id: "location", title: "Onde a empresa atua?", fields: [["city", "Cidade", "text"], ["state", "Estado", "select"]] },
  { id: "presence", title: "Presença atual", fields: [["hasSite", "A empresa possui site?", "select"], ["siteUrl", "Endereço do site (se existir)", "text"], ["instagram", "Instagram (opcional)", "text"], ["googleProfile", "Possui Google Perfil da Empresa? (opcional)", "select"]] },
  { id: "need", title: "O que precisa mudar?", fields: [["situation", "Situação atual", "select"], ["objective", "Principal objetivo", "select"], ["solution", "Solução de interesse", "select"], ["timeline", "Prazo desejado (opcional)", "text"]] },
  { id: "contact", title: "Como podemos responder?", fields: [["whatsapp", "WhatsApp com DDD", "tel"], ["email", "E-mail", "email"], ["period", "Melhor período para contato", "select"], ["reply", "Preferência de resposta", "select"]] },
] as const;
const options: Record<string, readonly string[]> = {
  hasSite: ["Não", "Sim", "Vendo só pelo Instagram ou WhatsApp", "Tenho loja em outra plataforma"], googleProfile: ["Não", "Sim", "Não sei"],
  segment: ["Comércio local", "Prestação de serviços", "Moda e vestuário", "Loja virtual / e-commerce", "Saúde e bem-estar", "Jurídico e consultoria", "Alimentação", "Indústria", "Educação", "Outro"],
  state: ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"],
  situation: ["Ainda não temos um site", "Nosso site está desatualizado", "O site não transmite profissionalismo", "O site não gera contatos", "Dependemos muito do Instagram", "Não aparecemos adequadamente no Google", "Precisamos divulgar um serviço", "Precisamos de uma loja", "Precisamos melhorar uma loja Shopify", "Não sabemos exatamente o que precisa mudar"],
  objective: objectives, solution: ["Site profissional", "Landing page", "Reformulação", "Loja Shopify", "Consultoria de e-commerce", "Presença digital", "Automação de processos", "Manutenção", "Ainda não sei"],
  period: ["Manhã", "Tarde"], reply: ["WhatsApp", "E-mail"],
};
const serviceToSolution: Record<string, string> = { "sites-profissionais": "Site profissional", "landing-pages": "Landing page", "reformulacao-de-sites": "Reformulação", "lojas-shopify": "Loja Shopify", "presenca-digital": "Presença digital", "automacao-de-processos": "Automação de processos", "manutencao": "Manutenção" };
const isRequired = (id: string) => DIAGNOSTIC_FIELDS[id as DiagnosticField]?.required ?? false;
const save = (step: number, answers: Answers) => { try { localStorage.setItem(STORAGE, JSON.stringify({ step, answers })); } catch { /* private mode */ } };

export function DiagnosticWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState("");
  const [invalid, setInvalid] = useState<string[]>([]);
  const [fallback, setFallback] = useState(false);
  const [status, setStatus] = useState<Status>("editing");
  const [ready, setReady] = useState(false);
  const started = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE) || "null");
        if (saved) { setStep(saved.step || 0); setAnswers(saved.answers || {}); }
        const q = new URLSearchParams(location.search).get("objetivo");
        const solution = q ? serviceToSolution[q] : undefined;
        if (solution) setAnswers(a => ({ ...a, solution }));
      } catch { /* ignore corrupted draft */ } finally { setReady(true); }
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => { if (ready && status === "editing") save(step, answers); }, [step, answers, ready, status]);
  useEffect(() => {
    if (!ready) return;
    heading.current?.focus({ preventScroll: true });
    // Keep the new step in view below the fixed header when the visitor had scrolled past its top.
    const wizard = heading.current?.closest(".wizard");
    if (wizard && wizard.getBoundingClientRect().top < 0) wizard.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [step, status, ready]);

  const current = steps[step];
  const progress = Math.round(((step + 1) / (steps.length + 1)) * 100);
  const required = useMemo(() => current?.fields.map(([id]) => id).filter(isRequired) || [], [current]);

  function update(id: string, value: string | boolean) {
    if (!started.current) { started.current = true; track("diagnostic_start"); }
    setAnswers(a => ({ ...a, [id]: typeof value === "string" ? value.slice(0, MAX_FIELD_LENGTH) : value }));
    setError(""); setFallback(false); setInvalid(list => list.filter(field => field !== id));
  }
  function next() {
    const missing = required.filter(id => !String(answers[id] || "").trim());
    if (missing.length) {
      const labels = current.fields.filter(([id]) => missing.includes(id)).map(([, label]) => label);
      setInvalid(missing); setError(`Preencha: ${labels.join(", ")}.`); track("diagnostic_validation_error", { step: step + 1 }); return;
    }
    setInvalid([]); setStep(step + 1); track("diagnostic_step_forward", { step: step + 1 });
  }
  function back() { setStep(Math.max(0, step - 1)); setError(""); setInvalid([]); track("diagnostic_step_back", { step }); }
  function restart() { try { localStorage.removeItem(STORAGE); } catch { /* ignore */ } setAnswers({}); setStep(0); setStatus("editing"); setError(""); }
  async function submit() {
    if (!answers.consent) { setError("Confirme a ciência da Política de Privacidade para enviar."); return; }
    setStatus("sending"); setError("");
    const result = await submitDiagnostic({ ...answers });
    if (result.ok) {
      setStatus("sent"); track("diagnostic_submit", { solution: String(answers.solution || "") });
      try { localStorage.removeItem(STORAGE); } catch { /* ignore */ }
      return;
    }
    setStatus("editing"); setError(result.error); setFallback(result.fallback);
    track("diagnostic_submit_error", { reason: result.fallback ? "service" : "validation" });
  }

  const whatsappFallback = whatsappUrl(`um diagnóstico para ${String(answers.company || "minha empresa")}: ${String(answers.solution || "presença digital")}`);

  if (status === "sent") return <div className="wizard complete" aria-live="polite">
    <p className="kicker">Diagnóstico recebido</p>
    <h2 ref={heading} tabIndex={-1}>Obrigado, {String(answers.responsible || "").split(" ")[0] || "recebemos suas respostas"}.</h2>
    <p>Suas respostas chegaram à DrehWork. A análise inicial será enviada por {answers.reply === "E-mail" ? "e-mail" : "WhatsApp"}, no período que você indicou.</p>
    <div className="button-row"><a className="button primary" target="_blank" rel="noreferrer" href={whatsappFallback}>Adiantar a conversa no WhatsApp</a><Link className="text-link" href="/projetos">Ver portfólio</Link></div>
  </div>;

  if (step >= steps.length) return <div className="wizard">
    <div className="progress" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso do diagnóstico"><span style={{ width: "100%" }} /></div>
    <p className="kicker">Revisão</p>
    <h2 ref={heading} tabIndex={-1}>Confira suas respostas</h2>
    <dl className="summary">{(Object.keys(DIAGNOSTIC_FIELDS) as DiagnosticField[]).filter(key => answers[key]).map(key => <div key={key}><dt>{DIAGNOSTIC_FIELDS[key].label}</dt><dd>{String(answers[key])}</dd></div>)}</dl>
    <label className="honeypot" aria-hidden="true">Site<input tabIndex={-1} autoComplete="off" value={String(answers.website || "")} onChange={e => update("website", e.target.value)} /></label>
    <label className="consent"><input type="checkbox" checked={Boolean(answers.consent)} onChange={e => update("consent", e.target.checked)} /> <span>Li a <Link href="/politica-de-privacidade" target="_blank">Política de Privacidade</Link> e estou ciente de que estes dados serão usados para responder à minha solicitação.</span></label>
    {error && <p className="form-error" role="alert">{error}{fallback ? <> <a href={whatsappFallback} target="_blank" rel="noreferrer">Enviar pelo WhatsApp</a>.</> : null}</p>}
    <div className="wizard-actions"><button type="button" className="button secondary" onClick={back} disabled={status === "sending"}>Voltar</button><button type="button" className="button primary" onClick={submit} disabled={status === "sending"} aria-busy={status === "sending"}>{status === "sending" ? "Enviando…" : "Enviar diagnóstico"}</button></div>
  </div>;

  return <form className="wizard" onSubmit={event => { event.preventDefault(); next(); }} noValidate>
    <div className="progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso do diagnóstico"><span style={{ width: `${progress}%` }} /></div>
    <p className="kicker">Etapa {step + 1} de {steps.length}</p>
    <h2 ref={heading} tabIndex={-1}>{current.title}</h2>
    <div className="form-grid">{current.fields.map(([id, label, type]) => <label key={id}><span className="field-label">{label}{isRequired(id) ? <span className="field-required" aria-hidden> *</span> : null}</span>{type === "select"
      ? <select value={String(answers[id] || "")} aria-invalid={invalid.includes(id) || undefined} aria-describedby={invalid.includes(id) ? "wizard-error" : undefined} onChange={e => update(id, e.target.value)} required={isRequired(id)}><option value="">Selecione</option>{(options[id] || []).map(opt => <option key={opt}>{opt}</option>)}</select>
      : <input type={type} value={String(answers[id] || "")} aria-invalid={invalid.includes(id) || undefined} aria-describedby={invalid.includes(id) ? "wizard-error" : undefined} onChange={e => update(id, (FIELD_MASKS[id] ?? String)(e.target.value))} inputMode={({ whatsapp: "tel", email: "email", siteUrl: "url" } as Record<string, "tel" | "email" | "url">)[id]} placeholder={({ whatsapp: "(31) 99999-9999", state: "MG", instagram: "@suaempresa", siteUrl: "www.suaempresa.com.br", email: "voce@empresa.com" } as Record<string, string>)[id]} maxLength={MAX_FIELD_LENGTH} required={isRequired(id)} autoComplete={({ responsible: "name", email: "email", whatsapp: "tel", company: "organization", city: "address-level2", state: "address-level1", siteUrl: "url" } as Record<string, string>)[id]} />}</label>)}</div>
    {error && <p className="form-error" id="wizard-error" role="alert">{error}</p>}
    <div className="wizard-actions">{step > 0 && <button type="button" className="button secondary" onClick={back}>Voltar</button>}<button type="submit" className="button primary">Continuar</button><button type="button" className="text-link" onClick={restart}>Recomeçar</button></div>
    <p className="review-note">Seu progresso fica salvo neste navegador até o envio. Prefere ir direto ao ponto? <a href={whatsappUrl("um diagnóstico da minha presença digital")} target="_blank" rel="noreferrer">Fale pelo WhatsApp</a>.</p>
  </form>;
}
