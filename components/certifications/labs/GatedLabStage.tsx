"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useSubscriptionStore } from "@/lib/store/subscriptionStore";
import { canAccess } from "@/lib/entitlementPolicy";
import UniversalLabStage from "./UniversalLabStage";
import type { Company, Certification } from "@/lib/companiesData";
import type { Lab } from "@/lib/labsData";
import type { LabInfrastructureType } from "@/lib/labInfrastructure";

/**
 * Wraps UniversalLabStage with the real Free/Premium lab limit. isPro
 * comes from subscriptionStore, which reads the live, RLS-protected
 * subscriptions table (only the Stripe webhook can ever write a row
 * there) — so, unlike a plain client-side flag, a Free user cannot spoof
 * this into an unlocked state from devtools. The free-lab count is
 * per-certification (Certification.freeLabsCount), never a single
 * hardcoded number for every cert, defaulting to 1 when a cert hasn't
 * set one explicitly.
 */
export default function GatedLabStage({
  infrastructureType,
  company,
  cert,
  lab,
  labIndex,
}: {
  infrastructureType: LabInfrastructureType;
  company: Company;
  cert: Certification;
  lab: Lab | undefined;
  /** 0-based position of this lab within getLabsForCert(cert.id) (or 0
   * for certs with only the generated fallback lab). */
  labIndex: number;
}) {
  const { t } = useLocale();
  const pathname = usePathname();
  const isPro = useSubscriptionStore((s) => s.isPro);
  const subLoading = useSubscriptionStore((s) => s.loading);
  const freeLabsCount = cert.freeLabsCount ?? 1;
  const locked = !subLoading && !canAccess(isPro, "labs_full") && labIndex >= freeLabsCount;

  if (subLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-text-muted">
        {t("common.loading")}
      </div>
    );
  }

  if (locked) {
    return (
      <div className="mx-auto max-w-md p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary">
          <Lock size={22} />
        </div>
        <h2 className="mb-2 text-lg font-extrabold text-text">{t("premiumGate.labsTitle")}</h2>
        <p className="mb-1 text-sm leading-relaxed text-text-muted">{t("premiumGate.labsDesc")}</p>
        <p className="mb-6 text-sm font-semibold text-primary">{t("premiumGate.includedInPremium")}</p>
        <Link
          href={`/upgrade?returnTo=${encodeURIComponent(pathname ?? "/dashboard")}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-dark"
        >
          {t("premiumGate.cta")}
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return <UniversalLabStage infrastructureType={infrastructureType} company={company} cert={cert} lab={lab} />;
}
