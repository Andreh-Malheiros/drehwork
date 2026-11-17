"use client";

import dynamic from "next/dynamic";
import { CATEGORIAS, categoriaUrl, doCat, produtoUrl } from "@/content/clientes/pqueninos-seo";
import "@/app/clientes/pqueninos/seo.css";

// O app depende do endereço (#rota) e do armazenamento local desde o primeiro render, então roda só no navegador.
// Enquanto ele carrega (e para quem não roda JavaScript), o HTML traz o mesmo conteúdo em texto, com links para as páginas de categoria e produto.
function Fallback() {
  return (
    <div className="pqs">
      <div className="pqs-in">
        <header><span>Pqueninos Lembranças</span></header>
        <main>
          <h1>Lembrancinhas de batizado artesanais em Belo Horizonte</h1>
          <p className="lead">Lembranças 100% artesanais para batizado, Primeira Eucaristia, Crisma e momentos especiais, feitas à mão e personalizadas. Retiradas agendadas em Belo Horizonte ou Ibirité e envio para todo o Brasil.</p>
          {CATEGORIAS.map(c => (
            <section key={c.id}>
              <h2><a href={categoriaUrl(c.id)}>{c.nome}</a></h2>
              <p>{c.sub}</p>
              <p>{doCat(c.id).map((p, i) => <span key={p.n}>{i > 0 && " · "}<a href={produtoUrl(p)}>{p.nome}</a></span>)}</p>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}

export const PqueninosClient = dynamic(() => import("./PqueninosApp").then(m => m.PqueninosApp), { ssr: false, loading: () => <Fallback /> });
