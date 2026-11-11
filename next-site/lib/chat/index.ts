import { createOllamaProvider } from "./ollama";
import { mockProvider } from "./mock";
import type { ChatProvider } from "./types";

/**
 * Picks the provider from env. To go live, set in .env.local:
 *   OLLAMA_MODEL=<your model>          (this alone switches mock -> ollama)
 *   OLLAMA_BASE_URL=http://host:11434  (optional, default http://localhost:11434)
 *   OLLAMA_API_KEY=...                 (optional, only if behind an auth proxy)
 * Set CHAT_PROVIDER=mock to force the mock even when OLLAMA_MODEL is set.
 * To support another backend, add a file implementing ChatProvider and return it here.
 */
export function getProvider(): ChatProvider {
  const model = process.env.OLLAMA_MODEL;
  if (process.env.CHAT_PROVIDER !== "mock" && model) {
    return createOllamaProvider({
      baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
      model,
      apiKey: process.env.OLLAMA_API_KEY || undefined,
    });
  }
  return mockProvider;
}
