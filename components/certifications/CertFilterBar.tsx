import { Search } from "lucide-react";
import type { CertCategoryDef, CertLevel } from "@/lib/companiesData";

export default function CertFilterBar({
  query,
  onQueryChange,
  categories,
  categoryFilter,
  onCategoryChange,
  levelFilter,
  onLevelChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  categories: CertCategoryDef[];
  categoryFilter: string;
  onCategoryChange: (v: string) => void;
  levelFilter: CertLevel | "Alle";
  onLevelChange: (v: CertLevel | "Alle") => void;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Zertifizierung suchen..."
          className="w-full rounded-lg border border-border-soft bg-panel py-2.5 pl-9 pr-3 text-sm text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
        />
      </div>

      <select
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-lg border border-border-soft bg-panel px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none sm:w-48"
      >
        <option value="Alle">Alle Kategorien</option>
        {categories.map((c) => (
          <option key={c.key} value={c.key}>
            {c.label}
          </option>
        ))}
      </select>

      <select
        value={levelFilter}
        onChange={(e) => onLevelChange(e.target.value as CertLevel | "Alle")}
        className="rounded-lg border border-border-soft bg-panel px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none sm:w-44"
      >
        <option value="Alle">Alle Niveaus</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
    </div>
  );
}
