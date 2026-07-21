"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, BarChart3 } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

type Status = "correct" | "wrong" | "marked" | "skipped" | "unanswered";

// Floating stats card scoped to the CURRENT section (not the whole exam
// — "Gesamt Fragen" always equals the section size). Fixed to the
// top-right corner of the viewport, below the KI Chat button, so it
// overlays empty screen space and never takes width away from the
// question panel below it. Collapsible via the chevron button.
export default function SectionStatsPanel({
  start,
  end,
  statusFor,
}: {
  start: number;
  end: number;
  statusFor: (index: number) => Status;
}) {
  const { t } = useLocale();
  const [open, setOpen] = useState(true);

  let correct = 0;
  let wrong = 0;
  for (let i = start; i < end; i++) {
    const st = statusFor(i);
    if (st === "correct") correct++;
    else if (st === "wrong") wrong++;
  }
  const total = end - start;
  const unanswered = total - correct - wrong;

  return (
    <div className="fixed right-5 top-24 z-30 hidden w-56 rounded-xl border border-border-soft bg-panel shadow-lg lg:block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-1.5 px-3.5 py-2.5 text-text-muted hover:text-text"
        aria-label={t("practice.toggleStats")}
      >
        <span className="flex items-center gap-1.5 text-[12px] font-semibold">
          <BarChart3 size={13} className="text-primary" />
          {t("practice.sectionStats")}
        </span>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {open && (
        <div className="space-y-2 border-t border-border-soft px-3.5 py-3">
          <StatRow dotColor="bg-success" label={t("practice.correctlyAnswered")} value={correct} />
          <StatRow dotColor="bg-danger" label={t("practice.wronglyAnswered")} value={wrong} />
          <StatRow dotColor="bg-text-faint" label={t("practice.notAnswered")} value={unanswered} />
          <div className="flex items-center justify-between border-t border-border-soft pt-2">
            <span className="text-[12px] font-semibold text-text-muted">{t("practice.totalQuestions")}</span>
            <span className="text-[12px] font-extrabold text-text">{total}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function StatRow({ dotColor, label, value }: { dotColor: string; label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-[12px] text-text-muted">
        <span className={`h-2 w-2 shrink-0 rounded-full ${dotColor}`} />
        {label}
      </span>
      <span className="text-[12px] font-bold text-text">{value}</span>
    </div>
  );
}
