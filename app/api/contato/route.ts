import { NextResponse } from "next/server";
import { services } from "@/content/site";
import { isRateLimited, mailerConfigured, sendLeadEmail } from "@/lib/mailer";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (value: unknown, max: number) => typeof value === "string" ? value.replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, " ").trim().slice(0, max) : "";

export async function POST(request: Request) {
  if (!mailerConfigured()) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  if (isRateLimited(request, "contato")) return NextResponse.json({ ok: false, error: "Muitas tentativas. Tente novamente em alguns minutos." }, { status: 429 });

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false, error: "Dados inválidos." }, { status: 400 }); }
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120), email = clean(body.email, 160), phone = clean(body.phone, 40), message = clean(body.message, 2000);
  if (!name || !email || !phone || !message) return NextResponse.json({ ok: false, error: "Preencha todos os campos obrigatórios." }, { status: 422 });
  if (!EMAIL.test(email)) return NextResponse.json({ ok: false, error: "Informe um e-mail válido." }, { status: 422 });
  if (phone.replace(/\D/g, "").length < 10) return NextResponse.json({ ok: false, error: "Informe um telefone com DDD." }, { status: 422 });
  if (body.consent !== true) return NextResponse.json({ ok: false, error: "Confirme a ciência da Política de Privacidade para enviar." }, { status: 422 });
  const interests = Array.isArray(body.services) ? services.filter(s => (body.services as unknown[]).includes(s.slug)).map(s => s.title) : [];

  const rows: (readonly [string, string])[] = [["Nome", name], ["E-mail", email], ["Telefone", phone], ["Serviços de interesse", interests.join(", ") || "Não informado"], ["Mensagem", message]];
  const sent = await sendLeadEmail({ subject: `Pedido de orçamento: ${name}`, title: "Novo pedido de orçamento", rows, replyTo: email, source: "formulário de orçamento" });
  return sent ? NextResponse.json({ ok: true }) : NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
}
