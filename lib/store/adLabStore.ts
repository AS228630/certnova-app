"use client";

import { create } from "zustand";

export type AdUser = {
  firstName: string;
  lastName: string;
  logonName: string;
  ou: string;
  createdAt: number;
};

export const AD_OUS = ["Users", "Computers", "Domain Controllers", "IT-Abteilung (OU)"] as const;
export const TARGET_OU = "Users";
export const DOMAIN_SUFFIX = "certcoach-lab.local";

// Real Active Directory sAMAccountName-style rule: 1-20 chars, no spaces or
// the handful of characters AD forbids in a logon name.
export function validateLogonName(name: string): string | null {
  if (!name) return "Der Anmeldename darf nicht leer sein.";
  if (name.length > 20) return "Der Anmeldename darf maximal 20 Zeichen lang sein.";
  if (/[\s"/\\[\]:;|=,+*?<>]/.test(name))
    return 'Der Anmeldename darf keine Leerzeichen oder Zeichen wie " / \\ [ ] : ; | = , + * ? < > enthalten.';
  return null;
}

type AdLabState = {
  users: AdUser[];
  selectedOu: string;
  createDialogOpen: boolean;
  mistakeCount: number;

  selectOu: (ou: string) => void;
  openCreateDialog: () => void;
  closeCreateDialog: () => void;
  createUser: (firstName: string, lastName: string, logonName: string) => { ok: boolean; message: string };
  deleteUser: (logonName: string) => void;
  reset: () => void;
};

export const useAdLabStore = create<AdLabState>((set, get) => ({
  users: [],
  selectedOu: TARGET_OU,
  createDialogOpen: false,
  mistakeCount: 0,

  selectOu: (ou) => set({ selectedOu: ou }),
  openCreateDialog: () => set({ createDialogOpen: true }),
  closeCreateDialog: () => set({ createDialogOpen: false }),

  createUser: (firstName, lastName, logonName) => {
    if (!firstName.trim()) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: "Der Vorname darf nicht leer sein." };
    }
    if (!lastName.trim()) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: "Der Nachname darf nicht leer sein." };
    }
    const logonError = validateLogonName(logonName);
    if (logonError) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: logonError };
    }
    if (get().users.some((u) => u.logonName.toLowerCase() === logonName.toLowerCase())) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: `Ein Benutzer mit dem Anmeldenamen "${logonName}" existiert bereits.` };
    }
    const user: AdUser = { firstName, lastName, logonName, ou: get().selectedOu, createdAt: Date.now() };
    set((s) => ({ users: [...s.users, user], createDialogOpen: false }));
    return {
      ok: true,
      message: `Benutzer "${firstName} ${lastName}" (${logonName}) wurde in "${user.ou}" erstellt.`,
    };
  },

  deleteUser: (logonName) => {
    set((s) => ({ users: s.users.filter((u) => u.logonName.toLowerCase() !== logonName.toLowerCase()) }));
  },

  reset: () => set({ users: [], selectedOu: TARGET_OU, createDialogOpen: false, mistakeCount: 0 }),
}));
