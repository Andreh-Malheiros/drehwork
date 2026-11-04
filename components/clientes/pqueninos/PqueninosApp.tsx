"use client";
/* eslint-disable @next/next/no-img-element -- fotos já otimizadas em WebP 760px; o vidro e o recorte da transição precisam do <img> simples. */

import { AnimatePresence, motion } from "motion/react";
import { flushSync } from "react-dom";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { avaliacoes, instagramPosts, modelos, produtos, type Produto } from "@/content/clientes/pqueninos-catalogo";
import { ICONS } from "./icons";

/* ===== dados fixos (verificados com o Andreh em 30/10/2026) ===== */
const BASE = "/clientes/pqueninos";
const WA = "5531994381792";
const MAPS = "https://www.google.com/maps/search/?api=1&query=Pqueninos+Lembran%C3%A7as+R.+Carangola+94+Belo+Horizonte";
const IG = "https://www.instagram.com/pqueninos/";
const DREH = "https://www.drehwork.com/?utm_source=pqueninos&utm_medium=assinatura";
const CATS = [
  { id: "kits", nome: "Kits em caixa", cover: "13-01", sub: "Caixas em MDF com pintura manual ou revestidas em tecido." },
  { id: "velas", nome: "Velas", cover: "05-01", sub: "Cera 100% vegetal, no potinho ou no copo." },
  { id: "lembrancinhas", nome: "Lembrancinhas", cover: "01-01", sub: "Divino, anjinho, porta água benta e marcadores." },
  { id: "toalhas", nome: "Toalhas bordadas", cover: "38-01", sub: "Toalhas de lavabo bordadas com embalagem." },
  { id: "eucaristia", nome: "Eucaristia e Crisma", cover: "03-01", sub: "Lembranças para Primeira Eucaristia e Crisma." },
  { id: "personalizados", nome: "Personalizados", cover: "27-01", sub: "Do seu jeito, com orçamento pelo WhatsApp." },
] as const;
const TAM: Record<"p" | "m" | "g", [string, string]> = { p: ["Pequeno", "8 a 9 cm"], m: ["Médio", "12 cm"], g: ["Grande", "15 a 20 cm"] };
const DESTAQUES = [13, 7, 1, 38, 2, 49];
const COVER: Record<number, number> = { 18: 2 };
const NOVIDADE = new Set([2]);
const OCASIOES = ["", "Batizado", "Primeira Eucaristia", "Crisma", "Padrinhos e madrinhas", "Anúncio de gravidez", "Chá revelação", "Casamento", "Outra"];
const AVC = ["#56C3BF", "#F09C90", "#9AA6DA", "#E3A445", "#7DB57C", "#C88BB8"];
const P: Record<number, Produto> = Object.fromEntries(produtos.map(p => [p.n, p]));

/* ===== utilitários ===== */
const pad = (n: number) => String(n).padStart(2, "0");
const img = (n: number, k = 1) => `${BASE}/p/${pad(n)}-${pad(k)}.webp`;
const cover = (p: Produto) => img(p.n, COVER[p.n] || 1);
const brl = (v: number | null) => (v == null ? "Sob consulta" : v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));
const waLink = (t: string) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const store = {
  get<T>(k: string, d: T): T { try { const v = localStorage.getItem("pq:" + k); return v == null ? d : (JSON.parse(v) as T); } catch { return d; } },
  set(k: string, v: unknown) { try { localStorage.setItem("pq:" + k, JSON.stringify(v)); } catch { /* armazenamento indisponível: segue sem lembrar */ } },
};

function Icon({ name, className = "i" }: { name: string; className?: string }) {
  // Conteúdo vem de icons.ts (SVG local), nunca de entrada do usuário.
  return <span className="ico" aria-hidden dangerouslySetInnerHTML={{ __html: (ICONS[name] || "").replace("<svg ", `<svg class="${className}" `) }} />;
}
const Stars = ({ n = 5 }: { n?: number }) => <span className="st" aria-label={`${n} estrelas`}>{Array.from({ length: n }, (_, i) => <Icon key={i} name="star" />)}</span>;

