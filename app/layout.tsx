import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IntroActivation } from "@/components/IntroActivation";
import { HomeMotion } from "@/components/HomeMotion";
import { brand } from "@/content/site";
import { JsonLd, organizationSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata(""),
  metadataBase: new URL(brand.url),
  title: { default: "Dreh Work | Sites estratégicos, SEO e crescimento digital", template: "%s | Dreh Work" },
  applicationName: "Dreh Work",
  authors: [{ name: brand.legalName }],
  creator: brand.legalName,
  formatDetection: { telephone: false },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
};

export const viewport: Viewport = { themeColor: "#000000", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body suppressHydrationWarning><IntroActivation /><HomeMotion /><Header /><main id="conteudo">{children}</main><Footer /><JsonLd data={organizationSchema()} /></body></html>;
}
