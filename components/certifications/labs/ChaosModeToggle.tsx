"use client";

import { useState } from "react";
import { Skull } from "lucide-react";
import { useLabStore } from "@/lib/store/labStore";

export default function ChaosModeToggle() {
  const chaosActive = useLabStore((s) => s.chaosActive);
  const resourceGroups = useLabStore((s) => s.resourceGroups);
  const activateChaos = useLabStore((s) => s.activateChaos);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const disabled = chaosActive || resourceGroups.length > 0;

  if (chaosActive) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-xs font-semibold text-danger">
        <Skull size={14} />
        Chaos Mode aktiv — finde und behebe den Fehler
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {confirmOpen ? (
        <>
          <span className="text-xs text-text-muted">Sicher? Das simuliert einen echten Fehler.</span>
          <button
            onClick={() => {
              activateChaos();
              setConfirmOpen(false);
            }}
            className="rounded-lg bg-danger px-3 py-1.5 text-xs font-bold text-white hover:opacity-90"
          >
            Ja, Chaos starten
          </button>
          <button
            onClick={() => setConfirmOpen(false)}
            className="rounded-lg border border-border-soft px-3 py-1.5 text-xs text-text-muted"
          >
            Abbrechen
          </button>
        </>
      ) : (
        <button
          onClick={() => setConfirmOpen(true)}
          disabled={disabled}
          className="flex items-center gap-1.5 rounded-lg border border-danger/40 px-3 py-1.5 text-xs font-semibold text-danger disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Skull size={14} />
          Chaos Mode: Troubleshooting-Herausforderung
        </button>
      )}
    </div>
  );
}
