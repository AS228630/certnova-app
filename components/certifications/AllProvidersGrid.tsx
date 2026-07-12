"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Company } from "@/lib/companiesData";
import ProviderCardDetailed from "./ProviderCardDetailed";
import { useLocale } from "@/components/LocaleProvider";

const CATEGORY_KEYS = ["catAll", "catCloud", "catSecurity", "catNetwork", "catSoftware"];
const LEVEL_KEYS = ["levelAll", "levelBeginner", "levelIntermediate", "levelAdvanced"];
const PAGE_SIZE = 12;

export default function AllProvidersGrid({
  companies,
  query,
  onQueryChange,
}: {
  companies: Company[];
  query: string;
  onQueryChange: (value: string) => void;
}) {
  const { t } = useLocale();
  const [category, setCategory] = useState(CATEGORY_KEYS[0]);
  const [level, setLevel] = useState(LEVEL_KEYS[0]);
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
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t("certList.searchProviderOrCert")}
            className="w-full rounded-lg border border-border-soft bg-panel py-2.5 pl-9 pr-3 text-sm text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-border-soft bg-panel px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none sm:w-44"
        >
          {CATEGORY_KEYS.map((c) => (
            <option key={c} value={c}>{t(`certList.${c}`)}</option>
          ))}
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="rounded-lg border border-border-soft bg-panel px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none sm:w-40"
        >
          {LEVEL_KEYS.map((l) => (
            <option key={l} value={l}>{t(`certList.${l}`)}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "beliebt" | "az")}
          className="rounded-lg border border-border-soft bg-panel px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none sm:w-44"
        >
          <option value="beliebt">{t("certList.sortPopular")}</option>
          <option value="az">{t("certList.sortAZ")}</option>
        </select>
      </div>

      <h2 className="mb-4 font-bold text-text">{t("certList.allProviders")}</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.slice(0, visible).map((c) => (
          <ProviderCardDetailed key={c.slug} company={c} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 text-sm text-text-muted">{t("certList.noProviderFound")} „{query}“.</p>
      )}

      {visible < filtered.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-lg border border-border-soft px-6 py-2.5 text-sm font-semibold text-text hover:border-primary hover:text-primary"
          >
            {t("certList.showMore")}
          </button>
        </div>
      )}
    </div>
  );
}
