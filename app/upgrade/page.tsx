"use client";

import { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import { useLocale } from "@/components/LocaleProvider";
import UpgradeStepper, { type UpgradeStep } from "@/components/upgrade/UpgradeStepper";
import PlanSelectionStep, { type PlanId } from "@/components/upgrade/PlanSelectionStep";
import PaymentStep from "@/components/upgrade/PaymentStep";
import UpgradeAddOns from "@/components/upgrade/UpgradeAddOns";
import ComingSoonToast from "@/components/coachLive/ComingSoonToast";

// A real 4-step upgrade flow, matching the reference design. Step 1
// (plan selection) is fully functional. Step 2 (payment) is honest about
// not having a real payment processor yet — no fake card form, no
// pretending to charge anyone — rather than silently doing nothing or
// mimicking a checkout that doesn't work. Steps 3-4 exist only as
// stepper labels for now, since nobody can reach them without a real
// payment step in between.
export default function UpgradePage() {
  const { t } = useLocale();
  const [step, setStep] = useState<UpgradeStep>(1);
  const [selectedPlan, setSelectedPlan] = useState<{ id: PlanId; name: string; price: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function handleSelectPlan(id: PlanId, name: string, price: string) {
    setSelectedPlan({ id, name, price });
    setStep(2);
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
            <PaymentStep planName={selectedPlan.name} planPrice={selectedPlan.price} onBack={() => setStep(1)} />
          )}
        </div>

        {step === 1 && <UpgradeAddOns onNotAvailable={(label) => setToast(label)} />}
      </main>
      {toast && <ComingSoonToast label={toast} onClose={() => setToast(null)} />}
    </DashboardShell>
  );
}
