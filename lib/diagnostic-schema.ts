export const DIAGNOSTIC_FIELDS = {
  company: { label: "Empresa", required: true },
  responsible: { label: "Responsável", required: true },
  segment: { label: "Segmento", required: true },
  city: { label: "Cidade", required: true },
  state: { label: "Estado", required: true },
  hasSite: { label: "Possui site", required: true },
  siteUrl: { label: "Site atual", required: false },
  instagram: { label: "Instagram", required: false },
  googleProfile: { label: "Google Perfil da Empresa", required: true },
  situation: { label: "Situação atual", required: true },
  objective: { label: "Principal objetivo", required: true },
  solution: { label: "Solução de interesse", required: true },
  timeline: { label: "Prazo desejado", required: false },
  whatsapp: { label: "WhatsApp", required: true },
  email: { label: "E-mail", required: true },
  period: { label: "Melhor período", required: true },
  reply: { label: "Preferência de resposta", required: true },
} as const;

export type DiagnosticField = keyof typeof DIAGNOSTIC_FIELDS;
export type DiagnosticData = Partial<Record<DiagnosticField, string>>;
export const MAX_FIELD_LENGTH = 180;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the form and the API route. Returns sanitized data or the first error message. */
export function validateDiagnostic(input: unknown): { ok: true; data: DiagnosticData } | { ok: false; error: string } {
  if (!input || typeof input !== "object") return { ok: false, error: "Dados inválidos." };
  const source = input as Record<string, unknown>;
  const data: DiagnosticData = {};
  for (const [field, rule] of Object.entries(DIAGNOSTIC_FIELDS) as [DiagnosticField, { label: string; required: boolean }][]) {
    const raw = source[field];
    const value = typeof raw === "string" ? raw.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, MAX_FIELD_LENGTH) : "";
    if (rule.required && !value) return { ok: false, error: `Preencha o campo "${rule.label}".` };
    if (value) data[field] = value;
  }
  if (data.email && !EMAIL.test(data.email)) return { ok: false, error: "Informe um e-mail válido." };
  if (data.whatsapp && data.whatsapp.replace(/\D/g, "").length < 10) return { ok: false, error: "Informe um WhatsApp com DDD." };
  if (source.consent !== true) return { ok: false, error: "Confirme a ciência da Política de Privacidade para enviar." };
  return { ok: true, data };
}
