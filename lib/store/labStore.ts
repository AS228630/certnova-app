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

export type VirtualMachine = {
  name: string;
  resourceGroup: string;
  location: string;
  size: string;
  image: string;
  adminUsername: string;
  status: "Running" | "Stopped";
  createdAt: number;
};

export type VirtualNetwork = {
  name: string;
  resourceGroup: string;
  location: string;
  addressSpace: string;
  subnetName: string;
  subnetPrefix: string;
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
export const TARGET_VM_NAME = "CC-Lab-VM";
export const VM_SIZES = ["Standard_B1s", "Standard_B2s", "Standard_D2s_v3"] as const;
export const VM_IMAGES = ["Ubuntu Server 22.04 LTS", "Windows Server 2022 Datacenter"] as const;
export const TARGET_VNET_NAME = "CC-Lab-VNet";
export const DEFAULT_ADDRESS_SPACE = "10.0.0.0/16";
export const DEFAULT_SUBNET_NAME = "default";
export const DEFAULT_SUBNET_PREFIX = "10.0.0.0/24";

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

// Real Azure naming rule for VMs: 1-64 chars, letters/numbers/hyphens, can't end with a hyphen.
export function validateVmName(name: string): string | null {
  if (!name) return "Der Name der virtuellen Maschine darf nicht leer sein.";
  if (name.length > 64) return "Der Name darf maximal 64 Zeichen lang sein.";
  if (!/^[a-zA-Z0-9-]+$/.test(name))
    return "Nur Buchstaben, Zahlen und Bindestriche sind erlaubt.";
  if (name.endsWith("-")) return "Der Name darf nicht mit einem Bindestrich enden.";
  return null;
}

// Azure naming rule for VNets/subnets: 1-64 chars, letters/numbers/hyphens/periods/underscores.
export function validateVnetName(name: string): string | null {
  if (!name) return "Der Name des virtuellen Netzwerks darf nicht leer sein.";
  if (name.length > 64) return "Der Name darf maximal 64 Zeichen lang sein.";
  if (!/^[a-zA-Z0-9._-]+$/.test(name))
    return "Nur Buchstaben, Zahlen, Punkte, Bindestriche und Unterstriche sind erlaubt.";
  return null;
}

// Basic CIDR notation check (e.g. 10.0.0.0/16) — not a full subnet-math validator,
// but enough to catch the mistakes learners actually make.
export function validateCidr(value: string): string | null {
  if (!value) return "Der Adressbereich darf nicht leer sein.";
  const match = value.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/);
  if (!match) return "Format muss CIDR-Notation sein, z.B. 10.0.0.0/16.";
  const octets = [match[1], match[2], match[3], match[4]].map(Number);
  const prefix = Number(match[5]);
  if (octets.some((o) => o > 255)) return "Ungültige IP-Adresse: Oktette dürfen nicht größer als 255 sein.";
  if (prefix > 32) return "Ungültiges Präfix: muss zwischen 0 und 32 liegen.";
  return null;
}

