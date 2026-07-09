"use client";

import Link from "next/link";
import { Clock3, Bookmark, StickyNote, Shuffle } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export default function PracticeToolbar({
  companyName,
  companySlug,
  certCode,
  certTitle,
  index,
  total,
  onToggleNotes,
  onShuffle,
}: {
  companyName: string;
  companySlug: string;
  certCode: string;
  certTitle: string;
  index: number;
  total: number;
  onToggleNotes: () => void;
  onShuffle: () => void;
}) {
  const { t } = useLocale();
  const progress = total === 0 ? 0 : Math.round(((index + 1) / total) * 100);

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
          {certCode}: {certTitle}
        </Link>
        <span>/</span>
        <span className="text-text">{t("practice.practiceExam")}</span>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border-soft bg-panel px-4 py-3">
        <span className="flex flex-none items-center gap-2 text-sm font-semibold text-text">
          <Clock3 size={15} className="text-text-faint" />
          {t("practice.questionOf").replace("{index}", String(index + 1)).replace("{total}", String(total))}
        </span>

        <div className="h-2 min-w-[120px] flex-1 rounded-full bg-panel-alt">
          <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>

        <span className="flex-none text-sm font-bold text-text">{progress}%</span>

        <button
          onClick={onShuffle}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-border-soft px-3 text-xs font-semibold text-text-muted hover:border-primary hover:text-primary"
        >
          <Shuffle size={14} />
          {t("practice.shuffle")}
        </button>
        <button
          onClick={onToggleNotes}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-border-soft px-3 text-xs font-semibold text-text-muted hover:border-primary hover:text-primary"
        >
          <StickyNote size={14} />
          {t("practice.notes")}
        </button>
        <button
          aria-label={t("practice.bookmarkThis")}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-border-soft text-text-muted hover:border-primary hover:text-primary"
        >
          <Bookmark size={15} />
        </button>
      </div>
    </div>
  );
}
