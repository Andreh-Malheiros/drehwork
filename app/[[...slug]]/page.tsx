import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DiagnosticWizard } from "@/components/DiagnosticWizard";
import { HomeHills } from "@/components/HomeHills";
import { HomeProblem } from "@/components/HomeProblem";
import { HomeServices } from "@/components/HomeServices";
import { ObjectiveSelector } from "@/components/ObjectiveSelector";
import { PresenceComparison } from "@/components/PresenceComparison";
import { brand, faqs, processSteps, projects, services, whatsappUrl } from "@/content/site";
import { landings, type Landing } from "@/content/landings";
import { insightCategories, insights, readingMinutes, type Insight } from "@/content/insights";
import { legalDocuments } from "@/content/legal";
import { JsonLd, articleSchema, breadcrumbFor, faqSchema, homeFaqSchema, pageMetadata, serviceSchema, validPaths } from "@/lib/seo";


type Props = { params: Promise<{ slug?: string[] }> };
const valid = validPaths;

export async function generateStaticParams() {
  return [...valid].map(path => ({ slug: path ? path.split("/") : undefined }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).slug?.join("/") || "");
}

function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="kicker"><span aria-hidden>+</span> {children}</p>; }
function CTA({ context = "meu projeto" }: { context?: string }) { return <section className="cta-band"><div className="shell"><Eyebrow>Próximo passo</Eyebrow><h2>Sua empresa está sendo encontrada por quem procura o seu serviço?</h2><p>Cada dia sem uma presença digital à altura é um cliente que escolheu o concorrente. O diagnóstico é gratuito, sem compromisso — e, se não fizer sentido para o seu momento, diremos isso com clareza.</p><div className="button-row"><Link className="button light" href="/diagnostico">Solicitar diagnóstico gratuito</Link><a className="text-link light" href={whatsappUrl(context)} target="_blank" rel="noreferrer">Conversar no WhatsApp</a></div></div></section>; }
type ProjectMediaStyle = CSSProperties & { "--project-media-image": string; "--project-media-ratio": string };
function projectMediaStyle(project: typeof projects[number]): ProjectMediaStyle {
  const cover = project.media[0];
  return {
    "--project-media-image": `url("${cover.src}")`,
    "--project-media-ratio": `${cover.width} / ${cover.height}`,
  };
}
function ProjectMedia({ project, index, large = false }: { project: typeof projects[number]; index?: number; large?: boolean }) {
  return <div className={`project-media${large ? " large" : ""}`} style={projectMediaStyle(project)} role="img" aria-label={project.media[0].alt}>
    {typeof index === "number" ? <span>{String(index + 1).padStart(2,"0")}</span> : null}
    <b>{project.name}</b>
    <small>{project.category}</small>
  </div>;
}
function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) { return <article className="project-card"><ProjectMedia project={project} index={index} /><div className="project-copy"><p className="kicker">{project.category}</p><h2>{project.name}</h2><p>{project.createdByDrehWork ? "Projeto criado e desenvolvido pela Dreh Work." : "Atuação recorrente em manutenção, personalização e evolução da experiência."}</p><Link className="text-link" href={`/projetos/${project.slug}`}>Ver projeto</Link></div></article>; }

const processPhases = [
  ["Entender", processSteps.slice(0, 2)],
  ["Estruturar", processSteps.slice(2, 4)],
  ["Construir", processSteps.slice(4, 6)],
  ["Validar", processSteps.slice(6, 9)],
  ["Evoluir", processSteps.slice(9)],
] as const;

