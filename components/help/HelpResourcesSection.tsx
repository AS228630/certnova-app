"use client";

import { Activity, Download, PlayCircle, ServerCog } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

const resources = [
  { icon: Activity, titleKey: "help.resSystemStatusTitle", descKey: "help.resSystemStatusDesc" },
  { icon: Download, titleKey: "help.resDownloadsTitle", descKey: "help.resDownloadsDesc" },
  { icon: PlayCircle, titleKey: "help.resVideoGuidesTitle", descKey: "help.resVideoGuidesDesc" },
  { icon: ServerCog, titleKey: "help.resStatusPageTitle", descKey: "help.resStatusPageDesc" },
];

// These are genuinely not built yet (no uptime monitor, no downloadable
// templates, no recorded video guides exist on the platform) — shown
// honestly as "coming soon" rather than linking to content that doesn't
// exist, per the project's no-fabricated-content principle.
export default function HelpResourcesSection({ onNotAvailable }: { onNotAvailable: (label: string) => void }) {
  const { t } = useLocale();
  return (
    <section>
      <h2 className="mb-4 font-bold text-text">{t("help.moreResourcesTitle")}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {resources.map((r) => (
          <button
            key={r.titleKey}
            onClick={() => onNotAvailable(t(r.titleKey))}
            className="flex flex-col items-start gap-2 rounded-xl border border-border-soft bg-panel p-4 text-left hover:border-primary/40"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-panel-alt text-text-muted">
              <r.icon size={16} />
            </div>
            <div>
              <p className="text-sm font-bold text-text">{t(r.titleKey)}</p>
              <p className="text-xs text-text-faint">{t(r.descKey)}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
