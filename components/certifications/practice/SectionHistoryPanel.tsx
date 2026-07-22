"use client";

import { CheckCircle2, XCircle, History } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useSectionAttemptsStore, starsForScore } from "@/lib/store/sectionAttemptsStore";

// Attempt-history table for the current certification — one row per
// completed section attempt, newest first, EVERY attempt kept (never
// overwritten or deleted, per spec section 5). Works for any
// certification: it just reads whatever's in section_attempts for this
// user+certId, nothing here is AZ-900-specific.
export default function SectionHistoryPanel({ certId, certLabel }: { certId: string; certLabel: string }) {
  const { t, locale } = useLocale();
  const attempts = useSectionAttemptsStore((s) => s.getAttempts(certId));

  if (attempts.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-border-soft bg-panel p-6">
        <p className="flex items-center gap-2 text-base font-bold text-text">
          <History size={17} className="text-primary" />
          {t("practice.historyTitle")}
        </p>
        <p className="mt-3 text-sm text-text-faint">{t("practice.historyEmpty")}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-border-soft bg-panel p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-base font-bold text-text">
          <History size={17} className="text-primary" />
          {t("practice.historyTitle")}
        </p>
        <span className="rounded-full bg-panel-alt px-3 py-1 text-xs font-semibold text-text-faint">{certLabel}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-soft text-left text-xs font-semibold text-text-faint">
              <th className="pb-3 pr-4">{t("practice.historyColSection")}</th>
              <th className="pb-3 pr-4">{t("practice.historyColDate")}</th>
              <th className="pb-3 pr-4">{t("practice.historyColScore")}</th>
              <th className="pb-3 pr-4">{t("practice.historyColStars")}</th>
              <th className="pb-3 pr-4">{t("practice.historyColStatus")}</th>
              <th className="pb-3">{t("practice.historyColAttempt")}</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((a) => {
              const dt = new Date(a.completedAt);
              const dateStr = dt.toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
              const timeStr = dt.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
              const stars = starsForScore(a.scorePercent);

              return (
                <tr key={a.id} className="border-b border-divider last:border-0">
                  <td className="py-3 pr-4 font-semibold text-text">
                    {t("practice.sectionN")} {a.sectionIndex + 1}
                  </td>
                  <td className="py-3 pr-4 text-text-muted">
                    {dateStr} <span className="text-text-faint">· {timeStr}</span>
                  </td>
                  <td className="py-3 pr-4 font-bold text-text">{a.scorePercent}%</td>
                  <td className="py-3 pr-4">
                    <span className="text-warning" aria-label={`${stars}/5`}>
                      {"★".repeat(stars)}
                      <span className="text-text-faint">{"★".repeat(5 - stars)}</span>
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                        a.passed ? "bg-success-light text-success" : "bg-danger/10 text-danger"
                      }`}
                    >
                      {a.passed ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {a.passed ? t("practice.passedLabel") : t("practice.failedLabel")}
                    </span>
                  </td>
                  <td className="py-3 text-text-muted">
                    {t("practice.attemptWord")} {a.attemptNumber}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
