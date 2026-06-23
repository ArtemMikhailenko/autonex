import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadBody = {
  name?: string;
  phone?: string;
  message?: string;
  context?: string;
};

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const message = (body.message ?? "").trim();
  const context = (body.context ?? "").trim();

  // minimal validation
  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "name" }, { status: 422 });
  }
  if (phone.replace(/\D/g, "").length < 9) {
    return NextResponse.json({ ok: false, error: "phone" }, { status: 422 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const text =
    `🚗 *Нова заявка AUTONEX*\n\n` +
    `👤 Імʼя: ${escapeMd(name)}\n` +
    `📞 Телефон: ${escapeMd(phone)}\n` +
    (message ? `💬 Коментар: ${escapeMd(message)}\n` : "") +
    (context ? `📊 Розрахунок: ${escapeMd(context)}\n` : "");

  // If the bot isn't configured yet, accept the lead so the UX works in dev.
  if (!token || !chatId) {
    console.warn("[lead] TELEGRAM_BOT_TOKEN/CHAT_ID not set — lead not forwarded:", {
      name,
      phone,
      message,
      context,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    });
    if (!tgRes.ok) {
      const detail = await tgRes.text();
      console.error("[lead] telegram error:", detail);
      return NextResponse.json({ ok: false, error: "telegram" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    console.error("[lead] telegram fetch failed:", e);
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
}

function escapeMd(s: string) {
  return s.replace(/([_*`[\]])/g, "\\$1");
}
