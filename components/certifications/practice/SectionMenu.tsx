"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Lock, ListChecks, Check } from "lucide-react";
import { getSectionSize, getSectionCount, UNLOCK_THRESHOLD } from "@/lib/practiceSections";
import { useLocale } from "@/components/LocaleProvider";

type Status = "current" | "correct" | "wrong" | "marked" | "skipped" | "unanswered";

// Dropdown used only to SWITCH between sections (Abschnitte) — a simple
// list of section names with lock state and accuracy. The actual question
// number grid for whichever section is active is a separate, always-
// visible component (SectionQuestionGrid) rendered by the parent, so it
// never requires a click to appear.
export default function SectionMenu({
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

  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

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

  function sectionCompleted(s: number): boolean {
    const [start, end] = sectionRange(s);
    for (let i = start; i < end; i++) {
      const st = statusFor(i);
      if (st !== "correct" && st !== "wrong") return false;
    }
    return true;
  }

  function sectionUnlocked(s: number): boolean {
    return s <= 1 || (sectionCompleted(s - 1) && sectionAccuracy(s - 1) >= UNLOCK_THRESHOLD);
  }

  return (
    <div className="relative flex flex-wrap items-center gap-3 sm:flex-none" ref={ref}>
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-border-soft bg-panel px-4 py-3 text-sm font-bold text-text transition-colors hover:bg-panel-alt"
      >
        <ListChecks size={16} className="text-primary" />
        {t("practice.sectionN")} {currentSection + 1}
        <span className="font-normal text-text-faint">/ {sectionCount}</span>
        <ChevronDown size={15} className={`transition-transform ${menuOpen ? "rotate-180" : ""}`} />
      </button>

      <span className="whitespace-nowrap text-[13px] text-text-faint">
        {sectionRange(currentSection)[0] + 1}–{sectionRange(currentSection)[1]} {t("practice.ofWord")}{" "}
        {sectionRange(currentSection)[1] - sectionRange(currentSection)[0]} {t("practice.questionsWord")}
      </span>

      {menuOpen && (
        <div className="absolute left-0 top-full z-30 mt-2 max-h-[70vh] w-full min-w-[280px] overflow-y-auto rounded-xl border border-border-soft bg-panel p-2 shadow-lg sm:w-80">
          {Array.from({ length: sectionCount }).map((_, s) => {
            const [start, end] = sectionRange(s);
            const unlocked = sectionUnlocked(s);
            const accuracy = sectionAccuracy(s);
            const completed = unlocked && sectionCompleted(s);
            const isCurrent = s === currentSection;

            return (
              <div key={s}>
                <button
                  onClick={() => {
                    if (!unlocked) return;
                    onJump(start);
                    setMenuOpen(false);
                  }}
                  disabled={!unlocked}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    isCurrent ? "bg-primary-light text-primary" : unlocked ? "text-text hover:bg-panel-alt" : "cursor-not-allowed text-text-faint"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {completed ? (
                      <Check size={14} className="text-success" />
                    ) : unlocked ? (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    ) : (
                      <Lock size={12} />
                    )}
                    <span className="font-semibold">
                      {unlocked && !completed
                        ? `${t("practice.startPrefix")} ${t("practice.sectionN")} ${s + 1}`
                        : `${t("practice.sectionN")} ${s + 1}`}
                    </span>
                    <span className="text-[11px] text-text-faint">
                      ({start + 1}–{end})
                    </span>
                  </span>
                  {unlocked && s > 0 && (
                    <span className="text-[11px] font-semibold text-text-faint">{accuracy}%</span>
                  )}
                </button>
                {!unlocked && (
                  <p className="px-3 pb-2 pt-0.5 text-[11px] leading-relaxed text-text-faint">
                    {t("practice.unlockHint")
                      .replace("{section}", `${t("practice.sectionN")} ${s}`)
                      .replace("{threshold}", String(UNLOCK_THRESHOLD))}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