function Home() { return <>
  <section className="hero home-hero glsl-hero">
    <HomeHills />
    <div className="glsl-hero-copy">
      <h1 className="hero-keyword">Criação de sites profissionais, lojas virtuais e presença digital</h1>
      <div className="hero-slogan"><span>Visão que transforma.<br /></span>Estratégia que gera resultado.</div>
      <p>Sites, landing pages, lojas Shopify, SEO e Google Perfil da Empresa para empresas que querem ser encontradas, transmitir confiança e receber clientes pela internet. De Belo Horizonte para todo o Brasil, com mais de {brand.projectsDelivered} projetos entregues em {brand.yearsInMarket} anos.</p>
      <div className="hero-actions"><Link className="button primary" href="/diagnostico">Solicitar diagnóstico gratuito</Link><a className="text-link" href={whatsappUrl("um site para minha empresa")} target="_blank" rel="noreferrer">Falar no WhatsApp</a></div>
    </div>
  </section>

  <HomeProblem />

  <section className="section home-transformation"><div className="shell" data-reveal><PresenceComparison /></div></section>

  <section className="section home-proof" id="resultados" aria-labelledby="home-proof-title">
    <div className="shell" data-reveal>
      <Eyebrow>Prova antes da promessa</Eyebrow>
      <div className="home-section-heading"><h2 id="home-proof-title">Empresas reais. Entregas publicadas. Evolução contínua.</h2><Link className="text-link" href="/projetos">Ver portfólio</Link></div>
      <dl className="proof-stats">
        <div><dt>Projetos entregues</dt><dd>+{brand.projectsDelivered}</dd></div>
        <div><dt>Anos de mercado</dt><dd>{brand.yearsInMarket}</dd></div>
        <div><dt>Atendimento</dt><dd>Todo o Brasil</dd></div>
        <div><dt>Formalização</dt><dd>Contrato e NF</dd></div>
      </dl>
      <p className="proof-note">Sites institucionais, lojas virtuais e operações em evolução contínua — com novas empresas chegando constantemente e cada projeto conduzido diretamente por quem executa.</p>
    </div>
  </section>

  <section className="section home-fit" aria-labelledby="home-fit-title">
    <div className="shell" data-reveal>
      <Eyebrow>Antes de falar com a gente</Eyebrow>
      <div className="home-section-heading"><h2 id="home-fit-title">Não é para todo mundo. E isso é intencional.</h2><p>Trabalhamos melhor com quem enxerga a presença digital como investimento — não como custo.</p></div>
      <div className="fit-grid">
        <div className="fit-card fit-yes"><h3>É para você se</h3><ul>
          <li>quer receber clientes pela internet de forma previsível;</li>
          <li>sabe que a primeira impressão online decide se o cliente liga ou fecha a aba;</li>
          <li>quer uma marca que pareça do tamanho do serviço que entrega;</li>
          <li>prefere estratégia e acompanhamento a um site feito às pressas.</li>
        </ul></div>
        <div className="fit-card fit-no"><h3>Não é para você se</h3><ul>
          <li>não pretende atrair clientes pela internet;</li>
          <li>procura apenas o menor preço possível;</li>
          <li>quer um site para cumprir tabela e nunca mais olhar para ele;</li>
          <li>espera resultado garantido sem participar do processo.</li>
        </ul></div>
      </div>
    </div>
  </section>

  <section className="section home-services-section"><div className="shell" data-reveal><Eyebrow>O que fazemos</Eyebrow><div className="home-section-heading"><h2>Um sistema de crescimento, não uma página isolada.</h2><Link className="text-link" href="/servicos">Todos os serviços</Link></div><HomeServices /></div></section>

  <section className="section home-process"><div className="shell" data-reveal><Eyebrow>Planejar / Criar / Evoluir</Eyebrow><div className="home-section-heading"><h2>Estratégia antes do design.</h2><p>O visual entra quando objetivo, mensagem e próximo passo do cliente já estão definidos. É isso que separa um site bonito de um site que gera resultado.</p></div><ol className="process-phases">{processPhases.map(([phase, steps], index) => <li key={phase}><span>{String(index + 1).padStart(2, "0")}</span><h3>{phase}</h3><p>{steps.join(" · ")}</p><i aria-hidden /></li>)}</ol><Link className="text-link process-link" href="/processo">Ver processo detalhado</Link></div></section>

  <section className="section discovery-section"><div className="shell discovery-grid" data-reveal><div className="discovery-copy"><Eyebrow>SEO, busca e inteligência artificial</Eyebrow><h2>Se o cliente não encontra, a empresa não existe para ele.</h2><p>Hoje a decisão começa no Google, no Maps e, cada vez mais, em assistentes de IA. Estruturamos o site para que esses sistemas entendam quem é a empresa, o que oferece, onde atua e como contratá-la.</p><p>É trabalho técnico de base — não promessa de primeira posição. Quem promete posição garantida está vendendo algo que não controla.</p></div><div className="discovery-system" aria-label="Fluxo de informações da empresa para mecanismos de pesquisa e inteligência artificial"><div className="source-nodes"><span>EMPRESA</span><span>SERVIÇOS</span><span>PÁGINAS</span><span>CONTEXTO</span></div><div className="discovery-core"><small>INFORMAÇÃO</small><strong>PRESENÇA<br/>ESTRUTURADA</strong><i /></div><div className="destination-nodes"><span>PESQUISA <b>↗</b></span><span>INTELIGÊNCIA ARTIFICIAL <b>↗</b></span></div></div></div></section>

  <section className="section objective-section"><div className="shell" data-reveal><Eyebrow>Direção personalizada</Eyebrow><div className="home-section-heading"><h2>O que sua empresa precisa resolver agora?</h2><p>Selecione um objetivo. A interface organiza um caminho inicial sem enviar seus dados.</p></div><ObjectiveSelector /></div></section>

  <section className="formalization-section section-light"><div className="shell" data-reveal><Eyebrow>Segurança para contratar</Eyebrow><div className="formalization-line">{["Contrato e nota fiscal", "Atendimento direto", "Processo estruturado", "Publicação e verificação", "Suporte e evolução", "Todo o Brasil, remotamente"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}</div></div></section>

  <section className="section home-guides"><div className="shell" data-reveal><Eyebrow>Guias</Eyebrow><div className="home-section-heading"><h2>Dúvidas comuns, respondidas sem rodeio.</h2><Link className="text-link" href="/insights">Todos os guias</Link></div><div className="service-grid wide insight-grid">{insights.slice(0, 3).map(i => <InsightCard key={i.slug} insight={i} />)}</div></div></section>

  <section className="section home-faq"><div className="shell faq-layout" data-reveal><div><Eyebrow>Perguntas frequentes</Eyebrow><h2>Respostas diretas, antes da primeira conversa.</h2><p>Escopo, prazo e investimento são confirmados em proposta, de acordo com cada projeto. Veja <Link className="text-link" href="/quanto-custa-um-site">o que define o preço de um site</Link>.</p></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden>+</span></summary><p>{answer}</p></details>)}</div></div></section>
  <JsonLd data={homeFaqSchema()} />
  <CTA />
