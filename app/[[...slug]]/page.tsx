import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DiagnosticWizard } from "@/components/DiagnosticWizard";
import { HomeProblem } from "@/components/HomeProblem";
import { HomeServices } from "@/components/HomeServices";
import { ObjectiveSelector } from "@/components/ObjectiveSelector";
import { PresenceComparison } from "@/components/PresenceComparison";
import { GLSLHills } from "@/components/ui/glsl-hills";
import { brand, faqs, insights, processSteps, projects, services, whatsappUrl } from "@/content/site";

type Props = { params: Promise<{ slug?: string[] }> };
const valid = new Set(["", "servicos", "projetos", "processo", "diagnostico", "contato", "insights", "politica-de-privacidade", "politica-de-cookies", "termos-de-uso", ...services.map(s => `servicos/${s.slug}`), ...projects.map(p => `projetos/${p.slug}`)]);

export async function generateStaticParams() {
  return [...valid].map(path => ({ slug: path ? path.split("/") : undefined }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = (await params).slug?.join("/") || "";
  const service = services.find(s => `servicos/${s.slug}` === path); const project = projects.find(p => `projetos/${p.slug}` === path);
  const title = service?.title || project?.name || ({ servicos: "Serviços", projetos: "Projetos", processo: "Processo", diagnostico: "Diagnóstico gratuito", contato: "Contato", insights: "Insights", "politica-de-privacidade": "Política de Privacidade", "politica-de-cookies": "Política de Cookies", "termos-de-uso": "Termos de Uso" } as Record<string,string>)[path];
  return { title, description: service?.summary || (project ? `${project.name}: ${project.category}. Conheça a atuação confirmada da Dreh Work.` : undefined), alternates: { canonical: `/${path}` } };
}

function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="kicker"><span aria-hidden>+</span> {children}</p>; }
function CTA({ context = "meu projeto" }: { context?: string }) { return <section className="cta-band"><div className="shell"><Eyebrow>Próximo movimento</Eyebrow><h2>O que sua presença digital precisa provar?</h2><p>Receba uma análise inicial sobre clareza, confiança, descoberta e oportunidades.</p><div className="button-row"><Link className="button light" href="/diagnostico">Solicitar diagnóstico gratuito</Link><a className="text-link light" href={whatsappUrl(context)} target="_blank" rel="noreferrer">Conversar no WhatsApp</a></div></div></section>; }
function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) { return <article className="project-card"><div className="media-fallback" role="img" aria-label={project.media[0].alt}><span>{String(index + 1).padStart(2,"0")}</span><b>MÍDIA<br/>PENDENTE</b><small>{project.name}</small></div><div className="project-copy"><p className="kicker">{project.category}</p><h3>{project.name}</h3><p>{project.createdByDrehWork ? "Projeto criado e desenvolvido pela Dreh Work." : "Atuação recorrente em manutenção, personalização e evolução da experiência."}</p><Link className="text-link" href={`/projetos/${project.slug}`}>Ver estudo de caso</Link></div></article>; }

const processPhases = [
  ["Entender", processSteps.slice(0, 2)],
  ["Estruturar", processSteps.slice(2, 4)],
  ["Construir", processSteps.slice(4, 6)],
  ["Validar", processSteps.slice(6, 9)],
  ["Evoluir", processSteps.slice(9)],
] as const;

type ProjectPreviewStyle = CSSProperties & { "--project-preview-image": string };

const projectPreviewImages: Record<string, string> = {
  "bh-carimbos": "https://picsum.photos/seed/bh-carimbos/1200/900",
  amftv: "https://picsum.photos/seed/amftv/1200/900",
  "wayne-store": "https://picsum.photos/seed/wayne-store/1200/900",
  "noar-oficial": "https://picsum.photos/seed/noar-oficial/1200/900",
  "ammis-moda": "https://picsum.photos/seed/ammis-moda/1200/900",
};

