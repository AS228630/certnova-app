"use client";

import { useState } from "react";
import { Info, FileText, Link2 } from "lucide-react";
import type { CertJourney } from "@/lib/certJourney";
import PhaseCard from "./PhaseCard";

export function ProgressInfoPopover({ journey }: { journey: CertJourney }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Wie wird der Gesamtfortschritt berechnet?"
        className="text-text-faint hover:text-text"
      >
        <Info size={16} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-border-soft bg-panel p-4 shadow-xl sm:w-80">
            <p className="mb-3 text-sm font-bold text-text">Wie wird der Gesamtfortschritt berechnet?</p>
            <p className="mb-3 text-xs text-text-muted">
              Der Gesamtfortschritt basiert auf einem gewichteten Durchschnitt der drei Phasen.
            </p>
            <ul className="space-y-2 text-xs">
              {journey.phases.map((p) => (
                <li key={p.key} className="flex items-center justify-between text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                      {p.step}
                    </span>
                    {p.title} ({p.weight}%)
                  </span>
                  <span className="font-medium text-text">
                    {p.percent}% x {p.weight}% = {((p.percent * p.weight) / 100).toFixed(1)}%
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between border-t border-border-soft pt-3 text-xs font-bold text-text">
              <span>Gesamtfortschritt</span>
              <span>{journey.overallPercent}%</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function CertDetailTabs({ journey }: { journey: CertJourney }) {
  const [tab, setTab] = useState<"lernpfad" | "uebersicht" | "ressourcen">("lernpfad");

  const tabs: { key: typeof tab; label: string }[] = [
    { key: "lernpfad", label: "Lernpfad" },
    { key: "uebersicht", label: "Übersicht" },
    { key: "ressourcen", label: "Ressourcen" },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center gap-6 border-b border-border-soft">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`border-b-2 pb-3 text-sm font-semibold transition-colors ${
              tab === t.key
                ? "border-primary text-primary"
                : "border-transparent text-text-faint hover:text-text"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "lernpfad" && (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {journey.phases.map((phase, i) => (
            <div key={phase.key} className="flex flex-1 items-start gap-6">
              <div className="flex-1">
                <PhaseCard phase={phase} />
              </div>
              {i < journey.phases.length - 1 && (
                <span className="mt-24 hidden shrink-0 text-text-faint lg:block">→</span>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "uebersicht" && (
        <div className="rounded-2xl border border-border-soft bg-panel p-6 text-sm text-text-muted">
          <FileText size={18} className="mb-2 text-primary" />
          Eine ausführliche Übersicht zu Prüfungsformat, Voraussetzungen und Lernzielen folgt in Kürze.
        </div>
      )}

      {tab === "ressourcen" && (
        <div className="rounded-2xl border border-border-soft bg-panel p-6 text-sm text-text-muted">
          <Link2 size={18} className="mb-2 text-primary" />
          Zusätzliche Ressourcen und Dokumentationslinks folgen in Kürze.
        </div>
      )}
    </div>
  );
}
