"use client";

import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { useCertProgressStore } from "@/lib/store/certProgressStore";
import { findCertByCertId } from "@/lib/companiesData";
import { getVendorIcon } from "@/lib/vendorIcons";
import { useLocale } from "@/components/LocaleProvider";

// Real "next goal" derived from whichever certification the user has
// made the most progress on (0-99%). A brand-new user with no progress
// on anything sees an honest empty state instead of a fabricated goal.
export default function NextGoalCard() {
  const progressMap = useCertProgressStore((s) => s.progressMap);
  const detailMap = useCertProgressStore((s) => s.detailMap);
  const { t } = useLocale();

  const active = Object.entries(progressMap)
    .filter(([, pct]) => pct > 0 && pct < 100)
    .map(([certId, pct]) => {
      const match = findCertByCertId(certId);
      if (!match) return null;
      return { certId, pct, company: match.company, cert: match.cert, detail: detailMap[certId] };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => b.pct - a.pct)[0];

  if (!active) {
    return (
      <div className="rounded-2xl border border-border-soft bg-panel p-6 text-center">
        <Compass size={22} className="mx-auto mb-3 text-text-faint" />
        <p className="mb-4 text-sm text-text-faint">{t("nextGoal.noCertYet")}</p>
        <Link
          href="/certifications"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-dark"
        >
          {t("nextGoal.chooseCert")}
          <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  const { certId, pct, company, cert, detail } = active;
  // We deliberately show "questions answered" (a number we know for
  // certain) rather than "questions remaining", since the platform
  // doesn't have a single reliable total-question-count source across
  // every certification's question bank (some use dedicated files, some
  // a generic practice system) — showing an estimated remaining count
  // risks being simply wrong for some certs, which the project's no-
  // fabricated-data principle rules out.
  const questionsAnswered = detail?.questionsAnswered ?? 0;
  const labsRemaining = detail?.labCompleted ? 0 : 1;

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-text">{t("nextGoal.title")}</h2>
        <span className="text-lg font-extrabold text-primary">{Math.round(pct)}%</span>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <span className="text-2xl">{getVendorIcon(company.name, 28)}</span>
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold text-text">
            {cert.code}: {cert.title}
          </p>
        </div>
      </div>

      <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-panel-alt">
        <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${Math.round(pct)}%` }} />
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 text-center">
        <div>
          <p className="text-lg font-extrabold text-text">{questionsAnswered}</p>
          <p className="text-[10px] text-text-faint">{t("dashboard.questionsAnswered")}</p>
        </div>
        <div>
          <p className="text-lg font-extrabold text-text">{labsRemaining}</p>
          <p className="text-[10px] text-text-faint">{t("nextGoal.labsRemaining")}</p>
        </div>
      </div>

      <Link
        href={`/certifications/${company.slug}/${certId}`}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
      >
        {t("nextGoal.continueLearning")}
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}
