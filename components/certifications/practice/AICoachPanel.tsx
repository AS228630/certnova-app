"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, X, Send, Loader2 } from "lucide-react";
import type { PracticeQuestion } from "@/lib/az900Practice";
import { useLocale } from "@/components/LocaleProvider";
import { askAiCoach, AiCoachRequestError, type SimpleChatMessage } from "@/lib/aiCoachClient";
import AiCoachMessageContent from "@/components/AiCoachMessageContent";

type ChatMessage = { role: "user" | "assistant"; text: string };

function questionContext(question: PracticeQuestion): string {
  const parts = [`Frage: ${question.prompt}`];
  if (question.type === "single" || !question.type) {
    parts.push(`Antwortoptionen: ${question.options.map((o) => `${o.id}) ${o.text}`).join(" | ")}`);
    parts.push(`Richtige Antwort: ${question.correct}`);
  }
  parts.push(`Offizielle Erklärung: ${question.explanation}`);
  return parts.join("\n");
}

export default function AICoachPanel({
  question,
  isOpen,
  onClose,
}: {
  question: PracticeQuestion;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: t("practice.aiCoachGreeting") },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  async function send() {
    const content = input.trim();
    if (!content || sending) return;
    setInput("");
    setError(null);
    const nextMessages: ChatMessage[] = [...messages, { role: "user", text: content }];
    setMessages(nextMessages);
    setSending(true);

    const history: SimpleChatMessage[] = [
      {
        role: "user",
        content: `Kontext zur aktuellen Übungsfrage (nutze dies, um präzise zu antworten, aber wiederhole es nicht wörtlich):\n${questionContext(question)}`,
      },
      { role: "assistant", content: "Verstanden, ich helfe dir bei dieser Frage." },
      ...nextMessages.map((m) => ({ role: m.role, content: m.text }) as SimpleChatMessage),
    ];

    try {
      const reply = await askAiCoach(history);
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch (err) {
      const message =
        err instanceof AiCoachRequestError ? err.message : "Der KI Coach ist gerade nicht erreichbar.";
      setError(message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className={`fixed inset-0 z-40 lg:static lg:z-auto lg:block ${isOpen ? "block" : "hidden"}`}
    >
      <div className="absolute inset-0 bg-black/40 lg:hidden" onClick={onClose} />

      <div className="absolute bottom-0 right-0 top-0 flex w-full max-w-sm flex-col rounded-l-xl border border-border-soft bg-panel p-5 lg:static lg:w-auto lg:max-w-none lg:rounded-xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Bot size={16} className="text-white" />
            </div>
            <p className="font-bold text-text">{t("practice.aiCoachBtn")}</p>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-text lg:hidden">
            <X size={18} />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto pr-1">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[90%] rounded-lg p-3 text-sm ${
                m.role === "user" ? "ml-auto bg-primary text-white" : "bg-panel-alt text-text"
              }`}
            >
              {m.role === "assistant" ? <AiCoachMessageContent content={m.text} /> : m.text}
            </div>
          ))}
          {sending && (
            <div className="flex items-center gap-1.5 rounded-lg bg-panel-alt p-3 text-text-faint">
              <Loader2 size={14} className="animate-spin" />
            </div>
          )}
          {error && (
            <div className="rounded-lg border border-danger/30 bg-danger/10 p-3 text-xs text-danger">
              {error}
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={t("practice.askAboutTopic")}
            disabled={sending}
            className="w-full rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 text-sm text-text placeholder:text-text-faint focus:border-primary focus:outline-none disabled:opacity-60"
          />
          <button
            onClick={send}
            disabled={sending || !input.trim()}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary text-white hover:bg-primary-dark disabled:opacity-40"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
