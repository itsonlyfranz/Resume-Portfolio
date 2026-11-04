"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function ChatWidget() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const [input, setInput] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && (status === "ready" || status === "error")) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  useEffect(() => {
    const open = () => {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;
      triggerRef.current = document.activeElement as HTMLElement;
      dialog.showModal();
    };
    const keydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialogRef.current?.open) dialogRef.current.close();
        else open();
      }
    };
    window.addEventListener("portfolio:ask", open);
    window.addEventListener("keydown", keydown);
    return () => {
      window.removeEventListener("portfolio:ask", open);
      window.removeEventListener("keydown", keydown);
    };
  }, []);

  const busy = status === "streaming" || status === "submitted";

  return (
    <dialog
      ref={dialogRef}
      className="ask-dialog"
      aria-labelledby="chat-title"
      aria-describedby="chat-description"
      onClose={() => {
        const trigger = triggerRef.current;
        if (trigger?.getClientRects().length) trigger.focus();
        else
          document
            .querySelector<HTMLButtonElement>('[aria-controls="mobile-nav"]')
            ?.focus();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
    >
      <div
        aria-hidden="true"
        className="ask-frost"
        onClick={() => dialogRef.current?.close()}
      />
      <button
        type="button"
        className="fixed right-6 top-6 z-10 font-mono text-[11px] uppercase tracking-wider text-gray-500 hover:text-ink"
        onClick={() => dialogRef.current?.close()}
        aria-label="Close Ask anything"
      >
        esc ×
      </button>
      <div className="ask-content">
        <div>
          <h2 id="chat-title" className="ask-title">
            what do you want to ask?
          </h2>
          <p
            id="chat-description"
            className="mt-3 font-mono text-[11px] uppercase tracking-wider text-gray-400"
          >
            Answers from Francisco&apos;s portfolio content
          </p>
        </div>

        <div
          ref={messagesContainerRef}
          role="log"
          aria-live="polite"
          className="ask-messages"
        >
          {messages.length === 0 && (
            <p className="font-mono text-[13px] text-gray-400">
              Try asking about his skills, experience, projects, or
              certifications.
            </p>
          )}
          {messages
            .filter((m) =>
              m.parts.some((part) => part.type === "text" && part.text),
            )
            .map((m) => (
              <div key={m.id} className="max-w-[92%]">
                <p className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
                  {m.role === "user" ? "you" : "answer"}
                </p>
                <p
                  className={`mt-1 whitespace-pre-wrap leading-relaxed ${
                    m.role === "user"
                      ? "text-[14px] text-gray-500"
                      : "text-[15px] text-ink"
                  }`}
                >
                  {m.parts.map((part, i) =>
                    part.type === "text" ? (
                      <span key={i}>{part.text}</span>
                    ) : null,
                  )}
                </p>
              </div>
            ))}
          {busy && (
            <p className="font-mono text-[12px] text-gray-400">
              <span className="pulse-dot inline-block">thinking…</span>
            </p>
          )}
          {error && (
            <p role="alert" className="text-[14px] text-gray-500">
              Chat is temporarily unavailable. Please try again or email{" "}
              <a
                href="mailto:robertopablo13.rp@gmail.com"
                className="text-ink underline underline-offset-4"
              >
                robertopablo13.rp@gmail.com
              </a>
              .
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <input
            name="question"
            autoFocus
            autoComplete="off"
            aria-label="Ask about Francisco’s work"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my work..."
            disabled={status !== "ready" && status !== "error"}
            className="ask-input"
          />
          <button
            aria-label="Send message"
            type="submit"
            disabled={
              (status !== "ready" && status !== "error") || !input.trim()
            }
            className="mb-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-paper hover:opacity-80 disabled:opacity-30"
          >
            <ArrowUp aria-hidden="true" className="h-4 w-4" />
          </button>
        </form>
      </div>
    </dialog>
  );
}
