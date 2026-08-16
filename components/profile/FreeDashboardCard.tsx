"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Lock, ChevronDown, BookOpen, FlaskConical, Target, MonitorCheck } from "lucide-react";
import { companies } from "@/lib/companiesData";
import { getLearnTrack } from "@/lib/learnData";
import { getLabsForCert } from "@/lib/labsData";
import { canAccess } from "@/lib/entitlementPolicy";
import { useLocale } from "@/components/LocaleProvider";
import type { CertDetail } from "@/lib/store/certProgressStore";

function findCertMeta(certId: string) {
  for (const company of companies) {
    const cert = company.certs.find((c) => c.id === certId);
    if (cert) return { companySlug: company.slug, code: cert.code, title: cert.title, freeLabsCount: cert.freeLabsCount ?? 1 };
  }
  return null;
}

type Row = {
  key: string;
  icon: typeof BookOpen;
  label: string;
  status: "done" | "available" | "locked";
  statusLabel: string;
  href: string;
};

/**
 * Stage 6: real progress summary for one certification the person has
 * actually engaged with — every number here comes from progressMap/
 * detailMap/lessonCompletions, already loaded by ProfileClient (no new
 * fetch, no duplicate progress-calculation logic). Works identically for
 * every certification: nothing here checks a specific certId.
 *
 * If the person hasn't started anything yet, this renders nothing —
 * there is no real progress to summarize, and a Dashboard full of zeros
 * would be more confusing than no Dashboard at all.
 */
