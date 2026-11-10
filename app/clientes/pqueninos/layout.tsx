import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./pqueninos.css";

// Página de cliente servida em pqueninos.drehwork.com e pqueninos.com.br (rewrite em next.config.ts). Indexação liberada em 10/11/2026 (aval do Andreh); o canonical aponta para pqueninos.com.br.
// Fontes da marca (SIL Open Font License), subconjunto latino, versionadas no repositório: o next/font/google do Turbopack falhou de forma intermitente no build com várias famílias.
const quicksand = localFont({ src: "./fonts/quicksand-latin-var.woff2", weight: "500 700", display: "swap", variable: "--font-quicksand" });
const nunito = localFont({ src: "./fonts/nunito-latin-var.woff2", weight: "400 800", display: "swap", variable: "--font-nunito" });
const sacramento = localFont({ src: "./fonts/sacramento-latin.woff2", weight: "400", display: "swap", variable: "--font-sacramento" });

export const metadata: Metadata = {
  title: "Pqueninos Lembranças · Lembranças artesanais em BH",
  description: "Lembranças 100% artesanais para batizado, Eucaristia e momentos especiais. Retirada em BH ou envio para todo o Brasil.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  metadataBase: new URL("https://pqueninos.com.br"),
  applicationName: "Pqueninos Lembranças",
  manifest: "/clientes/pqueninos/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/clientes/pqueninos/icons/favicon.ico", sizes: "any" },
      { url: "/clientes/pqueninos/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/clientes/pqueninos/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/clientes/pqueninos/icons/apple-touch-icon.png", sizes: "180x180" },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Pqueninos Lembranças",
    title: "Pqueninos Lembranças · Lembranças artesanais em BH",
    description: "Lembranças 100% artesanais para batizado, Eucaristia e momentos especiais. Retirada em BH ou envio para todo o Brasil.",
    images: [{ url: "/clientes/pqueninos/icons/og.png", width: 1200, height: 630, alt: "Pqueninos Lembranças" }],
  },
  twitter: { card: "summary_large_image", title: "Pqueninos Lembranças", description: "Lembranças artesanais em Belo Horizonte.", images: ["/clientes/pqueninos/icons/og.png"] },
};

export const viewport: Viewport = { themeColor: "#FFF9F6", colorScheme: "light", viewportFit: "cover" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Pqueninos Lembranças",
  url: "https://pqueninos.com.br/",
  logo: "https://pqueninos.com.br/clientes/pqueninos/logo.webp",
  image: "https://pqueninos.com.br/clientes/pqueninos/icons/og.png",
  description: "Lembranças 100% artesanais para batizado, Eucaristia e momentos especiais. Retirada em BH ou envio para todo o Brasil.",
  address: { "@type": "PostalAddress", addressLocality: "Belo Horizonte", addressRegion: "MG", addressCountry: "BR" },
  sameAs: ["https://www.instagram.com/pqueninos/"],
};

export default function PqueninosLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`pq-root ${quicksand.variable} ${nunito.variable} ${sacramento.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      {children}
    </div>
  );
}
