"use client";

type Status = "current" | "correct" | "wrong" | "marked" | "skipped" | "unanswered";

const styles: Record<Status, string> = {
  current: "bg-primary text-white shadow-md shadow-primary/30 scale-105",
  correct: "bg-success text-white shadow-sm",
  wrong: "bg-danger text-white shadow-sm",
  marked: "bg-warning text-white shadow-sm",
  skipped: "bg-panel-alt text-text-faint border border-border-soft",
  unanswered: "bg-panel border border-border-soft text-text-muted shadow-sm hover:border-primary/50 hover:text-primary",
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
    <div className="mt-3 grid grid-cols-8 gap-2 rounded-xl border border-border-soft bg-panel p-4 sm:grid-cols-12 md:grid-cols-14 lg:grid-cols-16">
      {Array.from({ length: end - start }).map((_, j) => {
        const i = start + j;
        return (
          <button
            key={i}
            onClick={() => onJump(i)}
            className={`flex h-9 w-9 items-center justify-center rounded-xl text-[13px] font-bold transition-all duration-150 ${
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
