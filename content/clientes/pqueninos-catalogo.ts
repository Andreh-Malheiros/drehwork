// Catálogo da Pqueninos Lembranças (WhatsApp Business, coletado em 30/10/2026), avaliações públicas do Google e posts do Instagram.
// Gerado a partir de /mnt/project-files/pqueninos-pagina; corrigir na fonte e regenerar. Posts com rosto de criança ficam de fora.

export type Produto = { n: number; nome: string; preco: number | null; info: string[]; min: number; cat: string; tam: "p" | "m" | "g" | null; fotos: number };
export type Avaliacao = { nome: string; quando: string; texto: string; resposta?: string; texto_truncado?: boolean };

export const produtos: Produto[] = [
 {
  "n": 1,
  "nome": "Divino Espírito Santo com imã + mini terço",
  "preco": 15.9,
  "info": [
   "Divino Espírito Santo de resina, com imã + mini terço, embalagem de organza e cartão personalizado",
   "Divino com detalhes dourado, tem alteração no valor",
   "Medindo aproximadamente 7x7",
   "Pedido mínimo de 10 unidades"
  ],
  "min": 10,
  "cat": "lembrancinhas",
  "tam": null,
  "fotos": 8
 },
 {
  "n": 2,
  "nome": "Anjinho de acrílico e cartão personalizado",
  "preco": 10.9,
  "info": [
   "Novidade - Anjinho de acrílico com cartão personalizado de acordo com a sua ocasião",
   "Medida aproximada 8x6",
   "Pedido mínimo de 10 unidades",
   "Acréscimo mini terço 2,00 unid"
  ],
  "min": 10,
  "cat": "lembrancinhas",
  "tam": null,
  "fotos": 4
 },
 {
  "n": 3,
  "nome": "Lembranças Primeira Eucaristia e Crisma",
  "preco": null,
  "info": [
   "Velas no potinho a partir de 15,90 unid Velas de copo a partir de 24,90 unid Marcador de páginas 6,99 unid Divino com imã 15,90 unid",
   "Nos envie o modelo desejado para que possa enviar as informações"
  ],
  "min": 1,
  "cat": "eucaristia",
  "tam": null,
  "fotos": 10
 },
 {
  "n": 4,
  "nome": "Divino Espírito Santo com imã e TAG - detalhes dourado",
  "preco": 16.9,
  "info": [
   "Divino Espírito Santo de resina, com imã + mini terço, embalagem de organza e TAG. Medindo aproximadamente 7x7",
   "Pedido mínimo de 10 unidades"
  ],
  "min": 10,
  "cat": "lembrancinhas",
  "tam": null,
  "fotos": 4
 },
 {
  "n": 5,
  "nome": "Vela aromática no potinho - completa",
  "preco": 18.9,
  "info": [
   "Vela produzida com cera 100% vegetal não poluente",
   "Potinho de vidro 40gr, personalizada com pingente de anjinho, mini terço, TAG e embalagem",
   "Valor referente a unidade",
   "Detalhes podem ser alterados, entre em contato para melhor te ajudar.. Pedido mínimo de 10 unidades",
   "Consulte o prazo de produção"
  ],
  "min": 10,
  "cat": "velas",
  "tam": null,
  "fotos": 7
 },
 {
  "n": 6,
  "nome": "Vela no potinho perfumada - completa",
  "preco": 18.9,
  "info": [
   "Vela produzida com cera 100% vegetal não poluente e essência",
   "Potinho de vidro 40ml, personalizada com pingente de anjinho, mini terço, TAG e embalagem",
   "Valor referente a unidade",
   "Detalhes podem ser alterados, entre em contato para melhor te ajudar.. Pedido mínimo de 10 unidades",
   "Consulte o prazo de produção"
  ],
  "min": 10,
  "cat": "velas",
  "tam": null,
  "fotos": 3
 },
 {
  "n": 7,
  "nome": "Vela no copo personalizada",
  "preco": 24.9,
  "info": [
   "Vela no copo 70ml - acompanha adesivo personalizado. Mini terço acréscimo de 2,00 por unidade",
   "Opção com embalagem de organza - 24,90",
   "Opção com laço e embalagem transparente - 25,90 Personalização do adesivo, pedido mínimo de 10 unidades"
  ],
  "min": 10,
  "cat": "velas",
  "tam": null,
  "fotos": 6
 },
 {
  "n": 8,
  "nome": "Vela no potinho com adesivo",
  "preco": 17.9,
  "info": [
   "Vela no potinho de 40gr, com adesivo personalizado",
   "Acompanha embalagem, cartão personalizado e mini terço. Vela produzida com cera 100% vegetal não poluente e essência",
   "Valor referente a unidade",
   "Detalhes podem ser alterados, entre em contato para melhor te ajudar.. Pedido mínimo de 10 unidades",
   "Consulte o prazo de produção"
  ],
  "min": 10,
  "cat": "velas",
  "tam": null,
  "fotos": 4
 },
 {
  "n": 9,
  "nome": "Porta água benta - 60ml",
  "preco": 24.9,
  "info": [
   "Porta água benta de 60ml, com laço, mini terço, e embalagem",
   "Cores e detalhes podem ser alterados. A partir de 1 unid. 24,90",
   "Cartão personalizado apenas acima de 8 unidades"
  ],
  "min": 1,
  "cat": "lembrancinhas",
  "tam": null,
  "fotos": 5
 },
 {
  "n": 10,
  "nome": "Kit Helena",
  "preco": 146.0,
  "info": [
   "Caixa em MDF medida 12x12 com conteúdo de sachê perfumado e vela no potinho ou",
   "Porta água benta 60ml e vela no potinho Por fora personalizada com laço, ou divino Espírito Santo",
   "Cores e mensagens podem ser alterados"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "m",
  "fotos": 4
 },
 {
  "n": 12,
  "nome": "Kit Luz",
  "preco": 146.0,
  "info": [
   "Caixa em mdf medida 12x12 com conteúdo de vela no potinho e divino em imã",
   "Por fora (na tampa da caixa) personalizada com laço",
   "Cores e mensagens podem ser alteradas"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "m",
  "fotos": 3
 },
 {
  "n": 13,
  "nome": "Kit Divino",
  "preco": 146.0,
  "info": [
   "Caixa em mdf, medida 12x12 com conteúdo de porta água benta 60ml, vela no potinho e mensagem personalizada",
   "Por fora personalizada com divino ou laço",
   "Cores e mensagens podem ser alteradas"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "m",
  "fotos": 5
 },
 {
  "n": 14,
  "nome": "Kit Maria Cecília",
  "preco": 146.0,
  "info": [
   "Caixa em mdf medida 12x12 com conteúdo de porta água benta 60ml, Divino Espírito Santo com imã e mensagem personalizada",
   "Por fora personalizada com laço",
   "Cores e mensagens podem ser alteradas"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "m",
  "fotos": 3
 },
 {
  "n": 15,
  "nome": "Vela no copo madrinha ou padrinho",
  "preco": 24.9,
  "info": [
   "Valor referente a unidade Vela no copo 70ml - acompanha adesivo Madrinha ou Padrinho e laço",
   "Mensagem padrão. Alteração apenas acima de 8 unidades.. Mini terço acréscimo de 2,40 por unidade. Personalização do adesivo, acima de 8 unidades"
  ],
  "min": 1,
  "cat": "velas",
  "tam": null,
  "fotos": 3
 },
 {
  "n": 16,
  "nome": "Kit vintage - 2 velas no copo",
  "preco": 99.9,
  "info": [
   "Caixa em MDF com acabamento envernizado medindo 12x12 Conteúdo: 2 velas no copo 70ml",
   "Mini terço acréscimo: R$ 2,40 unid",
   "Por fora, personalizada com laço e pingente de anjinho",
   "Cores do laço e mensagens podem ser alteradas de acordo com sua necessidade"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "m",
  "fotos": 2
 },
 {
  "n": 17,
  "nome": "Kit vintage - Alice",
  "preco": 99.9,
  "info": [
   "Caixa em MDF envernizado - medida 12x12",
   "Valor referente a 1 caixa com 2 conteúdos",
   "Conteúdo: Porta água benta 60ml e vela no potinho. O conteúdo também pode ser alterado como exemplo: 1- Porta água benta e Divino ou Divino e vela no potinho",
   "Por fora, personalizada com laço e pingente de anjinho",
   "Cores do laço e mensagens podem ser alteradas de acordo com sua necessidade"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "m",
  "fotos": 3
 },
 {
  "n": 18,
  "nome": "Primeira Eucaristia e Crisma",
  "preco": null,
  "info": [
   "A personalização pode ser alterada de acordo com a sua necessidade. Nós envie o modelo escolhido para mais detalhes"
  ],
  "min": 1,
  "cat": "eucaristia",
  "tam": null,
  "fotos": 10
 },
 {
  "n": 19,
  "nome": "Kit com Divino",
  "preco": 87.0,
  "info": [
   "Caixa em mdf, medida 9x9 com divino espírito santo com imã e mini terço. Caixa revestida em tecido na parte externa e interna em pintura",
   "Mensagem personalizada no verso",
   "Consulte prazo de produção"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "p",
  "fotos": 3
 },
 {
  "n": 20,
  "nome": "Kit com vela no potinho",
  "preco": 87.0,
  "info": [
   "Caixa medindo 9x9 com vela no potinho Caixa revestida em tecido na parte externa e interna em pintura",
   "Mensagem personalizada no verso",
   "Consulte prazo de produção"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "p",
  "fotos": 3
 },
 {
  "n": 21,
  "nome": "Caixa com vela no potinho",
  "preco": 87.0,
  "info": [
   "Caixa em MDF medida 9x9 com vela no potinho. Caixa revestida em tecido na parte externa e interna em pintura",
   "Mensagem personalizada no verso",
   "Consulte prazo de produção"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "p",
  "fotos": 3
 },
 {
  "n": 22,
  "nome": "Kit com toalha de lavabo bordada e mini terço",
  "preco": 159.9,
  "info": [
   "Caixa em MDF medida 15x15, com toalha de lavabo bordada e mini terço",
   "Para nome bordado na tampa, temos acréscimo no valor"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "g",
  "fotos": 4
 },
 {
  "n": 23,
  "nome": "Kit com toalha de lavabo bordada",
  "preco": 159.9,
  "info": [
   "Caixa em MDF medida 15x15, com toalha de lavabo bordada e mini terço",
   "Tem opção de toalha e + 1 item ou em medidas maiores para acomodar mais itens. Com isso tem alteração no valor. Nos informe o modelo desejado para melhor te ajudar"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "g",
  "fotos": 10
 },
 {
  "n": 24,
  "nome": "Vela personalizada",
  "preco": 13.9,
  "info": [
   "Vela no potinho de 40gr, com adesivo personalizado",
   "Embalagem e TAG - acréscimo de R$ 2,00 por unidade. Vela produzida com cera 100% vegetal não poluente e essência",
   "Valor referente a unidade",
   "Detalhes podem ser alterados, entre em contato para verificar disponibilidade. Pedido mínimo de 10 unidades",
   "Consulte o prazo de produção"
  ],
  "min": 10,
  "cat": "velas",
  "tam": null,
  "fotos": 5
 },
 {
  "n": 25,
  "nome": "Marcador de páginas",
  "preco": 7.5,
  "info": [
   "Marcador de páginas personalizado. Pode ser produzido para a ocasião que desejar",
   "Acompanha embalagem e mini terço",
   "Acréscimo de Tassel R$ 0,95 unid. Pedido mínimo de 10 unidades"
  ],
  "min": 10,
  "cat": "lembrancinhas",
  "tam": null,
  "fotos": 5
 },
 {
  "n": 26,
  "nome": "Marcador de páginas personalizado com frase",
  "preco": 6.99,
  "info": [
   "Marcador de páginas personalizado. Pode ser produzido para a ocasião que desejar",
   "Papel glossy 220gr",
   "Acompanha embalagem e mini terço. Pedido mínimo de 10 unidades"
  ],
  "min": 10,
  "cat": "lembrancinhas",
  "tam": null,
  "fotos": 4
 },
 {
  "n": 27,
  "nome": "Kits Personalizados",
  "preco": null,
  "info": [
   "Opções personalizadas de acordo com sua necessidade. Me informe como deseja, para que possa te enviar um orçamento"
  ],
  "min": 1,
  "cat": "personalizados",
  "tam": null,
  "fotos": 5
 },
 {
  "n": 28,
  "nome": "Caixa em MDF com divino em imã",
  "preco": 85.0,
  "info": [
   "Caixa em MDF 8x8 com divino espírito santo com imã e mini terço. Caixa revestida em tecido na parte externa e interna em pintura",
   "Mensagem personalizada no verso",
   "Consulte prazo de produção"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "p",
  "fotos": 4
 },
 {
  "n": 29,
  "nome": "Caixa Miguel em MDF",
  "preco": 199.0,
  "info": [
   "Caixa em MDF medida 15x15x5 - conteúdo: sachê perfumado, vela no copo e mandala. Para nome bordado na tampa, temos acréscimo no valor"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "g",
  "fotos": 2
 },
 {
  "n": 30,
  "nome": "Caixa com mandala",
  "preco": 94.9,
  "info": [
   "Caixa em mdf meidda 9x9 revestida em tecido na parte externa e por dentro em pintura. Com mandala perolada para pendurar"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "p",
  "fotos": 6
 },
 {
  "n": 31,
  "nome": "Kit Lavínia",
  "preco": 229.9,
  "info": [
   "Caixa em MDF medida 18x18 Conteúdo: 1 toalha de lavabo bordada, sachê perfumado, vela no potinho e mensagem personalizada"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "g",
  "fotos": 3
 },
 {
  "n": 32,
  "nome": "Kit - Convite ou agradecimento",
  "preco": 199.0,
  "info": [
   "Caixa em mdf medida 15x15 - conteúdo: sachê perfumado, vela no potinho e divino com imã + mini terço e mensagem personalizada",
   "Mensagem e cores podem ser alteradas"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "g",
  "fotos": 3
 },
 {
  "n": 33,
  "nome": "Kit Pedro - nome bordado",
  "preco": 199.0,
  "info": [
   "Caixa em mdf, medida 15x15x5 - conteúdo: porta água benta, sachê perfumado e vela no copo. Nome bordado na tampa tem acréscimo no valor"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "g",
  "fotos": 2
 },
 {
  "n": 34,
  "nome": "Kit azul com porta água benta + 2 itens",
  "preco": 199.0,
  "info": [
   "Caixa em mdf, medida 15x15 com porta água , vela no copo e mandala",
   "Nome bordado na tampa, tem acréscimo no valor. O valor pode alterar de acordo com conteúdo, tecido e bordados. Nos informe o modelo desejado para melhor te ajudar"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "g",
  "fotos": 4
 },
 {
  "n": 35,
  "nome": "Kit com porta água benta e + 2 itens",
  "preco": 189.9,
  "info": [
   "Caixa em MDF medida 15x15 com porta água , sachê perfumado e vela no potinho",
   "Nome bordado na tampa, temos acréscimo no valor. O valor pode alterar de acordo com conteúdo, tecido e bordados. Nos informe o modelo desejado para melhor te ajudar"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "g",
  "fotos": 6
 },
 {
  "n": 36,
  "nome": "Kit - modelo Casal",
  "preco": 289.9,
  "info": [
   "Caixa em mdf, medindo 20x20x5 com 2 toalhas de lavabo bordadas, vela perfumada no potinho, porta água benta 60ml e mensagem personalizada. O valor pode alterar de acordo com tamanho, conteúdo, tecido e bordados. Nos informe o modelo desejado para melhor te ajudar"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "g",
  "fotos": 4
 },
 {
  "n": 37,
  "nome": "Marca páginas",
  "preco": 7.5,
  "info": [
   "Marca página personalizado. Pode ser produzido para a ocasião que desejar",
   "Acompanha embalagem e mini terço",
   "Acréscimo de Tassel R$ 0,95 unid. Pedido mínimo de 10 unidades"
  ],
  "min": 10,
  "cat": "lembrancinhas",
  "tam": null,
  "fotos": 4
 },
 {
  "n": 38,
  "nome": "Toalha de lavabo bordada",
  "preco": 49.0,
  "info": [
   "Pedido mínimo de 2 unidades",
   "Valor referente a uma unidade",
   "Toalha de lavabo bordada e embalagem",
   "Opcional de mensagem personalizada - acréscimo de 5,00 por mensagem"
  ],
  "min": 2,
  "cat": "toalhas",
  "tam": null,
  "fotos": 4
 },
 {
  "n": 39,
  "nome": "Toalha de lavabo bordada + divino em imã",
  "preco": 68.9,
  "info": [
   "Pedido mínimo de 2 unidades",
   "Valor referente a uma unidade",
   "Toalha de lavabo bordada, embalagem + divino em imã",
   "Opcional de mensagem personalizada acréscimo de 5,00 por mensagem"
  ],
  "min": 2,
  "cat": "toalhas",
  "tam": null,
  "fotos": 4
 },
 {
  "n": 42,
  "nome": "Kit Casal - Vela no copo",
  "preco": 299.9,
  "info": [
   "Caixa medida 20x20x6 com 2 toalhas de lavabo bordadas, 2 velas no copo (70gr) com mini terço e mensagem personalizada. Para nome bordado na tampa tem caixa, temos acréscimo no valor"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "g",
  "fotos": 2
 },
 {
  "n": 43,
  "nome": "Kit Marília - nome bordado",
  "preco": 185.0,
  "info": [
   "Caixa em MDF medida 15x15 com porta água , sachê perfumado, vela no potinho e nome bordado na tampa (acréscimo) O valor pode alterar de acordo com conteúdo, tecido e bordados. Nos informe o modelo desejado para melhor te ajudar"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "g",
  "fotos": 2
 },
 {
  "n": 44,
  "nome": "Kit com porta água benta e + 1 item",
  "preco": 169.0,
  "info": [
   "Caixa em MDF medida 15x15 com porta água e + 1 item. sachê perfumado, vela no potinho ou divino em imã. O valor pode alterar de acordo com tamanho, conteúdo, tecido e bordados. Nos informe o modelo desejado para melhor te ajudar"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "g",
  "fotos": 7
 },
 {
  "n": 45,
  "nome": "Vela aromática no potinho - Completa TAG quadrada",
  "preco": 18.5,
  "info": [
   "Vela produzida com cera 100% vegetal não poluente",
   "Potinho de vidro 40ml, personalizada com pingente de anjinho, mini terço, TAG e embalagem",
   "Valor referente a unidade",
   "Detalhes podem ser alterados, entre em contato para melhor te ajudar.. Pedido mínimo de 10 unidades",
   "Consulte o prazo de produção"
  ],
  "min": 10,
  "cat": "velas",
  "tam": null,
  "fotos": 3
 },
 {
  "n": 46,
  "nome": "Caixa Gabriel - nome bordado",
  "preco": 169.0,
  "info": [
   "Caixa medida 15x15 com porta água, sachê perfumado e nome bordado (acréscimo) O valor pode alterar de acordo com conteúdo, tecido e bordados. Nos informe o modelo desejado para melhor te ajudar"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "g",
  "fotos": 3
 },
 {
  "n": 47,
  "nome": "Caixa com sapatinho",
  "preco": 124.9,
  "info": [
   "Caixa em MDF com sapatinho para anúncio de gravidez, chá revelação ou convite para padrinhos. Caixa medida 12x12 toda revestida em tecido com mensagem personalizada"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "m",
  "fotos": 1
 },
 {
  "n": 48,
  "nome": "Caixa em MDF com sapatinho",
  "preco": 124.9,
  "info": [
   "Caixa com sapatinho para anúncio de gravidez, chá revelação ou convite para padrinhos. Caixa medida 12x12 toda revestida em tecido com mensagem personalizada"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "m",
  "fotos": 2
 },
 {
  "n": 49,
  "nome": "Caixa em MDF com toalha bordada - anúncio de gravidez",
  "preco": 179.0,
  "info": [
   "Caixa em MDF com toalha de lavabo bordada, tampa bordada externa e mensagem personalizada no verso. Caixa edida 15x15x5"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "g",
  "fotos": 5
 },
 {
  "n": 51,
  "nome": "Porta água benta com mensagem personalizada",
  "preco": 35.5,
  "info": [
   "Porta água benta de 120ml, com laço, mini terço, mensagem personalizada e embalagem de organza. Pedido mínimo de 2 unidades"
  ],
  "min": 2,
  "cat": "lembrancinhas",
  "tam": null,
  "fotos": 4
 }
];

/** Quantidade de imagens de modelos de mensagem (itens 50 e 52 do catálogo). */
export const modelos: Record<"50" | "52", number> = {
 "50": 9,
 "52": 10
};

export const avaliacoes: Avaliacao[] = [
 {
  "nome": "Elaine R.",
  "quando": "7 meses atrás",
  "texto": "Minha encomenda chegou, tudo maravilhosoooo….superou minhas expectativas, top!\nParabéns pelo seu trabalho, atendimento ágil, atencioso, qualidade nos produtos, capricho, maravilhosos , envio no prazo enfim nota milllllllllll, super indico!!!",
  "resposta": "Eii Elaine 😊 fiquei muito feliz em poder atender você! Eu quem agradeço imensamente pelo carinho, confiança e preferência. 🫶🏻🙌🏻🤍"
 },
 {
  "nome": "Patrícia B.",
  "quando": "4 meses atrás",
  "texto": "Ótima experiência. Atendimento maravilhoso, tudo feito com muito capricho e pontualidade. Excelente profissional. Tudo lindo."
 },
 {
  "nome": "Myrian",
  "quando": "3 meses atrás",
  "texto": "As lembrancinhas de Espírito Santo ficaram maravilhosas, tudo embalado com muito amor e capricho, e ainda vieram perfumadas! Eu fiquei muito feliz."
 },
 {
  "nome": "Érika Q.",
  "quando": "5 meses atrás",
  "texto": "Tudo impecável, perfeito!!!! Amei!!! E todos meus convidados amaram também!!!!",
  "resposta": "Fico muitooo feliz que tenham gostado 😍🤍. Obrigada pelo carinho e confiança. 🙌🏻"
 },
 {
  "nome": "Vivian B.",
  "quando": "um mês atrás",
  "texto": "Linda as velas que comprei e foi um sucesso."
 },
 {
  "nome": "Luiza N.",
  "quando": "3 meses atrás",
  "texto": "Trabalho impecável! Super recomendo!"
 },
 {
  "nome": "Luana P.",
  "quando": "5 anos atrás",
  "texto": "Experiência maravilhosa que tive com a Pqueninos! Primeiro, fizemos uma caixinha surpresa para dar ao meu esposo contando que nosso bebê estava a caminho! Depois, eu e meu esposo fizemos uma caixinha surpresa para os avós contando a …",
  "resposta": "Eiii Luana, eu fiquei tão feliz com sua avaliação.\nE eu jamais vou me esquecer de você e do seu pedido, pois foi ele que me fez abrir mais o leque dos meus produtos.\nObrigada você, por ter feito a diferença. ❤️🌻🥰",
  "texto_truncado": true
 },
 {
  "nome": "Amanda F.",
  "quando": "7 meses atrás",
  "texto": "Amei! Tudo feito com muita capricho! Atendimento excelente!",
  "resposta": "Eii Amanda, muito obrigada pela confiança e preferência. 🤍🙌🏻"
 },
 {
  "nome": "Viviane S.",
  "quando": "2 anos atrás",
  "texto": "Atendimento excelente, produto de qualidade! Amei!",
  "resposta": "Muito obrigada pela confiança, foi uma grande alegria atender você. 😍🙌🏻"
 },
 {
  "nome": "Dennison S.",
  "quando": "6 anos atrás",
  "texto": "Ótimo atendimento!"
 },
 {
  "nome": "Clever J.",
  "quando": "2 meses atrás",
  "texto": "Quero agradecer a Steh pelo trabalho impecável! Encomendei as lembranças de batizado e foi tudo simplesmente maravilhoso. Mesmo fazendo toda a gestão à distância, de outra cidade, ela nos passou muita confiança durante todo o processo."
 }
];

export const instagramPosts: { href: string; f: string }[] = [
 {
  "href": "https://www.instagram.com/pqueninos/p/DQ7bQa3Dyn7/",
  "f": "post-01.webp"
 },
 {
  "href": "https://www.instagram.com/pqueninos/p/DNqKHcLO01D/",
  "f": "post-02.webp"
 },
 {
  "href": "https://www.instagram.com/pqueninos/reel/DJoUA-gOO2-/",
  "f": "post-03.webp"
 },
 {
  "href": "https://www.instagram.com/pqueninos/reel/DeRvaVrR5vr/",
  "f": "post-06.webp"
 },
 {
  "href": "https://www.instagram.com/pqueninos/p/DeEbIaaBYEl/",
  "f": "post-07.webp"
 },
 {
  "href": "https://www.instagram.com/pqueninos/p/DdwD2zOkXaE/",
  "f": "post-08.webp"
 },
 {
  "href": "https://www.instagram.com/pqueninos/p/DdQzUyZpK62/",
  "f": "post-10.webp"
 },
 {
  "href": "https://www.instagram.com/pqueninos/p/Dc_e6ODxsO9/",
  "f": "post-11.webp"
 },
 {
  "href": "https://www.instagram.com/pqueninos/p/DcoHiJADhK9/",
  "f": "post-12.webp"
 }
];
