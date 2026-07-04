"use client";

import { create } from "zustand";

export type ResourceGroup = {
  name: string;
  location: string;
  createdAt: number;
};

export type StorageAccount = {
  name: string;
  resourceGroup: string;
  location: string;
  createdAt: number;
};

export type CliLine =
  | { type: "cmd"; text: string }
  | { type: "out"; text: string }
  | { type: "err"; text: string };

// The lab's target/expected values — what the learner is asked to create.
export const TARGET_RG_NAME = "CC-Lab-RG";
export const TARGET_LOCATION_LABEL = "West Europe";
export const TARGET_LOCATION_VALUE = "westeurope";
export const TARGET_STORAGE_PREFIX = "certcoach";

function normalizeLocation(raw: string) {
  return raw.toLowerCase().replace(/\s+/g, "");
}

// Real Azure naming rule: 3-24 chars, lowercase letters and numbers only.
export function validateStorageAccountName(name: string): string | null {
  if (!name) return "Der Name des Speicherkontos darf nicht leer sein.";
  if (name.length < 3 || name.length > 24)
    return "Der Name muss zwischen 3 und 24 Zeichen lang sein.";
  if (!/^[a-z0-9]+$/.test(name))
    return "Nur Kleinbuchstaben und Zahlen sind erlaubt (keine Bindestriche oder Großbuchstaben).";
  return null;
}

type LabState = {
  resourceGroups: ResourceGroup[];
  storageAccounts: StorageAccount[];
  cliLog: CliLine[];
  activeSection: "resource-groups" | "storage-accounts";
  activeBlade: "list" | "create";
  mistakeCount: number;

  setSection: (section: LabState["activeSection"]) => void;
  createResourceGroup: (name: string, location: string) => { ok: boolean; message: string };
  createStorageAccount: (
    name: string,
    resourceGroup: string,
    location: string
  ) => { ok: boolean; message: string };
  openCreateBlade: () => void;
  closeCreateBlade: () => void;
  runCliCommand: (raw: string) => void;
  reset: () => void;
};

const initialCliLog: CliLine[] = [
  { type: "out", text: "Willkommen in der Azure Cloud Shell (Simulation)." },
  { type: "out", text: "Gib z.B. ein: az group create --name CC-Lab-RG --location westeurope" },
];

