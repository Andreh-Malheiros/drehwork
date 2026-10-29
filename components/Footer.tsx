import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { CookiePreferencesLink } from "@/components/CookiePreferencesLink";
import { brand, navigation, whatsappUrl } from "@/content/site";
import { landings } from "@/content/landings";

export function Footer() {
  return <footer className="site-footer">
    <div className="shell footer-lead">
      <p className="kicker">DrehWork / presença em movimento</p>
      <p className="footer-statement">Qualidade precisa ser <em>percebida.</em></p>
      <Link className="footer-action" href="/diagnostico"><span>Iniciar diagnóstico gratuito</span><b aria-hidden>↗</b></Link>
    </div>
    <div className="shell footer-grid">
      <div><BrandLogo className="footer-logo" /><p>{brand.slogan}</p><small>{brand.pillars.join(" · ")}</small></div>
      <div><p className="kicker">Navegação</p>{navigation.slice(1).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
      <div><p className="kicker">Soluções</p>{landings.map(l => <Link key={l.slug} href={`/${l.slug}`}>{l.seoTitle}</Link>)}</div>
      <div><p className="kicker">Contato</p><a href={`mailto:${brand.email}`}>{brand.email}</a><a href={whatsappUrl("meu projeto")} target="_blank" rel="noreferrer">WhatsApp</a><a href={brand.instagramUrl} target="_blank" rel="noreferrer">{brand.instagram}</a></div>
    </div>
    <div className="shell footer-bottom"><span>{brand.serviceArea} · {brand.hours}</span><nav className="footer-legal-links" aria-label="Documentos legais"><Link href="/politica-de-privacidade">Privacidade</Link><Link href="/politica-de-cookies">Cookies</Link><Link href="/termos-de-uso">Termos</Link><CookiePreferencesLink /></nav><span>© {new Date().getFullYear()} DrehWork · {brand.legalName} · CNPJ {brand.cnpj}</span></div>
  </footer>;
}
