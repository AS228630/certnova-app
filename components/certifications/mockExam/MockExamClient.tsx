"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Clock3, X, AlertTriangle } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import type { PracticeQuestion, PracticeOptionId } from "@/lib/az900Practice";
import type { ExamInfo } from "@/lib/examInfoData";
import MockExamIntro from "./MockExamIntro";
import MockExamQuestion, { type MockAnswer } from "./MockExamQuestion";
import MockExamReview from "./MockExamReview";
import MockExamResults from "./MockExamResults";
import { useActivityLogStore } from "@/lib/store/activityLogStore";

type YesNoAnswers = Record<number, "Ja" | "Nein">;
type MatchingAnswers = Record<string, string>;
type Stage = "intro" | "exam" | "review" | "results";

function isCorrect(q: PracticeQuestion, answer: MockAnswer | undefined): boolean {
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

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function MockExamClient({
  companySlug,
  companyName,
  certId,
  certCode,
  certTitle,
  questions,
  examInfo,
}: {
  companySlug: string;
  companyName: string;
  certId: string;
  certCode: string;
  certTitle: string;
  questions: PracticeQuestion[];
  examInfo: ExamInfo;
}) {
  const { t } = useLocale();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const activeQuestions = useMemo(
    () => questions.slice(0, Math.min(examInfo.simQuestionCount, questions.length)),
    [questions, examInfo.simQuestionCount]
  );
  const totalSeconds = examInfo.simDurationMinutes * 60;

  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, MockAnswer>>({});
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
  const [tabWarning, setTabWarning] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);

  const current = activeQuestions[index];

  const answeredIds = useMemo(() => {
    const set = new Set<number>();
    activeQuestions.forEach((q, i) => {
      if (answers[q.id] !== undefined) set.add(i);
    });
    return set;
  }, [activeQuestions, answers]);

  const markedIds = useMemo(() => {
    const set = new Set<number>();
    activeQuestions.forEach((q, i) => {
      if (marked.has(q.id)) set.add(i);
    });
    return set;
  }, [activeQuestions, marked]);

  const finishExam = useCallback(() => {
    const correctCount = activeQuestions.filter((q) => isCorrect(q, answers[q.id])).length;
    const scorePercent = activeQuestions.length === 0 ? 0 : Math.round((correctCount / activeQuestions.length) * 100);
    const passed = scorePercent >= 70; // simplified proxy — see scoringDisclaimer shown on results
    if (passed) {
      useActivityLogStore
        .getState()
        .recordActivity("exam_passed", `Prüfungssimulation bestanden: ${certTitle}`, 100, { scorePercent });
    }
    setStage("results");
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }, [activeQuestions, answers, certTitle]);

  // Countdown timer, only while actively taking the exam.
  useEffect(() => {
    if (stage !== "exam" && stage !== "review") return;
    const timer = setInterval(() => {
      setRemainingSeconds((s) => {
        if (s <= 1) {
          clearInterval(timer);
          finishExam();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [stage, finishExam]);

  // Tab-switch / window-blur detection — mirrors real proctored exams
  // flagging when a candidate leaves the exam window. We only warn (a
  // browser tab cannot be locked or prevented from switching — no website
  // can block the OS or other apps), we never auto-fail.
  useEffect(() => {
    if (stage !== "exam") return;
    function handleVisibility() {
      if (document.hidden) setTabWarning(true);
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [stage]);

  useEffect(() => {
    if (!tabWarning) return;
    const timeout = setTimeout(() => setTabWarning(false), 6000);
    return () => clearTimeout(timeout);
  }, [tabWarning]);

  async function startExam() {
    try {
      if (containerRef.current?.requestFullscreen) {
        await containerRef.current.requestFullscreen();
      }
    } catch {
      // Fullscreen can be denied by the browser/user — the exam still
      // works, just without the fullscreen chrome.
    }
    setRemainingSeconds(totalSeconds);
    setIndex(0);
    setAnswers({});
    setMarked(new Set());
    setStage("exam");
  }

  function exitToJourney() {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    router.push(`/certifications/${companySlug}/${certId}`);
  }

  if (!current && stage !== "intro") {
    return (
      <div className="rounded-xl border border-border-soft bg-panel p-8 text-center text-sm text-text-muted">
        {t("mockExam.noQuestions")}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={stage === "exam" || stage === "review" ? "min-h-screen bg-bg p-4 sm:p-8" : ""}
    >
      {stage === "intro" && (
        <MockExamIntro
          certCode={certCode}
          certTitle={certTitle}
          questionCount={activeQuestions.length}
          durationMinutes={examInfo.simDurationMinutes}
          examInfo={examInfo}
          onStart={startExam}
        />
      )}

      {stage === "exam" && current && (
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 flex items-center justify-between rounded-xl border border-border-soft bg-panel px-4 py-2.5">
            <div className="text-xs font-semibold text-text-muted">
              {companyName} · {certCode}
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold ${
                  remainingSeconds < 60 ? "bg-danger-light text-danger" : "bg-panel-alt text-text"
                }`}
              >
                <Clock3 size={13} />
                {formatTime(remainingSeconds)}
              </span>
              <button
                onClick={() => setConfirmExit(true)}
                className="rounded-lg p-1.5 text-text-faint hover:bg-panel-alt"
                aria-label={t("mockExam.exitExam")}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {tabWarning && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-600">
              <AlertTriangle size={14} />
              {t("mockExam.tabSwitchWarning")}
            </div>
          )}

          <MockExamQuestion
            question={current}
            index={index}
            total={activeQuestions.length}
            answer={answers[current.id]}
            marked={marked.has(current.id)}
            onSelectSingle={(id: PracticeOptionId) => setAnswers((a) => ({ ...a, [current.id]: id }))}
            onSelectYesNo={(i, val) =>
              setAnswers((a) => ({
                ...a,
                [current.id]: { ...((a[current.id] as YesNoAnswers) ?? {}), [i]: val },
              }))
            }
            onSelectMatch={(descId, itemId) =>
              setAnswers((a) => ({
                ...a,
                [current.id]: { ...((a[current.id] as MatchingAnswers) ?? {}), [descId]: itemId },
              }))
            }
            onToggleMark={() =>
              setMarked((s) => {
                const next = new Set(s);
                if (next.has(current.id)) next.delete(current.id);
                else next.add(current.id);
                return next;
              })
            }
          />

          <div className="mt-4 flex items-center justify-between gap-2">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="flex items-center gap-1 rounded-lg border border-border-soft px-4 py-2.5 text-sm font-semibold text-text hover:bg-panel-alt disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              {t("mockExam.prevQuestion")}
            </button>

            {index === activeQuestions.length - 1 ? (
              <button
                onClick={() => setStage("review")}
                className="flex items-center gap-1 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-600"
              >
                {t("mockExam.goToReview")}
              </button>
            ) : (
              <button
                onClick={() => setIndex((i) => Math.min(activeQuestions.length - 1, i + 1))}
                className="flex items-center gap-1 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-600"
              >
                {t("mockExam.nextQuestion")}
                <ChevronRight size={16} />
              </button>
            )}
          </div>

          <button
            onClick={() => setStage("review")}
            className="mt-3 w-full rounded-lg border border-border-soft py-2 text-xs font-semibold text-text-muted hover:bg-panel-alt"
          >
            {t("mockExam.goToReview")}
          </button>
        </div>
      )}

      {stage === "review" && (
        <MockExamReview
          total={activeQuestions.length}
          answeredIds={answeredIds}
          markedIds={markedIds}
          remainingLabel={formatTime(remainingSeconds)}
          onJump={(i) => {
            setIndex(i);
            setStage("exam");
          }}
          onSubmit={() => setConfirmSubmit(true)}
          onBackToExam={() => setStage("exam")}
        />
      )}

      {stage === "results" &&
        (() => {
          const correctCount = activeQuestions.filter((q) => isCorrect(q, answers[q.id])).length;
          const scorePercent =
            activeQuestions.length === 0 ? 0 : Math.round((correctCount / activeQuestions.length) * 100);
          return (
            <MockExamResults
              companySlug={companySlug}
              certId={certId}
              correctCount={correctCount}
              totalCount={activeQuestions.length}
              passed={scorePercent >= 70}
              onRetry={startExam}
            />
          );
        })()}

      {confirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-panel p-5 text-center">
            <p className="mb-4 text-sm font-semibold text-text">{t("mockExam.confirmSubmitText")}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmSubmit(false)}
                className="flex-1 rounded-lg border border-border-soft py-2 text-xs font-semibold text-text hover:bg-panel-alt"
              >
                {t("mockExam.cancel")}
              </button>
              <button
                onClick={() => {
                  setConfirmSubmit(false);
                  finishExam();
                }}
                className="flex-1 rounded-lg bg-amber-500 py-2 text-xs font-bold text-white hover:bg-amber-600"
              >
                {t("mockExam.ctaSubmit")}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmExit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-panel p-5 text-center">
            <p className="mb-4 text-sm font-semibold text-text">{t("mockExam.confirmExitText")}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmExit(false)}
                className="flex-1 rounded-lg border border-border-soft py-2 text-xs font-semibold text-text hover:bg-panel-alt"
              >
                {t("mockExam.cancel")}
              </button>
              <button
                onClick={exitToJourney}
                className="flex-1 rounded-lg bg-danger py-2 text-xs font-bold text-white hover:opacity-90"
              >
                {t("mockExam.exitExam")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
