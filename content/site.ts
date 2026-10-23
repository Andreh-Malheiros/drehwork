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
  faqs: [string, string][];
};

export const brand = {
  name: "DREH WORK",
  positioning: "Parceiro de crescimento digital: sites, estratégia, SEO e automação para empresas que tratam presença digital como investimento.",
  email: "contato@drehwork.com",
  whatsapp: "+55 31 99965-6778",
  whatsappDigits: "5531999656778",
  instagram: "@dreh.work",
  domain: "www.drehwork.com",
  url: "https://www.drehwork.com",
  serviceArea: "Atendimento remoto em todo o Brasil",
  hours: "Segunda a sexta, das 8h às 18h",
  lead: "Andreh Malheiros",
  legalName: "Andreh Malheiros Tiberio",
  yearsInMarket: 2,
  projectsDelivered: 20,
  cnpj: "65.415.209/0001-61",
  slogan: "Visão que transforma. Estratégia que gera resultado.",
  pillars: ["Planejar", "Criar", "Evoluir"],
  logo: "/brand/icon-512.png",
  instagramUrl: "https://instagram.com/dreh.work",
} as const;

export const navigation = [
  ["Início", "/"], ["Serviços", "/servicos"], ["Portfólio", "/projetos"], ["Processo", "/processo"],
  ["Sobre", "/sobre"], ["Diagnóstico", "/diagnostico"], ["Contato", "/contato"],
] as const;

export const services: Service[] = [
  { slug: "sites-profissionais", title: "Sites profissionais", eyebrow: "Serviço principal", summary: "Sites institucionais e comerciais estruturados para apresentar valor, transmitir confiança e gerar oportunidades.", items: ["Planejamento e arquitetura", "Design e desenvolvimento", "Responsividade", "Publicação e configuração"], faqs: [["Para quem é um site profissional?", "Para empresas e profissionais que querem ser encontrados, transmitir confiança e receber contatos pela internet. Se a empresa não pretende atrair clientes online, o investimento não faz sentido."], ["O que está incluído?", "Planejamento da arquitetura, design, desenvolvimento responsivo, publicação, configuração de domínio e base técnica de SEO. O escopo final é confirmado em proposta."], ["Quanto tempo leva?", "Projetos no escopo padrão têm prazo previsto de até 10 dias após contrato e recebimento dos materiais."]] },
  { slug: "landing-pages", title: "Landing pages", eyebrow: "Campanhas", summary: "Páginas focadas em uma oferta, uma mensagem e uma próxima ação clara.", items: ["Estrutura de conversão", "Páginas de serviços", "Campanhas", "Integrações"], faqs: [["Quando usar uma landing page?", "Quando existe uma oferta, campanha ou serviço específico que precisa de uma única mensagem e uma ação clara, como pedir orçamento ou falar no WhatsApp."], ["Landing page substitui um site?", "Não. Ela complementa o site, concentrando a atenção em um objetivo. Para apresentar a empresa como um todo, o site institucional é a base."], ["Funciona com anúncios?", "Sim. A página é estruturada para receber tráfego de campanhas e medir as conversões."]] },
  { slug: "reformulacao-de-sites", title: "Reformulação de sites", eyebrow: "Evolução", summary: "Reorganização estratégica de sites desatualizados, pouco claros ou pouco profissionais.", items: ["Diagnóstico", "Nova arquitetura", "Direção visual", "Desempenho e experiência mobile"], faqs: [["Quando reformular um site?", "Quando o site está desatualizado, lento, difícil de usar no celular ou não representa mais o nível da empresa."], ["Perco o que já existe?", "Não necessariamente. Conteúdos e endereços relevantes são avaliados e preservados ou redirecionados para manter a base de busca."], ["O que muda na prática?", "Arquitetura, mensagem, direção visual, desempenho e experiência mobile são reorganizados ao redor do objetivo do negócio."]] },
  { slug: "lojas-shopify", title: "Lojas Shopify", eyebrow: "Comércio eletrônico", summary: "Criação, personalização e evolução de experiências de compra em Shopify.", items: ["Criação de loja", "Personalização de tema", "Navegação", "Ajustes de conversão"], faqs: [["Vocês criam lojas do zero?", "Sim. A Dreh Work cria, configura e personaliza lojas Shopify, além de atuar na evolução contínua de lojas existentes."], ["Atendem lojas que já existem?", "Sim. Manutenção, personalização de tema, correções e melhorias de navegação e conversão em lojas já publicadas."], ["Por que Shopify?", "É uma plataforma estável, segura e escalável, que permite à loja crescer sem refazer a base técnica."]] },
  { slug: "presenca-digital", title: "Presença digital", eyebrow: "Descoberta", summary: "Conteúdo e estrutura para ajudar clientes, mecanismos de busca e sistemas de IA a compreender a empresa.", items: ["Conteúdo estruturado", "Páginas estratégicas", "Dados estruturados", "Base técnica de descoberta"], faqs: [["O que é presença digital estruturada?", "É organizar páginas, conteúdo e dados para que clientes, mecanismos de busca e sistemas de IA entendam quem é a empresa, o que oferece e como contratá-la."], ["Isso garante primeira posição no Google?", "Não. Nenhum profissional sério garante posição. O trabalho constrói a base técnica e de conteúdo que aumenta as chances de ser encontrado."], ["Inclui preparação para IA?", "Sim. Dados estruturados e conteúdo claro facilitam a interpretação por assistentes e buscadores com IA, sem promessa de citação automática."]] },
  { slug: "manutencao", title: "Manutenção e evolução", eyebrow: "Continuidade", summary: "Suporte técnico, correções, novas páginas e melhorias contínuas depois da entrega.", items: ["Manutenção", "Correções", "Evolução visual", "Acompanhamento mensal"], faqs: [["O que a manutenção cobre?", "Suporte técnico, correções, ajustes de conteúdo, novas páginas e melhorias contínuas, conforme o plano contratado."], ["Atendem sites feitos por outros profissionais?", "Sim, após uma avaliação técnica inicial do projeto."], ["Como funciona a contratação?", "Por acompanhamento mensal ou demanda pontual, formalizado em contrato."]] },
];

