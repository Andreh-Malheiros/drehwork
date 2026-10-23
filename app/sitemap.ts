import type { MetadataRoute } from "next";
import { brand } from "@/content/site";
import { indexablePaths } from "@/lib/seo";

// Update when page content changes; a build-time date would mark every URL as modified on each deploy.
const lastModified = new Date("2026-10-23");

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths.map(path => ({
    url: path ? `${brand.url}/${path}` : brand.url,
    lastModified,
    changeFrequency: path.startsWith("projetos/") || path.startsWith("politica") || path === "termos-de-uso" ? "yearly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("servicos") || path === "diagnostico" ? 0.8 : 0.6,
  }));
}
