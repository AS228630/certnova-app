"use client";

import { useState } from "react";
import { Languages, Search, ChevronDown, Sparkles, Target, MessageCircle, Award } from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import LanguageCourseCard from "@/components/languageCourses/LanguageCourseCard";
import LanguageCoursesHero from "@/components/languageCourses/LanguageCoursesHero";
import { languageCourses } from "@/lib/languageCoursesData";
import { useLocale } from "@/components/LocaleProvider";

const features = [
  { icon: Sparkles, titleKey: "languageCourses.featureInteractiveTitle", descKey: "languageCourses.featureInteractiveDesc" },
  { icon: Target, titleKey: "languageCourses.featurePersonalizedTitle", descKey: "languageCourses.featurePersonalizedDesc" },
  { icon: MessageCircle, titleKey: "languageCourses.featureFeedbackTitle", descKey: "languageCourses.featureFeedbackDesc" },
  { icon: Award, titleKey: "languageCourses.featureCertificateTitle", descKey: "languageCourses.featureCertificateDesc" },
];

function LanguageCoursesBody() {
  const { t } = useLocale();
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  const filtered = languageCourses.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  const visible = filtered.slice(0, visibleCount);

  return (
    <main className="mx-auto max-w-7xl space-y-10 p-3 sm:p-4 md:p-8">
      {/* Hero */}
      <section className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-bold text-primary">
            <Languages size={12} />
            {t("languageCourses.badge")}
          </span>
          <h1 className="text-2xl font-extrabold text-text sm:text-3xl">
            {t("languageCourses.subtitleHighlight")} <span className="text-primary">{t("languageCourses.subtitle")}</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm text-text-muted">{t("languageCourses.description")}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark">
              {t("languageCourses.findCourseCta")}
            </button>
            <button className="rounded-lg border border-border-soft px-5 py-2.5 text-sm font-bold text-text hover:bg-panel-alt">
              {t("languageCourses.levelTestCta")}
            </button>
          </div>
        </div>
        <div className="flex h-40 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-fuchsia-500/10">
          <LanguageCoursesHero className="h-full w-full" />
        </div>
      </section>

      {/* Real catalog stats — language/course counts are catalog facts
          (same convention as companiesData.ts), not per-user progress. */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { value: `${languageCourses.length}+`, labelKey: "languageCourses.statLanguages" },
          { value: `${languageCourses.reduce((s, c) => s + c.totalLessons, 0)}+`, labelKey: "languageCourses.statCourses" },
          {
            value: `${(languageCourses.reduce((s, c) => s + parseFloat(c.ratingCount), 0)).toFixed(0)}K+`,
            labelKey: "languageCourses.statLearners",
          },
          {
            value: (languageCourses.reduce((s, c) => s + c.rating, 0) / languageCourses.length).toFixed(1) + "/5",
            labelKey: "languageCourses.statAvgRating",
          },
        ].map((s) => (
          <div key={s.labelKey} className="rounded-xl border border-border-soft bg-panel p-4 text-center">
            <p className="text-xl font-extrabold text-text">{s.value}</p>
            <p className="mt-0.5 text-xs text-text-faint">{t(s.labelKey)}</p>
          </div>
        ))}
      </section>

      {/* Search / filters */}
      <section className="flex flex-wrap gap-3">
        <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-border-soft bg-panel px-3 py-2.5">
          <Search size={16} className="text-text-faint" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("languageCourses.searchPlaceholder")}
            className="w-full bg-transparent text-sm text-text placeholder:text-text-faint focus:outline-none"
          />
        </div>
        {[t("languageCourses.allLanguages"), t("languageCourses.allLevels"), t("languageCourses.courseType")].map((label) => (
          <button
            key={label}
            className="flex items-center gap-1.5 rounded-lg border border-border-soft bg-panel px-3 py-2.5 text-sm text-text-muted hover:bg-panel-alt"
          >
            {label}
            <ChevronDown size={14} />
          </button>
        ))}
      </section>

      {/* Course grid */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((course) => (
          <LanguageCourseCard key={course.slug} course={course} />
        ))}
      </section>

      {visibleCount < filtered.length && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + 8)}
            className="flex items-center gap-1.5 rounded-lg border border-border-soft px-5 py-2.5 text-sm font-semibold text-text hover:bg-panel-alt"
          >
            {t("languageCourses.showMore")}
            <ChevronDown size={14} />
          </button>
        </div>
      )}

      {/* Feature strip */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.titleKey} className="rounded-xl border border-border-soft bg-panel p-4">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light text-primary">
              <f.icon size={17} />
            </div>
            <p className="text-sm font-bold text-text">{t(f.titleKey)}</p>
            <p className="mt-1 text-xs leading-relaxed text-text-faint">{t(f.descKey)}</p>
          </div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="rounded-2xl bg-gradient-to-br from-primary to-fuchsia-600 p-6 text-center sm:p-8">
        <h2 className="text-lg font-extrabold text-white sm:text-xl">{t("languageCourses.bottomCtaTitle")}</h2>
        <p className="mx-auto mt-1.5 max-w-md text-sm text-white/80">{t("languageCourses.bottomCtaDesc")}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-primary hover:bg-white/90">
            {t("languageCourses.findCourseCta")}
          </button>
          <button className="rounded-lg border border-white/40 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10">
            {t("languageCourses.levelTestCta")}
          </button>
        </div>
      </section>
    </main>
  );
}

export default function LanguageCoursesPage() {
  return (
    <DashboardShell>
      <LanguageCoursesBody />
    </DashboardShell>
  );
}
