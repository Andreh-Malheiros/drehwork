import type { Metadata } from "next";
import { brand, faqs, projects, services } from "@/content/site";

type PageMeta = { title: string; description: string; index?: boolean };

export const staticPages: Record<string, PageMeta> = {
  "": { title: "Dreh Work | Sites estratégicos, SEO e crescimento digital", description: "Sites profissionais, estratégia, SEO e automação para empresas que tratam presença digital como investimento. Atendimento remoto em todo o Brasil." },
  servicos: { title: "Serviços", description: "Sites profissionais, landing pages, reformulação, lojas Shopify, presença digital e manutenção — cada serviço parte do resultado que a empresa precisa gerar." },
  projetos: { title: "Portfólio", description: "Projetos publicados pela Dreh Work em sites institucionais, comércio eletrônico e evolução contínua de lojas Shopify." },
  processo: { title: "Processo", description: "Planejar, criar e evoluir: o método da Dreh Work em 10 etapas, do diagnóstico à publicação verificada e à evolução contínua." },
  sobre: { title: "Sobre", description: "Quem está por trás da Dreh Work, como o trabalho é conduzido e por que a presença digital é tratada como investimento." },
  diagnostico: { title: "Diagnóstico gratuito", description: "Responda algumas perguntas e receba uma análise inicial da sua presença digital, com o próximo passo recomendado." },
  contato: { title: "Contato", description: `Fale com a Dreh Work por WhatsApp ou e-mail (${brand.email}). Atendimento remoto em todo o Brasil, ${brand.hours.toLowerCase()}.` },
  insights: { title: "Insights", description: "Análises sobre sites, descoberta, conversão e evolução digital.", index: false },
  "politica-de-privacidade": { title: "Política de Privacidade", description: "Como a Dreh Work trata dados pessoais em conformidade com a LGPD (Lei 13.709/2018)." },
  "politica-de-cookies": { title: "Política de Cookies", description: "Quais cookies e tecnologias semelhantes o site da Dreh Work utiliza e como gerenciar seu consentimento." },
  "termos-de-uso": { title: "Termos de Uso", description: "Condições de uso do site da Dreh Work." },
};

export const indexablePaths = [
  ...Object.entries(staticPages).filter(([, meta]) => meta.index !== false).map(([path]) => path),
  ...services.map(s => `servicos/${s.slug}`),
  ...projects.map(p => `projetos/${p.slug}`),
];

export const validPaths = new Set([...Object.keys(staticPages), ...services.map(s => `servicos/${s.slug}`), ...projects.map(p => `projetos/${p.slug}`)]);

export function pageMetadata(path: string): Metadata {
  const service = services.find(s => `servicos/${s.slug}` === path);
  const project = projects.find(p => `projetos/${p.slug}` === path);
  const meta: PageMeta | undefined = service
    ? { title: `${service.title} | Serviço`, description: service.summary }
    : project
      ? { title: `${project.name} | Portfólio`, description: `${project.name}: ${project.category}. Projeto do portfólio da Dreh Work.` }
      : staticPages[path];
  if (!meta) return {};
  const url = `${brand.url}/${path}`.replace(/\/$/, "");
  const title = path === "" ? { absolute: meta.title } : meta.title;
  const fullTitle = path === "" ? meta.title : `${meta.title} | Dreh Work`;
  return {
    title,
    description: meta.description,
    alternates: { canonical: url },
    robots: meta.index === false ? { index: false, follow: true } : undefined,
    openGraph: { type: "website", locale: "pt_BR", siteName: "Dreh Work", url, title: fullTitle, description: meta.description, images: [{ url: "/og.png", width: 1200, height: 630, alt: `Dreh Work — ${brand.slogan}` }] },
    twitter: { card: "summary_large_image", title: fullTitle, description: meta.description, images: ["/og.png"] },
  };
}

const orgId = `${brand.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: "Dreh Work",
        legalName: brand.legalName,
        url: brand.url,
        logo: `${brand.url}${brand.logo}`,
        image: `${brand.url}/og.png`,
        description: brand.positioning,
        slogan: brand.slogan,
        email: brand.email,
        telephone: brand.whatsapp,
        taxID: brand.cnpj,
        address: { "@type": "PostalAddress", addressCountry: "BR" },
        areaServed: { "@type": "Country", name: "Brasil" },
        founder: { "@type": "Person", name: brand.legalName },
        sameAs: [brand.instagramUrl],
        contactPoint: [{ "@type": "ContactPoint", contactType: "customer service", email: brand.email, telephone: brand.whatsapp, areaServed: "BR", availableLanguage: "Portuguese" }],
        knowsAbout: ["Desenvolvimento de sites", "SEO", "Shopify", "Landing pages", "Presença digital", "Automação"],
        hasOfferCatalog: { "@type": "OfferCatalog", name: "Serviços", itemListElement: services.map(s => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, url: `${brand.url}/servicos/${s.slug}` } })) },
      },
      { "@type": "WebSite", "@id": `${brand.url}/#website`, url: brand.url, name: "Dreh Work", inLanguage: "pt-BR", publisher: { "@id": orgId } },
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
  const trail: [string, string][] = [[firstMeta?.title ?? first, first]];
  if (second) {
    const name = services.find(s => s.slug === second)?.title ?? projects.find(p => p.slug === second)?.name ?? second;
    trail.push([name, path]);
  }
  return breadcrumbSchema(trail);
}

export function serviceSchema(service: typeof services[number]) {
  return { "@context": "https://schema.org", "@type": "Service", name: service.title, serviceType: service.title, description: service.summary, url: `${brand.url}/servicos/${service.slug}`, provider: { "@id": orgId }, areaServed: { "@type": "Country", name: "Brasil" } };
}

export function JsonLd({ data }: { data: object | null }) {
  if (!data) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
