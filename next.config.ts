import type { NextConfig } from "next";

// Apex → www redirect is handled by Vercel domain settings; do not duplicate it here.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'" },
];

// Páginas de clientes publicadas em subdomínio próprio (o domínio é adicionado no projeto da Vercel e no DNS).
const clientSites = [
  { host: "pqueninos.drehwork.com", page: "/clientes/pqueninos" },
  // Domínio próprio da cliente (renovado em 06/11/2026); o DNS é configurado no Registro.br.
  { host: "pqueninos.com.br", page: "/clientes/pqueninos" },
  { host: "www.pqueninos.com.br", page: "/clientes/pqueninos" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    // Cases sem autorização pública (decisão D13): as páginas antigas apontam para o portfólio.
    const cases = ["wayne-store", "noar-oficial"].map(slug => ({ source: `/projetos/${slug}`, destination: "/projetos", permanent: true }));
    // Subdomínios de clientes mostram só a página do cliente; qualquer outro caminho volta ao site principal (evita conteúdo duplicado).
    const clientHosts = clientSites.map(({ host }) => ({ source: "/:path((?!clientes/|_next/|favicon\\.ico|apple-touch-icon|robots\\.txt|sitemap\\.xml).+)", has: [{ type: "host" as const, value: host }], destination: "https://www.drehwork.com/:path", permanent: false }));
    // Mantém compatibilidade com os links de produto do catálogo da Pqueninos que ainda usam o domínio da DrehWork.
    // Next.js preserva os parâmetros de consulta, incluindo UTMs e fbclid.
    const pqueninosProductRedirects = ["drehwork.com", "www.drehwork.com"].map(host => ({
      source: "/produtos/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://pqueninos.com.br/#inicio",
      permanent: true,
    }));
    return [...cases, ...pqueninosProductRedirects, ...clientHosts];
  },
  async rewrites() {
    // Navegadores pedem /favicon.ico e /apple-touch-icon.png na raiz do host: servir o ícone do cliente em vez do da DrehWork.
    const icons = [
      { source: "/favicon.ico", file: "favicon.ico" },
      { source: "/apple-touch-icon.png", file: "apple-touch-icon.png" },
      { source: "/apple-touch-icon-precomposed.png", file: "apple-touch-icon.png" },
    ];
    const iconRewrites = clientSites.flatMap(({ host, page }) => icons.map(({ source, file }) => ({ source, has: [{ type: "host" as const, value: host }], destination: `${page}/icons/${file}` })));
    // robots.txt e sitemap próprios do cliente (o do site principal listaria as páginas da DrehWork).
    const seoRewrites = clientSites.flatMap(({ host, page }) => ["robots.txt", "sitemap.xml"].map(file => ({ source: `/${file}`, has: [{ type: "host" as const, value: host }], destination: `${page}/${file}` })));
    return { beforeFiles: [...clientSites.map(({ host, page }) => ({ source: "/", has: [{ type: "host" as const, value: host }], destination: page })), ...iconRewrites, ...seoRewrites], afterFiles: [], fallback: [] };
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
