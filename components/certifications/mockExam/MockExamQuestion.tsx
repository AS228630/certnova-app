"use client";

import { Flag } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import type { PracticeQuestion, PracticeOptionId } from "@/lib/az900Practice";
import { isMultiSelectQuestion, correctOptionIds } from "@/lib/az900Practice";

type YesNoAnswers = Record<number, "Ja" | "Nein">;
type MatchingAnswers = Record<string, string>;
export type MockAnswer = PracticeOptionId | PracticeOptionId[] | YesNoAnswers | MatchingAnswers;

export default function MockExamQuestion({
  question,
  index,
  total,
  answer,
  marked,
  onSelectSingle,
  onSelectYesNo,
  onSelectMatch,
  onToggleMark,
}: {
  question: PracticeQuestion;
  index: number;
  total: number;
  answer: MockAnswer | undefined;
  marked: boolean;
  onSelectSingle: (id: PracticeOptionId) => void;
  onSelectYesNo: (statementIndex: number, value: "Ja" | "Nein") => void;
  onSelectMatch: (descriptionId: string, itemId: string) => void;
  onToggleMark: () => void;
}) {
  const { t } = useLocale();

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-text-faint">
          {t("mockExam.questionCounter").replace("{current}", String(index + 1)).replace("{total}", String(total))}
        </span>
        <button
          onClick={onToggleMark}
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
            marked ? "bg-amber-500/15 text-amber-500" : "text-text-faint hover:bg-panel-alt"
          }`}
        >
          <Flag size={12} className={marked ? "fill-amber-500" : ""} />
          {t("mockExam.markForReview")}
        </button>
      </div>

      <p className="mb-5 text-sm font-medium leading-relaxed text-text sm:text-base">{question.prompt}</p>

      {question.type === "yesno" ? (
        <div className="space-y-3">
          {question.statements.map((statement, i) => {
            const selected = (answer as YesNoAnswers | undefined)?.[i];
            return (
              <div key={i} className="rounded-xl border border-border-soft bg-panel-alt p-3">
                <p className="mb-2 text-xs text-text">{statement.text}</p>
                <div className="flex gap-2">
                  {(["Ja", "Nein"] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => onSelectYesNo(i, opt)}
                      className={`flex-1 rounded-lg border py-1.5 text-xs font-semibold transition-colors ${
                        selected === opt
                          ? "border-amber-500 bg-amber-500/10 text-amber-500"
                          : "border-border-soft text-text-muted hover:bg-panel"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : question.type === "matching" ? (
        <div className="space-y-3">
          {question.instructions && <p className="text-xs text-text-faint">{question.instructions}</p>}
          {question.descriptions.map((desc) => {
            const selected = (answer as MatchingAnswers | undefined)?.[desc.id];
            return (
              <div key={desc.id} className="rounded-xl border border-border-soft bg-panel-alt p-3">
                <p className="mb-2 text-xs text-text">{desc.text}</p>
                <select
                  value={selected ?? ""}
                  onChange={(e) => onSelectMatch(desc.id, e.target.value)}
                  className="w-full rounded-lg border border-border-soft bg-panel px-2.5 py-1.5 text-xs text-text"
                >
                  <option value="" disabled>
                    {t("mockExam.selectPlaceholder")}
                  </option>
                  {question.items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2.5">
          {isMultiSelectQuestion(question) && (
            <p className="mb-1 text-xs font-semibold text-amber-500">
              {t("mockExam.selectMultipleHint").replace("{count}", String(correctOptionIds(question).length))}
            </p>
          )}
          {question.options.map((opt) => {
            const multi = isMultiSelectQuestion(question);
            const selected = multi
              ? Array.isArray(answer) && answer.includes(opt.id)
              : answer === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onSelectSingle(opt.id)}
                className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left text-xs transition-colors sm:text-sm ${
                  selected
                    ? "border-amber-500 bg-amber-500/10 text-text"
                    : "border-border-soft text-text-muted hover:bg-panel-alt"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border text-[10px] font-bold ${
                    multi ? "rounded-md" : "rounded-full"
                  } ${selected ? "border-amber-500 bg-amber-500 text-white" : "border-border-soft text-text-faint"}`}
                >
                  {multi ? (selected ? "✓" : opt.id) : opt.id}
                </span>
                {opt.text}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
