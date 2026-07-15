"use client";

import { FileText, Clock3, HelpCircle, ShieldAlert, Maximize2 } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import type { ExamInfo } from "@/lib/examInfoData";

export default function MockExamIntro({
  certCode,
  certTitle,
  questionCount,
  durationMinutes,
  examInfo,
  onStart,
}: {
  certCode: string;
  certTitle: string;
  questionCount: number;
  durationMinutes: number;
  examInfo: ExamInfo;
  onStart: () => void;
}) {
  const { t } = useLocale();

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-border-soft bg-panel p-6 text-center sm:p-8">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/15 text-amber-500">
        <FileText size={24} />
      </div>

      <h1 className="mb-1 text-lg font-bold text-text">{t("mockExam.introTitle")}</h1>
      <p className="mb-6 text-sm text-text-muted">
        {certCode} · {certTitle}
      </p>

      <div className="mb-6 grid grid-cols-2 gap-3 text-left">
        <div className="rounded-xl border border-border-soft bg-panel-alt px-4 py-3">
          <p className="flex items-center gap-1.5 text-[11px] text-text-faint">
            <HelpCircle size={12} /> {t("mockExam.questionsLabel")}
          </p>
          <p className="text-sm font-bold text-text">{questionCount}</p>
        </div>
        <div className="rounded-xl border border-border-soft bg-panel-alt px-4 py-3">
          <p className="flex items-center gap-1.5 text-[11px] text-text-faint">
            <Clock3 size={12} /> {t("mockExam.durationLabel")}
          </p>
          <p className="text-sm font-bold text-text">
            {durationMinutes} {t("examInfo.minutesUnit")}
          </p>
        </div>
      </div>

      <div className="mb-6 space-y-2 rounded-xl border border-border-soft bg-panel-alt p-4 text-left text-xs text-text-muted">
        <p className="flex items-start gap-2">
          <Maximize2 size={14} className="mt-0.5 shrink-0 text-amber-500" />
          {t("mockExam.ruleFullscreen")}
        </p>
        <p className="flex items-start gap-2">
          <Clock3 size={14} className="mt-0.5 shrink-0 text-amber-500" />
          {t("mockExam.ruleNoFeedback")}
        </p>
        <p className="flex items-start gap-2">
          <FileText size={14} className="mt-0.5 shrink-0 text-amber-500" />
          {t("mockExam.ruleReview")}
        </p>
      </div>

      {!examInfo.verified && (
        <div className="mb-6 flex items-start gap-1.5 rounded-lg bg-panel-alt px-3 py-2.5 text-left text-[11px] leading-relaxed text-text-faint">
          <ShieldAlert size={13} className="mt-0.5 shrink-0" />
          <span>{t("mockExam.unverifiedDisclaimer")}</span>
        </div>
      )}

      <div className="mb-4 flex items-start gap-1.5 rounded-lg bg-amber-500/10 px-3 py-2.5 text-left text-[11px] leading-relaxed text-amber-600">
        <ShieldAlert size={13} className="mt-0.5 shrink-0" />
        <span>{t("mockExam.simulationDisclaimer")}</span>
      </div>

      <button
        onClick={onStart}
        className="w-full rounded-lg bg-amber-500 py-3 text-sm font-bold text-white transition-colors hover:bg-amber-600"
      >
        {t("mockExam.ctaStart")}
      </button>
    </div>
  );
}
