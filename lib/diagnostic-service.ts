export type DiagnosticPayload = Record<string, string | boolean>;
export type DiagnosticResult = { ok: true } | { ok: false; error: string; fallback: boolean };

export async function submitDiagnostic(payload: DiagnosticPayload): Promise<DiagnosticResult> {
  try {
    const response = await fetch("/api/diagnostico", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json().catch(() => ({}));
    if (response.ok && result.ok) return { ok: true };
    // Validation errors are shown to the visitor; infrastructure errors fall back to WhatsApp.
    if (response.status === 422 || response.status === 429) return { ok: false, error: result.error, fallback: false };
    return { ok: false, error: "Não foi possível enviar agora. Seus dados continuam salvos neste navegador.", fallback: true };
  } catch {
    return { ok: false, error: "Sem conexão. Seus dados continuam salvos neste navegador.", fallback: true };
  }
}
