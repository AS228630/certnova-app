"use client";

import { useState } from "react";
import type { Certification, CertCategory } from "@/lib/companiesData";
import CertRow from "./CertRow";

export default function CategoryTabs({
  certs,
  companySlug,
}: {
  certs: Certification[];
  companySlug: string;
}) {
  const categories: CertCategory[] = ["Fundamentals", "Associate", "Expert", "Specialty"];
  const counts = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = certs.filter((c) => c.category === cat).length;
    return acc;
  }, {});

  const [active, setActive] = useState<"Alle" | CertCategory>("Alle");
  const [visible, setVisible] = useState(4);

  const filtered = active === "Alle" ? certs : certs.filter((c) => c.category === active);
  const shown = filtered.slice(0, visible);

  const tabs: { key: "Alle" | CertCategory; label: string; count: number }[] = [
    { key: "Alle", label: "Alle", count: certs.length },
    ...categories.filter((c) => counts[c] > 0).map((c) => ({ key: c, label: c, count: counts[c] })),
  ];

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActive(tab.key);
              setVisible(4);
            }}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              active === tab.key
                ? "bg-primary text-white"
                : "border border-border-soft bg-panel text-text-muted hover:bg-panel-alt"
            }`}
          >
            {tab.label} <span className="opacity-70">{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {shown.map((cert) => (
          <CertRow key={cert.id} cert={cert} companySlug={companySlug} />
        ))}
        {shown.length === 0 && (
          <p className="text-sm text-text-muted">Keine Zertifizierungen in dieser Kategorie.</p>
        )}
      </div>

      {visible < filtered.length && (
        <button
          onClick={() => setVisible((v) => v + 4)}
          className="mt-4 text-sm font-semibold text-primary hover:underline"
        >
          Mehr anzeigen ↓
        </button>
      )}
    </div>
  );
}
