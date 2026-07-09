"use client";

import { useMemo, useState } from "react";
import type { Company, CertLevel } from "@/lib/companiesData";
import CategoryPills from "./CategoryPills";
import CertFilterBar from "./CertFilterBar";
import SortHeader, { type SortKey } from "./SortHeader";
import CertCard from "./CertCard";
import Pagination from "./Pagination";
import { useLocale } from "@/components/LocaleProvider";

const PAGE_SIZE = 9;

export default function CertExplorer({ company }: { company: Company }) {
  const { t } = useLocale();
  const [activeCategory, setActiveCategory] = useState(company.categories[0]?.key ?? "");
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<CertLevel | "Alle">("Alle");
  const [sort, setSort] = useState<SortKey>("beliebt");
  const [page, setPage] = useState(1);

  const activeLabel = company.categories.find((c) => c.key === activeCategory)?.label ?? "Alle";

  const filtered = useMemo(() => {
    let result = company.certs.filter((c) => c.categoryKey === activeCategory);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (c) => c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
      );
    }
    if (levelFilter !== "Alle") {
      result = result.filter((c) => c.level === levelFilter);
    }
    if (sort === "az") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "fortschritt") {
      result = [...result].sort((a, b) => b.progress - a.progress);
    }
    return result;
  }, [company.certs, activeCategory, query, levelFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const shown = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleCategoryChange(key: string) {
    setActiveCategory(key);
    setPage(1);
  }

  return (
    <div>
      <CategoryPills
        categories={company.categories}
        certs={company.certs}
        active={activeCategory}
        onChange={handleCategoryChange}
      />

      <CertFilterBar
        query={query}
        onQueryChange={(v) => {
          setQuery(v);
          setPage(1);
        }}
        categories={company.categories}
        categoryFilter={activeCategory}
        onCategoryChange={handleCategoryChange}
        levelFilter={levelFilter}
        onLevelChange={(v) => {
          setLevelFilter(v);
          setPage(1);
        }}
      />

      <SortHeader
        count={filtered.length}
        categoryLabel={activeLabel}
        sort={sort}
        onSortChange={setSort}
      />

      {shown.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((cert) => (
            <CertCard key={cert.id} cert={cert} companySlug={company.slug} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-border-soft bg-panel p-6 text-center text-sm text-text-muted">
          {t("certList.noCertsFound")}
        </p>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
