"use client";

import { create } from "zustand";

export type ResourceGroup = {
  name: string;
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

type LabState = {
  resourceGroups: ResourceGroup[];
  cliLog: CliLine[];
  activeBlade: "list" | "create";
  mistakeCount: number;

  createResourceGroup: (name: string, location: string) => { ok: boolean; message: string };
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
  cliLog: initialCliLog,
  activeBlade: "list",
  mistakeCount: 0,

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

  runCliCommand: (raw) => {
    const text = raw.trim();
    if (!text) return;
    set((s) => ({ cliLog: [...s.cliLog, { type: "cmd", text }] }));

    const nameMatch = text.match(/--name\s+"?([^\s"]+)"?/i) ?? text.match(/-n\s+"?([^\s"]+)"?/i);
    const locMatch =
      text.match(/--location\s+"?([^\s"]+)"?/i) ?? text.match(/-l\s+"?([^\s"]+)"?/i);

    if (/^az\s+group\s+create/i.test(text)) {
      if (!nameMatch) {
        set((s) => ({
          cliLog: [
            ...s.cliLog,
            { type: "err", text: "Fehler: --name ist erforderlich, z.B. --name CC-Lab-RG" },
          ],
          mistakeCount: s.mistakeCount + 1,
        }));
        return;
      }
      const name = nameMatch[1];
      const location = locMatch?.[1] ?? "westeurope";
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

    if (/^clear$/i.test(text)) {
      set({ cliLog: [] });
      return;
    }

    set((s) => ({
      cliLog: [
        ...s.cliLog,
        {
          type: "err",
          text: `Befehl nicht erkannt: "${text}". Unterstützt: az group create --name <name> --location <ort>, az group list, clear`,
        },
      ],
      mistakeCount: s.mistakeCount + 1,
    }));
  },

  reset: () =>
    set({
      resourceGroups: [],
      cliLog: initialCliLog,
      activeBlade: "list",
      mistakeCount: 0,
    }),
}));
