"use client";

import Link from "next/link";
import { Trophy, CheckCircle2, XCircle, Clock3, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

/** Single place the score-color thresholds live (advisor spec item 9) —
 * every caller asks this function instead of repeating the >=80/60-79/
 * <60 logic inline. */
export function getResultStatus(scorePercent: number): "good" | "medium" | "low" {
  if (scorePercent >= 80) return "good";
  if (scorePercent >= 60) return "medium";
  return "low";
}

const RING_COLOR: Record<ReturnType<typeof getResultStatus>, string> = {
  good: "#22C55E",
  medium: "#F59E0B",
  low: "#EF4444",
};

function formatElapsed(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/**
 * The "Stage 4" completion state: shown once for any certification when
 * a non-Premium user (Guest or signed-in Free) finishes their free
 * Practice Questions allotment (Teil 1) — never certId-specific, never a
 * hardcoded question count. correct/total/elapsedSeconds all come from
 * the real attempt already tracked by PracticeClient, never invented
 * here. CTA branches on isGuest: a Guest is asked to register (stage 5
 * — a free account, not a purchase); a signed-in Free user is asked to
 * upgrade instead, since they already have an account.
 */
export default function PracticeCompletionState({
  freeQuestionLimit,
  correct,
  wrong,
  elapsedSeconds,
  isGuest,
  onViewDetails,
  upgradeHref,
}: {
  freeQuestionLimit: number;
  correct: number;
  wrong: number;
  elapsedSeconds: number;
  isGuest: boolean;
  onViewDetails: () => void;
  /** Only used for a signed-in Free user (isGuest === false) — a Guest's
   * primary CTA is always /register instead. */
  upgradeHref: string;
}) {
  const { t } = useLocale();
  const total = correct + wrong;
  const scorePercent = total === 0 ? 0 : Math.round((correct / total) * 100);
  const status = getResultStatus(scorePercent);
  const ringColor = RING_COLOR[status];
  // Ring drawn as a simple SVG arc — no chart library needed for one value.
  const circumference = 2 * Math.PI * 44;
  const dashOffset = circumference * (1 - scorePercent / 100);

  return (
    <div className="mx-auto w-full max-w-[680px]">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-base font-extrabold text-white">
          4
        </span>
        <h2 className="text-xl font-extrabold text-text sm:text-2xl">
          {freeQuestionLimit} {t("practice.stage4TitleSuffix")}
        </h2>
      </div>

      <div className="rounded-2xl border border-border-soft bg-panel p-6 sm:p-8">
        {/* Trophy illustration — same visual language already used for
            the journey PhaseIllustration (gradient badge + Lucide icon),
            not a new custom asset or an emoji. */}
        <div className="mx-auto mb-5 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 shadow-[0_0_50px_rgba(139,92,246,0.3)]">
          <Trophy size={72} className="text-primary" />
        </div>

        <p className="text-center text-xl font-extrabold text-text">🎉 {t("practice.stage4CongratsTitle")}</p>
        <p className="mx-auto mt-1 max-w-sm text-center text-sm text-text-muted">
          {t("practice.stage4CongratsDesc").replace("{count}", String(freeQuestionLimit))}
        </p>

        {/* Result card */}
        <div className="mt-6 rounded-xl border border-border-soft bg-panel-alt p-5">
          <p className="mb-4 text-xs font-semibold text-text-faint">{t("practice.stage4YourResult")}</p>
          <div className="flex items-center justify-center gap-6 sm:justify-start">
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
              <svg viewBox="0 0 96 96" className="h-24 w-24 -rotate-90">
                <circle cx="48" cy="48" r="44" fill="none" stroke="var(--color-border-soft)" strokeWidth="8" />
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  fill="none"
                  stroke={ringColor}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                />
              </svg>
              <span className="absolute text-lg font-extrabold text-text">{scorePercent}%</span>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-text">
                {correct} / {total}
              </p>
              <p className="text-xs text-text-faint">{t("practice.stage4CorrectSuffix")}</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border-soft pt-4 text-center">
            <div>
              <p className="flex items-center justify-center gap-1 text-sm font-bold text-success">
                <CheckCircle2 size={14} />
                {correct}
              </p>
              <p className="text-[11px] text-text-faint">{t("practice.stage4RightLabel")}</p>
            </div>
            <div>
              <p className="flex items-center justify-center gap-1 text-sm font-bold text-danger">
                <XCircle size={14} />
                {wrong}
              </p>
              <p className="text-[11px] text-text-faint">{t("practice.stage4WrongLabel")}</p>
            </div>
            <div>
              <p className="flex items-center justify-center gap-1 text-sm font-bold text-text">
                <Clock3 size={14} />
                {formatElapsed(elapsedSeconds)}
              </p>
              <p className="text-[11px] text-text-faint">{t("practice.stage4TimeLabel")}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-2.5">
          {isGuest ? (
            <Link
              href="/register"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary-dark"
            >
              {t("practice.stage4RegisterCta")}
            </Link>
          ) : (
            <Link
              href={upgradeHref}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary-dark"
            >
              {t("premiumGate.cta")}
              <ArrowRight size={14} />
            </Link>
          )}
          <button
            onClick={onViewDetails}
            className="w-full rounded-lg border border-border-soft px-4 py-3 text-sm font-bold text-text hover:bg-panel-alt"
          >
            {t("practice.stage4ViewDetailsCta")}
          </button>
        </div>
      </div>
    </div>
  );
}
