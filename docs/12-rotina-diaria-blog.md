# Rotina diária do blog (tarefa agendada)

Executada todos os dias por uma tarefa agendada do Claude Code. Publica **um** post novo em `/insights` com merge automático, autorizado pelo responsável em 26/10/2026. As regras de `11-blog-insights.md` continuam valendo.

## Passo a passo

1. Partir da `main` atualizada, em uma branch nova `blog/AAAA-MM-DD`.
2. Ler os slugs e palavras-chave já existentes em `content/insights/*.json`. **Nunca repetir tema ou palavra-chave.**
3. Escolher o tema do dia (ver critérios abaixo), pesquisando na web notícias e mudanças dos últimos 30 dias.
4. Escrever o post no JSON da categoria adequada, com `date` e `updated` iguais à data do dia (fuso America/Sao_Paulo).
5. Atualizar a data de `app/sitemap.ts` e adicionar o post em `public/llms.txt`, seção "Guias".
6. Rodar `npm run check` (typecheck, lint, testes e build). Se falhar, corrigir; se não for possível, **não publicar**.
7. Commit, push, abrir PR, aguardar o CI verde e fazer o merge na `main`.
8. Registrar no resumo final: tema, URL, fontes usadas e motivo da escolha.

## Critérios para escolher o tema

Prioridade, nesta ordem:

1. **Notícia relevante e verificável** sobre Google (Busca, Maps, Perfil da Empresa, atualizações de algoritmo), IA em buscas (ChatGPT, Gemini, Perplexity, visão geral criada por IA), Instagram/WhatsApp para empresas, Shopify/Nuvemshop/e-commerce, LGPD/ANPD ou Pix — sempre explicando **o que muda para pequenas empresas brasileiras**. Categoria: `Notícias e tendências`.
2. **Data sazonal próxima** (Black Friday, Natal, Dia das Mães, volta às aulas etc.) com guia prático de preparação do site, loja ou perfil.
3. **Pergunta comum ainda sem guia** sobre sites, SEO, lojas virtuais ou presença digital.

Não escrever sobre: política, temas sem relação com os serviços da Dreh Work, boatos ou vazamentos não confirmados.

## Regras de confiabilidade (obrigatórias)

- Posts de `Notícias e tendências` exigem **pelo menos 2 fontes** em `sources`, de preferência primárias (blog oficial do Google, Search Central, Meta, Shopify, ANPD, Banco Central, imprensa reconhecida). O teste bloqueia a publicação sem fontes.
- Só afirmar o que as fontes confirmam. Datas, nomes de recursos e números precisam estar nas fontes.
- Percentuais só são permitidos em posts com fontes.
- Sem promessas de resultado, sem depoimentos, sem clientes ou métricas inventados.
- Quando a novidade ainda estiver em teste ou disponível só em alguns países, dizer isso explicitamente.
- Na dúvida sobre um fato, cortar o trecho em vez de supor.

## Quando não publicar

Se nenhum tema atender aos critérios com fontes confiáveis, ou se os testes ou o CI não passarem, a execução termina **sem merge** e o resumo explica o motivo. Pular um dia é melhor do que publicar algo errado.