/* ===== rotas por hash ===== */
type Route = { name: "inicio" | "categoria" | "produto" | "sacolinha" | "como-encomendar" | "avaliacoes" | "instagram"; id?: string; n?: number };
const ORDER: Record<Route["name"], number> = { inicio: 0, categoria: 1, "como-encomendar": 1, avaliacoes: 1, instagram: 1, produto: 2, sacolinha: 3 };
function parse(h: string): Route {
  h = h.replace(/^#/, "");
  let m = h.match(/^categoria-([a-z]+)$/);
  if (m && CATS.some(c => c.id === m![1])) return { name: "categoria", id: m[1] };
  m = h.match(/^produto-(\d+)$/);
  if (m && P[+m[1]]) return { name: "produto", n: +m[1] };
  if (["sacolinha", "como-encomendar", "avaliacoes", "instagram"].includes(h)) return { name: h as Route["name"] };
  return { name: "inicio" };
}
const keyOf = (r: Route) => r.name + (r.id || "") + (r.n || "");
const hashOf = (r: Route) => (r.name === "categoria" ? `categoria-${r.id}` : r.name === "produto" ? `produto-${r.n}` : r.name);
function titleFor(r: Route) {
  if (r.name === "produto" && r.n) return `${P[r.n].nome} · Pqueninos Lembranças`;
  if (r.name === "categoria") return `${CATS.find(c => c.id === r.id)?.nome} · Pqueninos Lembranças`;
  return "Pqueninos Lembranças · Lembranças artesanais em BH";
}

/* ===== transição em faixas (escolhida pelo Andreh em 02/11, inspirada na abertura do drehwork.com) =====
   Faixas na paleta da marca descem e cobrem a tela, a tela nova monta por baixo e as faixas sobem; ao voltar, o movimento se inverte.
   Desempenho: só transform é animado (roda na GPU). A tela nova é montada enquanto está coberta e só é revelada depois que as
   primeiras fotos estão decodificadas, então o trabalho pesado não aparece. */
type Dir = "fwd" | "bwd";
type Ctx = { dir: Dir };
const EASE = [0.32, 0.72, 0, 1] as const;
const BANDS = 5;
const wait = (ms: number) => new Promise<void>(r => window.setTimeout(r, ms));
const frame = () => new Promise<void>(r => requestAnimationFrame(() => r()));
function play(el: Element, from: string, to: string, opt: KeyframeAnimationOptions) {
  return el.animate([{ transform: from }, { transform: to }], { fill: "forwards", ...opt }).finished;
}
/** Fase 1: as faixas descem (ou sobem, ao voltar) e cobrem a tela, uma após a outra. */
async function coverUp(root: HTMLElement, dir: Dir) {
  const els = Array.from(root.children), order = dir === "fwd" ? els : [...els].reverse(), off = dir === "fwd" ? "-101%" : "101%";
  await Promise.all(order.map((el, i) => play(el, `translate3d(0,${off},0)`, "translate3d(0,0,0)", { duration: 340, delay: i * 34, easing: "cubic-bezier(.76,0,.24,1)" })));
}
/** Fase 2: as faixas voltam por onde vieram e revelam a tela nova. */
async function reveal(root: HTMLElement, dir: Dir) {
  const els = Array.from(root.children), order = dir === "fwd" ? els : [...els].reverse(), off = dir === "fwd" ? "-101%" : "101%";
  await Promise.all(order.map((el, i) => play(el, "translate3d(0,0,0)", `translate3d(0,${off},0)`, { duration: 420, delay: i * 38, easing: "cubic-bezier(.76,0,.24,1)" })));
  els.forEach(el => el.getAnimations().forEach(a => a.cancel()));
}
/** Espera as fotos visíveis da tela nova ficarem prontas (com limite), para ela já aparecer inteira. */
async function screenReady(app: HTMLElement) {
  const h = app.clientHeight;
  const imgs = Array.from(app.querySelectorAll<HTMLImageElement>(".screen img")).filter(i => i.getBoundingClientRect().top < h).slice(0, 8);
  await Promise.race([Promise.all(imgs.map(i => i.decode().catch(() => undefined))), wait(260)]);
  await frame(); await frame();
}

type Bag = Record<string, number>;

export function PqueninosApp() {
  // Montado só no navegador (ClientOnly), então pode ler endereço e armazenamento local já no estado inicial.
  const [route, setRoute] = useState<Route>(() => parse(location.hash));
  const [ctx, setCtx] = useState<Ctx>({ dir: "fwd" });
  const [bag, setBag] = useState<Bag>(() => store.get<Bag>("sacolinha", {}));
  const [pop, setPop] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ list: string[]; start: number } | null>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const pending = useRef<{ next: Route; dir: Dir } | null>(null);
  const stack = useRef<string[]>([hashOf(route)]);
  const scrollMem = useRef<Record<string, number>>({});
  const routeRef = useRef(route);

  useEffect(() => { routeRef.current = route; document.title = titleFor(route); }, [route]);

  const show = useCallback((next: Route, dir: Dir) => { flushSync(() => { setCtx({ dir }); setRoute(next); }); }, []);

  const transition = useCallback(async (next: Route, dir: Dir) => {
    const app = appRef.current, curtain = curtainRef.current;
    if (!app || !curtain || matchMedia("(prefers-reduced-motion: reduce)").matches) { show(next, dir); return; }
    if (busy.current) { pending.current = { next, dir }; return; }
    // Pega a troca pedida enquanto a animação rodava (ex.: voltar do navegador), se houver.
    const take = () => { const p = pending.current; pending.current = null; return p; };
    busy.current = true; app.dataset.moving = "";
    try {
      let job: { next: Route; dir: Dir } | null = { next, dir };
      while (job) {
        await coverUp(curtain, job.dir);
        show(job.next, job.dir);
        await screenReady(app);
        // Pedidos que chegaram enquanto cobria: mostra o mais recente ainda por baixo da cortina.
        for (let p = take(); p; p = take()) { job = p; show(p.next, p.dir); await screenReady(app); }
        await reveal(curtain, job.dir);
        // Pedido que chegou durante a revelação: roda outra transição completa.
        job = take();
      }
    } finally { busy.current = false; delete app.dataset.moving; }
  }, [show]);

  useEffect(() => {
    const onHash = () => {
      const h = location.hash.replace(/^#/, "") || "inicio";
      const next = parse(h), cur = routeRef.current, s = stack.current;
      let dir: Dir;
      if (s.length > 1 && s[s.length - 2] === h) { s.pop(); dir = "bwd"; }
      else { dir = ORDER[next.name] < ORDER[cur.name] || h === "inicio" ? "bwd" : "fwd"; if (h === "inicio") s.length = 0; s.push(h); }
      void transition(next, dir);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [transition]);

  const go = useCallback((h: string) => { if ((location.hash.replace(/^#/, "") || "inicio") !== h) location.hash = h; }, []);
  const back = useCallback((fallback: string) => { if (stack.current.length > 1) history.back(); else location.replace("#" + fallback); }, []);

  // Sempre a partir do estado mais recente: toques seguidos ou mudanças durante a animação não se sobrescrevem.
  const saveBag = useCallback((change: (b: Bag) => Bag) => { setBag(prev => { const b = change(prev); store.set("sacolinha", b); return b; }); }, []);
  const bumpBag = useCallback(() => setPop(x => x + 1), []);
  const toastTimer = useRef<number | undefined>(undefined);
  const say = useCallback((t: string) => { setToast(t); window.clearTimeout(toastTimer.current); toastTimer.current = window.setTimeout(() => setToast(null), 2100); }, []);

  const flyToBag = useCallback((src: HTMLImageElement | null, done: () => void) => {
    const target = navRef.current?.querySelector('[data-nav="sacolinha"]');
    if (!src || !target || matchMedia("(prefers-reduced-motion: reduce)").matches) { done(); return; }
    const a = src.getBoundingClientRect(), b = target.getBoundingClientRect();
    const f = document.createElement("img"); f.src = src.currentSrc || src.src; f.className = "fly"; document.body.appendChild(f);
    const sx = a.left + a.width / 2 - 23, sy = a.top + a.height / 2 - 23, ex = b.left + b.width / 2 - 23, ey = b.top + b.height / 2 - 23;
    f.animate([
      { transform: `translate(${sx}px,${sy}px) scale(2.4) rotate(0)`, opacity: 1 },
      { transform: `translate(${(sx + ex) / 2 + 30}px,${Math.min(sy, ey) - 60}px) scale(1.3) rotate(-10deg)`, opacity: 1, offset: 0.5 },
      { transform: `translate(${ex}px,${ey}px) scale(.35) rotate(8deg)`, opacity: 0.3 },
    ], { duration: 720, easing: "cubic-bezier(.5,0,.3,1)" }).onfinish = () => { f.remove(); done(); };
  }, []);

  const count = Object.keys(bag).filter(n => P[+n]).length;
  const k = keyOf(route);
  const api = { go, back, bag, saveBag, bumpBag, say, flyToBag, openModelos: setLightbox };

  return <>
    <div className="app" ref={appRef}>
      <Screen key={k} id={k} ctx={ctx} mem={scrollMem}><View route={route} api={api} /></Screen>
      <div ref={curtainRef} className="curtain" aria-hidden>{Array.from({ length: BANDS }, (_, i) => <i key={i} />)}</div>
    </div>
    <nav className="nav" ref={navRef} aria-label="Navegação principal">
      <a href="#inicio" className={route.name === "inicio" ? "on" : ""} data-go="inicio" onClick={e => { e.preventDefault(); go("inicio"); }}><Icon name="house" />Início</a>
      <a href="#sacolinha" data-nav="sacolinha" className={route.name === "sacolinha" ? "on" : ""} data-go="sacolinha" aria-label={`Sacolinha${count ? `, ${count} itens` : ""}`} onClick={e => { e.preventDefault(); go("sacolinha"); }}>
        <Icon name="gift" />Sacolinha{count > 0 && <span key={pop} className={`count ${pop ? "pop" : ""}`}>{count}</span>}
      </a>
      <a className="wa" href={waLink("Olá, Steh! Vim pelo site da Pqueninos e gostaria de mais informações.")} target="_blank" rel="noopener"><Icon name="b-wa-mono" />WhatsApp</a>
    </nav>
    <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">{toast && <><Icon name="gift" />{toast}</>}</div>
    {lightbox != null && <Lightbox list={lightbox.list} start={lightbox.start} onClose={() => setLightbox(null)} />}
  </>;
}

/** Uma tela com rolagem própria; guarda a posição ao sair e a devolve quando se volta a ela. */
function Screen({ id, ctx, mem, children }: { id: string; ctx: Ctx; mem: RefObject<Record<string, number>>; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [backward] = useState(ctx.dir === "bwd");
  useLayoutEffect(() => {
    const el = ref.current, saved = mem.current;
    if (el) el.scrollTop = backward ? saved[id] || 0 : 0;
    return () => { if (el) saved[id] = el.scrollTop; };
  }, [backward, id, mem]);
  return <main ref={ref} className="screen">{children}</main>;
}

type Api = {
  go: (h: string) => void; back: (f: string) => void; bag: Bag; saveBag: (change: (b: Bag) => Bag) => void; bumpBag: () => void;
  say: (t: string) => void; flyToBag: (src: HTMLImageElement | null, done: () => void) => void; openModelos: (m: { list: string[]; start: number }) => void;
};

function View({ route, api }: { route: Route; api: Api }) {
  if (route.name === "categoria" && route.id) return <Categoria id={route.id} api={api} />;
  if (route.name === "produto" && route.n) return <ProdutoView p={P[route.n]} api={api} />;
  if (route.name === "sacolinha") return <Sacolinha api={api} />;
  if (route.name === "como-encomendar") return <Como api={api} />;
  if (route.name === "avaliacoes") return <Avaliacoes api={api} />;
  if (route.name === "instagram") return <Instagram api={api} />;
  return <Inicio api={api} />;
}

const Bar = ({ to, label, api }: { to: string; label: string; api: Api }) =>
  <div className="bar"><button className="back" data-back={to} onClick={() => api.back(to)}><Icon name="caret-left" />{label}</button></div>;

const Foot = () => <footer className="foot">
  <p className="copy">© {new Date().getFullYear()} Pqueninos Lembranças<br />Ibirité e Belo Horizonte, MG</p>
  <a className="dw" href={DREH} target="_blank" rel="noopener" aria-label="Desenvolvido por DrehWork, Tecnologia e Soluções Digitais">
    <span className="l">Desenvolvido por</span><span className="w">DrehWork</span><span className="go"><Icon name="arrow-up-right" /></span>
  </a>
</footer>;

function Card({ p, api }: { p: Produto; api: Api }) {
  return <button className="pcard" data-go={`produto-${p.n}`} onClick={() => api.go(`produto-${p.n}`)}>
    <div className="ph">{NOVIDADE.has(p.n) && <span className="badge">Novidade</span>}<img src={cover(p)} alt={p.nome} loading="lazy" decoding="async" /></div>
    <span className="nm">{p.nome}</span>
    <span className={`price ${p.preco == null ? "soft" : ""}`}>{brl(p.preco)}</span>
  </button>;
}

function Inicio({ api }: { api: Api }) {
  const cnt = (id: string) => produtos.filter(p => p.cat === id).length;
  return <>
    <header className="brand"><div className="lg"><img src={`${BASE}/logo.webp`} alt="Logo Pqueninos Lembranças" /></div><div><h1>Pqueninos Lembranças</h1>
      <div className="rating"><Stars /><b>5,0</b> no Google</div></div></header>
    <p className="hello"><b>Aqui, cada detalhe é feito com amor.</b> Lembranças 100% artesanais para batizado, Eucaristia e momentos especiais. Retiradas agendadas em Belo Horizonte ou Ibirité. Envio para todo o Brasil.</p>
    <nav className="short" aria-label="Atalhos">
      <button className="h" data-go="avaliacoes" onClick={() => api.go("avaliacoes")}><span className="ic"><Icon name="star" /></span>Avaliações<small>5,0 no Google</small></button>
      <a className="g" href={MAPS} target="_blank" rel="noopener"><span className="ic"><Icon name="b-google-icon" /></span>Google<small>ver perfil</small></a>
      <a className="ig" href={IG} target="_blank" rel="noopener"><span className="ic"><Icon name="b-instagram-icon" /></span>Instagram<small>@pqueninos</small></a>
      <button className="m" data-go="como-encomendar" onClick={() => api.go("como-encomendar")}><span className="ic"><Icon name="clipboard-text" /></span>Como pedir<small>passo a passo</small></button>
    </nav>
    <section className="bento" aria-label="Categorias">
      {CATS.map(c => <button key={c.id} className={`tile t-${c.id}`} data-go={`categoria-${c.id}`} onClick={() => api.go(`categoria-${c.id}`)}>
        <img src={`${BASE}/p/${c.cover}.webp`} alt="" fetchPriority={c.id === "kits" ? "high" : undefined} />
        {c.id === "personalizados"
          ? <span><Icon name="hand-heart" /><span style={{ padding: 0 }}>{c.nome}<small>Monte do seu jeito, com orçamento</small></span></span>
          : <span>{c.nome}<small>{cnt(c.id)} {cnt(c.id) === 1 ? "opção" : "opções"}</small></span>}
      </button>)}
    </section>
    <section><div className="sec-h"><div><span className="kick">feitos à mão</span><h2>Destaques</h2></div><small>arraste ›</small></div>
      <div className="strip">{DESTAQUES.map(n => <Card key={n} p={P[n]} api={api} />)}</div></section>
    <Foot />
  </>;
}

function Categoria({ id, api }: { id: string; api: Api }) {
  const c = CATS.find(c => c.id === id)!;
  const all = useMemo(() => produtos.filter(p => p.cat === id), [id]);
  const [f, setF] = useState<string>(() => (id === "kits" ? store.get("filtro-kits", "todos") : "todos"));
  const opts: [string, string, number][] = [["todos", "Todos", all.length], ...(Object.entries(TAM) as [string, [string, string]][]).map(([k, [n]]) => [k, n, all.filter(p => p.tam === k).length] as [string, string, number])];
  const items = id === "kits" ? (f === "todos" ? all : all.filter(p => p.tam === f)).slice().sort((a, b) => (a.preco ?? 1e9) - (b.preco ?? 1e9)) : all;
  const idx = Math.max(0, opts.findIndex(o => o[0] === f));
  return <>
    <Bar to="inicio" label="Início" api={api} />
    <div className="cat-hero"><img src={`${BASE}/p/${c.cover}.webp`} alt="" /><h1>{c.nome}</h1><p>{c.sub}</p></div>
    {id === "kits" && <>
      <div className="seg" role="group" aria-label="Tamanho da caixa">
        <motion.span className="pill" animate={{ x: `${idx * 100}%` }} transition={{ type: "spring", stiffness: 420, damping: 34 }} />
        {opts.map(([k, n, q]) => <button key={k} aria-pressed={f === k} onClick={() => { setF(k); store.set("filtro-kits", k); }}>{n}<small>{q}</small></button>)}
      </div>
      <p className="seg-hint">Tamanho da caixa: pequeno 8 a 9 cm, médio 12 cm, grande 15 a 20 cm.</p>
    </>}
    <motion.div key={f} className="grid" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }}>
      {items.map(p => <Card key={p.n} p={p} api={api} />)}
    </motion.div>
    <Foot />
  </>;
}

function ProdutoView({ p, api }: { p: Produto; api: Api }) {
  const imgs = useMemo(() => {
    const l = Array.from({ length: p.fotos }, (_, i) => img(p.n, i + 1));
    if (COVER[p.n]) l.unshift(l.splice(COVER[p.n] - 1, 1)[0]);
    return l;
  }, [p]);
  const c = CATS.find(c => c.id === p.cat)!;
  const step = p.min >= 10 ? 5 : 1;
  const [q, setQ] = useState(() => Math.max(store.get("qtd-" + p.n, p.min), p.min));
  const [txt, setTxt] = useState(() => String(q));
  const [cur, setCur] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const clamp = (v: number) => Math.max(p.min, Math.min(9999, Number.isFinite(v) ? v : p.min));
  const setQty = (v: number) => { const x = clamp(v); setQ(x); setTxt(String(x)); store.set("qtd-" + p.n, x); };
  const hasMsg = ["kits", "velas", "lembrancinhas", "eucaristia", "personalizados"].includes(p.cat) || /mensage/i.test(p.info.join(" "));
  const info = p.info.filter(t => !/^Pedido mínimo de \d+ unidades?$/i.test(t));
  const wa = waLink(p.preco == null
    ? `Olá, Steh! Vim pelo site e gostaria de um orçamento de: ${p.nome}. Quantidade aproximada: ${q}.`
    : `Olá, Steh! Vim pelo site e tenho interesse em: ${p.nome}. Quantidade: ${q}. Valor do catálogo: ${brl(p.preco)} (subtotal estimado ${brl(p.preco * q)}).`);
  const goTo = (i: number) => { const t = track.current; if (t) t.scrollTo({ left: ((i + imgs.length) % imgs.length) * t.clientWidth, behavior: "smooth" }); };
  return <>
    <Bar to={`categoria-${p.cat}`} label={c.nome} api={api} />
    <div className="gal">
      <div className="gal-track" ref={track} onScroll={e => { const t = e.currentTarget; setCur(Math.round(t.scrollLeft / t.clientWidth)); }}>
        {imgs.map((s, i) => <img key={s} src={s} alt={`${p.nome}, foto ${i + 1} de ${imgs.length}`} loading={i ? "lazy" : undefined} decoding="async" />)}
      </div>
      {imgs.length > 1 && <>
        <button className="arw prev" aria-label="Foto anterior" onClick={() => goTo(cur - 1)}><Icon name="caret-left" /></button>
        <button className="arw next" aria-label="Próxima foto" onClick={() => goTo(cur + 1)}><Icon name="caret-right" /></button>
        <span className="cnt">{cur + 1}/{imgs.length}</span>
      </>}
    </div>
    {imgs.length > 1 && <div className="dots" aria-hidden>{imgs.map((s, i) => <i key={s} className={i === cur ? "on" : ""} />)}</div>}
    <div className="pinfo">
      <div className="ttl"><h1>{p.nome}</h1><span className={`price lg ${p.preco == null ? "soft" : ""}`}>{brl(p.preco)}{p.preco != null && p.min > 1 && <small>/un.</small>}</span></div>
      <div className="buy">
        <div className="qty-row"><label htmlFor="qtd">Quantidade{p.min > 1 && <span className="min">Pedido mínimo: {p.min} unidades</span>}</label>
          <div className="stepper">
            <button aria-label="Diminuir" disabled={q <= p.min} onClick={() => setQty(q - step)}><Icon name="minus" /></button>
            <input id="qtd" type="number" inputMode="numeric" min={p.min} value={txt} onChange={e => setTxt(e.target.value)} onBlur={() => setQty(parseInt(txt))} />
            <button aria-label="Aumentar" onClick={() => setQty(q + step)}><Icon name="plus" /></button>
          </div></div>
        {p.preco != null && <div className="subtotal"><span>Subtotal estimado</span><b>{brl(p.preco * q)}</b></div>}
        <button className="btn pri" onClick={() => {
          const src = track.current?.querySelector("img") ?? null;
          api.saveBag(b => ({ ...b, [p.n]: (b[p.n] || 0) + q }));
          api.flyToBag(src, api.bumpBag);
          api.say(`${q} ${q > 1 ? "unidades adicionadas" : "unidade adicionada"} à sacolinha`);
        }}><Icon name="gift" />Adicionar à sacolinha</button>
        <a className="btn ghost" target="_blank" rel="noopener" href={wa}><Icon name="b-whatsapp-icon" />{p.preco == null ? "Pedir orçamento no WhatsApp" : "Pedir só este no WhatsApp"}</a>
      </div>
      {hasMsg && <div className="note"><Icon name="heart" /><div>A mensagem interna pode ser personalizada como você desejar. <button onClick={() => api.openModelos({ list: modelosDe(p.cat), start: 0 })}>Ver modelos de mensagem</button></div></div>}
      <h3 className="h3">Detalhes</h3>
      <ul className="details">{info.map(t => <li key={t}><Icon name="check" /><span>{t}</span></li>)}</ul>
      <h3 className="h3">Prazo de produção</h3>
      <ul className="details"><li><Icon name="clock" /><span>De 12 a 18 dias úteis, conforme a agenda e a quantidade, mais o prazo de entrega. Em caso de urgência, verifique a possibilidade de encaixe ou a disponibilidade da agenda.</span></li></ul>
    </div>
    <Foot />
  </>;
}

function Sacolinha({ api }: { api: Api }) {
  const { bag } = api;
  const ids = Object.keys(bag).filter(n => P[+n]);
  const [ev, setEv] = useState(() => store.get("evento", { ocasiao: "", data: "" }));
  const upd = (e: typeof ev) => { setEv(e); store.set("evento", e); };
  if (!ids.length) return <>
    <Bar to="inicio" label="Início" api={api} />
    <div className="empty"><span className="ic"><Icon name="gift" /></span><span className="kick">quase lá</span><h2>Sua sacolinha está vazia</h2>
      <p>Escolha as lembranças e adicione aqui. Depois é só enviar o pedido pelo WhatsApp.</p>
      <button className="btn pri" data-go="inicio" style={{ maxWidth: 260 }} onClick={() => api.go("inicio")}>Ver lembranças</button></div>
  </>;
  let t = 0, consulta = false;
  for (const n of ids) { const p = P[+n]; if (p.preco == null) consulta = true; else t += p.preco * bag[n]; }
  let msg = "Olá, Steh! Vim pelo site e gostaria de fazer este pedido:\n\n";
  for (const n of ids) { const p = P[+n], q = bag[n]; msg += `• ${q}x ${p.nome}${p.preco != null ? ` (${brl(p.preco)} cada, ${brl(p.preco * q)})` : " (valor a consultar)"}\n`; }
  msg += `\nTotal estimado: ${brl(t)}${consulta ? " + itens a consultar" : ""}`;
  if (ev.ocasiao) msg += `\nOcasião: ${ev.ocasiao}`;
  if (ev.data) { const [y, m, d] = ev.data.split("-"); msg += `\nData do evento: ${d}/${m}/${y}`; }
  msg += "\n\nPode me confirmar valores e prazo?";
  const setLine = (n: string, v: number) => { const p = P[+n]; api.saveBag(b => ({ ...b, [n]: Math.max(p.min, Number.isFinite(v) ? v : p.min) })); };
  return <>
    <Bar to="inicio" label="Continuar escolhendo" api={api} />
    <div style={{ margin: "2px 0 12px" }}><span className="kick">seu pedido</span><h1 style={{ fontSize: "1.45rem" }}>Sacolinha</h1></div>
    <AnimatePresence initial={false}>
      {ids.map(n => {
        const p = P[+n], q = bag[n], step = p.min >= 10 ? 5 : 1;
        return <motion.div key={n} className="line" layout exit={{ opacity: 0, x: -40, transition: { duration: 0.25 } }}>
          <img src={cover(p)} alt="" />
          <div style={{ minWidth: 0 }}>
            <div className="top"><span className="nm">{p.nome}</span>
              <button className="rm" aria-label={`Remover ${p.nome}`} onClick={() => { api.saveBag(b => { const r = { ...b }; delete r[n]; return r; }); api.say("Item removido"); }}><Icon name="trash" /></button></div>
            <div className="row">
              <div className="stepper">
                <button aria-label="Diminuir" disabled={q <= p.min} onClick={() => setLine(n, q - step)}><Icon name="minus" /></button>
                <input type="number" inputMode="numeric" min={p.min} defaultValue={q} key={q} aria-label={`Quantidade de ${p.nome}`} onBlur={e => setLine(n, parseInt(e.target.value))} />
                <button aria-label="Aumentar" onClick={() => setLine(n, q + step)}><Icon name="plus" /></button>
              </div>
              <b style={{ fontVariantNumeric: "tabular-nums", fontSize: ".92rem" }}>{p.preco == null ? "A consultar" : brl(p.preco * q)}</b>
            </div>
            {p.min > 1 && <span className="warn">Pedido mínimo: {p.min} unidades</span>}
          </div>
        </motion.div>;
      })}
    </AnimatePresence>
    <div className="sum">
      <div className="total"><span>Total estimado</span><span>{brl(t)}{consulta && <small style={{ fontSize: ".7rem", fontWeight: 700, color: "var(--muted)" }}> + a consultar</small>}</span></div>
      <p className="fine">Valores do catálogo. A Steh confirma tudo pelo WhatsApp. Cartão pelo link de pagamento tem acréscimo.</p>
      <div className="two">
        <div className="field"><label htmlFor="oc">Ocasião</label>
          <select id="oc" value={ev.ocasiao} onChange={e => upd({ ...ev, ocasiao: e.target.value })}>{OCASIOES.map(o => <option key={o} value={o}>{o || "Opcional"}</option>)}</select></div>
        <div className="field"><label htmlFor="dt">Data do evento</label><input id="dt" type="date" value={ev.data} onChange={e => upd({ ...ev, data: e.target.value })} /></div>
      </div>
      <p className="fine">Produção de 12 a 18 dias úteis, mais o prazo de entrega. Em caso de urgência, verifique a possibilidade de encaixe ou a disponibilidade da agenda.</p>
      <a className="btn wa" target="_blank" rel="noopener" href={waLink(msg)}><Icon name="b-wa-mono" />Enviar pedido no WhatsApp</a>
    </div>
    <Foot />
  </>;
}

const MODELOS_CAIXAS = Array.from({ length: modelos["50"] }, (_, i) => img(50, i + 1));
const MODELOS_LEMBRANCAS = [`${BASE}/msg/lembrancinhas.webp`];
/** Mensagens das caixas e kits, ou das lembrancinhas (cartões), conforme a categoria do produto. */
const modelosDe = (cat: string) => ["lembrancinhas", "velas", "eucaristia"].includes(cat) ? MODELOS_LEMBRANCAS : MODELOS_CAIXAS;

function Como({ api }: { api: Api }) {
  return <>
    <Bar to="inicio" label="Início" api={api} />
    <div style={{ marginBottom: 10 }}><span className="kick">passo a passo</span><h1 style={{ fontSize: "1.45rem" }}>Como encomendar</h1></div>
    <p className="hello">Nossos produtos são 100% artesanais. Todas as caixas são em MDF, com pintura manual ou revestidas em tecido, conforme a sua escolha.</p>
    <ol className="steps">
      <li><div><h3>Escolha as lembranças</h3><p>Navegue pelas categorias e adicione à sacolinha, ou peça direto pelo WhatsApp.</p></div></li>
      <li><div><h3>Personalize a mensagem</h3><p>Mensagem pessoal ou um dos nossos modelos. Cores e detalhes podem ser alterados.</p>
        <p className="fine" style={{ margin: "8px 0 4px" }}>Caixas e kits</p>
        <div className="mini">{MODELOS_CAIXAS.map((s, i) => <button key={s} aria-label={`Ver modelo de caixa ${i + 1}`} onClick={() => api.openModelos({ list: MODELOS_CAIXAS, start: i })}><img src={s} alt="" loading="lazy" /></button>)}</div>
        <p className="fine" style={{ margin: "10px 0 4px" }}>Lembrancinhas</p>
        <div className="mini">{MODELOS_LEMBRANCAS.map((s, i) => <button key={s} aria-label="Ver modelos de mensagem das lembrancinhas" style={{ flexBasis: 128, height: 92, background: "#fff" }} onClick={() => api.openModelos({ list: MODELOS_LEMBRANCAS, start: i })}><img src={s} alt="" loading="lazy" style={{ objectFit: "contain" }} /></button>)}</div></div></li>
      <li><div><h3>Pagamento</h3><p>Pix ou cartão (link de pagamento, com acréscimo no valor). A data do pedido é reservada e entra na fila de produção após a confirmação do pagamento.</p></div></li>
      <li><div><h3>Produção e entrega</h3><p>De 12 a 18 dias úteis, conforme a agenda e a quantidade, mais o prazo da transportadora. Retirada ou entrega via Uber. Em caso de urgência, verifique a possibilidade de encaixe ou a disponibilidade da agenda.</p></div></li>
    </ol>
    <div className="place">
      <div className="r"><span><Icon name="clock" /></span><div><b>Atendimento</b><br />Segunda a sexta, das 10h às 17h30</div></div>
      <div className="r"><span><Icon name="truck" /></span><div><b>Retiradas ou envio para todo o Brasil</b><br />Retiradas agendadas em Belo Horizonte ou Ibirité</div></div>
      <div className="r"><span><Icon name="map-pin" /></span><div><b>Santo Antônio, Belo Horizonte</b><br /><a href={MAPS} target="_blank" rel="noopener" className="more">Abrir no Google Maps</a></div></div>
    </div>
    <Foot />
  </>;
}

function Avaliacoes({ api }: { api: Api }) {
  return <>
    <Bar to="inicio" label="Início" api={api} />
    <div style={{ marginBottom: 10 }}><span className="kick">quem já recebeu</span><h1 style={{ fontSize: "1.45rem" }}>Avaliações</h1></div>
    <div className="score"><span className="g"><Icon name="b-google-icon" /></span><span className="n">5,0</span><div><div className="rating" style={{ margin: 0 }}><Stars /></div><p>Nota no Google. Avaliações reais, publicadas no Google Maps.</p></div></div>
    {avaliacoes.map((a, i) => <article key={a.nome} className="rv">
      <div className="who"><span className="av" style={{ background: AVC[i % AVC.length] }}>{a.nome[0]}</span><div><b>{a.nome}</b><small><Stars /> {a.quando}</small></div></div>
      <p>{a.texto}</p>
      {a.texto_truncado && <a className="more" href={MAPS} target="_blank" rel="noopener">Ler completa no Google</a>}
      {a.resposta && <div className="reply"><b>Resposta da Steh:</b> {a.resposta}</div>}
    </article>)}
    <a className="btn ghost" href={MAPS} target="_blank" rel="noopener"><Icon name="b-google-icon" />Ver no Google</a>
    <Foot />
  </>;
}

function Instagram({ api }: { api: Api }) {
  return <>
    <Bar to="inicio" label="Início" api={api} />
    <div style={{ marginBottom: 10 }}><span className="kick">desde 2018</span><h1 style={{ fontSize: "1.45rem" }}>@pqueninos</h1></div>
    <p className="hello">Convites, velas e lembranças afetivas. Ibirité e BH.</p>
    <div className="ig">{instagramPosts.map(p => <a key={p.f} href={p.href} target="_blank" rel="noopener"><img src={`${BASE}/ig/${p.f}`} alt="Post da Pqueninos no Instagram" loading="lazy" /></a>)}</div>
    <a className="btn pri" href={IG} target="_blank" rel="noopener" style={{ marginTop: 14 }}><Icon name="b-instagram-icon" />Seguir @pqueninos</a>
    <Foot />
  </>;
}

function Lightbox({ list, start, onClose }: { list: string[]; start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }; document.addEventListener("keydown", k); return () => document.removeEventListener("keydown", k); }, [onClose]);
  const mv = (d: number) => setI(x => (x + d + list.length) % list.length);
  return <div className="lb" role="dialog" aria-label="Modelos de mensagem" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <img src={list[i]} alt={list.length > 1 ? `Modelo de mensagem ${i + 1} de ${list.length}` : "Modelos de mensagem"} />
    {list.length > 1 && <div style={{ color: "#fff", fontWeight: 700, fontSize: ".85rem" }}>{i + 1} de {list.length}</div>}
    <div className="ctl">{list.length > 1 && <button onClick={() => mv(-1)}>Anterior</button>}<button onClick={onClose}>Fechar</button>{list.length > 1 && <button onClick={() => mv(1)}>Próximo</button>}</div>
  </div>;
}
