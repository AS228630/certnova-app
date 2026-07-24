"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import type { PracticeOptionId, PracticeQuestion, PracticeTopic } from "@/lib/az900Practice";
import { getAz900Questions, isSingleChoiceAnswerCorrect, isMultiSelectQuestion } from "@/lib/az900Practice";
import { getAb900Questions } from "@/lib/ab900Practice";
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
import RestartConfirmModal from "./RestartConfirmModal";
import { useUserProgressStore } from "@/lib/store/userProgressStore";
import { useCertProgressStore } from "@/lib/store/certProgressStore";
import { useTopicMasteryStore } from "@/lib/store/topicMasteryStore";
import { useActivityLogStore } from "@/lib/store/activityLogStore";
import { useQuestionAnswersStore } from "@/lib/store/questionAnswersStore";
import { useSectionAttemptsStore } from "@/lib/store/sectionAttemptsStore";
import { useUser } from "@/components/UserContext";

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
  topics,
  questions: questionsFromServer,
}: {
  companyName: string;
  companySlug: string;
  certId: string;
  certCode: string;
  certTitle: string;
  level: string;
  rating: number;
  ratingCount: number;
  topics: PracticeTopic[];
  questions: PracticeQuestion[];
}) {
  const { locale, t } = useLocale();
  // az-900 and ab-900 have real translations available (see
  // lib/i18n/questions/); every other cert's question bank isn't
  // translated yet, so it always uses the server-provided (German or
  // generic) questions unchanged.
  const questions = useMemo(() => {
    if (certId === "az-900") return getAz900Questions(locale);
    if (certId === "ab-900") return getAb900Questions(locale);
    return questionsFromServer;
  }, [certId, locale, questionsFromServer]);
  const router = useRouter();
  const [order, setOrder] = useState<string[] | null>(null); // null = authored order, else shuffled question ids
  const [index, setIndex] = useState(0);
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
  const [examComplete, setExamComplete] = useState(false);
  const [restartModalOpen, setRestartModalOpen] = useState(false);
  const [restarting, setRestarting] = useState(false);
  const [statsDrawerOpen, setStatsDrawerOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setRemainingSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const { user } = useUser();
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

  useEffect(() => {
    if (user) {
      loadPersistedAnswers(user.id, certId);
      loadSectionAttempts(user.id, certId);
    }
  }, [user, certId, loadPersistedAnswers, loadSectionAttempts]);

  // The practice exam always covers the full authored question set for this
  // cert — no topic filter, matching a real certification exam simulation.
  const activeQuestions = useMemo(() => {
    if (order) return order.map((id) => questions.find((q) => q.id === id)!).filter(Boolean);
    return questions;
  }, [order, questions]);

  const current = reviewQueue
    ? activeQuestions.find((q) => q.id === reviewQueue.questionIds[reviewIndex])
    : activeQuestions[index];
  const sectionCount = getSectionCount(activeQuestions.length);
  const currentSectionIdx = getSectionForIndex(activeQuestions.length, index);
  const [currentSectionStart, currentSectionEnd] = getSectionRange(activeQuestions.length, currentSectionIdx);

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

  function shuffle() {
    const ids = questions.map((q) => q.id);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    setOrder(ids);
    setIndex(0);
  }

  // Full "start over": wipes every persisted answer for this cert (so
  // sections re-lock from Abschnitt 1), resets all local session state,
  // and reshuffles the full question order so it's never the same as any
  // previous attempt.
  async function restartFromScratch() {
    setRestarting(true);
    try {
      if (user) {
        await clearPersistedAnswers(user.id, certId);
        await resetCertPracticeDetail(certId);
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
    setIndex(Math.max(0, Math.min(activeQuestions.length - 1, i)));
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
    const [start, end] = getSectionRange(activeQuestions.length, sectionIdx);
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
    const sectionIdx = getSectionForIndex(activeQuestions.length, index);
    const [start, end] = getSectionRange(activeQuestions.length, sectionIdx);
    for (let i = start; i < end; i++) {
      const q = activeQuestions[i];
      if (!q) continue;
      const resolved = q.id === justResolvedId || nowChecked.has(q.id) || skipped.has(q.id);
      if (!resolved) return;
    }
    setScorecardSection(sectionIdx);

    // Record this as a completed attempt at the section — every
    // completion, not just the first, and never overwritten (spec: full
    // history, unlimited retries). If it clears the mastery bar, the
    // NEXT section unlocks permanently right here, even on a retry.
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
    const [start, end] = getSectionRange(activeQuestions.length, sectionIdx);
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
    } else {
      // Always the true original authored order, regardless of whatever
      // order was active before (e.g. a prior shuffle).
      nextIds = originalIds;
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

  if (!current) {
    return (
      <div className="rounded-xl border border-border-soft bg-panel p-8 text-center text-sm text-text-muted">
        Für diese Zertifizierung sind noch keine Fragen verfügbar.
      </div>
    );
  }

  if (examComplete) {
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
            elapsedSeconds={EXAM_TOTAL_SECONDS - remainingSeconds}
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
          topics={topics}
          answers={answers}
          checked={checked}
            skipped={skipped}
            marked={marked}
            elapsedSeconds={EXAM_TOTAL_SECONDS - remainingSeconds}
            hasNextSection={scorecardSection + 1 < sectionCount}
            onBackToPath={() => router.push(`/certifications/${companySlug}/${certId}/learn`)}
            onNextSection={() => {
              const [, end] = getSectionRange(activeQuestions.length, scorecardSection);
              setScorecardSection(null);
              goTo(Math.min(end, activeQuestions.length - 1));
            }}
            onRetry={() => {
              // "Wiederholen" — same order every time, per spec.
              resetSection(scorecardSection, false);
              const [start] = getSectionRange(activeQuestions.length, scorecardSection);
              setScorecardSection(null);
              goTo(start);
            }}
            onRetryShuffled={() => {
              // "Gemischt wiederholen" — a brand-new random order on
              // every click, per spec.
              resetSection(scorecardSection, true);
              const [start] = getSectionRange(activeQuestions.length, scorecardSection);
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
              const [start, end] = getSectionRange(activeQuestions.length, scorecardSection);
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
              setScorecardSection(null);
              setExamComplete(true);
              const answeredQuestions = activeQuestions.filter((q) => checked.has(q.id));
              const correctCount = answeredQuestions.filter((q) => isCorrectAnswer(q, answers[q.id])).length;
              const scorePercent =
                answeredQuestions.length === 0 ? 0 : Math.round((correctCount / answeredQuestions.length) * 100);
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
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <SectionMenu
            total={activeQuestions.length}
            currentIndex={index}
            statusFor={statusFor}
            onJump={(i, sectionIdx) => (sectionIdx !== undefined ? jumpToSection(sectionIdx, i) : goTo(i))}
            getBestScore={attemptsMigrationReady ? (s) => getBestScore(certId, s) : undefined}
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
          total={activeQuestions.length}
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
            if (isCorrect) useCertProgressStore.getState().recordModuleCompletion(certId, 2);
            // Review mode (spec section 8): never touches Attempts, History,
            // Best Score, or section-unlock state — maybeShowScorecard is
            // the only place that records an attempt, so it must never be
            // reached from here, regardless of how many questions are left.
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
          onShuffle={shuffle}
          onOpenNotes={() => setNotesOpen(true)}
        />
      </div>

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
          total={activeQuestions.length}
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
