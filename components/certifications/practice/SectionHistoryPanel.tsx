"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, History, ChevronDown } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useSectionAttemptsStore, starsForScore, type SectionAttempt } from "@/lib/store/sectionAttemptsStore";
import { getSectionCount } from "@/lib/practiceSections";

// Attempt-history table for the current certification — one row per
// SECTION (not per attempt, per spec section 3), showing the counted
// number of attempts and the best-ever score. Clicking a row expands a
// detail panel listing every individual attempt for that section (spec
// section 7). Works for any certification: it only reads whatever's in
// section_attempts / section_best_scores for this user+certId+sectionIndex,
// nothing here is specific to one exam.
export default function SectionHistoryPanel({
  certId,
  certLabel,
  totalQuestions,
}: {
  certId: string;
  certLabel: string;
  totalQuestions: number;
}) {
  const { t, locale } = useLocale();
  const attempts = useSectionAttemptsStore((s) => s.getAttempts(certId));
  const getBestScoreEntry = useSectionAttemptsStore((s) => s.getBestScoreEntry);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const sectionCount = getSectionCount(totalQuestions);
  const attemptsBySection = new Map<number, SectionAttempt[]>();
  for (const a of attempts) {
    const list = attemptsBySection.get(a.sectionIndex) ?? [];
    list.push(a);
    attemptsBySection.set(a.sectionIndex, list);
  }

  const rows = Array.from({ length: sectionCount }, (_, sectionIndex) => {
    const bestEntry = getBestScoreEntry(certId, sectionIndex);
    const sectionAttempts = (attemptsBySection.get(sectionIndex) ?? []).slice().sort((a, b) => b.attemptNumber - a.attemptNumber);
    return { sectionIndex, bestEntry, sectionAttempts };
  }).filter((r) => r.bestEntry !== null || r.sectionAttempts.length > 0);

  if (rows.length === 0) {
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
              <th className="pb-3 pr-4">{t("practice.historyColAttempts")}</th>
              <th className="pb-3 pr-4">{t("practice.historyColBestScore")}</th>
              <th className="pb-3 pr-4">{t("practice.historyColStars")}</th>
              <th className="pb-3 pr-4">{t("practice.historyColStatus")}</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ sectionIndex, bestEntry, sectionAttempts }) => {
              const bestScore = bestEntry?.bestScorePercent ?? null;
              const totalAttempts = bestEntry?.totalAttempts ?? sectionAttempts.length;
              const stars = bestScore !== null ? starsForScore(bestScore) : 0;
              const passed = bestScore !== null && bestScore >= 90;
              const isExpanded = expandedSection === sectionIndex;

              return (
                <React.Fragment key={sectionIndex}>
                  <tr
                    onClick={() => setExpandedSection(isExpanded ? null : sectionIndex)}
                    className="cursor-pointer border-b border-divider last:border-0 hover:bg-panel-alt/60"
                  >
                    <td className="py-3 pr-4 font-semibold text-text">
                      {t("practice.sectionN")} {sectionIndex + 1}
                    </td>
                    <td className="py-3 pr-4 text-text-muted">{totalAttempts}</td>
                    <td className="py-3 pr-4 font-bold text-text">
                      {bestScore !== null ? `${bestScore}%` : t("practice.historyNotAttempted")}
                    </td>
                    <td className="py-3 pr-4">
                      {bestScore !== null && (
                        <span className="text-warning" aria-label={`${stars}/5`}>
                          {"★".repeat(stars)}
                          <span className="text-text-faint">{"★".repeat(5 - stars)}</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      {bestScore !== null && (
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                            passed ? "bg-success-light text-success" : "bg-danger/10 text-danger"
                          }`}
                        >
                          {passed ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                          {passed ? t("practice.passedLabel") : t("practice.failedLabel")}
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      <ChevronDown
                        size={16}
                        className={`inline-block text-text-faint transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="border-b border-divider last:border-0">
                      <td colSpan={6} className="bg-panel-alt/40 px-2 py-3">
                        {sectionAttempts.length === 0 ? (
                          <p className="px-2 text-xs text-text-faint">{t("practice.historyEmpty")}</p>
                        ) : (
                          <table className="w-full border-collapse text-xs">
                            <thead>
                              <tr className="text-left font-semibold text-text-faint">
                                <th className="pb-2 pl-2 pr-4">{t("practice.historyColAttempt")}</th>
                                <th className="pb-2 pr-4">{t("practice.historyColDate")}</th>
                                <th className="pb-2 pr-4">{t("practice.historyColScore")}</th>
                                <th className="pb-2 pr-4">{t("practice.historyColStars")}</th>
                                <th className="pb-2">{t("practice.historyColStatus")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sectionAttempts.map((a) => {
                                const dt = new Date(a.completedAt);
                                const dateStr = dt.toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
                                const timeStr = dt.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
                                const aStars = starsForScore(a.scorePercent);
                                return (
                                  <tr key={a.id} className="border-t border-divider/60">
                                    <td className="py-2 pl-2 pr-4 font-medium text-text">
                                      {t("practice.historyAttemptNumber")} {a.attemptNumber}
                                    </td>
                                    <td className="py-2 pr-4 text-text-muted">
                                      {dateStr} <span className="text-text-faint">· {timeStr}</span>
                                    </td>
                                    <td className="py-2 pr-4 font-bold text-text">{a.scorePercent}%</td>
                                    <td className="py-2 pr-4">
                                      <span className="text-warning" aria-label={`${aStars}/5`}>
                                        {"★".repeat(aStars)}
                                        <span className="text-text-faint">{"★".repeat(5 - aStars)}</span>
                                      </span>
                                    </td>
                                    <td className="py-2">
                                      <span
                                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-bold ${
                                          a.passed ? "bg-success-light text-success" : "bg-danger/10 text-danger"
                                        }`}
                                      >
                                        {a.passed ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                                        {a.passed ? t("practice.passedLabel") : t("practice.failedLabel")}
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
