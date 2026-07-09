"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCompanyIcon } from "@/lib/vendorIcons";
import type { Company } from "@/lib/companiesData";
import { useLocale } from "@/components/LocaleProvider";

export default function PopularProvidersCarousel({ companies }: { companies: Company[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { t } = useLocale();

  const scroll = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-text">{t("certList.popularProviders")}</h2>
        <div className="flex items-center gap-3">
          <Link href="#alle-anbieter" className="text-sm font-semibold text-primary hover:text-primary-dark">
            {t("certList.viewAll")}
          </Link>
          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll(-1)}
              aria-label={t("certList.carouselBack")}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-border-soft text-text-muted hover:border-primary hover:text-primary"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label={t("certList.carouselNext")}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-border-soft text-text-muted hover:border-primary hover:text-primary"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <div ref={scrollerRef} className="no-scrollbar flex gap-4 overflow-x-auto">
        {companies.map((c) => (
          <Link
            key={c.slug}
            href={`/certifications/${c.slug}`}
            className="flex w-56 flex-none items-center gap-3 rounded-xl border border-border-soft bg-panel p-4 transition hover:border-primary/40"
          >
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-panel-alt">
              {getCompanyIcon(c.slug, 22)}
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold text-text">{c.name}</p>
              <p className="text-xs text-text-faint">{c.totalCertCount} {t("certList.certsSuffix")}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
