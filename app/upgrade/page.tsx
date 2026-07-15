"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import { useLocale } from "@/components/LocaleProvider";
import UpgradeStepper, { type UpgradeStep } from "@/components/upgrade/UpgradeStepper";
import PlanSelectionStep, { type PlanId } from "@/components/upgrade/PlanSelectionStep";
import PaymentStep from "@/components/upgrade/PaymentStep";
import UpgradeAddOns from "@/components/upgrade/UpgradeAddOns";
import ComingSoonToast from "@/components/coachLive/ComingSoonToast";
import { useSubscriptionStore } from "@/lib/store/subscriptionStore";

// A real 4-step upgrade flow, matching the reference design, backed by a
// real Stripe Checkout + webhook. If the signed-in user already has an
// active paid subscription (read from the real subscriptions table, not
// assumed), this shows an honest "you're already Pro" state instead of
// the plan-selection form — nothing prevents them from re-subscribing
// server-side, but there's no reason to walk a paying customer through
// checkout again.
export default function UpgradePage() {
  const { t } = useLocale();
  const [step, setStep] = useState<UpgradeStep>(1);
  const [selectedPlan, setSelectedPlan] = useState<{ id: PlanId; name: string; price: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const isPro = useSubscriptionStore((s) => s.isPro);
  const subscription = useSubscriptionStore((s) => s.subscription);

  function handleSelectPlan(id: PlanId, name: string, price: string) {
    setSelectedPlan({ id, name, price });
    setStep(2);
  }

  if (isPro) {
    const renewsOn = subscription?.current_period_end
      ? new Date(subscription.current_period_end).toLocaleDateString()
      : null;
    return (
      <DashboardShell>
        <main className="mx-auto max-w-2xl p-4 sm:p-6 md:p-8">
          <div className="mt-8 rounded-2xl border border-border-soft bg-panel p-8 text-center">
            <CheckCircle2 className="mx-auto text-success" size={48} />
            <h1 className="mt-4 text-2xl font-extrabold text-text">{t("upgrade.alreadySubscribedTitle")}</h1>
            <p className="mt-2 text-sm text-text-muted">{t("upgrade.alreadySubscribedDesc")}</p>
            {renewsOn && (
              <p className="mt-1 text-sm text-text-muted">
                {t("upgrade.alreadySubscribedRenews")} {renewsOn}
              </p>
            )}
            <Link
              href="/dashboard"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
            >
              {t("upgrade.goToDashboard")}
            </Link>
          </div>
        </main>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <main className="mx-auto max-w-6xl p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("upgrade.title")}</h1>
        <p className="mt-1 text-sm text-text-muted">{t("upgrade.subtitle")}</p>

        <div className="mt-6 overflow-x-auto pb-2">
          <UpgradeStepper current={step} />
        </div>

        <div className="mt-8">
          {step === 1 && <PlanSelectionStep onSelectPlan={handleSelectPlan} />}
          {step === 2 && selectedPlan && (
            <PaymentStep planId={selectedPlan.id} planName={selectedPlan.name} planPrice={selectedPlan.price} onBack={() => setStep(1)} />
          )}
        </div>

        {step === 1 && <UpgradeAddOns onNotAvailable={(label) => setToast(label)} />}
      </main>
      {toast && <ComingSoonToast label={toast} onClose={() => setToast(null)} />}
    </DashboardShell>
  );
}