const projectPreviewStyle = (slug: string): ProjectPreviewStyle => ({
  "--project-preview-image": `url("${projectPreviewImages[slug] || "https://picsum.photos/seed/dreh-work-project/1200/900"}")`,
});

function Home() { return <>
  <section className="hero home-hero glsl-hero">
    <GLSLHills />
    <div className="glsl-hero-copy">
      <h1><span>Sites que demonstram<br /></span>Valor Antes das Palavras</h1>
      <p>A Dreh Work cria experiências digitais claras e profissionais que ajudam sua empresa a transmitir confiança, explicar valor e gerar oportunidades.</p>
    </div>
  </section>

  <HomeProblem />

  <section className="section home-transformation"><div className="shell" data-reveal><PresenceComparison /></div></section>

  <section className="home-projects" id="projetos" aria-labelledby="home-projects-title">
    <div className="shell home-projects-layout" data-reveal>
      <div className="home-projects-copy">
        <h2 id="home-projects-title">Trabalho publicado é a prova.</h2>
        <p>Projetos reais, com escopo confirmado e espaço preparado para receber as evidências visuais validadas de cada entrega.</p>
        <div className="home-projects-actions">
          <Link className="button primary" href="/projetos">Explorar portfólio</Link>
          <Link className="text-link" href="/diagnostico">Solicitar diagnóstico</Link>
        </div>
      </div>

      <div className="home-projects-stage" role="radiogroup" aria-label="Projetos em destaque">
        <div className="home-project-accordion">
          {projects.map((project, index) => {
            const number = String(index + 1).padStart(2, "0");
            const total = String(projects.length).padStart(2, "0");
            const description = project.createdByDrehWork ? "Projeto criado e desenvolvido pela Dreh Work." : "Atuação recorrente em manutenção, personalização e evolução da experiência Shopify.";
            return <div className="home-project-option" key={project.slug}>
              <input className="project-accordion-input" type="radio" id={`home-project-${project.slug}`} name="home-project-active" defaultChecked={index === 0} />
              <label className="home-project-panel" htmlFor={`home-project-${project.slug}`} aria-label={`Destacar projeto ${project.name}`}>
                <span className="home-project-fallback" style={projectPreviewStyle(project.slug)} aria-hidden="true">
                  <strong>{project.name}</strong>
                  <span className="home-project-hover-cue">Abrir projeto</span>
                </span>
                <span className="home-project-panel-copy">
                  <span className="kicker">{project.category}</span>
                  <span className="home-project-panel-title">{project.name}</span>
                  <span className="home-project-panel-description">{description}</span>
                  <span className="home-project-panel-scope">{project.scope.slice(0, 4).join(" / ")}</span>
                  <span className="home-project-panel-progress" aria-hidden><i style={{ width: `${((index + 1) / projects.length) * 100}%` }} /></span>
                  <span className="home-project-panel-counter">{number} / {total}</span>
                </span>
              </label>
              <div className="home-project-links">
                <Link className="text-link" href={`/projetos/${project.slug}`}>Ver estudo de caso</Link>
                {project.url ? <a className="text-link" href={project.url} target="_blank" rel="noreferrer">Visitar projeto</a> : null}
              </div>
            </div>;
          })}
        </div>
      </div>
    </div>
    <div className="home-project-marquee" aria-label="Projetos e empresas atendidas">
      <div className="home-project-marquee-track">
        {[0, 1, 2, 3].map(group => <div className="home-project-marquee-group" aria-hidden={group > 0 ? "true" : undefined} key={group}>
          {projects.map(project => <span key={`${group}-${project.slug}`}>{project.name}</span>)}
        </div>)}
      </div>
    </div>
  </section>

  <section className="section home-services-section"><div className="shell" data-reveal><Eyebrow>Capacidades / meios para o resultado</Eyebrow><div className="home-section-heading"><h2>Um sistema digital, não uma página isolada.</h2><Link className="text-link" href="/servicos">Todos os serviços</Link></div><HomeServices /></div></section>

  <section className="section home-process"><div className="shell" data-reveal><Eyebrow>Método Dreh Work / 10 etapas em 5 movimentos</Eyebrow><div className="home-section-heading"><h2>Precisão antes de decoração.</h2><p>O layout entra quando objetivo, mensagem, arquitetura e próximo passo já possuem direção.</p></div><ol className="process-phases">{processPhases.map(([phase, steps], index) => <li key={phase}><span>{String(index + 1).padStart(2, "0")}</span><h3>{phase}</h3><p>{steps.join(" · ")}</p><i aria-hidden /></li>)}</ol><Link className="text-link process-link" href="/processo">Ver processo detalhado</Link></div></section>

  <section className="section discovery-section"><div className="shell discovery-grid" data-reveal><div className="discovery-copy"><Eyebrow>Pesquisa e inteligência artificial</Eyebrow><h2>Ser compreendida também é ser encontrável.</h2><p>Um site bem estruturado ajuda mecanismos modernos de pesquisa e inteligência artificial a interpretar quem é a empresa, o que oferece, onde atua e como pode ser contatada.</p><p>Essa preparação melhora a base de descoberta — sem prometer ranking, citação ou resultado automático.</p></div><div className="discovery-system" aria-label="Fluxo de informações da empresa para mecanismos de pesquisa e inteligência artificial"><div className="source-nodes"><span>EMPRESA</span><span>SERVIÇOS</span><span>PÁGINAS</span><span>CONTEXTO</span></div><div className="discovery-core"><small>INFORMAÇÃO</small><strong>PRESENÇA<br/>ESTRUTURADA</strong><i /></div><div className="destination-nodes"><span>PESQUISA <b>↗</b></span><span>INTELIGÊNCIA ARTIFICIAL <b>↗</b></span></div></div></div></section>

  <section className="section objective-section"><div className="shell" data-reveal><Eyebrow>Direção personalizada</Eyebrow><div className="home-section-heading"><h2>O que sua empresa precisa resolver agora?</h2><p>Selecione um objetivo. A interface organiza um caminho inicial sem enviar seus dados.</p></div><ObjectiveSelector /></div></section>

  <section className="formalization-section section-light"><div className="shell" data-reveal><Eyebrow>Confiança pela estrutura</Eyebrow><div className="formalization-line">{["Contrato e nota fiscal", "Atendimento direto", "Processo estruturado", "Publicação e verificação", "Suporte e evolução", "Todo o Brasil, remotamente"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}</div></div></section>

  <section className="section home-faq"><div className="shell faq-layout" data-reveal><div><Eyebrow>Perguntas frequentes</Eyebrow><h2>Clareza antes do primeiro contato.</h2><p>Escopo, prazo e necessidades são confirmados de acordo com cada projeto.</p></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden>+</span></summary><p>{answer}</p></details>)}</div></div></section>
  <CTA />
