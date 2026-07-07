"use client";

import { useEffect, useMemo, useState } from "react";
import type { PracticeOptionId, PracticeQuestion, PracticeTopic } from "@/lib/az900Practice";
import PracticeToolbar from "./PracticeToolbar";
import QuestionPanel from "./QuestionPanel";
import QuestionNavigator from "./QuestionNavigator";
import QuickStats from "./QuickStats";
import AICoachPanel from "./AICoachPanel";
import PracticeNotesPanel from "./PracticeNotesPanel";
import PracticeFloatingActions from "./PracticeFloatingActions";
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
  questions,
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

  if (!current) {
    return (
      <div className="rounded-xl border border-border-soft bg-panel p-8 text-center text-sm text-text-muted">
        Für diese Zertifizierung sind noch keine Fragen verfügbar.
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
              setChecked((s) => new Set(s).add(current.id));
              const isCorrect = isCorrectAnswer(current, answers[current.id]);
              useUserProgressStore.getState().recordAnswer(isCorrect);
              useCertProgressStore.getState().recordAnswerForCert(certId, isCorrect);
              if (isCorrect) useCertProgressStore.getState().recordModuleCompletion(certId, 2);
            }}
            onNext={() => goTo(index + 1)}
            onPrev={() => goTo(index - 1)}
            onSkip={() => {
              setSkipped((s) => new Set(s).add(current.id));
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

          <QuestionNavigator
            total={activeQuestions.length}
            currentIndex={index}
            statusFor={statusFor}
            onJump={goTo}
          />
        </div>

        <div className="space-y-6">
          <div className="hidden lg:block">
            <AICoachPanel question={current} isOpen={true} onClose={() => {}} />
          </div>
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
        <AICoachPanel question={current} isOpen={coachOpen} onClose={() => setCoachOpen(false)} />
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
