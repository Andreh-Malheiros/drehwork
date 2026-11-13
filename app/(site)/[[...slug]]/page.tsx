import type { Metadata } from "next";
import Image from "next/image";
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
function CTA({ context = "meu projeto", title, description, primaryLabel = "Solicitar diagnóstico gratuito", showSecondary = true }: { context?: string; title?: string; description?: string; primaryLabel?: string; showSecondary?: boolean }) { return <section className="cta-band"><div className="cta-band-field" aria-hidden><BrandSymbol className="cta-band-symbol" /></div><div className="shell" data-reveal><Eyebrow>Próximo passo</Eyebrow><SplitHeading>{title ?? "Sua empresa está sendo encontrada por quem procura o seu serviço?"}</SplitHeading>{description === "" ? null : <p>{description ?? "O diagnóstico é gratuito e sem compromisso: mostramos o que um cliente encontra hoje quando procura a sua empresa e o que vale ajustar primeiro. Se não fizer sentido para o seu momento, diremos isso com clareza."}</p>}<div className="button-row"><Link className="button light" href="/diagnostico">{primaryLabel}</Link>{showSecondary ? <a className="text-link light" href={whatsappUrl(context)} target="_blank" rel="noreferrer">Conversar no WhatsApp</a> : null}</div></div></section>; }
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
      <h1 className="hero-slogan">O que o seu negócio precisa ter no digital?</h1>
      <p>A DrehWork cria a solução digital que o seu negócio precisa: site, loja, sistema sob medida, automação, integrações, Instagram e presença no Google. Primeiro, a gente analisa o que você tem hoje e indica por onde começar. Atendimento em Belo Horizonte e remoto para outras regiões do Brasil.</p>
      <div className="hero-actions"><Link className="button primary" href="/diagnostico">Pedir diagnóstico gratuito</Link><a className="text-link" href={whatsappUrl("tirar uma dúvida sobre meu projeto")} target="_blank" rel="noreferrer">Tirar uma dúvida</a></div>
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

  <section className="section home-svc"><div className="shell"><Eyebrow>O que fazemos</Eyebrow><div className="home-section-heading"><SplitHeading>O que precisa ficar mais claro para o seu cliente?</SplitHeading><Link className="text-link" href="/servicos">Todos os serviços</Link></div><p>Site, loja, sistema, automação e presença no Google resolvem necessidades diferentes. No diagnóstico, a gente identifica o que vale olhar primeiro.</p><HomeServices /></div></section>

  <section className="section home-process"><div className="shell" data-reveal><Eyebrow>Planejar / Criar / Evoluir</Eyebrow><div className="home-section-heading"><SplitHeading>Estratégia antes do design.</SplitHeading><p>O visual entra quando objetivo, mensagem e próximo passo do cliente já estão definidos. É isso que separa um site bonito de um site que gera resultado.</p></div><ol className="process-phases" data-stagger>{processPhases.map(([phase, steps], index) => <li key={phase}><span>{String(index + 1).padStart(2, "0")}</span><h3>{phase}</h3><p>{steps.join(" · ")}</p><i aria-hidden /></li>)}</ol><Link className="text-link process-link" href="/processo">Ver processo detalhado</Link></div></section>

  <section className="section home-found" aria-labelledby="found-title"><div className="shell"><Eyebrow>SEO, busca e inteligência artificial</Eyebrow><div className="home-section-heading"><SplitHeading id="found-title">Se o cliente não encontra, a empresa não existe para ele.</SplitHeading><p>A decisão começa no Google, no Maps e, cada vez mais, em assistentes de IA. Estruturamos site e perfil para que esses sistemas entendam quem é a empresa, o que oferece, onde atua e como contratá-la.</p></div><DiscoveryDemo /></div></section>

  <section className="section objective-section"><div className="shell" data-reveal><Eyebrow>Direção personalizada</Eyebrow><div className="home-section-heading"><SplitHeading>O que sua empresa precisa resolver agora?</SplitHeading><p>Selecione um objetivo. A interface organiza um caminho inicial sem enviar seus dados.</p></div><ObjectiveSelector /></div></section>

  <section className="formalization-section section-light" aria-labelledby="home-trust-title"><div className="shell" data-reveal><Eyebrow>Segurança para contratar</Eyebrow><div className="home-section-heading"><SplitHeading id="home-trust-title">Combinado por escrito, conferido antes de entregar.</SplitHeading></div><dl className="trust-list" data-stagger>{trustItems.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl></div></section>

  <section className="section home-guides"><div className="shell" data-reveal><Eyebrow>Guias</Eyebrow><div className="home-section-heading"><SplitHeading>Dúvidas comuns, respondidas sem rodeio.</SplitHeading><Link className="text-link" href="/insights">Todos os guias</Link></div><ul className="guide-list" data-stagger>{insights.slice(0, 4).map(i => <li key={i.slug}><Link href={`/insights/${i.slug}`}><span className="guide-list-category">{i.category}</span><strong>{i.title}</strong><span className="guide-list-time">{readingMinutes(i)} min de leitura</span></Link></li>)}</ul></div></section>

  <section className="section home-faq"><div className="shell faq-layout" data-reveal><div><Eyebrow>Perguntas frequentes</Eyebrow><SplitHeading>Respostas diretas, antes da primeira conversa.</SplitHeading><p>Escopo, prazo e investimento são confirmados em proposta, de acordo com cada projeto. Veja <Link className="text-link" href="/quanto-custa-um-site">o que define o preço de um site</Link>.</p></div><div className="faq-list" data-stagger>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden>+</span></summary><p>{answer}</p></details>)}</div></div></section>
  <JsonLd data={homeFaqSchema()} />
  <CTA title="Quer saber o que o seu negócio precisa no digital?" primaryLabel="Pedir diagnóstico gratuito" showSecondary={false} description="" />
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
function projectRole(project: typeof projects[number]) { return project.role ?? (project.createdByDrehWork ? "Criação e desenvolvimento" : "Manutenção e evolução"); }
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

