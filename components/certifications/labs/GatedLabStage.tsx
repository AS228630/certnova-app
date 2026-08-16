"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserContext";
import { useSubscriptionStore } from "@/lib/store/subscriptionStore";
import { canAccess } from "@/lib/entitlementPolicy";
import UniversalLabStage from "./UniversalLabStage";
import LabNavigationPanel from "./LabNavigationPanel";
import FreeRegistrationGate from "@/components/registration/FreeRegistrationGate";
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
 *
 * Per the Stage 5 spec, a locked lab shows two different gates
 * depending on who's asking: a true Guest (no account yet) sees the
 * shared FreeRegistrationGate first (creating an account is the actual
 * next step for them); a signed-in Free user already has an account, so
 * they go straight to the real Premium gate/Checkout.
 */
export default function GatedLabStage({
  infrastructureType,
  company,
  cert,
  lab,
  labIndex,
  allLabs,
}: {
  infrastructureType: LabInfrastructureType;
  company: Company;
  cert: Certification;
  lab: Lab | undefined;
  /** 0-based position of this lab within getLabsForCert(cert.id) (or 0
   * for certs with only the generated fallback lab). */
  labIndex: number;
  /** Full lab list for this cert, for the Lab Navigation Panel — only
   * ever non-empty for certs with real hand-authored labs (currently
   * az-104, az-900); everything else renders nothing extra, same as
   * before this panel existed. */
  allLabs: Lab[];
}) {
  const { t } = useLocale();
  const pathname = usePathname();
  const { user } = useUser();
  const isPro = useSubscriptionStore((s) => s.isPro);
  const subLoading = useSubscriptionStore((s) => s.loading);
  const [showRegistrationGate, setShowRegistrationGate] = useState(false);
  const freeLabsCount = cert.freeLabsCount ?? 1;
  // A Guest never has a real subscription row to load, so `subLoading`
  // (which only ever resolves for a signed-in user) would otherwise
  // strand a Guest on the loading spinner forever — only wait on it when
  // there's an actual account to load a subscription for.
  const locked = !(user && subLoading) && !canAccess(isPro, "labs_full") && labIndex >= freeLabsCount;

  if (user && subLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-text-muted">
        {t("common.loading")}
      </div>
    );
  }

  const nav = allLabs.length > 1 && (
    <LabNavigationPanel
      companySlug={company.slug}
      certId={cert.id}
      labs={allLabs}
      freeLabsCount={freeLabsCount}
      isPro={isPro}
      currentLabIndex={labIndex}
    />
  );

  if (locked) {
    return (
      <div className="mx-auto max-w-md p-8 text-center">
        {nav}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary">
          <Lock size={22} />
        </div>
        <h2 className="mb-2 text-lg font-extrabold text-text">{t("premiumGate.labsTitle")}</h2>
        <p className="mb-1 text-sm leading-relaxed text-text-muted">{t("premiumGate.labsDesc")}</p>
        {user ? (
          <>
            <p className="mb-6 text-sm font-semibold text-primary">{t("premiumGate.includedInPremium")}</p>
            <Link
              href={`/upgrade?returnTo=${encodeURIComponent(pathname ?? "/dashboard")}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-dark"
            >
              {t("premiumGate.cta")}
              <ArrowRight size={14} />
            </Link>
          </>
        ) : (
          <button
            onClick={() => setShowRegistrationGate(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-dark"
          >
            {t("registrationGate.registerCta")}
            <ArrowRight size={14} />
          </button>
        )}
        {showRegistrationGate && (
          <FreeRegistrationGate returnTo={pathname ?? "/dashboard"} onClose={() => setShowRegistrationGate(false)} />
        )}
      </div>
    );
  }

  return (
    <div>
      {nav}
      <UniversalLabStage infrastructureType={infrastructureType} company={company} cert={cert} lab={lab} />
    </div>
  );
}
