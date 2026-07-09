"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Lock, Info } from "lucide-react";
import { getSectionSize, getSectionCount, UNLOCK_THRESHOLD } from "@/lib/practiceSections";
import { useLocale } from "@/components/LocaleProvider";

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
  const { t } = useLocale();
  const SECTION_SIZE = getSectionSize(total);
  const sectionCount = getSectionCount(total);
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

  function sectionCompleted(s: number): boolean {
    const [start, end] = sectionRange(s);
    for (let i = start; i < end; i++) {
      const st = statusFor(i);
      if (st !== "correct" && st !== "wrong") return false;
    }
    return true;
  }

  return (
    <div className="rounded-xl border border-border-soft bg-panel p-5">
      <p className="mb-3 flex items-center gap-1.5 font-bold text-text">
        {t("practice.questionNav")}
        <Info size={13} className="text-text-faint" />
      </p>
      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-text-muted">
        <Legend color="bg-success" label={t("practice.answeredQ")} />
        <Legend color="bg-warning" label={t("practice.markedQ")} />
        <Legend color="bg-panel-alt" label={t("practice.skippedQ")} />
        <Legend color="border border-primary" label={t("practice.currentQ")} />
      </div>

      <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
        {Array.from({ length: sectionCount }).map((_, s) => {
          const [start, end] = sectionRange(s);
          const unlocked = sectionUnlocked(s);
          const open = openSection === s && unlocked;
          const accuracy = sectionAccuracy(s);
          const completed = unlocked && sectionCompleted(s);

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
                  <span
                    className={`h-2 w-2 rounded-full ${
                      completed ? "bg-success" : unlocked ? "bg-primary" : "bg-text-faint"
                    }`}
                  />
                  {t("practice.sectionN")} {s + 1}
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
                  {t("practice.unlockHintNav").replace("{threshold}", String(UNLOCK_THRESHOLD)).replace("{current}", String(sectionAccuracy(s - 1)))}
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
                  {t("practice.successRateNav")}: {accuracy}%
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
