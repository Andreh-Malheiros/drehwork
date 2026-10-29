"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { services, whatsappUrl } from "@/content/site";
import { track } from "@/lib/analytics";
import { maskEmail, maskPhone } from "@/lib/masks";

type Status = "idle" | "sending" | "sent";

export function ProjectRequestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"), email: form.get("email"), phone: form.get("phone"), message: form.get("message"),
      services: form.getAll("services"), consent: form.get("consent") === "on", website: form.get("website"),
    };
    setStatus("sending"); setError(""); setFallback(false);
    try {
      const response = await fetch("/api/contato", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.ok) { setStatus("sent"); track("diagnostic_submit", { source: "orcamento" }); return; }
      setStatus("idle");
      if (response.status === 422 || response.status === 429) setError(result.error);
      else { setError("Não foi possível enviar agora."); setFallback(true); }
    } catch {
      setStatus("idle"); setError("Sem conexão no momento."); setFallback(true);
    }
    track("diagnostic_submit_error", { source: "orcamento" });
  }

  if (status === "sent") return <div className="form-success" role="status">
    <p className="form-kicker">Pedido recebido.</p>
    <p>Obrigado. A DrehWork vai analisar o seu projeto e responder pelo contato informado.</p>
  </div>;

  return <form onSubmit={submit} noValidate>
    <div className="form-fields">
      <input name="name" aria-label="Seu nome" placeholder="Seu nome *" autoComplete="name" maxLength={120} required />
      <input name="email" aria-label="E-mail" type="email" onChange={e => { e.currentTarget.value = maskEmail(e.currentTarget.value); }} placeholder="E-mail *" autoComplete="email" maxLength={160} required />
      <input name="phone" aria-label="Telefone com DDD" type="tel" inputMode="tel" onChange={e => { e.currentTarget.value = maskPhone(e.currentTarget.value); }} placeholder="Telefone / WhatsApp *" autoComplete="tel" maxLength={40} required />
      <textarea name="message" aria-label="Fale sobre o seu projeto" placeholder="Fale sobre o seu projeto *" maxLength={2000} required />
      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    </div>
    <fieldset className="interest-group">
      <legend>Serviços de interesse</legend>
      <div>
        {services.map((service) => (
          <label key={service.slug}>
            <input type="checkbox" name="services" value={service.slug} />
            <span>{service.title}</span>
          </label>
        ))}
      </div>
    </fieldset>
    <label className="form-consent"><input type="checkbox" name="consent" required /> <span>Li a <Link href="/politica-de-privacidade" target="_blank">Política de Privacidade</Link> e estou ciente do uso destes dados para resposta.</span></label>
    {error ? <p className="form-error" role="alert">{error}{fallback ? <> <a href={whatsappUrl("um orçamento de projeto")} target="_blank" rel="noreferrer">Falar pelo WhatsApp</a>.</> : null}</p> : null}
    <button className="form-submit" type="submit" disabled={status === "sending"} aria-busy={status === "sending"}>{status === "sending" ? "Enviando…" : <>Enviar solicitação <span aria-hidden>→</span></>}</button>
  </form>;
}
