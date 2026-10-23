"use client";

import { Analytics } from "@vercel/analytics/next";
import { track as vercelTrack } from "@vercel/analytics";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ANALYTICS_EVENT, track, type AnalyticsEvent, type AnalyticsPayload } from "@/lib/analytics";
import { CONSENT_EVENT, readConsent, type ConsentState } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
// Vercel custom events are only counted on paid plans; keep them for conversions only.
const VERCEL_EVENTS = new Set<AnalyticsEvent>(["whatsapp_click", "email_click", "diagnostic_submit", "page_cta_click"]);

type Gtag = (...args: unknown[]) => void;
declare global { interface Window { dataLayer?: unknown[]; gtag?: Gtag } }

function ensureGtag(): Gtag {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) window.gtag = function gtag() { window.dataLayer!.push(arguments); }; // eslint-disable-line prefer-rest-params
  return window.gtag;
}

function setGoogleConsent(granted: boolean) {
  if (!GA_ID) return;
  const gtag = ensureGtag();
  gtag("consent", "update", { analytics_storage: granted ? "granted" : "denied" });
  if (!granted || document.getElementById("ga4-script")) return;
  gtag("js", new Date());
  gtag("config", GA_ID, { send_page_view: false });
  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

function classifyLink(anchor: HTMLAnchorElement): [AnalyticsEvent, AnalyticsPayload] | null {
  const href = anchor.getAttribute("href") || "";
  const label = (anchor.textContent || "").trim().slice(0, 60);
  if (href.includes("wa.me/")) return ["whatsapp_click", { label }];
  if (href.startsWith("mailto:")) return ["email_click", { label }];
  if (href.includes("instagram.com")) return ["instagram_click", { label }];
  if (anchor.closest(".site-header nav, .site-footer nav, .footer-grid")) return ["nav_click", { label, href }];
  if (/^https?:\/\//.test(href) && !href.includes(location.hostname)) return ["external_site_click", { href }];
  if (href.startsWith("/diagnostico") || anchor.classList.contains("button")) return ["page_cta_click", { label, href }];
  if (href.startsWith("/projetos/")) return ["project_click", { href }];
  return null;
}

export function AnalyticsBridge() {
  const pathname = usePathname();
  const consent = useRef<ConsentState | null>(null);

  useEffect(() => {
    if (GA_ID) {
      ensureGtag()("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", wait_for_update: 500 });
    }
    consent.current = readConsent();
    if (consent.current?.analytics) setGoogleConsent(true);

    const onConsent = (event: Event) => {
      const state = (event as CustomEvent<ConsentState>).detail;
      consent.current = state;
      setGoogleConsent(state.analytics);
      if (state.analytics && window.gtag && GA_ID) window.gtag("event", "page_view", { page_path: location.pathname });
      track("cookie_consent", { analytics: state.analytics });
    };
    const onEvent = (event: Event) => {
      const { event: name, metadata } = (event as CustomEvent<{ event: AnalyticsEvent; metadata: AnalyticsPayload }>).detail;
      const page = location.pathname;
      if (consent.current?.analytics && window.gtag && GA_ID) window.gtag("event", name, { ...metadata, page_path: page });
      if (VERCEL_EVENTS.has(name)) vercelTrack(name, { ...metadata, page });
    };
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (anchor) { const classified = classifyLink(anchor as HTMLAnchorElement); if (classified) track(...classified); }
    };
    const onToggle = (event: Event) => {
      const details = event.target as HTMLDetailsElement;
      if (details.tagName === "DETAILS" && details.open) track("faq_open", { question: (details.querySelector("summary")?.textContent || "").replace("+", "").trim().slice(0, 100) });
    };

    window.addEventListener(CONSENT_EVENT, onConsent);
    window.addEventListener(ANALYTICS_EVENT, onEvent);
    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("toggle", onToggle, { capture: true });
    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsent);
      window.removeEventListener(ANALYTICS_EVENT, onEvent);
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("toggle", onToggle, { capture: true });
    };
  }, []);

  // Page views and scroll depth per route.
  useEffect(() => {
    if (consent.current?.analytics && window.gtag && GA_ID) window.gtag("event", "page_view", { page_path: pathname, page_title: document.title });
    const marks = [25, 50, 75, 100];
    const reached = new Set<number>();
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (max <= 0) return;
        const percent = (window.scrollY / max) * 100;
        for (const mark of marks) if (percent >= mark - 1 && !reached.has(mark)) { reached.add(mark); track("scroll_depth", { percent: mark }); }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); };
  }, [pathname]);

  return <Analytics />;
}
