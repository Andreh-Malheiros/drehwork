import type { MetadataRoute } from "next";
import { brand } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DrehWork",
    short_name: "DrehWork",
    description: brand.positioning,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "pt-BR",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
