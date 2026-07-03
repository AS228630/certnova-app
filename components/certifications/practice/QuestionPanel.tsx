"use client";

import { ChevronLeft, ChevronRight, Bookmark, Sparkles, CheckCircle2, XCircle, ExternalLink } from "lucide-react";
import type { PracticeOptionId, PracticeQuestion } from "@/lib/az900Practice";

export default function QuestionPanel({
  question,
  index,
  total,
  selected,
  checked,
  marked,
  onSelect,
  onCheck,
  onNext,
  onPrev,
  onSkip,
  onToggleMark,
  onOpenAiCoach,
}: {
  question: PracticeQuestion;
  index: number;
  total: number;
  selected: PracticeOptionId | null;
  checked: boolean;
  marked: boolean;
  onSelect: (id: PracticeOptionId) => void;
  onCheck: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  onToggleMark: () => void;
  onOpenAiCoach: () => void;
}) {
  const isCorrect = checked && selected === question.correct;

  return (
    <div className="rounded-xl border border-border-soft bg-panel p-5 md:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={index === 0}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-soft text-text-muted hover:border-primary hover:text-primary disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-semibold text-text">
            Frage {index + 1} von {total}
          </span>
          <button
            onClick={onNext}
            disabled={index === total - 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-soft text-text-muted hover:border-primary hover:text-primary disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMark}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${
              marked ? "border-warning text-warning" : "border-border-soft text-text-muted hover:border-primary"
            }`}
          >
            <Bookmark size={13} className={marked ? "fill-warning" : ""} />
            Markieren
          </button>
          <button
            onClick={onOpenAiCoach}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-primary-dark"
          >
            <Sparkles size={13} />
            KI Coach
          </button>
        </div>
      </div>

      <p className="mb-5 text-base font-medium leading-relaxed text-text">{question.prompt}</p>

      <div className="space-y-2.5">
        {question.options.map((opt) => {
          const isSelected = selected === opt.id;
          const isRight = opt.id === question.correct;
          let style = "border-border-soft hover:border-primary/40";
          if (checked && isRight) style = "border-success bg-success-light";
          else if (checked && isSelected && !isRight) style = "border-danger bg-danger/10";
          else if (!checked && isSelected) style = "border-primary bg-primary-light";

          return (
            <button
              key={opt.id}
              disabled={checked}
              onClick={() => onSelect(opt.id)}
              className={`flex w-full items-center gap-3 rounded-lg border p-3.5 text-left text-sm transition ${style}`}
            >
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-md border border-border-soft text-xs font-bold text-text-muted">
                {opt.id}
              </span>
              <span className="flex-1 text-text">{opt.text}</span>
              {checked && isRight && <CheckCircle2 size={17} className="flex-none text-success" />}
              {checked && isSelected && !isRight && <XCircle size={17} className="flex-none text-danger" />}
            </button>
          );
        })}
      </div>

      {checked && (
        <div
          className={`mt-5 rounded-lg border p-4 ${
            isCorrect ? "border-success/40 bg-success-light" : "border-danger/40 bg-danger/10"
          }`}
        >
          <p className={`mb-1.5 flex items-center gap-1.5 text-sm font-bold ${isCorrect ? "text-success" : "text-danger"}`}>
            {isCorrect ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
            {isCorrect ? "Richtige Antwort!" : "Nicht ganz richtig"}
          </p>
          <p className="text-sm text-text-muted">{question.explanation}</p>
          {question.resources && question.resources.length > 0 && (
            <div className="mt-3 space-y-1">
              {question.resources.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark"
                >
                  <ExternalLink size={12} />
                  {r.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border-soft pt-5">
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="rounded-lg border border-border-soft px-5 py-2.5 text-sm font-semibold text-text hover:border-primary disabled:opacity-30"
        >
          Zurück
        </button>
        <div className="flex flex-1 justify-end gap-3">
          <button
            onClick={onSkip}
            className="rounded-lg border border-border-soft px-5 py-2.5 text-sm font-semibold text-text hover:border-primary"
          >
            Überspringen
          </button>
          {!checked ? (
            <button
              onClick={onCheck}
              disabled={!selected}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-40"
            >
              Antwort prüfen
            </button>
          ) : (
            <button
              onClick={onNext}
              disabled={index === total - 1}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-40"
            >
              Weiter →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
