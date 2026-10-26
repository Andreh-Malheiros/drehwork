import sitesEConversao from "./sites-e-conversao.json";
import seoEGoogle from "./seo-e-google.json";
import iaEBuscas from "./ia-e-buscas.json";
import ecommerce from "./ecommerce.json";
import presencaDigital from "./presenca-digital.json";
import gestaoEInvestimento from "./gestao-e-investimento.json";
import noticias from "./noticias-e-tendencias.json";

/** Regras editoriais e critérios de qualidade: docs/11-blog-insights.md (verificados em tests/insights.test.mjs). */
export const insightCategories = ["Sites e conversão", "SEO e Google", "IA e buscas", "E-commerce", "Presença digital", "Gestão e investimento", "Notícias e tendências"] as const;

export type InsightCategory = typeof insightCategories[number];
export type InsightSection = { heading: string; paragraphs?: string[]; items?: string[] };
export type Insight = {
  slug: string;
  title: string;
  /** Título da página para busca (sem o sufixo da marca), até 60 caracteres. */
  seoTitle: string;
  description: string;
  keyword: string;
  category: InsightCategory;
  date: string;
  updated: string;
  summary: string;
  intro: string;
  sections: InsightSection[];
  faqs: [string, string][];
  relatedServices: string[];
  /** Obrigatório em "Notícias e tendências": fontes primárias verificáveis. */
  sources?: { title: string; url: string }[];
  status: "draft" | "published";
};

const all = [...sitesEConversao, ...seoEGoogle, ...iaEBuscas, ...ecommerce, ...presencaDigital, ...gestaoEInvestimento, ...noticias] as Insight[];

export const insights = all
  .filter(insight => insight.status === "published")
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "pt-BR"));

const words = (text: string) => text.split(/\s+/).filter(Boolean).length;

export function readingMinutes(insight: Insight) {
  const total = words(insight.intro)
    + insight.sections.reduce((sum, s) => sum + words([...(s.paragraphs ?? []), ...(s.items ?? [])].join(" ")), 0)
    + insight.faqs.reduce((sum, [q, a]) => sum + words(`${q} ${a}`), 0);
  return Math.max(1, Math.round(total / 200));
}
