"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "chat-history-v1";
const SUGGESTIONS = ["What are Ehsan's skills?", "Tell me about his experience", "How can I contact him?"];

export default function ChatWindow() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [demo, setDemo] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Restore / persist history in the browser.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages, loaded]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, busy]);

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || busy) return;
      setError("");
      setInput("");
      const history: Msg[] = [...messages, { role: "user", content }];
      setMessages([...history, { role: "assistant", content: "" }]);
      setBusy(true);

      const ctrl = new AbortController();
      abortRef.current = ctrl;
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: ctrl.signal,
        });
        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Something went wrong. Please try again.");
        }
        setDemo(res.headers.get("X-Chat-Provider") === "mock");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages([...history, { role: "assistant", content: acc }]);
        }
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setError((e as Error).message || "Something went wrong.");
          // Drop the empty assistant placeholder if nothing streamed.
          setMessages((m) => (m[m.length - 1]?.content === "" ? m.slice(0, -1) : m));
        }
      } finally {
        setBusy(false);
        abortRef.current = null;
      }
    },
    [messages, busy],
  );

  const stop = () => abortRef.current?.abort();
  const clear = () => {
    abortRef.current?.abort();
    setMessages([]);
    setError("");
  };

  return (
    <div className="chat-box">
      <div className="chat-toolbar open-sans-font">
        <span>{demo ? "Demo mode — replies are canned" : "Ask anything about Ehsan"}</span>
        <button type="button" className="chat-clear" onClick={clear} disabled={messages.length === 0}>
          <i className="fa fa-trash" /> Clear
        </button>
      </div>

      <div className="chat-messages" ref={listRef} aria-live="polite">
        {messages.length === 0 && loaded && (
          <div className="chat-empty open-sans-font">
            <i className="fa fa-comments" />
            <p>Hi! Ask me about Ehsan&apos;s skills, experience, education or how to reach him.</p>
            <div className="chat-suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`chat-row ${m.role}`}>
            <div className="chat-bubble open-sans-font">
              {m.content || (busy && i === messages.length - 1 ? <span className="chat-typing"><i /><i /><i /></span> : "")}
            </div>
          </div>
        ))}
      </div>

      {error && <div className="chat-error open-sans-font">{error}</div>}

      <form
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <textarea
          value={input}
          rows={1}
          maxLength={2000}
          placeholder="TYPE YOUR MESSAGE"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
        />
        {busy ? (
          <button type="button" className="chat-send" onClick={stop} aria-label="Stop">
            <i className="fa fa-stop" />
          </button>
        ) : (
          <button type="submit" className="chat-send" disabled={!input.trim()} aria-label="Send">
            <i className="fa fa-send" />
          </button>
        )}
      </form>
    </div>
  );
}
