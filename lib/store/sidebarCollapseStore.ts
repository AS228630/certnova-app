import { create } from "zustand";

// Controls whether the DESKTOP (lg+) main sidebar is collapsed to give the
// practice-question area more width. Fully separate from Sidebar's mobile
// open/close state (a slide-over drawer, driven by DashboardShell). This
// only ever affects the lg: breakpoint. Persisted to localStorage so the
// choice survives a reload/navigation, same pattern as ThemeProvider.

const STORAGE_KEY = "certcoach-sidebar-collapsed";

function getInitial(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "1";
}

type SidebarCollapseState = {
  collapsed: boolean;
  toggle: () => void;
};

export const useSidebarCollapseStore = create<SidebarCollapseState>((set, get) => ({
  collapsed: getInitial(),
  toggle: () => {
    const next = !get().collapsed;
    set({ collapsed: next });
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    }
  },
}));