</>; }

function ServicesPage() { return <><section className="page-hero shell"><Eyebrow>Serviços</Eyebrow><h1>Tudo o que sua presença digital precisa para gerar resultado.</h1><p className="lead">O site é o centro. Estratégia, SEO, automação e evolução contínua completam o sistema. Cada serviço começa pelo problema do negócio, não pelo layout.</p></section><section className="section shell"><div className="service-grid wide">{services.map((s,i)=><Link className="service-card" href={`/servicos/${s.slug}`} key={s.slug}><span>{String(i+1).padStart(2,"0")}</span><p className="kicker">{s.eyebrow}</p><h2>{s.title}</h2><p>{s.summary}</p><b aria-hidden>↗</b></Link>)}</div></section><section className="section shell"><Eyebrow>Soluções por necessidade</Eyebrow><h2>Encontre o caminho certo para o seu negócio.</h2><nav className="related-links" aria-label="Soluções por necessidade">{landings.map(l => <Link key={l.slug} href={`/${l.slug}`}>{l.seoTitle}</Link>)}</nav></section><CTA /></>; }
function RelatedProjects({ slugs }: { slugs: string[] }) {
  const list = slugs.map(slug => projects.find(p => p.slug === slug)).filter((p): p is typeof projects[number] => Boolean(p));
  if (!list.length) return null;
  return <section className="section projects-section"><div className="shell"><Eyebrow>Projetos relacionados</Eyebrow><h2>Trabalhos publicados neste formato.</h2><div className="projects-list">{list.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}</div></div></section>;
}
function FaqBlock({ title, items }: { title: string; items: [string, string][] }) {
  return <><section className="section home-faq"><div className="shell faq-layout"><div><Eyebrow>Perguntas frequentes</Eyebrow><h2>{title}</h2></div><div className="faq-list">{items.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden>+</span></summary><p>{answer}</p></details>)}</div></div></section><JsonLd data={faqSchema(items)} /></>;
}
function ServicePage({ service }: { service: typeof services[number] }) {
  const others = services.filter(s => s.slug !== service.slug);
  return <>
    <section className="page-hero shell"><Eyebrow>{service.eyebrow}</Eyebrow><h1>{service.h1}</h1><p className="lead">{service.summary}</p><div className="button-row"><Link className="button primary" href={`/diagnostico?objetivo=${service.slug}`}>Solicitar diagnóstico gratuito</Link><a className="button ghost" href={whatsappUrl(service.title)} target="_blank" rel="noreferrer">Falar no WhatsApp</a></div></section>
    <section className="section shell"><div className="split"><div><Eyebrow>Para quem é</Eyebrow><h2>{service.title} para quem precisa de resultado.</h2></div><ul className="check-list">{service.audience.map(x => <li key={x}>{x}</li>)}</ul></div></section>
    <section className="section section-dark"><div className="shell"><Eyebrow>O que está incluído</Eyebrow><h2>Escopo pensado ao redor do resultado.</h2><ul className="content-grid">{service.deliverables.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ul></div></section>
    <section className="section shell"><div className="split"><div><Eyebrow>Prazo e investimento</Eyebrow><h2>Proposta clara antes de começar.</h2></div><div className="prose-block"><p>Projetos no escopo padrão têm prazo previsto de até 10 dias após contrato e recebimento dos materiais. O investimento depende do número de páginas, dos textos, das integrações e do nível de personalização, e é apresentado em proposta detalhada, com contrato e nota fiscal.</p><Link className="text-link" href="/quanto-custa-um-site">Entenda o que define o preço</Link></div></div></section>
    <RelatedProjects slugs={service.relatedProjects} />
    <FaqBlock title={`${service.title}: o que você precisa saber.`} items={service.faqs} />
    <RelatedInsights list={insights.filter(i => i.relatedServices.includes(service.slug)).slice(0, 3)} title="Guias para decidir melhor" />
    <section className="section shell"><Eyebrow>Outros serviços</Eyebrow><nav className="related-links" aria-label="Outros serviços">{others.map(s => <Link key={s.slug} href={`/servicos/${s.slug}`}>{s.title}</Link>)}</nav></section>
    <JsonLd data={serviceSchema(service)}/><CTA context={service.title}/>
  </>;
}
function LandingPage({ landing }: { landing: Landing }) {
  const related = landing.relatedServices.map(slug => services.find(s => s.slug === slug)).filter((s): s is typeof services[number] => Boolean(s));
  return <>
    <section className="page-hero shell"><Eyebrow>{landing.eyebrow}</Eyebrow><h1>{landing.h1}</h1><p className="lead">{landing.lead}</p><div className="button-row"><Link className="button primary" href="/diagnostico">Solicitar diagnóstico gratuito</Link><a className="button ghost" href={whatsappUrl(landing.context)} target="_blank" rel="noreferrer">Falar no WhatsApp</a></div></section>
    <section className="section shell">{landing.sections.map(section => <div className="prose-block" key={section.heading}><h2>{section.heading}</h2>{section.paragraphs?.map(p => <p key={p}>{p}</p>)}{section.items ? <ul className="check-list">{section.items.map(item => <li key={item}>{item}</li>)}</ul> : null}</div>)}</section>
    <RelatedProjects slugs={landing.relatedProjects} />
    <FaqBlock title="Perguntas frequentes" items={landing.faqs} />
    <section className="section shell"><Eyebrow>Serviços relacionados</Eyebrow><nav className="related-links" aria-label="Serviços relacionados">{related.map(s => <Link key={s.slug} href={`/servicos/${s.slug}`}>{s.title}</Link>)}</nav></section>
    <CTA context={landing.context} />
  </>;
}
function ProjectsPage() { return <><section className="page-hero shell"><Eyebrow>Portfólio</Eyebrow><h1>Mais de {brand.projectsDelivered} projetos em {brand.yearsInMarket} anos.</h1><p className="lead">Uma seleção de trabalhos publicados — de sites institucionais a lojas virtuais em evolução contínua.</p></section><section className="section projects-section"><div className="shell projects-list">{projects.map((p,i)=><ProjectCard key={p.slug} project={p} index={i}/>)}</div></section><CTA /></>; }
function ProjectPage({ project }: { project: typeof projects[number] }) { const relatedServices = services.filter(s => s.relatedProjects.includes(project.slug)); const schema={"@context":"https://schema.org","@type":"CreativeWork",name:project.name,url:project.url,inLanguage:"pt-BR",creator:project.createdByDrehWork?{"@id":`${brand.url}/#organization`}:undefined}; return <><section className="page-hero project-hero shell"><div><Eyebrow>{project.category}</Eyebrow><h1>{project.name}</h1><p className="lead">{project.createdByDrehWork ? "Projeto integralmente criado e desenvolvido pela Dreh Work." : "Atuação contínua em manutenção, personalização, correções e evolução da experiência Shopify."}</p><a className="button primary" href={project.url} target="_blank" rel="noreferrer">Visitar projeto</a></div><ProjectMedia project={project} large /></section><section className="section shell case-grid"><div><Eyebrow>Escopo</Eyebrow><h2>O que foi entregue</h2><ul className="large-list">{project.scope.map(x=><li key={x}>{x}</li>)}</ul></div><aside><p className="kicker">Seu projeto</p><h3>Quer uma presença neste nível?</h3><p>Comece pelo diagnóstico gratuito: entendemos o seu momento e indicamos o caminho mais curto até o resultado.</p><Link className="button primary" href="/diagnostico">Solicitar diagnóstico</Link></aside></section>{relatedServices.length ? <section className="section shell"><Eyebrow>Serviços deste projeto</Eyebrow><nav className="related-links" aria-label="Serviços relacionados">{relatedServices.map(s => <Link key={s.slug} href={`/servicos/${s.slug}`}>{s.title}</Link>)}</nav></section> : null}<JsonLd data={schema}/><CTA context={`um projeto como ${project.name}`}/></>; }
function ProcessPage(){return <><section className="page-hero shell"><Eyebrow>Processo</Eyebrow><h1>Planejar. Criar. Evoluir.</h1><p className="lead">Um método em 10 etapas que organiza negócio, público, conteúdo, experiência e tecnologia — para que nada seja decidido no improviso.</p></section><section className="section shell"><ol className="process-cards">{processSteps.map((s,i)=><li key={s}><span>{String(i+1).padStart(2,"0")}</span><h2>{s}</h2><p>{["Entendimento da empresa, objetivo, público e situação atual.","Definição de prioridades, mensagens, conversões e diferenciais.","Organização de páginas, conteúdo, navegação e fluxos.","Hierarquia, identidade, componentes e comportamento visual.","Construção com foco em desempenho, responsividade e manutenção.","Configuração dos canais e recursos previstos no escopo.","Testes técnicos, de conteúdo, acessibilidade e funcionamento.","Disponibilização no ambiente final após aprovação.","Validação do domínio, formulários, indexação e eventos.","Suporte, manutenção e melhorias futuras."][i]}</p></li>)}</ol></section><CTA/></>}
function ContactPage(){return <><section className="page-hero shell"><Eyebrow>Contato</Eyebrow><h1>Fale direto com quem vai executar o seu projeto.</h1><p className="lead">Sem intermediários e sem roteiro de vendas. Empresa de Belo Horizonte (MG), com atendimento remoto para todo o Brasil.</p></section><section className="section shell contact-grid"><a href={whatsappUrl("minha presença digital")} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>{brand.whatsapp}</strong><small>{brand.hours}</small></a><a href={`mailto:${brand.email}`}><span>E-mail</span><strong>{brand.email}</strong><small>Para propostas e informações</small></a><a href={brand.instagramUrl} target="_blank" rel="noreferrer"><span>Instagram</span><strong>{brand.instagram}</strong><small>Conteúdo e bastidores</small></a></section><CTA/></>}
function AboutPage(){return <><section className="page-hero shell"><Eyebrow>Sobre</Eyebrow><h1>Uma empresa enxuta, com responsabilidade direta sobre cada entrega.</h1><p className="lead">A Dreh Work é conduzida por {brand.legalName}. Há {brand.yearsInMarket} anos no mercado, com mais de {brand.projectsDelivered} projetos realizados para empresas de diferentes segmentos.</p></section><section className="section section-dark"><div className="shell split"><div><Eyebrow>Como trabalhamos</Eyebrow><h2>Planejar. Criar. Evoluir.</h2></div><ul className="large-list"><li>Atendimento direto, sem intermediários entre você e quem executa.</li><li>Estratégia antes do design: objetivo, público e mensagem definidos primeiro.</li><li>Publicação verificada: domínio, formulários, indexação e eventos conferidos.</li><li>Evolução contínua depois da entrega, quando contratada.</li></ul></div></section><section className="section shell"><Eyebrow>Formalização</Eyebrow><h2>Contrato, nota fiscal e responsabilidade registrada.</h2><p className="lead">Todos os projetos são formalizados em contrato, com emissão de nota fiscal. Dreh Work é o nome comercial de {brand.legalName}, CNPJ {brand.cnpj}. Baseada em Belo Horizonte (MG), com atendimento remoto em todo o Brasil.</p></section><CTA context="trabalhar com a Dreh Work"/></>}
const dateFormat = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" });
const formatDate = (iso: string) => dateFormat.format(new Date(`${iso}T12:00:00Z`));
function InsightCard({ insight }: { insight: Insight }) {
  return <Link className="service-card insight-card" href={`/insights/${insight.slug}`}><p className="kicker">{insight.category} · {readingMinutes(insight)} min</p><h3>{insight.title}</h3><p>{insight.summary}</p><b aria-hidden>↗</b></Link>;
}
function RelatedInsights({ list, title }: { list: Insight[]; title: string }) {
  if (!list.length) return null;
  return <section className="section shell"><Eyebrow>Guias</Eyebrow><h2>{title}</h2><div className="service-grid wide insight-grid">{list.map(i => <InsightCard key={i.slug} insight={i} />)}</div></section>;
}
function InsightsPage() {
  return <>
    <section className="page-hero shell"><Eyebrow>Guias</Eyebrow><h1>Guias práticos sobre sites, Google, lojas virtuais e IA</h1><p className="lead">Respostas diretas para as dúvidas mais comuns de quem quer ser encontrado, transmitir confiança e vender pela internet. Sem promessas milagrosas e sem jargão desnecessário.</p><nav className="related-links" aria-label="Categorias">{insightCategories.filter(c => insights.some(i => i.category === c)).map(c => <a key={c} href={`#${c.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{c}</a>)}</nav></section>
    {insightCategories.map(category => { const list = insights.filter(i => i.category === category); if (!list.length) return null; const id = category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-"); return <section className="section shell insight-category" id={id} key={category}><Eyebrow>{list.length} {list.length === 1 ? "guia" : "guias"}</Eyebrow><h2>{category}</h2><div className="service-grid wide insight-grid">{list.map(i => <InsightCard key={i.slug} insight={i} />)}</div></section>; })}
    <CTA context="uma dúvida sobre minha presença digital" />
  </>;
}
function InsightPage({ insight }: { insight: Insight }) {
  const related = insight.relatedServices.map(slug => services.find(s => s.slug === slug)).filter((s): s is typeof services[number] => Boolean(s));
  const more = insights.filter(i => i.slug !== insight.slug && (i.category === insight.category || i.relatedServices.some(s => insight.relatedServices.includes(s)))).slice(0, 3);
  return <>
    <article className="insight-article">
      <header className="page-hero shell"><Eyebrow>{insight.category}</Eyebrow><h1>{insight.title}</h1><p className="lead">{insight.intro}</p><p className="insight-meta">Por {brand.legalName} · Publicado em <time dateTime={insight.date}>{formatDate(insight.date)}</time>{insight.updated !== insight.date ? <> · Atualizado em <time dateTime={insight.updated}>{formatDate(insight.updated)}</time></> : null} · {readingMinutes(insight)} min de leitura</p></header>
      <div className="section shell">{insight.sections.map(section => <section className="prose-block" key={section.heading}><h2>{section.heading}</h2>{section.paragraphs?.map(p => <p key={p}>{p}</p>)}{section.items ? <ul className="check-list">{section.items.map(item => <li key={item}>{item}</li>)}</ul> : null}</section>)}</div>
    </article>
    <FaqBlock title="Perguntas frequentes" items={insight.faqs} />
    <section className="section shell"><Eyebrow>Como a Dreh Work pode ajudar</Eyebrow><nav className="related-links" aria-label="Serviços relacionados">{related.map(s => <Link key={s.slug} href={`/servicos/${s.slug}`}>{s.title}</Link>)}<Link href="/insights">Todos os guias</Link></nav></section>
    <RelatedInsights list={more} title="Continue lendo" />
    <JsonLd data={articleSchema(insight)} />
    <CTA context={`o guia "${insight.title}"`} />
  </>;
}
function LegalPage({kind}:{kind:keyof typeof legalDocuments}) { const doc=legalDocuments[kind]; return <section className="page-hero legal legal-doc shell"><Eyebrow>Documento legal</Eyebrow><h1>{doc.title}</h1><p className="lead">{doc.summary}</p><p className="legal-updated">Última atualização: {doc.updated}</p>{doc.sections.map(section=><section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs?.map(p=><p key={p}>{p}</p>)}{section.items?<ul>{section.items.map(item=><li key={item}>{item}</li>)}</ul>:null}</section>)}</section> }

export default async function Page({params}:Props){const path=(await params).slug?.join("/")||""; return <>{renderPage(path)}<JsonLd data={breadcrumbFor(path)}/></>;}

function renderPage(path:string){ if(!valid.has(path))notFound(); if(!path)return <Home/>; if(path==="servicos")return <ServicesPage/>; if(path==="projetos")return <ProjectsPage/>; if(path==="processo")return <ProcessPage/>; if(path==="diagnostico")return <><section className="page-hero shell compact"><Eyebrow>Diagnóstico gratuito</Eyebrow><h1>Uma análise inicial para organizar o próximo passo.</h1><p className="lead">Cinco etapas rápidas. Você recebe uma leitura objetiva da sua presença digital e do caminho recomendado, sem compromisso de contratação.</p></section><section className="section shell"><DiagnosticWizard/></section></>; if(path==="contato")return <ContactPage/>; if(path==="insights")return <InsightsPage/>; const insight=insights.find(i=>`insights/${i.slug}`===path); if(insight)return <InsightPage insight={insight}/>; if(path==="sobre")return <AboutPage/>; const service=services.find(s=>`servicos/${s.slug}`===path); if(service)return <ServicePage service={service}/>; const project=projects.find(p=>`projetos/${p.slug}`===path); if(project)return <ProjectPage project={project}/>; const landing=landings.find(l=>l.slug===path); if(landing)return <LandingPage landing={landing}/>; if(path.startsWith("politica")||path==="termos-de-uso")return <LegalPage kind={path as keyof typeof legalDocuments}/>; notFound();}
