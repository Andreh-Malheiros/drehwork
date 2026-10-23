import { NextResponse } from "next/server";
import { DIAGNOSTIC_FIELDS, validateDiagnostic, type DiagnosticField } from "@/lib/diagnostic-schema";
import { isRateLimited, mailerConfigured, sendLeadEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  if (!mailerConfigured()) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  if (isRateLimited(request, "diagnostico")) return NextResponse.json({ ok: false, error: "Muitas tentativas. Tente novamente em alguns minutos." }, { status: 429 });

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false, error: "Dados inválidos." }, { status: 400 }); }
  // Honeypot: real visitors never fill this hidden field. Pretend success to bots.
  if (typeof body.website === "string" && body.website.length > 0) return NextResponse.json({ ok: true });

  const result = validateDiagnostic(body);
  if (!result.ok) return NextResponse.json({ ok: false, error: result.error }, { status: 422 });
  const { data } = result;

  const rows = (Object.keys(DIAGNOSTIC_FIELDS) as DiagnosticField[]).filter(field => data[field]).map(field => [DIAGNOSTIC_FIELDS[field].label, data[field]!] as const);
  const sent = await sendLeadEmail({ subject: `Diagnóstico: ${data.company} (${data.solution})`, title: `Novo diagnóstico — ${data.company}`, rows, replyTo: data.email, source: "formulário de diagnóstico" });
  return sent ? NextResponse.json({ ok: true }) : NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
}
