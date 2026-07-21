"use client";

import { useLocale } from "@/components/LocaleProvider";

type Status = "correct" | "wrong" | "marked" | "skipped" | "unanswered";

// Shows progress within the CURRENT section only (e.g. "12 / 50 · 24%"),
// distinct from PracticeToolbar's overall exam progress bar. Sits next to
// SectionMenu in the header row.
export default function SectionProgressBar({
  start,
  end,
  sectionNumber,
  statusFor,
}: {
  start: number;
  end: number;
  sectionNumber: number;
  statusFor: (index: number) => Status;
}) {
  const { t } = useLocale();
  const size = end - start;

  let resolved = 0;
  for (let i = start; i < end; i++) {
    const st = statusFor(i);
    if (st === "correct" || st === "wrong") resolved++;
  }
  const pct = size === 0 ? 0 : Math.round((resolved / size) * 100);

  return (
    <div className="flex flex-1 items-center gap-3 rounded-xl border border-border-soft bg-panel px-4 py-3">
      <span className="hidden shrink-0 text-xs font-semibold text-text-muted sm:inline">
        {t("practice.sectionProgress")} {sectionNumber}
      </span>
      <div className="h-2 min-w-[80px] flex-1 rounded-full bg-panel-alt">
        <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="shrink-0 text-xs font-bold text-text">
        {resolved} / {size}
      </span>
      <span className="shrink-0 rounded-full bg-panel-alt px-2 py-0.5 text-[11px] font-bold text-text">{pct}%</span>
    </div>
  );
}
