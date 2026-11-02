import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./pqueninos.css";

// Página de cliente servida em pqueninos.drehwork.com (rewrite em next.config.ts). Fora da busca até a dona aprovar a publicação.
// Fontes da marca (SIL Open Font License), subconjunto latino, versionadas no repositório: o next/font/google do Turbopack falhou de forma intermitente no build com várias famílias.
const quicksand = localFont({ src: "./fonts/quicksand-latin-var.woff2", weight: "500 700", display: "swap", variable: "--font-quicksand" });
const nunito = localFont({ src: "./fonts/nunito-latin-var.woff2", weight: "400 800", display: "swap", variable: "--font-nunito" });
const sacramento = localFont({ src: "./fonts/sacramento-latin.woff2", weight: "400", display: "swap", variable: "--font-sacramento" });

export const metadata: Metadata = {
  title: "Pqueninos Lembranças · Lembranças artesanais em BH",
  description: "Lembranças 100% artesanais para batizado, Eucaristia e momentos especiais. Retirada em BH ou envio para todo o Brasil.",
  robots: { index: false, follow: false },
  icons: { icon: "/clientes/pqueninos/logo.webp", apple: "/clientes/pqueninos/logo.webp" },
};

export const viewport: Viewport = { themeColor: "#FFF9F6", colorScheme: "light", viewportFit: "cover" };

export default function PqueninosLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`pq-root ${quicksand.variable} ${nunito.variable} ${sacramento.variable}`}>{children}</div>;
}
