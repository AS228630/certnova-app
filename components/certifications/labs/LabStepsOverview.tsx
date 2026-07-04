"use client";

import { ChevronRight, CheckCircle2, Lock } from "lucide-react";
import { Cloud24Filled } from "@fluentui/react-icons";
import type { LabStep } from "@/lib/labsData";

export default function LabStepsOverview({
  steps,
  onOpen,
}: {
  steps: LabStep[];
  onOpen: () => void;
}) {
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
        <p className="mb-4 text-sm text-text-muted">Wählen Sie ein Lab aus, um mit der praktischen Übung zu beginnen.</p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {steps.map((step, i) => (
            <button
              key={step.id}
              onClick={onOpen}
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
                {step.status === "ready" ? "Bereit" : "Gesperrt"}
              </span>
              <ChevronRight size={16} className="shrink-0 text-text-faint" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
