"use client";

import { BookOpen, FlaskConical, FileQuestion, Award, Users, Rocket } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

const steps = [
  { icon: BookOpen, color: "bg-primary", titleKey: "lpLanding.step1Title", descKey: "lpLanding.step1Desc" },
  { icon: FlaskConical, color: "bg-blue-500", titleKey: "lpLanding.step2Title", descKey: "lpLanding.step2Desc" },
  { icon: FileQuestion, color: "bg-warning", titleKey: "lpLanding.step3Title", descKey: "lpLanding.step3Desc" },
  { icon: Award, color: "bg-success", titleKey: "lpLanding.step4Title", descKey: "lpLanding.step4Desc" },
  { icon: Users, color: "bg-fuchsia-500", titleKey: "lpLanding.step5Title", descKey: "lpLanding.step5Desc" },
  { icon: Rocket, color: "bg-danger", titleKey: "lpLanding.step6Title", descKey: "lpLanding.step6Desc" },
];

export default function HowItWorksSteps() {
  const { t } = useLocale();
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h2 className="mb-10 text-center text-xl font-extrabold text-text sm:text-2xl">{t("lpLanding.howItWorksTitle")}</h2>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
        {steps.map((s, i) => (
          <div key={s.titleKey} className="flex flex-col items-center text-center">
            <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${s.color}`}>
              {i + 1}
            </div>
            <s.icon size={20} className="mb-2 text-text-muted" />
            <p className="text-sm font-bold text-text">{t(s.titleKey)}</p>
            <p className="mt-1 text-xs text-text-faint">{t(s.descKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
