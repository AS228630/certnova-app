"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Rocket, Check } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export type PremiumGateVariant = "labs" | "practice" | "examSimulation" | "dashboard";

/**
 * The one central Stage 7 Upgrade Trigger — reused, unmodified, for
 * every certification and every trigger point (Practice, Labs, Exam
 * Simulation, a locked Dashboard row). Nothing here is certId-specific:
 * the certification name and the real per-cert benefit list (e.g. the
 * real question count) are passed in as props, computed server-side by
 * the caller's page.tsx via lib/server/premiumBenefits.ts — this
 * component never invents a number itself.
 *
 * Deliberately does NOT show a "30-Tage Geld-zurück-Garantie" line (the
 * reference image has one) — confirmed against the real AGB (Abschnitt
 * 5) that this claim is false; already removed from /pricing for the
 * same reason. No new legal claim is added here to compensate — only
 * the real Premium checkout CTA.
 */
export default function PremiumGateModal({
  variant,
  certificationName,
  benefits,
  onClose,
}: {
  variant: PremiumGateVariant;
  /** Real certification display name/code (e.g. "AZ-900") — never
   * hardcoded here, always passed in by the caller. */
  certificationName: string;
  /** Real, per-certification benefit list — computed server-side by
   * lib/server/premiumBenefits.ts, e.g. only including a question-count
   * line for a cert that actually has a real bank. */
  benefits: string[];
  onClose: () => void;
}) {
  const { t } = useLocale();
  const pathname = usePathname();
  const [ctaLoading, setCtaLoading] = useState(false);
  const primaryActionRef = useRef<HTMLAnchorElement>(null);
  // Captures whatever was actually focused right before this dialog
  // opened (the real trigger element, whichever one of this modal's
  // several different callers/buttons it was) — generic, so it works
  // for every caller without each one needing to pass its own ref down.
  const triggerElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    triggerElementRef.current = document.activeElement as HTMLElement | null;
    return () => {
      triggerElementRef.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Focus the primary action as soon as the dialog opens, per the
  // spec's accessibility requirement (item 22).
  useEffect(() => {
    primaryActionRef.current?.focus();
  }, []);

  const titleKey =
    variant === "labs"
      ? "premiumGate.labsHeadline"
      : variant === "practice"
        ? "premiumGate.practiceHeadline"
        : variant === "examSimulation"
          ? "premiumGate.examHeadline"
          : "premiumGate.dashboardHeadline";

  const description = t("premiumGate.unlockDesc").replace("{cert}", certificationName);
  const upgradeHref = `/upgrade?returnTo=${encodeURIComponent(pathname ?? "/dashboard")}`;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[calc(100vh-24px)] w-full max-w-[540px] overflow-y-auto rounded-2xl border border-border-soft bg-panel p-6 text-center sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-text-faint hover:bg-panel-alt hover:text-text"
          aria-label={t("premiumGate.closeAriaLabel")}
        >
          <X size={18} />
        </button>

        <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10">
          <Rocket size={56} className="text-primary" aria-hidden="true" />
        </div>

        <h3 className="mb-2 text-xl font-extrabold text-text sm:text-2xl">{t(titleKey)}</h3>
        <p className="mb-5 text-sm leading-relaxed text-text-muted">{description}</p>

        <ul className="mx-auto mb-6 max-w-xs space-y-2 text-left">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-text-muted">
              <Check size={15} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>

        <Link
          href={upgradeHref}
          ref={primaryActionRef}
          onClick={() => setCtaLoading(true)}
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary-dark"
        >
          {ctaLoading ? t("premiumGate.opening") : t("premiumGate.cta")}
        </Link>

        <button onClick={onClose} className="w-full rounded-lg border border-border-soft py-3 text-sm font-medium text-text-muted hover:bg-panel-alt">
          {t("premiumGate.laterCta")}
        </button>
      </div>
    </div>
  );
}
