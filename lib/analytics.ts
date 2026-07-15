export type AnalyticsEvent =
  | "whatsapp_click" | "email_click" | "project_click" | "external_site_click"
  | "objective_select" | "diagnostic_start" | "diagnostic_step_forward"
  | "diagnostic_step_back" | "diagnostic_validation_error" | "diagnostic_demo_complete"
  | "scheduling_click" | "page_cta_click";

export function track(event: AnalyticsEvent, metadata: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("dreh:analytics", { detail: { event, metadata } }));
}
