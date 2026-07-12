"use client";

import { Check } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export type UpgradeStep = 1 | 2 | 3 | 4;

const STEP_KEYS: { step: UpgradeStep; labelKey: string }[] = [
  { step: 1, labelKey: "upgrade.step1" },
  { step: 2, labelKey: "upgrade.step2" },
  { step: 3, labelKey: "upgrade.step3" },
  { step: 4, labelKey: "upgrade.step4" },
];

export default function UpgradeStepper({ current }: { current: UpgradeStep }) {
  const { t } = useLocale();

  return (
    <div className="flex items-center justify-between gap-2 sm:justify-start sm:gap-4">
      {STEP_KEYS.map(({ step, labelKey }, i) => {
        const done = step < current;
        const active = step === current;
        return (
          <div key={step} className="flex items-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  done
                    ? "bg-success text-white"
                    : active
                      ? "bg-primary text-white"
                      : "border border-border-soft text-text-faint"
                }`}
              >
                {done ? <Check size={15} /> : step}
              </div>
              <span
                className={`hidden text-[11px] font-semibold sm:block ${
                  active ? "text-text" : "text-text-faint"
                }`}
              >
                {t(labelKey)}
              </span>
            </div>
            {i < STEP_KEYS.length - 1 && (
              <div className={`h-0.5 w-8 shrink-0 sm:w-16 ${done ? "bg-success" : "bg-border-soft"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
