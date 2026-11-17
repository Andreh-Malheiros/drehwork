import { produtos } from "@/content/clientes/pqueninos-catalogo";
import { CATEGORIAS, SEO_LASTMOD, SITE, categoriaUrl, produtoUrl } from "@/content/clientes/pqueninos-seo";

// Servido em pqueninos.com.br/sitemap.xml (rewrite em next.config.ts). Gerado do catálogo, então nunca fica fora de sincronia com as páginas.
export const dynamic = "force-static";

export function GET() {
  const urls = ["/", ...CATEGORIAS.map(c => categoriaUrl(c.id)), ...produtos.map(produtoUrl)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${SITE}${u}</loc><lastmod>${SEO_LASTMOD}</lastmod></url>`).join("\n")}\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
