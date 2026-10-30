import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IntroActivation } from "@/components/IntroActivation";
import { HomeMotion } from "@/components/HomeMotion";
import { CookieConsent } from "@/components/CookieConsent";
import { AnalyticsBridge } from "@/components/AnalyticsBridge";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { brand } from "@/content/site";
import { JsonLd, organizationSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata(""),
  metadataBase: new URL(brand.url),
  title: { default: "Criação de Sites Profissionais em BH e todo o Brasil | DrehWork", template: "%s | DrehWork" },
  applicationName: "DrehWork",
  authors: [{ name: brand.legalName }],
  creator: brand.legalName,
  formatDetection: { telephone: false },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : {}),
    other: { "facebook-domain-verification": "xpcex0bye3xfq99z0mvew0jwy95xui" },
  },
};

const poppins = Poppins({ subsets: ["latin", "latin-ext"], weight: ["200", "300", "400", "500", "600", "700"], style: ["normal", "italic"], display: "swap", variable: "--font-poppins" });

export const viewport: Viewport = { themeColor: "#000000", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={poppins.variable}><body suppressHydrationWarning><IntroActivation /><HomeMotion /><Header /><main id="conteudo">{children}</main><Footer /><WhatsAppFloat /><CookieConsent /><AnalyticsBridge /><JsonLd data={organizationSchema()} /></body></html>;
}
