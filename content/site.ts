export type MediaItem = {
  type: "cover" | "desktop" | "mobile" | "gallery" | "video";
  src?: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  caption?: string;
};

export type Project = {
  slug: string;
  name: string;
  url: string;
  category: string;
  createdByDrehWork: boolean;
  status: string;
  scope: string[];
  media: MediaItem[];
  pendingCaseStudy: true;
};

export type Service = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  items: string[];
};

export const brand = {
  name: "DREH WORK",
  positioning: "Estúdio digital especializado em sites estratégicos e presença digital.",
  email: "contato@drehwork.com.br",
  whatsapp: "+55 31 99965-6778",
  whatsappDigits: "5531999656778",
  instagram: "@dreh.work",
  domain: "drehwork.com.br",
  serviceArea: "Atendimento remoto em todo o Brasil",
  hours: "Segunda a sexta, das 8h às 18h",
  lead: "Andreh Malheiros",
} as const;

export const navigation = [
  ["Início", "/"], ["Serviços", "/servicos"], ["Projetos", "/projetos"],
  ["Processo", "/processo"], ["Insights", "/insights"], ["Diagnóstico", "/diagnostico"], ["Contato", "/contato"],
] as const;

export const services: Service[] = [
  { slug: "sites-profissionais", title: "Sites profissionais", eyebrow: "Serviço principal", summary: "Sites institucionais e comerciais estruturados para apresentar valor, transmitir confiança e gerar oportunidades.", items: ["Planejamento e arquitetura", "Design e desenvolvimento", "Responsividade", "Publicação e configuração"] },
  { slug: "landing-pages", title: "Landing pages", eyebrow: "Campanhas", summary: "Páginas focadas em uma oferta, uma mensagem e uma próxima ação clara.", items: ["Estrutura de conversão", "Páginas de serviços", "Campanhas", "Integrações"] },
  { slug: "reformulacao-de-sites", title: "Reformulação de sites", eyebrow: "Evolução", summary: "Reorganização estratégica de sites desatualizados, pouco claros ou pouco profissionais.", items: ["Diagnóstico", "Nova arquitetura", "Direção visual", "Desempenho e experiência mobile"] },
  { slug: "lojas-shopify", title: "Lojas Shopify", eyebrow: "Comércio eletrônico", summary: "Criação, personalização e evolução de experiências de compra em Shopify.", items: ["Criação de loja", "Personalização de tema", "Navegação", "Ajustes de conversão"] },
  { slug: "presenca-digital", title: "Presença digital", eyebrow: "Descoberta", summary: "Conteúdo e estrutura para ajudar clientes, mecanismos de busca e sistemas de IA a compreender a empresa.", items: ["Conteúdo estruturado", "Páginas estratégicas", "Dados estruturados", "Base técnica de descoberta"] },
  { slug: "manutencao", title: "Manutenção e evolução", eyebrow: "Continuidade", summary: "Suporte técnico, correções, novas páginas e melhorias contínuas depois da entrega.", items: ["Manutenção", "Correções", "Evolução visual", "Acompanhamento mensal"] },
];

const mediaFallback = (name: string): MediaItem[] => [{ type: "cover", alt: `Espaço reservado para a imagem de capa do projeto ${name}`, width: 1600, height: 1000 }];

