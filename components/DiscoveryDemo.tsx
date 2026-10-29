"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

const CYCLE_MS = 7000;

const channels = [
  {
    id: "google",
    label: "Google",
    notes: [
      "Título e descrição escritos para quem está buscando, não genéricos.",
      "Avaliações e dados da empresa marcados para o Google ler.",
      "Uma página por serviço, que aparece como atalho no resultado.",
    ],
  },
  {
    id: "maps",
    label: "Maps",
    notes: [
      "Perfil da Empresa completo: nome, categoria e avaliações.",
      "Site ligado ao perfil, com as mesmas informações nos dois lugares.",
      "Horário e telefone certos, para o cliente ligar ou ir até a loja.",
    ],
  },
  {
    id: "ia",
    label: "Assistente de IA",
    notes: [
      "Textos claros sobre o que a empresa faz, onde e para quem.",
      "Informações consistentes que a IA consegue confirmar e citar.",
      "Um arquivo de contexto (llms.txt) que resume a empresa para essas ferramentas.",
    ],
  },
] as const;

const query = "bolo de aniversário sob encomenda bh";
const answer = "Uma opção bem avaliada é a Confeitaria Exemplo, no bairro Savassi. Ela faz bolos de casamento sob encomenda, atende todos os dias e recebe pedidos de orçamento pelo WhatsApp.";

/** Types `text` once `run` is true (panels remount on every cycle, so it starts empty); returns the visible part. Shows everything at once when motion is reduced. */
function useTyping(text: string, run: boolean, speed: number) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!run) return;
    const step = matchMedia("(prefers-reduced-motion: reduce)").matches ? text.length : 1;
    const timer = setInterval(() => {
      setCount(current => {
        const next = Math.min(current + step, text.length);
        if (next >= text.length) clearInterval(timer);
        return next;
      });
    }, speed);
    return () => clearInterval(timer);
  }, [text, run, speed]);
  return text.slice(0, count);
}

const Pin = ({ n }: { n: number }) => <b className="found-pin" aria-hidden>{n}</b>;

function GooglePanel({ active }: { active: boolean }) {
  const typed = useTyping(query, active, 45);
  return <div className="found-google">
    <div className="found-searchbar"><svg viewBox="0 0 24 24" aria-hidden><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg><span>{typed}<i className="found-caret" /></span></div>
    <div className="found-results">
      <article className="found-result is-ours">
        <p className="found-url"><span className="found-favicon" />seusite.com.br <small>› bolos-de-aniversario</small></p>
        <h4>Bolos de aniversário sob encomenda em BH | Confeitaria Exemplo <Pin n={1} /></h4>
        <p className="found-rating"><span aria-hidden>★★★★★</span> 4,9 · 128 avaliações <Pin n={2} /></p>
        <p>Bolos personalizados para aniversário, com retirada na Savassi ou entrega em BH. Peça seu orçamento pelo WhatsApp.</p>
        <ul className="found-sitelinks"><li>Bolos de casamento</li><li>Cardápio</li><li>Pedir orçamento</li><Pin n={3} /></ul>
      </article>
      <div className="found-result is-other" aria-hidden><i /><i /><i /></div>
      <div className="found-result is-other" aria-hidden><i /><i /><i /></div>
    </div>
  </div>;
}

function MapsPanel() {
  return <div className="found-maps">
    <div className="found-map" aria-hidden>
      <span className="found-road is-a" /><span className="found-road is-b" /><span className="found-road is-c" />
      <i className="found-marker" style={{ left: "18%", top: "30%" }} />
      <i className="found-marker" style={{ left: "72%", top: "22%" }} />
      <i className="found-marker" style={{ left: "64%", top: "70%" }} />
      <i className="found-marker is-ours" style={{ left: "44%", top: "44%" }} />
    </div>
    <div className="found-place">
      <div className="found-place-photo" aria-hidden />
      <div className="found-place-body">
        <h4>Confeitaria Exemplo <Pin n={1} /></h4>
        <p className="found-rating"><span aria-hidden>★★★★★</span> 4,9 · Confeitaria</p>
        <p className="found-open"><b>Aberto</b> · Atende todos os dias <Pin n={3} /></p>
        <ul className="found-actions"><li>Rotas</li><li>Ligar</li><li className="is-site">Site <Pin n={2} /></li></ul>
      </div>
    </div>
  </div>;
}

function AssistantPanel({ active }: { active: boolean }) {
  const typed = useTyping(answer, active, 22);
  const done = typed.length === answer.length;
  return <div className="found-ai">
    <p className="found-ask">Onde encomendar bolo de casamento em BH?</p>
    <div className="found-reply">
      <span className="found-ai-mark" aria-hidden />
      <div>
        <p>{typed}{!done && <i className="found-caret" />} <Pin n={1} /></p>
        <p className="found-sources" data-show={done}><span>Fontes</span><b>seusite.com.br <Pin n={2} /></b><b>Perfil no Google</b><b>llms.txt <Pin n={3} /></b></p>
      </div>
    </div>
    <p className="found-input" aria-hidden><span>Pergunte qualquer coisa</span><i /></p>
  </div>;
}

/** "SEO, busca e IA": the same fictional business as it appears on Google, Maps and an AI assistant, with what was done to get there. */
export function DiscoveryDemo() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Advance on its own while on screen, unless the visitor is interacting or prefers less motion.
  const autoplay = visible && !paused;
  useEffect(() => {
    if (!autoplay || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => { setActive(index => (index + 1) % channels.length); setCycle(c => c + 1); }, CYCLE_MS);
    return () => clearTimeout(timer);
  }, [autoplay, active, cycle]);

  const select = (index: number) => { setActive(index); setCycle(c => c + 1); };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (active + step + channels.length) % channels.length;
    select(next);
    tabs.current[next]?.focus();
  };

  const channel = channels[active];
  return <div
    className="found"
    ref={root}
    data-autoplay={autoplay}
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocus={() => setPaused(true)}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
  >
    <div className="found-tabs" role="tablist" aria-label="Onde o cliente procura" onKeyDown={onKeyDown}>
      {channels.map((item, index) => <button
        key={item.id}
        ref={node => { tabs.current[index] = node; }}
        type="button"
        role="tab"
        id={`found-tab-${item.id}`}
        aria-selected={index === active}
        aria-controls="found-panel"
        tabIndex={index === active ? 0 : -1}
        onClick={() => select(index)}
      >
        {item.label}
        {index === active && <span className="found-progress" key={cycle} aria-hidden />}
      </button>)}
    </div>

    <div className="found-window" id="found-panel" role="tabpanel" aria-labelledby={`found-tab-${channel.id}`}>
      <div className="found-screen" key={`${channel.id}-${cycle}`} data-channel={channel.id}>
        {channel.id === "google" && <GooglePanel active={visible} />}
        {channel.id === "maps" && <MapsPanel />}
        {channel.id === "ia" && <AssistantPanel active={visible} />}
      </div>
      <ol className="found-notes" key={`notes-${channel.id}`}>
        {channel.notes.map(note => <li key={note}>{note}</li>)}
      </ol>
    </div>
    <p className="found-caption">Exemplo ilustrativo de uma empresa fictícia. Posição no Google não pode ser garantida por ninguém; o trabalho é deixar a empresa pronta para ser encontrada.</p>
  </div>;
}
