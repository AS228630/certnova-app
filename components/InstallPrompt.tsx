"use client";

import { useEffect, useState } from "react";
import { Download, X, Share } from "lucide-react";
import Logo from "@/components/Logo";
import { useLocale } from "@/components/LocaleProvider";

const DISMISS_KEY = "certcoach-install-prompt-dismissed";

// Fires on Chrome/Edge/Android before the browser would show its own
// install prompt — capturing it lets us show our own styled banner
// first and trigger the real browser prompt only when the person taps
// our button.
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isIos() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari's own flag for "already added to home screen"
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export default function InstallPrompt() {
  const { t } = useLocale();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showIosHint, setShowIosHint] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Installability just won't be offered if this fails — no need
        // to bother the person with an error over it.
      });
    }

    if (isStandalone()) return; // already installed, never show anything
    if (localStorage.getItem(DISMISS_KEY)) return; // already asked once

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // iOS never fires beforeinstallprompt at all — Safari has no
    // programmatic install API, only the manual Share -> "Zum
    // Home-Bildschirm" flow, so show a one-time instruction instead.
    // This has to run in an effect (not a lazy useState initializer):
    // isIos()/localStorage are browser-only, and computing them in an
    // initializer would run during SSR/hydration too and risk a
    // mismatch between the server-rendered (always-hidden) markup and
    // what the client wants to show immediately.
    if (isIos()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only device detection on mount, not a render-loop update
      setShowIosHint(true);
      setShowBanner(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function dismiss() {
    setShowBanner(false);
    localStorage.setItem(DISMISS_KEY, "1");
  }

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    dismiss();
  }

  if (!showBanner) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] flex justify-center p-3 sm:bottom-4 sm:p-4">
      <div className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-border-soft bg-panel p-4 shadow-2xl">
        <Logo size={38} className="shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-text">{t("install.title")}</p>
          <p className="text-xs text-text-muted">{showIosHint ? t("install.iosDesc") : t("install.desc")}</p>
        </div>
        {!showIosHint && (
          <button
            onClick={handleInstall}
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-bold text-white hover:bg-primary-dark"
          >
            <Download size={14} />
            {t("install.cta")}
          </button>
        )}
        {showIosHint && (
          <div className="flex shrink-0 items-center gap-1 text-text-faint">
            <Share size={16} />
          </div>
        )}
        <button onClick={dismiss} className="shrink-0 text-text-faint hover:text-text" aria-label={t("help.close")}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
