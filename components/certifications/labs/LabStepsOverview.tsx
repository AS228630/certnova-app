"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, CheckCircle2, Lock, Clock, Target, ListChecks, Info } from "lucide-react";
import { Cloud24Filled } from "@fluentui/react-icons";
import type { LabStep } from "@/lib/labsData";
import { useLocale } from "@/components/LocaleProvider";

function TaskDetail({ step, onBack, onOpen }: { step: LabStep; onBack: () => void; onOpen: () => void }) {
  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-6">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1 text-xs text-text-faint hover:text-text"
      >
        <ChevronLeft size={14} />
        Zurück zur Übersicht
      </button>

      <h2 className="text-xl font-bold text-text">{step.title}</h2>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-text-faint">
        <Clock size={13} />
        {step.durationLabel}
      </p>

      {step.description && <p className="mt-4 text-sm leading-relaxed text-text-muted">{step.description}</p>}

      {step.goal && (
        <div className="mt-5 rounded-xl border border-border-soft bg-panel-alt p-4">
          <p className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-text">
            <Target size={14} className="text-primary" />
            Ziel dieser Aufgabe
          </p>
          <p className="text-sm text-text-muted">{step.goal}</p>
        </div>
      )}

      {step.prerequisites && step.prerequisites.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-text">
            <ListChecks size={14} className="text-primary" />
            Voraussetzungen
          </p>
          <ul className="space-y-1.5">
            {step.prerequisites.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-text-muted">
                <CheckCircle2 size={14} className="mt-0.5 flex-none text-success" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      {step.notes && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/10 p-3 text-sm text-text-muted">
          <Info size={14} className="mt-0.5 flex-none text-warning" />
          {step.notes}
        </div>
      )}

      <button
        onClick={onOpen}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-bold text-white hover:bg-primary-dark"
      >
        <Cloud24Filled fontSize={18} />
        Microsoft Azure öffnen
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default function LabStepsOverview({
  steps,
  onOpen,
}: {
  steps: LabStep[];
  onOpen: () => void;
}) {
  const { t } = useLocale();
  const [selected, setSelected] = useState<LabStep | null>(null);

  if (selected) {
    return <TaskDetail step={selected} onBack={() => setSelected(null)} onOpen={onOpen} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-border-soft bg-gradient-to-br from-primary/10 to-panel p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/15">
            <Cloud24Filled fontSize={30} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-text">Microsoft Azure öffnen</h2>
            <p className="text-sm text-text-muted">
              Öffnen Sie Microsoft Azure mit nur einem Klick, um mit diesem Lab zu beginnen.
            </p>
          </div>
        </div>
        <button
          onClick={onOpen}
          className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary-dark"
        >
          Azure öffnen
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="rounded-2xl border border-border-soft bg-panel p-5">
        <h3 className="mb-1 font-bold text-text">Lab-Übersicht</h3>
        <p className="mb-4 text-sm text-text-muted">Wählen Sie eine Aufgabe aus, um die Details zu sehen.</p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {steps.map((step, i) => (
            <button
              key={step.id}
              onClick={() => step.status === "ready" && setSelected(step)}
              disabled={step.status === "locked"}
              className={`flex items-center gap-3 rounded-xl border border-border-soft px-4 py-3 text-left transition-colors ${
                step.status === "locked" ? "cursor-not-allowed opacity-60" : "hover:border-primary/40 hover:bg-panel-alt"
              }`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-text">{step.title}</span>
                <span className="text-xs text-text-faint">{step.durationLabel}</span>
              </span>
              <span
                className={`flex shrink-0 items-center gap-1 text-xs font-semibold ${
                  step.status === "ready" ? "text-success" : "text-text-faint"
                }`}
              >
                {step.status === "ready" ? <CheckCircle2 size={14} /> : <Lock size={14} />}
                {step.status === "ready" ? t("labs.readyStatus") : t("labs.lockedStatus")}
              </span>
              <ChevronRight size={16} className="shrink-0 text-text-faint" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
