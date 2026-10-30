"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** Each block of the example site has a "before" box and an "after" box (percent of the stage) and starts assembling at `s`. */
type Box = [x: number, y: number, w: number, h: number, rotate: number, opacity: number];
type Block = { id: string; s: number; before: Box; after: Box; content: ReactNode; className?: string };

const signals = [
  { at: 0.12, title: "Mensagem com direção", text: "A oferta aparece em uma frase, no lugar de um “seja bem-vindo”." },
  { at: 0.35, title: "Próxima ação evidente", text: "Um botão claro substitui o “clique aqui” perdido no rodapé." },
  { at: 0.58, title: "Confiança visível", text: "Avaliações e serviços ficam à vista, não escondidos." },
  { at: 0.82, title: "Base para descoberta", text: "Estrutura que o Google e as ferramentas de IA conseguem ler." },
] as const;

const blocks: Block[] = [
  {
    id: "nav", s: 0.4, before: [58, 2, 36, 7, 3, 0], after: [0, 0, 100, 10, 0, 1], className: "is-nav",
    content: <><b>Confeitaria Exemplo</b><span>Bolos</span><span>Encomendas</span><span>Contato</span><i>Pedir orçamento</i></>,
  },
  {
    id: "headline", s: 0, before: [56, 6, 38, 9, 4, 1], after: [6, 19, 50, 22, 0, 1], className: "is-headline",
    content: <><span className="shift-b">Seja bem-vindo ao nosso site!!</span><span className="shift-a">Bolos sob encomenda em Belo Horizonte</span></>,
  },
  {
    id: "text", s: 0.08, before: [6, 12, 44, 30, 0, 1], after: [6, 43, 42, 9, 0, 1], className: "is-text",
    content: <><span className="shift-b"><i /><i /><i /><i /><i /><i /><i /></span><span className="shift-a">Encomende pelo WhatsApp e retire no ateliê ou receba em casa.</span></>,
  },
  {
    id: "cta", s: 0.28, before: [80, 90, 14, 4, 0, .7], after: [6, 57, 27, 8, 0, 1], className: "is-cta",
    content: <><span className="shift-b">clique aqui</span><span className="shift-a">Pedir orçamento</span></>,
  },
  {
    id: "photo", s: 0.18, before: [38, 50, 20, 26, 9, 1], after: [58, 17, 36, 50, 0, 1], className: "is-photo",
    content: <><i /><i /><i /></>,
  },
  {
    id: "links", s: 0.3, before: [6, 46, 26, 34, -2, 1], after: [6, 46, 26, 34, -2, 0], className: "is-links",
    content: <><span>Cardápio (PDF)</span><span>Instagram</span><span>Promoções</span><span>Fale conosco</span></>,
  },
  {
    id: "proof", s: 0.48, before: [70, 30, 22, 6, -6, 0], after: [6, 72, 33, 7, 0, 1], className: "is-proof",
    content: <><b aria-hidden>★★★★★</b><span>Avaliações no Google</span></>,
  },
  {
    id: "services", s: 0.62, before: [62, 66, 30, 18, -5, .35], after: [58, 72, 36, 17, 0, 1], className: "is-services",
    content: <><span>Aniversário</span><span>Casamento</span><span>Corporativo</span></>,
  },
];

const boxStyle = (block: Block) => {
  const [bx, by, bw, bh, br, bo] = block.before;
  const [ax, ay, aw, ah, ar, ao] = block.after;
  return { "--s": block.s, "--bx": bx, "--by": by, "--bw": bw, "--bh": bh, "--br": br, "--bo": bo, "--ax": ax, "--ay": ay, "--aw": aw, "--ah": ah, "--ar": ar, "--ao": ao } as CSSProperties;
};

/** "Antes e depois": the same example site assembles itself from scattered pieces into a structured page. */
export function PresenceShift() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const progress = useRef({ p: 0 });
  const [value, setValue] = useState(0);
  const [lit, setLit] = useState(0);

  const apply = (p: number) => {
    progress.current.p = p;
    stage.current?.style.setProperty("--p", p.toFixed(4));
    setValue(Math.round(p * 100));
    setLit(signals.filter(signal => p >= signal.at).length);
  };

  const playTo = (target: number) => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf(progress.current);
    if (reduce) { apply(target); return; }
    gsap.to(progress.current, { p: target, duration: 2.2 * Math.abs(target - progress.current.p) + .3, ease: "power2.inOut", onUpdate: () => apply(progress.current.p) });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    // Desktop: the section holds still while scrolling assembles the page.
    media.add("(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)", () => {
      const trigger = ScrollTrigger.create({
        trigger: root.current,
        start: "center center",
        end: "+=110%",
        pin: true,
        scrub: 0.6,
        onUpdate: self => { gsap.killTweensOf(progress.current); apply(self.progress); },
      });
      return () => trigger.kill();
    });
    // Smaller screens: play the transformation once when the stage comes into view.
    media.add("(max-width: 1023px), (max-height: 699px)", () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const trigger = ScrollTrigger.create({ trigger: stage.current, start: "top 70%", once: true, onEnter: () => playTo(1) });
      return () => trigger.kill();
    });
    return () => media.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="shift" ref={root}>
    <div className="shift-copy">
      <p className="kicker">Antes e depois</p>
      <h2 className="shift-title" id="shift-title">A diferença aparece antes do clique.</h2>
      <p className="shift-lead">O mesmo negócio, com as mesmas informações. Quando mensagem, prova e ação ganham lugar certo, o visitante entende em segundos o que fazer.</p>
      <ol className="shift-signals">
        {signals.map((signal, index) => <li key={signal.title} data-on={index < lit}>
          <span aria-hidden />
          <div><strong>{signal.title}</strong><p>{signal.text}</p></div>
        </li>)}
      </ol>
    </div>

    <div className="shift-visual">
      <div className="shift-window">
        <div className="shift-bar" aria-hidden><i /><i /><i /><span>seusite.com.br</span></div>
        <div className="shift-stage" ref={stage} style={{ "--p": 0 } as CSSProperties} aria-hidden>
          {blocks.map(block => <div key={block.id} className={`shift-block ${block.className ?? ""}`} style={boxStyle(block)}>{block.content}</div>)}
        </div>
      </div>
      <p className="sr-only">Exemplo ilustrativo: um site desorganizado, com mensagem genérica, links soltos e um “clique aqui” no rodapé, se transforma em uma página com oferta clara, botão de orçamento, avaliações e serviços.</p>
      <div className="shift-controls">
        <button type="button" onClick={() => playTo(value >= 50 ? 0 : 1)}>{value >= 50 ? "Ver o antes" : "Ver o depois"}</button>
        <label className="shift-range">
          <span>Sem estrutura</span>
          <input type="range" min={0} max={100} value={value} aria-label="Nível de estrutura do exemplo" onChange={event => { gsap.killTweensOf(progress.current); apply(Number(event.target.value) / 100); }} style={{ "--fill": `${value}%` } as CSSProperties} />
          <span>Com estrutura</span>
        </label>
      </div>
      <p className="shift-note">Exemplo ilustrativo de uma empresa fictícia.</p>
    </div>
  </div>;
}
