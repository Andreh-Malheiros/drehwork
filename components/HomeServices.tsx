"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { services } from "@/content/site";

type Group = { label: string; title: string; description: string; slugs: string[]; visual: ReactNode; caption: string };

const serviceBySlug = (slug: string) => services.find(service => service.slug === slug);

const groups: Group[] = [
  {
    label: "Sites e páginas",
    title: "A base que organiza como a empresa é vista.",
    description: "Sites institucionais, reformulações e landing pages que explicam a oferta em segundos e levam o visitante ao contato.",
    slugs: ["sites-profissionais", "reformulacao-de-sites", "landing-pages"],
    caption: "BH Carimbos: site criado pela DrehWork",
    visual: <div className="svc-shot"><div className="svc-shot-bar" aria-hidden><i /><i /><i /><span>bhcarimbos.com.br</span></div><Image src="/images/bhcarimbos.webp" alt="Página inicial do site da BH Carimbos" width={1905} height={1811} sizes="(max-width: 900px) 92vw, 620px" /></div>,
  },
  {
    label: "Comércio eletrônico",
    title: "Uma loja pronta para apresentar e vender.",
    description: "Lojas Shopify configuradas e personalizadas para navegação simples, confiança na compra e operação do dia a dia.",
    slugs: ["lojas-shopify"],
    caption: "Ammis Moda: manutenção e evolução da loja em Shopify",
    visual: <div className="svc-shot"><div className="svc-shot-bar" aria-hidden><i /><i /><i /><span>ammismoda.com.br</span></div><Image src="/images/ammismoda.webp" alt="Página inicial da loja Ammis Moda" width={1905} height={2550} sizes="(max-width: 900px) 92vw, 620px" /></div>,
  },
  {
    label: "Presença e descoberta",
    title: "Contexto para ser encontrada e recomendada.",
    description: "Perfil da Empresa no Google, páginas por serviço e dados estruturados para que clientes, buscadores e IA entendam o negócio.",
    slugs: ["presenca-digital"],
    caption: "Exemplo ilustrativo: como o site descreve a empresa para o Google",
    visual: <div className="svc-code" aria-hidden>
      <p><span className="k">&quot;@type&quot;</span>: <span className="v">&quot;Bakery&quot;</span>,</p>
      <p><span className="k">&quot;name&quot;</span>: <span className="v">&quot;Confeitaria Exemplo&quot;</span>,</p>
      <p><span className="k">&quot;areaServed&quot;</span>: <span className="v">&quot;Belo Horizonte&quot;</span>,</p>
      <p><span className="k">&quot;openingHours&quot;</span>: <span className="v">&quot;Mo-Su 08:00-20:00&quot;</span>,</p>
      <p><span className="k">&quot;makesOffer&quot;</span>: [</p>
      <p className="in"><span className="v">&quot;Bolos de aniversário&quot;</span>,</p>
      <p className="in"><span className="v">&quot;Bolos de casamento&quot;</span></p>
      <p>],</p>
      <p><span className="k">&quot;telephone&quot;</span>: <span className="v">&quot;+55 31 ...&quot;</span></p>
    </div>,
  },
  {
    label: "Suporte e evolução",
    title: "Um site que continua melhorando depois de publicado.",
    description: "Correções, conteúdo novo, ajustes de desempenho e automações que tiram tarefas repetidas do atendimento.",
    slugs: ["manutencao", "automacao-de-processos"],
    caption: "Exemplo ilustrativo de um registro mensal de melhorias",
    visual: <ul className="svc-log" aria-hidden>
      <li><b>Nova página</b><span>Bolos de casamento, com pedido de orçamento</span><small>Publicado</small></li>
      <li><b>Desempenho</b><span>Imagens otimizadas na página inicial</span><small>Publicado</small></li>
      <li><b>Automação</b><span>Pedidos do formulário chegam no WhatsApp</span><small>Em teste</small></li>
      <li><b>Correção</b><span>Botão do rodapé no celular</span><small>Publicado</small></li>
    </ul>,
  },
];

/** "O que fazemos": four service groups in fixed-size tabs; the panel crossfades without changing the layout. */
export function HomeServices() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (active + step + groups.length) % groups.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return <div className="svc">
    <div className="svc-tabs" role="tablist" aria-label="Grupos de serviços" aria-orientation="vertical" onKeyDown={onKeyDown}>
      {groups.map((group, index) => <button
        key={group.label}
        ref={node => { tabs.current[index] = node; }}
        type="button"
        role="tab"
        id={`svc-tab-${index}`}
        aria-selected={index === active}
        aria-controls={`svc-panel-${index}`}
        tabIndex={index === active ? 0 : -1}
        onClick={() => setActive(index)}
      >
        <strong>{group.label}</strong>
        <span>{group.slugs.length === 1 ? "1 serviço" : `${group.slugs.length} serviços`}</span>
      </button>)}
    </div>

    <div className="svc-stage">
      {groups.map((group, index) => <div
        key={group.label}
        className="svc-panel"
        id={`svc-panel-${index}`}
        role="tabpanel"
        aria-labelledby={`svc-tab-${index}`}
        inert={index !== active}
        data-active={index === active}
      >
        <div className="svc-copy">
          <h3>{group.title}</h3>
          <p>{group.description}</p>
          <ul className="svc-links">
            {group.slugs.map(slug => {
              const service = serviceBySlug(slug);
              return service ? <li key={slug}><Link href={`/servicos/${slug}`}><strong>{service.title}</strong><span>{service.eyebrow}</span><svg viewBox="0 0 24 24" aria-hidden><path d="M9 6l6 6-6 6" /></svg></Link></li> : null;
            })}
          </ul>
        </div>
        <figure className="svc-visual">
          {group.visual}
          <figcaption>{group.caption}</figcaption>
        </figure>
      </div>)}
    </div>
  </div>;
}