const projectCover = (name: string, src: string, width: number, height: number): MediaItem[] => [
  { type: "cover", src, alt: `Imagem de capa do projeto ${name}`, width, height },
];

export const projects: Project[] = [
  { slug: "bh-carimbos", name: "BH Carimbos", url: "https://bhcarimbos.com.br/", category: "Site institucional e presença local", createdByDrehWork: true, status: "Concluído", scope: ["Estratégia", "Arquitetura das páginas", "Design", "Desenvolvimento", "Responsividade", "Integrações", "Publicação", "Presença local", "Estrutura para busca"], media: projectCover("BH Carimbos", "/images/bhcarimbos.webp", 1905, 1811), pendingCaseStudy: true },
  { slug: "amftv", name: "AMFTV", url: "https://amftv.com.br/", category: "Site institucional", createdByDrehWork: true, status: "Concluído", scope: ["Estratégia", "Arquitetura", "Design", "Desenvolvimento", "Responsividade", "Publicação"], media: projectCover("AMFTV", "/images/amftv.webp", 1905, 905), pendingCaseStudy: true },
  { slug: "wayne-store", name: "Wayne Store", url: "https://usewayne.com.br/", category: "Comércio eletrônico", createdByDrehWork: true, status: "Concluído", scope: ["Criação", "Desenvolvimento", "Configuração da loja", "Personalização", "Estrutura visual", "Experiência de navegação"], media: projectCover("Wayne Store", "/images/usewayne.webp", 1910, 1773), pendingCaseStudy: true },
  { slug: "noar-oficial", name: "NOAR Oficial", url: "https://noaroficial.com.br/", category: "Comércio eletrônico e moda", createdByDrehWork: true, status: "Concluído", scope: ["Criação", "Desenvolvimento", "Configuração da loja", "Personalização", "Direção visual", "Experiência de navegação"], media: projectCover("NOAR Oficial", "/images/noaroficial.webp", 1905, 1922), pendingCaseStudy: true },
  { slug: "ammis-moda", name: "Ammis Moda", url: "https://ammismoda.com.br/", category: "Evolução contínua em Shopify", createdByDrehWork: false, status: "Atuação recorrente", scope: ["Manutenção mensal", "Personalização", "Correções", "Melhorias de interface", "Evolução da experiência", "Modificações Shopify", "Suporte técnico"], media: projectCover("Ammis Moda", "/images/ammismoda.webp", 1905, 2550), pendingCaseStudy: true },
];

export const processSteps = ["Diagnóstico", "Estratégia", "Arquitetura", "Direção visual", "Desenvolvimento", "Integrações", "Validação", "Publicação", "Verificação", "Evolução"];

export const objectives = ["Criar o primeiro site", "Reformular o site atual", "Gerar mais contatos", "Criar uma landing page", "Vender online", "Melhorar uma loja Shopify", "Melhorar a presença digital", "Ainda não sei"];

export const faqs = [
  ["Para quem a Dreh Work é indicada?", "Para empresas e profissionais que querem atrair clientes pela internet e veem a presença digital como investimento: negócios locais, profissionais liberais, lojas virtuais e empresas em crescimento."],
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
