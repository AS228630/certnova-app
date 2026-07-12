"use client";

import { useState, type ReactNode } from "react";
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
import { useLanguageCourseStore } from "@/lib/store/languageCourseStore";
import { findCertByCertId } from "@/lib/companiesData";
import { languageCourses } from "@/lib/languageCoursesData";
import NextGoalCard from "@/components/dashboard/NextGoalCard";
import TodaysFocus from "@/components/dashboard/TodaysFocus";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import RecommendedForYou from "@/components/dashboard/RecommendedForYou";
import ReadyForMoreCard from "@/components/dashboard/ReadyForMoreCard";
import CtaBanner from "@/components/dashboard/CtaBanner";
import Footer from "@/components/Footer";
import ComingSoonToast from "@/components/coachLive/ComingSoonToast";

// Picks the greeting that actually matches the time of day right now,
// instead of always saying "good morning" — checked against the local
// device clock, same as any calendar/clock app would.
function timeOfDayGreetingKey(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "dashboard2.goodMorning";
  if (hour >= 12 && hour < 17) return "dashboard2.goodAfternoon";
  if (hour >= 17 && hour < 22) return "dashboard2.goodEvening";
  return "dashboard2.goodNight";
}

// Rendered *inside* DashboardShell so it sits below UserContext.Provider in the tree.
function Greeting() {
  const { user } = useUser();
  const { t } = useLocale();
  return (
    <h1 className="text-xl font-extrabold leading-snug text-text sm:text-2xl">
      {t(timeOfDayGreetingKey())}, {getFirstName(user)}! 👋
    </h1>
  );
}

// Real "continue where you left off" list, mixing the signed-in user's
// actual certification progress AND language course progress into one
// list (matching the reference design, which shows both cert and
// language cards side by side) — never hardcoded demo percentages. A
// brand-new user with no progress on anything sees a discover-paths
// empty state instead.
type ContinueItem = {
  key: string;
  href: string;
  badge: string;
  icon: ReactNode;
  title: string;
  pct: number;
};

function ContinueLearningSection() {
  const { t } = useLocale();
  const certProgressMap = useCertProgressStore((s) => s.progressMap);
  const langProgress = useLanguageCourseStore((s) => s.progress);

  const certItems: ContinueItem[] = Object.entries(certProgressMap)
    .filter(([, pct]) => pct > 0 && pct < 100)
    .map((entry): ContinueItem | null => {
      const [certId, pct] = entry;
      const match = findCertByCertId(certId);
      if (!match) return null;
      return {
        key: `cert-${certId}`,
        href: `/certifications/${match.company.slug}/${match.cert.id}`,
        badge: match.cert.code,
        icon: <span className="text-lg">{getVendorIcon(match.company.name, 22)}</span>,
        title: match.cert.title,
        pct,
      };
    })
    .filter((x): x is ContinueItem => x !== null);

  const langItems: ContinueItem[] = Object.entries(langProgress)
    .map(([slug, lessonsCompleted]): ContinueItem | null => {
      const course = languageCourses.find((c) => c.slug === slug);
      if (!course || lessonsCompleted === 0) return null;
      const pct = Math.min(100, Math.round((lessonsCompleted / course.totalLessons) * 100));
      if (pct === 0 || pct >= 100) return null;
      return {
        key: `lang-${slug}`,
        href: "/language-courses",
        badge: course.levelRange,
        icon: (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://flagcdn.com/24x18/${course.countryCode}.png`}
            alt={course.name}
            width={22}
            height={16}
            className="rounded-[2px]"
          />
        ),
        title: course.name,
        pct,
      };
    })
    .filter((x): x is ContinueItem => x !== null);

  const inProgress = [...certItems, ...langItems].sort((a, b) => b.pct - a.pct).slice(0, 4);

  // Honest empty state that still looks intentional: instead of a bare
  // "no progress yet" message, show real catalog entries (one popular
  // cert, a few real language courses with their real flags) as "start
  // here" cards. This is catalog-level content — same category as a
  // course rating or lesson count — not fabricated personal progress;
  // every card honestly reads 0% and links to the real starting point.
  if (inProgress.length === 0) {
    const starterCert = findCertByCertId("az-900");
    const starterLangs = languageCourses.slice(0, 3);
    return (
      <div>
        <p className="mb-4 text-sm text-text-faint">{t("dashboard2.noProgressYet")}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {starterCert && (
            <Link
              href={`/certifications/${starterCert.company.slug}/${starterCert.cert.id}`}
              className="rounded-xl border border-dashed border-border-soft bg-panel p-4 transition-colors hover:border-primary/40"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-panel-alt px-2 py-0.5 text-[10px] font-bold text-text-faint">
                  {starterCert.cert.code}
                </span>
                <span className="text-lg">{getVendorIcon(starterCert.company.name, 22)}</span>
              </div>
              <p className="mb-3 text-sm font-bold leading-snug text-text">{starterCert.cert.title}</p>
              <span className="flex items-center gap-1 text-xs font-bold text-primary">
                <Compass size={13} />
                {t("dashboard2.discoverPaths")}
              </span>
            </Link>
          )}
          {starterLangs.map((course) => (
            <Link
              key={course.slug}
              href="/language-courses"
              className="rounded-xl border border-dashed border-border-soft bg-panel p-4 transition-colors hover:border-primary/40"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-panel-alt px-2 py-0.5 text-[10px] font-bold text-text-faint">
                  {course.levelRange}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://flagcdn.com/24x18/${course.countryCode}.png`}
                  alt={course.name}
                  width={22}
                  height={16}
                  className="rounded-[2px]"
                />
              </div>
              <p className="mb-3 text-sm font-bold leading-snug text-text">{course.name}</p>
              <span className="flex items-center gap-1 text-xs font-bold text-primary">
                <Compass size={13} />
                {t("dashboard2.discoverPaths")}
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {inProgress.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          className="rounded-xl border border-border-soft bg-panel p-4 transition-colors hover:border-primary/40"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {item.badge}
            </span>
            {item.icon}
          </div>
          <p className="mb-3 text-sm font-bold leading-snug text-text">{item.title}</p>
          <div className="h-1.5 w-full rounded-full bg-panel-alt">
            <div className="h-1.5 rounded-full bg-primary" style={{ width: `${Math.round(item.pct)}%` }} />
          </div>
          <p className="mt-1.5 text-xs text-text-faint">
            {Math.round(item.pct)}% {t("dashboard2.completedD")}
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
