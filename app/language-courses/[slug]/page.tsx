"use client";

import { notFound } from "next/navigation";
import { use, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock3, Star, GraduationCap } from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import { languageCourses } from "@/lib/languageCoursesData";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserContext";
import { useLanguageCourseStore } from "@/lib/store/languageCourseStore";

function CourseDetailBody({ slug }: { slug: string }) {
  const { t } = useLocale();
  const { user } = useUser();
  const course = languageCourses.find((c) => c.slug === slug);
  const { progress, load, loaded } = useLanguageCourseStore();

  useEffect(() => {
    if (user?.id && !loaded) load(user.id);
  }, [user?.id, loaded, load]);

  if (!course) notFound();

  const lessonsCompleted = progress[course.slug] ?? 0;
  const pct = course.totalLessons === 0 ? 0 : Math.min(100, Math.round((lessonsCompleted / course.totalLessons) * 100));

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-3 sm:p-4 md:p-8">
      <Link href="/language-courses" className="flex items-center gap-1.5 text-sm font-semibold text-text-muted hover:text-text">
        <ArrowLeft size={15} />
        {t("languageCourses.backToOverview")}
      </Link>

      <div className="rounded-2xl border border-border-soft bg-panel p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-3">
          <img
            src={`https://flagcdn.com/w160/${course.countryCode}.png`}
            alt={course.name}
            className="h-10 w-14 rounded-md object-cover shadow-lg"
          />
          <div>
            <h1 className="text-xl font-extrabold text-text sm:text-2xl">{course.name}</h1>
            <p className="text-sm text-text-faint">{course.levelRange}</p>
          </div>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-text-muted">{course.tagline}</p>

        <div className="mb-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-border-soft bg-panel-alt px-3 py-2.5 text-center">
            <p className="flex items-center justify-center gap-1 text-sm font-bold text-text">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              {course.rating}
            </p>
            <p className="text-[10px] text-text-faint">{course.ratingCount}</p>
          </div>
          <div className="rounded-xl border border-border-soft bg-panel-alt px-3 py-2.5 text-center">
            <p className="text-sm font-bold text-text">{course.totalLessons}</p>
            <p className="text-[10px] text-text-faint">{t("languageCourses.lessonsLabel")}</p>
          </div>
          <div className="rounded-xl border border-border-soft bg-panel-alt px-3 py-2.5 text-center">
            <p className="text-sm font-bold text-text">{pct}%</p>
            <p className="text-[10px] text-text-faint">{t("languageCourses.progressLabel")}</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-border-soft bg-panel-alt p-4 text-left text-xs leading-relaxed text-text-muted">
          <Clock3 size={16} className="mt-0.5 shrink-0 text-primary" />
          <div>
            <p className="mb-1 font-semibold text-text">{t("languageCourses.lessonsComingSoonTitle")}</p>
            <p>{t("languageCourses.lessonsComingSoonDesc")}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 rounded-xl border border-border-soft bg-panel p-4 text-xs text-text-faint">
        <GraduationCap size={16} className="shrink-0" />
        {t("languageCourses.notifyHint")}
      </div>
    </main>
  );
}

export default function LanguageCourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return (
    <DashboardShell>
      <CourseDetailBody slug={slug} />
    </DashboardShell>
  );
}
