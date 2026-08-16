"use client";

import Link from "next/link";
import { ChevronLeft, BookOpen, Clock3 } from "lucide-react";
import { getCompanyIcon } from "@/lib/vendorIcons";
import type { Company, Certification } from "@/lib/companiesData";
import { useLocale } from "@/components/LocaleProvider";

/**
 * Placeholder shown for every company/cert's Learn page — unlike Labs and
 * Practice Questions, which have some real content for a few certs, Learn
 * has no hand-authored modules anywhere yet (getLearnTrack's generated
 * fallback is filler, not real content), so this is deliberately
 * unconditional rather than per-cert. Same layout/tone as
 * ComingSoonLab/ComingSoonPractice for consistency.
 */
export default function ComingSoonLearn({ company, cert }: { company: Company; cert: Certification }) {
  const { t } = useLocale();
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-center md:px-8">
      <Link
        href={`/certifications/${company.slug}/${cert.id}`}
        className="mb-8 inline-flex items-center gap-1 text-sm font-semibold text-text-muted hover:text-primary"
      >
        <ChevronLeft size={14} />
        {t("labs.backToCert")} {cert.code}
      </Link>

      <div className="rounded-2xl border border-border-soft bg-panel p-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-panel-alt">
          {getCompanyIcon(company.slug, 30)}
        </div>

        <p className="mb-1 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
          <BookOpen size={13} />
          {t("learn.comingSoonLabel")}
        </p>
        <h1 className="mb-2 text-xl font-extrabold text-text">
          {cert.code}: {cert.title}
        </h1>
        <p className="mx-auto mb-6 max-w-md text-sm text-text-muted">
          {t("learn.trackInProgress").split("{company}")[0]}
          <strong className="text-text">{company.name}</strong>
          {t("learn.trackInProgress").split("{company}")[1]}
        </p>

        <div className="mx-auto flex max-w-xs items-center justify-center gap-2 rounded-lg border border-dashed border-border-soft py-3 text-xs font-semibold text-text-faint">
          <Clock3 size={13} />
          {t("labs.comingSoonLabel2")}
        </div>
      </div>
    </div>
  );
}
