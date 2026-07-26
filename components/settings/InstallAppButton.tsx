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
      <p className="flex items-center gap-2 text-sm text-text-muted">
        <Share size={15} className="shrink-0" />
        {t("install.iosDesc")}
      </p>
    );
  }

  async function handleClick() {
    const shown = await triggerInstall();
    if (shown) setInstalled(true);
  }

  return (
    <button
      onClick={handleClick}
      disabled={!deferredPrompt}
      className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download size={15} />
      {t("install.cta")}
    </button>
  );
}
