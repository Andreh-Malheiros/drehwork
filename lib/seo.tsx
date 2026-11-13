import type { Metadata } from "next";
import { brand, faqs, navigation, projects, services } from "@/content/site";
import { landings } from "@/content/landings";
import { insights, type Insight } from "@/content/insights";

type PageMeta = { title: string; description: string; index?: boolean };

export const staticPages: Record<string, PageMeta> = {
  "": { title: "Sites, lojas, sistemas e automações | DrehWork", description: "A DrehWork cria a solução digital que o seu negócio precisa: site, loja, sistema sob medida, automação, integrações, Instagram e presença no Google." },
  servicos: { title: "Serviços digitais para negócios | DrehWork", description: "Alguns negócios precisam de um site mais claro ou de uma loja. Outros precisam de um sistema próprio, automações, integrações ou presença no Google e no Instagram." },
  projetos: { title: "Portfólio de Sites e Lojas Virtuais", description: "Projetos publicados pela DrehWork em sites institucionais, comércio eletrônico e evolução contínua de lojas Shopify." },
  processo: { title: "Como Criamos o seu Site: Processo em 10 Etapas", description: "Planejar, criar e evoluir: o método da DrehWork em 10 etapas, do diagnóstico à publicação verificada e à evolução contínua." },
  sobre: { title: "Sobre a DrehWork, Estúdio Digital de Belo Horizonte", description: "Quem está por trás da DrehWork, como o trabalho é conduzido e por que a presença digital é tratada como investimento." },
  diagnostico: { title: "Diagnóstico digital para empresas | DrehWork", description: "Conte sobre sua empresa e os canais que quer analisar. A gente observa as informações disponíveis e devolve pontos de atenção e um próximo passo possível." },
  contato: { title: "Contato para soluções digitais | DrehWork", description: "Conte o que gostaria de melhorar e onde seu negócio aparece hoje. Atendimento em Belo Horizonte e remotamente para outras regiões do Brasil." },
  insights: { title: "Guias sobre Sites, Google, Lojas Virtuais e IA", description: "Guias práticos para donos de negócio: como aparecer no Google e no Maps, quanto custa um site, Shopify ou Nuvemshop, SEO, IA e presença digital." },
  "politica-de-privacidade": { title: "Política de Privacidade", description: "Como a DrehWork trata dados pessoais em conformidade com a LGPD (Lei 13.709/2018)." },
  "politica-de-cookies": { title: "Política de Cookies", description: "Quais cookies e tecnologias semelhantes o site da DrehWork utiliza e como gerenciar seu consentimento." },
  "termos-de-uso": { title: "Termos de Uso", description: "Condições de uso do site da DrehWork, responsabilidades, propriedade intelectual e canais de contato." },
};

export const indexablePaths = [
  ...Object.entries(staticPages).filter(([, meta]) => meta.index !== false).map(([path]) => path),
  ...landings.map(l => l.slug),
  ...insights.map(i => `insights/${i.slug}`),
  ...services.map(s => `servicos/${s.slug}`),
  ...projects.map(p => `projetos/${p.slug}`),
];

export const validPaths = new Set([...Object.keys(staticPages), ...landings.map(l => l.slug), ...insights.map(i => `insights/${i.slug}`), ...services.map(s => `servicos/${s.slug}`), ...projects.map(p => `projetos/${p.slug}`)]);

export function pageMetadata(path: string): Metadata {
  const service = services.find(s => `servicos/${s.slug}` === path);
  const project = projects.find(p => `projetos/${p.slug}` === path);
  const landing = landings.find(l => l.slug === path);
  const insight = insights.find(i => `insights/${i.slug}` === path);
  const meta: PageMeta | undefined = service
    ? { title: service.seoTitle, description: service.metaDescription }
    : project
      ? project.caseStudy
        ? { title: project.caseStudy.seoTitle, description: project.caseStudy.metaDescription }
        : { title: `${project.name}: ${project.category}`, description: `${project.name}: ${project.category}. Veja o escopo entregue pela DrehWork neste projeto: ${project.scope.slice(0, 4).join(", ").toLowerCase()}.` }
      : landing
        ? { title: landing.seoTitle, description: landing.description }
        : insight
          ? { title: insight.seoTitle, description: insight.description }
          : staticPages[path];
  if (!meta) return {};
  const url = `${brand.url}/${path}`.replace(/\/$/, "");
  const title = path === "" ? { absolute: meta.title } : meta.title;
  const fullTitle = path === "" ? meta.title : `${meta.title} | DrehWork`;
  const projectImage = project?.caseStudy ? project.media[0] : undefined;
  const articleDate = project?.caseStudy?.publishedAt;
  const articleUpdated = project?.caseStudy?.updatedAt;
  return {
    title,
    description: meta.description,
    alternates: { canonical: url },
    robots: meta.index === false ? { index: false, follow: true } : undefined,
    openGraph: { ...(insight ? { type: "article" as const, publishedTime: insight.date, modifiedTime: insight.updated, section: insight.category } : project?.caseStudy ? { type: "article" as const, publishedTime: articleDate, modifiedTime: articleUpdated, section: "Estudo de caso" } : { type: "website" as const }), locale: "pt_BR", siteName: "DrehWork", url, title: fullTitle, description: meta.description, images: projectImage?.src ? [{ url: projectImage.src, width: projectImage.width, height: projectImage.height, alt: projectImage.alt }] : [{ url: "/og.png", width: 1200, height: 630, alt: `DrehWork — ${brand.slogan}` }] },
    twitter: { card: "summary_large_image", title: fullTitle, description: meta.description, images: projectImage?.src ? [projectImage.src] : ["/og.png"] },
  };
}

