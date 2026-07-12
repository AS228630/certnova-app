"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

// Real, honest answers matching how the site actually works today —
// including being upfront that subscriptions/payments aren't live yet,
// rather than describing a billing flow that doesn't exist.
const ARTICLE_KEYS = [
  "help.article1",
  "help.article2",
  "help.article3",
  "help.article4",
  "help.article5",
  "help.article6",
];

export default function PopularArticles() {
  const { t } = useLocale();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="articles">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-text">{t("help.popularArticlesTitle")}</h2>
      </div>
      <div className="divide-y divide-border-soft rounded-2xl border border-border-soft bg-panel">
        {ARTICLE_KEYS.map((key, i) => (
          <div key={key}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
            >
              <span className="text-sm font-semibold text-text">{t(`${key}Q`)}</span>
              <ChevronRight
                size={16}
                className={`shrink-0 text-text-faint transition-transform ${open === i ? "rotate-90" : ""}`}
              />
            </button>
            {open === i && <p className="px-4 pb-4 text-sm leading-relaxed text-text-muted">{t(`${key}A`)}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
