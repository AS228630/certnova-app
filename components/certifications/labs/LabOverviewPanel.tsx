"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Lab } from "@/lib/labsData";
import { VocabularyText } from "@/components/VocabularyTerm";
import { useLocale } from "@/components/LocaleProvider";

export default function LabOverviewPanel({ lab }: { lab: Lab }) {
  const { t } = useLocale();
  const [tab, setTab] = useState<"uebersicht" | "anleitungen">("uebersicht");

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5">
      <div className="mb-4 flex gap-5 border-b border-border-soft">
        {(["uebersicht", "anleitungen"] as const).map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`relative pb-3 text-sm font-semibold ${
              tab === key ? "text-primary" : "text-text-muted hover:text-text"
            }`}
          >
            {key === "uebersicht" ? t("labs.labOverviewTab") : t("labs.instructionsTab")}
            {tab === key && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
          </button>
        ))}
      </div>

      {tab === "uebersicht" ? (
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-bold text-text">{t("labs.labGoal")}</p>
            <p className="mb-3 text-sm text-text-muted">{lab.goal}</p>
            <ul className="space-y-1.5">
              {lab.goalChecklist.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-text-muted">
                  <CheckCircle2 size={14} className="flex-none text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-sm font-bold text-text">{t("labs.labDetails")}</p>
            <dl className="space-y-1.5 text-sm">
              {lab.details.map((d) => (
                <div key={d.label} className="flex items-center justify-between">
                  <dt className="text-text-faint">{d.label}</dt>
                  <dd className="font-medium text-text">{d.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-3 text-sm font-bold text-text">{t("labs.labInstructions")}</p>
          <ol className="space-y-3">
            {lab.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-text-muted">
                <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                  {i + 1}
                </span>
                <VocabularyText text={step} />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
