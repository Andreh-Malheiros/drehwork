# Copy v2 — home 390 px

- Antes: `http://127.0.0.1:3908/`, baseline `origin/main` (`77c7786`), viewport 390 × 844 CSS px, captured 2026-11-13 16:16:10 -03:00.
- Depois: `http://127.0.0.1:3907/`, branch `codex/site-copy-v2-2026-11-13`, viewport 390 × 844 CSS px, captured 2026-11-13 16:16:38 -03:00.
- Capturas: `site-copy-before-390.png` e `site-copy-after-390.png`; banner de cookies recusado no navegador Playwright isolado antes de capturar.
- Em 390 px: largura do documento igual ao viewport, H1 sem corte, CTA principal com 48 px de altura e destino `/diagnostico`.
- Home, serviços, diagnóstico e contato: 34 caminhos internos únicos verificados localmente; nenhum retornou HTTP 4xx.
- Em 360/390/414 px, essas quatro páginas não tiveram rolagem horizontal. Há um H3 existente, “Sites profissionais”, cortado na home em 360 px e controles existentes menores que 44 px (cards/abas na home, Preferências de cookies e “Recomeçar” no diagnóstico); não foram alterados neste PR de copy.

O PNG `public/og.png` ainda contém o slogan antigo; a revisão desse arquivo aguarda liberação de edição visual.
