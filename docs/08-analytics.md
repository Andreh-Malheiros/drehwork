# Plano de medição

## Ferramentas
- **Vercel Web Analytics** (`@vercel/analytics`): visitas e páginas, sem cookies, sempre ativo. Ativar em Vercel > Project > Analytics.
- **Google Analytics 4**: carregado apenas após consentimento (Consent Mode v2, padrão `denied`). Requer `NEXT_PUBLIC_GA_ID`.
  - Em GA4 > Admin > Coleta e retenção de dados, definir retenção de **14 meses** (prazo informado na Política de Privacidade).
  - Marcar como **eventos-chave (conversões)**: `diagnostic_submit`, `whatsapp_click`, `email_click`.

## Arquitetura
Componentes chamam `track(evento, dados)` (`lib/analytics.ts`), que emite `dreh:analytics`.
`components/AnalyticsBridge.tsx` encaminha para o GA4 (se houver consentimento) e envia ao Vercel somente as conversões.
Cliques em links são classificados automaticamente, sem instrumentar cada componente.

## Eventos
| Evento | Quando | Parâmetros |
|---|---|---|
| page_view | troca de rota (GA4) | page_path, page_title |
| whatsapp_click | link wa.me | label |
| email_click | link mailto | label |
| instagram_click | link Instagram | label |
| nav_click | links do menu e rodapé | label, href |
| page_cta_click | botões e links para /diagnostico | label, href |
| project_click | links de estudo de caso | href |
| external_site_click | links externos (sites de clientes) | href |
| faq_open | abertura de pergunta frequente | question |
| scroll_depth | 25/50/75/100% da página | percent |
| objective_select | escolha no seletor de objetivos | objective |
| diagnostic_start / step_forward / step_back / validation_error | fluxo do diagnóstico | step |
| diagnostic_submit | envio bem-sucedido do diagnóstico | solution |
| diagnostic_submit_error | falha no envio | reason |
| cookie_consent | decisão no banner | analytics |

Nenhum dado pessoal (nome, e-mail, telefone) é enviado em parâmetros de evento.
