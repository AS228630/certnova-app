"use client";

import Link from "next/link";
import { Bookmark, StickyNote, Shuffle } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

// The old "Frage X von Y" + overall progress bar was removed here — it's
// redundant now that SectionProgressBar shows progress for the active
// section (and SectionMenu shows "X-Y von Z Fragen"), which is the more
// useful number during practice. Breadcrumb + Mischen/Notizen/Bookmark
// utility buttons stay.
export default function PracticeToolbar({
  companyName,
  companySlug,
  certCode,
  certTitle,
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

      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          onClick={onShuffle}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-border-soft bg-panel px-3 text-xs font-semibold text-text-muted hover:border-primary hover:text-primary"
        >
          <Shuffle size={14} />
          {t("practice.shuffle")}
        </button>
        <button
          onClick={onToggleNotes}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-border-soft bg-panel px-3 text-xs font-semibold text-text-muted hover:border-primary hover:text-primary"
        >
          <StickyNote size={14} />
          {t("practice.notes")}
        </button>
        <button
          aria-label={t("practice.bookmarkThis")}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-border-soft bg-panel text-text-muted hover:border-primary hover:text-primary"
        >
          <Bookmark size={15} />
        </button>
      </div>
    </div>
  );
}
