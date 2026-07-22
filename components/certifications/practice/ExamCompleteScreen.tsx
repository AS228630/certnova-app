"use client";

import { useState } from "react";
import {
  Download,
  Share2,
  CheckCircle2,
  XCircle,
  SkipForward,
  Clock3,
  Trophy,
  Target,
  BookOpen,
  ChevronLeft,
  GraduationCap,
  ClipboardList,
  Award,
  PartyPopper,
} from "lucide-react";
import Link from "next/link";
import type { PracticeOptionId, PracticeQuestion, PracticeTopic } from "@/lib/az900Practice";
import { isSingleChoiceAnswerCorrect } from "@/lib/az900Practice";
import { getCompanyIcon } from "@/lib/vendorIcons";

type YesNoAnswers = Record<number, "Ja" | "Nein">;
type MatchingAnswers = Record<string, string>;
type Answer = PracticeOptionId | PracticeOptionId[] | YesNoAnswers | MatchingAnswers;

const PASS_THRESHOLD = 70;
const CONGRATS_THRESHOLD = 90;

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

export default function ExamCompleteScreen({
  companySlug,
  certCode,
  certTitle,
  questions,
  topics,
  answers,
  checked,
  skipped,
  elapsedSeconds,
  onBackToPath,
  onRetryAll,
}: {
  companySlug: string;
  companyName: string;
  certCode: string;
  certTitle: string;
  questions: PracticeQuestion[];
  topics: PracticeTopic[];
  answers: Record<string, Answer>;
  checked: Set<string>;
  skipped: Set<string>;
  elapsedSeconds: number;
  onBackToPath: () => void;
  onRetryAll: () => void;
}) {
  const [feedback, setFeedback] = useState<string | null>(null);

  const total = questions.length;
  const correct = questions.filter((q) => checked.has(q.id) && isCorrectAnswer(q, answers[q.id])).length;
  const wrong = questions.filter((q) => checked.has(q.id) && !isCorrectAnswer(q, answers[q.id])).length;
  const skippedCount = questions.filter((q) => skipped.has(q.id) && !checked.has(q.id)).length;
  const answeredTotal = correct + wrong;
  const score = answeredTotal === 0 ? 0 : Math.round((correct / answeredTotal) * 100);
  const passed = score >= PASS_THRESHOLD;
  const isHighScore = score >= CONGRATS_THRESHOLD;

  const topicStats = topics.map((t) => {
    const tQuestions = questions.filter((q) => q.topicId === t.id);
    const tCorrect = tQuestions.filter((q) => checked.has(q.id) && isCorrectAnswer(q, answers[q.id])).length;
    const tAnswered = tQuestions.filter((q) => checked.has(q.id)).length;
    const pct = tAnswered === 0 ? 0 : Math.round((tCorrect / tAnswered) * 100);
    return { title: t.title, pct, answered: tAnswered };
  });

  function formatElapsed(s: number) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    return [h, m, sec].map((n) => String(n).padStart(2, "0")).join(":");
  }

  const dateStr = new Date().toLocaleString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // The actual content that goes into the downloaded/shared result — this
  // is what changes based on real performance: a genuinely strong result
  // (>= 90%) gets the congratulatory message; anything else gets the
  // encouraging one. Never both, and never the wrong one for the score.
  const congratsLines = [
    "Herzlichen Glückwunsch!",
    "Du hast es geschafft! Deine harte Arbeit hat sich ausgezahlt.",
    "- Du hast das Wissen — jetzt kommt die Zertifizierung.",
    "- Bleib fokussiert und gib nicht auf.",
    "- Jeder Schritt bringt dich näher zum Ziel!",
    "Du bist bereit für die nächste Herausforderung!",
  ];
  const encourageLines = [
    "Nicht aufgegeben — weiter geht's!",
    "Jedes Ergebnis ist eine Chance, besser zu werden. Du bist auf dem richtigen Weg.",
    "- Fehler sind Lernchancen, keine Rückschläge.",
    "- Übung macht den Meister — gib nicht auf!",
    "- Mit jedem Versuch wirst du stärker!",
    "Du schaffst das! Wir glauben an dich.",
  ];
  const resultMessageLines = isHighScore ? congratsLines : encourageLines;

  const summaryText = [
    `CertCoach – Ergebnis`,
    `${certCode}: ${certTitle} – Practice Exam (${total} Fragen)`,
    `Abgeschlossen am: ${dateStr}`,
    ``,
    `Gesamtpunktzahl: ${score}% (${passed ? "Bestanden" : "Nicht bestanden"})`,
    `Richtig beantwortet: ${correct}`,
    `Falsch beantwortet: ${wrong}`,
    `Übersprungen: ${skippedCount}`,
    `Gesamtzeit: ${formatElapsed(elapsedSeconds)}`,
    ``,
    `Leistung nach Themen:`,
    ...topicStats.map((t) => `- ${t.title}: ${t.answered > 0 ? t.pct + "%" : "keine Daten"}`),
    ``,
    ...resultMessageLines,
  ].join("\n");

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
        await navigator.share({ title: "Mein CertCoach Ergebnis", text: summaryText });
        setFeedback("Ergebnis geteilt!");
        return;
      } catch {
        // fall through
      }
    }
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(summaryText);
        setFeedback("Ergebnis wurde in die Zwischenablage kopiert.");
        return;
      }
      throw new Error("no clipboard API");
    } catch {
      setFeedback(legacyCopy(summaryText) ? "Ergebnis wurde in die Zwischenablage kopiert." : "Teilen wird von diesem Browser nicht unterstützt.");
    }
  }

  function handleDownload() {
    try {
      const blob = new Blob([summaryText], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `certcoach-ergebnis-${certCode.toLowerCase()}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setFeedback("Download gestartet.");
    } catch {
      try {
        window.open(`data:text/plain;charset=utf-8,${encodeURIComponent(summaryText)}`, "_blank");
        setFeedback("Ergebnis in neuem Tab geöffnet — dort speichern.");
      } catch {
        setFeedback("Download wird von diesem Browser nicht unterstützt.");
      }
    }
  }

  const companyIconEl = getCompanyIcon(companySlug, 28);
  const scoreColor = score >= PASS_THRESHOLD ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const r = 60;
  const c = 2 * Math.PI * r;

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button onClick={onBackToPath} className="flex items-center gap-1.5 text-sm font-semibold text-text-muted hover:text-text">
          <ChevronLeft size={15} />
          Zurück zur Praxis
        </button>
      </div>

      <div className="mb-4 flex flex-col items-center gap-4 rounded-2xl border border-border-soft bg-panel p-6 text-center sm:flex-row sm:items-center sm:text-left">
        <div className="flex-1">
          <p className="flex items-center justify-center gap-2 text-2xl font-extrabold text-text sm:justify-start">
            Dein Ergebnis ist bereit!
            <PartyPopper size={22} className="text-warning" />
          </p>
          <p className="mt-1 text-sm text-text-muted">Großartig! Du bist auf dem richtigen Weg. Bleib dran und erreiche dein Ziel! 🚀</p>
          {feedback && <p className="mt-2 text-xs font-semibold text-primary">{feedback}</p>}
          <div className="mt-4 flex justify-center gap-2 sm:justify-start">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-2xl px-4 py-2 text-xs font-bold text-white shadow-[0_4px_14px_rgba(124,58,237,0.35)] transition-all duration-200 ease-in-out hover:brightness-110"
              style={{ background: "linear-gradient(90deg, #7C3AED 0%, #3B82F6 100%)" }}
            >
              <Download size={14} />
              Ergebnis herunterladen
            </button>
            <button onClick={handleShare} className="flex items-center gap-1.5 rounded-lg border border-border-soft px-4 py-2 text-xs font-semibold text-text hover:border-primary">
              <Share2 size={14} />
              Ergebnis teilen
            </button>
          </div>
        </div>
        <div className="flex h-28 w-28 flex-none items-center justify-center rounded-full bg-primary-light">
          <Award size={48} className="text-primary" />
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-border-soft bg-panel p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {companyIconEl}
          <div>
            <p className="font-bold text-text">
              {certCode}: {certTitle}
            </p>
            <p className="text-xs text-text-faint">Practice Exam • {total} Fragen</p>
          </div>
        </div>
        <div className="text-left text-xs text-text-faint sm:text-right">
          <p>Abgeschlossen am</p>
          <p className="font-semibold text-text-muted">{dateStr}</p>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col items-center justify-center rounded-xl border border-border-soft bg-panel p-6">
          <div className="relative flex h-40 w-40 items-center justify-center">
            <svg viewBox="0 0 140 140" className="h-40 w-40 -rotate-90">
              <circle cx="70" cy="70" r={r} fill="none" stroke="var(--color-panel-alt)" strokeWidth="10" />
              <circle
                cx="70"
                cy="70"
                r={r}
                fill="none"
                stroke={scoreColor}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={c}
                strokeDashoffset={c * (1 - score / 100)}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold text-text">{score}%</span>
              <span className="text-[11px] text-text-faint">Gesamtpunktzahl</span>
            </div>
          </div>
          <div className="mt-4 grid w-full grid-cols-2 gap-3 text-sm">
            <Stat icon={CheckCircle2} value={correct} label="Richtig beantwortet" color="text-success" />
            <Stat icon={XCircle} value={wrong} label="Falsch beantwortet" color="text-danger" />
            <Stat icon={SkipForward} value={skippedCount} label="Übersprungen" color="text-warning" />
            <Stat icon={Clock3} value={formatElapsed(elapsedSeconds)} label="Gesamtzeit" color="text-primary" />
          </div>
          <span
            className={`mt-4 rounded-full px-4 py-1.5 text-xs font-bold ${
              passed ? "bg-success-light text-success" : "bg-danger/10 text-danger"
            }`}
          >
            {passed ? "✓ Bestanden!" : "Noch nicht bestanden"}
          </span>
        </div>

        <div className="rounded-xl border border-border-soft bg-panel p-5">
          <p className="mb-4 font-bold text-text">Leistung nach Themen</p>
          <div className="space-y-3">
            {topicStats.map((t) => (
              <div key={t.title}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-text-muted">{t.title}</span>
                  <span className="font-semibold text-text">{t.answered > 0 ? `${t.pct}%` : "–"}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-panel-alt">
                  <div
                    className={`h-2 rounded-full ${t.pct >= 80 ? "bg-success" : t.pct >= 50 ? "bg-warning" : "bg-danger"}`}
                    style={{ width: `${t.answered > 0 ? t.pct : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4 rounded-xl border border-border-soft bg-panel p-5">
        <p className="mb-4 font-bold text-text">Deine Stärken auf einen Blick</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Strength icon={Trophy} title="Stark gemacht!" desc="Du hast bewiesen, dass du die Kernkonzepte verstanden hast." />
          <Strength icon={Target} title="Weiter so!" desc="Kontinuität ist der Schlüssel zum Erfolg. Du bist auf dem besten Weg!" />
          <Strength icon={BookOpen} title="Lernen & Wachsen" desc="Analysiere deine Fehler und vertiefe dein Wissen in den schwächeren Themen." />
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-success/30 bg-success-light p-5">
          <p className="mb-1 flex items-center gap-1.5 font-bold text-success">🎉 Herzlichen Glückwunsch!</p>
          <p className="mb-3 text-sm text-text-muted">Du hast es geschafft! Deine harte Arbeit hat sich ausgezahlt.</p>
          <ul className="mb-3 space-y-1.5 text-xs text-text-muted">
            <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-success" /> Du hast das Wissen — jetzt kommt die Zertifizierung.</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-success" /> Bleib fokussiert und gib nicht auf.</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-success" /> Jeder Schritt bringt dich näher zum Ziel!</li>
          </ul>
          <div className="rounded-lg bg-success/15 py-2 text-center text-xs font-bold text-success">Du bist bereit für die nächste Herausforderung! 🚀</div>
        </div>
        <div className="rounded-xl border border-warning/30 bg-warning/10 p-5">
          <p className="mb-1 flex items-center gap-1.5 font-bold text-warning">💪 Nicht aufgegeben – weiter geht&apos;s!</p>
          <p className="mb-3 text-sm text-text-muted">Jedes Ergebnis ist eine Chance, besser zu werden. Du bist auf dem richtigen Weg.</p>
          <ul className="mb-3 space-y-1.5 text-xs text-text-muted">
            <li className="flex items-center gap-1.5"><Target size={13} className="text-warning" /> Fehler sind Lernchancen, keine Rückschläge.</li>
            <li className="flex items-center gap-1.5"><Target size={13} className="text-warning" /> Übung macht den Meister — gib nicht auf!</li>
            <li className="flex items-center gap-1.5"><Target size={13} className="text-warning" /> Mit jedem Versuch wirst du stärker!</li>
          </ul>
          <div className="rounded-lg bg-warning/20 py-2 text-center text-xs font-bold text-warning">Du schaffst das! Wir glauben an dich. ☀️</div>
        </div>
      </div>

      <p className="mb-3 text-center text-sm font-semibold text-text-muted">Was möchtest du als Nächstes tun?</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <button onClick={onRetryAll} className="flex items-center gap-3 rounded-xl border border-border-soft bg-panel p-4 text-left hover:border-primary">
          <GraduationCap size={20} className="text-primary" />
          <div>
            <p className="text-sm font-bold text-text">Themen wiederholen</p>
            <p className="text-xs text-text-faint">Schwächen gezielt trainieren</p>
          </div>
        </button>
        <button onClick={onRetryAll} className="flex items-center gap-3 rounded-xl border border-border-soft bg-panel p-4 text-left hover:border-primary">
          <ClipboardList size={20} className="text-primary" />
          <div>
            <p className="text-sm font-bold text-text">Weitere Praxis</p>
            <p className="text-xs text-text-faint">Neue Übung starten</p>
          </div>
        </button>
        <Link href={`/certifications/${companySlug}`} className="flex items-center gap-3 rounded-xl border border-border-soft bg-panel p-4 hover:border-primary">
          <Award size={20} className="text-primary" />
          <div>
            <p className="text-sm font-bold text-text">Zur Zertifizierung</p>
            <p className="text-xs text-text-faint">Dein nächster Schritt</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: number | string;
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} className={color} />
      <div>
        <p className={`text-sm font-extrabold ${color}`}>{value}</p>
        <p className="text-[10px] text-text-faint">{label}</p>
      </div>
    </div>
  );
}

function Strength({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary-light">
        <Icon size={18} className="text-primary" />
      </div>
      <div>
        <p className="text-sm font-bold text-text">{title}</p>
        <p className="mt-0.5 text-xs text-text-faint">{desc}</p>
      </div>
    </div>
  );
}
