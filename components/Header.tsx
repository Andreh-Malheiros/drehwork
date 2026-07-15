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

const serviceVisuals = [
  { icon: "browser", visual: "web" },
  { icon: "target", visual: "campaign" },
  { icon: "refresh", visual: "structure" },
  { icon: "bag", visual: "commerce" },
  { icon: "network", visual: "presence" },
  { icon: "tool", visual: "support" },
] as const;

function ServiceIcon({ name }: { name: typeof serviceVisuals[number]["icon"] }) {
  const common = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.8 } as const;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {name === "browser" && <><rect x="3.5" y="5" width="17" height="14" rx="2.5" {...common} /><path d="M3.5 9h17M7 7h.01M10 7h.01" {...common} /></>}
      {name === "target" && <><circle cx="12" cy="12" r="7.5" {...common} /><circle cx="12" cy="12" r="3" {...common} /><path d="M12 2.8v2.1M12 19.1v2.1M2.8 12h2.1M19.1 12h2.1" {...common} /></>}
      {name === "refresh" && <><path d="M18.5 8.3A7 7 0 0 0 6.2 6.8L4.5 9.1" {...common} /><path d="M4.5 5.2v3.9h3.9M5.5 15.7a7 7 0 0 0 12.3 1.5l1.7-2.3" {...common} /><path d="M19.5 18.8v-3.9h-3.9" {...common} /></>}
      {name === "bag" && <><path d="M6.5 8.2h11l-.8 10.6a2 2 0 0 1-2 1.8H9.3a2 2 0 0 1-2-1.8L6.5 8.2Z" {...common} /><path d="M9 8.2V7a3 3 0 0 1 6 0v1.2" {...common} /></>}
      {name === "network" && <><circle cx="7" cy="8" r="2.2" {...common} /><circle cx="17" cy="7" r="2.2" {...common} /><circle cx="12" cy="17" r="2.2" {...common} /><path d="M9 9.1l6 5.8M15.2 8.3l-2.4 6.5M8.7 9.6l2.3 5.4" {...common} /></>}
      {name === "tool" && <><path d="M14.4 5.1a5 5 0 0 0 4.5 6.7l-7.1 7.1a2.7 2.7 0 0 1-3.8-3.8l7.1-7.1a5 5 0 0 0-.7-2.9Z" {...common} /><path d="M7.8 16.2l-1.5 1.5" {...common} /></>}
    </svg>
  );
}

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

  useEffect(() => {
    if (!formOpen) return;
    const panel = document.getElementById("project-form-panel");
    const header = panel?.closest(".site-header");
    const lockedElements = new Set([
      ...Array.from(document.body.children),
      ...(header ? Array.from(header.children) : []),
    ]);
    const restore = Array.from(lockedElements)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && !element.contains(panel))
      .map((element) => [element, element.inert] as const);

    restore.forEach(([element]) => {
      element.inert = true;
    });

    return () => {
      restore.forEach(([element, inert]) => {
        element.inert = inert;
      });
    };
  }, [formOpen]);

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
              {[0, 1].map((column) => (
                <div className="mega-service-column" key={column}>
                  {services
                    .map((service, index) => ({ service, index }))
                    .filter(({ index }) => index % 2 === column)
                    .map(({ service, index }) => {
                      const visual = serviceVisuals[index % serviceVisuals.length];
                      return (
                        <Link
                          key={service.slug}
                          href={`/servicos/${service.slug}`}
                          className="mega-service-card"
                          data-visual={visual.visual}
                          onClick={closeAll}
                        >
                          <span className="mega-service-icon" aria-hidden><ServiceIcon name={visual.icon} /></span>
                          <strong>{service.title}</strong>
                          <small>/{service.items.length} serviços</small>
                        </Link>
                      );
                    })}
                </div>
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

      <div className="project-form-overlay" data-open={formOpen} aria-hidden={!formOpen} onClick={() => setFormOpen(false)}>
        <div className="project-form-panel" id="project-form-panel" role="dialog" aria-modal="true" aria-labelledby="project-form-title" onClick={(event) => event.stopPropagation()}>
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
