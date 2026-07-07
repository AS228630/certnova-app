"use client";

import { create } from "zustand";

export type VSphereVm = {
  name: string;
  host: string;
  guestOs: string;
  cpu: number;
  memoryGb: number;
  diskGb: number;
  status: "Powered On" | "Powered Off";
  createdAt: number;
};

export const ESXI_HOSTS = ["esxi-lab-01.certcoach.local", "esxi-lab-02.certcoach.local"] as const;
export const ESXI_TARGET_HOST = ESXI_HOSTS[0];

export const GUEST_OS_OPTIONS = [
  "Ubuntu Linux (64-bit)",
  "Windows Server 2022 (64-bit)",
  "Red Hat Enterprise Linux 9 (64-bit)",
] as const;

export const CPU_OPTIONS = [1, 2, 4] as const;
export const MEMORY_OPTIONS_GB = [2, 4, 8] as const;

// Real vSphere VM naming rule: 1-80 chars, no leading/trailing whitespace,
// no reserved characters used by the vSphere inventory tree.
export function validateVmName(name: string): string | null {
  if (!name) return "Der Name der virtuellen Maschine darf nicht leer sein.";
  if (name.length > 80) return "Der Name darf maximal 80 Zeichen lang sein.";
  if (/[/\\[\]:*?"<>|]/.test(name))
    return 'Der Name darf keine der folgenden Zeichen enthalten: / \\ [ ] : * ? " < > |';
  return null;
}

type VSphereLabState = {
  vms: VSphereVm[];
  createDialogOpen: boolean;
  mistakeCount: number;

  openCreateDialog: () => void;
  closeCreateDialog: () => void;
  createVm: (
    name: string,
    host: string,
    guestOs: string,
    cpu: number,
    memoryGb: number,
    diskGb: number
  ) => { ok: boolean; message: string };
  powerOff: (name: string) => void;
  powerOn: (name: string) => void;
  deleteVm: (name: string) => void;
  reset: () => void;
};

export const useVSphereLabStore = create<VSphereLabState>((set, get) => ({
  vms: [],
  createDialogOpen: false,
  mistakeCount: 0,

  openCreateDialog: () => set({ createDialogOpen: true }),
  closeCreateDialog: () => set({ createDialogOpen: false }),

  createVm: (name, host, guestOs, cpu, memoryGb, diskGb) => {
    const nameError = validateVmName(name);
    if (nameError) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: nameError };
    }
    if (get().vms.some((v) => v.name.toLowerCase() === name.toLowerCase())) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: `Eine virtuelle Maschine namens "${name}" existiert bereits auf diesem Host.` };
    }
    if (diskGb < 1) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: "Die Festplattengröße muss mindestens 1 GB betragen." };
    }
    const vm: VSphereVm = {
      name,
      host,
      guestOs,
      cpu,
      memoryGb,
      diskGb,
      status: "Powered On",
      createdAt: Date.now(),
    };
    set((s) => ({ vms: [...s.vms, vm], createDialogOpen: false }));
    return { ok: true, message: `Virtuelle Maschine "${name}" wurde erstellt und eingeschaltet.` };
  },

  powerOff: (name) => {
    set((s) => ({
      vms: s.vms.map((v) => (v.name.toLowerCase() === name.toLowerCase() ? { ...v, status: "Powered Off" } : v)),
    }));
  },

  powerOn: (name) => {
    set((s) => ({
      vms: s.vms.map((v) => (v.name.toLowerCase() === name.toLowerCase() ? { ...v, status: "Powered On" } : v)),
    }));
  },

  deleteVm: (name) => {
    set((s) => ({ vms: s.vms.filter((v) => v.name.toLowerCase() !== name.toLowerCase()) }));
  },

  reset: () => set({ vms: [], createDialogOpen: false, mistakeCount: 0 }),
}));
