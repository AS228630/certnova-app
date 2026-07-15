"use client";

import Link from "next/link";
import { CheckCircle2, XCircle, RotateCcw, ArrowLeft, Info } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export default function MockExamResults({
  companySlug,
  certId,
  correctCount,
  totalCount,
  passed,
  onRetry,
}: {
  companySlug: string;
  certId: string;
  correctCount: number;
  totalCount: number;
  passed: boolean;
  onRetry: () => void;
}) {
  const { t } = useLocale();
  const percent = totalCount === 0 ? 0 : Math.round((correctCount / totalCount) * 100);

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-border-soft bg-panel p-6 text-center sm:p-8">
      <div
        className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
          passed ? "bg-success-light text-success" : "bg-danger-light text-danger"
        }`}
      >
        {passed ? <CheckCircle2 size={30} /> : <XCircle size={30} />}
      </div>

      <h1 className="mb-1 text-xl font-bold text-text">
        {passed ? t("mockExam.resultPassed") : t("mockExam.resultFailed")}
      </h1>
      <p className="mb-6 text-sm text-text-muted">
        {correctCount} / {totalCount} {t("mockExam.correctSuffix")} ({percent}%)
      </p>

      <div className="mb-6 flex items-start gap-1.5 rounded-lg bg-panel-alt px-3 py-2.5 text-left text-[11px] leading-relaxed text-text-faint">
        <Info size={13} className="mt-0.5 shrink-0" />
        <span>{t("mockExam.scoringDisclaimer")}</span>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Link
          href={`/certifications/${companySlug}/${certId}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border-soft py-2.5 text-sm font-semibold text-text hover:bg-panel-alt"
        >
          <ArrowLeft size={14} />
          {t("mockExam.backToJourney")}
        </Link>
        <button
          onClick={onRetry}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-white hover:bg-amber-600"
        >
          <RotateCcw size={14} />
          {t("mockExam.ctaRetry")}
        </button>
      </div>
    </div>
  );
}
