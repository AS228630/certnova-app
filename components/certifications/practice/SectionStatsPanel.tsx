"use client";

import { useEffect } from "react";
import { X, BarChart3 } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

type Status = "correct" | "wrong" | "marked" | "skipped" | "unanswered";

// Slide-in drawer from the right (per design spec section 12: "بهتر است
// به‌صورت Drawer از سمت راست باز شود"), triggered by the "Fortschritt"
// button in the header row. Scoped to the CURRENT section — "Gesamt
// Fragen" always equals the section size.
export default function SectionStatsPanel({
  start,
  end,
  statusFor,
  open,
  onClose,
}: {
  start: number;
  end: number;
  statusFor: (index: number) => Status;
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLocale();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  let correct = 0;
  let wrong = 0;
  for (let i = start; i < end; i++) {
    const st = statusFor(i);
    if (st === "correct") correct++;
    else if (st === "wrong") wrong++;
  }
  const total = end - start;
  const unanswered = total - correct - wrong;
  const resolved = correct + wrong;
  const pct = total === 0 ? 0 : Math.round((resolved / total) * 100);
  const circumference = 2 * Math.PI * 42;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-border-soft bg-panel shadow-2xl transition-transform duration-200 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-border-soft px-5 py-4">
          <span className="flex items-center gap-2 text-sm font-bold text-text">
            <BarChart3 size={16} className="text-primary" />
            {t("practice.sectionStats")}
          </span>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-faint hover:bg-panel-alt hover:text-text"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5">
          {/* Progress circle */}
          <div className="flex flex-col items-center py-4">
            <svg width="112" height="112" viewBox="0 0 100 100" className="-rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-panel-alt)" strokeWidth="9" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#statsGradient)"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (pct / 100) * circumference}
                className="transition-all duration-300 ease-in-out"
              />
              <defs>
                <linearGradient id="statsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
            <p className="-mt-16 text-2xl font-extrabold text-text">{pct}%</p>
            <p className="mt-16 text-xs text-text-faint">{t("practice.sectionProgress")}</p>
          </div>

          <div className="mt-4 space-y-2.5">
            <StatRow dotColor="bg-success" label={t("practice.correctlyAnswered")} value={correct} />
            <StatRow dotColor="bg-danger" label={t("practice.wronglyAnswered")} value={wrong} />
            <StatRow dotColor="bg-text-faint" label={t("practice.notAnswered")} value={unanswered} />
            <div className="flex items-center justify-between border-t border-divider pt-2.5">
              <span className="text-[13px] font-semibold text-text-muted">{t("practice.totalQuestions")}</span>
              <span className="text-[13px] font-extrabold text-text">{total}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StatRow({ dotColor, label, value }: { dotColor: string; label: string; value: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-panel-alt px-3 py-2.5">
      <span className="flex items-center gap-2 text-[13px] text-text-muted">
        <span className={`h-2 w-2 shrink-0 rounded-full ${dotColor}`} />
        {label}
      </span>
      <span className="text-[13px] font-bold text-text">{value}</span>
    </div>
  );
}
