"use client";

import DashboardShell from "@/components/DashboardShell";
import DailyPlan from "@/components/DailyPlan";
import AICoach from "@/components/AICoach";
import ProgressPanel from "@/components/ProgressPanel";
import {
  Users,
  BookOpen,
  FlaskConical,
  CheckCircle2,
  Star,
  ChevronRight,
} from "lucide-react";
import { getVendorIcon } from "@/lib/vendorIcons";
import HeroPath from "@/components/HeroPath";
import CertsScroller from "@/components/CertsScroller";
import LanguageCoursesScroller from "@/components/LanguageCoursesScroller";
import LearningCalendar from "@/components/LearningCalendar";
import { useUser } from "@/components/UserContext";
import { getFirstName } from "@/lib/supabase/useUser";
import { useLocale } from "@/components/LocaleProvider";

const stats = [
  { icon: Users, labelKey: "dashboard2.statActiveLearners2", value: "120K+" },
  { icon: BookOpen, labelKey: "dashboard2.statPracticeQ", value: "35.000+" },
  { icon: FlaskConical, labelKey: "dashboard2.statLabsUsed", value: "2.500+" },
  { icon: CheckCircle2, labelKey: "dashboard2.statPassRate2", value: "98%" },
  { icon: Star, labelKey: "dashboard2.statRating2", value: "4,9/5" },
];

const certs = [
  { title: "AZ-900", subtitle: "Microsoft Azure Fundamentals", levelKey: "dashboard2.levelBeginnerD", rating: "4,8", vendor: "Microsoft" },
  { title: "SAA-C03", subtitle: "AWS Solutions Architect", levelKey: "dashboard2.levelIntermediateD", rating: "4,7", vendor: "AWS" },
  { title: "GCP", subtitle: "Cloud Digital Leader", levelKey: "dashboard2.levelBeginnerD", rating: "4,6", vendor: "Google" },
  { title: "CCNA 200-301", subtitle: "Cisco Certified Network Associate", levelKey: "dashboard2.levelIntermediateD", rating: "4,6", vendor: "Cisco" },
  { title: "CompTIA", subtitle: "Security+", levelKey: "dashboard2.levelBeginnerD", rating: "4,7", vendor: "CompTIA" },
];

const continueItems: {
  tagKey: "dashboard2.tagIT" | "dashboard2.tagLanguages";
  vendor?: string;
  flag?: string;
  title: string;
  progress: number;
}[] = [
  { tagKey: "dashboard2.tagIT", vendor: "Microsoft", title: "AZ-104: Microsoft Azure Administrator", progress: 65 },
  { tagKey: "dashboard2.tagLanguages", flag: "🇩🇪", title: "Deutsch B1 Intensivkurs", progress: 42 },
  { tagKey: "dashboard2.tagLanguages", flag: "🇬🇧", title: "English B2 Upper Intermediate", progress: 30 },
  { tagKey: "dashboard2.tagIT", vendor: "AWS", title: "AWS Solutions Architect SAA-C03", progress: 20 },
];

const newsItems = [
  {
    tagKey: "dashboard2.tagNew",
    tagClass: "bg-success-light text-success",
    titleKey: "dashboard2.newsVersionTitle",
    descKey: "dashboard2.newsVersionDesc",
    dateKey: "dashboard2.today",
  },
  {
    tagKey: "dashboard2.tagLanguageCourse",
    tagClass: "bg-success-light text-success",
    titleKey: "dashboard2.newsB2Title",
    descKey: "dashboard2.newsB2Desc",
    date: "2. Mai 2024",
  },
  {
    tagKey: "dashboard2.tagCertification",
    tagClass: "bg-warning/15 text-warning",
    titleKey: "dashboard2.newsAiTitle",
    descKey: "dashboard2.newsAiDesc",
    date: "30. Apr 2024",
  },
  {
    tagKey: "dashboard2.tagFeature",
    tagClass: "bg-primary-light text-primary",
    titleKey: "dashboard2.newsCoachTitle",
    descKey: "dashboard2.newsCoachDesc",
    date: "28. Apr 2024",
  },
];

const languageCourses = [
  { flag: "🇩🇪", language: "Deutsch", level: "A1 - C2", rating: "4,8" },
  { flag: "🇬🇧", language: "English", level: "A1 - C2", rating: "4,8" },
  { flag: "🇫🇷", language: "Français", level: "A1 - B2", rating: "4,7" },
  { flag: "🇪🇸", language: "Español", level: "A1 - B2", rating: "4,7" },
];

