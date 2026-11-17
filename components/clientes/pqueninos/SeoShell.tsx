import type { ReactNode } from "react";
import Link from "next/link";
import { CATEGORIAS, categoriaUrl } from "@/content/clientes/pqueninos-seo";
import "@/app/clientes/pqueninos/seo.css";

// Moldura das páginas indexáveis: texto real no HTML, links entre páginas e rodapé com os dados do negócio.
export function SeoShell({ children }: { children: ReactNode }) {
  return (
    <div className="pqs">
      <div className="pqs-in">
        <header>
          <Link href="/">Pqueninos Lembranças</Link>
          <Link href="/#inicio">Ver o catálogo interativo</Link>
        </header>
        <main>{children}</main>
        <footer>
          <p><b>Pqueninos Lembranças</b>, lembranças artesanais em Belo Horizonte, MG. Atendimento de segunda a sexta, das 10h às 17h30. Retiradas agendadas em Belo Horizonte ou Ibirité e envio para todo o Brasil. Não há loja aberta ao público.</p>
          <p>{CATEGORIAS.map((c, i) => <span key={c.id}>{i > 0 && " · "}<Link href={categoriaUrl(c.id)}>{c.nome}</Link></span>)}</p>
        </footer>
      </div>
    </div>
  );
}
