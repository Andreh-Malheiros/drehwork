# Implementação da primeira versão funcional

Status: pronta para revisão, sem implantação em produção.

## Stack e estrutura

- Vinext e Next.js App Router, compatíveis com o fluxo do Sites e saída Cloudflare Worker.
- React e TypeScript para componentes e modelos tipados.
- CSS próprio com tokens em `:root`; sem biblioteca visual ou dependência de animação.
- Conteúdo centralizado em `content/site.ts`.
- Interatividade isolada para menu, comparação, seletor de objetivo, abertura e diagnóstico.
- Sem banco de dados, D1, R2, autenticação ou CMS.

## Dependências

- `next`, `react` e `react-dom`: renderização e interface.
- `vinext`, Vite e plugin Cloudflare: desenvolvimento, build e empacotamento para Sites.
- TypeScript e ESLint: validação estática.

## Comandos

- `npm install`: instala dependências.
- `npm run dev`: abre o ambiente local.
- `npm run typecheck`: valida tipos.
- `npm run lint`: valida padrões de código.
- `npm test`: executa verificações de integridade.
- `npm run build`: cria a saída de implantação.
- `npm run check`: executa toda a validação.

## Conteúdo e manutenção

### Inserir um projeto

Inclua um novo item tipado em `projects`, no arquivo `content/site.ts`. A rota e o card serão gerados pela estrutura existente.

### Inserir mídia

Adicione o arquivo em `public/projects/<slug>/` e preencha o array `media` do projeto com tipo, origem, texto alternativo, dimensões, prioridade e legenda. O fallback desaparecerá ao ser substituído na composição futura.

### Publicar um Insight

Inclua um item em `insights` com título, slug, resumo, datas, categoria, conteúdo, SEO e `status: "published"`. Rascunhos devem permanecer com `status: "draft"` e não devem ser renderizados.

## Integrações futuras

- O envio do diagnóstico está isolado em `lib/diagnostic-service.ts` e atualmente retorna apenas modo de revisão.
- Eventos não pessoais estão centralizados em `lib/analytics.ts` para futura ligação com GA, GTM ou Vercel Analytics.
- Agendamento deverá ser conectado somente após escolha da ferramenta.
- Nenhuma variável de ambiente é necessária nesta versão; por isso não existe `.env.example`.

## Decisões provisórias

- Azul elétrico `#4D5BFF` como destaque, centralizado em tokens.
- Assinatura tipográfica DREH WORK; não tratada como logo definitiva.
- Poppins via carregamento web, com fallback de sistema; IBM Plex Mono apenas em rótulos técnicos.
- Cursor personalizado mantido desabilitado nesta primeira versão para preservar precisão, acessibilidade e desempenho até validação visual específica.
- `llms.txt` não incluído: sitemap, conteúdo semântico e dados estruturados oferecem base verificável; o arquivo seria apenas experimental.

## Limitações e pendências

- Screenshots, vídeos e demais mídias reais dos projetos.
- Conteúdo factual completo dos estudos de caso.
- Integração autorizada com Google Sheets ou sistema próprio.
- Ferramenta de agendamento.
- IDs e consentimento para analytics real.
- Revisão jurídica das políticas e termos.
- Logo, favicon e cor definitiva.
- Revisão editorial final da copy.
