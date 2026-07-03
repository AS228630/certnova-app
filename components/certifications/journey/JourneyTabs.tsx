"use client";

import { useState, type ReactNode } from "react";

const TABS = ["Lernpfad", "Übersicht", "Ressourcen"] as const;

export default function JourneyTabs({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<(typeof TABS)[number]>("Lernpfad");

  return (
    <div className="mt-6">
      <div className="mb-6 flex gap-6 border-b border-border-soft">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`relative pb-3 text-sm font-semibold transition-colors ${
              active === tab ? "text-primary" : "text-text-muted hover:text-text"
            }`}
          >
            {tab}
            {active === tab && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
          </button>
        ))}
      </div>

      {active === "Lernpfad" && children}
      {active === "Übersicht" && (
        <p className="text-sm text-text-muted">Eine allgemeine Übersicht zu dieser Zertifizierung folgt in Kürze.</p>
      )}
      {active === "Ressourcen" && (
        <p className="text-sm text-text-muted">Zusätzliche Lernressourcen und Materialien folgen in Kürze.</p>
      )}
    </div>
  );
}
