"use client";

import { CheckCircle2, Circle, Flag, Clock3 } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export default function MockExamReview({
  total,
  answeredIds,
  markedIds,
  remainingLabel,
  onJump,
  onSubmit,
  onBackToExam,
}: {
  total: number;
  answeredIds: Set<number>;
  markedIds: Set<number>;
  remainingLabel: string;
  onJump: (index: number) => void;
  onSubmit: () => void;
  onBackToExam: () => void;
}) {
  const { t } = useLocale();
  const answeredCount = answeredIds.size;
  const unansweredCount = total - answeredCount;

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-border-soft bg-panel p-5 sm:p-8">
      <h2 className="mb-1 text-lg font-bold text-text">{t("mockExam.reviewTitle")}</h2>
      <p className="mb-5 flex items-center gap-1.5 text-xs text-text-muted">
        <Clock3 size={13} /> {t("mockExam.timeRemaining")}: {remainingLabel}
      </p>

      <div className="mb-5 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-border-soft bg-panel-alt px-3 py-2.5 text-center">
          <p className="text-lg font-bold text-success">{answeredCount}</p>
          <p className="text-[10px] text-text-faint">{t("mockExam.answeredLabel")}</p>
        </div>
        <div className="rounded-xl border border-border-soft bg-panel-alt px-3 py-2.5 text-center">
          <p className="text-lg font-bold text-danger">{unansweredCount}</p>
          <p className="text-[10px] text-text-faint">{t("mockExam.unansweredLabel")}</p>
        </div>
        <div className="rounded-xl border border-border-soft bg-panel-alt px-3 py-2.5 text-center">
          <p className="text-lg font-bold text-amber-500">{markedIds.size}</p>
          <p className="text-[10px] text-text-faint">{t("mockExam.markedLabel")}</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-6 gap-2 sm:grid-cols-8">
        {Array.from({ length: total }).map((_, i) => {
          const answered = answeredIds.has(i);
          const marked = markedIds.has(i);
          return (
            <button
              key={i}
              onClick={() => onJump(i)}
              className={`relative flex h-10 items-center justify-center rounded-lg border text-xs font-semibold transition-colors ${
                answered
                  ? "border-success/40 bg-success-light text-success"
                  : "border-border-soft bg-panel-alt text-text-faint hover:bg-panel"
              }`}
            >
              {i + 1}
              {marked && <Flag size={10} className="absolute -right-1 -top-1 fill-amber-500 text-amber-500" />}
            </button>
          );
        })}
      </div>

      <div className="mb-5 flex items-center gap-2 text-[11px] text-text-faint">
        <span className="flex items-center gap-1">
          <CheckCircle2 size={12} className="text-success" /> {t("mockExam.answeredLabel")}
        </span>
        <span className="flex items-center gap-1">
          <Circle size={12} /> {t("mockExam.unansweredLabel")}
        </span>
        <span className="flex items-center gap-1">
          <Flag size={12} className="fill-amber-500 text-amber-500" /> {t("mockExam.markedLabel")}
        </span>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          onClick={onBackToExam}
          className="flex-1 rounded-lg border border-border-soft py-2.5 text-sm font-semibold text-text hover:bg-panel-alt"
        >
          {t("mockExam.backToExam")}
        </button>
        <button
          onClick={onSubmit}
          className="flex-1 rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-white hover:bg-amber-600"
        >
          {t("mockExam.ctaSubmit")}
        </button>
      </div>
    </div>
  );
}