export default function FreeDashboardCard({
  isPro,
  progressMap,
  detailMap,
  lessonCompletions,
  locale,
}: {
  isPro: boolean;
  progressMap: Record<string, number>;
  detailMap: Record<string, CertDetail>;
  lessonCompletions: Record<string, Set<string>>;
  locale: string;
}) {
  const { t } = useLocale();

  const engagedCertIds = Object.keys(progressMap)
    .filter((id) => (progressMap[id] ?? 0) > 0)
    .sort((a, b) => (progressMap[b] ?? 0) - (progressMap[a] ?? 0));

  const [selectedCertId, setSelectedCertId] = useState<string | null>(engagedCertIds[0] ?? null);
  const [pickerOpen, setPickerOpen] = useState(false);

  if (engagedCertIds.length === 0 || !selectedCertId) return null;

  const meta = findCertMeta(selectedCertId);
  if (!meta) return null;

  const progressPercent = Math.round(progressMap[selectedCertId] ?? 0);
  const detail = detailMap[selectedCertId] ?? { labCompleted: false, questionsAnswered: 0, questionsCorrect: 0 };
  const certBase = `/certifications/${meta.companySlug}/${selectedCertId}`;

  const track = getLearnTrack(selectedCertId, meta.title, locale);
  const completedSet = lessonCompletions[selectedCertId] ?? new Set<string>();
  const learnModulesDone = track.modules.filter((m) => m.lessons.length > 0 && m.lessons.every((l) => completedSet.has(l.id))).length;

  const totalLabs = Math.max(1, getLabsForCert(selectedCertId).length);
  const labsAccessible = isPro ? totalLabs : Math.min(totalLabs, meta.freeLabsCount);

  const rows: Row[] = [
    {
      key: "learn",
      icon: BookOpen,
      label: t("profileDashboard.rowLearn"),
      status: learnModulesDone >= track.modules.length && track.modules.length > 0 ? "done" : "available",
      statusLabel:
        track.modules.length === 0
          ? t("profileDashboard.notStarted")
          : `${learnModulesDone} / ${track.modules.length} ${t("profileDashboard.modulesLabel")}`,
      href: `${certBase}/learn`,
    },
    {
      key: "labs",
      icon: FlaskConical,
      label: t("profileDashboard.rowLabs"),
      status: canAccess(isPro, "labs_full") ? "available" : detail.labCompleted ? "done" : "available",
      statusLabel: isPro
        ? t("profileDashboard.allUnlocked")
        : `${labsAccessible} ${t("profileDashboard.ofLabel")} ${totalLabs} ${t("profileDashboard.freeLabel")}`,
      href: `${certBase}/labs`,
    },
    {
      key: "practice",
      icon: Target,
      label: t("profileDashboard.rowPractice"),
      status: "available",
      statusLabel:
        detail.questionsAnswered === 0
          ? t("profileDashboard.notStarted")
          : `${detail.questionsCorrect} / ${detail.questionsAnswered} ${t("profileDashboard.correctLabel")}`,
      href: `${certBase}/practice`,
    },
    {
      key: "exam",
      icon: MonitorCheck,
      label: t("profileDashboard.rowExam"),
      status: canAccess(isPro, "exam_simulation_full") ? "available" : "locked",
      statusLabel: canAccess(isPro, "exam_simulation_full")
        ? t("profileDashboard.allUnlocked")
        : t("profileDashboard.freePreviewLabel"),
      href: `${certBase}/mock-exam`,
    },
  ];

  return (
    <div className="mb-6 rounded-2xl border border-border-soft bg-panel p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-semibold text-text-faint">{t("profileDashboard.title")}</p>
        {engagedCertIds.length > 1 && (
          <div className="relative">
            <button
              onClick={() => setPickerOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg border border-border-soft px-3 py-1.5 text-xs font-semibold text-text hover:bg-panel-alt"
            >
              {meta.code}
              <ChevronDown size={12} />
            </button>
            {pickerOpen && (
              <div className="absolute right-0 z-10 mt-1 w-48 rounded-lg border border-border-soft bg-panel py-1 shadow-lg">
                {engagedCertIds.map((id) => {
                  const m = findCertMeta(id);
                  if (!m) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        setSelectedCertId(id);
                        setPickerOpen(false);
                      }}
                      className={`block w-full px-3 py-2 text-left text-xs font-medium hover:bg-panel-alt ${
                        id === selectedCertId ? "text-primary" : "text-text-muted"
                      }`}
                    >
                      {m.code}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col items-center justify-center rounded-xl border border-border-soft bg-panel-alt p-5" style={{ minHeight: 180 }}>
          <p className="mb-3 self-start text-xs text-text-faint">
            {t("profileDashboard.progressLabel")} — {meta.code}
          </p>
          <div className="relative flex h-28 w-28 items-center justify-center">
            <svg viewBox="0 0 96 96" className="h-28 w-28 -rotate-90">
              <circle cx="48" cy="48" r="42" fill="none" stroke="var(--color-border-soft)" strokeWidth="8" />
              <circle
                cx="48"
                cy="48"
                r="42"
                fill="none"
                stroke="var(--color-success)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={2 * Math.PI * 42 * (1 - progressPercent / 100)}
              />
            </svg>
            <span className="absolute text-xl font-extrabold text-text">{progressPercent}%</span>
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-xl border border-border-soft bg-panel-alt p-5" style={{ minHeight: 180 }}>
          <p className="mb-3 text-xs text-text-faint">{t("profileDashboard.correctAnswersLabel")}</p>
          {detail.questionsAnswered === 0 ? (
            <p className="text-sm text-text-muted">{t("profileDashboard.noQuestionsYet")}</p>
          ) : (
            <p className="text-3xl font-extrabold text-text">
              {detail.questionsCorrect} / {detail.questionsAnswered}
            </p>
          )}
        </div>
      </div>

      <p className="mb-2 mt-6 text-sm font-bold text-text">{t("profileDashboard.modulesHeading")}</p>
      <div className="divide-y divide-border-soft overflow-hidden rounded-xl border border-border-soft">
        {rows.map((row) => (
          <Link
            key={row.key}
            href={row.href}
            className="flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-panel-alt"
            style={{ minHeight: 56 }}
          >
            <span className="flex items-center gap-2.5 text-sm text-text">
              {row.status === "locked" ? (
                <Lock size={16} className="shrink-0 text-text-faint" aria-hidden="true" />
              ) : row.status === "done" ? (
                <CheckCircle2 size={16} className="shrink-0 text-success" aria-hidden="true" />
              ) : (
                <row.icon size={16} className="shrink-0 text-primary" aria-hidden="true" />
              )}
              {row.label}
            </span>
            <span
              className={`flex items-center gap-1 text-xs font-semibold ${
                row.status === "locked" ? "text-text-faint" : row.status === "done" ? "text-success" : "text-text-muted"
              }`}
            >
              {row.status === "locked" && <Lock size={11} aria-hidden="true" />}
              {row.status === "done" && <CheckCircle2 size={11} aria-hidden="true" />}
              {row.statusLabel}
            </span>
          </Link>
        ))}
      </div>

      <Link href={certBase} className="mt-4 block text-center text-sm font-semibold text-primary hover:underline">
        {t("profileDashboard.viewAllCta")} →
      </Link>
    </div>
  );
}
