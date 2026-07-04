import { CheckCircle2, Circle, FileText, LifeBuoy, Users, AppWindow, HardDrive, Server, Box } from "lucide-react";
import type { LabContent, LabResource } from "@/lib/labData";

const RESOURCE_ICONS: { match: RegExp; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { match: /tenant|b2c|directory|identit/i, icon: Users },
  { match: /web app/i, icon: AppWindow },
  { match: /storage/i, icon: HardDrive },
  { match: /app service|plan/i, icon: Server },
];

function iconFor(resource: LabResource) {
  const found = RESOURCE_ICONS.find((r) => r.match.test(resource.name));
  return found?.icon ?? Box;
}

export default function LabSidePanels({ lab }: { lab: LabContent }) {
  const doneCount = lab.checklist.filter((c) => c.done).length;
  const checklistPercent = Math.round((doneCount / lab.checklist.length) * 100);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border-soft bg-panel p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-text">Labressourcen</h2>
          <span className="text-xs text-text-faint">
            {lab.resources.length} von {lab.resources.length} aktiv
          </span>
        </div>
        <ul className="space-y-2.5">
          {lab.resources.map((r) => {
            const Icon = iconFor(r);
            return (
              <li key={r.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-text-muted">
                  <Icon size={13} className="shrink-0 text-primary" />
                  {r.name}
                </span>
                <span className="font-medium text-success">{r.status}</span>
              </li>
            );
          })}
        </ul>
        <button className="mt-4 w-full rounded-lg border border-border-soft py-2 text-xs font-semibold text-text-muted hover:text-text">
          Alle Ressourcen anzeigen
        </button>
      </div>

      <div className="rounded-2xl border border-border-soft bg-panel p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-text">Aufgaben-Checkliste</h2>
          <span className="text-xs text-text-faint">
            {doneCount} / {lab.checklist.length} abgeschlossen
          </span>
        </div>
        <div className="mb-3 h-1.5 w-full rounded-full bg-panel-alt">
          <div className="h-1.5 rounded-full bg-primary" style={{ width: `${checklistPercent}%` }} />
        </div>
        <ul className="space-y-2.5">
          {lab.checklist.map((c, i) => (
            <li key={c.id} className="flex items-center gap-2 text-xs">
              {c.done ? (
                <CheckCircle2 size={14} className="shrink-0 text-success" />
              ) : (
                <Circle size={14} className="shrink-0 text-text-faint" />
              )}
              <span className={c.done ? "text-text-muted" : "text-text"}>
                {i + 1}. {c.label}
              </span>
            </li>
          ))}
        </ul>
        <button className="mt-4 w-full rounded-lg bg-primary py-2 text-xs font-bold text-white hover:bg-primary-dark">
          Ergebnisse validieren
        </button>
      </div>

      <div className="rounded-2xl border border-border-soft bg-panel p-4">
        <h2 className="mb-3 text-sm font-bold text-text">Lab-Status</h2>
        <div className="mb-3">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-text-faint">Fortschritt</span>
            <span className="font-semibold text-text">{checklistPercent}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-panel-alt">
            <div className="h-1.5 rounded-full bg-primary" style={{ width: `${checklistPercent}%` }} />
          </div>
        </div>
        <dl className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <dt className="text-text-faint">Punkte</dt>
            <dd className="font-medium text-text">{doneCount * 20} / 100</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-text-faint">Versuche</dt>
            <dd className="font-medium text-text">1 / 3</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-text-faint">Letzter Reset</dt>
            <dd className="font-medium text-text">Heute, 10:00</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-border-soft bg-panel p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-text">
          <FileText size={15} className="text-primary" /> Dokumentation & Hilfe
        </h2>
        <ul className="space-y-2">
          {lab.docs.map((d) => (
            <li key={d} className="cursor-pointer text-xs text-text-muted hover:text-primary">
              {d}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-border-soft bg-panel p-4">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-text">
          <LifeBuoy size={15} className="text-primary" /> Support
        </h2>
        <p className="mb-3 text-xs text-text-muted">Brauchen Sie Hilfe? Unser Support-Team ist für Sie da.</p>
        <button className="w-full rounded-lg border border-border-soft py-2 text-xs font-semibold text-text hover:bg-panel-alt">
          Ticket erstellen
        </button>
      </div>
    </div>
  );
}
