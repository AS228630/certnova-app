"use client";

import { Search, Award } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export default function CertificationsHero({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
}) {
  const { t } = useLocale();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-soft bg-gradient-to-br from-panel to-panel-alt p-6 md:p-10">
      <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_220px]">
        <div>
          <h1 className="text-3xl font-extrabold text-text md:text-4xl">{t("certList.heroTitle")}</h1>
          <p className="mt-2 max-w-lg text-sm text-text-muted md:text-base">
            {t("certList.heroDesc")}
          </p>

          <div className="relative mt-6 max-w-xl">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint" />
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder={t("certList.searchCompanyOrCert")}
              className="w-full rounded-xl border border-border-soft bg-panel py-3.5 pl-11 pr-4 text-sm text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="mx-auto hidden h-40 w-40 items-center justify-center rounded-full bg-primary-light lg:flex">
          <Award size={64} className="text-primary" strokeWidth={1.5} />
        </div>
      </div>

      <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
    </div>
  );
}
