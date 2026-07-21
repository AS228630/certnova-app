"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Lock, ListChecks } from "lucide-react";
import { getSectionSize, getSectionCount, UNLOCK_THRESHOLD } from "@/lib/practiceSections";
import { useLocale } from "@/components/LocaleProvider";

type Status = "current" | "correct" | "wrong" | "marked" | "skipped" | "unanswered";

// Top-of-page dropdown version of the section list (Abschnitte). Replaces
// the old right-sidebar panel so the question area gets full width and
// works better on narrower screens. Locking logic is unchanged: a section
// unlocks once the accuracy of the section before it reaches
// UNLOCK_THRESHOLD (90%). Progress is driven by `statusFor`, which reads
// from the same persisted per-user answer store as before — so a 90%
// section stays unlocked for that user on any future visit, it is never
// re-locked.
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
  const [openSection, setOpenSection] = useState(currentSection);
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

  const styles: Record<Status, string> = {
    current: "bg-primary text-white shadow-md shadow-primary/30 scale-105",
    correct: "bg-success text-white shadow-sm",
    wrong: "bg-danger text-white shadow-sm",
    marked: "bg-warning text-white shadow-sm",
    skipped: "bg-panel-alt text-text-faint border border-border-soft",
    unanswered: "bg-panel border border-border-soft text-text-muted shadow-sm hover:border-primary/50 hover:text-primary",
  };

  return (
    <div className="relative mb-4" ref={ref}>
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-border-soft bg-panel px-4 py-3 text-sm font-bold text-text transition-colors hover:bg-panel-alt sm:w-auto"
      >
        <span className="flex items-center gap-2">
          <ListChecks size={16} className="text-primary" />
          {t("practice.sectionN")} {currentSection + 1}
          <span className="font-normal text-text-faint">/ {sectionCount}</span>
        </span>
        <span className="rounded-full bg-panel-alt px-2.5 py-1 text-[11px] font-semibold text-text-faint">
          {sectionRange(currentSection)[0] + 1}–{sectionRange(currentSection)[1]} · {sectionRange(currentSection)[1] - sectionRange(currentSection)[0]}{" "}
          {t("practice.questionsWord")}
        </span>
        <ChevronDown size={15} className={`transition-transform ${menuOpen ? "rotate-180" : ""}`} />
      </button>

      {menuOpen && (
        <div className="absolute left-0 right-0 z-30 mt-2 max-h-[70vh] overflow-y-auto rounded-xl border border-border-soft bg-panel p-3 shadow-lg sm:right-auto sm:w-[460px]">
          {Array.from({ length: sectionCount }).map((_, s) => {
            const [start, end] = sectionRange(s);
            const unlocked = sectionUnlocked(s);
            const open = openSection === s && unlocked;
            const accuracy = sectionAccuracy(s);
            const completed = unlocked && sectionCompleted(s);

            return (
              <div key={s} className="mb-2 rounded-lg border border-border-soft last:mb-0">
                <button
                  onClick={() => unlocked && setOpenSection(open ? -1 : s)}
                  disabled={!unlocked}
                  className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm ${
                    unlocked ? "text-text hover:bg-panel-alt" : "cursor-not-allowed text-text-faint"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        completed ? "bg-success" : unlocked ? "bg-primary" : "bg-text-faint"
                      }`}
                    />
                    <span>
                      {t("practice.sectionN")} {s + 1}
                    </span>
                    <span className="rounded-full bg-panel-alt px-2 py-0.5 text-[10.5px] font-semibold text-text-faint">
                      {start + 1}–{end} · {end - start} {t("practice.questionsWord")}
                    </span>
                  </span>
                  {unlocked ? (
                    <ChevronDown size={14} className={open ? "rotate-180" : ""} />
                  ) : (
                    <Lock size={12} />
                  )}
                </button>

                {!unlocked && (
                  <p className="border-t border-border-soft px-3 py-2 text-[11px] text-text-faint">
                    {t("practice.unlockHintNav")
                      .replace("{threshold}", String(UNLOCK_THRESHOLD))
                      .replace("{current}", String(sectionAccuracy(s - 1)))}
                  </p>
                )}

                {open && (
                  <div className="grid max-h-72 grid-cols-7 gap-2 overflow-y-auto border-t border-border-soft bg-panel-alt/40 p-3.5 sm:grid-cols-9">
                    {Array.from({ length: end - start }).map((_, j) => {
                      const i = start + j;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            onJump(i);
                            setMenuOpen(false);
                          }}
                          className={`flex h-10 w-10 items-center justify-center rounded-xl text-[13px] font-bold transition-all duration-150 ${
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
      )}
    </div>
  );
}
