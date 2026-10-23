import type { MetadataRoute } from "next";
import { brand } from "@/content/site";
import { indexablePaths } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return indexablePaths.map(path => ({
    url: path ? `${brand.url}/${path}` : brand.url,
    lastModified,
    changeFrequency: path.startsWith("projetos/") || path.startsWith("politica") || path === "termos-de-uso" ? "yearly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("servicos") || path === "diagnostico" ? 0.8 : 0.6,
  }));
}