function ServicesPage() {
  const serviceChoices = [
    { title: "Criar um site", description: "organizar oferta e contato.", href: "/servicos/sites-profissionais" },
    { title: "Melhorar um site", description: "rever leitura, clareza e navegação.", href: "/servicos/reformulacao-de-sites" },
    { title: "Montar uma loja", description: "estruturar catálogo e compra.", href: "/servicos/lojas-shopify" },
    { title: "Criar um sistema sob medida", description: "painéis, cadastros, agendamentos e processos do seu negócio." },
    { title: "Automatizar e integrar", description: "WhatsApp, e-mail, planilhas e ferramentas trabalhando juntas.", href: "/servicos/automacao-de-processos" },
    { title: "Organizar Google e Instagram", description: "informações, perfil e caminhos de contato.", href: "/servicos/presenca-digital" },
    { title: "Outra ideia ou projeto", description: "conte o que você imagina e a gente avalia.", href: "/contato" },
  ] as const;
  return <>
  <PageHero eyebrow="Serviços" title="Do site ao sistema sob medida: o que o seu negócio precisa?" lead="Alguns negócios precisam de um site mais claro ou de uma loja. Outros precisam de um sistema próprio, de automações para o atendimento, de integrações ou de uma presença organizada no Google e no Instagram. A gente começa entendendo o que existe hoje e o que você quer resolver.">
    <div className="button-row"><Link className="button primary" href="/diagnostico">Pedir diagnóstico gratuito</Link></div>
  </PageHero>
  <section className="section services-index-section"><div className="shell">
    <ul className="service-index" data-stagger>{serviceChoices.map(choice => <li key={choice.title}>
      {"href" in choice
        ? <Link className="service-row" href={choice.href}><h2>{choice.title}</h2><p>{choice.description}</p><b aria-hidden>↗</b></Link>
        : <div className="service-row"><h2>{choice.title}</h2><p>{choice.description}</p></div>}
    </li>)}</ul>
  </div></section>
  <section className="section section-light needs-section"><div className="shell"><Eyebrow>O que você quer resolver?</Eyebrow><div className="home-section-heading"><SplitHeading>Encontre o caminho certo para o seu negócio.</SplitHeading></div><nav className="need-links" aria-label="Soluções por necessidade">{landings.map(l => <Link key={l.slug} href={`/${l.slug}`}><span>{l.seoTitle}</span><b aria-hidden>↗</b></Link>)}</nav></div></section>
  <CTA title="Ainda não sabe qual caminho combina com o que precisa?" primaryLabel="Pedir diagnóstico gratuito" showSecondary={false} description="" />
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
  const caseStudy = project.caseStudy;
  const canonicalUrl = `${brand.url}/projetos/${project.slug}`;
  const publishedDate = caseStudy?.publishedAt.split("-").map(Number);
  const publishedLabel = publishedDate ? new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(publishedDate[0], publishedDate[1] - 1, publishedDate[2]))) : null;
  const schema = caseStudy
    ? { "@context": "https://schema.org", "@type": "Article", "@id": `${canonicalUrl}#case-study`, headline: caseStudy.h1, description: caseStudy.metaDescription, image: project.media[0].src ? [`${brand.url}${project.media[0].src}`] : undefined, datePublished: caseStudy.publishedAt, dateModified: caseStudy.updatedAt, inLanguage: "pt-BR", mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl }, author: { "@id": `${brand.url}/#organization` }, publisher: { "@id": `${brand.url}/#organization` }, about: { "@type": "Brand", name: project.name, url: project.url } }
    : { "@context": "https://schema.org", "@type": "CreativeWork", name: project.name, url: project.url, inLanguage: "pt-BR", creator: project.createdByDrehWork ? { "@id": `${brand.url}/#organization` } : undefined };
  return <>
    <article className="project-case">
      <PageHero eyebrow={caseStudy ? "Projeto concluído · Estudo de caso" : project.category} title={caseStudy?.h1 ?? project.name} lead={caseStudy?.heroLead ?? (project.createdByDrehWork ? "Projeto integralmente criado e desenvolvido pela DrehWork." : "Atuação contínua em manutenção, personalização, correções e evolução da experiência Shopify.")} aside={<HeroFacts items={[["Papel da DrehWork", projectRole(project)], ["Situação", project.status], ["Endereço", <a key="url" className="text-link" href={project.url} target="_blank" rel="noreferrer">{hostOf(project.url)}</a>]]} />}>
        {caseStudy && publishedLabel ? <p className="case-published"><time dateTime={caseStudy.publishedAt}>Publicado em {publishedLabel}</time></p> : null}
        <div className="button-row"><a className="button primary" href={project.url} target="_blank" rel="noreferrer">Abrir o site publicado</a><Link className="text-link" href="/diagnostico">Quero um projeto assim</Link></div>
      </PageHero>
      <section className="case-showcase"><div className="shell"><ProjectFrame project={project} mode="scroll" priority sizes="(max-width: 1240px) 94vw, 1180px" /><p className="case-showcase-hint">{caseStudy ? "Vitrine publicada da Pqueninos Lembranças. Use a rolagem dentro da janela para conhecer a experiência." : "Role dentro da janela para percorrer a página publicada."}</p></div></section>
      {caseStudy ? <>
        <section className="section case-narrative"><div className="shell case-narrative-grid">
          <div className="case-narrative-intro"><Eyebrow>Contexto</Eyebrow><SplitHeading>Uma vitrine pensada para a rotina da marca.</SplitHeading><p>{caseStudy.context}</p></div>
          <div className="case-narrative-details">
            <section><Eyebrow>Desafio</Eyebrow><h2>Organizar o catálogo e aproximar o pedido.</h2><p>{caseStudy.challenge}</p></section>
            <section><Eyebrow>Solução</Eyebrow><h2>Uma jornada simples, do produto ao WhatsApp.</h2><p>{caseStudy.solution}</p></section>
            <section><Eyebrow>Busca orgânica</Eyebrow><h2>Preparação técnica para indexação.</h2><p>{caseStudy.discoverability}</p></section>
          </div>
        </div></section>
        {project.media.length > 1 ? <section className="section case-gallery-section"><div className="shell"><Eyebrow>Materiais do projeto</Eyebrow><SplitHeading>Experiência e relacionamento.</SplitHeading><div className="case-gallery-grid">{project.media.slice(1).map(item => item.src ? <figure key={item.src} className="case-gallery-item"><Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 800px) 90vw, 480px" /><figcaption>{item.caption ?? item.alt}</figcaption></figure> : null)}</div></div></section> : null}
        {caseStudy.testimonials?.length ? <section className="section case-testimonials"><div className="shell"><Eyebrow>Depoimento</Eyebrow><SplitHeading>O que a marca disse sobre o projeto.</SplitHeading><div className="case-testimonial-list">{caseStudy.testimonials.map(t => <figure key={t.quote} className="case-testimonial"><blockquote>{t.quote}</blockquote><figcaption><strong>{t.author}</strong><span>{t.source}</span></figcaption></figure>)}</div></div></section> : null}
        <section className="section case-followup"><div className="shell case-followup-inner"><div><Eyebrow>Continuidade do projeto</Eyebrow><SplitHeading>Uma boa experiência também se constrói depois da compra.</SplitHeading></div><p>{caseStudy.followUp}</p></div></section>
      </> : null}
      <section className="section shell case-scope"><div><Eyebrow>Escopo</Eyebrow><SplitHeading>O que foi entregue</SplitHeading></div><ul className="scope-list" data-stagger>{project.scope.map(x => <li key={x}>{x}</li>)}</ul></section>
    </article>
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
  <PageHero eyebrow="Contato" title="O que seu negócio precisa resolver?" lead="Conte o que gostaria de melhorar e onde seu negócio aparece hoje. A DrehWork atende em Belo Horizonte e remotamente em outras regiões do Brasil.">
    <div className="button-row"><Link className="button primary" href="/diagnostico">Pedir diagnóstico gratuito</Link><a className="text-link" href={whatsappUrl("falar sobre meu caso")} target="_blank" rel="noreferrer">Falar sobre meu caso</a></div>
  </PageHero>
  <section className="section contact-section"><div className="shell"><ul className="contact-rows" data-stagger>
    <li><a href={whatsappUrl("minha presença digital")} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>{brand.whatsapp}</strong><small>{brand.hours}</small><b aria-hidden>↗</b></a></li>
    <li><a href={`mailto:${brand.email}`}><span>E-mail</span><strong>{brand.email}</strong><small>Para propostas e informações</small><b aria-hidden>↗</b></a></li>
    <li><a href={brand.instagramUrl} target="_blank" rel="noreferrer"><span>Instagram</span><strong>{brand.instagram}</strong><small>Conteúdo e bastidores</small><b aria-hidden>↗</b></a></li>
  </ul></div></section>
  <CTA/>
</>; }
function AboutPage() { return <>
  <PageHero eyebrow="Sobre" title="Uma empresa enxuta, com responsabilidade direta sobre cada entrega." lead={<>A DrehWork é conduzida por {brand.legalName}, com projetos para empresas de diferentes segmentos.</>} />
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

function renderPage(path:string){ if(!valid.has(path))notFound(); if(!path)return <Home/>; if(path==="servicos")return <ServicesPage/>; if(path==="projetos")return <ProjectsPage/>; if(path==="processo")return <ProcessPage/>; if(path==="diagnostico")return <><PageHero compact eyebrow="Diagnóstico gratuito" title="O que uma pessoa encontra ao procurar seu negócio?" lead="Conte sobre sua empresa e os canais que quer analisar. A gente observa as informações disponíveis e devolve pontos de atenção e um próximo passo possível. O diagnóstico é gratuito e sem compromisso." /><section className="section shell"><DiagnosticWizard/></section></>; if(path==="contato")return <ContactPage/>; if(path==="insights")return <InsightsPage/>; const insight=insights.find(i=>`insights/${i.slug}`===path); if(insight)return <InsightPage insight={insight}/>; if(path==="sobre")return <AboutPage/>; const service=services.find(s=>`servicos/${s.slug}`===path); if(service)return <ServicePage service={service}/>; const project=projects.find(p=>`projetos/${p.slug}`===path); if(project)return <ProjectPage project={project}/>; const landing=landings.find(l=>l.slug===path); if(landing)return <LandingPage landing={landing}/>; if(path.startsWith("politica")||path==="termos-de-uso")return <LegalPage kind={path as keyof typeof legalDocuments}/>; notFound();}
