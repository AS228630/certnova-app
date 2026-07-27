"use client";

import { Download, Share, CheckCircle2 } from "lucide-react";
import { useInstallPromptStore } from "@/lib/store/installPromptStore";
import { isIos } from "@/components/InstallPrompt";
import { useLocale } from "@/components/LocaleProvider";
import { useState } from "react";

// Always-available alternative to the one-time first-visit banner —
// that banner tracks "already shown" in localStorage and never
// reappears once dismissed (even after uninstalling the app), so this
// gives anyone who missed it, or wants to reinstall, a permanent way
// to trigger the same install flow from Settings.
export default function InstallAppButton() {
  const { t } = useLocale();
  const deferredPrompt = useInstallPromptStore((s) => s.deferredPrompt);
  const isStandalone = useInstallPromptStore((s) => s.isStandalone);
  const triggerInstall = useInstallPromptStore((s) => s.triggerInstall);
  const [installed, setInstalled] = useState(false);

  if (isStandalone || installed) {
    return (
      <p className="flex items-center gap-2 text-sm font-semibold text-success">
        <CheckCircle2 size={16} />
        {t("install.alreadyInstalled")}
      </p>
    );
  }

  if (isIos()) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary-light p-4">
        <p className="mb-3 text-sm font-bold text-text">{t("install.iosStepsTitle")}</p>
        <ol className="space-y-2.5 text-sm text-text-muted">
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              1
            </span>
            {t("install.iosStep1")}
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              2
            </span>
            <span className="flex items-center gap-1.5">
              {t("install.iosStep2")}
              <Share size={15} className="shrink-0 text-primary" />
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              3
            </span>
            {t("install.iosStep3")}
          </li>
        </ol>
      </div>
    );
  }

  async function handleClick() {
    const shown = await triggerInstall();
    if (shown) setInstalled(true);
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={!deferredPrompt}
        className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Download size={15} />
        {t("install.cta")}
      </button>
      {!deferredPrompt && <p className="mt-2.5 text-xs text-text-faint">{t("install.fallbackHint")}</p>}
    </div>
  );
}
