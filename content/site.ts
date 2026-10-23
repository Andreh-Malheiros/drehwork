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
  /** Título da página para busca (sem o sufixo da marca). */
  seoTitle: string;
  metaDescription: string;
  h1: string;
  summary: string;
  audience: string[];
  items: string[];
  deliverables: [string, string][];
  relatedProjects: string[];
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
  serviceArea: "Belo Horizonte (MG) e atendimento remoto em todo o Brasil",
  city: "Belo Horizonte",
  region: "MG",
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
  {
    slug: "sites-profissionais",
    title: "Criação de sites profissionais",
    eyebrow: "Serviço principal",
    seoTitle: "Criação de Site Profissional para Empresas",
    metaDescription: "Criação de site profissional e institucional para empresas: planejamento, design, desenvolvimento responsivo, SEO e publicação. Belo Horizonte e todo o Brasil.",
    h1: "Criação de site profissional para empresas que querem ser encontradas",
    summary: "Sites institucionais e comerciais planejados para explicar o que a empresa faz, transmitir confiança e transformar visitas em contatos pelo WhatsApp, formulário ou telefone.",
    audience: ["Empresas que ainda não têm site e dependem só do Instagram ou de indicação", "Prestadores de serviço e negócios locais que querem aparecer no Google", "Empresas em crescimento que precisam de um site corporativo à altura do serviço", "Profissionais liberais que querem uma apresentação séria e fácil de encontrar"],
    items: ["Planejamento e arquitetura das páginas", "Design exclusivo e desenvolvimento", "Site responsivo para celular", "SEO técnico e publicação"],
    deliverables: [
      ["Planejamento", "Definição de objetivo, público, páginas, mensagens e chamadas para ação antes do design."],
      ["Design e desenvolvimento", "Interface exclusiva, sem template genérico, construída com foco em velocidade e manutenção."],
      ["Experiência no celular", "Leitura, botões e formulários pensados primeiro para quem acessa pelo smartphone."],
      ["SEO técnico de base", "Títulos, descrições, dados estruturados, sitemap, indexação e configuração no Google Search Console."],
      ["Contato e conversão", "WhatsApp, formulários e eventos de medição configurados para registrar os contatos gerados."],
      ["Publicação verificada", "Domínio, certificado de segurança, formulários e indexação conferidos depois de publicar."],
    ],
    relatedProjects: ["bh-carimbos", "amftv"],
    faqs: [
      ["Para quem é um site profissional?", "Para empresas e profissionais que querem ser encontrados, transmitir confiança e receber contatos pela internet. Se a empresa não pretende atrair clientes online, o investimento não faz sentido."],
      ["O que está incluído na criação do site?", "Planejamento da arquitetura, design, desenvolvimento responsivo, publicação, configuração de domínio e base técnica de SEO. O escopo final é confirmado em proposta."],
      ["Quanto tempo leva para criar um site?", "Projetos no escopo padrão têm prazo previsto de até 10 dias após contrato e recebimento dos materiais."],
      ["Quanto custa um site profissional?", "Depende principalmente do número de páginas, de quem produz os textos, das integrações e do nível de personalização. Os fatores estão explicados na página Quanto custa um site, e o valor exato é apresentado em proposta após o diagnóstico."],
      ["O site vai aparecer no Google?", "O site é entregue com a base técnica correta para ser indexado e configurado no Google Search Console. Ninguém pode garantir a primeira posição, mas sem essa base a empresa dificilmente é encontrada."],
      ["Vou conseguir atualizar o site depois?", "Sim. A estrutura é pensada para facilitar ajustes, e a manutenção pode ser contratada para alterações, novas páginas e evolução contínua."],
    ],
  },
  {
    slug: "landing-pages",
    title: "Landing pages",
    eyebrow: "Campanhas e conversão",
    seoTitle: "Criação de Landing Page de Alta Conversão",
    metaDescription: "Landing pages para campanhas no Google Ads, Meta Ads e Instagram: uma oferta, uma mensagem e uma ação clara, com medição de conversões configurada.",
    h1: "Landing page de alta conversão para campanhas e ofertas",
    summary: "Páginas focadas em uma oferta, uma mensagem e uma próxima ação clara, preparadas para receber tráfego pago ou orgânico e medir cada conversão.",
    audience: ["Empresas que anunciam no Google Ads, Meta Ads ou Instagram", "Lançamentos de produto, serviço ou evento", "Negócios que querem captar orçamentos ou leads para um serviço específico", "Equipes de marketing que precisam de páginas rápidas para campanhas"],
    items: ["Estrutura de conversão", "Copy orientada à oferta", "Medição de conversões", "Integrações"],
    deliverables: [
      ["Estrutura de conversão", "Hierarquia de oferta, benefícios, objeções, prova e chamada para ação em uma única página."],
      ["Copy estratégica", "Texto escrito para a intenção de quem chega pelo anúncio ou pela busca, com linguagem do cliente."],
      ["Velocidade e celular", "Página leve, pensada para carregar rápido no celular, onde está a maior parte do tráfego de anúncios."],
      ["Medição", "Eventos de conversão, tags e integração com as plataformas de anúncio previstas no escopo."],
      ["Integrações", "Envio para WhatsApp, e-mail, formulários ou ferramentas de CRM e automação."],
    ],
    relatedProjects: ["bh-carimbos"],
    faqs: [
      ["Quando usar uma landing page?", "Quando existe uma oferta, campanha ou serviço específico que precisa de uma única mensagem e uma ação clara, como pedir orçamento ou falar no WhatsApp."],
      ["Landing page substitui um site?", "Não. Ela complementa o site, concentrando a atenção em um objetivo. Para apresentar a empresa como um todo, o site institucional é a base."],
      ["Funciona com Google Ads e Meta Ads?", "Sim. A página é estruturada para receber tráfego de campanhas, com eventos de conversão configurados para que o resultado dos anúncios possa ser medido."],
      ["Vocês escrevem o texto da landing page?", "Sim. A copy estratégica pode fazer parte do escopo, partindo da oferta, do público e das objeções mais comuns."],
    ],
  },
  {
    slug: "reformulacao-de-sites",
    title: "Reformulação de sites",
    eyebrow: "Redesign e evolução",
    seoTitle: "Reformulação e Redesign de Site sem Perder o SEO",
    metaDescription: "Redesign de site desatualizado, lento ou difícil de usar no celular: nova arquitetura, direção visual, desempenho e migração com redirecionamentos para preservar a busca.",
    h1: "Reformulação de site: redesign sem perder o que já funciona",
    summary: "Reorganização estratégica de sites desatualizados, lentos, pouco claros ou que não representam mais o nível da empresa, preservando conteúdos e endereços que já trazem resultado.",
    audience: ["Empresas com site antigo, lento ou que quebra no celular", "Sites que recebem visitas mas não geram contatos", "Marcas que mudaram de posicionamento e o site ficou para trás", "Empresas que querem sair de uma plataforma limitada"],
    items: ["Diagnóstico do site atual", "Nova arquitetura e mensagem", "Direção visual", "Desempenho, mobile e migração"],
    deliverables: [
      ["Diagnóstico", "Análise de conteúdo, navegação, velocidade, experiência mobile e situação no Google antes de qualquer mudança."],
      ["Nova arquitetura", "Páginas e mensagens reorganizadas ao redor do objetivo do negócio e da jornada do cliente."],
      ["Direção visual", "Identidade digital atualizada e coerente com o nível do serviço entregue."],
      ["Desempenho", "Site mais leve e rápido, com atenção às métricas de experiência do Google (Core Web Vitals)."],
      ["Migração segura", "Mapeamento de endereços antigos e redirecionamentos 301 para preservar o histórico de busca."],
    ],
    relatedProjects: ["amftv", "bh-carimbos"],
    faqs: [
      ["Quando reformular um site?", "Quando o site está desatualizado, lento, difícil de usar no celular ou não representa mais o nível da empresa."],
      ["Perco a posição no Google ao reformular?", "O risco existe quando a migração é feita sem cuidado. Conteúdos e endereços relevantes são avaliados e preservados ou redirecionados (301) para manter a base de busca."],
      ["O que muda na prática?", "Arquitetura, mensagem, direção visual, desempenho e experiência mobile são reorganizados ao redor do objetivo do negócio."],
      ["Vocês reformulam sites feitos por outras empresas?", "Sim, após uma avaliação técnica inicial do site atual."],
    ],
  },
  {
    slug: "lojas-shopify",
    title: "Lojas virtuais e Shopify",
    eyebrow: "E-commerce",
    seoTitle: "Loja Virtual Shopify e Consultoria de E-commerce",
    metaDescription: "Criação de loja virtual na Shopify, personalização de tema, configuração de pagamento e frete, consultoria de e-commerce e evolução contínua de lojas existentes.",
    h1: "Criação de loja virtual Shopify e consultoria de e-commerce",
    summary: "Criação, configuração, personalização e evolução de lojas virtuais em Shopify, com consultoria para marcas que querem vender online com uma experiência de compra profissional.",
    audience: ["Marcas que vendem pelo Instagram e WhatsApp e querem uma loja própria", "Marcas de moda e produtos com identidade visual forte", "Lojas Shopify que precisam de personalização, correções ou melhor conversão", "Empresas que querem orientação antes de investir em e-commerce"],
    items: ["Criação e configuração da loja", "Personalização de tema", "Consultoria de e-commerce", "Evolução e ajustes de conversão"],
    deliverables: [
      ["Criação da loja", "Estrutura de coleções, páginas de produto, navegação e páginas institucionais da loja."],
      ["Personalização de tema", "Tema adaptado à identidade da marca, sem aparência de loja genérica."],
      ["Configuração operacional", "Meios de pagamento, frete, domínio, políticas da loja e aplicativos necessários, conforme o escopo."],
      ["Consultoria de e-commerce", "Orientação sobre estrutura de catálogo, experiência de compra, apresentação de produto e próximos passos de crescimento."],
      ["Autonomia para a marca", "Orientação para que a equipe consiga cadastrar produtos e operar o dia a dia da loja."],
      ["Evolução contínua", "Manutenção, correções e melhorias de interface em lojas já publicadas."],
    ],
    relatedProjects: ["noar-oficial", "wayne-store", "ammis-moda"],
    faqs: [
      ["Vocês criam lojas do zero?", "Sim. A Dreh Work cria, configura e personaliza lojas Shopify, além de atuar na evolução contínua de lojas existentes."],
      ["Atendem lojas que já existem?", "Sim. Manutenção, personalização de tema, correções e melhorias de navegação e conversão em lojas já publicadas."],
      ["Por que Shopify?", "É uma plataforma estável, segura e escalável, que permite à loja crescer sem refazer a base técnica."],
      ["O plano da Shopify está incluído no valor do projeto?", "Não. A assinatura da Shopify, temas pagos, aplicativos e taxas de pagamento são contratados diretamente pela marca, com valores definidos pela própria plataforma. O projeto da Dreh Work cobre criação, configuração e personalização."],
      ["Vou conseguir gerenciar a loja sozinha?", "Sim. A Shopify permite cadastrar produtos, acompanhar pedidos e editar conteúdos pelo painel, e a entrega inclui orientação para a operação do dia a dia."],
      ["Vocês fazem consultoria de e-commerce?", "Sim. A consultoria ajuda a decidir estrutura de catálogo, experiência de compra e prioridades antes ou depois de a loja ser publicada."],
    ],
  },
  {
    slug: "presenca-digital",
    title: "Presença digital, SEO e Google",
    eyebrow: "Ser encontrado e recomendado",
    seoTitle: "Presença Digital, SEO e Google Perfil da Empresa",
    metaDescription: "Presença digital completa: Google Perfil da Empresa, Google Search Console, SEO, Instagram, copy estratégica, reputação e preparação da marca para buscas com inteligência artificial.",
    h1: "Presença digital: sua empresa encontrada no Google, no Maps, no Instagram e na IA",
    summary: "Estruturação de tudo o que envolve a identidade da marca no digital, para que clientes, o Google e assistentes de inteligência artificial encontrem, entendam e recomendem a empresa.",
    audience: ["Empresas que não aparecem no Google nem no Google Maps", "Negócios locais que querem mais avaliações e contatos pela busca", "Marcas com Instagram desorganizado ou sem estratégia", "Empresas que querem ser citadas por assistentes de IA, como ChatGPT, Gemini e Perplexity"],
    items: ["Google Perfil da Empresa e Maps", "Google Search Console e SEO", "Instagram e copy estratégica", "Reputação e preparação para IA"],
    deliverables: [
      ["Google Perfil da Empresa", "Criação, configuração e otimização do perfil para aparecer no Google Maps e nas buscas locais."],
      ["Google Search Console e ferramentas", "Configuração do Search Console, verificação do site, sitemap e acompanhamento da indexação."],
      ["SEO e conteúdo", "Páginas estratégicas e copy escrita com os termos que os clientes realmente buscam, para alcance orgânico."],
      ["Instagram profissional", "Criação e configuração do perfil, biografia, destaques e organização para gerar contatos."],
      ["Reputação", "Campanhas de captação de avaliações e orientação para responder clientes de forma profissional."],
      ["Preparação para IA", "Dados estruturados, informações consistentes e conteúdo claro para facilitar a interpretação e a recomendação da marca por assistentes de inteligência artificial."],
      ["Identidade digital", "Consistência de nome, descrição, serviços e contatos em todos os canais em que a marca aparece."],
    ],
    relatedProjects: ["bh-carimbos"],
    faqs: [
      ["O que é presença digital?", "É o conjunto de canais e informações que fazem uma empresa ser encontrada e escolhida na internet: site, Google Perfil da Empresa, Google Maps, Instagram, avaliações e a forma como buscadores e assistentes de IA descrevem a marca."],
      ["Vocês configuram o Google Perfil da Empresa?", "Sim. A criação, configuração e otimização do Google Perfil da Empresa fazem parte do serviço, para que a empresa apareça no Google Maps e nas buscas locais."],
      ["Isso garante primeira posição no Google?", "Não. Nenhum profissional sério garante posição. O trabalho constrói a base técnica e de conteúdo que aumenta as chances de ser encontrado."],
      ["Como preparar a marca para ser recomendada por inteligência artificial?", "Com informações consistentes em todos os canais, dados estruturados no site e conteúdo claro sobre o que a empresa faz, para quem e onde. Isso facilita a interpretação por assistentes de IA, sem promessa de citação automática."],
      ["Vocês cuidam do Instagram da empresa?", "Sim. Criação e configuração do perfil, organização e copy estratégica fazem parte da presença digital."],
    ],
  },
  {
    slug: "automacao-de-processos",
    title: "Automação de processos",
    eyebrow: "Operação e produtividade",
    seoTitle: "Automação de Processos Internos para Empresas",
    metaDescription: "Automação de processos internos: integração entre site, WhatsApp, formulários, planilhas e ferramentas para reduzir tarefas manuais e responder clientes mais rápido.",
    h1: "Automação de processos internos para ganhar tempo e responder mais rápido",
    summary: "Integração entre site, formulários, WhatsApp, e-mail, planilhas e ferramentas de trabalho para reduzir tarefas repetitivas e organizar o atendimento.",
    audience: ["Empresas que perdem tempo copiando dados de formulários e mensagens", "Equipes pequenas que precisam responder clientes com mais agilidade", "Negócios que querem organizar contatos e pedidos em um só lugar"],
    items: ["Mapeamento do processo", "Integrações entre ferramentas", "Fluxos de atendimento", "Acompanhamento"],
    deliverables: [
      ["Mapeamento", "Entendimento das tarefas repetitivas e dos pontos em que o atendimento se perde."],
      ["Integrações", "Conexão entre site, formulários, e-mail, planilhas e outras ferramentas previstas no escopo."],
      ["Fluxos de atendimento", "Organização do caminho do contato, do primeiro clique até a resposta."],
      ["Documentação", "Registro de como cada automação funciona, para que a equipe saiba o que acontece."],
    ],
    relatedProjects: [],
    faqs: [
      ["O que pode ser automatizado?", "Tarefas repetitivas como registrar contatos de formulários, enviar confirmações, organizar pedidos em planilhas e notificar a equipe. O que é viável depende das ferramentas que a empresa já usa."],
      ["Preciso trocar minhas ferramentas?", "Nem sempre. A preferência é integrar o que já funciona; mudanças são recomendadas apenas quando resolvem um problema real."],
      ["Automação funciona para empresas pequenas?", "Sim. Em equipes pequenas, cada tarefa manual eliminada libera tempo para atender e vender."],
    ],
  },
  {
    slug: "manutencao",
    title: "Manutenção de sites",
    eyebrow: "Continuidade",
    seoTitle: "Manutenção de Site e Suporte Técnico Mensal",
    metaDescription: "Manutenção de site e loja Shopify: suporte técnico, correções, atualização de conteúdo, novas páginas e evolução contínua, por plano mensal ou demanda pontual.",
    h1: "Manutenção de site e evolução contínua depois da entrega",
    summary: "Suporte técnico, correções, atualizações de conteúdo, novas páginas e melhorias contínuas para sites e lojas que precisam continuar funcionando e evoluindo.",
    audience: ["Empresas sem equipe técnica para cuidar do site", "Lojas Shopify que precisam de ajustes frequentes", "Sites criados por outros profissionais que ficaram sem suporte"],
    items: ["Suporte técnico", "Correções", "Atualização de conteúdo", "Acompanhamento mensal"],
    deliverables: [
      ["Suporte técnico", "Atendimento para dúvidas, falhas e ajustes no site ou na loja."],
      ["Correções", "Resolução de problemas de exibição, formulários, integrações e funcionamento."],
      ["Atualização e novas páginas", "Alterações de conteúdo e criação de páginas conforme o plano contratado."],
      ["Evolução", "Melhorias de interface, desempenho e conversão com base no uso real."],
    ],
    relatedProjects: ["ammis-moda"],
    faqs: [
      ["O que a manutenção cobre?", "Suporte técnico, correções, ajustes de conteúdo, novas páginas e melhorias contínuas, conforme o plano contratado."],
      ["Atendem sites feitos por outros profissionais?", "Sim, após uma avaliação técnica inicial do projeto."],
      ["Como funciona a contratação?", "Por acompanhamento mensal ou demanda pontual, formalizado em contrato."],
    ],
  },
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
  ["Quanto custa um site?", "O valor depende do tipo de projeto, do número de páginas, de quem produz os textos, das integrações e do nível de personalização. Os fatores estão explicados na página Quanto custa um site, e cada proposta é preparada de acordo com o escopo."],
  ["Qual é o prazo?", "Após a assinatura do contrato e o recebimento dos materiais necessários, projetos compatíveis com o escopo padrão possuem prazo previsto de até 10 dias para desenvolvimento, publicação e verificação."],
  ["Como funciona o pagamento?", "São aceitos Pix, boleto, cartões de crédito e débito, link de pagamento e parcelamento."],
  ["Preciso fornecer os textos?", "A organização do conteúdo faz parte do processo. A necessidade de materiais e textos é definida de acordo com o projeto."],
  ["Preciso possuir domínio?", "Não. A configuração de domínio pode fazer parte da entrega."],
  ["O site funcionará no celular?", "Sim. A experiência mobile é planejada como parte do projeto."],
  ["O site poderá ser encontrado no Google?", "O projeto recebe uma base técnica correta para descoberta, sem promessa de posição garantida."],
  ["Como funciona a preparação para mecanismos de IA?", "A estrutura organiza informações, páginas e dados para facilitar a interpretação da empresa, sem prometer citações automáticas."],
  ["Existe manutenção?", "Sim. A manutenção pode ser contratada para suporte, correções e evolução contínua."],
  ["A Dreh Work atende todo o Brasil?", "Sim. A Dreh Work é de Belo Horizonte (MG) e atende empresas de todo o Brasil de forma remota."],
  ["O diagnóstico é gratuito?", "Sim. É uma análise inicial de presença digital, respondida por mensagem."],
  ["Existe contrato e nota fiscal?", "Sim. Os projetos são formalizados por contrato e a Dreh Work emite nota fiscal."],
] as const;

export type Insight = { title: string; slug: string; summary: string; date: string; updated?: string; category: string; cover?: string; alt?: string; content: string; seo: { title: string; description: string }; status: "draft" | "published" };
export const insights: Insight[] = [];

export const whatsappUrl = (context: string) => `https://wa.me/${brand.whatsappDigits}?text=${encodeURIComponent(`Olá, Dreh Work. Gostaria de conversar sobre ${context}.`)}`;
