"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export type CertFaqItem = { q: string; a: string };

export default function CertFaq({ items }: { items: CertFaqItem[] }) {
  const { t } = useLocale();
  const [open, setOpen] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <div className="mt-8 rounded-2xl border border-border-soft bg-panel p-5 sm:p-6">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-text">
        <HelpCircle size={19} className="text-primary" />
        {t("certFaq.title")}
      </h2>
      <div className="divide-y divide-border-soft">
        {items.map((item, i) => (
          <div key={i} className="py-3">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-3 text-left text-sm font-semibold text-text"
            >
              {item.q}
              <ChevronDown size={16} className={`shrink-0 text-text-faint transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