type LabState = {
  resourceGroups: ResourceGroup[];
  storageAccounts: StorageAccount[];
  virtualMachines: VirtualMachine[];
  virtualNetworks: VirtualNetwork[];
  cliLog: CliLine[];
  activeSection: "resource-groups" | "storage-accounts" | "virtual-machines" | "virtual-networks";
  activeBlade: "list" | "create";
  mistakeCount: number;
  startedAt: number;
  chaosActive: boolean;

  setSection: (section: LabState["activeSection"]) => void;
  createResourceGroup: (name: string, location: string) => { ok: boolean; message: string };
  createStorageAccount: (
    name: string,
    resourceGroup: string,
    location: string
  ) => { ok: boolean; message: string };
  createVirtualMachine: (
    name: string,
    resourceGroup: string,
    location: string,
    size: string,
    image: string,
    adminUsername: string
  ) => { ok: boolean; message: string };
  createVirtualNetwork: (
    name: string,
    resourceGroup: string,
    location: string,
    addressSpace: string,
    subnetName: string,
    subnetPrefix: string
  ) => { ok: boolean; message: string };
  deleteResourceGroup: (name: string) => void;
  deleteStorageAccount: (name: string) => void;
  deleteVirtualMachine: (name: string) => void;
  deleteVirtualNetwork: (name: string) => void;
  activateChaos: () => void;
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
  virtualMachines: [],
  virtualNetworks: [],
  cliLog: initialCliLog,
  activeSection: "resource-groups",
  activeBlade: "list",
  mistakeCount: 0,
  startedAt: Date.now(),
  chaosActive: false,

  setSection: (section) => set({ activeSection: section, activeBlade: "list" }),
  openCreateBlade: () => set({ activeBlade: "create" }),
  closeCreateBlade: () => set({ activeBlade: "list" }),

  activateChaos: () => {
    if (get().chaosActive || get().resourceGroups.length > 0) return;
    set({
      chaosActive: true,
      resourceGroups: [{ name: TARGET_RG_NAME, location: "eastus", createdAt: Date.now() }],
      cliLog: [
        ...get().cliLog,
        {
          type: "err",
          text: `⚠ Chaos Mode: Ein Kollege hat bereits "${TARGET_RG_NAME}" angelegt — aber in der falschen Region (East US statt West Europe). Finde und behebe den Fehler (Region ist unveränderlich — lösche die Gruppe und erstelle sie neu).`,
        },
      ],
    });
  },

  deleteResourceGroup: (name) => {
    set((s) => ({
      resourceGroups: s.resourceGroups.filter((rg) => rg.name.toLowerCase() !== name.toLowerCase()),
      storageAccounts: s.storageAccounts.filter((sa) => sa.resourceGroup.toLowerCase() !== name.toLowerCase()),
    }));
  },

  deleteStorageAccount: (name) => {
    set((s) => ({
      storageAccounts: s.storageAccounts.filter((sa) => sa.name.toLowerCase() !== name.toLowerCase()),
    }));
  },

  deleteVirtualMachine: (name) => {
    set((s) => ({
      virtualMachines: s.virtualMachines.filter((vm) => vm.name.toLowerCase() !== name.toLowerCase()),
    }));
  },

  deleteVirtualNetwork: (name) => {
    set((s) => ({
      virtualNetworks: s.virtualNetworks.filter((vnet) => vnet.name.toLowerCase() !== name.toLowerCase()),
    }));
  },

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

  createVirtualMachine: (name, resourceGroup, location, size, image, adminUsername) => {
    const nameError = validateVmName(name);
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
    if (get().virtualMachines.some((vm) => vm.name.toLowerCase() === name.toLowerCase())) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: `Eine virtuelle Maschine namens "${name}" existiert bereits.` };
    }
    if (!adminUsername.trim()) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: "Der Administratorbenutzername darf nicht leer sein." };
    }
    const vm: VirtualMachine = {
      name,
      resourceGroup,
      location,
      size,
      image,
      adminUsername,
      status: "Running",
      createdAt: Date.now(),
    };
    set((s) => ({ virtualMachines: [...s.virtualMachines, vm], activeBlade: "list" }));
    return { ok: true, message: `Virtuelle Maschine "${name}" wurde erfolgreich erstellt und wird ausgeführt.` };
  },

  createVirtualNetwork: (name, resourceGroup, location, addressSpace, subnetName, subnetPrefix) => {
    const nameError = validateVnetName(name);
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
    if (get().virtualNetworks.some((v) => v.name.toLowerCase() === name.toLowerCase())) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: `Ein virtuelles Netzwerk namens "${name}" existiert bereits.` };
    }
    const addressError = validateCidr(addressSpace);
    if (addressError) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: `Adressbereich ungültig: ${addressError}` };
    }
    const subnetError = validateCidr(subnetPrefix);
    if (subnetError) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: `Subnetz-Präfix ungültig: ${subnetError}` };
    }
    const vnet: VirtualNetwork = {
      name,
      resourceGroup,
      location,
      addressSpace,
      subnetName: subnetName || DEFAULT_SUBNET_NAME,
      subnetPrefix,
      createdAt: Date.now(),
    };
    set((s) => ({ virtualNetworks: [...s.virtualNetworks, vnet], activeBlade: "list" }));
    return { ok: true, message: `Virtuelles Netzwerk "${name}" wurde erfolgreich erstellt.` };
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

    if (/^az\s+vm\s+create/i.test(text)) {
      if (!nameMatch || !rgMatch) {
        set((s) => ({
          cliLog: [
            ...s.cliLog,
            {
              type: "err",
              text: "Fehler: --name und --resource-group sind erforderlich, z.B. --name CC-Lab-VM --resource-group CC-Lab-RG",
            },
          ],
          mistakeCount: s.mistakeCount + 1,
        }));
        return;
      }
      const name = nameMatch[1];
      const rg = rgMatch[1];
      const location = normalizeLocation(locMatch?.[1] ?? "westeurope");
      const imageMatch = text.match(/--image\s+"?([^\s"]+)"?/i);
      const sizeMatch = text.match(/--size\s+"?([^\s"]+)"?/i);
      const userMatch =
        text.match(/--admin-username\s+"?([^\s"]+)"?/i) ?? text.match(/-u\s+"?([^\s"]+)"?/i);
      const size = sizeMatch?.[1] ?? "Standard_B1s";
      const image = imageMatch?.[1] ?? "Ubuntu2204";
      const adminUsername = userMatch?.[1] ?? "azureuser";
      const result = get().createVirtualMachine(name, rg, location, size, image, adminUsername);
      set((s) => ({
        cliLog: [
          ...s.cliLog,
          result.ok
            ? {
                type: "out",
                text: `${result.message}\nResourceGroup: ${rg}\nLocation: ${location}\nSize: ${size}\nImage: ${image}`,
              }
            : { type: "err", text: result.message },
        ],
      }));
      return;
    }

    if (/^az\s+vm\s+list/i.test(text)) {
      const vms = get().virtualMachines;
      if (vms.length === 0) {
        set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: "[]" }] }));
        return;
      }
      const table = [
        "Name          ResourceGroup   Location    PowerState",
        "------------  --------------  ----------  -----------",
        ...vms.map((vm) => `${vm.name.padEnd(14)}${vm.resourceGroup.padEnd(16)}${vm.location.padEnd(12)}${vm.status}`),
      ].join("\n");
      set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: table }] }));
      return;
    }

    if (/^az\s+vm\s+delete/i.test(text)) {
      if (!nameMatch) {
        set((s) => ({
          cliLog: [...s.cliLog, { type: "err", text: "Fehler: --name ist erforderlich." }],
          mistakeCount: s.mistakeCount + 1,
        }));
        return;
      }
      get().deleteVirtualMachine(nameMatch[1]);
      set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: `Virtuelle Maschine "${nameMatch[1]}" gelöscht.` }] }));
      return;
    }

    if (/^az\s+network\s+vnet\s+create/i.test(text)) {
      if (!nameMatch || !rgMatch) {
        set((s) => ({
          cliLog: [
            ...s.cliLog,
            {
              type: "err",
              text: "Fehler: --name und --resource-group sind erforderlich, z.B. --name CC-Lab-VNet --resource-group CC-Lab-RG",
            },
          ],
          mistakeCount: s.mistakeCount + 1,
        }));
        return;
      }
      const name = nameMatch[1];
      const rg = rgMatch[1];
      const location = normalizeLocation(locMatch?.[1] ?? "westeurope");
      const addressMatch = text.match(/--address-prefix(?:es)?\s+"?([^\s"]+)"?/i);
      const subnetNameMatch = text.match(/--subnet-name\s+"?([^\s"]+)"?/i);
      const subnetPrefixMatch = text.match(/--subnet-prefix(?:es)?\s+"?([^\s"]+)"?/i);
      const addressSpace = addressMatch?.[1] ?? DEFAULT_ADDRESS_SPACE;
      const subnetName = subnetNameMatch?.[1] ?? DEFAULT_SUBNET_NAME;
      const subnetPrefix = subnetPrefixMatch?.[1] ?? DEFAULT_SUBNET_PREFIX;
      const result = get().createVirtualNetwork(name, rg, location, addressSpace, subnetName, subnetPrefix);
      set((s) => ({
        cliLog: [
          ...s.cliLog,
          result.ok
            ? {
                type: "out",
                text: `${result.message}\nResourceGroup: ${rg}\nLocation: ${location}\nAddressSpace: ${addressSpace}\nSubnet: ${subnetName} (${subnetPrefix})`,
              }
            : { type: "err", text: result.message },
        ],
      }));
      return;
    }

    if (/^az\s+network\s+vnet\s+list/i.test(text)) {
      const vnets = get().virtualNetworks;
      if (vnets.length === 0) {
        set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: "[]" }] }));
        return;
      }
      const table = [
        "Name           ResourceGroup   Location    AddressSpace",
        "-------------  --------------  ----------  --------------",
        ...vnets.map(
          (v) => `${v.name.padEnd(15)}${v.resourceGroup.padEnd(16)}${v.location.padEnd(12)}${v.addressSpace}`
        ),
      ].join("\n");
      set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: table }] }));
      return;
    }

    if (/^az\s+network\s+vnet\s+delete/i.test(text)) {
      if (!nameMatch) {
        set((s) => ({
          cliLog: [...s.cliLog, { type: "err", text: "Fehler: --name ist erforderlich." }],
          mistakeCount: s.mistakeCount + 1,
        }));
        return;
      }
      get().deleteVirtualNetwork(nameMatch[1]);
      set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: `Virtuelles Netzwerk "${nameMatch[1]}" gelöscht.` }] }));
      return;
    }

    if (/^az\s+group\s+delete/i.test(text)) {
      if (!nameMatch) {
        set((s) => ({
          cliLog: [...s.cliLog, { type: "err", text: "Fehler: --name ist erforderlich." }],
          mistakeCount: s.mistakeCount + 1,
        }));
        return;
      }
      get().deleteResourceGroup(nameMatch[1]);
      set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: `Ressourcengruppe "${nameMatch[1]}" gelöscht.` }] }));
      return;
    }

    if (/^az\s+storage\s+account\s+delete/i.test(text)) {
      if (!nameMatch) {
        set((s) => ({
          cliLog: [...s.cliLog, { type: "err", text: "Fehler: --name ist erforderlich." }],
          mistakeCount: s.mistakeCount + 1,
        }));
        return;
      }
      get().deleteStorageAccount(nameMatch[1]);
      set((s) => ({ cliLog: [...s.cliLog, { type: "out", text: `Speicherkonto "${nameMatch[1]}" gelöscht.` }] }));
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
          text: `Befehl nicht erkannt: "${text}". Unterstützt: az group create, az group list, az storage account create, az storage account list, az vm create, az vm list, az network vnet create, az network vnet list, clear`,
        },
      ],
      mistakeCount: s.mistakeCount + 1,
    }));
  },

  reset: () =>
    set({
      resourceGroups: [],
      storageAccounts: [],
      virtualMachines: [],
      virtualNetworks: [],
      cliLog: initialCliLog,
      activeSection: "resource-groups",
      activeBlade: "list",
      mistakeCount: 0,
      startedAt: Date.now(),
      chaosActive: false,
    }),
}));
