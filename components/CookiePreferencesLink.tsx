"use client";

import { openConsentPreferences } from "@/lib/consent";

export function CookiePreferencesLink() {
  return <button type="button" className="footer-link-button" onClick={openConsentPreferences}>Preferências de cookies</button>;
}
