"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { brand } from "@/content/site";

const primaryNavigation = [
  ["Serviços", "/servicos"],
  ["Projetos", "/projetos"],
  ["Processo", "/processo"],
  ["Insights", "/insights"],
  ["Contato", "/contato"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    addEventListener("keydown", closeOnEscape);
    return () => removeEventListener("keydown", closeOnEscape);
  }, [open]);
  return <header className="site-header" data-menu-open={open}>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <div className="shell nav-row">
      <Link href="/" className="wordmark" aria-label="Dreh Work — início">{brand.name}</Link>
      <p className="header-status"><span /> Presença digital / Brasil</p>
      <button className="menu-button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(v => !v)}><span>{open ? "Fechar" : "Menu"}</span><i aria-hidden /></button>
      <nav id="menu" aria-label="Navegação principal" data-open={open}>
        <p className="menu-caption">Navegação / Dreh Work</p>
        {primaryNavigation.map(([label, href], index) => <Link key={href} href={href} onClick={() => setOpen(false)}><span>{String(index + 1).padStart(2, "0")}</span>{label}</Link>)}
        <Link className="header-cta" href="/diagnostico" onClick={() => setOpen(false)}>Diagnóstico gratuito <span aria-hidden>↗</span></Link>
        <p className="menu-meta">Atendimento remoto · Todo o Brasil</p>
      </nav>
    </div>
  </header>;
}
