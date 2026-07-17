"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Share2,
  Download,
  XCircle,
  SkipForward,
  Clock3,
  Star,
  ChevronRight,
  RotateCcw,
  EyeOff,
  Trophy,
  Target,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import type { PracticeOptionId, PracticeQuestion, PracticeTopic } from "@/lib/az900Practice";
import { isSingleChoiceAnswerCorrect, correctOptionIds } from "@/lib/az900Practice";
import { getSectionCount, getSectionRange } from "@/lib/practiceSections";
import { useLocale } from "@/components/LocaleProvider";

type YesNoAnswers = Record<number, "Ja" | "Nein">;
type MatchingAnswers = Record<string, string>;
type Answer = PracticeOptionId | PracticeOptionId[] | YesNoAnswers | MatchingAnswers;

const SECTION_ICONS = [Target, BookOpen, CheckCircle2, Star, Trophy, Target];

function optionText(q: PracticeQuestion, optionId: string | undefined): string {
  if (!optionId) return "—";
  if (q.type === "matching" || q.type === "yesno") return "—";
  const opt = q.options.find((o) => o.id === optionId);
  return opt ? opt.text : "—";
}

/** Same as optionText, but for the correct-answer display, which may be
 * multiple options for a "select all that apply" question. */
function correctAnswerText(q: PracticeQuestion): string {
  if (q.type === "matching" || q.type === "yesno") return "—";
  return correctOptionIds(q)
    .map((id) => optionText(q, id))
    .join(" · ");
}

/** Same as optionText, but for displaying what the user actually
 * selected, which may be an array of option ids for a multi-select
 * question. */
function userAnswerText(q: PracticeQuestion, answer: Answer | undefined): string {
  if (q.type === "matching" || q.type === "yesno" || !answer) return "—";
  if (Array.isArray(answer)) {
    if (answer.length === 0) return "—";
    return answer.map((id) => optionText(q, id)).join(" · ");
  }
  return optionText(q, answer as string);
}

function isCorrectAnswer(q: PracticeQuestion, answer: Answer | undefined): boolean {
  if (!answer) return false;
  if (q.type === "yesno") {
    const a = answer as YesNoAnswers;
    return q.statements.every((s, i) => a[i] === s.correct);
  }
  if (q.type === "matching") {
    const a = answer as MatchingAnswers;
    return q.descriptions.every((d) => a[d.id] === d.correctItemId);
  }
  return isSingleChoiceAnswerCorrect(q, answer as PracticeOptionId | PracticeOptionId[]);
}

