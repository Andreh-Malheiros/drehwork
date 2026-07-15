import Link from "next/link";
import { brand, navigation, whatsappUrl } from "@/content/site";

export function Footer() {
  return <footer className="site-footer">
    <div className="shell footer-lead">
      <p className="kicker">Dreh Work / presença em movimento</p>
      <p className="footer-statement">Qualidade precisa ser <em>percebida.</em></p>
      <Link className="footer-action" href="/diagnostico"><span>Iniciar diagnóstico gratuito</span><b aria-hidden>↗</b></Link>
    </div>
    <div className="shell footer-grid">
      <div><p className="wordmark">{brand.name}</p><p>{brand.positioning}</p><small>Estratégia · Experiência · Tecnologia</small></div>
      <div><p className="kicker">Navegação</p>{navigation.slice(1).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
      <div><p className="kicker">Contato</p><a href={`mailto:${brand.email}`}>{brand.email}</a><a href={whatsappUrl("meu projeto")} target="_blank" rel="noreferrer">WhatsApp</a><a href="https://instagram.com/dreh.work" target="_blank" rel="noreferrer">{brand.instagram}</a></div>
    </div>
    <div className="shell footer-bottom"><span>{brand.serviceArea}</span><span>{brand.hours}</span><span>© {new Date().getFullYear()} Dreh Work</span></div>
  </footer>;
}
