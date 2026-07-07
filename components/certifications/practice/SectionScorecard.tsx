"use client";

import { useState } from "react";
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
import type { PracticeOptionId, PracticeQuestion } from "@/lib/az900Practice";
import { getSectionCount, getSectionRange } from "@/lib/practiceSections";

type YesNoAnswers = Record<number, "Ja" | "Nein">;
type MatchingAnswers = Record<string, string>;
type Answer = PracticeOptionId | YesNoAnswers | MatchingAnswers;

const SECTION_ICONS = [Target, BookOpen, CheckCircle2, Star, Trophy, Target];

function optionText(q: PracticeQuestion, optionId: string | undefined): string {
  if (!optionId) return "—";
  if (q.type === "matching" || q.type === "yesno") return "—";
  const opt = q.options.find((o) => o.id === optionId);
  return opt ? opt.text : "—";
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
  return answer === q.correct;
}

export default function SectionScorecard({
  sectionIndex,
  questions,
  answers,
  checked,
  skipped,
  marked,
  elapsedSeconds,
  hasNextSection,
  onBackToPath,
  onNextSection,
  onRetry,
}: {
  sectionIndex: number;
  questions: PracticeQuestion[];
  answers: Record<string, Answer>;
  checked: Set<string>;
  skipped: Set<string>;
  marked: Set<string>;
  elapsedSeconds: number;
  hasNextSection: boolean;
  onBackToPath: () => void;
  onNextSection: () => void;
  onRetry: () => void;
}) {
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

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-xl border border-border-soft bg-panel p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-success-light">
            <CheckCircle2 size={22} className="text-success" />
          </div>
          <div>
            <p className="text-lg font-extrabold text-text">Abschnitt {sectionIndex + 1} abgeschlossen!</p>
            <p className="text-sm text-text-muted">
              Großartig! Du bist auf dem richtigen Weg. Bleib dran und erreiche dein Ziel! 🚀
            </p>
          </div>
        </div>
        <div className="flex flex-none gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-border-soft px-4 py-2 text-xs font-semibold text-text hover:border-primary">
            <Share2 size={14} />
            Ergebnis teilen
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-dark">
            <Download size={14} />
            Ergebnis herunterladen
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-6 rounded-xl border border-border-soft bg-panel p-5 sm:flex-row">
        <ScoreRing value={score} />
        <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
          <StatBox icon={CheckCircle2} value={correct} label="Richtig beantwortet" color="text-success" bg="bg-success-light" />
          <StatBox icon={XCircle} value={wrong} label="Falsch beantwortet" color="text-danger" bg="bg-danger/10" />
          <StatBox icon={SkipForward} value={skippedCount} label="Übersprungen" color="text-warning" bg="bg-warning/10" />
          <StatBox icon={Clock3} value={formatElapsed(elapsedSeconds)} label="Gesamtzeit" color="text-primary" bg="bg-primary-light" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <div className="rounded-xl border border-border-soft bg-panel p-5">
            <p className="font-bold text-text">Dein Fortschritt</p>
            <p className="mb-4 text-xs text-text-faint">Verdiene Sterne, indem du jeden Abschnitt abschließt.</p>
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
                      <p className="truncate text-sm font-semibold text-text">Abschnitt {s + 1}</p>
                      <div className="flex items-center gap-0.5">
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
            <p className="mb-1 font-bold text-text">Bleib motiviert!</p>
            <p className="mb-4 text-xs text-text-muted">
              Jede Antwort bringt dich deinem Ziel näher. Bleib fokussiert und glaub an dich!
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <Motivation icon={Trophy} title="Du schaffst das!" desc="Dein Einsatz heute zahlt sich morgen aus." />
              <Motivation icon={Target} title="Sei konsequent" desc="Tägliche Übung führt zum Erfolg." />
              <Motivation icon={BookOpen} title="Lerne aus Fehlern" desc="Jeder Fehler ist eine Chance zu wachsen." />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border-soft bg-panel p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="flex items-center gap-2 font-bold text-text">
              Falsch beantwortete Fragen
              <span className="rounded-full bg-danger/15 px-2 py-0.5 text-xs font-bold text-danger">{wrong}</span>
            </p>
          </div>

          <div className="mb-3 flex flex-wrap gap-2 text-xs">
            <FilterTab active={filter === "alle"} onClick={() => setFilter("alle")} label={`Alle (${flagged.length})`} />
            <FilterTab active={filter === "falsch"} onClick={() => setFilter("falsch")} label={`Falsch (${wrongQuestions.length})`} icon={XCircle} />
            <FilterTab
              active={filter === "uebersprungen"}
              onClick={() => setFilter("uebersprungen")}
              label={`Übersprungen (${skippedQuestions.length})`}
              icon={SkipForward}
            />
            <FilterTab active={filter === "markiert"} onClick={() => setFilter("markiert")} label={`Markiert (${markedQuestions.length})`} icon={Star} />
          </div>

          <button
            onClick={() => setHideWrong((v) => !v)}
            className="mb-3 flex items-center gap-1.5 rounded-lg border border-border-soft px-3 py-1.5 text-xs font-semibold text-text-muted hover:border-primary"
          >
            <EyeOff size={13} />
            {hideWrong ? "Fehler anzeigen" : "Fehler verstecken"}
          </button>

          {!hideWrong && (
            <div className="space-y-3">
              {filtered.length === 0 && (
                <p className="py-6 text-center text-sm text-text-faint">Keine Fragen in dieser Kategorie.</p>
              )}
              {filtered.slice(0, expanded).map((q) => {
                const globalIndex = questions.findIndex((x) => x.id === q.id);
                const wasWrong = checked.has(q.id) && !isCorrectAnswer(q, answers[q.id]);
                const wasSkipped = skipped.has(q.id) && !checked.has(q.id);
                return (
                  <div key={q.id} className="rounded-lg border border-border-soft p-3">
                    <div className="mb-1.5 flex items-center justify-between">
                      <p className="text-xs font-semibold text-text-faint">Frage {globalIndex + 1}</p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          wasWrong ? "bg-danger/15 text-danger" : wasSkipped ? "bg-warning/15 text-warning" : "bg-primary-light text-primary"
                        }`}
                      >
                        {wasWrong ? "Falsch" : wasSkipped ? "Übersprungen" : "Markiert"}
                      </span>
                    </div>
                    <p className="mb-2 text-sm text-text">{q.prompt}</p>
                    {wasWrong && q.type !== "matching" && q.type !== "yesno" && (
                      <div className="mb-2 space-y-1 text-xs">
                        <p className="text-danger">
                          Deine Antwort: <span className="font-semibold">{optionText(q, answers[q.id] as PracticeOptionId)}</span>
                        </p>
                        <p className="text-success">
                          Richtige Antwort: <span className="font-semibold">{optionText(q, q.correct)}</span>
                        </p>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1.5 rounded-lg border border-primary/40 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary-light">
                        <RotateCcw size={12} />
                        Wiederholen
                      </button>
                      {q.resources && q.resources[0] && (
                        <a
                          href={q.resources[0].url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark"
                        >
                          Mehr erfahren in Microsoft Docs
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
                  className="w-full rounded-lg border border-border-soft py-2 text-xs font-semibold text-text-muted hover:border-primary"
                >
                  + {filtered.length - expanded} weitere Fragen
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
          ← Zurück zum Lernpfad
        </button>
        {hasNextSection && (
          <button
            onClick={onNextSection}
            className="flex-1 rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-primary-dark"
          >
            Nächsten Abschnitt starten
          </button>
        )}
        <button
          onClick={onRetry}
          className="flex-1 rounded-lg border border-border-soft py-3 text-sm font-semibold text-text hover:border-primary"
        >
          <span className="inline-flex items-center gap-1.5">
            <RotateCcw size={14} />
            Erneut üben
          </span>
        </button>
      </div>
    </div>
  );
}

function ScoreRing({ value }: { value: number }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative flex h-32 w-32 flex-none items-center justify-center">
      <svg viewBox="0 0 100 100" className="h-32 w-32 -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-panel-alt)" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#22c55e"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-extrabold text-text">{value}%</span>
        <span className="text-[10px] text-text-faint">Gesamtpunktzahl</span>
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
    <div className={`rounded-lg p-3 ${bg}`}>
      <Icon size={15} className={color} />
      <p className={`mt-1.5 text-lg font-extrabold ${color}`}>{value}</p>
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
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: React.ComponentType<{ size?: number }>;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition ${
        active ? "bg-primary text-white" : "border border-border-soft text-text-muted hover:border-primary"
      }`}
    >
      {Icon && <Icon size={12} />}
      {label}
    </button>
  );
}
