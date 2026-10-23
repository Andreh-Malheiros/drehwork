import { NextResponse } from "next/server";
import { brand } from "@/content/site";
import { DIAGNOSTIC_FIELDS, validateDiagnostic, type DiagnosticField } from "@/lib/diagnostic-schema";

// Best-effort limiter per serverless instance; blocks rapid repeated submissions from one IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(time => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Muitas tentativas. Tente novamente em alguns minutos." }, { status: 429 });

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false, error: "Dados inválidos." }, { status: 400 }); }
  // Honeypot: real visitors never fill this hidden field. Pretend success to bots.
  if (typeof body.website === "string" && body.website.length > 0) return NextResponse.json({ ok: true });

  const result = validateDiagnostic(body);
  if (!result.ok) return NextResponse.json({ ok: false, error: result.error }, { status: 422 });
  const { data } = result;

  const rows = (Object.keys(DIAGNOSTIC_FIELDS) as DiagnosticField[]).filter(field => data[field]).map(field => [DIAGNOSTIC_FIELDS[field].label, data[field]!] as const);
  const html = `<h2>Novo diagnóstico — ${escapeHtml(data.company || "")}</h2><table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows.map(([label, value]) => `<tr><td style="color:#666;vertical-align:top"><b>${escapeHtml(label)}</b></td><td>${escapeHtml(value)}</td></tr>`).join("")}</table><p style="color:#888;font-size:12px">Enviado pelo formulário de diagnóstico de ${brand.domain}. O titular declarou ciência da Política de Privacidade.</p>`;
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [process.env.DIAGNOSTIC_TO || brand.email], reply_to: data.email, subject: `Diagnóstico: ${data.company} (${data.solution})`, html, text }),
  }).catch(() => null);

  if (!response?.ok) return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
