import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IntroActivation } from "@/components/IntroActivation";
import { HomeMotion } from "@/components/HomeMotion";
import { brand } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://drehwork.com.br"),
  title: { default: "Dreh Work | Sites estratégicos e presença digital", template: "%s | Dreh Work" },
  description: "Sites profissionais e estratégicos para empresas que precisam transmitir confiança, ser encontradas e gerar oportunidades.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "pt_BR", siteName: "Dreh Work", title: "Dreh Work | Sites estratégicos e presença digital", description: "Sua empresa pode ser excelente. A presença digital precisa demonstrar isso.", images: [{ url: "/og.png", width: 1792, height: 931, alt: "Dreh Work — Sites estratégicos. Presença que demonstra valor." }] },
  twitter: { card: "summary_large_image", title: "Dreh Work | Sites estratégicos", description: "Presença digital estruturada para confiança, descoberta e oportunidades.", images: ["/og.png"] },
};

const organization = { "@context": "https://schema.org", "@type": "Organization", name: "Dreh Work", url: "https://drehwork.com.br", email: brand.email, areaServed: "BR", description: brand.positioning };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body suppressHydrationWarning><IntroActivation /><HomeMotion /><Header /><main id="conteudo">{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /></body></html>;
}
