import { rateLimit } from "@/lib/rateLimit";
import { getProvider } from "@/lib/chat";
import { buildSystemPrompt } from "@/lib/chat/systemPrompt";
import { LIMITS, type ChatMessage } from "@/lib/chat/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!rateLimit(`chat:${ip}`, 20, 10 * 60 * 1000)) {
    return json({ error: "Too many messages. Please try again in a few minutes." }, 429);
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const raw = Array.isArray(body.messages) ? body.messages : [];
  const messages: ChatMessage[] = [];
  for (const m of raw.slice(-LIMITS.maxMessages)) {
    if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") {
      return json({ error: "Invalid messages." }, 400);
    }
    const content = m.content.trim().slice(0, LIMITS.maxMessageChars);
    if (content) messages.push({ role: m.role, content });
  }
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return json({ error: "Last message must be from the user." }, 400);
  }

  const provider = getProvider();
  const encoder = new TextEncoder();
  const iterator = provider.stream({ system: buildSystemPrompt(), messages, signal: req.signal });

  // Pull the first chunk before responding so provider failures become a real error status.
  let first: IteratorResult<string>;
  try {
    first = await iterator.next();
  } catch (err) {
    console.error("Chat provider error:", err);
    return json({ error: "The assistant is unavailable right now." }, 502);
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        let r = first;
        while (!r.done) {
          controller.enqueue(encoder.encode(r.value));
          r = await iterator.next();
        }
        controller.close();
      } catch (err) {
        console.error("Chat stream error:", err);
        controller.error(err);
      }
    },
    cancel() {
      iterator.return?.(undefined);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Chat-Provider": provider.name,
    },
  });
}
