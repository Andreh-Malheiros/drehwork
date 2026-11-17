// Dados e funções das páginas indexáveis da Pqueninos (produto, categoria e sitemap). Fonte dos produtos: pqueninos-catalogo.ts.
import { produtos, type Produto } from "@/content/clientes/pqueninos-catalogo";

export const SITE = "https://pqueninos.com.br";
export const BASE = "/clientes/pqueninos";
export const WA = "5531994381792";
export const SEO_LASTMOD = "2026-11-17";

export const CATEGORIAS = [
  { id: "kits", nome: "Kits em caixa para batizado", h1: "Kits e caixas de lembrança para batizado", sub: "Caixas em MDF com pintura manual ou revestidas em tecido, feitas à mão em Belo Horizonte.", cover: "13-01" },
  { id: "velas", nome: "Velas personalizadas", h1: "Velas personalizadas para batizado e Eucaristia", sub: "Velas de cera 100% vegetal, no potinho ou no copo, com a mensagem da sua ocasião.", cover: "05-01" },
  { id: "lembrancinhas", nome: "Lembrancinhas de batizado", h1: "Lembrancinhas de batizado artesanais", sub: "Divino Espírito Santo, anjinho de acrílico, porta água benta e marcadores de páginas.", cover: "01-01" },
  { id: "toalhas", nome: "Toalhas de lavabo bordadas", h1: "Toalhas de lavabo bordadas", sub: "Toalhas de lavabo bordadas, entregues com embalagem para presente.", cover: "38-01" },
  { id: "eucaristia", nome: "Lembranças de Eucaristia e Crisma", h1: "Lembranças de Primeira Eucaristia e Crisma", sub: "Velas, marcadores de páginas e Divino com ímã para Primeira Eucaristia e Crisma.", cover: "03-01" },
  { id: "personalizados", nome: "Kits personalizados", h1: "Kits personalizados sob encomenda", sub: "Monte o kit do seu jeito: o orçamento é feito pelo WhatsApp.", cover: "27-01" },
] as const;

const pad = (n: number) => String(n).padStart(2, "0");
export const slugify = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const slugOf = (p: Produto) => `${slugify(p.nome)}-${p.n}`;
export const bySlug = (slug: string) => produtos.find(p => slugOf(p) === slug);
export const imgOf = (p: Produto, k = 1) => `${BASE}/p/${pad(p.n)}-${pad(k)}.webp`;
export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const waLink = (t: string) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
export const produtoUrl = (p: Produto) => `/produto/${slugOf(p)}`;
export const categoriaUrl = (id: string) => `/categoria/${id}`;
export const doCat = (id: string) => produtos.filter(p => p.cat === id);
