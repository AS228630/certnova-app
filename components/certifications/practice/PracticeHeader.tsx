"use client";

import Link from "next/link";
import { ChevronLeft, Star, Bookmark, StickyNote } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

const levelStyles: Record<string, string> = {
  Beginner: "bg-success-light text-success",
  Intermediate: "bg-warning/15 text-warning",
  Advanced: "bg-danger/15 text-danger",
};

export default function PracticeHeader({
  companyName,
  companySlug,
  certCode,
  certTitle,
  level,
  rating,
  ratingCount,
  answered,
  correct,
  wrong,
  total,
  onToggleNotes,
}: {
  companyName: string;
  companySlug: string;
  certCode: string;
  certTitle: string;
  level: string;
  rating: number;
  ratingCount: number;
  answered: number;
  correct: number;
  wrong: number;
  total: number;
  onToggleNotes: () => void;
}) {
  const { t } = useLocale();
  const progress = total === 0 ? 0 : Math.round((answered / total) * 100);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-1.5 text-xs text-text-muted">
        <Link href="/certifications" className="hover:text-primary">
          {t("nav.certifications")}
        </Link>
        <span>/</span>
        <Link href={`/certifications/${companySlug}`} className="hover:text-primary">
          {companyName}
        </Link>
        <span>/</span>
        <Link href={`/certifications/${companySlug}/${certCode.toLowerCase()}`} className="hover:text-primary">
          {certCode}
        </Link>
        <span>/</span>
        <span className="text-text">{t("practice.practiceQuestionsTag")}</span>
      </div>

      <Link
        href={`/certifications/${companySlug}/${certCode.toLowerCase()}`}
        className="mb-3 inline-flex items-center gap-1 text-xs font-semibold text-text-muted hover:text-primary"
      >
        <ChevronLeft size={14} />
        {t("practice.backToOverview")}
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-extrabold text-text">
          {certCode}: {certTitle}
        </h1>
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${levelStyles[level] ?? levelStyles.Beginner}`}>
          {level}
        </span>
        <span className="flex items-center gap-1 text-sm font-semibold text-text">
          <Star size={14} className="fill-warning text-warning" />
          {rating} ({ratingCount.toLocaleString("de-DE")})
        </span>
        <button
          onClick={onToggleNotes}
          className="ml-auto flex h-8 items-center gap-1.5 rounded-lg border border-border-soft px-3 text-xs font-semibold text-text-muted hover:border-primary hover:text-primary"
        >
          <StickyNote size={14} />
          {t("practice.notes")}
        </button>
        <button
          aria-label={t("practice.bookmarkThis")}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-soft text-text-muted hover:border-primary hover:text-primary"
        >
          <Bookmark size={15} />
        </button>
      </div>

      <div className="mt-5 rounded-xl border border-border-soft bg-panel p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-text-muted">{t("practice.progressLabelP")}</span>
          <span className="font-bold text-text">{progress}%</span>
        </div>
        <div className="mb-4 h-2 w-full rounded-full bg-panel-alt">
          <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-border-soft pt-4 sm:grid-cols-4">
          <Stat value={total} label={t("practice.totalQuestions")} />
          <Stat value={answered} label={t("practice.answeredQ")} />
          <Stat value={correct} label={t("practice.correctLabel")} color="text-success" />
          <Stat value={wrong} label={t("practice.wrongLabel")} color="text-danger" />
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label, color = "text-text" }: { value: number; label: string; color?: string }) {
  return (
    <div>
      <p className={`text-lg font-extrabold ${color}`}>{value}</p>
      <p className="text-xs text-text-muted">{label}</p>
    </div>
  );
}
