"use client";

import { useState } from "react";
import { GripVertical, CheckCircle2, XCircle, X, Info, MousePointer2 } from "lucide-react";
import type { MatchingQuestion } from "@/lib/az900Practice";
import { useLocale } from "@/components/LocaleProvider";

export default function MatchingQuestionView({
  question,
  selectedMap,
  checked,
  onAssign,
  onClear,
}: {
  question: MatchingQuestion;
  selectedMap: Record<string, string>;
  checked: boolean;
  onAssign: (descriptionId: string, itemId: string) => void;
  onClear: (descriptionId: string) => void;
}) {
  const { t } = useLocale();
  const [pickedItemId, setPickedItemId] = useState<string | null>(null);

  function handleDropZoneClick(descriptionId: string) {
    if (checked) return;
    if (selectedMap[descriptionId]) {
      onClear(descriptionId);
      return;
    }
    if (pickedItemId) {
      onAssign(descriptionId, pickedItemId);
      setPickedItemId(null);
    }
  }

  return (
    <div>
      {question.instructions && <p className="mb-4 text-sm text-text-muted">{question.instructions}</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-text-faint">
            {t("practice.resources")}
            <Info size={12} />
          </p>
          <div className="space-y-2">
            {question.items.map((item) => {
              const isPicked = pickedItemId === item.id;
              return (
                <button
                  key={item.id}
                  disabled={checked}
                  onClick={() => setPickedItemId(isPicked ? null : item.id)}
                  className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition ${
                    isPicked
                      ? "border-primary bg-primary-light text-primary"
                      : "border-border-soft text-text hover:border-primary/40"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  <GripVertical size={14} className="flex-none text-text-faint" />
                  {item.label}
                </button>
              );
            })}
          </div>
          {!checked && (
            <>
              <div className="mt-3 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border-soft py-6 text-text-faint">
                <MousePointer2 size={16} />
                <span className="text-xs">{t("practice.dragResourceHere")}</span>
              </div>
              <p className="mt-2 text-[11px] text-text-faint">
                {t("practice.tapResourceHint")}
              </p>
            </>
          )}
        </div>

        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-text-faint">
            {t("practice.descriptions")}
            <Info size={12} />
          </p>
          <div className="space-y-2">
            {question.descriptions.map((d) => {
              const assignedId = selectedMap[d.id];
              const assignedItem = question.items.find((i) => i.id === assignedId);
              const isRight = checked && assignedId === d.correctItemId;
              const isWrong = checked && assignedId && assignedId !== d.correctItemId;
              const correctItem = question.items.find((i) => i.id === d.correctItemId);

              return (
                <div key={d.id} className="rounded-lg border border-border-soft p-3">
                  <p className="mb-2 text-xs text-text-muted">{d.text}</p>
                  <button
                    onClick={() => handleDropZoneClick(d.id)}
                    disabled={checked}
                    className={`flex w-full items-center justify-between rounded-md border border-dashed px-3 py-2 text-xs font-semibold transition ${
                      isRight
                        ? "border-success bg-success-light text-success"
                        : isWrong
                          ? "border-danger bg-danger/10 text-danger"
                          : assignedItem
                            ? "border-primary bg-primary-light text-primary"
                            : "border-border-soft text-text-faint hover:border-primary/40"
                    }`}
                  >
                    <span>{assignedItem ? assignedItem.label : t("practice.dropHere")}</span>
                    <span className="flex items-center gap-1">
                      {isRight && <CheckCircle2 size={13} />}
                      {isWrong && <XCircle size={13} />}
                      {!checked && assignedItem && (
                        <X
                          size={13}
                          onClick={(e) => {
                            e.stopPropagation();
                            onClear(d.id);
                          }}
                        />
                      )}
                    </span>
                  </button>
                  {isWrong && correctItem && (
                    <p className="mt-1.5 text-[11px] text-success">{t("practice.correctWouldBe")}: {correctItem.label}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
