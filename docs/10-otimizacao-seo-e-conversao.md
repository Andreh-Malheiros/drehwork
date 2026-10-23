# Otimização de SEO e conversão (outubro de 2026)

Origem: navegação simulada por 5 personas (dono de negócio local, lojista de moda, marketing B2B, profissional liberal, auditor de SEO).

## Decisões do responsável

- Preço: o site explica **fatores de preço**, sem publicar valores (`/quanto-custa-um-site`).
- Localização: a Dreh Work é de Belo Horizonte (MG); o site assume BH + atendimento remoto em todo o Brasil.
- Nichos priorizados: moda/e-commerce e negócios locais/serviços.
- Escopo de presença digital confirmado: Google Perfil da Empresa, Google Search Console, SEO, Instagram, copy estratégica, captação de avaliações, preparação para IA e identidade digital. Também: consultoria de e-commerce e automação de processos internos.

## O que mudou

- Serviços com conteúdo próprio (público, entregáveis, prazo/investimento, projetos relacionados, FAQ com schema FAQPage) e títulos por palavra-chave. Novo serviço `automacao-de-processos`.
- Novas páginas de intenção de busca em `content/landings.ts`: quanto custa um site, criação de sites em BH, site para negócios locais, loja virtual para marcas de moda.
- Home: H1 com palavra-chave (slogan mantido como destaque visual), CTA de WhatsApp no topo, títulos falsos (`h2`) removidos da lista animada.
- Botão flutuante de WhatsApp; banner de cookies mais compacto no celular.
- Diagnóstico: segmento e UF em lista, opções para quem vende só pelo Instagram/WhatsApp ou em outra plataforma, Google Perfil opcional, erro indicando os campos e `aria-invalid`.
- three.js carregado só na home (páginas internas: ~517 KB → ~86–136 KB de JS descompactado, medido localmente).
- Sitemap com data de atualização fixa; `llms.txt` com preço, prazo, escopo e novas páginas.

## Pendências

- Estudos de caso com problema → solução → resultado (exigem dados reais dos clientes).
- Blog (`/insights`) com guias: Shopify x Nuvemshop, landing page x site, como aparecer no Google Maps.
- Medir Core Web Vitals em produção (PageSpeed/Search Console) após o deploy.
- Atualizar a data em `app/sitemap.ts` quando o conteúdo mudar.
