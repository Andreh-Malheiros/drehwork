"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ListItem {
  id: number;
  title: string;
  category: string;
  src: string;
  alt: string;
  color: "blue";
}

interface RollingTextItemProps {
  item: ListItem;
  isActive: boolean;
  onActivate: () => void;
  onBlur: () => void;
}

const colorClassMap: Record<ListItem["color"], string> = {
  blue: "rolling-blue",
};

const items: ListItem[] = [
  {
    id: 1,
    title: "Instagram",
    category: "Canal único",
    src: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=600&auto=format&fit=crop&q=70",
    alt: "Pessoa usando uma rede social no celular",
    color: "blue",
  },
  {
    id: 2,
    title: "Indicação",
    category: "Sem contexto",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=70",
    alt: "Pessoas conversando em uma reunião",
    color: "blue",
  },
  {
    id: 3,
    title: "Concorrência",
    category: "Percepção",
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=70",
    alt: "Equipe analisando uma apresentação",
    color: "blue",
  },
  {
    id: 4,
    title: "Próximo passo",
    category: "Ação incerta",
    src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600&auto=format&fit=crop&q=70",
    alt: "Mesa de trabalho com materiais de planejamento",
    color: "blue",
  },
];

function ScrollColorText({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateReveal = () => {
      frame = 0;

      if (reducedMotion.matches) {
        element.style.setProperty("--reveal-pct", "100%");
        return;
      }

      const rect = element.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const wordCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const startLine = viewportHeight * 0.82;
      const range = Math.max(1, startLine - viewportCenter);
      const progress = Math.min(
        1,
        Math.max(0, (startLine - wordCenter) / range)
      );

      element.style.setProperty("--reveal-pct", `${(progress * 100).toFixed(2)}%`);
    };

    const scheduleUpdate = () => {
      if (frame) {
        return;
      }

      frame = requestAnimationFrame(updateReveal);
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);

    resizeObserver.observe(element);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);
    scheduleUpdate();

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }

      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
    };
  }, []);

  return (
    <span ref={ref} className="scroll-color-text">
      {children}
    </span>
  );
}

function RollingTextItem({
  item,
  isActive,
  onActivate,
  onBlur,
}: RollingTextItemProps) {
  return (
    <button
      className="rolling-text-item group"
      data-active={isActive || undefined}
      type="button"
      onBlur={onBlur}
      onClick={onActivate}
      onFocus={onActivate}
    >
      <div className="rolling-text-window">
        <div className="rolling-text-track">
          <div className="rolling-text-state">
            <h2>{item.title}</h2>
          </div>

          <div className="rolling-text-state">
            <h2 className={cn("italic", colorClassMap[item.color])}>
              {item.title}
            </h2>
          </div>
        </div>
      </div>

      <span className="rolling-category">{item.category}</span>

      <div className="rolling-image">
        <div className="rolling-image-inner">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="rolling-img"
            sizes="(max-width: 700px) 42vw, 220px"
          />
          <div className="rolling-image-tint" />
        </div>
      </div>
    </button>
  );
}

function RollingTextList() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="rolling-text-list">
      <h3>Percepção em risco</h3>
      <div>
        {items.map((item) => (
          <RollingTextItem
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            onActivate={() => setActiveId(item.id)}
            onBlur={() => setActiveId(null)}
          />
        ))}
      </div>
    </div>
  );
}

export function HomeProblem() {
  return (
    <section className="home-problem section-light" id="problema">
      <div className="shell home-problem-shell home-problem-row" data-reveal>
        <div className="home-problem-copy">
          <p className="kicker">
            <span aria-hidden>+</span> O problema não é só não ter um site
          </p>
          <p className="problem-statement">
            Valor real pode ficar <ScrollColorText>invisível.</ScrollColorText>
          </p>
        </div>
        <RollingTextList />
      </div>
    </section>
  );
}