export default function SectionScorecard({
  sectionIndex,
  questions,
  topics,
  answers,
  checked,
  skipped,
  marked,
  elapsedSeconds,
  hasNextSection,
  onBackToPath,
  onNextSection,
  onRetry,
  onRetryQuestion,
  onViewFinalResult,
}: {
  sectionIndex: number;
  questions: PracticeQuestion[];
  topics: PracticeTopic[];
  answers: Record<string, Answer>;
  checked: Set<string>;
  skipped: Set<string>;
  marked: Set<string>;
  elapsedSeconds: number;
  hasNextSection: boolean;
  onBackToPath: () => void;
  onNextSection: () => void;
  onRetry: () => void;
  onRetryQuestion: (questionId: string) => void;
  onViewFinalResult?: () => void;
}) {
  const { t } = useLocale();
  const [filter, setFilter] = useState<"alle" | "falsch" | "uebersprungen" | "markiert">("alle");
  const [hideWrong, setHideWrong] = useState(false);

  const total = questions.length;
  const sectionCount = getSectionCount(total);
  const [start, end] = getSectionRange(total, sectionIndex);
  const sectionQuestions = questions.slice(start, end);

  const correct = sectionQuestions.filter((q) => checked.has(q.id) && isCorrectAnswer(q, answers[q.id])).length;
  const wrong = sectionQuestions.filter((q) => checked.has(q.id) && !isCorrectAnswer(q, answers[q.id])).length;
  const skippedCount = sectionQuestions.filter((q) => skipped.has(q.id) && !checked.has(q.id)).length;
  const score = correct + wrong === 0 ? 0 : Math.round((correct / (correct + wrong)) * 100);

  const wrongQuestions = sectionQuestions.filter((q) => checked.has(q.id) && !isCorrectAnswer(q, answers[q.id]));
  const skippedQuestions = sectionQuestions.filter((q) => skipped.has(q.id) && !checked.has(q.id));
  const markedQuestions = sectionQuestions.filter((q) => marked.has(q.id));

  const flagged = [...new Set([...wrongQuestions, ...skippedQuestions, ...markedQuestions])];

  const filtered =
    filter === "falsch" ? wrongQuestions : filter === "uebersprungen" ? skippedQuestions : filter === "markiert" ? markedQuestions : flagged;

  const [expanded, setExpanded] = useState(3);

  function formatElapsed(totalSeconds: number) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);
    return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
  }

  const summaryLines = [
    t("practice.resultTitle"),
    `${t("practice.sectionWord")} ${sectionIndex + 1}`,
    `${t("practice.totalScoreWord")}: ${score}%`,
    `${t("practice.correctlyAnsweredSC")}: ${correct}`,
    `${t("practice.wrongAnsweredSC")}: ${wrong}`,
    `${t("practice.skippedQ")}: ${skippedCount}`,
    `${t("practice.totalTimeSC")}: ${formatElapsed(elapsedSeconds)}`,
  ];
  const summaryText = summaryLines.join("\n");

  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => setFeedback(null), 4000);
    return () => clearTimeout(t);
  }, [feedback]);

  function legacyCopy(text: string): boolean {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  }

  async function handleShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: t("practice.myResultShared"), text: summaryText });
        setFeedback(t("practice.resultShared"));
        return;
      } catch {
        // User cancelled, or share isn't actually usable here — fall through.
      }
    }
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(summaryText);
        setFeedback(t("practice.resultCopied"));
        return;
      }
      throw new Error("no clipboard API");
    } catch {
      if (legacyCopy(summaryText)) {
        setFeedback(t("practice.resultCopied"));
      } else {
        setFeedback(t("practice.shareNotSupported"));
      }
    }
  }

  function handleDownload() {
    try {
      const blob = new Blob([summaryText], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `certcoach-ergebnis-abschnitt-${sectionIndex + 1}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setFeedback(t("practice.downloadStarted"));
    } catch {
      try {
        window.open(`data:text/plain;charset=utf-8,${encodeURIComponent(summaryText)}`, "_blank");
        setFeedback(t("practice.resultOpenedNewTab"));
      } catch {
        setFeedback(t("practice.downloadNotSupported"));
      }
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-xl border border-border-soft bg-panel p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-success-light">
            <CheckCircle2 size={22} className="text-success" />
          </div>
          <div>
            <p className="text-lg font-extrabold text-text">{t("practice.sectionCompleted").replace("{n}", String(sectionIndex + 1))}</p>
            <p className="text-sm text-text-muted">
              {t("practice.greatJob")}
            </p>
            {feedback && <p className="mt-2 text-xs font-semibold text-primary">{feedback}</p>}
          </div>
        </div>
        <div className="flex flex-none gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-lg border border-border-soft px-4 py-2 text-xs font-semibold text-text hover:border-primary"
          >
            <Share2 size={14} />
            {t("practice.shareResult")}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-dark"
          >
            <Download size={14} />
            {t("practice.downloadResult")}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-6 rounded-xl border border-border-soft bg-panel p-5 sm:flex-row">
        <ScoreRing value={score} />
        <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
          <StatBox icon={CheckCircle2} value={correct} label={t("practice.correctlyAnsweredSC")} color="text-success" bg="bg-success-light" />
          <StatBox icon={XCircle} value={wrong} label={t("practice.wrongAnsweredSC")} color="text-danger" bg="bg-danger/10" />
          <StatBox icon={SkipForward} value={skippedCount} label={t("practice.skippedQ")} color="text-warning" bg="bg-warning/10" />
          <StatBox icon={Clock3} value={formatElapsed(elapsedSeconds)} label={t("practice.totalTimeSC")} color="text-primary" bg="bg-primary-light" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <div className="rounded-xl border border-border-soft bg-panel p-5">
            <p className="font-bold text-text">{t("practice.yourProgress")}</p>
            <p className="mb-4 text-xs text-text-faint">{t("practice.earnStars")}</p>
            <div className="space-y-2">
              {Array.from({ length: sectionCount }).map((_, s) => {
                const [sStart, sEnd] = getSectionRange(total, s);
                const sQuestions = questions.slice(sStart, sEnd);
                const sCorrect = sQuestions.filter((q) => checked.has(q.id) && isCorrectAnswer(q, answers[q.id])).length;
                const sWrong = sQuestions.filter((q) => checked.has(q.id) && !isCorrectAnswer(q, answers[q.id])).length;
                const sAnswered = sCorrect + sWrong;
                const sScore = sAnswered === 0 ? null : Math.round((sCorrect / sAnswered) * 100);
                const stars = sScore === null ? 0 : Math.max(0, Math.min(5, Math.round(sScore / 20)));
                const Icon = SECTION_ICONS[s % SECTION_ICONS.length];
                const topicCounts = new Map<string, number>();
                sQuestions.forEach((q) => topicCounts.set(q.topicId, (topicCounts.get(q.topicId) ?? 0) + 1));
                const dominantTopicId = [...topicCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
                const sectionSubtitle = topics.find((tp) => tp.id === dominantTopicId)?.title ?? t("practice.practiceExam");

                return (
                  <div
                    key={s}
                    className={`flex items-center gap-3 rounded-lg border p-3 ${
                      s === sectionIndex ? "border-primary bg-primary-light" : "border-border-soft"
                    }`}
                  >
                    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-panel-alt">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-text">{t("practice.sectionWord")} {s + 1}</p>
                      <p className="truncate text-[11px] text-text-faint">{sectionSubtitle}</p>
                      <div className="mt-0.5 flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={11} className={i < stars ? "fill-warning text-warning" : "text-text-faint"} />
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-none items-center gap-2">
                      <span className="text-xs font-bold text-text">{sScore === null ? "–" : `${sScore}%`}</span>
                      <ChevronRight size={14} className="text-text-faint" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-border-soft bg-panel p-5">
            <p className="mb-1 font-bold text-text">{t("practice.stayMotivated")}</p>
            <p className="mb-4 text-xs text-text-muted">
              {t("practice.everyAnswer")}
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <Motivation icon={Trophy} title={t("practice.youCanDoIt")} desc={t("practice.youCanDoItDesc")} />
              <Motivation icon={Target} title={t("practice.beConsistent")} desc={t("practice.beConsistentDesc")} />
              <Motivation icon={BookOpen} title={t("practice.learnFromMistakes")} desc={t("practice.learnFromMistakesDesc")} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border-soft bg-panel p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="flex items-center gap-2 font-bold text-text">
              {t("practice.wrongQuestionsTitle")}
              <span className="rounded-full bg-danger/15 px-2 py-0.5 text-xs font-bold text-danger">{wrong}</span>
            </p>
          </div>

          <div className="mb-3 flex flex-wrap gap-2 text-xs">
            <FilterTab active={filter === "alle"} onClick={() => setFilter("alle")} label={`${t("practice.filterAll")} (${flagged.length})`} activeColor="bg-text text-white" />
            <FilterTab
              active={filter === "falsch"}
              onClick={() => setFilter("falsch")}
              label={`${t("practice.filterWrong")} (${wrongQuestions.length})`}
              icon={XCircle}
              activeColor="bg-danger text-white"
              tint="border-danger/30 text-danger"
            />
            <FilterTab
              active={filter === "uebersprungen"}
              onClick={() => setFilter("uebersprungen")}
              label={`${t("practice.filterSkipped")} (${skippedQuestions.length})`}
              icon={SkipForward}
              activeColor="bg-warning text-white"
              tint="border-warning/30 text-warning"
            />
            <FilterTab
              active={filter === "markiert"}
              onClick={() => setFilter("markiert")}
              label={`${t("practice.filterMarked")} (${markedQuestions.length})`}
              icon={Star}
              activeColor="bg-primary text-white"
              tint="border-primary/30 text-primary"
            />
          </div>

          <button
            onClick={() => setHideWrong((v) => !v)}
            className="mb-3 flex items-center gap-1.5 rounded-lg border border-border-soft px-3 py-1.5 text-xs font-semibold text-text-muted hover:border-primary"
          >
            <EyeOff size={13} />
            {hideWrong ? t("practice.showErrors") : t("practice.hideErrors")}
          </button>

          {!hideWrong && (
            <div className="space-y-3">
              {filtered.length === 0 && (
                <p className="py-6 text-center text-sm text-text-faint">{t("practice.noQuestionsInCategory")}</p>
              )}
              {filtered.slice(0, expanded).map((q) => {
                const globalIndex = questions.findIndex((x) => x.id === q.id);
                const wasWrong = checked.has(q.id) && !isCorrectAnswer(q, answers[q.id]);
                const wasSkipped = skipped.has(q.id) && !checked.has(q.id);
                return (
                  <div key={q.id} className="rounded-lg border border-border-soft p-3">
                    <div className="mb-1.5 flex items-center justify-between">
                      <p className="text-xs font-semibold text-text-faint">{t("practice.questionN").replace("{n}", String(globalIndex + 1))}</p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          wasWrong ? "bg-danger/15 text-danger" : wasSkipped ? "bg-warning/15 text-warning" : "bg-primary-light text-primary"
                        }`}
                      >
                        {wasWrong ? t("practice.filterWrong") : wasSkipped ? t("practice.filterSkipped") : t("practice.filterMarked")}
                      </span>
                    </div>
                    <p className="mb-2 text-sm text-text">{q.prompt}</p>
                    {wasWrong && q.type !== "matching" && q.type !== "yesno" && (
                      <div className="mb-2 space-y-1 text-xs">
                        <p className="text-danger">
                          {t("practice.yourAnswer")}: <span className="font-semibold">{userAnswerText(q, answers[q.id])}</span>
                        </p>
                        <p className="text-success">
                          {t("practice.correctAnswerSC")}: <span className="font-semibold">{correctAnswerText(q)}</span>
                        </p>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onRetryQuestion(q.id)}
                        className="flex items-center gap-1.5 rounded-lg border border-primary/40 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary-light"
                      >
                        <RotateCcw size={12} />
                        {t("practice.retryBtn")}
                      </button>
                      {q.resources && q.resources[0] && (
                        <a
                          href={q.resources[0].url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark"
                        >
                          {t("practice.moreInDocs")}
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
              {filtered.length > expanded && (
                <button
                  onClick={() => setExpanded((v) => v + 5)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-border-soft py-2 text-xs font-semibold text-text-muted hover:border-primary"
                >
                  + {filtered.length - expanded} {t("practice.moreQuestions")}
                  <ChevronRight size={12} className="rotate-90" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onBackToPath}
          className="flex-1 rounded-lg border border-border-soft py-3 text-sm font-semibold text-text hover:border-primary"
        >
          {t("practice.backToPath")}
        </button>
        {hasNextSection ? (
          <button
            onClick={onNextSection}
            className="flex-1 rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-primary-dark"
          >
            {t("practice.nextSectionBtn")}
          </button>
        ) : (
          onViewFinalResult && (
            <button
              onClick={onViewFinalResult}
              className="flex-1 rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-primary-dark"
            >
              {t("practice.viewFinalResultBtn")}
            </button>
          )
        )}
        <button
          onClick={onRetry}
          className="flex-1 rounded-lg border border-border-soft py-3 text-sm font-semibold text-text hover:border-primary"
        >
          <span className="inline-flex items-center gap-1.5">
            <RotateCcw size={14} />
            {t("practice.practiceAgain")}
          </span>
        </button>
      </div>
    </div>
  );
}

function ScoreRing({ value }: { value: number }) {
  const { t } = useLocale();
  const r = 44;
  const c = 2 * Math.PI * r;
  const color = value >= 80 ? "#22c55e" : value >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div className="relative flex h-32 w-32 flex-none items-center justify-center">
      <svg viewBox="0 0 100 100" className="h-32 w-32 -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-panel-alt)" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-extrabold text-text">{value}%</span>
        <span className="text-[10px] text-text-faint">{t("practice.overallScoreSC")}</span>
      </div>
    </div>
  );
}

function StatBox({
  icon: Icon,
  value,
  label,
  color,
  bg,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: number | string;
  label: string;
  color: string;
  bg: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center sm:items-start sm:text-left">
      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${bg}`}>
        <Icon size={15} className={color} />
      </div>
      <p className="text-lg font-extrabold text-text">{value}</p>
      <p className="text-[11px] text-text-muted">{label}</p>
    </div>
  );
}

function Motivation({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div>
      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
        <Icon size={17} className="text-primary" />
      </div>
      <p className="text-xs font-bold text-text">{title}</p>
      <p className="mt-1 text-[10px] text-text-faint">{desc}</p>
    </div>
  );
}

function FilterTab({
  active,
  onClick,
  label,
  icon: Icon,
  activeColor = "bg-primary text-white",
  tint = "border-border-soft text-text-muted",
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: React.ComponentType<{ size?: number }>;
  activeColor?: string;
  tint?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-semibold transition ${
        active ? `border-transparent ${activeColor}` : `${tint} hover:opacity-80`
      }`}
    >
      {Icon && <Icon size={12} />}
      {label}
    </button>
  );
}
