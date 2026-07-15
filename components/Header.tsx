"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { brand, services } from "@/content/site";

const primaryNavigation = [
  ["Serviços", "/servicos"],
  ["Portfólio", "/projetos"],
  ["Sobre", "/processo"],
  ["Insights", "/insights"],
  ["Contato", "/contato"],
] as const;

const serviceIcons = ["◉", "⌁", "▥", "▱", "◇", "+"] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current === null) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const requestMegaClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 160);
  };

  const openMega = () => {
    clearCloseTimer();
    setMegaOpen(true);
  };

  const closeAll = () => {
    clearCloseTimer();
    setMenuOpen(false);
    setMegaOpen(false);
    setFormOpen(false);
  };

  useEffect(() => {
    if (!menuOpen && !megaOpen && !formOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (closeTimer.current !== null) {
        window.clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
      setMenuOpen(false);
      setMegaOpen(false);
      setFormOpen(false);
    };
    addEventListener("keydown", closeOnEscape);
    return () => removeEventListener("keydown", closeOnEscape);
  }, [menuOpen, megaOpen, formOpen]);

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <header className="site-header" data-menu-open={menuOpen} data-form-open={formOpen}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="nav-row">
        <Link href="/" className="brand-mark" aria-label={`${brand.name} - início`} onClick={closeAll}>
          {brand.name}
        </Link>

        <nav
          id="menu"
          className="nav-shell"
          aria-label="Navegação principal"
          data-open={menuOpen}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={requestMegaClose}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) requestMegaClose();
          }}
        >
          <div className="nav-links">
            {primaryNavigation.map(([label, href], index) => (
              <Link
                key={href}
                href={href}
                aria-expanded={index === 0 ? megaOpen : undefined}
                aria-controls={index === 0 ? "services-mega" : undefined}
                onMouseEnter={index === 0 ? openMega : requestMegaClose}
                onFocus={index === 0 ? openMega : requestMegaClose}
                onClick={closeAll}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>{label}
              </Link>
            ))}
          </div>

          <span className="safe-triangle" aria-hidden data-open={megaOpen} />

          <div
            className="mega-menu"
            id="services-mega"
            data-open={megaOpen}
            onMouseEnter={openMega}
            onMouseLeave={requestMegaClose}
          >
            <div className="mega-service-grid">
              {services.map((service, index) => (
                <Link key={service.slug} href={`/servicos/${service.slug}`} className="mega-service-card" onClick={closeAll}>
                  <span className="mega-service-icon" aria-hidden>{serviceIcons[index % serviceIcons.length]}</span>
                  <strong>{service.title}</strong>
                  <small>/{service.items.length} serviços</small>
                </Link>
              ))}
            </div>
          </div>

          <Link className="header-cta" href="/diagnostico" onClick={closeAll}>
            Iniciar um projeto <span aria-hidden>›</span>
          </Link>
        </nav>

        <div className="nav-actions" aria-label="Opções rápidas">
          <button
            className="grid-chip"
            type="button"
            aria-label={menuOpen || formOpen ? "Fechar" : "Abrir menu"}
            aria-expanded={menuOpen || formOpen}
            aria-controls={menuOpen ? "menu" : "project-form-panel"}
            onClick={() => {
              const isMobile = window.matchMedia("(max-width: 820px)").matches;
              setMegaOpen(false);
              if (isMobile) {
                setFormOpen(false);
                setMenuOpen((value) => !value);
                return;
              }
              setMenuOpen(false);
              setFormOpen((value) => !value);
            }}
          >
            {Array.from({ length: 9 }).map((_, index) => <span key={index} aria-hidden />)}
          </button>
        </div>
      </div>

      <div className="project-form-overlay" data-open={formOpen} aria-hidden={!formOpen}>
        <div className="project-form-panel" id="project-form-panel" role="dialog" aria-modal="true" aria-labelledby="project-form-title">
          <button className="form-close" type="button" aria-label="Fechar formulário" onClick={() => setFormOpen(false)}>×</button>
          <p className="form-brand">{brand.name}</p>
          <h2 id="project-form-title">Pronto para <span>começar?</span></h2>
          <p className="form-kicker">Preencha o formulário para solicitar um orçamento:</p>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="form-fields">
              <input aria-label="Seu Nome" placeholder="Seu Nome *" />
              <input aria-label="E-mail" type="email" placeholder="E-mail *" />
              <input aria-label="Telefone" placeholder="Telefone *" />
              <textarea aria-label="Fale-nos sobre o seu projeto" placeholder="Fale-nos sobre o seu projeto *" />
            </div>
            <fieldset className="interest-group">
              <legend>Serviços de seu interesse</legend>
              <div>
                {services.map((service) => (
                  <label key={service.slug}>
                    <input type="checkbox" name="services" value={service.slug} />
                    <span>{service.title}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <button className="form-submit" type="submit">Enviar solicitação <span aria-hidden>→</span></button>
          </form>
        </div>
      </div>
    </header>
  );
}
