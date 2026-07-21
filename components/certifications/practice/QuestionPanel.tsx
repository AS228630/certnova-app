"use client";

import { useState } from "react";
import { Bookmark, Sparkles, CheckCircle2, XCircle, ExternalLink, Lightbulb } from "lucide-react";
import type { PracticeOptionId, PracticeQuestion } from "@/lib/az900Practice";
import { isMultiSelectQuestion, correctOptionIds } from "@/lib/az900Practice";
import MatchingQuestionView from "./MatchingQuestionView";
import { useLocale } from "@/components/LocaleProvider";

type YesNoAnswers = Record<number, "Ja" | "Nein">;
type MatchingAnswers = Record<string, string>;
type Answer = PracticeOptionId | PracticeOptionId[] | YesNoAnswers | MatchingAnswers;

export default function QuestionPanel({
  question,
  index,
  total,
  selected,
  checked,
  marked,
  isCorrect,
  hintOpen,
  onSelect,
  onSelectStatement,
  onSelectMatch,
  onClearMatch,
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
  selected: Answer | null;
  checked: boolean;
  marked: boolean;
  isCorrect: boolean;
  hintOpen: boolean;
  onSelect: (id: PracticeOptionId) => void;
  onSelectStatement: (i: number, value: "Ja" | "Nein") => void;
  onSelectMatch: (descriptionId: string, itemId: string) => void;
  onClearMatch: (descriptionId: string) => void;
  onCheck: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  onToggleMark: () => void;
  onOpenAiCoach: () => void;
}) {
  const { t } = useLocale();
  const [showExplanation, setShowExplanation] = useState(false);
  const hintText = deriveHint(question.explanation, t("practice.rememberHint"));
  const isYesNo = question.type === "yesno";
  const isMatching = question.type === "matching";
  const isMultiSelect = !isYesNo && !isMatching && isMultiSelectQuestion(question);
  const yesNoAnswers = (isYesNo ? (selected as YesNoAnswers) : {}) ?? {};
  const matchingAnswers = (isMatching ? (selected as MatchingAnswers) : {}) ?? {};
  const singleSelected = isYesNo || isMatching || isMultiSelect ? null : (selected as PracticeOptionId | null);
  const multiSelected = isMultiSelect ? ((selected as PracticeOptionId[] | null) ?? []) : [];
  const canCheck = isYesNo
    ? question.statements.every((_, i) => yesNoAnswers[i])
    : isMatching
      ? question.descriptions.every((d) => !!matchingAnswers[d.id])
      : isMultiSelect
        ? multiSelected.length > 0
        : !!singleSelected;
  const explanationVisible = checked || showExplanation;

  const [lastQuestionId, setLastQuestionId] = useState(question.id);
  if (question.id !== lastQuestionId) {
    setLastQuestionId(question.id);
    setShowExplanation(false);
  }


  return (
    <div className="rounded-xl border border-border-soft bg-panel p-5 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            {index + 1}.
          </span>
        </div>

        <div className="flex flex-none items-center gap-2">
          <button
            onClick={onToggleMark}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${
              marked ? "border-warning text-warning" : "border-border-soft text-text-muted hover:border-primary"
            }`}
          >
            <Bookmark size={13} className={marked ? "fill-warning" : ""} />
            {t("practice.markQ")}
          </button>
          <button
            onClick={onOpenAiCoach}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-primary-dark"
          >
            <Sparkles size={13} />
            {t("practice.aiCoachBtn")}
          </button>
        </div>
      </div>

      {hintOpen && !checked && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm text-text-muted">
          <Lightbulb size={15} className="mt-0.5 flex-none text-warning" />
          <p>{hintText}</p>
        </div>
      )}

      <p className="mb-5 max-w-[75ch] whitespace-pre-line text-[15.5px] font-medium leading-[1.85] tracking-[0.005em] text-text">{renderPrompt(question)}</p>

      {"imageUrl" in question && question.imageUrl && (
        <div className="mb-5 overflow-hidden rounded-lg border border-border-soft">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={question.imageUrl} alt={t("practice.referenceImgAlt")} className="w-full" />
        </div>
      )}

      {isMatching ? (
        <MatchingQuestionView
          question={question}
          selectedMap={matchingAnswers}
          checked={checked}
          onAssign={onSelectMatch}
          onClear={onClearMatch}
        />
      ) : isYesNo ? (
        <div className="overflow-hidden rounded-lg border border-border-soft">
          <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-border-soft bg-panel-alt px-3.5 py-2 text-xs font-semibold text-text-faint">
            <span>{t("practice.statement")}</span>
            <span>{t("practice.answerCol")}</span>
          </div>
          {question.statements.map((stmt, i) => {
            const picked = yesNoAnswers[i];
            const isRowCorrect = checked && picked === stmt.correct;
            const isRowWrong = checked && picked && picked !== stmt.correct;
            return (
              <div
                key={i}
                className={`grid grid-cols-[1fr_auto] items-center gap-3 border-b border-border-soft px-3.5 py-3 text-base last:border-b-0 ${
                  isRowCorrect ? "bg-success-light" : isRowWrong ? "bg-danger/10" : ""
                }`}
              >
                <span className="text-text">{stmt.text}</span>
                <div className="flex shrink-0 items-center gap-1.5">
                  {(["Ja", "Nein"] as const).map((opt) => {
                    const isPicked = picked === opt;
                    let style = "border-border-soft text-text-muted hover:border-primary/40";
                    if (checked && opt === stmt.correct) style = "border-success bg-success-light text-success";
                    else if (checked && isPicked && opt !== stmt.correct) style = "border-danger bg-danger/10 text-danger";
                    else if (!checked && isPicked) style = "border-primary bg-primary-light text-primary";
                    return (
                      <button
                        key={opt}
                        disabled={checked}
                        onClick={() => onSelectStatement(i, opt)}
                        className={`flex h-8 w-14 items-center justify-center rounded-md border text-xs font-bold transition ${style}`}
                      >
                        {opt === "Ja" ? t("practice.yesLabel") : t("practice.noLabel")}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {isYesNo && "combinedOptions" in question && question.combinedOptions && question.combinedOptions.length > 0 && (
        <div className="mt-3 rounded-lg border border-border-soft p-3">
          <p className="mb-2.5 text-xs font-semibold text-text-faint">{t("practice.orPickCombo")}</p>
          <div className="space-y-1.5">
            {question.combinedOptions.map((combo, ci) => {
              const letter = String.fromCharCode(65 + ci);
              const isThisPicked = question.statements.every((_, i) => yesNoAnswers[i] === combo[i]);
              const isThisCorrect = question.statements.every((s, i) => combo[i] === s.correct);
              let style = "border-border-soft hover:border-primary/40";
              if (checked && isThisCorrect) style = "border-success bg-success-light";
              else if (checked && isThisPicked && !isThisCorrect) style = "border-danger bg-danger/10";
              else if (!checked && isThisPicked) style = "border-primary bg-primary-light";
              return (
                <button
                  key={ci}
                  disabled={checked}
                  onClick={() => combo.forEach((v, i) => onSelectStatement(i, v))}
                  className={`flex w-full items-start gap-2.5 rounded-md border px-3 py-2 text-left text-xs transition ${style}`}
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[10px] font-bold">
                    {letter}
                  </span>
                  <span className="flex-1 space-y-0.5 text-text-muted">
                    {question.statements.map((s, i) => (
                      <span key={i} className="block">
                        {s.text}: <span className="font-semibold text-text">{combo[i] === "Ja" ? t("practice.yesLabel") : t("practice.noLabel")}</span>
                      </span>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      {!isYesNo && !isMatching && (
        <div className="space-y-2.5">
          {isMultiSelect && !checked && (
            <p className="mb-1 text-xs font-semibold text-primary">
              {t("practice.selectMultipleHint").replace("{count}", String(correctOptionIds(question).length))}
            </p>
          )}
          {question.options.map((opt) => {
            const isSelected = isMultiSelect ? multiSelected.includes(opt.id) : singleSelected === opt.id;
            const isRight = isMultiSelect ? correctOptionIds(question).includes(opt.id) : opt.id === question.correct;
            let style = "border-border-soft hover:border-primary/40";
            if (checked && isRight) style = "border-success bg-success-light";
            else if (checked && isSelected && !isRight) style = "border-danger bg-danger/10";
            else if (!checked && isSelected) style = "border-primary bg-primary-light";

            return (
              <button
                key={opt.id}
                disabled={checked}
                onClick={() => onSelect(opt.id)}
                className={`flex w-full items-center gap-3 rounded-lg border p-3.5 text-left text-base transition ${style}`}
              >
                <span
                  className={`flex h-6 w-6 flex-none items-center justify-center border text-xs font-bold ${
                    isMultiSelect ? "rounded-md" : "rounded-full"
                  } ${isSelected ? "border-primary bg-primary text-white" : "border-border-soft text-text-muted"}`}
                >
                  {isMultiSelect ? (isSelected ? "✓" : opt.id) : opt.id}
                </span>
                <span className="flex-1 whitespace-pre-line leading-relaxed text-text">{opt.text}</span>
                {checked && isRight && <CheckCircle2 size={17} className="flex-none text-success" />}
                {checked && isSelected && !isRight && <XCircle size={17} className="flex-none text-danger" />}
              </button>
            );
          })}
        </div>
      )}

      {explanationVisible && (
        <div
          className={`mt-5 rounded-lg border p-4 ${
            !checked
              ? "border-primary/30 bg-primary-light"
              : isCorrect
              ? "border-success/40 bg-success-light"
              : "border-danger/40 bg-danger/10"
          }`}
        >
          {checked && (
            <p className={`mb-1.5 flex items-center gap-1.5 text-sm font-bold ${isCorrect ? "text-success" : "text-danger"}`}>
              {isCorrect ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
              {isCorrect ? t("practice.correctAnswerExcl") : t("practice.notQuiteRight")}
            </p>
          )}
          {!checked && (
            <p className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-primary">
              <Lightbulb size={15} />
              {t("practice.explanationLabel")}
            </p>
          )}
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

      <div className="mt-6 border-t border-border-soft pt-5">
        {/* Mobile: clean 2x2 grid */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          <button
            onClick={onPrev}
            disabled={index === 0}
            className="rounded-lg border border-border-soft px-5 py-2.5 text-sm font-semibold text-text hover:border-primary disabled:opacity-30"
          >
            {t("practice.backBtn")}
          </button>
          <button
            onClick={() => setShowExplanation((v) => !v)}
            className={`flex items-center justify-center gap-1.5 rounded-lg border px-5 py-2.5 text-sm font-semibold ${
              showExplanation ? "border-primary text-primary" : "border-border-soft text-text hover:border-primary"
            }`}
          >
            <Lightbulb size={15} />
            {t("practice.explanationLabel")}
          </button>
          <button
            onClick={onSkip}
            className="rounded-lg border border-border-soft px-5 py-2.5 text-sm font-semibold text-text hover:border-primary"
          >
            {t("practice.skipBtn")}
          </button>
          {!checked ? (
            <button
              onClick={onCheck}
              disabled={!canCheck}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-40"
            >
              {t("practice.checkAnswer")}
            </button>
          ) : (
            <button
              onClick={onNext}
              disabled={index === total - 1}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-40"
            >
              {t("practice.nextBtn")}
            </button>
          )}
        </div>

        {/* Desktop: Zurück on the left, the rest clustered on the right */}
        <div className="hidden sm:flex sm:items-center sm:justify-between">
          <button
            onClick={onPrev}
            disabled={index === 0}
            className="rounded-lg border border-border-soft px-5 py-2.5 text-sm font-semibold text-text hover:border-primary disabled:opacity-30"
          >
            {t("practice.backBtn")}
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => setShowExplanation((v) => !v)}
              className={`flex items-center gap-1.5 rounded-lg border px-5 py-2.5 text-sm font-semibold ${
                showExplanation ? "border-primary text-primary" : "border-border-soft text-text hover:border-primary"
              }`}
            >
              <Lightbulb size={15} />
              Erklärung
            </button>
            <button
              onClick={onSkip}
              className="rounded-lg border border-border-soft px-5 py-2.5 text-sm font-semibold text-text hover:border-primary"
            >
              Überspringen
            </button>
            {!checked ? (
              <button
                onClick={onCheck}
                disabled={!canCheck}
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
    </div>
  );
}

/**
 * Turns a full explanation into a short, non-spoiling nudge: just the first
 * clause/sentence, so it points the learner in the right direction without
 * revealing which option is correct.
 */
function deriveHint(explanation: string, rememberPrefix: string): string {
  const firstSentence = explanation.split(/[.!?]/)[0]?.trim();
  const words = firstSentence.split(/\s+/);
  const short = words.slice(0, 14).join(" ");
  return `${rememberPrefix}: ${short}${words.length > 14 ? "…" : "."}`;
}

/**
 * Renders a question's prompt as plain text, unless it has an
 * `underlinedText` marker (for "check the underlined text" questions), in
 * which case that exact substring is rendered with a visible underline so
 * the student knows what to evaluate.
 */
function renderPrompt(question: PracticeQuestion) {
  const underline = "underlinedText" in question ? question.underlinedText : undefined;
  if (!underline) return question.prompt;

  const idx = question.prompt.indexOf(underline);
  if (idx === -1) return question.prompt;

  return (
    <>
      {question.prompt.slice(0, idx)}
      <span className="underline decoration-2 underline-offset-2">{underline}</span>
      {question.prompt.slice(idx + underline.length)}
    </>
  );
}
