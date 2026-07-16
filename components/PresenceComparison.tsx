"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Highlight = {
  id: string;
  icon?: ReactNode;
  title: string;
  description?: string;
};

type RevealImage = {
  src: string;
  alt: string;
};

type Reveal2Props = {
  badge?: {
    label: string;
    variant?: "default" | "secondary" | "outline";
  };
  heading?: string;
  description?: string;
  highlights?: Highlight[];
  beforeImage?: RevealImage;
  afterImage?: RevealImage;
  beforeLabel?: string;
  afterLabel?: string;
  showLabels?: boolean;
  orientation?: "horizontal" | "vertical";
  initialPosition?: number;
  dividerWidth?: number;
  className?: string;
};

function SignalGlyph() {
  return (
    <svg aria-hidden viewBox="0 0 24 24">
      <path d="M5 16.5 12 5l7 11.5" />
      <path d="M8.2 16.5h7.6" />
      <path d="M12 5v11.5" />
      <circle cx="12" cy="18.8" r="1.6" />
    </svg>
  );
}

function ProofGlyph() {
  return (
    <svg aria-hidden viewBox="0 0 24 24">
      <path d="M12 4.5 18.5 8v5.6c0 3.5-2.7 5.4-6.5 6.8-3.8-1.4-6.5-3.3-6.5-6.8V8L12 4.5Z" />
      <path d="m9.1 12.3 2 2 4-4.7" />
    </svg>
  );
}

function DiscoveryGlyph() {
  return (
    <svg aria-hidden viewBox="0 0 24 24">
      <circle cx="10.7" cy="10.7" r="5.7" />
      <path d="M15 15 20 20" />
      <path d="M10.7 7.3v6.8" />
      <path d="M7.3 10.7h6.8" />
    </svg>
  );
}

function ActionGlyph() {
  return (
    <svg aria-hidden viewBox="0 0 24 24">
      <path d="M4.5 7.5h7c3.4 0 3.4 9 6.8 9h1.2" />
      <path d="M16.4 13.4 19.5 16.5l-3.1 3.1" />
      <circle cx="6.2" cy="7.5" r="1.7" />
      <circle cx="11.8" cy="12" r="1.7" />
      <circle cx="17.8" cy="16.5" r="1.7" />
    </svg>
  );
}

function DividerGlyph({ orientation }: { orientation: "horizontal" | "vertical" }) {
  const isHorizontal = orientation === "horizontal";

  return (
    <svg aria-hidden viewBox="0 0 24 24" className={isHorizontal ? undefined : "is-vertical"}>
      <circle cx="8" cy="7" r="1.6" />
      <circle cx="16" cy="7" r="1.6" />
      <circle cx="8" cy="12" r="1.6" />
      <circle cx="16" cy="12" r="1.6" />
      <circle cx="8" cy="17" r="1.6" />
      <circle cx="16" cy="17" r="1.6" />
    </svg>
  );
}

const reveal2Dreh: Reveal2Props = {
  badge: { label: "Comparador ativo", variant: "secondary" },
  heading: "A diferença aparece antes do clique.",
  description:
    "A presença digital deixa de ser um conjunto de pistas e passa a funcionar como um sistema: contexto, prova, descoberta e ação conectados em uma experiência só.",
  highlights: [
    {
      id: "clareza",
      icon: <SignalGlyph />,
      title: "Mensagem com direção",
      description: "A oferta deixa de depender de pistas soltas e ganha hierarquia.",
    },
    {
      id: "confianca",
      icon: <ProofGlyph />,
      title: "Confiança visível",
      description: "Provas, contexto e páginas assumem funções claras.",
    },
    {
      id: "descoberta",
      icon: <DiscoveryGlyph />,
      title: "Base para descoberta",
      description: "Conteúdo mais interpretável para busca, clientes e IA.",
    },
    {
      id: "acao",
      icon: <ActionGlyph />,
      title: "Próxima ação evidente",
      description: "O visitante entende onde está e o que fazer em seguida.",
    },
  ],
  beforeImage: {
    src: "/reveal/presence-before.png",
    alt: "Presença digital fragmentada com cartões e canais desconectados.",
  },
  afterImage: {
    src: "/reveal/presence-after.png",
    alt: "Presença digital estruturada com site, módulos conectados e ações claras.",
  },
  beforeLabel: "Antes",
  afterLabel: "Depois",
  showLabels: true,
  orientation: "horizontal",
  initialPosition: 48,
  dividerWidth: 4,
};

const signalPairs = [
  ["Sinais soltos", "Narrativa clara"],
  ["Confiança implícita", "Prova visível"],
  ["Busca confusa", "Contexto legível"],
  ["Ação escondida", "Próximo passo"],
] as const;

function RevealBadge({ badge }: { badge: NonNullable<Reveal2Props["badge"]> }) {
  return (
    <span className={cn("reveal-badge", `reveal-badge-${badge.variant ?? "default"}`)}>
      {badge.label}
    </span>
  );
}

