"use client";

import { useUserProgressStore } from "@/lib/store/userProgressStore";
import { useLocale } from "@/components/LocaleProvider";

function formatMinutes(total: number) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `${m}min`;
  return `${h}h ${m}min`;
}

export default function ProgressPanel() {
  const progress = useUserProgressStore((s) => s.progress);
  const { t } = useLocale();

  const studyMinutes = progress?.study_minutes_total ?? 0;
  const answered = progress?.questions_answered ?? 0;
  const correct = progress?.questions_correct ?? 0;
  const accuracy = answered === 0 ? 0 : Math.round((correct / answered) * 100);
  const labsCompleted = progress?.labs_completed ?? 0;

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const correctDash = (accuracy / 100) * circumference;

  const monthStats = [
    { label: t("dashboard.studyTimeTotal"), value: formatMinutes(studyMinutes) },
    { label: t("dashboard.questionsAnswered"), value: String(answered) },
    { label: t("dashboard.labsCompleted"), value: String(labsCompleted) },
  ];

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-text">{t("dashboard.progressOverview")}</h2>
        <span className="text-xs font-medium text-text-faint">{t("dashboard.total")}</span>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        {monthStats.map((s) => (
          <div key={s.label}>
            <p className="text-[11px] text-text-faint">{s.label}</p>
            <p className="mt-1 text-lg font-extrabold text-text">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-border-soft pt-5">
        <p className="mb-3 text-xs font-semibold text-text-muted">{t("dashboard.accuracy")}</p>
        {answered === 0 ? (
          <p className="text-sm text-text-faint">{t("dashboard.accuracyEmpty")}</p>
        ) : (
          <div className="flex items-center gap-5">
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--color-panel-alt)" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke="#6d4cff"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${correctDash} ${circumference - correctDash}`}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-extrabold text-text">{accuracy}%</span>
                <span className="text-[10px] text-text-faint">{t("dashboard.correct")}</span>
              </div>
            </div>
            <div className="flex-1 space-y-1.5 text-xs">
              <p className="flex items-center justify-between">
                <span className="text-text-muted">{t("dashboard.correctlyAnswered")}</span>
                <span className="font-semibold text-text">{correct}</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-text-muted">{t("dashboard.totalAnswered")}</span>
                <span className="font-semibold text-text">{answered}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
