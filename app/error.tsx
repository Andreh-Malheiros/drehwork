"use client";

import Link from "next/link";
import { whatsappUrl } from "@/content/site";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section className="not-found shell">
    <span>Erro</span>
    <h1>Algo não carregou como deveria.</h1>
    <p>Tente novamente. Se o problema continuar, fale com a gente pelo WhatsApp.</p>
    <div className="button-row">
      <button type="button" className="button primary" onClick={reset}>Tentar novamente</button>
      <Link className="button ghost" href="/">Voltar ao início</Link>
      <a className="text-link" href={whatsappUrl("um problema no site")} target="_blank" rel="noreferrer">WhatsApp</a>
    </div>
  </section>;
}
