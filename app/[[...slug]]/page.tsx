import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandSymbol } from "@/components/BrandLogo";
import { BrowserFrame, hostOf } from "@/components/BrowserFrame";
import { DiagnosticWizard } from "@/components/DiagnosticWizard";
import { HomeCases } from "@/components/HomeCases";
import { HomeHills } from "@/components/HomeHills";
import { HomeProblem } from "@/components/HomeProblem";
import { DiscoveryDemo } from "@/components/DiscoveryDemo";
import { HomeServices } from "@/components/HomeServices";
import { ObjectiveSelector } from "@/components/ObjectiveSelector";
import { PresenceShift } from "@/components/PresenceShift";
import { SplitHeading } from "@/components/SplitHeading";
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

function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="kicker">{children}</p>; }
function CTA({ context = "meu projeto" }: { context?: string }) { return <section className="cta-band"><div className="cta-band-field" aria-hidden><BrandSymbol className="cta-band-symbol" /></div><div className="shell" data-reveal><Eyebrow>Próximo passo</Eyebrow><SplitHeading>Sua empresa está sendo encontrada por quem procura o seu serviço?</SplitHeading><p>O diagnóstico é gratuito e sem compromisso: mostramos o que um cliente encontra hoje quando procura a sua empresa e o que vale ajustar primeiro. Se não fizer sentido para o seu momento, diremos isso com clareza.</p><div className="button-row"><Link className="button light" href="/diagnostico">Solicitar diagnóstico gratuito</Link><a className="text-link light" href={whatsappUrl(context)} target="_blank" rel="noreferrer">Conversar no WhatsApp</a></div></div></section>; }
const processPhases = [
  ["Entender", processSteps.slice(0, 2)],
  ["Estruturar", processSteps.slice(2, 4)],
  ["Construir", processSteps.slice(4, 6)],
  ["Validar", processSteps.slice(6, 9)],
  ["Evoluir", processSteps.slice(9)],
] as const;

const trustItems = [
  ["Contrato e nota fiscal", "Escopo, prazo e investimento formalizados antes de começar."],
  ["Atendimento direto", "Você fala com quem executa, sem intermediários."],
  ["Processo estruturado", "Diagnóstico e estratégia antes do design."],
  ["Publicação e verificação", "Domínio, formulários e indexação conferidos depois do ar."],
  ["Suporte e evolução", "Manutenção e melhorias contínuas, quando contratadas."],
  ["Todo o Brasil", "De Belo Horizonte, com atendimento remoto."],
] as const;