</>; }

function ServicesPage() { return <><section className="page-hero shell"><Eyebrow>Serviços</Eyebrow><h1>Sites são o centro. Estratégia, descoberta e evolução completam o sistema.</h1><p className="lead">Cada serviço parte do problema do negócio e da ação que a experiência precisa gerar.</p></section><section className="section shell"><div className="service-grid wide">{services.map((s,i)=><Link className="service-card" href={`/servicos/${s.slug}`} key={s.slug}><span>{String(i+1).padStart(2,"0")}</span><p className="kicker">{s.eyebrow}</p><h2>{s.title}</h2><p>{s.summary}</p><b aria-hidden>↗</b></Link>)}</div></section><CTA /></>; }
function ServicePage({ service }: { service: typeof services[number] }) { const schema={"@context":"https://schema.org","@type":"Service",name:service.title,provider:{"@type":"Organization",name:"Dreh Work"},areaServed:"BR",description:service.summary}; return <><section className="page-hero shell"><Eyebrow>{service.eyebrow}</Eyebrow><h1>{service.title}</h1><p className="lead">{service.summary}</p><div className="button-row"><Link className="button primary" href={`/diagnostico?objetivo=${encodeURIComponent(service.title)}`}>Solicitar diagnóstico</Link><Link className="button ghost" href="/projetos">Ver projetos</Link></div></section><section className="section section-dark"><div className="shell split"><div><Eyebrow>Escopo possível</Eyebrow><h2>Uma solução organizada ao redor do resultado.</h2></div><ul className="large-list">{service.items.map(x=><li key={x}>{x}</li>)}</ul></div></section><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><CTA context={service.title}/></>; }
function ProjectsPage() { return <><section className="page-hero shell"><Eyebrow>Projetos</Eyebrow><h1>Trabalho real, escopo confirmado e espaço pronto para as evidências visuais.</h1><p className="lead">As mídias serão inseridas posteriormente. Nenhuma interface fictícia foi atribuída aos projetos.</p></section><section className="section projects-section"><div className="shell projects-list">{projects.map((p,i)=><ProjectCard key={p.slug} project={p} index={i}/>)}</div></section><CTA /></>; }
function ProjectPage({ project }: { project: typeof projects[number] }) { const schema={"@context":"https://schema.org","@type":"CreativeWork",name:project.name,url:project.url,creator:project.createdByDrehWork?{"@type":"Organization",name:"Dreh Work"}:undefined}; return <><section className="page-hero project-hero shell"><div><Eyebrow>{project.category}</Eyebrow><h1>{project.name}</h1><p className="lead">{project.createdByDrehWork ? "Projeto integralmente criado e desenvolvido pela Dreh Work." : "Atuação contínua em manutenção, personalização, correções e evolução da experiência Shopify."}</p><a className="button primary" href={project.url} target="_blank" rel="noreferrer">Visitar projeto</a></div><div className="media-fallback large" role="img" aria-label={project.media[0].alt}><b>MÍDIA<br/>PENDENTE</b><small>Substituição por dados do projeto</small></div></section><section className="section shell case-grid"><div><Eyebrow>Atuação confirmada</Eyebrow><h2>Entregas</h2><ul className="large-list">{project.scope.map(x=><li key={x}>{x}</li>)}</ul></div><aside><p className="kicker">Estudo de caso</p><h3>Conteúdo detalhado em preparação.</h3><p>Contexto, desafio, estratégia, decisões, experiências desktop e mobile e resultados técnicos serão publicados somente após validação factual e inclusão das mídias.</p></aside></section><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><CTA context={`um projeto como ${project.name}`}/></>; }
function ProcessPage(){return <><section className="page-hero shell"><Eyebrow>Processo</Eyebrow><h1>Antes da interface, direção. Antes da publicação, validação.</h1><p className="lead">O método organiza negócio, público, conteúdo, experiência e tecnologia em uma sequência clara.</p></section><section className="section shell"><ol className="process-cards">{processSteps.map((s,i)=><li key={s}><span>{String(i+1).padStart(2,"0")}</span><h2>{s}</h2><p>{["Entendimento da empresa, objetivo, público e situação atual.","Definição de prioridades, mensagens, conversões e diferenciais.","Organização de páginas, conteúdo, navegação e fluxos.","Hierarquia, identidade, componentes e comportamento visual.","Construção com foco em desempenho, responsividade e manutenção.","Configuração dos canais e recursos previstos no escopo.","Testes técnicos, de conteúdo, acessibilidade e funcionamento.","Disponibilização no ambiente final após aprovação.","Validação do domínio, formulários, indexação e eventos.","Suporte, manutenção e melhorias futuras."][i]}</p></li>)}</ol></section><CTA/></>}
function ContactPage(){return <><section className="page-hero shell"><Eyebrow>Contato</Eyebrow><h1>Vamos entender o que sua presença digital precisa resolver.</h1><p className="lead">Atendimento direto, remoto e profissional para empresas em todo o Brasil.</p></section><section className="section shell contact-grid"><a href={whatsappUrl("minha presença digital")} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>{brand.whatsapp}</strong><small>{brand.hours}</small></a><a href={`mailto:${brand.email}`}><span>E-mail</span><strong>{brand.email}</strong><small>Para propostas e informações</small></a><a href="https://instagram.com/dreh.work" target="_blank" rel="noreferrer"><span>Instagram</span><strong>{brand.instagram}</strong><small>Conteúdo e bastidores</small></a></section><CTA/></>}
function InsightsPage(){return <><section className="page-hero shell"><Eyebrow>Insights</Eyebrow><h1>Conteúdo para decisões digitais mais claras.</h1><p className="lead">Esta área reunirá análises sobre sites, confiança, descoberta, conversão e evolução digital.</p></section><section className="section shell empty-state"><span>{String(insights.length).padStart(2,"0")}</span><h2>Nenhum artigo publicado ainda.</h2><p>Novos conteúdos aparecerão aqui somente quando estiverem completos e revisados. Rascunhos não fazem parte do site público.</p></section><CTA/></>}
function LegalPage({kind}:{kind:string}) { const copy:Record<string,[string,string[]]>={"politica-de-privacidade":["Política de Privacidade",["Esta versão informativa descreve a preparação do site para tratamento responsável de dados.","O diagnóstico em modo de revisão mantém respostas somente no navegador e não realiza envio real.","Quando integrações forem ativadas, esta política deverá ser revisada para informar finalidade, base legal, retenção, fornecedores e direitos aplicáveis."]],"politica-de-cookies":["Política de Cookies",["Nesta versão não há ferramentas externas de analytics ou publicidade ativas.","O navegador é usado apenas para preferências locais, como progresso do diagnóstico, objetivo selecionado e exibição da abertura inicial.","Cookies e scripts não essenciais deverão respeitar consentimento quando forem ativados."]],"termos-de-uso":["Termos de Uso",["O conteúdo deste site apresenta os serviços e projetos confirmados da Dreh Work.","O diagnóstico gratuito é uma análise inicial e não representa auditoria completa ou garantia de resultados.","Condições comerciais definitivas são formalizadas em proposta e contrato."]]}; const [title,paras]=copy[kind]; return <section className="page-hero legal shell"><Eyebrow>Conteúdo sujeito a revisão antes da publicação definitiva</Eyebrow><h1>{title}</h1>{paras.map(p=><p key={p}>{p}</p>)}<p className="review-note">Texto informativo inicial. Não representa validação jurídica.</p></section> }

export default async function Page({params}:Props){const path=(await params).slug?.join("/")||""; if(!valid.has(path))notFound(); if(!path)return <Home/>; if(path==="servicos")return <ServicesPage/>; if(path==="projetos")return <ProjectsPage/>; if(path==="processo")return <ProcessPage/>; if(path==="diagnostico")return <><section className="page-hero shell compact"><Eyebrow>Diagnóstico gratuito</Eyebrow><h1>Uma análise inicial para organizar o próximo passo.</h1><p className="lead">O fluxo abaixo funciona em modo seguro de revisão. Nenhuma resposta é enviada nesta versão.</p></section><section className="section shell"><DiagnosticWizard/></section></>; if(path==="contato")return <ContactPage/>; if(path==="insights")return <InsightsPage/>; const service=services.find(s=>`servicos/${s.slug}`===path); if(service)return <ServicePage service={service}/>; const project=projects.find(p=>`projetos/${p.slug}`===path); if(project)return <ProjectPage project={project}/>; if(path.startsWith("politica")||path==="termos-de-uso")return <LegalPage kind={path}/>; notFound();}
