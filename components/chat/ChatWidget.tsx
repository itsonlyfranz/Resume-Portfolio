"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function ChatWidget() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const [input, setInput] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  return (
    <dialog
      ref={dialogRef}
      className="chat-dialog"
      aria-labelledby="chat-title"
      onClose={() => {
        const trigger = triggerRef.current;
        if (trigger?.getClientRects().length) trigger.focus();
        else document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
    >
      <div className="chat-shell">
        <div className="chat-header">
          <div>
            <h2 id="chat-title">Ask anything</h2>
            <p>Answers from Francisco&apos;s portfolio content</p>
          </div>
          <button
            className="chat-close"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close Ask anything"
          >
            esc ×
          </button>
        </div>
        {/* Messages */}
        <div
          ref={messagesContainerRef}
          role="log"
          aria-live="polite"
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground text-sm mt-8">
              <p className="mb-2">
                👋 Hi! I answer from Francisco&apos;s portfolio content.
              </p>
              <p className="text-xs">
                Try asking about his skills, experience, projects, or
                certifications.
              </p>
            </div>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={
                m.role === "user" ? "flex justify-end" : "flex justify-start"
              }
            >
              <div
                className={`max-w-[85%] p-3 rounded-lg ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {m.parts.map((part, i) =>
                  part.type === "text" ? (
                    <span key={i} className="text-sm whitespace-pre-wrap">
                      {part.text}
                    </span>
                  ) : null,
                )}
              </div>
            </div>
          ))}
          {(status === "streaming" || status === "submitted") && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-lg">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
          {error && (
            <p role="alert" className="text-sm text-muted-foreground">
              Chat is temporarily unavailable. Please try again or email{" "}
              <a
                href="mailto:robertopablo13.rp@gmail.com"
                className="underline"
              >
                robertopablo13.rp@gmail.com
              </a>
              .
            </p>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
          <Input
            name="question"
            autoFocus
            aria-label="Ask about Francisco’s work"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my work..."
            disabled={status !== "ready" && status !== "error"}
            className="flex-1"
          />
          <Button
            aria-label="Send message"
            type="submit"
            size="icon"
            disabled={
              (status !== "ready" && status !== "error") || !input.trim()
            }
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </dialog>
  );
}
