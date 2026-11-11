import { skills, experience, education, contactLinks } from "@/lib/content";
import type { ChatProvider } from "./types";

function reply(q: string): string {
  const s = q.toLowerCase();
  if (/(skill|tech|stack|tool|know)/.test(s)) return `Ehsan works with ${skills.join(", ")}.`;
  if (/(experience|work|job|career|role)/.test(s))
    return experience.map((e) => `${e.title} at ${e.place} (${e.time}): ${e.text}`).join("\n\n");
  if (/(educat|study|degree|universit|certif)/.test(s))
    return education.map((e) => `${e.title} — ${e.place}: ${e.text}`).join("\n\n");
  if (/(contact|email|mail|phone|reach|linkedin|github|gitlab|hire)/.test(s))
    return "You can reach Ehsan here:\n" + contactLinks.map((c) => `• ${c.label}: ${c.text}`).join("\n");
  return "Hi! I'm a placeholder assistant running in demo mode. Ask me about Ehsan's skills, experience, education or contact details.";
}

/** Fake streaming responder so the whole UI works before a real model is connected. */
export const mockProvider: ChatProvider = {
  name: "mock",
  async *stream({ messages, signal }) {
    const last = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
    for (const word of reply(last).split(/(\s+)/)) {
      if (signal?.aborted) return;
      await new Promise((r) => setTimeout(r, 25));
      yield word;
    }
  },
};
