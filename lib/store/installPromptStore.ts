import { create } from "zustand";

export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type InstallPromptState = {
  deferredPrompt: BeforeInstallPromptEvent | null;
  isStandalone: boolean;
  setDeferredPrompt: (e: BeforeInstallPromptEvent | null) => void;
  setStandalone: (v: boolean) => void;
  /** Triggers the real browser install dialog. Returns whether it was
   * actually shown — false means this browser/device doesn't support
   * one-click install right now (e.g. iOS Safari, or already installed),
   * so the caller should fall back to manual instructions. */
  triggerInstall: () => Promise<boolean>;
};

// One global capture point for the beforeinstallprompt event, registered
// once at the root layout — so both the one-time first-visit banner AND
// the always-available "Install app" button in Settings can trigger the
// exact same real install dialog, instead of each needing their own
// separate event listener (which only the first-registered one would
// ever actually receive, since the browser only fires this once per
// page load).
export const useInstallPromptStore = create<InstallPromptState>((set, get) => ({
  deferredPrompt: null,
  isStandalone: false,
  setDeferredPrompt: (e) => set({ deferredPrompt: e }),
  setStandalone: (v) => set({ isStandalone: v }),
  triggerInstall: async () => {
    const { deferredPrompt } = get();
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    set({ deferredPrompt: null });
    return true;
  },
}));
