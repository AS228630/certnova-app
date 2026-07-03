"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Company } from "@/lib/companiesData";
import ProviderCardDetailed from "./ProviderCardDetailed";

const CATEGORIES = ["Alle Kategorien", "Cloud", "Security", "Netzwerk", "Software"];
const LEVELS = ["Alle Niveaus", "Beginner", "Intermediate", "Advanced"];
const PAGE_SIZE = 12;

export default function AllProvidersGrid({ companies }: { companies: Company[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [level, setLevel] = useState(LEVELS[0]);
  const [sort, setSort] = useState<"beliebt" | "az">("beliebt");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let list = companies.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
    if (sort === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [companies, query, sort]);

  return (
    <div id="alle-anbieter" className="mt-10">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nach Anbieter oder Zertifikat suchen..."
            className="w-full rounded-lg border border-border-soft bg-panel py-2.5 pl-9 pr-3 text-sm text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-border-soft bg-panel px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none sm:w-44"
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="rounded-lg border border-border-soft bg-panel px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none sm:w-40"
        >
          {LEVELS.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "beliebt" | "az")}
          className="rounded-lg border border-border-soft bg-panel px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none sm:w-44"
        >
          <option value="beliebt">Sortieren: Beliebt</option>
          <option value="az">Sortieren: A-Z</option>
        </select>
      </div>

      <h2 className="mb-4 font-bold text-text">Alle Zertifizierungsanbieter</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.slice(0, visible).map((c) => (
          <ProviderCardDetailed key={c.slug} company={c} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 text-sm text-text-muted">Kein Anbieter gefunden für „{query}“.</p>
      )}

      {visible < filtered.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-lg border border-border-soft px-6 py-2.5 text-sm font-semibold text-text hover:border-primary hover:text-primary"
          >
            Mehr anzeigen
          </button>
        </div>
      )}
    </div>
  );
}
