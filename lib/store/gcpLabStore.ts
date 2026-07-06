"use client";

import { create } from "zustand";

export type GcsBucket = {
  name: string;
  location: string;
  storageClass: string;
  createdAt: number;
};

export const GCP_LOCATIONS = [
  { value: "europe-west3", label: "europe-west3 (Frankfurt)" },
  { value: "europe-west1", label: "europe-west1 (Belgien)" },
  { value: "us-central1", label: "us-central1 (Iowa)" },
] as const;

export const STORAGE_CLASSES = ["Standard", "Nearline", "Coldline", "Archive"] as const;

export const TARGET_LOCATION = "europe-west3";

// Real GCS bucket naming rules: 3-63 chars, lowercase letters/numbers/hyphens/
// underscores/periods, must start and end with a letter or number.
export function validateGcsBucketName(name: string): string | null {
  if (!name) return "Der Bucket-Name darf nicht leer sein.";
  if (name.length < 3 || name.length > 63) return "Der Name muss zwischen 3 und 63 Zeichen lang sein.";
  if (!/^[a-z0-9._-]+$/.test(name))
    return "Nur Kleinbuchstaben, Zahlen, Punkte, Bindestriche und Unterstriche sind erlaubt.";
  if (!/^[a-z0-9]/.test(name) || !/[a-z0-9]$/.test(name))
    return "Der Name muss mit einem Buchstaben oder einer Zahl beginnen und enden.";
  return null;
}

type GcpLabState = {
  buckets: GcsBucket[];
  activeView: "list" | "create";
  mistakeCount: number;

  openCreateView: () => void;
  closeCreateView: () => void;
  createBucket: (name: string, location: string, storageClass: string) => { ok: boolean; message: string };
  deleteBucket: (name: string) => void;
  reset: () => void;
};

export const useGcpLabStore = create<GcpLabState>((set, get) => ({
  buckets: [],
  activeView: "list",
  mistakeCount: 0,

  openCreateView: () => set({ activeView: "create" }),
  closeCreateView: () => set({ activeView: "list" }),

  createBucket: (name, location, storageClass) => {
    const nameError = validateGcsBucketName(name);
    if (nameError) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: nameError };
    }
    if (get().buckets.some((b) => b.name.toLowerCase() === name.toLowerCase())) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: `Ein Bucket namens "${name}" existiert bereits (Bucket-Namen sind global eindeutig).` };
    }
    const bucket: GcsBucket = { name, location, storageClass, createdAt: Date.now() };
    set((s) => ({ buckets: [...s.buckets, bucket], activeView: "list" }));
    return { ok: true, message: `Bucket "${name}" wurde erfolgreich erstellt.` };
  },

  deleteBucket: (name) => {
    set((s) => ({ buckets: s.buckets.filter((b) => b.name.toLowerCase() !== name.toLowerCase()) }));
  },

  reset: () => set({ buckets: [], activeView: "list", mistakeCount: 0 }),
}));
