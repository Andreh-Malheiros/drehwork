import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { CookiePreferencesLink } from "@/components/CookiePreferencesLink";
import { brand, navigation, services, whatsappUrl } from "@/content/site";
import { landings } from "@/content/landings";

/** Short footer labels for the landing pages; their SEO titles are too long for a link list. */
const landingLabels: Record<string, string> = {
  "quanto-custa-um-site": "Quanto custa um site",
  "criacao-de-sites-belo-horizonte": "Sites em Belo Horizonte",
  "site-para-negocios-locais": "Sites para negócios locais",
  "loja-virtual-para-marcas-de-moda": "Lojas para marcas de moda",
};

export function Footer() {
  return <footer className="site-footer foot">
    <div className="shell foot-lead">
      <p className="foot-statement">Qualidade precisa ser <em>percebida.</em></p>
      <div className="foot-actions">
        <Link className="button primary" href="/diagnostico">Solicitar diagnóstico gratuito</Link>
        <a className="button foot-whatsapp" href={whatsappUrl("meu projeto")} target="_blank" rel="noreferrer">Conversar no WhatsApp</a>
      </div>
    </div>

    <div className="shell foot-grid">
      <div className="foot-brand">
        <BrandLogo className="footer-logo" />
        <p>{brand.slogan}</p>
        <ul className="foot-contact">
          <li><a href={`mailto:${brand.email}`}>{brand.email}</a></li>
          <li><a href={whatsappUrl("meu projeto")} target="_blank" rel="noreferrer">WhatsApp {brand.whatsapp}</a></li>
          <li><a href={brand.instagramUrl} target="_blank" rel="noreferrer">Instagram {brand.instagram}</a></li>
          <li>{brand.hours}</li>
          <li>{brand.serviceArea}</li>
        </ul>
      </div>
      <nav aria-label="Navegação do site"><h2>Navegação</h2><ul>{navigation.slice(1).map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>
      <nav aria-label="Serviços"><h2>Serviços</h2><ul>{services.map(service => <li key={service.slug}><Link href={`/servicos/${service.slug}`}>{service.title}</Link></li>)}</ul></nav>
      <nav aria-label="Soluções"><h2>Soluções</h2><ul>{landings.map(landing => <li key={landing.slug}><Link href={`/${landing.slug}`}>{landingLabels[landing.slug] ?? landing.seoTitle}</Link></li>)}</ul></nav>
    </div>

    <div className="shell foot-bottom">
      <p>© {new Date().getFullYear()} DrehWork · {brand.legalName} · CNPJ {brand.cnpj}</p>
      <nav className="footer-legal-links" aria-label="Documentos legais"><Link href="/politica-de-privacidade">Privacidade</Link><Link href="/politica-de-cookies">Cookies</Link><Link href="/termos-de-uso">Termos</Link><CookiePreferencesLink /></nav>
    </div>
  </footer>;
}
