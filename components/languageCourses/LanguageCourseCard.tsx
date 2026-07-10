"use client";

import Link from "next/link";
import { Star, BookOpen, ArrowRight } from "lucide-react";
import type { LanguageCourse } from "@/lib/languageCoursesData";
import { useLanguageCourseStore } from "@/lib/store/languageCourseStore";
import { useLocale } from "@/components/LocaleProvider";

export default function LanguageCourseCard({ course }: { course: LanguageCourse }) {
  const { t } = useLocale();
  const lessonsCompleted = useLanguageCourseStore((s) => s.progress[course.slug] ?? 0);
  const pct = course.totalLessons === 0 ? 0 : Math.min(100, Math.round((lessonsCompleted / course.totalLessons) * 100));

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border-soft bg-panel">
      <div className="relative flex h-28 items-center justify-center bg-gradient-to-br from-primary/30 via-panel-alt to-panel-alt">
        <span className="text-5xl">{course.flagEmoji}</span>
        <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          {course.levelRange}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="font-bold text-text">{course.name}</p>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-text-faint">{course.tagline}</p>

        <div className="mt-3">
          <div className="mb-1 h-1.5 w-full rounded-full bg-panel-alt">
            <div className="h-1.5 rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-[11px] text-text-faint">{pct}% {t("languageCourses.completed")}</p>
        </div>

        <div className="mt-3 flex items-center gap-3 text-xs text-text-faint">
          <span className="flex items-center gap-1">
            <Star size={12} className="fill-warning text-warning" />
            {course.rating} ({course.ratingCount})
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={12} />
            {course.totalLessons} {t("languageCourses.lessonsSuffix")}
          </span>
        </div>

        <Link
          href={`/language-courses/${course.slug}`}
          className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
        >
          {t("languageCourses.continueCta")}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
