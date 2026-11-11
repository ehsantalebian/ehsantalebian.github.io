import type { ChatProvider } from "./types";

/**
 * Ollama provider: POST {OLLAMA_BASE_URL}/api/chat with stream=true.
 * The response is newline-delimited JSON: {"message":{"content":"..."},"done":false}
 */
export function createOllamaProvider(opts: { baseUrl: string; model: string; apiKey?: string }): ChatProvider {
  return {
    name: "ollama",
    async *stream({ system, messages, signal }) {
      const res = await fetch(`${opts.baseUrl.replace(/\/$/, "")}/api/chat`, {
        method: "POST",
        signal,
        headers: {
          "Content-Type": "application/json",
          ...(opts.apiKey ? { Authorization: `Bearer ${opts.apiKey}` } : {}),
        },
        body: JSON.stringify({
          model: opts.model,
          stream: true,
          messages: [{ role: "system", content: system }, ...messages],
        }),
      });
      if (!res.ok || !res.body) {
        throw new Error(`Ollama responded ${res.status}: ${(await res.text().catch(() => "")).slice(0, 200)}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) >= 0) {
          const line = buf.slice(0, nl).trim();
          buf = buf.slice(nl + 1);
          if (!line) continue;
          const json = JSON.parse(line);
          if (json.error) throw new Error(json.error);
          if (json.message?.content) yield json.message.content as string;
          if (json.done) return;
        }
      }
    },
  };
}
