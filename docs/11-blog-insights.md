# Blog /insights — regras editoriais e critérios de sucesso

Status: ativo · Criado em outubro de 2026

## Objetivo

Responder às dúvidas reais de quem está decidindo sobre site, loja virtual, Google e presença digital, para:

1. ser encontrado em buscas informacionais ("como aparecer no Google Maps", "Shopify ou Nuvemshop");
2. transmitir confiança antes do primeiro contato;
3. levar o leitor, quando fizer sentido, ao serviço relacionado e ao diagnóstico gratuito.

## Regras editoriais (obrigatórias)

| # | Regra | Por quê |
|---|---|---|
| 1 | Cada guia responde **uma pergunta principal** (palavra-chave) presente no título e na introdução. | Evita canibalização e deixa a intenção clara para buscadores e IA. |
| 2 | A resposta direta aparece **no primeiro parágrafo**. | Leitores e mecanismos de IA extraem a resposta do início. |
| 3 | **Mínimo de 700 palavras**, 4 seções com subtítulo e 3 perguntas frequentes. | Profundidade suficiente para resolver o problema sem enrolação. |
| 4 | **Sem dados inventados**: nada de percentuais, estatísticas, clientes, depoimentos ou resultados sem fonte verificável. | Regra do projeto (`05-regras-do-projeto.md`) e confiança. |
| 5 | **Sem promessas de resultado garantido** (posição no Google, citação por IA, vendas). | Honestidade comercial; coerência com o restante do site. |
| 6 | Preços de terceiros (Shopify, domínio, hospedagem) **não são citados em valor**; indicar a fonte oficial. | Valores mudam; evitar informação desatualizada. |
| 7 | Linguagem para leigos: termos técnicos explicados na primeira menção. | Público principal são donos de negócio, não técnicos. |
| 8 | Cada guia aponta para **pelo menos 2 serviços** relacionados existentes. | Liga conteúdo informacional à oferta (links internos). |
| 9 | Título de busca (`seoTitle`) com **até 60 caracteres**; descrição entre **110 e 160 caracteres**. | Evita corte nos resultados de busca. |
| 10 | Categoria obrigatória dentre as definidas em `content/insights/index.ts`. | Organização e navegação. |
| 11 | Data de publicação e de atualização em ISO (`AAAA-MM-DD`). Guias com informação sensível a tempo devem ser revisados a cada 6 meses. | Sinal de atualidade e controle de revisão. |

As regras 1, 3, 4 (percentual), 5, 8, 9, 10 e 11 são verificadas automaticamente em `tests/insights.test.mjs`.

## Estrutura de cada guia

1. Título (H1) com a pergunta ou promessa do guia.
2. Introdução com a resposta direta.
3. 4 a 7 seções (H2) com parágrafos curtos e listas quando ajudarem.
4. Perguntas frequentes (com schema FAQPage).
5. Serviços relacionados + diagnóstico gratuito (CTA).

Dados estruturados: `Article` (autor, editora, datas), `FAQPage` e `BreadcrumbList`.

## Critérios de sucesso

### Entrega (verificável no repositório)

- [ ] Pelo menos **20 guias publicados**, cobrindo todas as categorias.
- [ ] 100% dos guias passam nos testes automáticos de qualidade.
- [ ] `/insights` indexável, no sitemap e no `llms.txt`; cada guia com URL própria `/insights/<slug>`.
- [ ] Nenhum guia com palavra-chave principal duplicada.

### Resultado (medir no Google Search Console após publicação)

Não há meta numérica de tráfego definida, porque não existe linha de base histórica. Critérios:

- **30 dias:** guias indexados (relatório "Páginas" do Search Console) e começando a receber impressões.
- **90 dias:** primeiros cliques orgânicos em `/insights/*`; identificar os 5 guias com mais impressões.
- **Contínuo:** cliques de `/insights/*` para serviços e diagnóstico (eventos `page_cta_click` e `whatsapp_click`).
- **Revisão trimestral:** reescrever guias com impressões e sem cliques (título/descrição) e atualizar os sensíveis a tempo.

## Como publicar um novo guia

1. Escolher uma pergunta real de cliente que ainda não tenha guia.
2. Escrever no arquivo JSON da categoria em `content/insights/`.
3. Rodar `npm test` — os testes apontam o que falta.
4. Atualizar a data em `app/sitemap.ts`.
