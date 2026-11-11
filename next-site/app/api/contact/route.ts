import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not set");
    return NextResponse.json({ ok: false, error: "Server is not configured." }, { status: 500 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!rateLimit(ip, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: "Too many messages. Try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  // Honeypot: bots fill it, humans never see it. Pretend success.
  if (str(body.website)) return NextResponse.json({ ok: true });

  const name = str(body.name);
  const email = str(body.email);
  const subject = str(body.subject) || "General Inquiry";
  const message = str(body.message);

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Name, email and message are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }
  if (name.length > 100 || subject.length > 200 || message.length > 3000) {
    return NextResponse.json({ ok: false, error: "Message is too long." }, { status: 400 });
  }

  const text =
    `📬 <b>New Contact Form Message</b>\n\n` +
    `👤 <b>Name:</b> ${esc(name)}\n` +
    `📧 <b>Email:</b> ${esc(email)}\n` +
    `📌 <b>Subject:</b> ${esc(subject)}\n\n` +
    `💬 <b>Message:</b>\n${esc(message)}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      console.error("Telegram error:", res.status, data?.description);
      return NextResponse.json({ ok: false, error: "Failed to deliver message." }, { status: 502 });
    }
  } catch (err) {
    console.error("Telegram request failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to deliver message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
