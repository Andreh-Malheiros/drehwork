export type ConsentState = { analytics: boolean; date: string; version: 1 };

export const CONSENT_KEY = "dreh-consent";
export const CONSENT_EVENT = "dreh:consent";
export const OPEN_CONSENT_EVENT = "dreh:consent-open";

export function readConsent(): ConsentState | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    return parsed.version === 1 ? parsed : null;
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean) {
  const state: ConsentState = { analytics, date: new Date().toISOString(), version: 1 };
  try { window.localStorage.setItem(CONSENT_KEY, JSON.stringify(state)); } catch { /* storage unavailable: keep choice for this page view only */ }
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
  return state;
}

export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
