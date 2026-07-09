"use client";

import Link from "next/link";
import { ChevronLeft, FlaskConical, Clock3 } from "lucide-react";
import { getCompanyIcon } from "@/lib/vendorIcons";
import type { Company, Certification } from "@/lib/companiesData";
import { useLocale } from "@/components/LocaleProvider";

/**
 * Placeholder shown for every cert whose cloud/platform doesn't have a real
 * interactive simulator yet (currently: everything except the 16 Azure-track
 * certs — see lib/labInfrastructure.ts + UniversalLabStage). This keeps every
 * company/cert reachable and correctly labelled (own icon, own name) today,
 * so adding a real simulator for AWS, Google Cloud, etc. later is just a
 * matter of wiring a new provider into this route — no restructuring needed.
 */
export default function ComingSoonLab({ company, cert }: { company: Company; cert: Certification }) {
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
          <FlaskConical size={13} />
          {t("labs.labEnvironment")}
        </p>
        <h1 className="mb-2 text-xl font-extrabold text-text">
          {cert.code}: {cert.title}
        </h1>
        <p className="mx-auto mb-6 max-w-md text-sm text-text-muted">
          {t("labs.labInProgress").split("{company}")[0]}<strong className="text-text">{company.name}</strong>{t("labs.labInProgress").split("{company}")[1]}
        </p>

        <div className="mx-auto flex max-w-xs items-center justify-center gap-2 rounded-lg border border-dashed border-border-soft py-3 text-xs font-semibold text-text-faint">
          <Clock3 size={13} />
          {t("labs.comingSoonLabel2")}
        </div>
      </div>
    </div>
  );
}
