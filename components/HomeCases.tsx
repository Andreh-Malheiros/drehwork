"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { projects } from "@/content/site";

const hostOf = (url: string) => new URL(url).hostname.replace(/^www\./, "");

/** Home proof: pick a case on the left, see the published site scroll inside a browser frame on the right. */
export function HomeCases() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const project = projects[active];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (active + step + projects.length) % projects.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return <div className="case-viewer">
    <div className="case-viewer-list" role="tablist" aria-label="Projetos publicados" aria-orientation="vertical" onKeyDown={onKeyDown}>
      {projects.map((item, index) => <button
        key={item.slug}
        ref={node => { tabs.current[index] = node; }}
        type="button"
        role="tab"
        id={`case-tab-${item.slug}`}
        aria-selected={index === active}
        aria-controls="case-viewer-panel"
        tabIndex={index === active ? 0 : -1}
        className="case-viewer-tab"
        onClick={() => setActive(index)}
      >
        <strong>{item.name}</strong>
        <span>{item.createdByDrehWork ? "Criação e desenvolvimento" : "Manutenção e evolução"}</span>
      </button>)}
    </div>

    <div className="case-viewer-panel" id="case-viewer-panel" role="tabpanel" aria-labelledby={`case-tab-${project.slug}`}>
      <div className="case-frame">
        <div className="case-frame-bar" aria-hidden><i /><i /><i /><span>{hostOf(project.url)}</span></div>
        <div className="case-frame-screen">
          {projects.map((item, index) => {
            const cover = item.media[0];
            return cover.src ? <Image key={item.slug} className={index === active ? "is-active" : undefined} src={cover.src} alt={index === active ? cover.alt : ""} width={cover.width} height={cover.height} sizes="(max-width: 900px) 92vw, 760px" /> : null;
          })}
        </div>
      </div>
      <div className="case-viewer-meta">
        <div>
          <p>{project.category}</p>
          <ul aria-label="Escopo do projeto">{project.scope.slice(0, 4).map(item => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="case-viewer-actions">
          <Link className="button primary" href={`/projetos/${project.slug}`}>Ver o case</Link>
          <a className="text-link" href={project.url} target="_blank" rel="noreferrer">Abrir o site publicado</a>
        </div>
      </div>
    </div>
  </div>;
}
