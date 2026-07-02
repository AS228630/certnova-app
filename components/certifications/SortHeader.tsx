export type SortKey = "beliebt" | "az" | "fortschritt";

export default function SortHeader({
  count,
  categoryLabel,
  sort,
  onSortChange,
}: {
  count: number;
  categoryLabel: string;
  sort: SortKey;
  onSortChange: (v: SortKey) => void;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-sm font-bold text-text">
        {count} Zertifizierungen in {categoryLabel}
      </h2>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortKey)}
        className="rounded-lg border border-border-soft bg-panel px-2.5 py-1.5 text-xs text-text focus:border-primary focus:outline-none"
      >
        <option value="beliebt">Sortieren: Beliebt</option>
        <option value="az">Sortieren: A-Z</option>
        <option value="fortschritt">Sortieren: Fortschritt</option>
      </select>
    </div>
  );
}
