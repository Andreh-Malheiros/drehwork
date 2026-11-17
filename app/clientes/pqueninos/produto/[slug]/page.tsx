/* eslint-disable @next/next/no-img-element -- fotos já otimizadas em WebP 750x1000. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { produtos } from "@/content/clientes/pqueninos-catalogo";
import { CATEGORIAS, SITE, bySlug, brl, categoriaUrl, imgOf, produtoUrl, slugOf, waLink } from "@/content/clientes/pqueninos-seo";
import { SeoShell } from "@/components/clientes/pqueninos/SeoShell";

export const dynamicParams = false;
export const generateStaticParams = () => produtos.map(p => ({ slug: slugOf(p) }));

const resumo = (p: NonNullable<ReturnType<typeof bySlug>>) => `${p.info[0] ?? p.nome}${p.preco != null ? `. ${brl(p.preco)}` : ""}. Artesanal, de Belo Horizonte, com envio para todo o Brasil.`.slice(0, 300);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = bySlug((await params).slug);
  if (!p) return {};
  const title = `${p.nome} | Pqueninos Lembranças`;
  const description = resumo(p).slice(0, 158);
  return {
    title, description,
    alternates: { canonical: `${SITE}${produtoUrl(p)}` },
    openGraph: { type: "website", locale: "pt_BR", siteName: "Pqueninos Lembranças", title, description, url: `${SITE}${produtoUrl(p)}`, images: [{ url: imgOf(p), width: 750, height: 1000, alt: p.nome }] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = bySlug((await params).slug);
  if (!p) notFound();
  const cat = CATEGORIAS.find(c => c.id === p.cat);
  const fotos = Array.from({ length: Math.min(p.fotos, 5) }, (_, i) => i + 1);
  const msg = `Olá, Steh! Vim pelo site da Pqueninos e gostaria de ${p.preco == null ? "um orçamento de" : "pedir"}: ${p.nome}.`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.nome,
    description: p.info.join(". "),
    image: fotos.map(k => `${SITE}${imgOf(p, k)}`),
    brand: { "@type": "Brand", name: "Pqueninos Lembranças" },
    ...(p.preco != null ? { offers: { "@type": "Offer", url: `${SITE}${produtoUrl(p)}`, priceCurrency: "BRL", price: p.preco.toFixed(2), seller: { "@type": "Organization", name: "Pqueninos Lembranças" } } } : {}),
  };
  const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
    ...(cat ? [{ "@type": "ListItem", position: 2, name: cat.nome, item: `${SITE}${categoriaUrl(cat.id)}` }] : []),
    { "@type": "ListItem", position: cat ? 3 : 2, name: p.nome },
  ] };
  const ld = (o: unknown) => JSON.stringify(o).replace(/</g, "\\u003c");
  return (
    <SeoShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(crumbs) }} />
      <nav><Link href="/">Início</Link>{cat && <> › <Link href={categoriaUrl(cat.id)}>{cat.nome}</Link></>}</nav>
      <div className="prod">
        <div>
          <img src={imgOf(p)} width={750} height={1000} alt={`${p.nome}, lembrança artesanal da Pqueninos em Belo Horizonte`} fetchPriority="high" />
          {fotos.length > 1 && <div className="thumbs">{fotos.slice(1).map(k => <img key={k} src={imgOf(p, k)} width={750} height={1000} loading="lazy" alt={`${p.nome}, foto ${k}`} />)}</div>}
        </div>
        <div>
          <h1>{p.nome}</h1>
          <p className="price">{p.preco != null ? brl(p.preco) : "Sob consulta"}</p>
          <ul className="info">{p.info.map(i => <li key={i}>{i}</li>)}</ul>
          <a className="btn" href={waLink(msg)} target="_blank" rel="noopener">{p.preco == null ? "Pedir orçamento no WhatsApp" : "Pedir no WhatsApp"}</a>
          <Link className="btn ghost" href={`/#produto-${p.n}`}>Ver no catálogo interativo</Link>
          <p>Feito à mão em Belo Horizonte. Prazo de produção de 7 a 18 dias úteis, conforme a agenda e a quantidade, mais o prazo da transportadora.</p>
        </div>
      </div>
    </SeoShell>
  );
}
