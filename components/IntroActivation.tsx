"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export function IntroActivation() {
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || sessionStorage.getItem("dreh:intro")) return;
    sessionStorage.setItem("dreh:intro", "seen");
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!visible || !root.current) return;
    let cancelled = false;
    const context = gsap.context(() => {
      const fonts = document.fonts?.ready ?? Promise.resolve();
      fonts.finally(() => {
        if (cancelled) return;
        const compact = matchMedia("(max-width: 600px)").matches;
        timeline.current = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => setVisible(false),
        })
          .fromTo(".activation-field", { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: compact ? 0.35 : 0.5 })
          .fromTo(".activation-node", { autoAlpha: 0, x: (index) => index % 2 ? 24 : -24, y: (index) => index < 2 ? -14 : 14 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.55, stagger: 0.06 }, "<0.08")
          .fromTo(".line-a", { scaleX: 0 }, { scaleX: 1, duration: 0.45 }, "<0.1")
          .fromTo(".line-b", { scaleY: 0 }, { scaleY: 1, duration: 0.45 }, "<")
          .fromTo(".activation-signature", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.15")
          .to(root.current, { autoAlpha: 0, yPercent: -3, duration: 0.65, ease: "power2.inOut" }, "+=0.45");
      });
    }, root);
    return () => {
      cancelled = true;
      timeline.current?.kill();
      context.revert();
    };
  }, [visible]);

  if (!visible) return null;
  return <div className="intro-activation" ref={root} role="status" aria-label="Dreh Work, presença digital ativada">
    <div className="activation-field" aria-hidden>
      <i className="activation-node node-a">CLAREZA</i><i className="activation-node node-b">BUSCA</i><i className="activation-node node-c">CONFIANÇA</i><i className="activation-node node-d">AÇÃO</i>
      <span className="activation-line line-a" /><span className="activation-line line-b" />
    </div>
    <div className="activation-signature"><strong>DREH WORK</strong><span>PRESENÇA / ATIVADA</span></div>
    <button onClick={() => { timeline.current?.kill(); setVisible(false); }}>Ir para o site <span aria-hidden>↗</span></button>
  </div>;
}