export const projects: Project[] = [
  { slug: "bh-carimbos", name: "BH Carimbos", url: "https://bhcarimbos.com.br/", category: "Site institucional e presença local", createdByDrehWork: true, status: "Concluído", scope: ["Estratégia", "Arquitetura das páginas", "Design", "Desenvolvimento", "Responsividade", "Integrações", "Publicação", "Presença local", "Estrutura para busca"], media: mediaFallback("BH Carimbos"), pendingCaseStudy: true },
  { slug: "amftv", name: "AMFTV", url: "https://amftv.com.br/", category: "Site institucional", createdByDrehWork: true, status: "Concluído", scope: ["Estratégia", "Arquitetura", "Design", "Desenvolvimento", "Responsividade", "Publicação"], media: mediaFallback("AMFTV"), pendingCaseStudy: true },
  { slug: "wayne-store", name: "Wayne Store", url: "https://usewayne.com.br/", category: "Comércio eletrônico", createdByDrehWork: true, status: "Concluído", scope: ["Criação", "Desenvolvimento", "Configuração da loja", "Personalização", "Estrutura visual", "Experiência de navegação"], media: mediaFallback("Wayne Store"), pendingCaseStudy: true },
  { slug: "noar-oficial", name: "NOAR Oficial", url: "https://noaroficial.com.br/", category: "Comércio eletrônico e moda", createdByDrehWork: true, status: "Concluído", scope: ["Criação", "Desenvolvimento", "Configuração da loja", "Personalização", "Direção visual", "Experiência de navegação"], media: mediaFallback("NOAR Oficial"), pendingCaseStudy: true },
  { slug: "ammis-moda", name: "Ammis Moda", url: "https://ammismoda.com.br/", category: "Evolução contínua em Shopify", createdByDrehWork: false, status: "Atuação recorrente", scope: ["Manutenção mensal", "Personalização", "Correções", "Melhorias de interface", "Evolução da experiência", "Modificações Shopify", "Suporte técnico"], media: mediaFallback("Ammis Moda"), pendingCaseStudy: true },
];

export const processSteps = ["Diagnóstico", "Estratégia", "Arquitetura", "Direção visual", "Desenvolvimento", "Integrações", "Validação", "Publicação", "Verificação", "Evolução"];

export const objectives = ["Criar o primeiro site", "Reformular o site atual", "Gerar mais contatos", "Criar uma landing page", "Vender online", "Melhorar uma loja Shopify", "Melhorar a presença digital", "Ainda não sei"];

export const faqs = [
  ["Como funciona o orçamento?", "Cada orçamento é preparado de acordo com o escopo e as necessidades do projeto."],
  ["Qual é o prazo?", "Após a assinatura do contrato e o recebimento dos materiais necessários, projetos compatíveis com o escopo padrão possuem prazo previsto de até 10 dias para desenvolvimento, publicação e verificação."],
  ["Como funciona o pagamento?", "São aceitos Pix, boleto, cartões de crédito e débito, link de pagamento e parcelamento."],
  ["Preciso fornecer os textos?", "A organização do conteúdo faz parte do processo. A necessidade de materiais e textos é definida de acordo com o projeto."],
  ["Preciso possuir domínio?", "Não. A configuração de domínio pode fazer parte da entrega."],
  ["O site funcionará no celular?", "Sim. A experiência mobile é planejada como parte do projeto."],
  ["O site poderá ser encontrado no Google?", "O projeto recebe uma base técnica correta para descoberta, sem promessa de posição garantida."],
  ["Como funciona a preparação para mecanismos de IA?", "A estrutura organiza informações, páginas e dados para facilitar a interpretação da empresa, sem prometer citações automáticas."],
  ["Existe manutenção?", "Sim. A manutenção pode ser contratada para suporte, correções e evolução contínua."],
  ["A Dreh Work atende todo o Brasil?", "Sim. O atendimento é remoto em todo o Brasil."],
  ["O diagnóstico é gratuito?", "Sim. É uma análise inicial de presença digital, respondida por mensagem."],
  ["Existe contrato e nota fiscal?", "Sim. Os projetos são formalizados por contrato e a Dreh Work emite nota fiscal."],
] as const;

export type Insight = { title: string; slug: string; summary: string; date: string; updated?: string; category: string; cover?: string; alt?: string; content: string; seo: { title: string; description: string }; status: "draft" | "published" };
export const insights: Insight[] = [];

export const whatsappUrl = (context: string) => `https://wa.me/${brand.whatsappDigits}?text=${encodeURIComponent(`Olá, Dreh Work. Gostaria de conversar sobre ${context}.`)}`;
