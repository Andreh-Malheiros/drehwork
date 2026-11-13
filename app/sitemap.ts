import type { MetadataRoute } from "next";
import { brand, projects } from "@/content/site";
import { insights } from "@/content/insights";
import { indexablePaths } from "@/lib/seo";

// Update when page content changes; a build-time date would mark every URL as modified on each deploy.
const lastModified = new Date("2026-11-13");
const casePublishedOn = new Date("2026-11-10");

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths.map(path => {
    const insight = insights.find(i => `insights/${i.slug}` === path);
    const project = projects.find(p => `projetos/${p.slug}` === path);
    const modified = insight?.updated ?? project?.caseStudy?.updatedAt;
    return {
      url: path ? `${brand.url}/${path}` : brand.url,
      lastModified: modified ? new Date(modified) : path === "" || path === "projetos" ? casePublishedOn : lastModified,
      changeFrequency: path.startsWith("projetos/") || path.startsWith("politica") || path === "termos-de-uso" ? "yearly" as const : "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("servicos") || path === "diagnostico" ? 0.8 : 0.6,
    };
  });
}
