import { GraduationCap, FlaskConical, ClipboardCheck, Check, Circle, Clock, Lock, CheckCircle2 } from "lucide-react";
import type { Phase } from "@/lib/certJourney";

const ILLUSTRATION_ICON = {
  learn: GraduationCap,
  labs: FlaskConical,
  exam: ClipboardCheck,
};

const STAT_ICON = {
  check: Check,
  circle: Circle,
  clock: Clock,
};

const RING_COLOR: Record<Phase["key"], string> = {
  learn: "#3b82f6",
  labs: "#22c55e",
  exam: "#a855f7",
};

export default function PhaseCard({ phase }: { phase: Phase }) {
  const Illustration = ILLUSTRATION_ICON[phase.illustration];
  const circumference = 2 * Math.PI * 34;
  const dashOffset = circumference * (1 - phase.percent / 100);

  return (
    <div className="flex flex-col rounded-2xl border border-border-soft bg-panel p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
          {phase.step}
        </span>
        <div>
          <p className="font-bold text-text">{phase.title}</p>
          <p className="text-xs text-text-faint">{phase.subtitle}</p>
        </div>
      </div>

      <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-2xl bg-panel-alt">
        <Illustration size={44} className="text-primary" />
      </div>

      <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center">
        <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
          <circle cx="40" cy="40" r="34" fill="none" strokeWidth="7" className="stroke-panel-alt" />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
            stroke={RING_COLOR[phase.key]}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-base font-extrabold text-text">{phase.percent}%</span>
          <span className="text-[9px] text-text-faint">Abgeschlossen</span>
        </div>
      </div>

      <ul className="mb-4 space-y-2 text-sm">
        {phase.stats.map((s) => {
          const Icon = STAT_ICON[s.icon];
          return (
            <li key={s.label} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-text-muted">
                <Icon size={14} className={s.icon === "check" ? "text-success" : "text-text-faint"} />
                {s.label}
              </span>
              <span className="font-semibold text-text">{s.value}</span>
            </li>
          );
        })}
      </ul>

      <button
        disabled={!phase.unlocked}
        className={`mt-auto w-full rounded-lg py-2.5 text-sm font-bold transition-colors ${
          phase.unlocked
            ? "bg-primary text-white hover:bg-primary-dark"
            : "cursor-not-allowed bg-panel-alt text-text-faint"
        }`}
      >
        {phase.ctaLabel}
      </button>

      <div
        className={`mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
          phase.unlocked ? "bg-success-light text-success" : "bg-panel-alt text-text-faint"
        }`}
      >
        {phase.unlocked ? <CheckCircle2 size={14} /> : <Lock size={14} />}
        {phase.unlockHint}
      </div>
    </div>
  );
}
