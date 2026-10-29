import { brand } from "@/content/site";

export type LegalSection = { heading: string; paragraphs?: string[]; items?: string[] };
export type LegalDocument = { title: string; summary: string; updated: string; sections: LegalSection[] };

export const LEGAL_UPDATED = "23 de outubro de 2026";

const controller = `${brand.legalName}, microempreendedor individual inscrito no CNPJ sob o nº ${brand.cnpj}, que atua sob o nome comercial DrehWork`;

export const legalDocuments: Record<"politica-de-privacidade" | "politica-de-cookies" | "termos-de-uso", LegalDocument> = {
  "politica-de-privacidade": {
    title: "Política de Privacidade",
    summary: "Como a DrehWork coleta, usa, compartilha e protege dados pessoais, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD) e o Marco Civil da Internet (Lei nº 12.965/2014).",
    updated: LEGAL_UPDATED,
    sections: [
      {
        heading: "1. Quem é o controlador",
        paragraphs: [
          `O controlador dos dados pessoais tratados neste site (${brand.domain}) é ${controller} ("DrehWork", "nós").`,
          `Contato para assuntos de privacidade e proteção de dados: ${brand.email}. O próprio titular da DrehWork, ${brand.legalName}, é o responsável por atender as solicitações dos titulares de dados e por comunicar-se com a Autoridade Nacional de Proteção de Dados (ANPD).`,
        ],
      },
      {
        heading: "2. Quais dados tratamos e para quê",
        items: [
          "Diagnóstico gratuito e pedidos de contato: nome, e-mail, telefone/WhatsApp, empresa, site atual, segmento e as respostas que você fornecer. Finalidade: analisar sua presença digital, responder à solicitação e, se houver interesse, preparar proposta comercial. Base legal: procedimentos preliminares relacionados a contrato, a pedido do titular (art. 7º, V, da LGPD).",
          "Contato por WhatsApp e e-mail: os dados que você enviar na conversa. Finalidade: atendimento e negociação. Base legal: art. 7º, V, da LGPD.",
          "Execução de contratos: dados de identificação, cobrança e emissão de nota fiscal de clientes. Finalidade: prestar o serviço contratado e cumprir obrigações fiscais. Base legal: execução de contrato e cumprimento de obrigação legal (art. 7º, V e II).",
          "Métricas de uso com consentimento (Google Analytics 4): páginas visitadas, cliques em botões, origem do acesso, tipo de dispositivo e identificadores de cookie, com endereço IP não armazenado pelo Google Analytics. Finalidade: entender como o site é usado e melhorá-lo. Base legal: consentimento (art. 7º, I), que pode ser revogado a qualquer momento.",
          "Métricas agregadas sem cookies (Vercel Web Analytics): contagem de visitas e desempenho do site, sem cookies e sem identificação individual do visitante. Base legal: legítimo interesse em manter o site funcional e seguro (art. 7º, IX, e art. 10).",
          "Registros de acesso (data, hora e endereço IP), mantidos pela infraestrutura de hospedagem. Finalidade: segurança e cumprimento do art. 15 do Marco Civil da Internet. Base legal: obrigação legal e legítimo interesse (art. 7º, II e IX).",
        ],
      },
      {
        heading: "3. O que não fazemos",
        items: [
          "Não vendemos nem alugamos dados pessoais.",
          "Não solicitamos dados pessoais sensíveis (art. 5º, II, da LGPD). Pedimos que você não os informe nos formulários.",
          "Não usamos os dados para decisões automatizadas que afetem seus interesses.",
          "Não enviamos comunicações de marketing sem que você as tenha solicitado.",
        ],
      },
      {
        heading: "4. Com quem compartilhamos",
        paragraphs: ["Compartilhamos dados apenas com fornecedores que atuam como operadores, estritamente para as finalidades acima:"],
        items: [
          "Vercel Inc. (Estados Unidos): hospedagem do site, registros de acesso e métricas agregadas.",
          "Google LLC (Estados Unidos): Google Analytics 4, somente após o seu consentimento.",
          "Resend (Estados Unidos): envio, por e-mail, das respostas do diagnóstico para a DrehWork.",
          "Provedor de e-mail corporativo da DrehWork: recebimento e guarda das mensagens.",
          "Meta Platforms (WhatsApp): quando você escolhe conversar pelo WhatsApp, sujeito também aos termos e à política dessa plataforma.",
          "Contabilidade e autoridades públicas: quando necessário para cumprir obrigação legal ou ordem judicial.",
        ],
      },
      {
        heading: "5. Transferência internacional",
        paragraphs: [
          "Alguns fornecedores armazenam dados fora do Brasil, principalmente nos Estados Unidos. Essas transferências ocorrem nas hipóteses do art. 33 da LGPD, com fornecedores que adotam garantias contratuais e padrões de segurança reconhecidos, e apenas na medida necessária à prestação do serviço.",
        ],
      },
      {
        heading: "6. Por quanto tempo guardamos",
        items: [
          "Diagnóstico e contatos que não resultem em contrato: até 12 meses após o último contato, e depois são eliminados.",
          "Dados de clientes: durante o contrato e pelo prazo necessário ao cumprimento de obrigações legais e fiscais e ao exercício regular de direitos (em regra, 5 anos após o encerramento).",
          "Registros de acesso: 6 meses (art. 15 do Marco Civil da Internet).",
          "Dados do Google Analytics: 14 meses, conforme configuração da propriedade.",
          "Preferências salvas no seu navegador: até que você as apague ou altere.",
        ],
      },
      {
        heading: "7. Seus direitos",
        paragraphs: ["Nos termos do art. 18 da LGPD, você pode solicitar a qualquer momento:"],
        items: [
          "confirmação da existência de tratamento;",
          "acesso aos dados;",
          "correção de dados incompletos, inexatos ou desatualizados;",
          "anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD;",
          "portabilidade dos dados a outro fornecedor;",
          "eliminação dos dados tratados com base no consentimento;",
          "informação sobre as entidades com as quais os dados foram compartilhados;",
          "informação sobre a possibilidade de não fornecer consentimento e suas consequências;",
          "revogação do consentimento;",
          "oposição a tratamento realizado em desconformidade com a LGPD.",
        ],
      },
      {
        heading: "8. Como exercer seus direitos",
        paragraphs: [
          `Envie sua solicitação para ${brand.email}. Podemos pedir informações para confirmar sua identidade, para proteger seus dados. Respondemos em até 15 dias. Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (www.gov.br/anpd).`,
          "O consentimento para cookies de métricas pode ser revogado a qualquer momento pelo link \"Preferências de cookies\", no rodapé do site.",
        ],
      },
      {
        heading: "9. Segurança",
        paragraphs: [
          "Adotamos medidas técnicas e administrativas proporcionais ao porte da operação, como conexão criptografada (HTTPS), controle de acesso às contas dos fornecedores e coleta apenas dos dados necessários. Em caso de incidente de segurança que possa causar risco ou dano relevante, comunicaremos a ANPD e os titulares afetados, nos termos do art. 48 da LGPD e da regulamentação da ANPD.",
        ],
      },
      {
        heading: "10. Crianças e adolescentes",
        paragraphs: ["Este site e os serviços da DrehWork são voltados a empresas e profissionais adultos. Não coletamos intencionalmente dados de menores de 18 anos."],
      },
      {
        heading: "11. Alterações",
        paragraphs: ["Esta política pode ser atualizada para refletir mudanças legais ou no site. A data da última atualização fica sempre indicada nesta página. Mudanças relevantes de finalidade serão informadas com destaque."],
      },
    ],
  },
  "politica-de-cookies": {
    title: "Política de Cookies",
    summary: "Quais cookies e tecnologias semelhantes o site da DrehWork utiliza e como você controla seu consentimento.",
    updated: LEGAL_UPDATED,
    sections: [
      {
        heading: "1. O que são cookies",
        paragraphs: ["Cookies e tecnologias semelhantes (como o armazenamento local do navegador) são pequenos arquivos ou registros salvos no seu dispositivo. Servem para lembrar preferências e, com sua autorização, medir o uso do site."],
      },
      {
        heading: "2. Necessários (sempre ativos)",
        paragraphs: ["Indispensáveis ao funcionamento do site e às suas escolhas. Não identificam você e não são compartilhados com terceiros:"],
        items: [
          "dreh-consent: guarda sua decisão sobre cookies (armazenamento local; até ser alterado).",
          "Progresso do diagnóstico e objetivo selecionado: permitem continuar de onde parou (armazenamento local; até a conclusão ou a limpeza do navegador).",
          "Exibição da abertura animada: evita repetir a animação na mesma sessão (armazenamento de sessão).",
        ],
      },
      {
        heading: "3. Métricas (somente com consentimento)",
        paragraphs: ["Carregados apenas se você clicar em \"Aceitar\" ou ativar métricas nas preferências:"],
        items: [
          "_ga (Google Analytics 4): distingue visitantes de forma pseudônima; expira em até 2 anos.",
          "_ga_<ID> (Google Analytics 4): mantém o estado da sessão; expira em até 2 anos.",
        ],
      },
      {
        heading: "4. Métricas sem cookies",
        paragraphs: ["O Vercel Web Analytics mede visitas de forma agregada, sem cookies e sem identificar o visitante, e por isso não depende de consentimento."],
      },
      {
        heading: "5. Como gerenciar",
        paragraphs: [
          "Você pode aceitar, recusar ou alterar sua escolha a qualquer momento pelo link \"Preferências de cookies\", no rodapé. Recusar as métricas não limita nenhuma funcionalidade do site.",
          "Também é possível apagar cookies e o armazenamento local nas configurações do seu navegador.",
        ],
      },
      {
        heading: "6. Mais informações",
        paragraphs: [`Esta política complementa a Política de Privacidade. Dúvidas: ${brand.email}.`],
      },
    ],
  },
  "termos-de-uso": {
    title: "Termos de Uso",
    summary: "Condições para uso do site da DrehWork. Ao navegar, você declara estar ciente destes termos.",
    updated: LEGAL_UPDATED,
    sections: [
      {
        heading: "1. Identificação",
        paragraphs: [`Este site é mantido por ${controller}. Contato: ${brand.email} · WhatsApp ${brand.whatsapp}.`],
      },
      {
        heading: "2. Finalidade do site",
        paragraphs: ["O site apresenta os serviços, o método e os projetos da DrehWork e permite solicitar um diagnóstico gratuito ou iniciar um atendimento. Não há venda ou contratação concluída diretamente pelo site."],
      },
      {
        heading: "3. Diagnóstico gratuito",
        paragraphs: ["O diagnóstico é uma análise inicial, feita com base nas informações que você fornece e em dados públicos do seu site ou presença digital. Não é uma auditoria completa nem uma promessa de resultado. Não há obrigação de contratar nenhum serviço."],
      },
      {
        heading: "4. Propostas, preços e prazos",
        paragraphs: ["Preço, escopo, prazo e demais condições de cada projeto são definidos em proposta individual e formalizados em contrato, com emissão de nota fiscal. Prazos citados no site referem-se ao escopo padrão e contam a partir da assinatura do contrato e do recebimento dos materiais necessários."],
      },
      {
        heading: "5. Resultados",
        paragraphs: ["A DrehWork aplica boas práticas técnicas de desenvolvimento, desempenho e otimização para mecanismos de busca. Posições em buscadores, citações por sistemas de inteligência artificial e resultados comerciais dependem de fatores externos e, por isso, não são garantidos."],
      },
      {
        heading: "6. Uso adequado",
        items: [
          "Fornecer informações verdadeiras nos formulários.",
          "Não tentar acessar áreas restritas, interferir no funcionamento do site ou enviar conteúdo malicioso.",
          "Não usar o site para enviar spam ou praticar atos ilícitos.",
        ],
      },
      {
        heading: "7. Propriedade intelectual",
        paragraphs: ["Textos, marca, logotipo, identidade visual, código e demais conteúdos do site pertencem à DrehWork ou são usados com autorização, e estão protegidos pela Lei nº 9.610/1998 (direitos autorais) e pela Lei nº 9.279/1996 (propriedade industrial). A reprodução depende de autorização prévia, ressalvados os usos permitidos em lei. Marcas e imagens de projetos de clientes pertencem aos respectivos titulares e são exibidas apenas como portfólio."],
      },
      {
        heading: "8. Links externos",
        paragraphs: ["O site contém links para sites de clientes e plataformas de terceiros (como WhatsApp e Instagram), que têm termos e políticas próprios. Ao acessá-los, valem as regras desses serviços."],
      },
      {
        heading: "9. Disponibilidade",
        paragraphs: ["Trabalhamos para manter o site disponível e atualizado, mas podem ocorrer interrupções para manutenção ou por falhas de terceiros. Os conteúdos podem ser atualizados sem aviso prévio."],
      },
      {
        heading: "10. Privacidade",
        paragraphs: ["O tratamento de dados pessoais segue a Política de Privacidade e a Política de Cookies, que fazem parte destes termos."],
      },
      {
        heading: "11. Legislação e foro",
        paragraphs: ["Estes termos são regidos pelas leis brasileiras. Nas relações de consumo, vale o foro do domicílio do consumidor, conforme o Código de Defesa do Consumidor. Nos demais casos, fica eleito o foro do domicílio da DrehWork."],
      },
    ],
  },
};
