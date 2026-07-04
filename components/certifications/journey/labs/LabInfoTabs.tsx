"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { LabContent } from "@/lib/labData";

export default function LabInfoTabs({ lab }: { lab: LabContent }) {
  const [tab, setTab] = useState<"uebersicht" | "anleitungen">("uebersicht");

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-4">
      <div className="mb-4 flex items-center gap-5 border-b border-border-soft">
        <button
          onClick={() => setTab("uebersicht")}
          className={`border-b-2 pb-2.5 text-sm font-semibold ${
            tab === "uebersicht" ? "border-primary text-primary" : "border-transparent text-text-faint"
          }`}
        >
          Übersicht
        </button>
        <button
          onClick={() => setTab("anleitungen")}
          className={`border-b-2 pb-2.5 text-sm font-semibold ${
            tab === "anleitungen" ? "border-primary text-primary" : "border-transparent text-text-faint"
          }`}
        >
          Anleitungen
        </button>
      </div>

      {tab === "uebersicht" ? (
        <div>
          <p className="mb-2 text-sm font-bold text-text">Ziel des Labs</p>
          <p className="mb-4 text-xs text-text-muted">{lab.goal}</p>
          <ul className="space-y-2">
            {lab.objectives.map((o) => (
              <li key={o} className="flex items-center gap-2 text-xs text-text-muted">
                <CheckCircle2 size={13} className="shrink-0 text-success" />
                {o}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <p className="mb-2 text-sm font-bold text-text">Lab-Anweisungen</p>
          <ol className="mb-5 space-y-2">
            {lab.instructions.map((step, i) => (
              <li key={i} className="flex gap-2 text-xs text-text-muted">
                <span className="shrink-0 font-semibold text-text">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mb-2 text-sm font-bold text-text">Lab-Details</p>
          <dl className="space-y-1.5">
            {lab.details.map((d) => (
              <div key={d.label} className="flex items-center justify-between text-xs">
                <dt className="text-text-faint">{d.label}</dt>
                <dd className="font-medium text-text">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