// Rendered *inside* DashboardShell so it sits below UserContext.Provider in the tree.
function Greeting() {
  const { user } = useUser();
  const { t } = useLocale();
  return <p className="mb-2 text-sm text-text-muted">{t("dashboard2.goodMorning")}, {getFirstName(user)}! 👋</p>;
}

export default function DashboardPage() {
  const { t } = useLocale();
  return (
    <DashboardShell>
      <main className="grid grid-cols-1 gap-5 p-3 sm:gap-6 sm:p-4 md:p-8 lg:grid-cols-3">
          <div className="space-y-5 sm:space-y-6 lg:col-span-2">
            {/* Hero */}
            <div className="rounded-2xl border border-border-soft bg-panel p-4 sm:p-6 md:p-8">
              <Greeting />
              <h1 className="text-xl font-extrabold leading-snug text-text sm:text-2xl md:text-3xl">
                {t("dashboard2.heroLine1")}
                <br />
                <span className="text-primary">{t("dashboard2.heroLine2")}</span>
              </h1>
              <p className="mt-3 max-w-lg text-sm text-text-muted">
                {t("dashboard2.heroDesc2")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark">
                  {t("dashboard2.continueLearningBtn")}
                  <ChevronRight size={16} />
                </button>
                <button className="rounded-lg border border-border-soft px-5 py-2.5 text-sm font-bold text-text hover:bg-panel-alt">
                  {t("dashboard2.discoverPaths")}
                </button>
              </div>

              {/* Path illustration */}
              <div className="mt-8">
                <HeroPath />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border-soft pt-6 sm:grid-cols-5">
                {stats.map((s) => (
                  <div key={s.labelKey} className="flex items-center gap-2">
                    <s.icon size={16} className="text-primary" />
                    <div>
                      <p className="text-sm font-bold text-text">{s.value}</p>
                      <p className="text-[10px] text-text-faint">{t(s.labelKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weitermachen */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-text">{t("dashboard2.continuePlaying")}</h2>
                <span className="cursor-pointer text-xs font-semibold text-primary">{t("dashboard2.viewAllD")}</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {continueItems.map((item) => (
                  <div key={item.title} className="rounded-xl border border-border-soft bg-panel p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          item.tagKey === "dashboard2.tagIT"
                            ? "bg-primary-light text-primary"
                            : "bg-success-light text-success"
                        }`}
                      >
                        {t(item.tagKey)}
                      </span>
                      <span className="text-lg">
                        {item.flag ? item.flag : getVendorIcon(item.vendor!, 22)}
                      </span>
                    </div>
                    <p className="mb-3 text-sm font-bold leading-snug text-text">{item.title}</p>
                    <div className="h-1.5 w-full rounded-full bg-panel-alt">
                      <div
                        className="h-1.5 rounded-full bg-primary"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-text-faint">{item.progress}% {t("dashboard2.completedD")}</p>
                    <button className="mt-3 flex items-center gap-1 text-xs font-bold text-primary">
                      {t("dashboard2.resume")}
                      <ChevronRight size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Aktuelles & Neuigkeiten */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-text">{t("dashboard2.newsAndUpdates")}</h2>
                <span className="cursor-pointer text-xs font-semibold text-primary">{t("dashboard2.viewAllD")}</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {newsItems.map((n) => (
                  <div key={n.titleKey} className="rounded-xl border border-border-soft bg-panel p-4">
                    <span
                      className={`mb-3 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${n.tagClass}`}
                    >
                      {t(n.tagKey)}
                    </span>
                    <p className="mb-1 text-sm font-bold leading-snug text-text">{t(n.titleKey)}</p>
                    <p className="mb-3 text-xs leading-relaxed text-text-faint">{t(n.descKey)}</p>
                    <p className="text-[11px] font-medium text-text-faint">{n.dateKey ? t(n.dateKey) : n.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Beliebte Zertifizierungen */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-text">{t("dashboard2.popularCerts")}</h2>
                <span className="cursor-pointer text-xs font-semibold text-primary">{t("dashboard2.viewAllD")}</span>
              </div>
              <CertsScroller certs={certs.map((c) => ({ ...c, level: t(c.levelKey) }))} />
            </div>

            {/* Beliebte Sprachkurse */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-text">{t("dashboard2.popularLangCourses")}</h2>
                <span className="cursor-pointer text-xs font-semibold text-primary">{t("dashboard2.viewAllD")}</span>
              </div>
              <LanguageCoursesScroller courses={languageCourses} />
            </div>
          </div>

          <div className="space-y-6">
            <DailyPlan />
            <AICoach />
            <ProgressPanel />
            <LearningCalendar />
          </div>
      </main>
    </DashboardShell>
  );
}
