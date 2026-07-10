"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { PracticeOptionId, PracticeQuestion, PracticeTopic } from "@/lib/az900Practice";
import { getAz900Questions } from "@/lib/az900Practice";
import { getAb900Questions } from "@/lib/ab900Practice";
import { useLocale } from "@/components/LocaleProvider";
import { getSectionForIndex, getSectionRange, getSectionCount } from "@/lib/practiceSections";
import PracticeToolbar from "./PracticeToolbar";
import QuestionPanel from "./QuestionPanel";
import QuestionNavigator from "./QuestionNavigator";
import QuickStats from "./QuickStats";
import AICoachPanel from "./AICoachPanel";
import PracticeNotesPanel from "./PracticeNotesPanel";
import PracticeFloatingActions from "./PracticeFloatingActions";
import SectionScorecard from "./SectionScorecard";
import ExamCompleteScreen from "./ExamCompleteScreen";
import { useUserProgressStore } from "@/lib/store/userProgressStore";
import { useCertProgressStore } from "@/lib/store/certProgressStore";

const EXAM_TOTAL_SECONDS = 2 * 60 * 60; // 2h, matches a real certification exam

type YesNoAnswers = Record<number, "Ja" | "Nein">;
type MatchingAnswers = Record<string, string>;
type Answer = PracticeOptionId | YesNoAnswers | MatchingAnswers;

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
  const { locale } = useLocale();
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

  useEffect(() => {
    const t = setInterval(() => setRemainingSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  // The practice exam always covers the full authored question set for this
  // cert — no topic filter, matching a real certification exam simulation.
  const activeQuestions = useMemo(() => {
    if (order) return order.map((id) => questions.find((q) => q.id === id)!).filter(Boolean);
    return questions;
  }, [order, questions]);

  const current = activeQuestions[index];
  const sectionCount = getSectionCount(activeQuestions.length);

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
    return answer === q.correct;
  }

  const answeredCount = checked.size;

  function shuffle() {
    const ids = questions.map((q) => q.id);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    setOrder(ids);
    setIndex(0);
  }

  function goTo(i: number) {
    setIndex(Math.max(0, Math.min(activeQuestions.length - 1, i)));
    setHintOpen(false);
  }

  function statusFor(i: number): "correct" | "wrong" | "marked" | "skipped" | "unanswered" {
    const q = activeQuestions[i];
    if (!q) return "unanswered";
    if (marked.has(q.id)) return "marked";
    if (skipped.has(q.id) && !checked.has(q.id)) return "skipped";
    if (checked.has(q.id)) return isCorrectAnswer(q, answers[q.id]) ? "correct" : "wrong";
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
          companyName={companyName}
          companySlug={companySlug}
          certCode={certCode}
          certTitle={certTitle}
          index={index}
          total={activeQuestions.length}
          onToggleNotes={() => setNotesOpen(true)}
          onShuffle={shuffle}
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
            onRetryAll={() => {
              setAnswers({});
              setChecked(new Set());
              setSkipped(new Set());
              setMarked(new Set());
              setExamComplete(false);
              setScorecardSection(null);
              goTo(0);
            }}
          />
        </div>
        <PracticeNotesPanel isOpen={notesOpen} onClose={() => setNotesOpen(false)} />
      </div>
    );
  }

  if (scorecardSection !== null) {
    return (
      <div>
        <PracticeToolbar
          companyName={companyName}
          companySlug={companySlug}
          certCode={certCode}
          certTitle={certTitle}
          index={index}
          total={activeQuestions.length}
          onToggleNotes={() => setNotesOpen(true)}
          onShuffle={shuffle}
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
            }}
          />
        </div>
        <PracticeNotesPanel isOpen={notesOpen} onClose={() => setNotesOpen(false)} />
      </div>
    );
  }

  return (
    <div>
      <PracticeToolbar
        companyName={companyName}
        companySlug={companySlug}
        certCode={certCode}
        certTitle={certTitle}
        index={index}
        total={activeQuestions.length}
        onToggleNotes={() => setNotesOpen(true)}
        onShuffle={shuffle}
      />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <QuestionPanel
            question={current}
            index={index}
            total={activeQuestions.length}
            selected={answers[current.id] ?? null}
            checked={checked.has(current.id)}
            marked={marked.has(current.id)}
            isCorrect={isCorrectAnswer(current, answers[current.id])}
            hintOpen={hintOpen}
            onSelect={(id) => setAnswers((a) => ({ ...a, [current.id]: id }))}
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

          <div className="hidden lg:block">
            <AICoachPanel key={current.id} question={current} isOpen={true} onClose={() => {}} />
          </div>
        </div>

        <div className="space-y-6">
          <QuestionNavigator
            total={activeQuestions.length}
            currentIndex={index}
            statusFor={statusFor}
            onJump={goTo}
          />
          <QuickStats
            answered={answeredCount}
            skipped={skipped.size}
            marked={marked.size}
            total={activeQuestions.length}
            remainingSeconds={remainingSeconds}
            totalSeconds={EXAM_TOTAL_SECONDS}
          />
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
