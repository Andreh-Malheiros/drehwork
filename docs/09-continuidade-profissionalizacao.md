# Continuidade — profissionalização do site (out/2026)

Entregue em 9 fases no PR "Profissionalização do site Dreh Work".

## Estado atual
- Domínio canônico: https://www.drehwork.com (a Vercel redireciona o apex para www). Fonte única: `brand.url` em `content/site.ts`.
- Identidade: símbolo SVG em `components/BrandLogo.tsx`; ícones em `app/` e `public/brand/`; artes originais em `assets/brand/source/`.
- SEO/AEO/GEO: `lib/seo.tsx` (metadata por rota, JSON-LD, breadcrumbs, sitemap e robots); `public/llms.txt`. Insights em noindex até haver artigo.
- Jurídico: `content/legal.ts` (controlador: Andreh Malheiros Tiberio, MEI, CNPJ 65.415.209/0001-61). Revisar a data `LEGAL_UPDATED` a cada mudança.
- Consentimento: `components/CookieConsent.tsx` + `lib/consent.ts`; GA4 só carrega após aceite (`components/AnalyticsBridge.tsx`).
- Leads: `/api/diagnostico` e `/api/contato` enviam por e-mail via Resend (`lib/mailer.ts`). Sem variáveis configuradas, respondem 503 e o formulário oferece WhatsApp.
- Motion: tokens `--ease-signature` e `--dur-*` no fim de `app/globals.css`; personalidade Premium.
- CI: `.github/workflows/ci.yml` (typecheck, lint, testes, build).

## Pendências que dependem do responsável
1. Vercel > Environment Variables: `NEXT_PUBLIC_GA_ID`, `RESEND_API_KEY`, `RESEND_FROM` (domínio verificado no Resend), opcional `DIAGNOSTIC_TO`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
2. Vercel > Analytics: ativar Web Analytics.
3. GA4: retenção de 14 meses e eventos-chave (`diagnostic_submit`, `whatsapp_click`, `email_click`). Ver `docs/08-analytics.md`.
4. Search Console e Bing Webmaster: verificar a propriedade e enviar `https://www.drehwork.com/sitemap.xml`.
5. Resend: verificar o domínio drehwork.com (registros SPF/DKIM) antes de configurar `RESEND_FROM`.

## Decisões
- FAQ rich results foram descontinuados pelo Google em maio/2026; o FAQPage é mantido apenas onde as perguntas são visíveis (AEO).
- CSP completa não foi aplicada: os scripts inline do Next exigiriam `unsafe-inline` e o ganho seria baixo. Mantida a CSP mínima (frame-ancestors, base-uri, object-src).
- Copy usa persuasão legítima (enquadramento, qualificação, aversão à perda) e apenas números confirmados: +20 projetos, 2 anos.
- A home não cita projetos nominalmente; o portfólio fica em /projetos.