function Home() { return <>
  <section className="hero home-hero glsl-hero">
    <HomeHills />
    <div className="glsl-hero-copy">
      <h1 className="hero-keyword">Criação de sites profissionais, lojas virtuais e presença digital</h1>
      <div className="hero-slogan"><span>Visão que transforma.<br /></span>Estratégia que gera resultado.</div>
      <p>Sites, landing pages, lojas Shopify, SEO e Google Perfil da Empresa para empresas que querem ser encontradas, transmitir confiança e receber clientes pela internet. De Belo Horizonte para todo o Brasil, desde {brand.activeSince}.</p>
      <div className="hero-actions"><Link className="button primary" href="/diagnostico">Solicitar diagnóstico gratuito</Link><a className="text-link" href={whatsappUrl("um site para minha empresa")} target="_blank" rel="noreferrer">Falar no WhatsApp</a></div>
    </div>
  </section>

  <HomeProblem />

  <section className="section home-transformation" aria-labelledby="shift-title"><div className="shell"><PresenceShift /></div></section>

  <section className="section home-proof" id="resultados" aria-labelledby="home-proof-title">
    <div className="shell" data-reveal>
      <Eyebrow>Prova antes da promessa</Eyebrow>
      <div className="home-section-heading"><SplitHeading id="home-proof-title">Empresas reais. Entregas publicadas. Evolução contínua.</SplitHeading><Link className="text-link" href="/projetos">Ver portfólio</Link></div>
      <HomeCases />
      <dl className="proof-facts" data-stagger>
        <div><dt>Atuação profissional</dt><dd>Desde {brand.activeSince}</dd></div>
        <div><dt>Atendimento</dt><dd>Todo o Brasil</dd></div>
        <div><dt>Formalização</dt><dd>Contrato e NF</dd></div>
        <div><dt>Execução</dt><dd>Direto com quem faz</dd></div>
      </dl>
    </div>
  </section>

  <section className="section home-fit" aria-labelledby="home-fit-title">
    <div className="shell" data-reveal>
      <Eyebrow>Antes de falar com a gente</Eyebrow>
      <div className="home-section-heading"><SplitHeading id="home-fit-title">Não é para todo mundo. E isso é intencional.</SplitHeading><p>Trabalhamos melhor com quem enxerga a presença digital como investimento — não como custo.</p></div>
      <div className="fit-grid" data-stagger>
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

  <section className="section home-svc"><div className="shell"><Eyebrow>O que fazemos</Eyebrow><div className="home-section-heading"><SplitHeading>Um sistema de crescimento, não uma página isolada.</SplitHeading><Link className="text-link" href="/servicos">Todos os serviços</Link></div><HomeServices /></div></section>

  <section className="section home-process"><div className="shell" data-reveal><Eyebrow>Planejar / Criar / Evoluir</Eyebrow><div className="home-section-heading"><SplitHeading>Estratégia antes do design.</SplitHeading><p>O visual entra quando objetivo, mensagem e próximo passo do cliente já estão definidos. É isso que separa um site bonito de um site que gera resultado.</p></div><ol className="process-phases" data-stagger>{processPhases.map(([phase, steps], index) => <li key={phase}><span>{String(index + 1).padStart(2, "0")}</span><h3>{phase}</h3><p>{steps.join(" · ")}</p><i aria-hidden /></li>)}</ol><Link className="text-link process-link" href="/processo">Ver processo detalhado</Link></div></section>

  <section className="section home-found" aria-labelledby="found-title"><div className="shell"><Eyebrow>SEO, busca e inteligência artificial</Eyebrow><div className="home-section-heading"><SplitHeading id="found-title">Se o cliente não encontra, a empresa não existe para ele.</SplitHeading><p>A decisão começa no Google, no Maps e, cada vez mais, em assistentes de IA. Estruturamos site e perfil para que esses sistemas entendam quem é a empresa, o que oferece, onde atua e como contratá-la.</p></div><DiscoveryDemo /></div></section>

  <section className="section objective-section"><div className="shell" data-reveal><Eyebrow>Direção personalizada</Eyebrow><div className="home-section-heading"><SplitHeading>O que sua empresa precisa resolver agora?</SplitHeading><p>Selecione um objetivo. A interface organiza um caminho inicial sem enviar seus dados.</p></div><ObjectiveSelector /></div></section>

  <section className="formalization-section section-light" aria-labelledby="home-trust-title"><div className="shell" data-reveal><Eyebrow>Segurança para contratar</Eyebrow><div className="home-section-heading"><SplitHeading id="home-trust-title">Combinado por escrito, conferido antes de entregar.</SplitHeading></div><dl className="trust-list" data-stagger>{trustItems.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl></div></section>

  <section className="section home-guides"><div className="shell" data-reveal><Eyebrow>Guias</Eyebrow><div className="home-section-heading"><SplitHeading>Dúvidas comuns, respondidas sem rodeio.</SplitHeading><Link className="text-link" href="/insights">Todos os guias</Link></div><ul className="guide-list" data-stagger>{insights.slice(0, 4).map(i => <li key={i.slug}><Link href={`/insights/${i.slug}`}><span className="guide-list-category">{i.category}</span><strong>{i.title}</strong><span className="guide-list-time">{readingMinutes(i)} min de leitura</span></Link></li>)}</ul></div></section>

  <section className="section home-faq"><div className="shell faq-layout" data-reveal><div><Eyebrow>Perguntas frequentes</Eyebrow><SplitHeading>Respostas diretas, antes da primeira conversa.</SplitHeading><p>Escopo, prazo e investimento são confirmados em proposta, de acordo com cada projeto. Veja <Link className="text-link" href="/quanto-custa-um-site">o que define o preço de um site</Link>.</p></div><div className="faq-list" data-stagger>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden>+</span></summary><p>{answer}</p></details>)}</div></div></section>
  <JsonLd data={homeFaqSchema()} />
  <CTA />
