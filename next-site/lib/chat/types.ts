export type Role = "user" | "assistant";
export type ChatMessage = { role: Role; content: string };

/** A provider turns a conversation into a stream of text chunks. */
export interface ChatProvider {
  /** Shown in the UI / sent as a response header, e.g. "ollama" or "mock". */
  name: string;
  stream(opts: { system: string; messages: ChatMessage[]; signal?: AbortSignal }): AsyncGenerator<string>;
}

export const LIMITS = {
  maxMessages: 20,
  maxMessageChars: 2000,
};
