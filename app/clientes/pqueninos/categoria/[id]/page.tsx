/* eslint-disable @next/next/no-img-element -- fotos já otimizadas em WebP 750x1000. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIAS, SITE, brl, categoriaUrl, doCat, imgOf, produtoUrl } from "@/content/clientes/pqueninos-seo";
import { SeoShell } from "@/components/clientes/pqueninos/SeoShell";

export const dynamicParams = false;
export const generateStaticParams = () => CATEGORIAS.map(c => ({ id: c.id }));

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = CATEGORIAS.find(x => x.id === id);
  if (!c) return {};
  const title = `${c.nome} em BH | Pqueninos Lembranças`;
  const description = `${c.sub} Envio para todo o Brasil.`.slice(0, 158);
  return { title, description, alternates: { canonical: `${SITE}${categoriaUrl(c.id)}` }, openGraph: { type: "website", locale: "pt_BR", siteName: "Pqueninos Lembranças", title, description, url: `${SITE}${categoriaUrl(c.id)}` } };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = CATEGORIAS.find(x => x.id === id);
  if (!c) notFound();
  const itens = doCat(c.id);
  const ld = (o: unknown) => JSON.stringify(o).replace(/</g, "\\u003c");
  const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: c.nome },
  ] };
  return (
    <SeoShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(crumbs) }} />
      <nav><Link href="/">Início</Link> › {c.nome}</nav>
      <h1>{c.h1}</h1>
      <p className="lead">{c.sub} Retirada agendada em Belo Horizonte ou Ibirité, ou envio para todo o Brasil.</p>
      <ul className="grid">
        {itens.map(p => (
          <li key={p.n}><Link href={produtoUrl(p)}>
            <img src={imgOf(p)} width={750} height={1000} loading="lazy" alt={`${p.nome}, lembrança artesanal da Pqueninos`} />
            <span>{p.nome}<b>{p.preco != null ? brl(p.preco) : "Sob consulta"}</b></span>
          </Link></li>
        ))}
      </ul>
      <p>Todos os itens são feitos à mão e personalizados com o nome, a data e a mensagem da sua ocasião. Fale com a Steh pelo WhatsApp para combinar modelo, cores e quantidade.</p>
    </SeoShell>
  );
}
