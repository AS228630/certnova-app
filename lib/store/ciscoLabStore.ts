import { create } from "zustand";

export const TARGET_HOSTNAME = "CC-Lab-R1";
export const TARGET_INTERFACE = "GigabitEthernet0/0";
export const TARGET_IP = "192.168.1.1";
export const TARGET_MASK = "255.255.255.0";

export type CiscoMode = "user" | "privileged" | "config" | "config-if";

export type CiscoInterface = {
  name: string;
  ip?: string;
  mask?: string;
  enabled: boolean;
};

type CiscoLabState = {
  mode: CiscoMode;
  hostname: string;
  hasEnteredPrivileged: boolean;
  currentInterface: string | null;
  interfaces: CiscoInterface[];
  setMode: (mode: CiscoMode) => void;
  setHostname: (name: string) => void;
  markPrivileged: () => void;
  enterInterface: (name: string) => void;
  setInterfaceIp: (name: string, ip: string, mask: string) => void;
  setInterfaceEnabled: (name: string, enabled: boolean) => void;
  reset: () => void;
};

const initialState = {
  mode: "user" as CiscoMode,
  hostname: "Router",
  hasEnteredPrivileged: false,
  currentInterface: null as string | null,
  interfaces: [] as CiscoInterface[],
};

export const useCiscoLabStore = create<CiscoLabState>((set, get) => ({
  ...initialState,
  setMode: (mode) => set({ mode }),
  setHostname: (name) => set({ hostname: name }),
  markPrivileged: () => set({ hasEnteredPrivileged: true }),
  enterInterface: (name) => {
    const exists = get().interfaces.some((i) => i.name === name);
    set({
      currentInterface: name,
      interfaces: exists ? get().interfaces : [...get().interfaces, { name, enabled: false }],
    });
  },
  setInterfaceIp: (name, ip, mask) =>
    set({
      interfaces: get().interfaces.map((i) => (i.name === name ? { ...i, ip, mask } : i)),
    }),
  setInterfaceEnabled: (name, enabled) =>
    set({
      interfaces: get().interfaces.map((i) => (i.name === name ? { ...i, enabled } : i)),
    }),
  reset: () => set({ ...initialState, interfaces: [] }),
}));
