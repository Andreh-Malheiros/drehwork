"use client";

import Link from "next/link";
import { useState } from "react";
import { brand, navigation } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <div className="shell nav-row">
      <Link href="/" className="wordmark" aria-label="Dreh Work — início">{brand.name}<small>assinatura provisória</small></Link>
      <button className="menu-button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(v => !v)}>Menu <span aria-hidden>↗</span></button>
      <nav id="menu" aria-label="Navegação principal" data-open={open}>
        {navigation.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      </nav>
    </div>
  </header>;
}
