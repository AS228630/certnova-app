"use client";

import { useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import type { PracticeOptionId, PracticeQuestion, PracticeTopic } from "@/lib/az900Practice";
import PracticeHeader from "./PracticeHeader";
import TopicsSidebar from "./TopicsSidebar";
import QuestionPanel from "./QuestionPanel";
import QuestionNavigator from "./QuestionNavigator";
import QuickStats from "./QuickStats";
import AICoachPanel from "./AICoachPanel";
import PracticeNotesPanel from "./PracticeNotesPanel";
import { useUserProgressStore } from "@/lib/store/userProgressStore";
import { useCertProgressStore } from "@/lib/store/certProgressStore";

const EXAM_TOTAL_SECONDS = 2 * 60 * 60; // 2h, matches a real certification exam

export default function PracticeClient({
  companyName,
  companySlug,
  certId,
  certCode,
  certTitle,
  level,
  rating,
  ratingCount,
  topics,
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
  const loadedCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const t of topics) counts[t.id] = questions.filter((q) => q.topicId === t.id).length;
    return counts;
  }, [topics, questions]);

  const [activeTopicId, setActiveTopicId] = useState(topics.find((t) => loadedCounts[t.id] > 0)?.id ?? topics[0].id);
  const [order, setOrder] = useState<string[] | null>(null); // null = topic order, else shuffled question ids
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, PracticeOptionId | Record<number, "Ja" | "Nein">>>({});
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [skipped, setSkipped] = useState<Set<string>>(new Set());
  const [coachOpen, setCoachOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(EXAM_TOTAL_SECONDS);

  useEffect(() => {
    const t = setInterval(() => setRemainingSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const activeQuestions = useMemo(() => {
    if (order) return order.map((id) => questions.find((q) => q.id === id)!).filter(Boolean);
    return questions.filter((q) => q.topicId === activeTopicId);
  }, [order, activeTopicId, questions]);

  const current = activeQuestions[index];

  function isCorrectAnswer(q: PracticeQuestion, answer: PracticeOptionId | Record<number, "Ja" | "Nein"> | undefined): boolean {
    if (!answer) return false;
    if (q.type === "yesno") {
      const a = answer as Record<number, "Ja" | "Nein">;
      return q.statements.every((s, i) => a[i] === s.correct);
    }
    return answer === q.correct;
  }

  const answeredCount = checked.size;
  const correctCount = [...checked].filter((id) => isCorrectAnswer(questions.find((q) => q.id === id)!, answers[id])).length;
  const wrongCount = answeredCount - correctCount;

  const progressByTopic = useMemo(() => {
    const result: Record<string, number> = {};
    for (const t of topics) {
      const qs = questions.filter((q) => q.topicId === t.id);
      const done = qs.filter((q) => checked.has(q.id)).length;
      result[t.id] = qs.length === 0 ? 0 : Math.round((done / qs.length) * 100);
    }
    return result;
  }, [topics, questions, checked]);

  function selectTopic(id: string) {
    setActiveTopicId(id);
    setOrder(null);
    setIndex(0);
  }

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
        Für dieses Thema sind noch keine Fragen verfügbar.
      </div>
    );
  }

  return (
    <div>
      <PracticeHeader
        companyName={companyName}
        companySlug={companySlug}
        certCode={certCode}
        certTitle={certTitle}
        level={level}
        rating={rating}
        ratingCount={ratingCount}
        total={activeQuestions.length}
        answered={answeredCount}
        correct={correctCount}
        wrong={wrongCount}
        onToggleNotes={() => setNotesOpen(true)}
      />

      <button
        onClick={() => setCoachOpen(true)}
        className="mt-4 flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white lg:hidden"
      >
        <Sparkles size={13} />
        KI Coach öffnen
      </button>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr_300px]">
        <div className="lg:order-1">
          <TopicsSidebar
            topics={topics}
            loadedCounts={loadedCounts}
            activeTopicId={activeTopicId}
            onSelectTopic={selectTopic}
            progressByTopic={progressByTopic}
            onShuffle={shuffle}
          />
        </div>

        <div className="space-y-6 lg:order-2">
          <QuestionPanel
            question={current}
            index={index}
            total={activeQuestions.length}
            selected={answers[current.id] ?? null}
            checked={checked.has(current.id)}
            marked={marked.has(current.id)}
            isCorrect={isCorrectAnswer(current, answers[current.id])}
            onSelect={(id) => setAnswers((a) => ({ ...a, [current.id]: id }))}
            onSelectStatement={(i, val) =>
              setAnswers((a) => ({
                ...a,
                [current.id]: { ...((a[current.id] as Record<number, "Ja" | "Nein">) ?? {}), [i]: val },
              }))
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

        <div className="space-y-6 lg:order-3">
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
    </div>
  );
}
