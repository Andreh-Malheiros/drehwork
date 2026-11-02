import type { MetadataRoute } from "next";
import { brand } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/social/"] }, sitemap: `${brand.url}/sitemap.xml`, host: brand.url };
}
