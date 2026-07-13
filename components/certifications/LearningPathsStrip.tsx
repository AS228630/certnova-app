"use client";

import type { LearningPath } from "@/lib/companiesData";
import { useLocale } from "@/components/LocaleProvider";

// This strip intentionally does NOT render `path.progress` from the
// catalog data model. That field is a fixed number baked into the
// catalog (companiesData.ts) — the same for every visitor — not a real
// per-user progress value, so showing it as "X% completed" would
// mislead any signed-in user into thinking it reflects their own work.
// Real per-cert progress lives in certProgressStore and is shown
// elsewhere (dashboard, cert detail pages); here we only show catalog
// facts (level range, cert count) that are genuinely true for everyone.
export default function LearningPathsStrip({ paths }: { paths: LearningPath[] }) {
  const { t } = useLocale();
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-text">{t("certList.popularPathsShort")}</h2>
        <button className="text-sm font-semibold text-primary hover:underline">{t("certList.viewAllShort")}</button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {paths.map((path) => (
          <div key={path.title} className="rounded-xl border border-border-soft bg-panel p-4">
            <p className="mb-1 text-sm font-bold text-text">{path.title}</p>
            <p className="mb-1 text-xs text-text-faint">{path.certCount} {t("certList.certsSuffix")}</p>
            <p className="mb-3 text-xs text-text-muted">{path.levelRange}</p>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[11px] font-semibold text-primary">
              {path.levelRange}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
