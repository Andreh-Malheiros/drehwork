/** (31) 99999-9999 or (31) 3333-4444 while typing. */
export function maskPhone(value: string) {
  const d = value.replace(/\D/g, "").replace(/^55(?=\d{10,11}$)/, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Two-letter state code (UF). */
export const maskUF = (value: string) => value.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase();

/** Instagram handle with a single leading @. */
export function maskInstagram(value: string) {
  const handle = value.replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/[^\w.]/g, "").slice(0, 30);
  return handle ? `@${handle}` : "";
}

/** Lowercase, no spaces; keeps what the visitor typed otherwise. */
export const maskUrl = (value: string) => value.replace(/\s/g, "").toLowerCase();

export const maskEmail = (value: string) => value.replace(/\s/g, "").toLowerCase();

export const FIELD_MASKS: Record<string, (value: string) => string> = {
  whatsapp: maskPhone,
  state: maskUF,
  instagram: maskInstagram,
  siteUrl: maskUrl,
  email: maskEmail,
};
