"use client";

import { CheckCircle2, Circle, ExternalLink, LifeBuoy, BookOpen } from "lucide-react";
import type { Lab, LabTask } from "@/lib/labsData";

export default function LabSidebar({
  lab,
  tasks,
  onToggleTask,
  readOnly = false,
}: {
  lab: Lab;
  tasks: LabTask[];
  onToggleTask: (id: string) => void;
  readOnly?: boolean;
}) {
  const done = tasks.filter((t) => t.done).length;
  const progress = tasks.length === 0 ? 0 : Math.round((done / tasks.length) * 100);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border-soft bg-panel p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold text-text">Labressourcen</p>
          <span className="text-xs text-text-faint">
            {lab.resources.filter((r) => r.active).length} von {lab.resources.length} aktiv
          </span>
        </div>
        <ul className="space-y-2">
          {lab.resources.map((r) => (
            <li key={r.id} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-text-muted">
                <span className={`h-1.5 w-1.5 rounded-full ${r.active ? "bg-success" : "bg-text-faint"}`} />
                {r.label}
              </span>
              <span className={r.active ? "text-xs font-semibold text-success" : "text-xs text-text-faint"}>
                {r.active ? "Aktiv" : "Inaktiv"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-border-soft bg-panel p-5">
        <p className="mb-3 text-sm font-bold text-text">Aufgaben-Checkliste</p>
        <div className="mb-3 h-2 w-full rounded-full bg-panel-alt">
          <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="mb-3 text-xs text-text-faint">
          {done} / {tasks.length} abgeschlossen
        </p>
        <ul className="space-y-2">
          {tasks.map((t, i) => (
            <li key={t.id}>
              <button
                onClick={() => !readOnly && onToggleTask(t.id)}
                disabled={readOnly}
                className={`flex w-full items-center gap-2 text-left text-sm text-text-muted ${
                  readOnly ? "cursor-default" : "hover:text-text"
                }`}
              >
                {t.done ? (
                  <CheckCircle2 size={16} className="flex-none text-success" />
                ) : (
                  <Circle size={16} className="flex-none text-text-faint" />
                )}
                <span className={t.done ? "line-through opacity-70" : ""}>
                  {i + 1}. {t.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
        {readOnly ? (
          <p className="mt-4 text-center text-xs text-text-faint">
            ✓ Wird automatisch anhand deiner Aktionen überprüft
          </p>
        ) : (
          <button className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-bold text-white hover:bg-primary-dark">
            Ergebnisse validieren
          </button>
        )}
      </div>

      {lab.docs.length > 0 && (
        <div className="rounded-2xl border border-border-soft bg-panel p-5">
          <p className="mb-3 flex items-center gap-1.5 text-sm font-bold text-text">
            <BookOpen size={14} />
            Dokumentation &amp; Hilfe
          </p>
          <ul className="space-y-2">
            {lab.docs.map((d) => (
              <li key={d.url}>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm text-text-muted hover:text-primary"
                >
                  <ExternalLink size={12} className="flex-none" />
                  {d.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-2xl border border-border-soft bg-panel p-5">
        <p className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-text">
          <LifeBuoy size={14} />
          Support
        </p>
        <p className="mb-3 text-xs text-text-muted">Brauchen Sie Hilfe? Unser Support-Team ist für Sie da.</p>
        <button className="w-full rounded-lg border border-border-soft py-2 text-xs font-semibold text-text hover:border-primary hover:text-primary">
          Ticket erstellen
        </button>
      </div>
    </div>
  );
}
