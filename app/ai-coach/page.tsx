"use client";

import { useEffect, useRef, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import AiCoachMessageContent from "@/components/AiCoachMessageContent";
import { useUser } from "@/components/UserContext";
import { useLocale } from "@/components/LocaleProvider";
import { useAiCoachStore } from "@/lib/store/aiCoachStore";
import { useUserProgressStore, getXpPercentile } from "@/lib/store/userProgressStore";
import { getFirstName } from "@/lib/supabase/useUser";
import {
  Lightbulb,
  ListChecks,
  Brain,
  CalendarClock,
  Mic,
  Send,
  Paperclip,
  Image as ImageIcon,
  Code2,
  FileText,
  Globe,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share2,
  Bot,
  Sparkles,
  MessageSquarePlus,
} from "lucide-react";

const streakDayLabels = ["M", "D", "M", "D", "F", "S", "S"];

const quickActions = [
  { icon: Lightbulb, titleKey: "aiCoach.qaExplainTitle", descKey: "aiCoach.qaExplainDesc", prompt: "aiCoach.qaExplainPrompt" },
  { icon: ListChecks, titleKey: "aiCoach.qaSummarizeTitle", descKey: "aiCoach.qaSummarizeDesc", prompt: "aiCoach.qaSummarizePrompt" },
  { icon: Brain, titleKey: "aiCoach.qaQuizTitle", descKey: "aiCoach.qaQuizDesc", prompt: "aiCoach.qaQuizPrompt" },
  { icon: CalendarClock, titleKey: "aiCoach.qaPlanTitle", descKey: "aiCoach.qaPlanDesc", prompt: "aiCoach.qaPlanPrompt" },
  { icon: Mic, titleKey: "aiCoach.qaInterviewTitle", descKey: "aiCoach.qaInterviewDesc", prompt: "aiCoach.qaInterviewPrompt" },
];

function AiCoachBody() {
  const { user } = useUser();
  const { t } = useLocale();
  const progress = useUserProgressStore((s) => s.progress);
  const { messages, sending, error, sendMessage, startNewConversation } = useAiCoachStore();

  const [input, setInput] = useState("");
  const [percentile, setPercentile] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const xp = progress?.xp ?? 0;
  const level = Math.max(1, Math.floor(xp / 500) + 1);
  const xpIntoLevel = xp % 500;
  const levelProgressPct = Math.round((xpIntoLevel / 500) * 100);
  const streakDaysCount = progress?.streak_days ?? 0;
  const streakDone = streakDayLabels.map((_, i) => i >= streakDayLabels.length - streakDaysCount);

  useEffect(() => {
    if (xp > 0) {
      getXpPercentile(xp).then(setPercentile);
    }
  }, [xp]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  function handleSend(text?: string) {
    const content = text ?? input;
    if (!content.trim() || sending) return;
    sendMessage(content);
    setInput("");
  }

  function handleQuickAction(promptKey: string) {
    handleSend(t(promptKey));
  }

  const hasMessages = messages.length > 0;

  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-1 flex-col lg:flex-row">
      {/* Chat column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border-soft px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-lg font-extrabold text-text sm:text-xl">
              {t("aiCoach.greeting")}, {getFirstName(user)}! 👋
            </h1>
            <p className="text-sm text-text-muted">{t("aiCoach.subtitle")}</p>
          </div>
          <button
            onClick={startNewConversation}
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-bold text-white hover:bg-primary-dark sm:px-4"
          >
            <MessageSquarePlus size={15} />
            <span className="hidden sm:inline">{t("aiCoach.newChat")}</span>
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          {!hasMessages ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {quickActions.map((qa) => (
                <button
                  key={qa.titleKey}
                  onClick={() => handleQuickAction(qa.prompt)}
                  className="flex flex-col items-start gap-2 rounded-xl border border-border-soft bg-panel p-4 text-left transition-colors hover:border-primary/40"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light text-primary">
                    <qa.icon size={17} />
                  </div>
                  <p className="text-sm font-bold text-text">{t(qa.titleKey)}</p>
                  <p className="text-xs leading-snug text-text-faint">{t(qa.descKey)}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-5">
              {messages.map((m) =>
                m.role === "user" ? (
                  <div key={m.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm text-white">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div key={m.id} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                      <Sparkles size={15} />
                    </div>
                    <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm border border-border-soft bg-panel px-4 py-3">
                      <AiCoachMessageContent content={m.content} />
                      <div className="mt-3 flex items-center gap-3 border-t border-border-soft pt-2.5 text-text-faint">
                        <button aria-label={t("aiCoach.helpful")} className="hover:text-success">
                          <ThumbsUp size={14} />
                        </button>
                        <button aria-label={t("aiCoach.notHelpful")} className="hover:text-danger">
                          <ThumbsDown size={14} />
                        </button>
                        <button
                          aria-label={t("aiCoach.copy")}
                          onClick={() => navigator.clipboard.writeText(m.content)}
                          className="hover:text-text"
                        >
                          <Copy size={14} />
                        </button>
                        <button aria-label={t("aiCoach.share")} className="hover:text-text">
                          <Share2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}

              {sending && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                    <Sparkles size={15} />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-border-soft bg-panel px-4 py-3.5">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-faint [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-faint [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-faint" />
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-border-soft px-4 py-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-end gap-2 rounded-xl border border-border-soft bg-panel p-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={t("aiCoach.inputPlaceholder")}
                rows={1}
                className="max-h-32 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-text placeholder:text-text-faint focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || sending}
                aria-label={t("aiCoach.send")}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition-colors hover:bg-primary-dark disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-text-faint">
              <span className="flex items-center gap-1">
                <Paperclip size={13} /> {t("aiCoach.attachFile")}
              </span>
              <span className="flex items-center gap-1">
                <ImageIcon size={13} /> {t("aiCoach.attachImage")}
              </span>
              <span className="flex items-center gap-1">
                <Code2 size={13} /> {t("aiCoach.attachCode")}
              </span>
              <span className="flex items-center gap-1">
                <FileText size={13} /> {t("aiCoach.attachPdf")}
              </span>
              <span className="flex items-center gap-1">
                <Globe size={13} /> {t("aiCoach.attachWeb")}
              </span>
            </div>
            <p className="mt-3 text-center text-[11px] text-text-faint">{t("aiCoach.disclaimer")}</p>
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <aside className="w-full shrink-0 space-y-4 border-t border-border-soft p-4 lg:w-80 lg:border-l lg:border-t-0 lg:p-5">
        <div className="rounded-2xl border border-border-soft bg-panel p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-text">{t("aiCoach.learningProgress")}</h2>
          </div>
          <div className="mb-1 flex items-baseline justify-between">
            <span className="text-sm text-text-muted">
              {t("aiCoach.level")} <span className="font-bold text-text">{level}</span>
            </span>
            {percentile != null && (
              <span className="flex items-center gap-1 text-xs font-semibold text-warning">
                🏆 {t("aiCoach.top")} {percentile}%
              </span>
            )}
          </div>
          <div className="h-2 w-full rounded-full bg-panel-alt">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${levelProgressPct}%` }} />
          </div>
          <p className="mt-1.5 text-xs text-text-faint">
            {xpIntoLevel} / 500 XP
          </p>
        </div>

        <div className="rounded-2xl border border-border-soft bg-panel p-4">
          <p className="mb-1 text-sm font-bold text-text">
            {streakDaysCount} <span className="font-medium text-text-muted">{t("sidebar.daysInARow")}</span> 🔥
          </p>
          <div className="mt-3 flex justify-between">
            {streakDayLabels.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                    streakDone[i] ? "bg-success-light text-success" : "bg-panel-alt text-text-faint"
                  }`}
                >
                  {streakDone[i] ? "✓" : ""}
                </span>
                <span className="text-[10px] text-text-faint">{d}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border-soft bg-panel p-4">
          <div className="mb-3 flex items-center gap-2">
            <Bot size={15} className="text-primary" />
            <h2 className="text-sm font-bold text-text">{t("aiCoach.aboutTitle")}</h2>
          </div>
          <p className="text-xs leading-relaxed text-text-faint">{t("aiCoach.aboutDesc")}</p>
        </div>
      </aside>
    </main>
  );
}

export default function AiCoachPage() {
  return (
    <DashboardShell>
      <AiCoachBody />
    </DashboardShell>
  );
}
