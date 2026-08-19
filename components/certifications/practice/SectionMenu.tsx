"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Lock, ListChecks, Check, Sparkles, Menu } from "lucide-react";
import { getSectionSize, getSectionCount, UNLOCK_THRESHOLD } from "@/lib/practiceSections";
import { useLocale } from "@/components/LocaleProvider";
import { useSidebarCollapseStore } from "@/lib/store/sidebarCollapseStore";

type Status = "current" | "correct" | "wrong" | "marked" | "skipped" | "unanswered";

// Dropdown used only to SWITCH between sections (Abschnitte) — a simple
// list of section names with lock state and accuracy. The actual question
// number grid for whichever section is active is a separate, always-
// visible component (SectionQuestionGrid) rendered by the parent, so it
// never requires a click to appear.
export default function SectionMenu({
  total,
  certId,
  currentIndex,
  statusFor,
  onJump,
  isUnlocked,
  getBestScore,
  onLockedClick,
  isPro,
}: {
  total: number;
  /** Only used to look up a per-cert section-size override (see
   * lib/practiceSections.ts) — never used for any data fetch here. */
  certId?: string;
  currentIndex: number;
  statusFor: (index: number) => Status;
  onJump: (index: number, sectionIndex?: number) => void;
  /** Permanent, DB-backed unlock check (lib/store/sectionAttemptsStore.ts) —
   * once a section clears the mastery bar once, it stays unlocked forever,
   * even if a later retry scores lower. Falls back to the old live
   * accuracy computation only if not provided, so nothing breaks for any
   * caller that hasn't been updated yet. */
  isUnlocked?: (sectionIndex: number) => boolean;
  /** Best-ever score for a section, from the permanent attempt history
   * (lib/store/sectionAttemptsStore.ts) — distinct from the live
   * in-session accuracy below it, per spec section 7 ("نمایش بهترین
   * نتیجه"). Returns null if the section has never been attempted. */
  getBestScore?: (sectionIndex: number) => number | null;
  /** Called instead of the normal jump when the user clicks a locked
   * section. Lets the caller show its Premium upgrade modal — with no
   * callback provided, a locked section click is silently ignored
   * (previous behavior). */
  onLockedClick?: (sectionIndex: number) => void;
  /** Whether the viewer currently has Premium. When false, a locked
   * section is ALWAYS gated behind upgrading (never behind score — see
   * PracticeClient's isUnlocked callback), so the hint below it must say
   * that plainly instead of showing the 90%-score wording, which would
   * otherwise misleadingly imply a Free user could ever unlock it by
   * scoring well. Optional so any caller that hasn't been updated yet
   * keeps the old (Pro-only) wording unchanged. */
  isPro?: boolean;
}) {
  const { t } = useLocale();
  // Desktop-only sidebar collapse toggle, shown right next to the question
  // range below — same feature on every certification/company, since this
  // component is shared by all of them.
  const sidebarCollapsed = useSidebarCollapseStore((s) => s.collapsed);
  const toggleSidebar = useSidebarCollapseStore((s) => s.toggle);
  const SECTION_SIZE = getSectionSize(total, certId);
  const sectionCount = getSectionCount(total, certId);
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

  function sectionUnlockedFallback(s: number): boolean {
    return s <= 1 || (sectionCompleted(s - 1) && sectionAccuracy(s - 1) >= UNLOCK_THRESHOLD);
  }

  function sectionUnlocked(s: number): boolean {
    return isUnlocked ? isUnlocked(s) : sectionUnlockedFallback(s);
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

      <button
        onClick={toggleSidebar}
        aria-label={t(sidebarCollapsed ? "practice.expandSidebar" : "practice.collapseSidebar")}
        aria-pressed={sidebarCollapsed}
        title={t(sidebarCollapsed ? "practice.expandSidebar" : "practice.collapseSidebar")}
        className={`hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors lg:flex ${
          sidebarCollapsed
            ? "border-primary/50 bg-primary/10 text-primary"
            : "border-border-soft text-text-muted hover:border-primary hover:text-primary"
        }`}
      >
        <Menu size={16} />
      </button>

      {menuOpen && (
        <div className="absolute left-0 top-full z-30 mt-2 max-h-[70vh] w-full min-w-[280px] overflow-y-auto rounded-xl border border-border-soft bg-panel p-2 shadow-lg sm:w-80">
          {(() => {
            // Only the very next locked section (the actual gate the
            // person needs to act on) shows the Premium badge/CTA — every
            // section past that is locked for the ordinary reason (the
            // one before it isn't done yet), so repeating "Premium" on
            // all of them would wrongly suggest a separate purchase is
            // needed per section instead of one upgrade unlocking the
            // normal progressive 90% flow from there on.
            let firstLockedIndex = -1;
            for (let i = 0; i < sectionCount; i++) {
              if (!sectionUnlocked(i)) {
                firstLockedIndex = i;
                break;
              }
            }
            return Array.from({ length: sectionCount }).map((_, s) => {
              const [start, end] = sectionRange(s);
              const unlocked = sectionUnlocked(s);
              const completed = unlocked && sectionCompleted(s);
              const isCurrent = s === currentSection;
              const premiumLocked = !unlocked && isPro === false && s === firstLockedIndex;

            return (
              <div key={s}>
                <button
                  onClick={() => {
                    if (!unlocked) {
                      onLockedClick?.(s);
                      return;
                    }
                    onJump(start, s);
                    setMenuOpen(false);
                  }}
                  disabled={!unlocked && !onLockedClick}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    isCurrent
                      ? "bg-primary-light text-primary"
                      : unlocked
                        ? "text-text hover:bg-panel-alt"
                        : premiumLocked
                          ? "cursor-pointer border border-primary/30 bg-primary-light/40 text-text hover:bg-primary-light/70"
                          : "cursor-not-allowed text-text-faint"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {completed ? (
                      <Check size={14} className="text-success" />
                    ) : unlocked ? (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    ) : premiumLocked ? (
                      <Sparkles size={13} className="text-primary" />
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
                  {unlocked && s > 0 && (() => {
                    const best = getBestScore?.(s);
                    return best !== null && best !== undefined ? (
                      <span className="text-[11px] font-semibold text-success">{t("practice.bestScoreLabel")}: {best}%</span>
                    ) : null;
                  })()}
                  {premiumLocked && (
                    <span className="flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
                      <Sparkles size={10} />
                      {t("practice.premiumBadge")}
                    </span>
                  )}
                </button>
                {!unlocked && (
                  <p className={`px-3 pb-2 pt-0.5 text-[11px] leading-relaxed ${premiumLocked ? "font-medium text-primary" : "text-text-faint"}`}>
                    {premiumLocked
                      ? t("practice.unlockHintPremium")
                      : t("practice.unlockHint")
                          .replace("{section}", `${t("practice.sectionN")} ${s}`)
                          .replace("{threshold}", String(UNLOCK_THRESHOLD))}
                  </p>
                )}
              </div>
            );
            });
          })()}
        </div>
      )}
    </div>
  );
}