</>; }

function PageHero({ eyebrow, title, lead, children, aside, compact = false }: { eyebrow: string; title: string; lead: React.ReactNode; children?: React.ReactNode; aside?: React.ReactNode; compact?: boolean }) {
  return <section className={`inner-hero${compact ? " is-compact" : ""}`}>
    <div className="shell">
      <Eyebrow>{eyebrow}</Eyebrow>
      <SplitHeading as="h1">{title}</SplitHeading>
      <div className="inner-hero-foot">
        <div><p className="lead">{lead}</p>{children}</div>
        {aside}
      </div>
    </div>
  </section>;
}
function HeroFacts({ items }: { items: [string, React.ReactNode][] }) {
  return <dl className="hero-facts">{items.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;
}
function projectRole(project: typeof projects[number]) { return project.createdByDrehWork ? "Criação e desenvolvimento" : "Manutenção e evolução"; }
function ProjectFrame({ project, mode = "hover", priority, sizes = "(max-width: 900px) 92vw, 720px" }: { project: typeof projects[number]; mode?: "hover" | "scroll"; priority?: boolean; sizes?: string }) {
  const cover = project.media[0];
  if (!cover.src) return null;
  return <BrowserFrame url={project.url} src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} sizes={sizes} mode={mode} priority={priority} />;
}
function ProjectSpread({ project, headingLevel = "h2" }: { project: typeof projects[number]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return <article className="project-spread">
    <Link href={`/projetos/${project.slug}`} className="project-spread-media" aria-label={`Ver o case ${project.name}`}><ProjectFrame project={project} /></Link>
    <div className="project-spread-copy">
      <p className="project-spread-role">{projectRole(project)}</p>
      <Heading>{project.name}</Heading>
      <p>{project.category}</p>
      <ul className="scope-chips" aria-label="Escopo">{project.scope.map(item => <li key={item}>{item}</li>)}</ul>
      <div className="button-row"><Link className="button primary" href={`/projetos/${project.slug}`}>Ver o case</Link><a className="text-link" href={project.url} target="_blank" rel="noreferrer">Abrir o site publicado</a></div>
    </div>
  </article>;
}
function GuideList({ list, showCategory = true }: { list: Insight[]; showCategory?: boolean }) {
  return <ul className={`guide-list${showCategory ? "" : " is-plain"}`} data-stagger>{list.map(i => <li key={i.slug}><Link href={`/insights/${i.slug}`}>{showCategory ? <span className="guide-list-category">{i.category}</span> : null}<span className="guide-list-main"><strong>{i.title}</strong>{showCategory ? null : <span className="guide-list-summary">{i.summary}</span>}</span><span className="guide-list-time">{readingMinutes(i)} min de leitura</span></Link></li>)}</ul>;
}

function ServicesPage() { return <>
  <PageHero eyebrow="Serviços" title="Tudo o que sua presença digital precisa para gerar resultado." lead="O site é o centro. Estratégia, SEO, automação e evolução contínua completam o sistema. Cada serviço começa pelo problema do negócio, não pelo layout.">
    <div className="button-row"><Link className="button primary" href="/diagnostico">Não sei por onde começar</Link></div>
  </PageHero>
  <section className="section services-index-section"><div className="shell">
    <ul className="service-index" data-stagger>{services.map(s => <li key={s.slug}><Link className="service-row" href={`/servicos/${s.slug}`}>
      <span className="service-row-eyebrow">{s.eyebrow}</span>
      <h2>{s.title}</h2>
      <p>{s.summary}</p>
      <ul className="service-row-items">{s.items.map(item => <li key={item}>{item}</li>)}</ul>
      <b aria-hidden>↗</b>
    </Link></li>)}</ul>
  </div></section>
  <section className="section section-light needs-section"><div className="shell"><Eyebrow>Soluções por necessidade</Eyebrow><div className="home-section-heading"><SplitHeading>Encontre o caminho certo para o seu negócio.</SplitHeading></div><nav className="need-links" aria-label="Soluções por necessidade">{landings.map(l => <Link key={l.slug} href={`/${l.slug}`}><span>{l.seoTitle}</span><b aria-hidden>↗</b></Link>)}</nav></div></section>
  <CTA />
</>; }
function RelatedProjects({ slugs }: { slugs: string[] }) {
  const list = slugs.map(slug => projects.find(p => p.slug === slug)).filter((p): p is typeof projects[number] => Boolean(p));
  if (!list.length) return null;
  return <section className="section projects-section"><div className="shell"><Eyebrow>Projetos relacionados</Eyebrow><div className="home-section-heading"><SplitHeading>Trabalhos publicados neste formato.</SplitHeading><Link className="text-link" href="/projetos">Ver portfólio</Link></div><div className="project-spreads">{list.map(p => <ProjectSpread key={p.slug} project={p} headingLevel="h3" />)}</div></div></section>;
}
function FaqBlock({ title, items }: { title: string; items: [string, string][] }) {
  return <><section className="section home-faq"><div className="shell faq-layout"><div><Eyebrow>Perguntas frequentes</Eyebrow><SplitHeading>{title}</SplitHeading></div><div className="faq-list">{items.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden>+</span></summary><p>{answer}</p></details>)}</div></div></section><JsonLd data={faqSchema(items)} /></>;
}
function ServicePage({ service }: { service: typeof services[number] }) {
  const others = services.filter(s => s.slug !== service.slug);
  return <>
    <PageHero eyebrow={service.eyebrow} title={service.h1} lead={service.summary} aside={<HeroFacts items={[["Investimento", "Sob proposta, após o diagnóstico"], ["Formalização", "Contrato e nota fiscal"], ["Atendimento", "Direto com quem executa"]]} />}>
      <div className="button-row"><Link className="button primary" href={`/diagnostico?objetivo=${service.slug}`}>Solicitar diagnóstico gratuito</Link><a className="text-link" href={whatsappUrl(service.title)} target="_blank" rel="noreferrer">Falar no WhatsApp</a></div>
    </PageHero>
    <section className="section section-light audience-section"><div className="shell audience-grid"><div><Eyebrow>Para quem é</Eyebrow><SplitHeading>{`${service.title} para quem precisa de resultado.`}</SplitHeading></div><ul className="audience-list" data-stagger>{service.audience.map(x => <li key={x}>{x}</li>)}</ul></div></section>
    <section className="section deliverables-section"><div className="shell"><Eyebrow>O que está incluído</Eyebrow><div className="home-section-heading"><SplitHeading>Escopo pensado ao redor do resultado.</SplitHeading></div><dl className="deliverable-list" data-stagger>{service.deliverables.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl></div></section>
    <section className="section terms-section"><div className="shell terms-grid"><div><Eyebrow>Prazo e investimento</Eyebrow><SplitHeading>Proposta clara antes de começar.</SplitHeading></div><div className="terms-copy"><dl className="terms-facts"><div><dt>Prazo no escopo padrão</dt><dd>Até 5 dias úteis</dd></div><div><dt>Investimento</dt><dd>Sob proposta</dd></div></dl><p>O prazo conta a partir da aprovação dos textos e do recebimento dos materiais. O investimento depende do número de páginas, dos textos, das integrações e do nível de personalização, e é apresentado em proposta detalhada, com contrato e nota fiscal.</p><Link className="text-link" href="/quanto-custa-um-site">Entenda o que define o preço</Link></div></div></section>
    <RelatedProjects slugs={service.relatedProjects} />
    <FaqBlock title={`${service.title}: o que você precisa saber.`} items={service.faqs} />
    <RelatedInsights list={insights.filter(i => i.relatedServices.includes(service.slug)).slice(0, 4)} title="Guias para decidir melhor" />
    <section className="section other-services"><div className="shell"><Eyebrow>Outros serviços</Eyebrow><nav className="need-links is-dark" aria-label="Outros serviços">{others.map(s => <Link key={s.slug} href={`/servicos/${s.slug}`}><span>{s.title}</span><b aria-hidden>↗</b></Link>)}</nav></div></section>
    <JsonLd data={serviceSchema(service)}/><CTA context={service.title}/>
  </>;
}
function LandingPage({ landing }: { landing: Landing }) {
  const related = landing.relatedServices.map(slug => services.find(s => s.slug === slug)).filter((s): s is typeof services[number] => Boolean(s));
  return <>
    <PageHero eyebrow={landing.eyebrow} title={landing.h1} lead={landing.lead}>
      <div className="button-row"><Link className="button primary" href="/diagnostico">Solicitar diagnóstico gratuito</Link><a className="text-link" href={whatsappUrl(landing.context)} target="_blank" rel="noreferrer">Falar no WhatsApp</a></div>
    </PageHero>
    <section className="section landing-body"><div className="shell">{landing.sections.map(section => <div className="landing-block" key={section.heading}><h2>{section.heading}</h2><div>{section.paragraphs?.map(p => <p key={p}>{p}</p>)}{section.items ? <ul className="audience-list is-dark">{section.items.map(item => <li key={item}>{item}</li>)}</ul> : null}</div></div>)}</div></section>
    <RelatedProjects slugs={landing.relatedProjects} />
    <FaqBlock title="Perguntas frequentes" items={landing.faqs} />
    <section className="section other-services"><div className="shell"><Eyebrow>Serviços relacionados</Eyebrow><nav className="need-links is-dark" aria-label="Serviços relacionados">{related.map(s => <Link key={s.slug} href={`/servicos/${s.slug}`}><span>{s.title}</span><b aria-hidden>↗</b></Link>)}</nav></div></section>
    <CTA context={landing.context} />
  </>;
}
function ProjectsPage() { return <>
  <PageHero eyebrow="Portfólio" title="Projetos publicados, com escopo e autoria claros." lead="Cada projeto mostra o que foi feito e o papel da DrehWork nele: criação completa ou manutenção e evolução de uma operação existente. Passe o cursor sobre a janela para percorrer a página publicada." />
  <section className="section projects-section"><div className="shell project-spreads">{projects.map(p => <ProjectSpread key={p.slug} project={p} />)}</div></section>
  <CTA />
</>; }
function ProjectPage({ project }: { project: typeof projects[number] }) {
  const relatedServices = services.filter(s => s.relatedProjects.includes(project.slug));
  const others = projects.filter(p => p.slug !== project.slug);
  const schema = { "@context": "https://schema.org", "@type": "CreativeWork", name: project.name, url: project.url, inLanguage: "pt-BR", creator: project.createdByDrehWork ? { "@id": `${brand.url}/#organization` } : undefined };
  return <>
    <PageHero eyebrow={project.category} title={project.name} lead={project.createdByDrehWork ? "Projeto integralmente criado e desenvolvido pela DrehWork." : "Atuação contínua em manutenção, personalização, correções e evolução da experiência Shopify."} aside={<HeroFacts items={[["Papel da DrehWork", projectRole(project)], ["Situação", project.status], ["Endereço", <a key="url" className="text-link" href={project.url} target="_blank" rel="noreferrer">{hostOf(project.url)}</a>]]} />}>
      <div className="button-row"><a className="button primary" href={project.url} target="_blank" rel="noreferrer">Abrir o site publicado</a><Link className="text-link" href="/diagnostico">Quero um projeto assim</Link></div>
    </PageHero>
    <section className="case-showcase"><div className="shell"><ProjectFrame project={project} mode="scroll" priority sizes="(max-width: 1240px) 94vw, 1180px" /><p className="case-showcase-hint">Role dentro da janela para percorrer a página publicada.</p></div></section>
    <section className="section shell case-scope"><div><Eyebrow>Escopo</Eyebrow><SplitHeading>O que foi entregue</SplitHeading></div><ul className="scope-list" data-stagger>{project.scope.map(x => <li key={x}>{x}</li>)}</ul></section>
    {relatedServices.length ? <section className="section other-services"><div className="shell"><Eyebrow>Serviços deste projeto</Eyebrow><nav className="need-links is-dark" aria-label="Serviços relacionados">{relatedServices.map(s => <Link key={s.slug} href={`/servicos/${s.slug}`}><span>{s.title}</span><b aria-hidden>↗</b></Link>)}</nav></div></section> : null}
    <section className="section next-cases"><div className="shell"><Eyebrow>Outros projetos</Eyebrow><nav className="next-case-list" aria-label="Outros projetos">{others.map(p => <Link key={p.slug} href={`/projetos/${p.slug}`}><strong>{p.name}</strong><span>{projectRole(p)}</span><b aria-hidden>↗</b></Link>)}</nav></div></section>
    <JsonLd data={schema}/><CTA context={`um projeto como ${project.name}`}/>
  </>;
}
const processDetails = ["Entendimento da empresa, objetivo, público e situação atual.","Definição de prioridades, mensagens, conversões e diferenciais.","Organização de páginas, conteúdo, navegação e fluxos.","Hierarquia, identidade, componentes e comportamento visual.","Construção com foco em desempenho, responsividade e manutenção.","Configuração dos canais e recursos previstos no escopo.","Testes técnicos, de conteúdo, acessibilidade e funcionamento.","Disponibilização no ambiente final após aprovação.","Validação do domínio, formulários, indexação e eventos.","Suporte, manutenção e melhorias futuras."];
function ProcessPage() {
  return <>
    <PageHero eyebrow="Processo" title="Planejar. Criar. Evoluir." lead="Um método em 10 etapas que organiza negócio, público, conteúdo, experiência e tecnologia, para que nada seja decidido no improviso." />
    <section className="section process-timeline-section"><div className="shell"><ol className="process-timeline">{processPhases.map(([phase, steps]) => <li key={phase} className="process-phase"><h2>{phase}</h2><ol>{steps.map(s => { const step = processSteps.indexOf(s); return <li key={s}><span>{String(step + 1).padStart(2, "0")}</span><div><h3>{s}</h3><p>{processDetails[step]}</p></div></li>; })}</ol></li>)}</ol></div></section>
    <CTA/>
  </>;
}
function ContactPage() { return <>
  <PageHero eyebrow="Contato" title="Fale direto com quem vai executar o seu projeto." lead="Sem intermediários e sem roteiro de vendas. Empresa de Belo Horizonte (MG), com atendimento remoto para todo o Brasil." />
  <section className="section contact-section"><div className="shell"><ul className="contact-rows" data-stagger>
    <li><a href={whatsappUrl("minha presença digital")} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>{brand.whatsapp}</strong><small>{brand.hours}</small><b aria-hidden>↗</b></a></li>
    <li><a href={`mailto:${brand.email}`}><span>E-mail</span><strong>{brand.email}</strong><small>Para propostas e informações</small><b aria-hidden>↗</b></a></li>
    <li><a href={brand.instagramUrl} target="_blank" rel="noreferrer"><span>Instagram</span><strong>{brand.instagram}</strong><small>Conteúdo e bastidores</small><b aria-hidden>↗</b></a></li>
  </ul></div></section>
  <CTA/>
</>; }
function AboutPage() { return <>
  <PageHero eyebrow="Sobre" title="Uma empresa enxuta, com responsabilidade direta sobre cada entrega." lead={<>A DrehWork é conduzida por {brand.legalName}. Atuação profissional desde {brand.activeSince}, com projetos para empresas de diferentes segmentos.</>} />
  <section className="section principles-section"><div className="shell audience-grid"><div><Eyebrow>Como trabalhamos</Eyebrow><SplitHeading>Planejar. Criar. Evoluir.</SplitHeading></div><dl className="deliverable-list is-single" data-stagger>
    <div><dt>Atendimento direto</dt><dd>Sem intermediários entre você e quem executa.</dd></div>
    <div><dt>Estratégia antes do design</dt><dd>Objetivo, público e mensagem definidos primeiro.</dd></div>
    <div><dt>Publicação verificada</dt><dd>Domínio, formulários, indexação e eventos conferidos.</dd></div>
    <div><dt>Evolução contínua</dt><dd>Melhorias depois da entrega, quando contratadas.</dd></div>
  </dl></div></section>
  <section className="section section-light identity-section"><div className="shell audience-grid"><div><Eyebrow>Formalização</Eyebrow><SplitHeading>Contrato, nota fiscal e responsabilidade registrada.</SplitHeading></div><div><p className="identity-lead">Todos os projetos são formalizados em contrato, com emissão de nota fiscal.</p><dl className="identity-facts">
    <div><dt>Nome comercial</dt><dd>DrehWork</dd></div>
    <div><dt>Responsável</dt><dd>{brand.legalName}</dd></div>
    <div><dt>CNPJ</dt><dd>{brand.cnpj}</dd></div>
    <div><dt>Base</dt><dd>Belo Horizonte (MG)</dd></div>
    <div><dt>Atendimento</dt><dd>Remoto, em todo o Brasil</dd></div>
    <div><dt>Atuação desde</dt><dd>{brand.activeSince}</dd></div>
  </dl></div></div></section>
  <CTA context="trabalhar com a DrehWork"/>
</>; }
const dateFormat = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" });
const formatDate = (iso: string) => dateFormat.format(new Date(`${iso}T12:00:00Z`));
function RelatedInsights({ list, title }: { list: Insight[]; title: string }) {
  if (!list.length) return null;
  return <section className="section related-guides"><div className="shell"><Eyebrow>Guias</Eyebrow><div className="home-section-heading"><SplitHeading>{title}</SplitHeading><Link className="text-link" href="/insights">Todos os guias</Link></div><GuideList list={list} /></div></section>;
}
function InsightsPage() {
  return <>
    <PageHero eyebrow="Guias" title="Guias práticos sobre sites, Google, lojas virtuais e IA" lead="Respostas diretas para as dúvidas mais comuns de quem quer ser encontrado, transmitir confiança e vender pela internet. Sem promessas milagrosas e sem jargão desnecessário."><nav className="related-links" aria-label="Categorias">{insightCategories.filter(c => insights.some(i => i.category === c)).map(c => <a key={c} href={`#${c.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{c}</a>)}</nav></PageHero>
    {insightCategories.map(category => { const list = insights.filter(i => i.category === category); if (!list.length) return null; const id = category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-"); return <section className="section insight-category" id={id} key={category}><div className="shell insight-category-grid"><div><h2>{category}</h2><p>{list.length} {list.length === 1 ? "guia" : "guias"}</p></div><GuideList list={list} showCategory={false} /></div></section>; })}
    <CTA context="uma dúvida sobre minha presença digital" />
  </>;
}
function InsightPage({ insight }: { insight: Insight }) {
  const related = insight.relatedServices.map(slug => services.find(s => s.slug === slug)).filter((s): s is typeof services[number] => Boolean(s));
  const more = insights.filter(i => i.slug !== insight.slug && (i.category === insight.category || i.relatedServices.some(s => insight.relatedServices.includes(s)))).slice(0, 3);
  return <>
    <article className="insight-article">
      <header className="page-hero shell insight-hero"><Eyebrow>{insight.category}</Eyebrow><h1>{insight.title}</h1><p className="lead">{insight.intro}</p><p className="insight-meta">Por {brand.legalName} · Publicado em <time dateTime={insight.date}>{formatDate(insight.date)}</time>{insight.updated !== insight.date ? <> · Atualizado em <time dateTime={insight.updated}>{formatDate(insight.updated)}</time></> : null} · {readingMinutes(insight)} min de leitura</p></header>
      <div className="section shell">{insight.sections.map(section => <section className="prose-block" key={section.heading}><h2>{section.heading}</h2>{section.paragraphs?.map(p => <p key={p}>{p}</p>)}{section.items ? <ul className="check-list">{section.items.map(item => <li key={item}>{item}</li>)}</ul> : null}</section>)}{insight.sources?.length ? <section className="prose-block"><h2>Fontes</h2><ul className="check-list">{insight.sources.map(source => <li key={source.url}><a className="text-link" href={source.url} target="_blank" rel="noreferrer">{source.title}</a></li>)}</ul></section> : null}</div>
    </article>
    <FaqBlock title="Perguntas frequentes" items={insight.faqs} />
    <section className="section other-services"><div className="shell"><Eyebrow>Como a DrehWork pode ajudar</Eyebrow><nav className="need-links is-dark" aria-label="Serviços relacionados">{related.map(s => <Link key={s.slug} href={`/servicos/${s.slug}`}><span>{s.title}</span><b aria-hidden>↗</b></Link>)}</nav></div></section>
    <RelatedInsights list={more} title="Continue lendo" />
    <JsonLd data={articleSchema(insight)} />
    <CTA context={`o guia "${insight.title}"`} />
  </>;
}
function LegalPage({kind}:{kind:keyof typeof legalDocuments}) { const doc=legalDocuments[kind]; return <section className="page-hero legal legal-doc shell"><Eyebrow>Documento legal</Eyebrow><h1>{doc.title}</h1><p className="lead">{doc.summary}</p><p className="legal-updated">Última atualização: {doc.updated}</p>{doc.sections.map(section=><section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs?.map(p=><p key={p}>{p}</p>)}{section.items?<ul>{section.items.map(item=><li key={item}>{item}</li>)}</ul>:null}</section>)}</section> }

export default async function Page({params}:Props){const path=(await params).slug?.join("/")||""; return <>{renderPage(path)}<JsonLd data={breadcrumbFor(path)}/></>;}

function renderPage(path:string){ if(!valid.has(path))notFound(); if(!path)return <Home/>; if(path==="servicos")return <ServicesPage/>; if(path==="projetos")return <ProjectsPage/>; if(path==="processo")return <ProcessPage/>; if(path==="diagnostico")return <><PageHero compact eyebrow="Diagnóstico gratuito" title="Uma análise inicial para organizar o próximo passo." lead="Cinco etapas rápidas. Você recebe uma leitura objetiva da sua presença digital e do caminho recomendado, sem compromisso de contratação." /><section className="section shell"><DiagnosticWizard/></section></>; if(path==="contato")return <ContactPage/>; if(path==="insights")return <InsightsPage/>; const insight=insights.find(i=>`insights/${i.slug}`===path); if(insight)return <InsightPage insight={insight}/>; if(path==="sobre")return <AboutPage/>; const service=services.find(s=>`servicos/${s.slug}`===path); if(service)return <ServicePage service={service}/>; const project=projects.find(p=>`projetos/${p.slug}`===path); if(project)return <ProjectPage project={project}/>; const landing=landings.find(l=>l.slug===path); if(landing)return <LandingPage landing={landing}/>; if(path.startsWith("politica")||path==="termos-de-uso")return <LegalPage kind={path as keyof typeof legalDocuments}/>; notFound();}
