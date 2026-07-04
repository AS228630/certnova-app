"use client";

import { Trophy, Clock, Target, X } from "lucide-react";

function formatDuration(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}m ${sec}s`;
}

export default function LabScorecardModal({
  elapsedMs,
  mistakeCount,
  onDismiss,
  onRestart,
}: {
  elapsedMs: number;
  mistakeCount: number;
  onDismiss: () => void;
  onRestart: () => void;
}) {
  const accuracy = Math.max(0, 100 - mistakeCount * 10);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-border-soft bg-panel p-6 text-center">
        <button
          onClick={onDismiss}
          className="ml-auto mb-2 block text-text-faint hover:text-text"
          aria-label="Schließen"
        >
          <X size={18} />
        </button>

        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
          <Trophy size={28} className="text-primary" />
        </div>
        <h2 className="text-lg font-extrabold text-text">Lab abgeschlossen! 🎉</h2>
        <p className="mt-1 text-sm text-text-muted">
          Du hast alle Ressourcen erfolgreich und korrekt erstellt.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border-soft p-3">
            <Clock size={16} className="mx-auto mb-1 text-text-faint" />
            <p className="text-sm font-bold text-text">{formatDuration(elapsedMs)}</p>
            <p className="text-[11px] text-text-faint">Zeit investiert</p>
          </div>
          <div className="rounded-xl border border-border-soft p-3">
            <Target size={16} className="mx-auto mb-1 text-text-faint" />
            <p className="text-sm font-bold text-text">{accuracy}%</p>
            <p className="text-[11px] text-text-faint">Genauigkeit ({mistakeCount} Fehler)</p>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            onClick={onRestart}
            className="flex-1 rounded-lg border border-border-soft py-2 text-sm font-semibold text-text-muted hover:text-text"
          >
            Erneut üben
          </button>
          <button
            onClick={onDismiss}
            className="flex-1 rounded-lg bg-primary py-2 text-sm font-bold text-white hover:bg-primary-dark"
          >
            Weiter
          </button>
        </div>
      </div>
    </div>
  );
}
