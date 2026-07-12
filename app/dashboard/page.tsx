"use client";

import { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import DailyPlan from "@/components/DailyPlan";
import AICoach from "@/components/AICoach";
import ProgressPanel from "@/components/ProgressPanel";
import { ChevronRight, Compass } from "lucide-react";
import Link from "next/link";
import { getVendorIcon } from "@/lib/vendorIcons";
import LearningCalendar from "@/components/LearningCalendar";
import { useUser } from "@/components/UserContext";
import { getFirstName } from "@/lib/supabase/useUser";
import { useLocale } from "@/components/LocaleProvider";
import { useCertProgressStore } from "@/lib/store/certProgressStore";
import { findCertByCertId } from "@/lib/companiesData";
import NextGoalCard from "@/components/dashboard/NextGoalCard";
import TodaysFocus from "@/components/dashboard/TodaysFocus";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import RecommendedForYou from "@/components/dashboard/RecommendedForYou";
import ReadyForMoreCard from "@/components/dashboard/ReadyForMoreCard";
import CtaBanner from "@/components/dashboard/CtaBanner";
import Footer from "@/components/Footer";
import ComingSoonToast from "@/components/coachLive/ComingSoonToast";

// Rendered *inside* DashboardShell so it sits below UserContext.Provider in the tree.
function Greeting() {
  const { user } = useUser();
  const { t } = useLocale();
  return (
    <h1 className="text-xl font-extrabold leading-snug text-text sm:text-2xl">
      {t("dashboard2.goodMorning")}, {getFirstName(user)}! 👋
    </h1>
  );
}

// Real "continue where you left off" list, built from the signed-in user's
// actual cert progress (not hardcoded demo percentages). A brand-new user
// with no progress yet sees a discover-paths empty state instead.
function ContinueLearningSection() {
  const { t } = useLocale();
  const progressMap = useCertProgressStore((s) => s.progressMap);

  const inProgress = Object.entries(progressMap)
    .filter(([, pct]) => pct > 0 && pct < 100)
    .map(([certId, pct]) => {
      const match = findCertByCertId(certId);
      if (!match) return null;
      return { certId, pct, company: match.company, cert: match.cert };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 4);

  if (inProgress.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border-soft bg-panel p-8 text-center">
        <p className="mb-4 text-sm text-text-faint">{t("dashboard2.noProgressYet")}</p>
        <Link
          href="/certifications"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-dark"
        >
          <Compass size={15} />
          {t("dashboard2.discoverPaths")}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {inProgress.map(({ certId, pct, company, cert }) => (
        <Link
          key={certId}
          href={`/certifications/${company.slug}/${cert.id}`}
          className="rounded-xl border border-border-soft bg-panel p-4 transition-colors hover:border-primary/40"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {cert.code}
            </span>
            <span className="text-lg">{getVendorIcon(company.name, 22)}</span>
          </div>
          <p className="mb-3 text-sm font-bold leading-snug text-text">{cert.title}</p>
          <div className="h-1.5 w-full rounded-full bg-panel-alt">
            <div className="h-1.5 rounded-full bg-primary" style={{ width: `${Math.round(pct)}%` }} />
          </div>
          <p className="mt-1.5 text-xs text-text-faint">
            {Math.round(pct)}% {t("dashboard2.completedD")}
          </p>
          <span className="mt-3 flex items-center gap-1 text-xs font-bold text-primary">
            {t("dashboard2.resume")}
            <ChevronRight size={13} />
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const { t } = useLocale();
  const [toast, setToast] = useState<string | null>(null);
  return (
    <DashboardShell>
      <main className="grid grid-cols-1 gap-5 p-3 sm:gap-6 sm:p-4 md:p-8 lg:grid-cols-3">
        <div className="space-y-5 sm:space-y-6 lg:col-span-2">
          <Greeting />

          <NextGoalCard />

          <TodaysFocus onEditGoals={() => setToast(t("todaysFocus.editGoals"))} />

          {/* Weitermachen */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold text-text">{t("dashboard2.continuePlaying")}</h2>
              <Link href="/certifications" className="cursor-pointer text-xs font-semibold text-primary">
                {t("dashboard2.viewAllD")}
              </Link>
            </div>
            <ContinueLearningSection />
          </div>

          {/* Activity Feed */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold text-text">{t("activity.title")}</h2>
            </div>
            <ActivityFeed />
          </div>

          {/* Recommended for You */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold text-text">{t("recommended.title")}</h2>
              <Link href="/certifications" className="cursor-pointer text-xs font-semibold text-primary">
                {t("recommended.viewAll")}
              </Link>
            </div>
            <RecommendedForYou />
          </div>
        </div>

        <div className="space-y-6">
          <DailyPlan />
          <AICoach />
          <ProgressPanel />
          <LearningCalendar />
          <ReadyForMoreCard onInvite={() => setToast(t("readyForMore.inviteBtn"))} />
        </div>
      </main>
      <div className="px-3 pb-6 sm:px-4 md:px-8">
        <CtaBanner />
        <Footer />
      </div>
      {toast && <ComingSoonToast label={toast} onClose={() => setToast(null)} />}
    </DashboardShell>
  );
}
