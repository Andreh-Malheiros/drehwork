import { PqueninosClient } from "@/components/clientes/pqueninos/ClientOnly";
import { SITE } from "@/content/clientes/pqueninos-seo";

// Dados do negócio já públicos na ficha do Google e no app (endereço, horário, WhatsApp). Sem nota nem avaliações no esquema: autoavaliação não é elegível a destaque e não vale arriscar.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": `${SITE}/#negocio`,
  name: "Pqueninos Lembranças",
  url: `${SITE}/`,
  logo: `${SITE}/clientes/pqueninos/logo.webp`,
  image: `${SITE}/clientes/pqueninos/icons/og.png`,
  description: "Lembrancinhas de batizado, Primeira Eucaristia e Crisma feitas à mão em Belo Horizonte: Divino, velas, kits em caixa e toalhas bordadas. Envio para todo o Brasil.",
  telephone: "+55 31 99438-1792",
  address: { "@type": "PostalAddress", streetAddress: "Rua Carangola, 94", addressLocality: "Belo Horizonte", addressRegion: "MG", addressCountry: "BR" },
  areaServed: [{ "@type": "City", name: "Belo Horizonte" }, { "@type": "City", name: "Ibirité" }, { "@type": "Country", name: "Brasil" }],
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "17:30" }],
  sameAs: ["https://www.instagram.com/pqueninos/"],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PqueninosClient />
    </>
  );
}
