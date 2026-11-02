import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { brand } from "@/content/site";

// Root shell only. The DrehWork site chrome lives in app/(site)/layout.tsx so client pages (app/clientes) can use their own visual identity.
export const metadata: Metadata = { metadataBase: new URL(brand.url) };

const poppins = Poppins({ subsets: ["latin", "latin-ext"], weight: ["200", "300", "400", "500", "600", "700"], style: ["normal", "italic"], display: "swap", variable: "--font-poppins" });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={poppins.variable}><body suppressHydrationWarning>{children}</body></html>;
}
