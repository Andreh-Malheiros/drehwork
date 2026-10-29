import { brand } from "@/content/site";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

/** Best-effort limiter per serverless instance; blocks rapid repeated submissions from one IP. */
export function isRateLimited(request: Request, scope: string) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = `${scope}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) || []).filter(time => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export const mailerConfigured = () => Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM);

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

/** Sends a lead notification to the DrehWork inbox through the Resend REST API. */
export async function sendLeadEmail({ subject, title, rows, replyTo, source }: { subject: string; title: string; rows: (readonly [string, string])[]; replyTo?: string; source: string }) {
  const html = `<h2>${escapeHtml(title)}</h2><table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows.map(([label, value]) => `<tr><td style="color:#666;vertical-align:top"><b>${escapeHtml(label)}</b></td><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join("")}</table><p style="color:#888;font-size:12px">Enviado pelo ${escapeHtml(source)} de ${brand.domain}. O titular declarou ciência da Política de Privacidade.</p>`;
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.RESEND_FROM, to: [process.env.DIAGNOSTIC_TO || brand.email], reply_to: replyTo, subject, html, text }),
  }).catch(() => null);
  return Boolean(response?.ok);
}
