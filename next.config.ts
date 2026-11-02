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
const clientSites = [{ host: "pqueninos.drehwork.com", page: "/clientes/pqueninos" }];

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
    const clientHosts = clientSites.map(({ host }) => ({ source: "/:path((?!clientes/|_next/).+)", has: [{ type: "host" as const, value: host }], destination: "https://www.drehwork.com/:path", permanent: false }));
    return [...cases, ...clientHosts];
  },
  async rewrites() {
    return { beforeFiles: clientSites.map(({ host, page }) => ({ source: "/", has: [{ type: "host" as const, value: host }], destination: page })), afterFiles: [], fallback: [] };
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
