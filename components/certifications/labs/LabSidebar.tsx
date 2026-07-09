"use client";

import { CheckCircle2, Circle } from "lucide-react";
import type { Lab, LabTask } from "@/lib/labsData";
import { useLocale } from "@/components/LocaleProvider";

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
  const { t } = useLocale();
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
                {r.active ? t("labs.activeStatus") : t("labs.inactiveStatus")}
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

      <div className="rounded-2xl border border-border-soft bg-panel p-5">
        <p className="mb-3 text-sm font-bold text-text">Lab-Status</p>
        <div className="mb-3">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-text-faint">Fortschritt</span>
            <span className="font-semibold text-text">{progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-panel-alt">
            <div className="h-1.5 rounded-full bg-primary" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-text-faint">Punkte</span>
            <span className="font-semibold text-text">{progress} / 100</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-faint">Versuche</span>
            <span className="font-semibold text-text">1 / 3</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-faint">Letzter Reset</span>
            <span className="font-semibold text-text">Noch nicht</span>
          </div>
        </div>
      </div>

    </div>
  );
}
