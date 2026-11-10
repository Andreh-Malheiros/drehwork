// Catálogo da Pqueninos Lembranças (WhatsApp Business, coletado em 30/10/2026 e atualizado em 04/11/2026), avaliações públicas do Google e posts do Instagram.
// Gerado a partir de /mnt/project-files/pqueninos-pagina; corrigir na fonte e regenerar. Posts com rosto de criança ficam de fora.

export type Produto = { n: number; nome: string; preco: number | null; info: string[]; min: number; cat: string; tam: "p" | "m" | "g" | null; fotos: number };
export type Avaliacao = { nome: string; quando: string; texto: string; resposta?: string; texto_truncado?: boolean };

export const produtos: Produto[] = [
 {
  "n": 1,
  "nome": "Divino Espírito Santo com imã + mini terço",
  "preco": 15.9,
  "info": [
   "Divino Espírito Santo de resina, com imã e mini terço",
   "Embalagem de organza e cartão personalizado",
   "Medida aproximada: 7x7",
   "Detalhes dourados têm alteração no valor",
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
   "Novidade: anjinho de acrílico com cartão personalizado de acordo com a sua ocasião",
   "Medida aproximada: 8x6",
   "Mini terço opcional: acréscimo de R$ 2,00 por unidade",
   "Pedido mínimo de 10 unidades"
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
   "Velas no potinho a partir de R$ 15,90 a unidade, velas no copo a partir de R$ 24,90, marcador de páginas por R$ 6,99 e Divino com imã por R$ 15,90",
   "Envie o modelo desejado para receber as informações"
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
   "Divino Espírito Santo de resina, com imã e mini terço",
   "Embalagem de organza e TAG, com detalhes dourados",
   "Medida aproximada: 7x7",
   "Pedido mínimo de 10 unidades"
  ],
  "min": 10,
  "cat": "lembrancinhas",
  "tam": null,
  "fotos": 4
 },
 {
  "n": 53,
  "nome": "Divino Espírito Santo rosa com imã + mini terço",
  "preco": 16.9,
  "info": [
   "Divino Espírito Santo de resina, com imã e mini terço",
   "Detalhes na cor rosa",
   "Embalagem de organza e cartão personalizado",
   "Medida aproximada: 7x7",
   "Pedido mínimo de 10 unidades"
  ],
  "min": 10,
  "cat": "lembrancinhas",
  "tam": null,
  "fotos": 2
 },
 {
  "n": 5,
  "nome": "Vela aromática no potinho - completa",
  "preco": 18.9,
  "info": [
   "Vela produzida com cera 100% vegetal não poluente",
   "Potinho de vidro de 40 g, personalizada com pingente de anjinho, mini terço, TAG e embalagem",
   "Valor referente a cada unidade",
   "Detalhes podem ser alterados, é só falar com a gente",
   "Pedido mínimo de 10 unidades"
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
   "Potinho de vidro de 40 ml, personalizada com pingente de anjinho, mini terço, TAG e embalagem",
   "Valor referente a cada unidade",
   "Detalhes podem ser alterados, é só falar com a gente",
   "Pedido mínimo de 10 unidades"
  ],
  "min": 10,
  "cat": "velas",
  "tam": null,
  "fotos": 3
 },
 {
  "n": 7,
  "nome": "Vela de copo personalizada",
  "preco": 24.9,
  "info": [
   "Vela no copo de 70 ml, com adesivo personalizado",
   "Com embalagem de organza: R$ 24,90",
   "Com laço e embalagem transparente: R$ 25,90",
   "Mini terço opcional: acréscimo de R$ 2,00 por unidade",
   "Personalização do adesivo, com pedido mínimo de 10 unidades"
  ],
  "min": 10,
  "cat": "velas",
  "tam": null,
  "fotos": 2
 },
 {
  "n": 54,
  "nome": "Vela no copo personalizada",
  "preco": 24.9,
  "info": [
   "Vela no copo de 70 ml, com adesivo personalizado",
   "Com embalagem de organza: R$ 24,90",
   "Com laço e embalagem transparente: R$ 25,90",
   "Mini terço opcional: acréscimo de R$ 2,00 por unidade",
   "Personalização do adesivo, com pedido mínimo de 10 unidades"
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
   "Vela no potinho de 40 g, com adesivo personalizado",
   "Acompanha embalagem, cartão personalizado e mini terço",
   "Cera 100% vegetal não poluente e essência",
   "Valor referente a cada unidade",
   "Detalhes podem ser alterados, é só falar com a gente",
   "Pedido mínimo de 10 unidades"
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
   "Porta água benta de 60 ml, com laço, mini terço e embalagem",
   "Cores e detalhes podem ser alterados",
   "Cartão personalizado apenas em pedidos acima de 8 unidades",
   "A partir de 1 unidade: R$ 24,90"
  ],
  "min": 1,
  "cat": "lembrancinhas",
  "tam": null,
  "fotos": 5
 },
 {
  "n": 10,
  "nome": "Kit Helena",
  "preco": 149,
  "info": [
   "Caixa em MDF de 12x12",
   "Conteúdo: sachê perfumado e vela no potinho, ou porta água benta de 60 ml e vela no potinho",
   "Por fora, personalizada com laço ou Divino Espírito Santo",
   "Cores e mensagens podem ser alteradas"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "m",
  "fotos": 4
 },
 {
  "n": 12,
  "nome": "Kit Luz",
  "preco": 149,
  "info": [
   "Caixa em MDF de 12x12",
   "Conteúdo: vela no potinho e Divino em imã",
   "Tampa personalizada com laço",
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
  "preco": 149,
  "info": [
   "Caixa em MDF de 12x12",
   "Conteúdo: porta água benta de 60 ml, vela no potinho e mensagem personalizada",
   "Por fora, personalizada com Divino ou laço",
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
  "preco": 149,
  "info": [
   "Caixa em MDF de 12x12",
   "Conteúdo: porta água benta de 60 ml, Divino Espírito Santo com imã e mensagem personalizada",
   "Por fora, personalizada com laço",
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
   "Vela no copo de 70 ml, com adesivo Madrinha ou Padrinho e laço",
   "Valor referente a cada unidade",
   "Mensagem padrão. Alteração apenas em pedidos acima de 8 unidades",
   "Personalização do adesivo apenas acima de 8 unidades",
   "Mini terço opcional: acréscimo de R$ 2,40 por unidade"
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
   "Caixa em MDF de 12x12, com acabamento envernizado",
   "Conteúdo: 2 velas no copo de 70 ml",
   "Por fora, personalizada com laço e pingente de anjinho",
   "Cores do laço e mensagens podem ser alteradas",
   "Mini terço opcional: acréscimo de R$ 2,40 por unidade"
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
   "Caixa em MDF envernizado, de 12x12",
   "Valor referente a 1 caixa com 2 conteúdos",
   "Conteúdo: porta água benta de 60 ml e vela no potinho. Também pode ser porta água benta e Divino, ou Divino e vela no potinho",
   "Por fora, personalizada com laço e pingente de anjinho",
   "Cores do laço e mensagens podem ser alteradas"
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
   "Personalização de acordo com a sua necessidade",
   "Envie o modelo escolhido para receber mais detalhes"
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
   "Caixa em MDF de 9x9, com Divino Espírito Santo com imã e mini terço",
   "Revestida em tecido por fora e com pintura por dentro",
   "Mensagem personalizada no verso"
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
   "Caixa de 9x9, com vela no potinho",
   "Revestida em tecido por fora e com pintura por dentro",
   "Mensagem personalizada no verso"
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
   "Caixa em MDF de 9x9, com vela no potinho",
   "Revestida em tecido por fora e com pintura por dentro",
   "Mensagem personalizada no verso"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "p",
  "fotos": 3
 },
 {
  "n": 22,
  "nome": "Kit com toalha de lavabo bordada e mini terço",
  "preco": 169.9,
  "info": [
   "Caixa em MDF de 15x15, com toalha de lavabo bordada e mini terço",
   "Nome bordado na tampa: acréscimo no valor"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "g",
  "fotos": 4
 },
 {
  "n": 23,
  "nome": "Kit com toalha de lavabo bordada",
  "preco": 169.9,
  "info": [
   "Caixa em MDF de 15x15, com toalha de lavabo bordada e mini terço",
   "Há opção de toalha com mais 1 item, ou de caixa maior para acomodar mais itens, com alteração no valor",
   "Envie o modelo desejado para receber ajuda"
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
   "Vela no potinho de 40 g, com adesivo personalizado",
   "Cera 100% vegetal não poluente e essência",
   "Embalagem e TAG: acréscimo de R$ 2,00 por unidade",
   "Valor referente a cada unidade",
   "Detalhes podem ser alterados, conforme a disponibilidade",
   "Pedido mínimo de 10 unidades"
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
   "Marcador de páginas personalizado, que pode ser feito para a ocasião que você desejar",
   "Acompanha embalagem e mini terço",
   "Tassel opcional: acréscimo de R$ 0,95 por unidade",
   "Pedido mínimo de 10 unidades"
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
   "Marcador de páginas personalizado com frase, que pode ser feito para a ocasião que você desejar",
   "Papel glossy 220 g",
   "Acompanha embalagem e mini terço",
   "Pedido mínimo de 10 unidades"
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
   "Opções personalizadas de acordo com a sua necessidade",
   "Conte como deseja, para receber um orçamento"
  ],
  "min": 1,
  "cat": "personalizados",
  "tam": null,
  "fotos": 5
 },
 {
  "n": 28,
  "nome": "Caixa em MDF com divino em imã",
  "preco": 87,
  "info": [
   "Caixa em MDF de 8x8, com Divino Espírito Santo com imã e mini terço",
   "Revestida em tecido por fora e com pintura por dentro",
   "Mensagem personalizada no verso"
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
   "Caixa em MDF de 15x15x5",
   "Conteúdo: sachê perfumado, vela no copo e mandala",
   "Nome bordado na tampa: acréscimo no valor"
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
   "Caixa em MDF de 9x9, revestida em tecido por fora e com pintura por dentro",
   "Acompanha mandala perolada para pendurar"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "p",
  "fotos": 6
 },
 {
  "n": 31,
  "nome": "Kit Lavínia",
  "preco": 239.9,
  "info": [
   "Caixa em MDF de 18x18",
   "Conteúdo: 1 toalha de lavabo bordada, sachê perfumado, vela no potinho e mensagem personalizada"
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
   "Caixa em MDF de 15x15",
   "Conteúdo: sachê perfumado, vela no potinho, Divino com imã e mini terço, e mensagem personalizada",
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
   "Caixa em MDF de 15x15x5",
   "Conteúdo: porta água benta, sachê perfumado e vela no copo",
   "Nome bordado na tampa: acréscimo no valor"
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
   "Caixa em MDF de 15x15",
   "Conteúdo: porta água benta, vela no copo e mandala",
   "Nome bordado na tampa: acréscimo no valor",
   "O valor pode mudar conforme conteúdo, tecido e bordados. Envie o modelo desejado para receber ajuda"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "g",
  "fotos": 4
 },
 {
  "n": 35,
  "nome": "Kit com porta água benta e + 2 itens",
  "preco": 199,
  "info": [
   "Caixa em MDF de 15x15",
   "Conteúdo: porta água benta, sachê perfumado e vela no potinho",
   "Nome bordado na tampa: acréscimo no valor",
   "O valor pode mudar conforme conteúdo, tecido e bordados. Envie o modelo desejado para receber ajuda"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "g",
  "fotos": 6
 },
 {
  "n": 36,
  "nome": "Kit - modelo Casal",
  "preco": 295,
  "info": [
   "Caixa em MDF de 20x20x5",
   "Conteúdo: 2 toalhas de lavabo bordadas, vela perfumada no potinho, porta água benta de 60 ml e mensagem personalizada",
   "O valor pode mudar conforme tamanho, conteúdo, tecido e bordados. Envie o modelo desejado para receber ajuda"
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
   "Marca página personalizado, que pode ser feito para a ocasião que você desejar",
   "Acompanha embalagem e mini terço",
   "Tassel opcional: acréscimo de R$ 0,95 por unidade",
   "Pedido mínimo de 10 unidades"
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
   "Toalha de lavabo bordada, com embalagem",
   "Valor referente a uma unidade",
   "Mensagem personalizada opcional: acréscimo de R$ 5,00 por mensagem",
   "Pedido mínimo de 2 unidades"
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
   "Toalha de lavabo bordada, com embalagem e Divino em imã",
   "Valor referente a uma unidade",
   "Mensagem personalizada opcional: acréscimo de R$ 5,00 por mensagem",
   "Pedido mínimo de 2 unidades"
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
   "Caixa de 20x20x6",
   "Conteúdo: 2 toalhas de lavabo bordadas, 2 velas no copo (70 g) com mini terço e mensagem personalizada",
   "Nome bordado na tampa: acréscimo no valor"
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
   "Caixa em MDF de 15x15",
   "Conteúdo: porta água benta, sachê perfumado e vela no potinho",
   "Nome bordado na tampa (acréscimo)",
   "O valor pode mudar conforme conteúdo, tecido e bordados. Envie o modelo desejado para receber ajuda"
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
   "Caixa em MDF de 15x15",
   "Conteúdo: porta água benta e mais 1 item à escolha: sachê perfumado, vela no potinho ou Divino em imã",
   "O valor pode mudar conforme tamanho, conteúdo, tecido e bordados. Envie o modelo desejado para receber ajuda"
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
   "Potinho de vidro de 40 ml, personalizada com pingente de anjinho, mini terço, TAG quadrada e embalagem",
   "Valor referente a cada unidade",
   "Detalhes podem ser alterados, é só falar com a gente",
   "Pedido mínimo de 10 unidades"
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
   "Caixa de 15x15",
   "Conteúdo: porta água benta, sachê perfumado e nome bordado (acréscimo)",
   "O valor pode mudar conforme conteúdo, tecido e bordados. Envie o modelo desejado para receber ajuda"
  ],
  "min": 1,
  "cat": "kits",
  "tam": "g",
  "fotos": 3
 },
 {
  "n": 49,
  "nome": "Caixa em MDF com toalha bordada - anúncio de gravidez",
  "preco": 179.0,
  "info": [
   "Caixa em MDF de 15x15x5",
   "Conteúdo: toalha de lavabo bordada",
   "Tampa bordada por fora e mensagem personalizada no verso"
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
   "Porta água benta de 120 ml, com laço, mini terço, mensagem personalizada e embalagem de organza",
   "Pedido mínimo de 2 unidades"
  ],
  "min": 2,
  "cat": "lembrancinhas",
  "tam": null,
  "fotos": 4
 }
];

/** Modelos de mensagem das caixas e kits (item "Modelos de mensagem 2" do catálogo, 04/11/2026). */
export const modelos: Record<"50", number> = {
 "50": 9
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
