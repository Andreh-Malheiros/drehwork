import type { Metadata, Viewport } from "next";
import { Nunito, Quicksand, Sacramento } from "next/font/google";
import "./pqueninos.css";

// Página de cliente servida em pqueninos.drehwork.com (rewrite em next.config.ts). Fora da busca até a dona aprovar a publicação.
const quicksand = Quicksand({ subsets: ["latin", "latin-ext"], weight: ["500", "600", "700"], display: "swap", variable: "--font-quicksand" });
const nunito = Nunito({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600", "700", "800"], display: "swap", variable: "--font-nunito" });
const sacramento = Sacramento({ subsets: ["latin", "latin-ext"], weight: "400", display: "swap", variable: "--font-sacramento" });

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
