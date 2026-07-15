import type { MetadataRoute } from "next";
import {projects,services} from "@/content/site";
export default function sitemap():MetadataRoute.Sitemap{const base="https://drehwork.com.br";const routes=["","/servicos","/projetos","/processo","/diagnostico","/contato","/insights","/politica-de-privacidade","/politica-de-cookies","/termos-de-uso",...services.map(s=>`/servicos/${s.slug}`),...projects.map(p=>`/projetos/${p.slug}`)];return routes.map(route=>({url:`${base}${route}`,changeFrequency:route.includes("projetos/")?"monthly":"weekly",priority:route===""?1:0.7}))}
