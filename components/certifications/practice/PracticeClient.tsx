"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3, RefreshCcw, X } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { PracticeOptionId, PracticeQuestion, PracticeTopic } from "@/lib/practiceTypes";
import { isSingleChoiceAnswerCorrect, isMultiSelectQuestion } from "@/lib/practiceTypes";
import { supabase } from "@/lib/supabase/client";
import { canAccess } from "@/lib/entitlementPolicy";
import { useLocale } from "@/components/LocaleProvider";
import { getSectionForIndex, getSectionRange, getSectionCount } from "@/lib/practiceSections";
import QuestionPanel from "./QuestionPanel";
import SectionMenu from "./SectionMenu";
import SectionQuestionGrid from "./SectionQuestionGrid";
import SectionProgressBar from "./SectionProgressBar";
import SectionStatsPanel from "./SectionStatsPanel";
import QuickStats from "./QuickStats";
import AICoachPanel from "./AICoachPanel";
import SectionHistoryPanel from "./SectionHistoryPanel";
import PracticeNotesPanel from "./PracticeNotesPanel";
import SectionScorecard from "./SectionScorecard";
import ExamCompleteScreen from "./ExamCompleteScreen";
import PracticeCompletionState from "@/components/completion/PracticeCompletionState";import RestartConfirmModal from "./RestartConfirmModal";
import { useUserProgressStore } from "@/lib/store/userProgressStore";
import { useCertProgressStore } from "@/lib/store/certProgressStore";
import { useTopicMasteryStore } from "@/lib/store/topicMasteryStore";
import { useActivityLogStore } from "@/lib/store/activityLogStore";
import { useQuestionAnswersStore } from "@/lib/store/questionAnswersStore";
import { useSectionAttemptsStore, SECTION_PASS_THRESHOLD } from "@/lib/store/sectionAttemptsStore";
import { useUser } from "@/components/UserContext";
import { loadGuestProgress, saveGuestAnswer, clearGuestProgress } from "@/lib/guestProgress";
import FreeRegistrationGate from "@/components/registration/FreeRegistrationGate";
import PremiumGateModal from "./PremiumGateModal";

const EXAM_TOTAL_SECONDS = 2 * 60 * 60; // 2h, matches a real certification exam

type YesNoAnswers = Record<number, "Ja" | "Nein">;
type MatchingAnswers = Record<string, string>;
type Answer = PracticeOptionId | PracticeOptionId[] | YesNoAnswers | MatchingAnswers;

