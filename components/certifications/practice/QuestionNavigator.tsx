"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Lock } from "lucide-react";

type Status = "current" | "correct" | "wrong" | "marked" | "skipped" | "unanswered";

const TARGET_SECTIONS = 5;
const MAX_SECTION_SIZE = 50;
const UNLOCK_THRESHOLD = 90;

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
  // Aim for 5 roughly-equal sections for small/medium banks; cap each
  // section at 50 questions for large banks, so a 500+ question bank
  // naturally produces more (e.g. ~11-12) sections instead of a few huge ones.
  const SECTION_SIZE = Math.max(1, Math.min(MAX_SECTION_SIZE, Math.ceil(total / TARGET_SECTIONS)));
  const sectionCount = Math.max(1, Math.ceil(total / SECTION_SIZE));
  const currentSection = Math.floor(currentIndex / SECTION_SIZE);
  const [openSection, setOpenSection] = useState(currentSection);

  const styles: Record<Status, string> = {
    current: "border-2 border-primary text-primary bg-primary-light",
    correct: "bg-success text-white",
    wrong: "bg-danger text-white",
    marked: "bg-warning text-white",
    skipped: "bg-panel-alt text-text-faint",
    unanswered: "border border-border-soft text-text-muted hover:border-primary/40",
  };

  function sectionRange(s: number): [number, number] {
    return [s * SECTION_SIZE, Math.min(total, (s + 1) * SECTION_SIZE)];
  }

  function sectionAccuracy(s: number): number {
    const [start, end] = sectionRange(s);
    let correct = 0;
    let answered = 0;
    for (let i = start; i < end; i++) {
      const st = statusFor(i);
      if (st === "correct") {
        correct++;
        answered++;
      } else if (st === "wrong") {
        answered++;
      }
    }
    return answered === 0 ? 0 : Math.round((correct / answered) * 100);
  }

  function sectionUnlocked(s: number): boolean {
    return s <= 1 || sectionAccuracy(s - 1) >= UNLOCK_THRESHOLD;
  }

  return (
    <div className="rounded-xl border border-border-soft bg-panel p-5">
      <p className="mb-3 font-bold text-text">Fragen-Navigator</p>
      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-text-muted">
        <Legend color="bg-success" label="Beantwortet" />
        <Legend color="bg-warning" label="Markiert" />
        <Legend color="bg-panel-alt" label="Übersprungen" />
        <Legend color="border border-primary" label="Aktuell" />
      </div>

      <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
        {Array.from({ length: sectionCount }).map((_, s) => {
          const [start, end] = sectionRange(s);
          const unlocked = sectionUnlocked(s);
          const open = openSection === s && unlocked;
          const accuracy = sectionAccuracy(s);

          return (
            <div key={s} className="rounded-lg border border-border-soft">
              <button
                onClick={() => unlocked && setOpenSection(open ? -1 : s)}
                disabled={!unlocked}
                className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm ${
                  unlocked ? "text-text hover:bg-panel-alt" : "cursor-not-allowed text-text-faint"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${unlocked ? "bg-primary" : "bg-text-faint"}`} />
                  Abschnitt {s + 1}
                  <span className="text-[11px] text-text-faint">
                    ({start + 1}–{end})
                  </span>
                </span>
                {unlocked ? (
                  open ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )
                ) : (
                  <Lock size={12} />
                )}
              </button>

              {!unlocked && (
                <p className="border-t border-border-soft px-3 py-2 text-[11px] text-text-faint">
                  Für die Freischaltung muss Ihre Erfolgsquote im vorherigen Abschnitt über {UNLOCK_THRESHOLD}%
                  liegen (aktuell {sectionAccuracy(s - 1)}%).
                </p>
              )}

              {open && (
                <div className="grid max-h-64 grid-cols-6 gap-1.5 overflow-y-auto border-t border-border-soft p-3 sm:grid-cols-8 lg:grid-cols-5 xl:grid-cols-6">
                  {Array.from({ length: end - start }).map((_, j) => {
                    const i = start + j;
                    return (
                      <button
                        key={i}
                        onClick={() => onJump(i)}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition ${
                          styles[i === currentIndex ? "current" : statusFor(i)]
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              )}

              {unlocked && s > 0 && (
                <p className="border-t border-border-soft px-3 py-1.5 text-[10px] text-text-faint">
                  Erfolgsquote: {accuracy}%
                </p>
              )}
            </div>
          );
        })}
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
