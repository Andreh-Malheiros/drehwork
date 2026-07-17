"use client";

import Link from "next/link";
import { useState } from "react";

const groups = [
  {
    label: "Sites e páginas",
    title: "A base que organiza a percepção.",
    description: "Sites profissionais, reformulações e landing pages que tornam a oferta clara e orientam a próxima ação.",
    href: "/servicos/sites-profissionais",
    items: ["Sites profissionais", "Reformulação", "Landing pages"],
    signal: "CLAREZA",
    visual: "sites",
  },
  {
    label: "Comércio eletrônico",
    title: "Estrutura para apresentar e vender.",
    description: "Lojas Shopify planejadas para navegação, confiança, operação e evolução contínua.",
    href: "/servicos/lojas-shopify",
    items: ["Shopify", "Experiência de compra", "Personalização"],
    signal: "AÇÃO",
    visual: "shopify",
  },
  {
    label: "Presença e descoberta",
    title: "Contexto para ser compreendida.",
    description: "Conteúdo, páginas e dados estruturados para clientes, mecanismos de busca e sistemas de IA.",
    href: "/servicos/presenca-digital",
    items: ["Presença digital", "Busca local", "Pesquisa e IA"],
    signal: "DESCOBERTA",
    visual: "presence",
  },
  {
    label: "Suporte e evolução",
    title: "Uma presença que continua avançando.",
    description: "Manutenção, correções e melhorias planejadas depois que a experiência entra no ar.",
    href: "/servicos/manutencao",
    items: ["Manutenção", "Correções", "Evolução visual"],
    signal: "CONTINUIDADE",
    visual: "support",
  },
] as const;

export function HomeServices() {
  const [active, setActive] = useState(0);
  const current = groups[active];

  return <div className="home-services">
    <div className="home-service-list" role="group" aria-label="Grupos de serviços">
      {groups.map((group, index) => <button
        key={group.label}
        id={`service-tab-${index}`}
        aria-pressed={active === index}
        aria-controls="service-stage"
        onClick={() => setActive(index)}
        onFocus={() => setActive(index)}
      >
        <span>{String(index + 1).padStart(2, "0")}</span>
        <strong>{group.label}</strong>
        <i aria-hidden>{active === index ? "—" : "+"}</i>
      </button>)}
    </div>
    <div className="home-service-stage" id="service-stage" aria-live="polite" data-service={current.visual}>
      <div className="service-stage-signal" aria-hidden><span>CAPACIDADE</span><b>{current.signal}</b><i /></div>
      <p className="kicker">{String(active + 1).padStart(2, "0")} / 04</p>
      <h3>{current.title}</h3>
      <p>{current.description}</p>
      <ul>{current.items.map((item) => <li key={item}>{item}</li>)}</ul>
      <Link className="text-link" href={current.href}>Explorar solução</Link>
    </div>
  </div>;
}