export default function PracticeClient({
  companyName,
  companySlug,
  certId,
  certCode,
  certTitle,
  premiumBenefits,
}: {
  companyName: string;
  companySlug: string;
  certId: string;
  certCode: string;
  certTitle: string;
  level: string;
  rating: number;
  ratingCount: number;
  /** Real, per-certification Premium benefit list — computed
   * server-side by the parent page.tsx via
   * lib/server/premiumBenefits.ts, never invented client-side. */
  premiumBenefits: string[];
}) {
  const { locale, t } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useUser();

  // Questions (and how much of the bank the current user is entitled to)
  // now come exclusively from the gated /api/certifications/[certId]/
  // practice-questions route — never imported directly into this client
  // component. The route decides server-side, from the real subscriptions
  // table, whether to return the full bank or just "Teil 1"; a Free/guest
  // user's browser genuinely never receives section 2+ content (including
  // correct answers), so this is a real access control, not just a UI
  // affordance that a curious user could bypass via devtools.
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [topics, setTopics] = useState<PracticeTopic[]>([]);
  // The REAL total size of the question bank (568 for AZ-900), always
  // reported by the API even when the delivered `questions` array itself
  // is truncated to Teil 1 for a non-Premium user. Critical: section
  // size/count math (getSectionSize/Count/Range) must be computed from
  // THIS number, never from questions.length — computing it from a
  // truncated 50-question array would make getSectionSize think the
  // whole bank is only 50 questions and re-chop Teil 1 itself into fake
  // 10-question sub-sections, which is exactly the bug this comment is
  // here to prevent from coming back.
  const [totalQuestionCount, setTotalQuestionCount] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [questionsError, setQuestionsError] = useState(false);

  // Post-purchase resume (journey stage 8): the checkout success_url
  // brings the browser straight back here with ?premium_activated=true,
  // but Stripe's webhook — the only thing allowed to actually flip the
  // real subscriptions row to active — may not have finished processing
  // yet. The frontend never just assumes Premium; it keeps re-asking the
  // real gated API for up to ~20s until that row is genuinely active,
  // shows an honest "activating" state meanwhile, then cleans the URL.
  const justPurchased = searchParams.get("premium_activated") === "true";
  const [activatingPremium, setActivatingPremium] = useState(justPurchased);
  const [activationAttempt, setActivationAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function loadQuestions() {
      if (activationAttempt === 0) {
        setQuestionsLoading(true);
        setQuestionsError(false);
      }
      try {
        const { data } = await supabase.auth.getSession();
        const accessToken = data.session?.access_token ?? null;
        const res = await fetch(`/api/certifications/${certId}/practice-questions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken, locale }),
        });
        if (!res.ok) throw new Error("practice-questions request failed");
        const json = await res.json();
        if (cancelled) return;
        setQuestions(json.questions ?? []);
        setTopics(json.topics ?? []);
        setIsPro(!!json.isPro);
        setTotalQuestionCount(json.totalCount ?? (json.questions ?? []).length);

        if (justPurchased && !json.isPro && activationAttempt < 10) {
          // Webhook hasn't landed yet — try again shortly, still not
          // trusting the client's own guess about Premium status.
          setTimeout(() => {
            if (!cancelled) setActivationAttempt((n) => n + 1);
          }, 2000);
        } else if (justPurchased) {
          // Either genuinely active now, or we've waited long enough
          // that continuing to poll silently would be worse than
          // letting the person retry manually — either way, stop
          // showing the activating overlay and drop the query param so
          // a refresh doesn't restart this whole dance.
          setActivatingPremium(false);
          router.replace(pathname);
        }
      } catch {
        if (!cancelled) setQuestionsError(true);
      } finally {
        if (!cancelled) setQuestionsLoading(false);
      }
    }
    loadQuestions();
    return () => {
      cancelled = true;
    };
    // Re-fetches on locale change (server returns the correctly translated
    // bank), whenever the signed-in user changes (a guest signing up, or
    // a user's subscription status changing, both change what the next
    // fetch is entitled to receive), and on each post-purchase retry tick.
  }, [certId, locale, user, activationAttempt, justPurchased, router, pathname]);
  const [order, setOrder] = useState<string[] | null>(null); // null = authored order, else shuffled question ids
  // Bumped every time "Gemischt wiederholen" reshuffles the question
  // order, so option/answer positions within each question are re-
  // randomized at the exact same moments - never on every render (which
  // would visibly jump the options around while answering) and never
  // tied to just the question id alone (which would always shuffle the
  // same way every time, defeating the point of "mixed" retries).
  const [optionShuffleGen, setOptionShuffleGen] = useState(0);
  const [index, setIndex] = useState(0);
  // Stage 5 spec: after Auth, the person should land exactly back where
  // they were, not at Question 1 again. Guarded to fire at most once —
  // otherwise it would fight with the person's own later navigation.
  const [hasAutoResumed, setHasAutoResumed] = useState(false);
  // Real bug fix: explains why the person was sent back into the
  // section instead of silently restarting it with no context — shows
  // their real score and the real threshold, not a vague message.
  const [retryReason, setRetryReason] = useState<{ scorePercent: number } | null>(null);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [skipped, setSkipped] = useState<Set<string>>(new Set());
  // Questions explicitly reopened via resetSection (retaking an
  // already-completed section). persistedCorrectness from Supabase still
  // has these marked correct/wrong from the PREVIOUS attempt — without
  // this override, statusFor would immediately show them as already
  // answered again, defeating the point of retaking the section.
  const [reopenedIds, setReopenedIds] = useState<Set<string>>(new Set());
  const [coachOpen, setCoachOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(EXAM_TOTAL_SECONDS);
  const [scorecardSection, setScorecardSection] = useState<number | null>(null);
  // Review-only mode: practicing just the wrong questions from a section.
  // Intentionally kept separate from the normal question flow (order/index)
  // so maybeShowScorecard is never reached from here — per spec section 8,
  // this must never record an Attempt or touch History/Best-Score/Unlock.
  const [reviewQueue, setReviewQueue] = useState<{ sectionIndex: number; questionIds: string[] } | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  // Root-cause fix for double-counted attempts: tracks which section
  // indices already have a real, recorded full-run attempt since their
  // last resetSection() call (a genuine Restart/Wiederholen/Gemischt
  // wiederholen). As long as a section is in this set, maybeShowScorecard
  // must NOT record another attempt for it, no matter how the user
  // arrives at "every question in this section is resolved" a second
  // time — clicking the scorecard's per-question Retry button, tapping a
  // question directly in the always-visible number grid, anything. This
  // is the single source of truth for "was this genuinely a brand-new
  // run through the section, or just a touch-up of an already-finished
  // one" — it doesn't depend on which UI path was used to get there.
  const [attemptedSections, setAttemptedSections] = useState<Set<number>>(new Set());

  // Set when the user clicks Wiederholen/Gemischt wiederholen on the
  // question toolbar (as opposed to on the post-completion scorecard)
  // while the current section still has unresolved questions — per spec,
  // a confirmation is required in that case since real in-progress work
  // would otherwise be silently wiped. If the section is already fully
  // resolved, no confirmation is needed and this is never set.
  const [pendingSectionRetry, setPendingSectionRetry] = useState<{ sectionIdx: number; shuffle: boolean } | null>(
    null
  );
  const [examComplete, setExamComplete] = useState(false);
  const [restartModalOpen, setRestartModalOpen] = useState(false);
  // Stage 4: a non-Premium user sees the compact completion card first;
  // "Ergebnis im Detail ansehen" reveals the existing full breakdown
  // (ExamCompleteScreen) below it instead of navigating away.
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [restarting, setRestarting] = useState(false);
  const [statsDrawerOpen, setStatsDrawerOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setRemainingSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  // A guest is simply "no logged-in user" — practice pages now render
  // for guests too (DashboardShell requireAuth={false}), with access
  // limited to Teil 1 only (see goTo). Recomputed on every render from
  // `user`, so it flips to false automatically the instant a guest
  // finishes signing up mid-session — no extra state to keep in sync.
  const isGuest = !user;
  const [showRegistrationGate, setShowRegistrationGate] = useState(false);
  const [showPremiumGate, setShowPremiumGate] = useState(false);
  const persistedCorrectness = useQuestionAnswersStore((s) => s.getCorrectness(certId));
  const loadPersistedAnswers = useQuestionAnswersStore((s) => s.loadForCert);
  const recordPersistedAnswer = useQuestionAnswersStore((s) => s.recordAnswer);
  const clearPersistedAnswers = useQuestionAnswersStore((s) => s.clearForCert);
  const clearPersistedQuestions = useQuestionAnswersStore((s) => s.clearQuestions);
  const resetCertPracticeDetail = useCertProgressStore((s) => s.resetPracticeDetail);
  const loadSectionAttempts = useSectionAttemptsStore((s) => s.loadForCert);
  const recordSectionAttempt = useSectionAttemptsStore((s) => s.recordAttempt);
  const isSectionPermanentlyUnlocked = useSectionAttemptsStore((s) => s.isSectionPermanentlyUnlocked);
  const getBestScore = useSectionAttemptsStore((s) => s.getBestScore);
  const attemptsMigrationReady = useSectionAttemptsStore((s) => s.migrationReady);
  const resetCertHistory = useSectionAttemptsStore((s) => s.resetCertHistory);

  useEffect(() => {
    if (user) {
      loadPersistedAnswers(user.id, certId);
      loadSectionAttempts(user.id, certId);

      // Migrate any guest answers saved just before this person signed
      // up (the redirect back here after OAuth/email signup is a full
      // page load, so `user` is already populated on first render here
      // rather than transitioning from null -> set within one mount —
      // this is the one place that reliably catches it either way).
      const guestAnswers = loadGuestProgress(certId);
      if (guestAnswers.length > 0) {
        for (const a of guestAnswers) {
          recordPersistedAnswer(user.id, certId, a.questionId, a.isCorrect);
        }
        clearGuestProgress(certId);
      }
    }
  }, [user, certId, loadPersistedAnswers, loadSectionAttempts, recordPersistedAnswer]);

  // The practice exam always covers the full authored question set for this
  // cert — no topic filter, matching a real certification exam simulation.
  const activeQuestions = useMemo(() => {
    if (order) return order.map((id) => questions.find((q) => q.id === id)!).filter(Boolean);
    return questions;
  }, [order, questions]);

  // Runs once real persisted-answer data is available (either a returning
  // signed-in user's own history, or a Guest's answers that were just
  // migrated onto their brand-new account a moment ago in the effect
  // above) — jumps straight to the first still-unanswered question
  // instead of leaving the person to re-click through everything they
  // already did. A real position, computed from real per-question
  // correctness data, never guessed or reset to 0 by default once this
  // has real data to work from.
  useEffect(() => {
    if (hasAutoResumed || activeQuestions.length === 0) return;
    const firstUnanswered = activeQuestions.findIndex((q) => persistedCorrectness[q.id] === undefined);
    // hasAutoResumed makes this idempotent — it only ever fires once,
    // the first time real persisted-answer data becomes available, so it
    // does not cause a render cascade despite the lint rule's default
    // suspicion of any setState call inside an effect body.
    if (firstUnanswered > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIndex(firstUnanswered);
    }
    setHasAutoResumed(true);
  }, [hasAutoResumed, activeQuestions, persistedCorrectness]);

  const current = reviewQueue
    ? activeQuestions.find((q) => q.id === reviewQueue.questionIds[reviewIndex])
    : activeQuestions[index];
  // See the totalQuestionCount comment above for why this — not
  // activeQuestions.length — is the right input to every section-size
  // calculation below. Falls back to activeQuestions.length only for the
  // brief render before the API response has set the real total.
  const sectionTotal = totalQuestionCount || activeQuestions.length;
  const sectionCount = getSectionCount(sectionTotal, certId);
  const currentSectionIdx = getSectionForIndex(sectionTotal, index, certId);
  const [currentSectionStart, currentSectionEnd] = getSectionRange(sectionTotal, currentSectionIdx, certId);

  function isCorrectAnswer(q: PracticeQuestion, answer: Answer | undefined): boolean {
    if (!answer) return false;
    if (q.type === "yesno") {
      const a = answer as YesNoAnswers;
      return q.statements.every((s, i) => a[i] === s.correct);
    }
    if (q.type === "matching") {
      const a = answer as MatchingAnswers;
      return q.descriptions.every((d) => a[d.id] === d.correctItemId);
    }
    return isSingleChoiceAnswerCorrect(q, answer as PracticeOptionId | PracticeOptionId[]);
  }

  const answeredCount = useMemo(() => {
    const ids = new Set(checked);
    for (const id of Object.keys(persistedCorrectness)) ids.add(id);
    return ids.size;
  }, [checked, persistedCorrectness]);

  // Full "start over": wipes every persisted answer for this cert (so
  // sections re-lock from Abschnitt 1), resets all local session state,
  // and reshuffles the full question order so it's never the same as any
  // previous attempt.
  async function restartFromScratch() {
    setRestarting(true);
    setAttemptedSections(new Set());
    try {
      if (user) {
        await clearPersistedAnswers(user.id, certId);
        await resetCertPracticeDetail(certId);
        await resetCertHistory(user.id, certId);
      }
      const ids = questions.map((q) => q.id);
      for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
      }
      setOrder(ids);
      setAnswers({});
      setChecked(new Set());
      setMarked(new Set());
      setSkipped(new Set());
      setReopenedIds(new Set(ids));
      setScorecardSection(null);
      setExamComplete(false);
      setRemainingSeconds(EXAM_TOTAL_SECONDS);
      setIndex(0);
    } finally {
      setRestarting(false);
      setRestartModalOpen(false);
    }
  }

  function goTo(i: number) {
    // Free/guest users (anyone the server didn't confirm as Premium) may
    // only move within whatever the server actually delivered —
    // activeQuestions.length itself already reflects that decision
    // (Teil 1 exactly for a signed-in Free user; Teil 1 + one real bonus
    // question — Teil 2's real Frage 1 — for a true Guest, per the
    // Stage 5 spec). Checked against the RAW requested index (i), before
    // it gets clamped below — clamping first would silently turn an
    // out-of-bounds jump request into an in-bounds one and this check
    // would never fire. Checked independently of the
    // attemptsMigrationReady block below, since that one only applies
    // once a real user's DB-backed unlock state has loaded, which never
    // happens for a guest.
    if (!canAccess(isPro, "practice_questions_full") && i >= activeQuestions.length) {
      if (isGuest) setShowRegistrationGate(true);
      else setShowPremiumGate(true);
      return;
    }

    const clamped = Math.max(0, Math.min(activeQuestions.length - 1, i));

    // Refuse to move the question pointer into a section that isn't
    // actually unlocked yet — this is the single low-level function every
    // navigation path goes through (the Next/Prev arrows, the scorecard's
    // "next section" button, section-grid jumps), so checking it here
    // closes the lock system against every current and future bypass at
    // once, rather than re-checking it separately in each caller. Only
    // blocks crossing INTO a different, locked section; moving within the
    // current (already-reachable) section is never affected.
    if (attemptsMigrationReady) {
      const targetSection = getSectionForIndex(sectionTotal, clamped, certId);
      const currentSection = getSectionForIndex(sectionTotal, index, certId);
      if (targetSection !== currentSection && !isSectionPermanentlyUnlocked(certId, targetSection)) {
        const [, currentEnd] = getSectionRange(sectionTotal, currentSection, certId);
        setIndex(Math.min(currentEnd - 1, activeQuestions.length - 1));
        setHintOpen(false);
        return;
      }
    }
    setIndex(clamped);
    setHintOpen(false);
  }

  // Called when the user opens a section from the SectionMenu dropdown
  // (as opposed to the in-section question grid, or the "Wiederholen"
  // button right after finishing it). If that section was already fully
  // answered before, reshuffle it first — otherwise every retry from the
  // menu would replay the exact same question order, letting the user
  // "solve" it from memorized positions instead of actually re-answering.
  // Matches resetSection's shuffle logic; unfinished/never-attempted
  // sections are left in authored order.
  function jumpToSection(sectionIdx: number, targetIndex: number) {
    const [start, end] = getSectionRange(sectionTotal, sectionIdx, certId);
    let alreadyCompleted = true;
    for (let i = start; i < end; i++) {
      const st = statusFor(i);
      if (st !== "correct" && st !== "wrong") {
        alreadyCompleted = false;
        break;
      }
    }
    if (alreadyCompleted) {
      resetSection(sectionIdx, true);
    } else {
      goTo(targetIndex);
    }
  }

  // Entry point for the Wiederholen / Gemischt wiederholen buttons on the
  // question toolbar itself (available at any time, not just after
  // finishing the section — unlike the identical buttons on the
  // post-completion scorecard). If the current section still has
  // unanswered questions, this is a real interruption, so it's gated
  // behind a confirmation dialog first; a fully-finished section skips
  // straight to resetSection, matching the spec.
  function requestSectionRetry(shuffle: boolean) {
    const sectionIdx = getSectionForIndex(sectionTotal, index, certId);
    const [start, end] = getSectionRange(sectionTotal, sectionIdx, certId);
    let complete = true;
    for (let i = start; i < end; i++) {
      const st = statusFor(i);
      if (st !== "correct" && st !== "wrong") {
        complete = false;
        break;
      }
    }
    if (complete) {
      resetSection(sectionIdx, shuffle);
      goTo(start);
    } else {
      setPendingSectionRetry({ sectionIdx, shuffle });
    }
  }

  function statusFor(i: number): "correct" | "wrong" | "marked" | "skipped" | "unanswered" {
    const q = activeQuestions[i];
    if (!q) return "unanswered";
    if (marked.has(q.id)) return "marked";
    const isAnswered = checked.has(q.id) || (persistedCorrectness[q.id] !== undefined && !reopenedIds.has(q.id));
    if (skipped.has(q.id) && !isAnswered) return "skipped";
    if (isAnswered) {
      const localAnswer = answers[q.id];
      const isCorrect = localAnswer !== undefined ? isCorrectAnswer(q, localAnswer) : (persistedCorrectness[q.id] ?? false);
      return isCorrect ? "correct" : "wrong";
    }
    return "unanswered";
  }

  // Checks whether every question in `current`'s section has now been
  // resolved (answered or skipped) — if so, shows the real section results.
  function maybeShowScorecard(justResolvedId: string, nowChecked: Set<string>) {
    const sectionIdx = getSectionForIndex(sectionTotal, index, certId);
    const [start, end] = getSectionRange(sectionTotal, sectionIdx, certId);
    let allResolved = true;
    for (let i = start; i < end; i++) {
      const q = activeQuestions[i];
      if (!q) continue;
      const resolved = q.id === justResolvedId || nowChecked.has(q.id) || skipped.has(q.id);
      if (!resolved) {
        allResolved = false;
        break;
      }
    }

    // Demo/preview shortcut: resolving the very LAST question of a
    // section always opens the scorecard right away, even if earlier
    // questions in the section were never touched — e.g. an instructor
    // jumping straight from the question grid to question 50 to show
    // students what the results screen looks like, without solving all
    // 50 questions first. Only the section's actual last question
    // triggers this; answering any other still-unresolved question in
    // the middle of the section does nothing extra.
    const isLastQuestionOfSection = index === end - 1;
    if (!allResolved && !isLastQuestionOfSection) return;

    setScorecardSection(sectionIdx);

    // A preview jump (section not actually fully resolved) is never a
    // real attempt — it must never touch Attempts, History, Best Score,
    // or section-unlock state, exactly like Review Wrong Answers.
    if (!allResolved) return;

    // Record this as a completed attempt at the section — every genuine
    // completion, not just the first, and never overwritten (spec: full
    // history, unlimited retries). If it clears the mastery bar, the
    // NEXT section unlocks permanently right here, even on a retry.
    //
    // Only the FIRST time this section reaches "fully resolved" since
    // its last real reset counts — attemptedSections blocks every further
    // "fully resolved" detection for this same section until
    // resetSection() runs again (Wiederholen, Gemischt wiederholen, or
    // the full-exam restart), which is what stops a single wrong-answer
    // touch-up from ever being recorded as its own attempt.
    //
    // This must be judged ONLY by the local flag, never by whether a
    // best score already exists in the database — a best score is
    // permanent and never cleared by resetSection (by design, so past
    // achievement isn't lost), so checking it here would silently stop
    // recording every attempt after the very first one a section was
    // ever completed, forever, even through genuine Wiederholen retries.
    // That exact regression shipped once already and is why this comment
    // is this explicit: don't add the DB check back.
    if (attemptedSections.has(sectionIdx)) return;
    setAttemptedSections((s) => new Set(s).add(sectionIdx));

    if (user) {
      let correctCount = 0;
      for (let i = start; i < end; i++) {
        const q = activeQuestions[i];
        if (!q) continue;
        const isChecked = q.id === justResolvedId || nowChecked.has(q.id);
        if (isChecked && isCorrectAnswer(q, answers[q.id])) correctCount++;
      }
      recordSectionAttempt(user.id, certId, sectionIdx, correctCount, end - start);
    }
  }

  // Restarts just one section, always wiping all progress for its
  // questions back to zero (0 correct, 0 wrong, 0%, empty progress bar).
  // `shuffle` picks between the two restart buttons on the section
  // scorecard:
  //   - false ("Wiederholen"): the exact same questions, in the exact
  //     same order they were already shown in (whatever `activeQuestions`
  //     currently holds for this section — NOT re-derived from the
  //     original authored order, so it also works correctly if the
  //     section was already shuffled earlier in this session).
  //   - true ("Gemischt wiederholen"): the exact same questions, but
  //     reshuffled into a brand-new random order every single time it's
  //     called — including repeated clicks in a row.
  // Either way, the *set* of questions in this section never changes,
  // only their order — section boundaries (global indices) stay stable
  // for the rest of the exam.
  // Restarts just one section, always wiping all progress for its
  // questions back to zero (0 correct, 0 wrong, 0%, empty progress bar).
  // `shuffle` picks between the two restart buttons on the section
  // scorecard:
  //   - false ("Wiederholen"): the exact same questions, restored to the
  //     TRUE original authored order (1 -> 2 -> 3 -> ... -> N) — always
  //     the same fixed order on every click, even if the section had
  //     previously been shuffled by "Gemischt wiederholen". This must
  //     read from `questions` (the authored/locale array), NOT from
  //     `activeQuestions`, since the latter may already reflect a prior
  //     shuffle.
  //   - true ("Gemischt wiederholen"): the exact same questions, but
  //     reshuffled into a brand-new random order every single time it's
  //     called. Guards against generating the exact same order as the
  //     one just shown (relevant mainly for very small sections, where a
  //     random shuffle has a real chance of landing back on the same
  //     sequence) by reshuffling again, up to a few tries.
  // Either way, the *set* of questions in this section never changes,
  // only their order — section boundaries (global indices) stay stable
  // for the rest of the exam.
  function resetSection(sectionIdx: number, shuffle: boolean) {
    setAttemptedSections((s) => {
      if (!s.has(sectionIdx)) return s;
      const next = new Set(s);
      next.delete(sectionIdx);
      return next;
    });
    const [start, end] = getSectionRange(sectionTotal, sectionIdx, certId);
    const currentIds = activeQuestions.slice(start, end).map((q) => q.id);
    const originalIds = questions.slice(start, end).map((q) => q.id);

    // Clear the persisted (Supabase-backed) correctness for just these
    // questions too — otherwise the question navigator keeps showing them
    // as green/complete after "try this section again", since that comes
    // from persistedCorrectness, not just the local `checked` set below.
    if (user) {
      clearPersistedQuestions(user.id, certId, currentIds);
    }

    let nextIds: string[];
    if (shuffle) {
      // Fisher-Yates — a fresh random order every call. Retried up to 5
      // times if it happens to land on exactly the same order the
      // section was just showing (only realistically possible for very
      // small sections); after that, a rare exact repeat is accepted
      // rather than looping forever.
      let attempt = [...currentIds];
      for (let tries = 0; tries < 5; tries++) {
        attempt = [...currentIds];
        for (let i = attempt.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [attempt[i], attempt[j]] = [attempt[j], attempt[i]];
        }
        if (attempt.length <= 1 || attempt.join(",") !== currentIds.join(",")) break;
      }
      nextIds = attempt;
      setOptionShuffleGen((g) => g + 1);
    } else {
      // Always the true original authored order, regardless of whatever
      // order was active before (e.g. a prior shuffle) - and reset the
      // option shuffle generation back to 0 too, so a plain "Wiederholen"
      // after an earlier "Gemischt wiederholen" restores BOTH the
      // question order and the option order to authored, not just one.
      nextIds = originalIds;
      setOptionShuffleGen(0);
    }

    const baseOrder = order ?? questions.map((q) => q.id);
    const newOrder = [...baseOrder];
    newOrder.splice(start, nextIds.length, ...nextIds);
    setOrder(newOrder);

    setChecked((s) => {
      const next = new Set(s);
      currentIds.forEach((id) => next.delete(id));
      return next;
    });
    setSkipped((s) => {
      const next = new Set(s);
      currentIds.forEach((id) => next.delete(id));
      return next;
    });
    setAnswers((a) => {
      const next = { ...a };
      currentIds.forEach((id) => delete next[id]);
      return next;
    });
    setMarked((s) => {
      const next = new Set(s);
      currentIds.forEach((id) => next.delete(id));
      return next;
    });
    setReopenedIds((s) => new Set([...s, ...currentIds]));
  }

  if (questionsLoading || activatingPremium) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border-soft bg-panel p-16 text-sm text-text-muted">
        {activatingPremium ? t("premiumGate.activating") : t("common.loading")}
      </div>
    );
  }

  if (questionsError) {
    return (
      <div className="rounded-xl border border-border-soft bg-panel p-8 text-center text-sm text-text-muted">
        {t("practice.loadError")}
      </div>
    );
  }

  if (!current) {
    return (
      <div className="rounded-xl border border-border-soft bg-panel p-8 text-center text-sm text-text-muted">
        Für diese Zertifizierung sind noch keine Fragen verfügbar.
      </div>
    );
  }

  if (examComplete) {
    const freeCorrect = activeQuestions.filter((q) => checked.has(q.id) && isCorrectAnswer(q, answers[q.id])).length;
    const freeWrong = activeQuestions.filter((q) => checked.has(q.id) && !isCorrectAnswer(q, answers[q.id])).length;
    const freeElapsed = EXAM_TOTAL_SECONDS - remainingSeconds;

    if (!isPro && !showFullDetails) {
      return (
        <div className="py-6">
          <PracticeCompletionState
            freeQuestionLimit={activeQuestions.length}
            correct={freeCorrect}
            wrong={freeWrong}
            elapsedSeconds={freeElapsed}
            isGuest={isGuest}
            onViewDetails={() => setShowFullDetails(true)}
            upgradeHref={`/upgrade?returnTo=${encodeURIComponent(pathname ?? "/dashboard")}`}
          />
        </div>
      );
    }

    return (
      <div>
        <ExamCompleteScreen
            companySlug={companySlug}
            companyName={companyName}
            certCode={certCode}
            certTitle={certTitle}
            questions={activeQuestions}
            topics={topics}
            answers={answers}
            checked={checked}
            skipped={skipped}
            elapsedSeconds={freeElapsed}
            onBackToPath={() => router.push(`/certifications/${companySlug}/${certId}/learn`)}
            onRetryAll={() => setRestartModalOpen(true)}
          />
        <PracticeNotesPanel isOpen={notesOpen} onClose={() => setNotesOpen(false)} />
        {restartModalOpen && (
          <RestartConfirmModal
            onConfirm={restartFromScratch}
            onCancel={() => setRestartModalOpen(false)}
            loading={restarting}
          />
        )}
      </div>
    );
  }

  if (scorecardSection !== null) {
    return (
      <div>
        <SectionScorecard
          sectionIndex={scorecardSection}
          questions={activeQuestions}
          certId={certId}
          topics={topics}
          answers={answers}
          checked={checked}
          isPro={isPro}
            skipped={skipped}
            marked={marked}
            elapsedSeconds={EXAM_TOTAL_SECONDS - remainingSeconds}
            hasNextSection={
              scorecardSection + 1 < sectionCount &&
              (attemptsMigrationReady ? isSectionPermanentlyUnlocked(certId, scorecardSection + 1) : false)
            }
            onBackToPath={() => router.push(`/certifications/${companySlug}/${certId}/learn`)}
            onNextSection={() => {
              // Defense in depth: hasNextSection already hides/disables this
              // button when the next section isn't unlocked, but never
              // navigate there even if this somehow gets called anyway —
              // e.g. a low-score demo-preview result (see the "jump to the
              // last question" instructor shortcut) must never let anyone
              // into a section that hasn't actually been earned.
              if (!attemptsMigrationReady || !isSectionPermanentlyUnlocked(certId, scorecardSection + 1)) return;
              const [, end] = getSectionRange(sectionTotal, scorecardSection, certId);
              setScorecardSection(null);
              goTo(Math.min(end, activeQuestions.length - 1));
            }}
            onRetry={() => {
              // "Wiederholen" — same order every time, per spec.
              resetSection(scorecardSection, false);
              const [start] = getSectionRange(sectionTotal, scorecardSection, certId);
              setScorecardSection(null);
              goTo(start);
            }}
            onRetryShuffled={() => {
              // "Gemischt wiederholen" — a brand-new random order on
              // every click, per spec.
              resetSection(scorecardSection, true);
              const [start] = getSectionRange(sectionTotal, scorecardSection, certId);
              setScorecardSection(null);
              goTo(start);
            }}
            onRetryQuestion={(questionId) => {
              const qIndex = activeQuestions.findIndex((q) => q.id === questionId);
              if (qIndex === -1) return;
              setChecked((s) => {
                const next = new Set(s);
                next.delete(questionId);
                return next;
              });
              setSkipped((s) => {
                const next = new Set(s);
                next.delete(questionId);
                return next;
              });
              setAnswers((a) => {
                const next = { ...a };
                delete next[questionId];
                return next;
              });
              setReopenedIds((s) => new Set(s).add(questionId));
              setScorecardSection(null);
              goTo(qIndex);
            }}
            onReviewWrong={() => {
              const [start, end] = getSectionRange(sectionTotal, scorecardSection, certId);
              const wrongIds = activeQuestions
                .slice(start, end)
                .filter((q) => checked.has(q.id) && !isCorrectAnswer(q, answers[q.id]))
                .map((q) => q.id);
              if (wrongIds.length === 0) return;
              setChecked((s) => {
                const next = new Set(s);
                wrongIds.forEach((id) => next.delete(id));
                return next;
              });
              setAnswers((a) => {
                const next = { ...a };
                wrongIds.forEach((id) => delete next[id]);
                return next;
              });
              setReopenedIds((s) => new Set([...s, ...wrongIds]));
              setReviewQueue({ sectionIndex: scorecardSection, questionIds: wrongIds });
              setReviewIndex(0);
              setScorecardSection(null);
            }}
            onViewFinalResult={() => {
              const answeredQuestions = activeQuestions.filter((q) => checked.has(q.id));
              const correctCount = answeredQuestions.filter((q) => isCorrectAnswer(q, answers[q.id])).length;
              const scorePercent =
                answeredQuestions.length === 0 ? 0 : Math.round((correctCount / answeredQuestions.length) * 100);

              // Real bug fix: "View Final Result" is offered whenever
              // there's no next SECTION within what the server delivered
              // (hasNextSection, an array-length check) — for a non-Pro
              // user that's always true on their one free section,
              // regardless of whether they actually passed it. Showing
              // the Stage-4 completion screen (with its Register/Upgrade
              // CTA) on a FAILED attempt falsely told someone who only
              // scored 29-31% that they'd earned the right to continue.
              // The real rule (confirmed): under 90%, the next section
              // stays locked and the person must retry — same
              // resetSection+goTo(start) the visible "Wiederholen" button
              // already does, not a dead-end toward Registration/Premium.
              // A Premium user is unaffected: they always see their real,
              // full result regardless of score, same as before.
              if (!canAccess(isPro, "practice_questions_full") && scorePercent < SECTION_PASS_THRESHOLD) {
                resetSection(scorecardSection, false);
                const [start] = getSectionRange(sectionTotal, scorecardSection, certId);
                setScorecardSection(null);
                setRetryReason({ scorePercent });
                goTo(start);
                return;
              }

              setScorecardSection(null);
              setExamComplete(true);
              // Only log the milestone for exams that were meaningfully
              // attempted and passed — avoids cluttering the activity feed
              // with abandoned or near-empty attempts.
              if (answeredQuestions.length >= 5 && scorePercent >= 70) {
                useActivityLogStore
                  .getState()
                  .recordActivity("exam_passed", `Mock Exam bestanden: ${certTitle}`, 100, { scorePercent });
              }
            }}
          />
        <PracticeNotesPanel isOpen={notesOpen} onClose={() => setNotesOpen(false)} />
      </div>
    );
  }

  return (
    <div className="px-1">
      {retryReason && (
        <div className="mb-3 flex items-center justify-between gap-3 rounded-lg border border-warning/30 bg-warning/10 px-4 py-2.5 text-sm text-text">
          <span>
            {t("practice.retryReasonPrefix")} {retryReason.scorePercent}%
            {t("practice.retryReasonSuffix").replace("{threshold}", String(SECTION_PASS_THRESHOLD))}
          </span>
          <button
            onClick={() => setRetryReason(null)}
            className="shrink-0 text-text-faint hover:text-text"
            aria-label={t("help.close")}
          >
            <X size={14} />
          </button>
        </div>
      )}
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <SectionMenu
            total={sectionTotal}
            certId={certId}
            currentIndex={index}
            statusFor={statusFor}
            onJump={(i, sectionIdx) => (sectionIdx !== undefined ? jumpToSection(sectionIdx, i) : goTo(i))}
            isUnlocked={
              !isPro ? (s) => s === 0 : attemptsMigrationReady ? (s) => isSectionPermanentlyUnlocked(certId, s) : undefined
            }
            getBestScore={attemptsMigrationReady ? (s) => getBestScore(certId, s) : undefined}
            onLockedClick={!isPro ? () => setShowPremiumGate(true) : undefined}
          />
          <SectionProgressBar
            start={currentSectionStart}
            end={currentSectionEnd}
            sectionNumber={currentSectionIdx + 1}
            statusFor={statusFor}
          />
          <button
            onClick={() => setStatsDrawerOpen(true)}
            style={{ width: 170, height: 44 }}
            className={`flex flex-none items-center justify-center gap-2 rounded-[14px] border px-4 text-[15px] font-semibold text-white transition-all duration-200 ease-in-out ${
              statsDrawerOpen
                ? "border-primary bg-primary/15 shadow-[0_0_20px_rgba(124,58,237,0.25)]"
                : "border-white/10 bg-transparent hover:border-primary hover:bg-primary/15 hover:shadow-[0_0_20px_rgba(124,58,237,0.25)]"
            }`}
          >
            <BarChart3 size={17} className="text-white" />
            {t("practice.progressBtn")}
          </button>
        </div>

        {/* Always visible for the current section — no click required,
            unlike the Abschnitt switcher above. Normal document flow (not
            absolute), so it pushes the question panel down instead of
            overlaying it. */}
        {reviewQueue ? (
          <div className="rounded-xl border border-warning/30 bg-warning/10 p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-warning">
              <RefreshCcw size={15} />
              {t("practice.reviewModeTitle")}
            </p>
            <p className="mt-1 text-xs text-text-muted">{t("practice.reviewModeHint")}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-text-faint">
                {t("practice.reviewModeProgress")
                  .replace("{current}", String(reviewIndex + 1))
                  .replace("{total}", String(reviewQueue.questionIds.length))}
              </span>
              <button
                onClick={() => {
                  const finishedSectionIdx = reviewQueue.sectionIndex;
                  setReviewQueue(null);
                  setReviewIndex(0);
                  setScorecardSection(finishedSectionIdx);
                }}
                className="rounded-lg border border-warning/40 px-3 py-1.5 text-xs font-semibold text-warning hover:bg-warning/10"
              >
                {t("practice.reviewModeDone")}
              </button>
            </div>
          </div>
        ) : (
          <SectionQuestionGrid
            start={currentSectionStart}
            end={currentSectionEnd}
            currentIndex={index}
            statusFor={statusFor}
            onJump={goTo}
          />
        )}
      </div>

      <SectionStatsPanel
        start={currentSectionStart}
        end={currentSectionEnd}
        statusFor={statusFor}
        elapsedSeconds={EXAM_TOTAL_SECONDS - remainingSeconds}
        open={statsDrawerOpen}
        onClose={() => setStatsDrawerOpen(false)}
      />

      <div className="mt-6">
        <QuestionPanel
          question={current}
          index={index}
          total={sectionTotal}
          optionShuffleGen={optionShuffleGen}
          selected={answers[current.id] ?? null}
          checked={checked.has(current.id)}
          marked={marked.has(current.id)}
          isCorrect={isCorrectAnswer(current, answers[current.id])}
          hintOpen={hintOpen}
          onToggleHint={() => setHintOpen((v) => !v)}
          onSelect={(id) => {
            const multi = current.type !== "yesno" && current.type !== "matching" && isMultiSelectQuestion(current);
            setAnswers((a) => {
              if (!multi) return { ...a, [current.id]: id };
              const existing = (a[current.id] as PracticeOptionId[] | undefined) ?? [];
              const next = existing.includes(id) ? existing.filter((x) => x !== id) : [...existing, id];
              return { ...a, [current.id]: next };
            });
          }}
          onSelectStatement={(i, val) =>
            setAnswers((a) => ({
              ...a,
              [current.id]: { ...((a[current.id] as YesNoAnswers) ?? {}), [i]: val },
            }))
          }
          onSelectMatch={(descriptionId, itemId) =>
            setAnswers((a) => ({
              ...a,
              [current.id]: { ...((a[current.id] as MatchingAnswers) ?? {}), [descriptionId]: itemId },
            }))
          }
          onClearMatch={(descriptionId) =>
            setAnswers((a) => {
              const next = { ...((a[current.id] as MatchingAnswers) ?? {}) };
              delete next[descriptionId];
              return { ...a, [current.id]: next };
            })
          }
          onCheck={() => {
            const next = new Set(checked).add(current.id);
            setChecked(next);
            setReopenedIds((s) => {
              if (!s.has(current.id)) return s;
              const n = new Set(s);
              n.delete(current.id);
              return n;
            });
            const isCorrect = isCorrectAnswer(current, answers[current.id]);
            useUserProgressStore.getState().recordAnswer(isCorrect);
            useCertProgressStore.getState().recordAnswerForCert(certId, isCorrect);
            useTopicMasteryStore.getState().recordAnswerForTopic(current.topicId, isCorrect);
            if (user) recordPersistedAnswer(user.id, certId, current.id, isCorrect);
            if (isGuest) saveGuestAnswer(certId, { questionId: current.id, answer: answers[current.id], isCorrect });
            if (isCorrect) useCertProgressStore.getState().recordModuleCompletion(certId, 2);
            // Review mode (spec section 8) never touches Attempts, History,
            // Best Score, or section-unlock state — maybeShowScorecard is
            // the only place that records an attempt, so it must never be
            // reached from here. Outside review mode, maybeShowScorecard
            // itself decides (via attemptedSections) whether this is a
            // genuinely new completion or just a touch-up of an
            // already-finished section, so no extra guard is needed here.
            if (!reviewQueue) maybeShowScorecard(current.id, next);
          }}
          onNext={() => {
            if (reviewQueue) {
              if (reviewIndex < reviewQueue.questionIds.length - 1) setReviewIndex(reviewIndex + 1);
              return;
            }
            goTo(index + 1);
          }}
          onPrev={() => {
            if (reviewQueue) {
              if (reviewIndex > 0) setReviewIndex(reviewIndex - 1);
              return;
            }
            goTo(index - 1);
          }}
          onSkip={() => {
            setSkipped((s) => new Set(s).add(current.id));
            if (reviewQueue) {
              if (reviewIndex < reviewQueue.questionIds.length - 1) setReviewIndex(reviewIndex + 1);
              return;
            }
            maybeShowScorecard(current.id, checked);
            goTo(index + 1);
          }}
          onToggleMark={() =>
            setMarked((s) => {
              const next = new Set(s);
              if (next.has(current.id)) next.delete(current.id);
              else next.add(current.id);
              return next;
            })
          }
          onOpenAiCoach={() => setCoachOpen(true)}
          onOpenNotes={() => setNotesOpen(true)}
          onRetrySection={() => requestSectionRetry(false)}
          onRetrySectionShuffled={() => requestSectionRetry(true)}
          onResetAll={() => setRestartModalOpen(true)}
        />
      </div>

      {pendingSectionRetry && (
        <RestartConfirmModal
          loading={false}
          title={t("practice.sectionRetryConfirmTitle")}
          body={t("practice.sectionRetryConfirmBody")}
          confirmLabel={
            pendingSectionRetry.shuffle ? t("practice.retryShuffledBtn") : t("practice.retrySameOrderBtn")
          }
          danger={false}
          onCancel={() => setPendingSectionRetry(null)}
          onConfirm={() => {
            const { sectionIdx, shuffle: doShuffle } = pendingSectionRetry;
            resetSection(sectionIdx, doShuffle);
            const [start] = getSectionRange(sectionTotal, sectionIdx, certId);
            setPendingSectionRetry(null);
            goTo(start);
          }}
        />
      )}

      {restartModalOpen && (
        <RestartConfirmModal onConfirm={restartFromScratch} onCancel={() => setRestartModalOpen(false)} loading={restarting} />
      )}

      {showRegistrationGate && (
        <FreeRegistrationGate returnTo={pathname ?? "/dashboard"} onClose={() => setShowRegistrationGate(false)} />
      )}
      {showPremiumGate && (
        <PremiumGateModal
          variant="practice"
          certificationName={certCode}
          benefits={premiumBenefits}
          onClose={() => setShowPremiumGate(false)}
        />
      )}

      {/* AI coach now spans the full width below the question. */}
      <div className="mt-6 hidden h-[420px] lg:block">
        <AICoachPanel key={current.id} question={current} isOpen={true} onClose={() => {}} />
      </div>

      {/* Mobile: SectionStatsPanel is desktop-only above (fixed overlay
          would cover content on small screens), so mobile keeps a compact
          inline stats bar; Mischen/Notizen now live in QuestionPanel's own
          button row above instead of duplicated here. AI coach opens as a
          full-screen overlay via the floating action button instead. */}
      <div className="mt-6 lg:hidden">
        <QuickStats
          compact
          answered={answeredCount}
          skipped={skipped.size}
          marked={marked.size}
          total={sectionTotal}
          remainingSeconds={remainingSeconds}
          totalSeconds={EXAM_TOTAL_SECONDS}
        />
      </div>

      <div className="lg:hidden">
        <AICoachPanel key={current.id} question={current} isOpen={coachOpen} onClose={() => setCoachOpen(false)} />
      </div>

      <SectionHistoryPanel certId={certId} certLabel={`${certCode}: ${certTitle}`} totalQuestions={questions.length} />

      <PracticeNotesPanel isOpen={notesOpen} onClose={() => setNotesOpen(false)} />
    </div>
  );
}
