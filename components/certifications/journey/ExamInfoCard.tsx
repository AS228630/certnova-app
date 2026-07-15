"use client";

import Link from "next/link";
import { FileText, HelpCircle, Clock3, Target, Monitor, ArrowRight, Info } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import type { ExamInfo } from "@/lib/examInfoData";

function ExamIllustration() {
  return (
    <div className="flex h-24 items-center justify-center">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-500/10">
        <FileText size={28} className="text-amber-400" />
      </div>
    </div>
  );
}

export default function ExamInfoCard({
  companySlug,
  certId,
  examInfo,
}: {
  companySlug: string;
  certId: string;
  examInfo: ExamInfo;
}) {
  const { t } = useLocale();

  return (
    <div className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border-soft bg-panel p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-amber-400 via-amber-400/50 to-transparent" />

      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
          4
        </span>
        <div>
          <p className="text-sm font-bold text-text">{t("examInfo.title")}</p>
          <p className="text-[11px] text-text-faint">{t("examInfo.subtitle")}</p>
        </div>
      </div>

      <ExamIllustration />

      <div className="my-4 space-y-2 text-xs text-text-muted">
        <div className="flex items-center justify-between gap-2">
          <span className="flex shrink-0 items-center gap-1.5">
            <HelpCircle size={12} className="text-text-faint" />
            {t("examInfo.statQuestions")}
          </span>
          <span className="font-semibold text-text">{examInfo.questionRange}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="flex shrink-0 items-center gap-1.5">
            <Clock3 size={12} className="text-text-faint" />
            {t("examInfo.statDuration")}
          </span>
          <span className="whitespace-nowrap font-semibold text-text">
            {examInfo.durationMinutes} {t("examInfo.minutesUnit")}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="flex shrink-0 items-center gap-1.5">
            <Target size={12} className="text-text-faint" />
            {t("examInfo.statPassingScore")}
          </span>
          <span className="whitespace-nowrap font-semibold text-text">{examInfo.passingScore}</span>
        </div>
        <div>
          <span className="mb-1.5 flex items-center gap-1.5">
            <Monitor size={12} className="text-text-faint" />
            {t("examInfo.statFormat")}
          </span>
          <div className="flex flex-wrap gap-1">
            {examInfo.format.map((tag) => (
              <span key={tag} className="rounded-md bg-panel-alt px-1.5 py-0.5 text-[10px] font-semibold text-text">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {!examInfo.verified && (
        <div className="mb-3 flex items-start gap-1.5 rounded-lg bg-panel-alt px-2.5 py-2 text-[10px] leading-relaxed text-text-faint">
          <Info size={12} className="mt-0.5 shrink-0" />
          <span>{t("examInfo.unverifiedNote")}</span>
        </div>
      )}

      <div className="mt-auto">
        <Link
          href={`/certifications/${companySlug}/${certId}/mock-exam`}
          className="mb-3 flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 py-2 text-center text-xs font-bold text-white transition-colors hover:bg-amber-600"
        >
          {t("examInfo.ctaStartMockExam")}
          <ArrowRight size={14} />
        </Link>

        <span className="flex items-center justify-center gap-1.5 rounded-lg bg-panel-alt py-1.5 text-center text-[11px] font-semibold text-text-faint">
          {t("examInfo.simulationHint")}
        </span>
      </div>
    </div>
  );
}
