"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { OPEN_CONSENT_EVENT, readConsent, saveConsent } from "@/lib/consent";

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    // Deferred so the banner never competes with the first paint.
    const timer = window.setTimeout(() => {
      const current = readConsent();
      if (!current) setOpen(true);
      else setAnalytics(current.analytics);
    }, 800);
    const reopen = () => { setAnalytics(readConsent()?.analytics ?? false); setDetails(true); setOpen(true); };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => { window.clearTimeout(timer); window.removeEventListener(OPEN_CONSENT_EVENT, reopen); };
  }, []);

  if (!open) return null;
  const decide = (value: boolean) => { saveConsent(value); setAnalytics(value); setOpen(false); setDetails(false); };

  return <section className="cookie-consent" role="dialog" aria-modal="false" aria-labelledby="cookie-consent-title">
    <div className="cookie-consent-copy">
      <p id="cookie-consent-title" className="cookie-consent-title">Privacidade e cookies</p>
      <p>Usamos cookies de métricas para entender como o site é usado e melhorá-lo. Eles só são ativados com a sua autorização. <Link href="/politica-de-cookies">Saiba mais</Link>.</p>
      {details ? <label className="cookie-consent-toggle">
        <input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} />
        <span><b>Métricas (Google Analytics)</b> Estatísticas de uso pseudônimas. Opcional.</span>
      </label> : null}
    </div>
    <div className="cookie-consent-actions">
      {details
        ? <button type="button" className="button primary" onClick={() => decide(analytics)}>Salvar preferências</button>
        : <>
          <button type="button" className="button ghost" onClick={() => decide(false)}>Recusar</button>
          <button type="button" className="button ghost" onClick={() => setDetails(true)}>Preferências</button>
          <button type="button" className="button primary" onClick={() => decide(true)}>Aceitar</button>
        </>}
    </div>
  </section>;
}