const orgId = `${brand.url}/#organization`;
const areaServed = () => [{ "@type": "City", name: brand.city }, { "@type": "Country", name: "Brasil" }];

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: "DrehWork",
        legalName: brand.legalName,
        url: brand.url,
        logo: `${brand.url}${brand.logo}`,
        image: `${brand.url}/og.png`,
        description: brand.positioning,
        slogan: brand.slogan,
        email: brand.email,
        telephone: brand.whatsapp,
        taxID: brand.cnpj,
        address: { "@type": "PostalAddress", addressLocality: brand.city, addressRegion: brand.region, addressCountry: "BR" },
        areaServed: areaServed(),
        openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" },
        founder: { "@type": "Person", name: brand.legalName },
        sameAs: [brand.instagramUrl],
        contactPoint: [{ "@type": "ContactPoint", contactType: "customer service", email: brand.email, telephone: brand.whatsapp, areaServed: "BR", availableLanguage: "Portuguese" }],
        knowsAbout: ["Criação de sites", "Desenvolvimento web", "SEO", "SEO local", "Google Perfil da Empresa", "Shopify", "E-commerce", "Landing pages", "Presença digital", "Automação de processos"],
        hasOfferCatalog: { "@type": "OfferCatalog", name: "Serviços", itemListElement: services.map(s => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, url: `${brand.url}/servicos/${s.slug}` } })) },
      },
      { "@type": "WebSite", "@id": `${brand.url}/#website`, url: brand.url, name: "DrehWork", inLanguage: "pt-BR", publisher: { "@id": orgId } },
    ],
  };
}

export function faqSchema(items: readonly (readonly [string, string])[]) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
}

export const homeFaqSchema = () => faqSchema(faqs);

export function breadcrumbSchema(trail: [string, string][]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [["Início", ""], ...trail].map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${brand.url}${path ? `/${path}` : ""}` })) };
}

export function breadcrumbFor(path: string) {
  if (!path) return null;
  const [first, second] = path.split("/");
  const firstMeta = staticPages[first];
  const landing = landings.find(l => l.slug === first);
  const navLabel = first === "insights" ? "Guias" : navigation.find(([, href]) => href === `/${first}`)?.[0];
  const trail: [string, string][] = [[landing?.seoTitle ?? navLabel ?? firstMeta?.title ?? first, first]];
  if (second) {
    const name = services.find(s => s.slug === second)?.title ?? projects.find(p => p.slug === second)?.name ?? insights.find(i => i.slug === second)?.title ?? second;
    trail.push([name, path]);
  }
  return breadcrumbSchema(trail);
}

export function serviceSchema(service: typeof services[number]) {
  return { "@context": "https://schema.org", "@type": "Service", name: service.title, serviceType: service.seoTitle, description: service.summary, url: `${brand.url}/servicos/${service.slug}`, provider: { "@id": orgId }, areaServed: areaServed() };
}

export function articleSchema(insight: Insight) {
  const url = `${brand.url}/insights/${insight.slug}`;
  return { "@context": "https://schema.org", "@type": "Article", headline: insight.title, description: insight.description, url, mainEntityOfPage: url, inLanguage: "pt-BR", datePublished: insight.date, dateModified: insight.updated, articleSection: insight.category, keywords: insight.keyword, citation: insight.sources?.map(source => source.url), image: `${brand.url}/og.png`, author: { "@type": "Person", name: brand.legalName, url: `${brand.url}/sobre` }, publisher: { "@id": orgId } };
}

export function JsonLd({ data }: { data: object | null }) {
  if (!data) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
