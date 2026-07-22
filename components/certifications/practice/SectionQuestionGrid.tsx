"use client";

type Status = "current" | "correct" | "wrong" | "marked" | "skipped" | "unanswered";

const styles: Record<Status, string> = {
  current: "bg-primary text-white shadow-[0_0_0_4px_rgba(124,58,237,0.25),0_4px_14px_rgba(124,58,237,0.5)] scale-105",
  correct: "bg-success text-white shadow-[0_0_10px_rgba(34,197,94,0.35)]",
  wrong: "bg-danger text-white shadow-[0_0_10px_rgba(239,68,68,0.35)]",
  marked: "border-2 border-warning bg-panel text-warning",
  skipped: "bg-panel-alt text-text-faint border border-border-soft",
  unanswered: "bg-panel border border-border-soft text-text-muted hover:border-primary/60 hover:text-primary hover:shadow-[0_0_8px_rgba(124,58,237,0.25)]",
};

// Always-visible number grid for the CURRENT section — no click needed to
// reveal it, unlike the Abschnitt switcher dropdown above it. Sits in
// normal document flow (not absolute), so it naturally pushes the
// question panel below it down instead of overlaying on top of it.
export default function SectionQuestionGrid({
  start,
  end,
  currentIndex,
  statusFor,
  onJump,
}: {
  start: number;
  end: number;
  currentIndex: number;
  statusFor: (index: number) => Status;
  onJump: (index: number) => void;
}) {
  return (
    <div className="mt-3 grid grid-cols-5 gap-2 rounded-xl border border-border-soft bg-panel p-4 sm:grid-cols-10 md:[grid-template-columns:repeat(13,minmax(0,1fr))] lg:[grid-template-columns:repeat(25,minmax(0,1fr))]">
      {Array.from({ length: end - start }).map((_, j) => {
        const i = start + j;
        return (
          <button
            key={i}
            onClick={() => onJump(i)}
            className={`flex h-9 w-9 items-center justify-center rounded-xl text-[13px] font-bold transition-all duration-200 ease-in-out hover:scale-[1.06] ${
              styles[i === currentIndex ? "current" : statusFor(i)]
            }`}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}
