"use client";

import { useState, type ReactNode } from "react";
import { useLocale } from "@/components/LocaleProvider";

const TAB_KEYS = ["learningPath", "overview", "resources"] as const;

export default function JourneyTabs({ children }: { children: ReactNode }) {
  const { t } = useLocale();
  const [active, setActive] = useState<(typeof TAB_KEYS)[number]>("learningPath");

  const labelKeys: Record<(typeof TAB_KEYS)[number], string> = {
    learningPath: "journey.tabLearningPath",
    overview: "journey.tabOverview",
    resources: "journey.tabResources",
  };

  return (
    <div className="mt-6">
      <div className="mb-6 flex gap-6 border-b border-border-soft">
        {TAB_KEYS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`relative pb-3 text-sm font-semibold transition-colors ${
              active === tab ? "text-primary" : "text-text-muted hover:text-text"
            }`}
          >
            {t(labelKeys[tab])}
            {active === tab && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
          </button>
        ))}
      </div>

      {active === "learningPath" && children}
      {active === "overview" && (
        <p className="text-sm text-text-muted">{t("journey.overviewComingSoon")}</p>
      )}
      {active === "resources" && (
        <p className="text-sm text-text-muted">{t("journey.resourcesComingSoon")}</p>
      )}
    </div>
  );
}
