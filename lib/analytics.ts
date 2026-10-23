export type AnalyticsEvent =
  | "whatsapp_click" | "email_click" | "instagram_click" | "project_click" | "external_site_click"
  | "objective_select" | "diagnostic_start" | "diagnostic_step_forward"
  | "diagnostic_step_back" | "diagnostic_validation_error" | "diagnostic_submit"
  | "diagnostic_submit_error" | "scheduling_click" | "page_cta_click" | "nav_click"
  | "faq_open" | "scroll_depth" | "cookie_consent";

export type AnalyticsPayload = Record<string, string | number | boolean>;
export const ANALYTICS_EVENT = "dreh:analytics";

/** Emits a site event. AnalyticsBridge forwards it to the providers the visitor allowed. */
export function track(event: AnalyticsEvent, metadata: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(ANALYTICS_EVENT, { detail: { event, metadata } }));
}