export const useLabStore = create<LabState>((set, get) => ({
  resourceGroups: [],
  storageAccounts: [],
  cliLog: initialCliLog,
  activeSection: "resource-groups",
  activeBlade: "list",
  mistakeCount: 0,

  setSection: (section) => set({ activeSection: section, activeBlade: "list" }),
  openCreateBlade: () => set({ activeBlade: "create" }),
  closeCreateBlade: () => set({ activeBlade: "list" }),

  createResourceGroup: (name, location) => {
    if (!name.trim()) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: "Der Name der Ressourcengruppe darf nicht leer sein." };
    }
    if (get().resourceGroups.some((rg) => rg.name.toLowerCase() === name.toLowerCase())) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: `Eine Ressourcengruppe namens "${name}" existiert bereits.` };
    }
    const rg: ResourceGroup = { name, location, createdAt: Date.now() };
    set((s) => ({ resourceGroups: [...s.resourceGroups, rg], activeBlade: "list" }));
    return { ok: true, message: `Ressourcengruppe "${name}" wurde erfolgreich erstellt.` };
  },

  createStorageAccount: (name, resourceGroup, location) => {
    const nameError = validateStorageAccountName(name);
    if (nameError) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: nameError };
    }
    if (!get().resourceGroups.some((rg) => rg.name.toLowerCase() === resourceGroup.toLowerCase())) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return {
        ok: false,
        message: `Ressourcengruppe "${resourceGroup}" existiert nicht. Erstelle zuerst eine Ressourcengruppe.`,
      };
    }
    if (get().storageAccounts.some((sa) => sa.name.toLowerCase() === name.toLowerCase())) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: `Der Name "${name}" ist bereits vergeben (muss global eindeutig sein).` };
    }
    const sa: StorageAccount = { name, resourceGroup, location, createdAt: Date.now() };
    set((s) => ({ storageAccounts: [...s.storageAccounts, sa], activeBlade: "list" }));
    return { ok: true, message: `Speicherkonto "${name}" wurde erfolgreich erstellt.` };
  },

  runCliCommand: (raw) => {
    const text = raw.trim();
    if (!text) return;
    set((s) => ({ cliLog: [...s.cliLog, { type: "cmd", text }] }));

    const nameMatch = text.match(/--name\s+"?([^\s"]+)"?/i) ?? text.match(/-n\s+"?([^\s"]+)"?/i);
    const locMatch = text.match(/--location\s+"?([^\s"]+)"?/i) ?? text.match(/-l\s+"?([^\s"]+)"?/i);
    const rgMatch =
      text.match(/--resource-group\s+"?([^\s"]+)"?/i) ?? text.match(/-g\s+"?([^\s"]+)"?/i);

    if (/^az\s+group\s+create/i.test(text)) {
      if (!nameMatch) {
        set((s) => ({
          cliLog: [...s.cliLog, { type: "err", text: "Fehler: --name ist erforderlich, z.B. --name CC-Lab-RG" }],
          mistakeCount: s.mistakeCount + 1,
        }));
        return;
      }
      const name = nameMatch[1];
      const location = normalizeLocation(locMatch?.[1] ?? "westeurope");
      const result = get().createResourceGroup(name, location);
      set((s) => ({
        cliLog: [
          ...s.cliLog,
          result.ok
            ? { type: "out", text: `${result.message}\nLocation: ${location}` }
            : { type: "err", text: result.message },
        ],
      }));
      return;
    }

    if (/^az\s+group\s+list/i.test(text)) {
      const rgs = get().resourceGroups;
      if (rgs.length === 0) {
        set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: "[]" }] }));
        return;
      }
      const table = [
        "Name          Location",
        "------------  ----------",
        ...rgs.map((rg) => `${rg.name.padEnd(14)}${rg.location}`),
      ].join("\n");
      set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: table }] }));
      return;
    }

    if (/^az\s+storage\s+account\s+create/i.test(text)) {
      if (!nameMatch || !rgMatch) {
        set((s) => ({
          cliLog: [
            ...s.cliLog,
            {
              type: "err",
              text: "Fehler: --name und --resource-group sind erforderlich, z.B. --name certcoachstorage --resource-group CC-Lab-RG",
            },
          ],
          mistakeCount: s.mistakeCount + 1,
        }));
        return;
      }
      const name = nameMatch[1];
      const rg = rgMatch[1];
      const location = normalizeLocation(locMatch?.[1] ?? "westeurope");
      const result = get().createStorageAccount(name, rg, location);
      set((s) => ({
        cliLog: [
          ...s.cliLog,
          result.ok
            ? { type: "out", text: `${result.message}\nResourceGroup: ${rg}\nLocation: ${location}\nSku: Standard_LRS` }
            : { type: "err", text: result.message },
        ],
      }));
      return;
    }

    if (/^az\s+storage\s+account\s+list/i.test(text)) {
      const sas = get().storageAccounts;
      if (sas.length === 0) {
        set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: "[]" }] }));
        return;
      }
      const table = [
        "Name                  ResourceGroup   Location",
        "--------------------  --------------  ----------",
        ...sas.map((sa) => `${sa.name.padEnd(22)}${sa.resourceGroup.padEnd(16)}${sa.location}`),
      ].join("\n");
      set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: table }] }));
      return;
    }

    if (/^clear$/i.test(text)) {
      set({ cliLog: [] });
      return;
    }

    set((s) => ({
      cliLog: [
        ...s.cliLog,
        {
          type: "err",
          text: `Befehl nicht erkannt: "${text}". Unterstützt: az group create, az group list, az storage account create, az storage account list, clear`,
        },
      ],
      mistakeCount: s.mistakeCount + 1,
    }));
  },

  reset: () =>
    set({
      resourceGroups: [],
      storageAccounts: [],
      cliLog: initialCliLog,
      activeSection: "resource-groups",
      activeBlade: "list",
      mistakeCount: 0,
    }),
}));
