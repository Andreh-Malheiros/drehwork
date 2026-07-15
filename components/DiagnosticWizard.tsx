"use client";

import { useEffect, useMemo, useState } from "react";
import { brand, objectives } from "@/content/site";
import { submitDiagnosticDemo } from "@/lib/diagnostic-service";
import { track } from "@/lib/analytics";

type Answers = Record<string, string | boolean>;
const STORAGE = "dreh:diagnostic:v1";
const steps = [
  { id: "company", title: "Sobre a empresa", fields: [["company", "Nome da empresa", "text"], ["responsible", "Nome do responsável", "text"], ["segment", "Segmento", "text"]] },
  { id: "location", title: "Onde a empresa atua?", fields: [["city", "Cidade", "text"], ["state", "Estado", "text"]] },
  { id: "presence", title: "Presença atual", fields: [["hasSite", "A empresa possui site?", "select"], ["siteUrl", "Endereço do site (se existir)", "url"], ["instagram", "Instagram (opcional)", "text"], ["googleProfile", "Possui Google Perfil da Empresa?", "select"]] },
  { id: "need", title: "O que precisa mudar?", fields: [["situation", "Situação atual", "selectSituation"], ["objective", "Principal objetivo", "selectObjective"], ["solution", "Solução de interesse", "selectSolution"], ["timeline", "Prazo desejado", "text"]] },
  { id: "contact", title: "Como a Dreh Work pode responder?", fields: [["whatsapp", "WhatsApp", "tel"], ["email", "E-mail", "email"], ["period", "Melhor período para contato", "selectPeriod"], ["reply", "Preferência de resposta", "selectReply"]] },
] as const;
const options: Record<string, string[]> = {
  hasSite: ["Não", "Sim"], googleProfile: ["Não", "Sim", "Não sei"],
  situation: ["Ainda não temos um site", "Nosso site está desatualizado", "O site não transmite profissionalismo", "O site não gera contatos", "Dependemos muito do Instagram", "Não aparecemos adequadamente no Google", "Precisamos divulgar um serviço", "Precisamos de uma loja", "Precisamos melhorar uma loja Shopify", "Não sabemos exatamente o que precisa mudar"],
  objective: objectives, solution: ["Site profissional", "Landing page", "Reformulação", "Loja Shopify", "Presença digital", "Manutenção", "Ainda não sei"],
  period: ["Manhã", "Tarde"], reply: ["WhatsApp", "E-mail"],
};

export function DiagnosticWizard() {
  const [step, setStep] = useState(0); const [answers, setAnswers] = useState<Answers>({}); const [error, setError] = useState(""); const [done, setDone] = useState(false); const [ready, setReady] = useState(false);
  useEffect(() => { const timer = setTimeout(() => { try { const saved = JSON.parse(localStorage.getItem(STORAGE) || "null"); if (saved) { setStep(saved.step || 0); setAnswers(saved.answers || {}); } const q = new URLSearchParams(location.search).get("objetivo"); if (q) setAnswers(a => ({ ...a, objective: q })); } catch {} finally { setReady(true); } }, 0); return () => clearTimeout(timer); }, []);
  useEffect(() => { if (ready) localStorage.setItem(STORAGE, JSON.stringify({ step, answers })); }, [step, answers, ready]);
  const current = steps[step]; const progress = Math.round(((step + 1) / (steps.length + 1)) * 100);
  const required = useMemo(() => current?.fields.filter(([id]) => !["siteUrl", "instagram", "timeline"].includes(id)).map(([id]) => id) || [], [current]);
  function update(id: string, value: string | boolean) { const nextAnswers = { ...answers, [id]: typeof value === "string" ? value.slice(0, 180) : value }; setAnswers(nextAnswers); if (ready) localStorage.setItem(STORAGE, JSON.stringify({ step, answers: nextAnswers })); setError(""); }
  function next() { if (required.some(id => !answers[id])) { setError("Preencha os campos obrigatórios desta etapa."); track("diagnostic_validation_error", { step: step + 1 }); return; } const nextStep = step + 1; localStorage.setItem(STORAGE, JSON.stringify({ step: nextStep, answers })); setStep(nextStep); track("diagnostic_step_forward", { step: step + 1 }); }
  function back() { const previousStep = Math.max(0, step - 1); localStorage.setItem(STORAGE, JSON.stringify({ step: previousStep, answers })); setStep(previousStep); track("diagnostic_step_back", { step }); }
  function restart() { localStorage.removeItem(STORAGE); setAnswers({}); setStep(0); setDone(false); }
  async function complete() { if (!answers.consent) { setError("Confirme o consentimento para continuar."); return; } await submitDiagnosticDemo(answers); setDone(true); localStorage.removeItem(STORAGE); track("diagnostic_demo_complete"); }
  if (done) return <div className="wizard complete"><p className="kicker">Modo de revisão concluído</p><h2>Seu resumo está pronto.</h2><p>Nenhuma informação foi enviada ou armazenada fora deste navegador. A integração real será ativada apenas na etapa final.</p><a className="button primary" target="_blank" rel="noreferrer" href={`https://wa.me/${brand.whatsappDigits}?text=${encodeURIComponent(`Olá, Dreh Work. Concluí a demonstração do diagnóstico e gostaria de conversar sobre: ${String(answers.objective || "presença digital")}.`)}`}>Continuar pelo WhatsApp</a><button className="text-link" onClick={restart}>Reiniciar demonstração</button></div>;
  if (step >= steps.length) return <div className="wizard"><div className="progress"><span style={{ width: "100%" }} /></div><p className="kicker">Resumo para revisão</p><h2>Confira suas respostas</h2><dl className="summary">{Object.entries(answers).filter(([k]) => k !== "consent").map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{String(value)}</dd></div>)}</dl><label className="consent"><input type="checkbox" checked={Boolean(answers.consent)} onChange={e => update("consent", e.target.checked)} /> Autorizo o uso destas informações para resposta comercial. Nesta versão de revisão, os dados não serão enviados.</label>{error && <p className="form-error" role="alert">{error}</p>}<div className="wizard-actions"><button className="button secondary" onClick={back}>Voltar</button><button className="button primary" onClick={complete}>Concluir demonstração</button></div><p className="review-note">Envio real ainda não configurado. Agendamento de 15 minutos em configuração.</p></div>;
  return <div className="wizard"><div className="progress" aria-label={`Progresso: ${progress}%`}><span style={{ width: `${progress}%` }} /></div><p className="kicker">Etapa {step + 1} de {steps.length}</p><h2>{current.title}</h2><div className="form-grid">{current.fields.map(([id, label, type]) => <label key={id}>{label}{type.startsWith("select") || type === "select" ? <select value={String(answers[id] || "")} onChange={e => update(id, e.target.value)} required><option value="">Selecione</option>{(options[id] || []).map(opt => <option key={opt}>{opt}</option>)}</select> : <input type={type} value={String(answers[id] || "")} onChange={e => update(id, e.target.value)} maxLength={180} required={!['siteUrl','instagram','timeline'].includes(id)} />}</label>)}</div>{error && <p className="form-error" role="alert">{error}</p>}<div className="wizard-actions">{step > 0 && <button className="button secondary" onClick={back}>Voltar</button>}<button className="button primary" onClick={next}>Continuar</button><button className="text-link" onClick={restart}>Reiniciar</button></div><p className="review-note">Progresso salvo somente neste navegador.</p></div>;
}
