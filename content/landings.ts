/**
 * Páginas de intenção de busca (preço, local e nicho).
 * Regras: sem métricas, valores ou clientes inventados; cada página precisa de conteúdo próprio.
 */
export type LandingSection = { heading: string; paragraphs?: string[]; items?: string[] };

export type Landing = {
  slug: string;
  /** Título da página para busca (sem o sufixo da marca). */
  seoTitle: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  sections: LandingSection[];
  faqs: [string, string][];
  relatedServices: string[];
  relatedProjects: string[];
  /** Contexto enviado no link de WhatsApp. */
  context: string;
};

export const landings: Landing[] = [
  {
    slug: "quanto-custa-um-site",
    seoTitle: "Quanto Custa um Site Profissional? Entenda o Preço",
    description: "Quanto custa criar um site profissional, uma landing page ou uma loja virtual: os fatores que definem o preço, o que está incluído e como evitar pagar por algo que não gera resultado.",
    eyebrow: "Investimento",
    h1: "Quanto custa um site profissional?",
    lead: "O preço de um site depende do que ele precisa fazer pelo negócio. Esta página explica, sem rodeios, o que aumenta ou reduz o investimento, para você chegar à conversa sabendo o que perguntar.",
    sections: [
      { heading: "O que define o preço de um site", items: [
        "Tipo de projeto: landing page, site institucional, loja virtual ou reformulação de um site existente.",
        "Número de páginas e de seções que precisam ser planejadas, escritas e desenvolvidas.",
        "Textos: se a empresa já tem o conteúdo ou se a copy estratégica faz parte do escopo.",
        "Nível de personalização: design exclusivo, animações e componentes específicos da marca.",
        "Integrações: WhatsApp, formulários, agenda, CRM, ferramentas de anúncio, pagamento e frete.",
        "SEO e presença digital: configuração do Google Search Console, Google Perfil da Empresa e conteúdo para busca.",
        "Manutenção: se haverá acompanhamento mensal depois da publicação.",
      ] },
      { heading: "Custos que não fazem parte do projeto", paragraphs: [
        "Alguns custos são pagos diretamente a terceiros e variam conforme a escolha da empresa: registro de domínio, hospedagem, assinatura de plataformas como a Shopify, temas e aplicativos pagos e taxas de meios de pagamento.",
        "Esses itens são apresentados de forma separada na proposta, para que fique claro o que é investimento no projeto e o que é custo recorrente de ferramenta.",
      ] },
      { heading: "Site barato pode sair caro", paragraphs: [
        "Um site feito às pressas costuma custar menos no início e mais depois: lento no celular, difícil de encontrar no Google e sem caminho claro para o cliente entrar em contato. O resultado é refazer o projeto em pouco tempo.",
        "O critério mais útil não é o menor preço, e sim quanto o site ajuda a empresa a ser encontrada, transmitir confiança e receber contatos.",
      ] },
      { heading: "Como funciona o orçamento na Dreh Work", items: [
        "Diagnóstico gratuito para entender o momento da empresa e o objetivo do projeto.",
        "Proposta com escopo, prazo e investimento detalhados por item.",
        "Contrato e nota fiscal em todos os projetos.",
        "Pagamento por Pix, boleto, cartões, link de pagamento ou parcelamento.",
      ] },
    ],
    faqs: [
      ["Por que vocês não divulgam um preço fixo?", "Porque dois sites com o mesmo número de páginas podem exigir trabalhos muito diferentes de texto, integração e personalização. Um preço fixo esconderia essas diferenças; a proposta detalhada mostra exatamente o que está sendo contratado."],
      ["O orçamento é gratuito?", "Sim. O diagnóstico inicial e a proposta não têm custo nem compromisso de contratação."],
      ["Landing page custa menos que um site?", "Em geral, sim, porque tem uma única página e um único objetivo. Mas uma landing page com copy estratégica e integrações de anúncio pode exigir mais trabalho que um site simples."],
      ["É possível parcelar?", "Sim. São aceitos Pix, boleto, cartões de crédito e débito, link de pagamento e parcelamento."],
      ["Qual é o prazo de entrega?", "Projetos no escopo padrão têm prazo previsto de até 10 dias após contrato e recebimento dos materiais. Projetos maiores têm prazo definido na proposta."],
    ],
    relatedServices: ["sites-profissionais", "landing-pages", "lojas-shopify", "manutencao"],
    relatedProjects: [],
    context: "o investimento de um site",
  },
  {
    slug: "criacao-de-sites-belo-horizonte",
    seoTitle: "Criação de Sites em Belo Horizonte (BH)",
    description: "Criação de sites profissionais, landing pages e lojas virtuais em Belo Horizonte. Empresa de BH que cuida também de Google Perfil da Empresa e presença digital local.",
    eyebrow: "Belo Horizonte · MG",
    h1: "Criação de sites em Belo Horizonte para empresas que querem ser encontradas",
    lead: "A Dreh Work é de Belo Horizonte. Criamos sites, landing pages e lojas virtuais para empresas de BH e região metropolitana, com a mesma estrutura de SEO e presença digital que oferecemos para todo o Brasil.",
    sections: [
      { heading: "Por que contratar uma empresa de sites de BH", paragraphs: [
        "Para um negócio local, ser encontrado na busca da própria cidade é o que gera contato. Conhecer o mercado de Belo Horizonte ajuda a escrever páginas com a linguagem, os bairros e os serviços que o cliente da região realmente procura.",
        "O atendimento é direto com quem executa o projeto, por WhatsApp, videochamada ou e-mail.",
      ] },
      { heading: "O que fazemos para empresas de Belo Horizonte", items: [
        "Criação de site profissional e institucional.",
        "Landing pages para campanhas no Google Ads e Instagram.",
        "Lojas virtuais em Shopify.",
        "Google Perfil da Empresa e presença no Google Maps.",
        "SEO local: páginas, textos e dados estruturados com foco na cidade e nos bairros atendidos.",
        "Reformulação de sites antigos ou lentos.",
      ] },
      { heading: "SEO local: aparecer quando o cliente busca perto dele", paragraphs: [
        "Buscas como \"perto de mim\" ou com o nome do bairro dependem de um Google Perfil da Empresa completo, de avaliações e de um site que deixe claro onde a empresa atua. Esses três pontos são tratados juntos no projeto.",
      ] },
    ],
    faqs: [
      ["A Dreh Work fica em Belo Horizonte?", "Sim. A Dreh Work é de Belo Horizonte (MG) e atende empresas de BH, região metropolitana e de todo o Brasil."],
      ["Vocês atendem presencialmente?", "O atendimento é principalmente remoto, por WhatsApp e videochamada, o que agiliza o projeto. Reuniões presenciais em BH podem ser combinadas quando fizerem sentido."],
      ["Vocês ajudam a aparecer no Google Maps em BH?", "Sim. A configuração e otimização do Google Perfil da Empresa faz parte da presença digital, junto com o site e a estratégia de avaliações."],
      ["Quanto custa um site em Belo Horizonte?", "Depende do tipo de projeto, do número de páginas, dos textos e das integrações. Os fatores estão explicados na página Quanto custa um site, e o valor é apresentado em proposta após o diagnóstico gratuito."],
    ],
    relatedServices: ["sites-profissionais", "presenca-digital", "landing-pages"],
    relatedProjects: ["bh-carimbos"],
    context: "um site para minha empresa em Belo Horizonte",
  },
  {
    slug: "site-para-negocios-locais",
    seoTitle: "Site para Pequenas Empresas e Negócios Locais",
    description: "Site para pequena empresa, comércio e prestador de serviço: aparecer no Google e no Maps, receber contatos pelo WhatsApp e transmitir confiança antes da primeira ligação.",
    eyebrow: "Negócios locais e serviços",
    h1: "Site para pequenas empresas e negócios locais",
    lead: "Para quem atende clientes da própria cidade, como oficinas, lojas, prestadores de serviço e comércios, o site existe para uma coisa: fazer o cliente encontrar a empresa, confiar nela e chamar no WhatsApp.",
    sections: [
      { heading: "O que um negócio local precisa no site", items: [
        "Explicar em uma frase o que a empresa faz e onde atende.",
        "Botão de WhatsApp visível em todas as páginas.",
        "Endereço, horário, região atendida e mapa.",
        "Serviços explicados com a linguagem do cliente, não com termos técnicos.",
        "Fotos reais do trabalho e do local.",
        "Carregamento rápido no celular, onde acontece a maior parte das buscas locais.",
      ] },
      { heading: "Site, Google Maps e Instagram trabalhando juntos", paragraphs: [
        "O cliente local costuma pesquisar no Google, olhar o Maps, conferir as avaliações e visitar o Instagram antes de entrar em contato. Quando essas informações não batem, a confiança cai.",
        "Por isso o projeto conecta o site ao Google Perfil da Empresa, ao Instagram e às avaliações, com nome, serviços e contatos consistentes em todos os canais.",
      ] },
      { heading: "Depender só do Instagram é um risco", paragraphs: [
        "O Instagram ajuda a mostrar o trabalho, mas não aparece bem na busca do Google e depende de uma plataforma que a empresa não controla. O site é o endereço próprio da empresa na internet.",
      ] },
    ],
    faqs: [
      ["Pequena empresa precisa de site?", "Se os clientes pesquisam no Google antes de contratar, sim. Sem site, a empresa depende de indicação e de redes sociais, que não aparecem bem na busca."],
      ["O site vai me ajudar a aparecer no Google Maps?", "O Maps depende principalmente do Google Perfil da Empresa. O site reforça essas informações, e os dois são configurados juntos na presença digital."],
      ["Vou receber contatos pelo WhatsApp?", "Sim. O site é planejado com o WhatsApp como principal canal de contato, com botões visíveis e medição de cliques."],
      ["Quanto tempo leva?", "Projetos no escopo padrão têm prazo previsto de até 10 dias após contrato e recebimento dos materiais."],
    ],
    relatedServices: ["sites-profissionais", "presenca-digital", "manutencao"],
    relatedProjects: ["bh-carimbos"],
    context: "um site para meu negócio local",
  },
  {
    slug: "loja-virtual-para-marcas-de-moda",
    seoTitle: "Loja Virtual para Marca de Roupa e Moda na Shopify",
    description: "Criação de loja virtual para marcas de moda e roupa na Shopify: identidade visual forte, páginas de produto que vendem, pagamento, frete e consultoria de e-commerce.",
    eyebrow: "Moda e e-commerce",
    h1: "Loja virtual para marcas de moda e roupa",
    lead: "Marca de moda vende identidade antes de vender produto. A loja virtual precisa ter a cara da marca, mostrar bem cada peça no celular e deixar a compra simples, do Instagram ao checkout.",
    sections: [
      { heading: "Do Instagram para a loja própria", paragraphs: [
        "Vender pelo direct e pelo WhatsApp funciona até certo ponto: cada pedido exige atendimento manual, o estoque fica difícil de controlar e o cliente não consegue comprar sozinho a qualquer hora.",
        "A loja virtual organiza catálogo, pagamento e frete em um só lugar e libera tempo para cuidar da marca.",
      ] },
      { heading: "O que uma loja de moda precisa ter", items: [
        "Tema personalizado com a identidade visual da marca.",
        "Fotos grandes e navegação pensada para o celular.",
        "Coleções, tamanhos e variações de cor organizados.",
        "Tabela de medidas e informações de troca claras.",
        "Pagamento e frete configurados conforme o escopo.",
        "Integração com o Instagram para levar o seguidor até o produto.",
      ] },
      { heading: "Por que Shopify para marcas de moda", paragraphs: [
        "A Shopify é estável, segura e permite personalizar a experiência sem refazer a base técnica quando a marca cresce. A assinatura da plataforma, temas e aplicativos pagos são contratados diretamente pela marca.",
      ] },
      { heading: "Experiência com marcas de moda", paragraphs: [
        "A Dreh Work criou a loja da NOAR Oficial e atua de forma recorrente na evolução da loja Shopify da Ammis Moda, com manutenção, personalização e melhorias de interface.",
      ] },
    ],
    faqs: [
      ["Quanto custa uma loja virtual de moda?", "Depende do número de produtos, do nível de personalização do tema, das integrações e da consultoria envolvida. A assinatura da Shopify é paga à parte. Os fatores estão na página Quanto custa um site."],
      ["Consigo cadastrar os produtos sozinha?", "Sim. O painel da Shopify permite cadastrar produtos e acompanhar pedidos, e a entrega inclui orientação para a operação do dia a dia."],
      ["Vocês melhoram uma loja que já existe?", "Sim. A Dreh Work atua na personalização, correção e evolução de lojas Shopify já publicadas."],
      ["Vocês fazem consultoria de e-commerce?", "Sim. A consultoria ajuda a definir catálogo, experiência de compra e prioridades de crescimento da loja."],
    ],
    relatedServices: ["lojas-shopify", "manutencao", "presenca-digital"],
    relatedProjects: ["noar-oficial", "ammis-moda", "wayne-store"],
    context: "uma loja virtual para minha marca de moda",
  },
];
