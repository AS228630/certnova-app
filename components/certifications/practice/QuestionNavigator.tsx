"use client";

type Status = "current" | "correct" | "wrong" | "marked" | "skipped" | "unanswered";

export default function QuestionNavigator({
  total,
  currentIndex,
  statusFor,
  onJump,
}: {
  total: number;
  currentIndex: number;
  statusFor: (index: number) => Status;
  onJump: (index: number) => void;
}) {
  const styles: Record<Status, string> = {
    current: "border-2 border-primary text-primary bg-primary-light",
    correct: "bg-success text-white",
    wrong: "bg-danger text-white",
    marked: "bg-warning text-white",
    skipped: "bg-panel-alt text-text-faint",
    unanswered: "border border-border-soft text-text-muted hover:border-primary/40",
  };

  return (
    <div className="rounded-xl border border-border-soft bg-panel p-5">
      <p className="mb-3 font-bold text-text">Fragen-Navigator</p>
      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-text-muted">
        <Legend color="bg-success" label="Beantwortet" />
        <Legend color="bg-warning" label="Markiert" />
        <Legend color="bg-panel-alt" label="Übersprungen" />
        <Legend color="border border-primary" label="Aktuell" />
      </div>

      <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-8 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onJump(i)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition ${
              styles[i === currentIndex ? "current" : statusFor(i)]
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}