function Reveal2({
  badge,
  heading,
  description,
  highlights = [],
  beforeImage,
  afterImage,
  beforeLabel = "Antes",
  afterLabel = "Depois",
  showLabels = true,
  orientation = "horizontal",
  initialPosition = 50,
  dividerWidth = 4,
  className,
}: Reveal2Props) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const revealStyle = {
    "--reveal-position": `${position}%`,
  } as CSSProperties;

  const isHorizontal = orientation === "horizontal";

  const commitPosition = useCallback((nextPosition: number) => {
    setPosition(Math.max(0, Math.min(100, nextPosition)));
  }, []);

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();

      if (isHorizontal) {
        commitPosition(((clientX - rect.left) / rect.width) * 100);
      } else {
        commitPosition(((clientY - rect.top) / rect.height) * 100);
      }
    },
    [commitPosition, isHorizontal]
  );

  const handlePointerStart = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();
      setIsDragging(true);
      event.currentTarget.setPointerCapture?.(event.pointerId);
      handleMove(event.clientX, event.clientY);
    },
    [handleMove]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const step = event.shiftKey ? 10 : 4;
      const reverse = !isHorizontal && event.key === "ArrowUp";
      const forward =
        (isHorizontal && event.key === "ArrowRight") ||
        (!isHorizontal && event.key === "ArrowDown");
      const backward =
        (isHorizontal && event.key === "ArrowLeft") || reverse;

      if (forward || backward) {
        event.preventDefault();
        commitPosition(position + (forward ? step : -step));
      }

      if (event.key === "Home") {
        event.preventDefault();
        commitPosition(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        commitPosition(100);
      }
    },
    [commitPosition, isHorizontal, position]
  );

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (isDragging) {
        handleMove(event.clientX, event.clientY);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handleEnd);
      document.addEventListener("pointercancel", handleEnd);
    }

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handleEnd);
      document.removeEventListener("pointercancel", handleEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <section className={cn("reveal2", className)} id="demonstracao">
      <div className="reveal2-grid">
        <div className="reveal2-copy">
          {badge && <RevealBadge badge={badge} />}

          {heading && <h3>{heading}</h3>}

          {description && <p className="reveal2-description">{description}</p>}

          {highlights.length > 0 && (
            <div className="reveal2-highlights">
              {highlights.slice(0, 6).map((highlight) => (
                <div className="reveal2-highlight" key={highlight.id}>
                  <span>{highlight.icon || <SignalGlyph />}</span>
                  <div>
                    <p>{highlight.title}</p>
                    {highlight.description && <small>{highlight.description}</small>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="reveal2-slider-shell" style={revealStyle}>
          <div className="reveal2-console">
            <div>
              <span>Leitura da presença</span>
              <strong>{Math.round(position)}%</strong>
            </div>
            <p>Arraste para revelar como estratégia muda a percepção.</p>
            <div className="reveal2-meter" aria-hidden>
              <i />
            </div>
          </div>

          <div
            ref={containerRef}
            role="slider"
            aria-label="Comparação antes e depois da presença digital"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            aria-valuetext={`${Math.round(position)}% revelado`}
            tabIndex={0}
            className={cn(
              "reveal2-slider",
              isDragging && "is-dragging",
              !isHorizontal && "is-vertical"
            )}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerStart}
          >
            <div className="reveal2-layer reveal2-after">
              {afterImage?.src ? (
                <Image
                  src={afterImage.src}
                  alt={afterImage.alt}
                  fill
                  sizes="(max-width: 1050px) 100vw, 58vw"
                  draggable={false}
                />
              ) : (
                <div className="reveal2-placeholder">{afterLabel} imagem</div>
              )}
            </div>

            <div
              className="reveal2-layer reveal2-before"
              style={{
                clipPath: isHorizontal
                  ? `inset(0 ${100 - position}% 0 0)`
                  : `inset(0 0 ${100 - position}% 0)`,
              }}
            >
              {beforeImage?.src ? (
                <Image
                  src={beforeImage.src}
                  alt={beforeImage.alt}
                  fill
                  sizes="(max-width: 1050px) 100vw, 58vw"
                  draggable={false}
                />
              ) : (
                <div className="reveal2-placeholder">{beforeLabel} imagem</div>
              )}
            </div>

            <div
              className="reveal2-divider"
              style={{
                [isHorizontal ? "left" : "top"]: `${position}%`,
                [isHorizontal ? "width" : "height"]: `${dividerWidth}px`,
              }}
            >
              <div className="reveal2-handle">
                <DividerGlyph orientation={orientation} />
              </div>
            </div>

            {showLabels && (
              <>
                <span className="reveal2-label reveal2-label-before">{beforeLabel}</span>
                <span className="reveal2-label reveal2-label-after">{afterLabel}</span>
              </>
            )}
          </div>

          <div className="reveal2-signal-grid" aria-label="Resumo da transformação">
            {signalPairs.map(([before, after], index) => (
              <div key={before}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{before}</p>
                <strong>{after}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PresenceComparison() {
  return <Reveal2 {...reveal2Dreh} />;
}
