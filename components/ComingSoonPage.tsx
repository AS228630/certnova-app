"use client";

import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import { useLocale } from "@/components/LocaleProvider";

/**
 * Generic "coming soon" page used for nav items that don't have a real
 * feature built yet (Analytics, Community, Interview-Vorbereitung, ...).
 * Keeps every primary-nav link a real, reachable page instead of a 404,
 * while being explicit that the feature itself isn't built yet.
 */
export default function ComingSoonPage({
  title,
  description,
  icon: Icon = Sparkles,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
}) {
  const { t } = useLocale();
  return (
    <DashboardShell requireAuth={false}>
      <main className="flex flex-1 items-center justify-center p-4 md:p-8">
        <div className="mx-auto max-w-md rounded-2xl border border-border-soft bg-panel p-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light">
            <Icon size={28} className="text-primary" />
          </div>
          <h1 className="mb-2 text-xl font-extrabold text-text">{title}</h1>
          <p className="mb-6 text-sm text-text-muted">{description}</p>
          <div className="mx-auto flex max-w-[220px] items-center justify-center gap-2 rounded-lg border border-dashed border-border-soft py-3 text-xs font-semibold text-text-faint">
            {t("comingSoon.label")}
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
