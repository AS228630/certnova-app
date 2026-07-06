"use client";

import { create } from "zustand";

export type M365User = {
  displayName: string;
  username: string;
  password: string;
  license: string;
  createdAt: number;
};

export const M365_DOMAIN = "certcoach-lab.onmicrosoft.com";

export const M365_LICENSES = [
  "Microsoft 365 E5",
  "Microsoft 365 E3",
  "Microsoft 365 Business Standard",
  "Keine Lizenz",
] as const;

// Real Microsoft 365 username rule: local-part before @ can't contain spaces
// or most special characters, and can't be empty.
export function validateUsername(name: string): string | null {
  if (!name) return "Der Benutzername darf nicht leer sein.";
  if (!/^[a-zA-Z0-9._-]+$/.test(name))
    return "Nur Buchstaben, Zahlen, Punkte, Bindestriche und Unterstriche sind erlaubt.";
  if (name.length > 64) return "Der Benutzername darf maximal 64 Zeichen lang sein.";
  return null;
}

type M365LabState = {
  users: M365User[];
  createDialogOpen: boolean;
  mistakeCount: number;

  openCreateDialog: () => void;
  closeCreateDialog: () => void;
  createUser: (
    displayName: string,
    username: string,
    password: string,
    license: string
  ) => { ok: boolean; message: string };
  deleteUser: (username: string) => void;
  reset: () => void;
};

export const useM365LabStore = create<M365LabState>((set, get) => ({
  users: [],
  createDialogOpen: false,
  mistakeCount: 0,

  openCreateDialog: () => set({ createDialogOpen: true }),
  closeCreateDialog: () => set({ createDialogOpen: false }),

  createUser: (displayName, username, password, license) => {
    if (!displayName.trim()) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: "Der Anzeigename darf nicht leer sein." };
    }
    const usernameError = validateUsername(username);
    if (usernameError) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: usernameError };
    }
    if (get().users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: `Der Benutzername "${username}@${M365_DOMAIN}" ist bereits vergeben.` };
    }
    if (password.length < 8) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: "Das Passwort muss mindestens 8 Zeichen lang sein." };
    }
    const user: M365User = { displayName, username, password, license, createdAt: Date.now() };
    set((s) => ({ users: [...s.users, user], createDialogOpen: false }));
    return {
      ok: true,
      message: `Benutzer "${displayName}" (${username}@${M365_DOMAIN}) wurde erstellt.`,
    };
  },

  deleteUser: (username) => {
    set((s) => ({ users: s.users.filter((u) => u.username.toLowerCase() !== username.toLowerCase()) }));
  },

  reset: () => set({ users: [], createDialogOpen: false, mistakeCount: 0 }),
}));
