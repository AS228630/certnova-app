"use client";

import { useEffect, useMemo, useState } from "react";
import { Shuffle, StickyNote, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { PracticeOptionId, PracticeQuestion, PracticeTopic } from "@/lib/az900Practice";
import { getAz900Questions, isSingleChoiceAnswerCorrect, isMultiSelectQuestion } from "@/lib/az900Practice";
import { getAb900Questions } from "@/lib/ab900Practice";
import { useLocale } from "@/components/LocaleProvider";
import { getSectionForIndex, getSectionRange, getSectionCount } from "@/lib/practiceSections";
import PracticeToolbar from "./PracticeToolbar";
import QuestionPanel from "./QuestionPanel";
import SectionMenu from "./SectionMenu";
import SectionQuestionGrid from "./SectionQuestionGrid";
import SectionProgressBar from "./SectionProgressBar";
import SectionStatsPanel from "./SectionStatsPanel";
import QuickStats from "./QuickStats";
import AICoachPanel from "./AICoachPanel";
import PracticeNotesPanel from "./PracticeNotesPanel";
import PracticeFloatingActions from "./PracticeFloatingActions";
import SectionScorecard from "./SectionScorecard";
import ExamCompleteScreen from "./ExamCompleteScreen";
import RestartConfirmModal from "./RestartConfirmModal";
import { useUserProgressStore } from "@/lib/store/userProgressStore";
import { useCertProgressStore } from "@/lib/store/certProgressStore";
import { useTopicMasteryStore } from "@/lib/store/topicMasteryStore";
import { useActivityLogStore } from "@/lib/store/activityLogStore";
import { useQuestionAnswersStore } from "@/lib/store/questionAnswersStore";
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
  const [coachOpen, setCoachOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(EXAM_TOTAL_SECONDS);
  const [scorecardSection, setScorecardSection] = useState<number | null>(null);
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
  const resetCertPracticeDetail = useCertProgressStore((s) => s.resetPracticeDetail);

  useEffect(() => {
    if (user) loadPersistedAnswers(user.id, certId);
  }, [user, certId, loadPersistedAnswers]);

  // The practice exam always covers the full authored question set for this
  // cert — no topic filter, matching a real certification exam simulation.
  const activeQuestions = useMemo(() => {
    if (order) return order.map((id) => questions.find((q) => q.id === id)!).filter(Boolean);
    return questions;
  }, [order, questions]);

  const current = activeQuestions[index];
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

  function statusFor(i: number): "correct" | "wrong" | "marked" | "skipped" | "unanswered" {
    const q = activeQuestions[i];
    if (!q) return "unanswered";
    if (marked.has(q.id)) return "marked";
    const isAnswered = checked.has(q.id) || persistedCorrectness[q.id] !== undefined;
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
  }

  function resetSection(sectionIdx: number) {
    const [start, end] = getSectionRange(activeQuestions.length, sectionIdx);
    const ids = activeQuestions.slice(start, end).map((q) => q.id);

    // Shuffle just this section's question order (Fisher-Yates), so
    // retaking a section shows the same pool of questions but never in the
    // same order twice — keeps section boundaries (global indices) stable
    // for the rest of the exam.
    const shuffledIds = [...ids];
    for (let i = shuffledIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIds[i], shuffledIds[j]] = [shuffledIds[j], shuffledIds[i]];
    }
    const baseOrder = order ?? questions.map((q) => q.id);
    const newOrder = [...baseOrder];
    newOrder.splice(start, shuffledIds.length, ...shuffledIds);
    setOrder(newOrder);

    setChecked((s) => {
      const next = new Set(s);
      ids.forEach((id) => next.delete(id));
      return next;
    });
    setSkipped((s) => {
      const next = new Set(s);
      ids.forEach((id) => next.delete(id));
      return next;
    });
    setAnswers((a) => {
      const next = { ...a };
      ids.forEach((id) => delete next[id]);
      return next;
    });
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
        <PracticeToolbar
          companySlug={companySlug}
          certCode={certCode}
        />
        <div className="mt-6">
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
        </div>
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
        <PracticeToolbar
          companySlug={companySlug}
          certCode={certCode}
        />
        <div className="mt-6">
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
              resetSection(scorecardSection);
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
              setScorecardSection(null);
              goTo(qIndex);
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
        </div>
        <PracticeNotesPanel isOpen={notesOpen} onClose={() => setNotesOpen(false)} />
      </div>
    );
  }

  return (
    <div className="px-1">
      <PracticeToolbar
        companySlug={companySlug}
        certCode={certCode}
      />

      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <SectionMenu
            total={activeQuestions.length}
            currentIndex={index}
            statusFor={statusFor}
            onJump={goTo}
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
        <SectionQuestionGrid
          start={currentSectionStart}
          end={currentSectionEnd}
          currentIndex={index}
          statusFor={statusFor}
          onJump={goTo}
        />
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
            const isCorrect = isCorrectAnswer(current, answers[current.id]);
            useUserProgressStore.getState().recordAnswer(isCorrect);
            useCertProgressStore.getState().recordAnswerForCert(certId, isCorrect);
            useTopicMasteryStore.getState().recordAnswerForTopic(current.topicId, isCorrect);
            if (user) recordPersistedAnswer(user.id, certId, current.id, isCorrect);
            if (isCorrect) useCertProgressStore.getState().recordModuleCompletion(certId, 2);
            maybeShowScorecard(current.id, next);
          }}
          onNext={() => goTo(index + 1)}
          onPrev={() => goTo(index - 1)}
          onSkip={() => {
            setSkipped((s) => new Set(s).add(current.id));
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
        />
      </div>

      {/* AI coach now spans the full width below the question. */}
      <div className="mt-6 hidden h-[420px] lg:block">
        <AICoachPanel key={current.id} question={current} isOpen={true} onClose={() => {}} />
      </div>

      {/* Mischen/Notizen moved down here (desktop) — they were cluttering
          the top of the page. Section stats are now a drawer, triggered
          from the "Fortschritt" button in the header row above. */}
      <div className="mt-6 hidden flex-wrap items-start gap-3 lg:flex">
        <button
          onClick={shuffle}
          className="flex h-10 items-center gap-1.5 rounded-lg border border-border-soft bg-panel px-3.5 text-xs font-semibold text-text-muted hover:border-primary hover:text-primary"
        >
          <Shuffle size={14} />
          {t("practice.shuffle")}
        </button>
        <button
          onClick={() => setNotesOpen(true)}
          className="flex h-10 items-center gap-1.5 rounded-lg border border-border-soft bg-panel px-3.5 text-xs font-semibold text-text-muted hover:border-primary hover:text-primary"
        >
          <StickyNote size={14} />
          {t("practice.notes")}
        </button>
      </div>

      {/* Mobile: SectionStatsPanel is desktop-only above (fixed overlay
          would cover content on small screens), so mobile keeps a compact
          inline stats bar plus the same two utility buttons; AI coach
          opens as a full-screen overlay via the floating action button
          instead. */}
      <div className="mt-6 space-y-3 lg:hidden">
        <QuickStats
          compact
          answered={answeredCount}
          skipped={skipped.size}
          marked={marked.size}
          total={activeQuestions.length}
          remainingSeconds={remainingSeconds}
          totalSeconds={EXAM_TOTAL_SECONDS}
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={shuffle}
            className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border-soft bg-panel px-3 text-xs font-semibold text-text-muted"
          >
            <Shuffle size={13} />
            {t("practice.shuffle")}
          </button>
          <button
            onClick={() => setNotesOpen(true)}
            className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border-soft bg-panel px-3 text-xs font-semibold text-text-muted"
          >
            <StickyNote size={13} />
            {t("practice.notes")}
          </button>
        </div>
      </div>

      <div className="lg:hidden">
        <AICoachPanel key={current.id} question={current} isOpen={coachOpen} onClose={() => setCoachOpen(false)} />
      </div>

      <PracticeNotesPanel isOpen={notesOpen} onClose={() => setNotesOpen(false)} />

      <PracticeFloatingActions
        onHint={() => setHintOpen((v) => !v)}
        onNotes={() => setNotesOpen(true)}
        onCoach={() => setCoachOpen(true)}
      />
    </div>
  );
}
