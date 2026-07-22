"use client";

import { useEffect } from "react";
import { X, CheckCircle2, XCircle, MinusCircle, ListChecks, TrendingUp, Flame, Clock3, Target, Percent } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

type Status = "correct" | "wrong" | "marked" | "skipped" | "unanswered";

// Slide-in drawer from the right — per the frontend spec, this is where
// ALL exam statistics live so the main page can stay 100% focused on the
// question. Everything shown is computed from real, already-tracked data
// (per-question correctness, elapsed time). Two spec'd metrics —
// "Average Response Time" and a real calendar-time progress chart —
// aren't implemented because the app doesn't track per-question timing
// or session history yet; rather than invent numbers, the line chart
// uses real in-session data (cumulative accuracy across the section's
// questions in order) and Average Response Time is left out entirely.
export default function SectionStatsPanel({
  start,
  end,
  statusFor,
  elapsedSeconds,
  open,
  onClose,
}: {
  start: number;
  end: number;
  statusFor: (index: number) => Status;
  elapsedSeconds: number;
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLocale();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Real per-question sequence for this section, in order.
  const sequence: Array<"correct" | "wrong" | "unanswered"> = [];
  for (let i = start; i < end; i++) {
    const st = statusFor(i);
    sequence.push(st === "correct" ? "correct" : st === "wrong" ? "wrong" : "unanswered");
  }

  const correct = sequence.filter((s) => s === "correct").length;
  const wrong = sequence.filter((s) => s === "wrong").length;
  const total = sequence.length;
  const unanswered = total - correct - wrong;
  const resolved = correct + wrong;
  const pct = total === 0 ? 0 : Math.round((resolved / total) * 100);
  const accuracy = resolved === 0 ? 0 : Math.round((correct / resolved) * 100);
  const completionRate = total === 0 ? 0 : Math.round((resolved / total) * 100);
  const circumference = 2 * Math.PI * 46;

  // Best streak: longest run of consecutive "correct" among ANSWERED
  // questions only (unanswered ones don't break or extend a streak,
  // since they simply haven't been attempted yet).
  let bestStreak = 0;
  let currentStreak = 0;
  for (const s of sequence) {
    if (s === "correct") {
      currentStreak++;
      bestStreak = Math.max(bestStreak, currentStreak);
    } else if (s === "wrong") {
      currentStreak = 0;
    }
  }

  // Cumulative-accuracy trend across answered questions, in order — a
  // real, derived "progress over time" line, using actual answer data
  // instead of a fabricated history.
  const trendPoints: number[] = [];
  let runningCorrect = 0;
  let runningAnswered = 0;
  for (const s of sequence) {
    if (s === "unanswered") continue;
    runningAnswered++;
    if (s === "correct") runningCorrect++;
    trendPoints.push(Math.round((runningCorrect / runningAnswered) * 100));
  }

  const studyMinutes = Math.round(elapsedSeconds / 60);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/45 backdrop-blur-[8px] transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-[420px] flex-col border-l border-border-soft bg-panel shadow-2xl transition-transform duration-[250ms] ease-in-out md:max-w-[360px] lg:max-w-[420px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-border-soft px-5 py-4">
          <span className="text-base font-bold text-text">{t("practice.progressOverview")}</span>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-faint hover:bg-panel-alt hover:text-text"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {/* Card 1: progress circle */}
          <div className="flex flex-col items-center rounded-2xl border border-border-soft bg-panel-alt/40 py-6">
            <svg width="120" height="120" viewBox="0 0 100 100" className="-rotate-90">
              <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-panel-alt)" strokeWidth="7" />
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="url(#statsGradient)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (pct / 100) * circumference}
                className="transition-all duration-300 ease-in-out"
              />
              <defs>
                <linearGradient id="statsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
            <p className="-mt-[72px] text-3xl font-extrabold text-text">{pct}%</p>
            <p className="mt-[72px] text-xs text-text-faint">{t("practice.sectionProgress")}</p>
          </div>

          {/* Card 2: answer breakdown */}
          <div className="space-y-2 rounded-2xl border border-border-soft bg-panel-alt/40 p-4">
            <StatRow icon={CheckCircle2} iconColor="text-success" label={t("practice.correctlyAnswered")} value={correct} />
            <StatRow icon={XCircle} iconColor="text-danger" label={t("practice.wronglyAnswered")} value={wrong} />
            <StatRow icon={MinusCircle} iconColor="text-text-faint" label={t("practice.notAnswered")} value={unanswered} />
            <StatRow icon={ListChecks} iconColor="text-accent-blue" label={t("practice.totalQuestions")} value={total} />
          </div>

          {/* Card 3: real cumulative-accuracy trend across answered questions */}
          <div className="rounded-2xl border border-border-soft bg-panel-alt/40 p-4">
            <p className="mb-3 flex items-center gap-1.5 text-[13px] font-bold text-text">
              <TrendingUp size={14} className="text-primary" />
              {t("practice.progressTrend")}
            </p>
            {trendPoints.length >= 2 ? (
              <TrendLine points={trendPoints} />
            ) : (
              <p className="py-6 text-center text-xs text-text-faint">{t("practice.trendNotEnoughData")}</p>
            )}
          </div>

          {/* Card 4: performance metrics — all computed from real data.
              Average Response Time intentionally omitted (not tracked). */}
          <div className="grid grid-cols-2 gap-2.5 rounded-2xl border border-border-soft bg-panel-alt/40 p-4">
            <MetricBox icon={Percent} label={t("practice.accuracyMetric")} value={`${accuracy}%`} />
            <MetricBox icon={Flame} label={t("practice.bestStreakMetric")} value={String(bestStreak)} />
            <MetricBox icon={Clock3} label={t("practice.studyTimeMetric")} value={`${studyMinutes} ${t("practice.minutesShort")}`} />
            <MetricBox icon={Target} label={t("practice.completionRateMetric")} value={`${completionRate}%`} />
          </div>
        </div>

        <div className="flex gap-3 border-t border-border-soft p-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-border-soft py-2.5 text-sm font-semibold text-text hover:bg-panel-alt"
          >
            {t("practice.closeDrawer")}
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-xl py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(124,58,237,0.35)] transition-all duration-200 ease-in-out hover:brightness-110"
            style={{ background: "linear-gradient(90deg, #7C3AED 0%, #3B82F6 100%)" }}
          >
            {t("practice.viewAnalytics")}
          </button>
        </div>
      </div>
    </>
  );
}

function StatRow({
  icon: Icon,
  iconColor,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconColor: string;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-panel px-3 py-2.5">
      <span className="flex items-center gap-2 text-[13px] text-text-muted">
        <Icon size={15} className={iconColor} />
        {label}
      </span>
      <span className="text-[13px] font-bold text-text">{value}</span>
    </div>
  );
}

function MetricBox({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-panel p-3">
      <Icon size={14} className="text-primary" />
      <p className="mt-1.5 text-base font-extrabold text-text">{value}</p>
      <p className="text-[10.5px] text-text-faint">{label}</p>
    </div>
  );
}

function TrendLine({ points }: { points: number[] }) {
  const w = 100;
  const h = 40;
  const step = points.length > 1 ? w / (points.length - 1) : 0;
  const coords = points.map((p, i) => [i * step, h - (p / 100) * h] as const);
  const path = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-16 w-full overflow-visible" preserveAspectRatio="none">
      <defs>
        <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke="url(#trendGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
