export type DiagnosticPayload = Record<string, string | boolean>;
export type DiagnosticResult = { ok: true; mode: "review" };

export async function submitDiagnosticDemo(_payload: DiagnosticPayload): Promise<DiagnosticResult> {
  // REVIEW MODE: replace this adapter with an authorized Google Sheets or first-party provider.
  // No data leaves the visitor's browser in this version.
  void _payload;
  await Promise.resolve();
  return { ok: true, mode: "review" };
}
