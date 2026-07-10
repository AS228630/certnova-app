"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, Loader2, Square } from "lucide-react";
import type { CareerPath } from "@/lib/careerPathsData";
import type { InterviewTopic } from "@/lib/interviewData";
import { askAiCoach, AiCoachRequestError, type SimpleChatMessage } from "@/lib/aiCoachClient";
import { useInterviewStore } from "@/lib/store/interviewStore";
import { useLocale } from "@/components/LocaleProvider";
import AiCoachMessageContent from "@/components/AiCoachMessageContent";

type ChatMessage = { role: "user" | "assistant"; text: string };

export default function MockInterviewModal({
  path,
  sessionType,
  topic,
  onClose,
}: {
  path: CareerPath;
  sessionType: "technical" | "hr" | "practical" | "mock";
  topic?: InterviewTopic;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const startSession = useInterviewStore((s) => s.startSession);
  const completeSession = useInterviewStore((s) => s.completeSession);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ended, setEnded] = useState(false);
  const startTimeRef = useRef(Date.now());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    startSession({ careerGoalId: path.slug, sessionType, topicId: topic?.id }).then((id) => {
      if (!cancelled) setSessionId(id);
    });

    const contextPrompt = topic
      ? `Führe ein Mock-Interview für die Position "${path.title}" durch, mit Fokus auf das Thema "${topic.title}". Beginne jetzt mit der ersten Frage.`
      : `Führe ein vollständiges Mock-Interview für die Position "${path.title}" durch (Mix aus technischen und Verhaltensfragen). Beginne jetzt mit der ersten Frage.`;

    askAiCoach([{ role: "user", content: contextPrompt }], { mode: "interview" })
      .then((reply) => {
        if (!cancelled) setMessages([{ role: "assistant", text: reply }]);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof AiCoachRequestError ? err.message : "Der KI Coach ist gerade nicht erreichbar.");
        }
      })
      .finally(() => {
        if (!cancelled) setSending(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || sending || ended) return;
    setInput("");
    setError(null);
    const nextMessages: ChatMessage[] = [...messages, { role: "user", text: content }];
    setMessages(nextMessages);
    setSending(true);

    const history: SimpleChatMessage[] = nextMessages.map((m) => ({ role: m.role, content: m.text }));

    try {
      const reply = await askAiCoach(history, { mode: "interview" });
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
      if (content.toLowerCase().includes("interview beenden")) {
        finishSession();
      }
    } catch (err) {
      setError(err instanceof AiCoachRequestError ? err.message : "Der KI Coach ist gerade nicht erreichbar.");
    } finally {
      setSending(false);
    }
  }

  function finishSession() {
    if (ended || !sessionId) return;
    setEnded(true);
    const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
    // Real interviews have no automated pass/fail grade here — the AI's
    // closing summary (visible in the transcript) is the actual feedback.
    // We store a neutral 0 rather than fabricating a score, since honest
    // scoring would require structured grading not yet built.
    completeSession(sessionId, 0, durationSeconds);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="flex h-full max-h-[640px] w-full max-w-2xl flex-col rounded-2xl border border-border-soft bg-panel">
        <div className="flex items-center justify-between border-b border-border-soft p-4">
          <div>
            <p className="font-bold text-text">{t("interview.mockInterviewTitle")}</p>
            <p className="text-xs text-text-faint">{path.title}{topic ? ` · ${topic.title}` : ""}</p>
          </div>
          <button
            onClick={() => {
              finishSession();
              onClose();
            }}
            className="text-text-muted hover:text-text"
          >
            <X size={20} />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  m.role === "user" ? "rounded-tr-sm bg-primary text-white" : "rounded-tl-sm bg-panel-alt text-text"
                }`}
              >
                {m.role === "assistant" ? <AiCoachMessageContent content={m.text} /> : m.text}
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-panel-alt px-4 py-3.5">
              <Loader2 size={14} className="animate-spin text-text-faint" />
            </div>
          )}
          {error && (
            <div className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
              {error}
            </div>
          )}
          {ended && (
            <div className="rounded-xl border border-success/30 bg-success-light px-4 py-3 text-sm text-success">
              {t("interview.sessionEnded")}
            </div>
          )}
        </div>

        {!ended && (
          <div className="border-t border-border-soft p-4">
            <div className="flex items-end gap-2 rounded-xl border border-border-soft bg-panel-alt p-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder={t("interview.answerPlaceholder")}
                rows={1}
                disabled={sending}
                className="max-h-28 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-text placeholder:text-text-faint focus:outline-none disabled:opacity-60"
              />
              <button
                onClick={() => send()}
                disabled={sending || !input.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white hover:bg-primary-dark disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </div>
            <button
              onClick={() => send("Interview beenden")}
              disabled={sending}
              className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-text-faint hover:text-danger disabled:opacity-40"
            >
              <Square size={11} />
              {t("interview.endInterview")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
