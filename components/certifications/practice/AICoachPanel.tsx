"use client";

import { useState } from "react";
import { Bot, X, Send } from "lucide-react";
import type { PracticeQuestion } from "@/lib/az900Practice";
import { useLocale } from "@/components/LocaleProvider";

type ChatMessage = { role: "user" | "assistant"; text: string };

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

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: input },
      { role: "assistant", text: question.explanation },
    ]);
    setInput("");
  };

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

        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[90%] rounded-lg p-3 text-sm ${
                m.role === "user" ? "ml-auto bg-primary text-white" : "bg-panel-alt text-text"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={t("practice.askAboutTopic")}
            className="w-full rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 text-sm text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
          />
          <button
            onClick={send}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary text-white hover:bg-primary-dark"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
