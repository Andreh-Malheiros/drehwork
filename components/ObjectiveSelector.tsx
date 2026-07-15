"use client";

import Link from "next/link";
import { objectives } from "@/content/site";
import { track } from "@/lib/analytics";
import { useEffect, useState } from "react";

const matches: Record<string, [string, string]> = {
  "Criar o primeiro site": ["Sites profissionais", "/servicos/sites-profissionais"],
  "Reformular o site atual": ["Reformulação de sites", "/servicos/reformulacao-de-sites"],
  "Gerar mais contatos": ["Landing pages", "/servicos/landing-pages"],
  "Criar uma landing page": ["Landing pages", "/servicos/landing-pages"],
  "Vender online": ["Lojas Shopify", "/servicos/lojas-shopify"],
  "Melhorar uma loja Shopify": ["Manutenção e evolução", "/servicos/manutencao"],
  "Melhorar a presença digital": ["Presença digital", "/servicos/presenca-digital"],
  "Ainda não sei": ["Diagnóstico gratuito", "/diagnostico"],
};

export function ObjectiveSelector() {
  const [selected, setSelected] = useState(objectives[0]);
  useEffect(() => { const saved = localStorage.getItem("dreh:objective"); const timer = setTimeout(() => { if (saved && objectives.includes(saved)) setSelected(saved); }, 0); return () => clearTimeout(timer); }, []);
  const [service, href] = matches[selected];
  function choose(value: string) { setSelected(value); localStorage.setItem("dreh:objective", value); track("objective_select", { objective: objectives.indexOf(value) + 1 }); }
  return <div className="objective-grid">
    <div className="objective-options" role="list" aria-label="Objetivos">
      {objectives.map(item => <button key={item} role="listitem" data-active={selected === item} onClick={() => choose(item)}>{item}<span aria-hidden>↗</span></button>)}
    </div>
    <aside className="objective-result" aria-live="polite"><p className="kicker">Direção recomendada</p><h3>{service}</h3><p>A seleção organiza o próximo passo e será levada para o diagnóstico, sem envio de dados.</p><div className="button-row"><Link className="button primary" href={`/diagnostico?objetivo=${encodeURIComponent(selected)}`}>Iniciar diagnóstico</Link><Link className="text-link" href={href}>Entender a solução</Link></div></aside>
  </div>;
}
