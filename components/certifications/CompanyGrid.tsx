"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { Company } from "@/lib/companiesData";
import CompanyCard from "./CompanyCard";

export default function CompanyGrid({ companies }: { companies: Company[] }) {
  const [query, setQuery] = useState("");
  const filtered = companies.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-text">Alle Unternehmen</h2>
          <p className="text-sm text-text-muted">Wähle ein Unternehmen, um seine Zertifizierungen zu erkunden.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Unternehmen suchen..."
            className="w-full rounded-lg border border-border-soft bg-panel py-2 pl-9 pr-3 text-sm text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((company) => (
          <CompanyCard key={company.slug} company={company} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 text-sm text-text-muted">Kein Unternehmen gefunden für „{query}“.</p>
      )}

      <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl border border-primary/30 bg-primary-light p-5 sm:flex-row sm:items-center">
        <div>
          <p className="font-bold text-text">Nicht sicher, wo du anfangen sollst?</p>
          <p className="text-sm text-text-muted">Mach unseren Schnell-Check und erhalte persönliche Empfehlungen.</p>
        </div>
        <button className="shrink-0 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark">
          Meinen Weg finden ↗
        </button>
      </div>
    </div>
  );
}
