"use client";

import { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import CareerPathGrid from "@/components/CareerPathGrid";
import CareerPathDetail from "@/components/CareerPathDetail";
import LearningJourneySteps from "@/components/LearningJourneySteps";
import { getCareerPath } from "@/lib/careerPathsData";
import { useLocale } from "@/components/LocaleProvider";

export default function LearningPathsPage() {
  const { t } = useLocale();
  const [selectedSlug, setSelectedSlug] = useState("it-support-specialist");
  const selectedPath = getCareerPath(selectedSlug);

  return (
    <DashboardShell>
      <main className="mx-auto max-w-6xl space-y-6 p-3 sm:p-4 md:p-8">
        <div>
          <h1 className="text-xl font-extrabold text-text sm:text-2xl">{t("learningPaths.title")}</h1>
          <p className="mt-1 text-sm text-text-muted">{t("learningPaths.subtitle")}</p>
        </div>

        <section>
          <h2 className="mb-3 font-bold text-text">{t("learningPaths.step1Title")}</h2>
          <CareerPathGrid selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
        </section>

        {selectedPath && (
          <section>
            <CareerPathDetail path={selectedPath} />
          </section>
        )}

        <section>
          <h2 className="mb-1 font-bold text-text">{t("learningPaths.step2Title")}</h2>
          <p className="mb-4 text-sm text-text-muted">{t("learningPaths.step2Subtitle")}</p>
          <LearningJourneySteps />
        </section>
      </main>
    </DashboardShell>
  );
}
