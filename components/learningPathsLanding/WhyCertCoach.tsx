"use client";

import { FlaskConical, Bot, FileQuestion, Award, TrendingUp, Users } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

// Every feature listed here corresponds to something real and already
// built on the platform (labs, AI coach, practice exams, certificates,
// career paths, community) — no invented capability.
const features = [
  { icon: FlaskConical, titleKey: "lpLanding.featLabsTitle", descKey: "lpLanding.featLabsDesc" },
  { icon: Bot, titleKey: "lpLanding.featAiTitle", descKey: "lpLanding.featAiDesc" },
  { icon: FileQuestion, titleKey: "lpLanding.featExamsTitle", descKey: "lpLanding.featExamsDesc" },
  { icon: Award, titleKey: "lpLanding.featCertsTitle", descKey: "lpLanding.featCertsDesc" },
  { icon: TrendingUp, titleKey: "lpLanding.featRoadmapTitle", descKey: "lpLanding.featRoadmapDesc" },
  { icon: Users, titleKey: "lpLanding.featCommunityTitle", descKey: "lpLanding.featCommunityDesc" },
];

export default function WhyCertCoach() {
  const { t } = useLocale();
  return (
    <section className="border-y border-border-soft bg-panel-alt/40 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-xl font-extrabold text-text sm:text-2xl">{t("lpLanding.whyTitle")}</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {features.map((f) => (
            <div key={f.titleKey} className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                <f.icon size={19} />
              </div>
              <p className="text-sm font-bold text-text">{t(f.titleKey)}</p>
              <p className="mt-1 text-xs text-text-faint">{t(f.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
