"use client";

import { create } from "zustand";

export type S3Bucket = {
  name: string;
  region: string;
  blockPublicAccess: boolean;
  createdAt: number;
};

export const AWS_REGIONS = [
  { value: "eu-central-1", label: "Europe (Frankfurt) eu-central-1" },
  { value: "eu-west-1", label: "Europe (Ireland) eu-west-1" },
  { value: "us-east-1", label: "US East (N. Virginia) us-east-1" },
] as const;

export const TARGET_BUCKET_REGION = "eu-central-1";

// Real S3 naming rules: 3-63 chars, lowercase letters/numbers/hyphens/periods,
// must start and end with a letter or number.
export function validateBucketName(name: string): string | null {
  if (!name) return "Der Bucket-Name darf nicht leer sein.";
  if (name.length < 3 || name.length > 63) return "Der Name muss zwischen 3 und 63 Zeichen lang sein.";
  if (!/^[a-z0-9.-]+$/.test(name))
    return "Nur Kleinbuchstaben, Zahlen, Punkte und Bindestriche sind erlaubt.";
  if (!/^[a-z0-9]/.test(name) || !/[a-z0-9]$/.test(name))
    return "Der Name muss mit einem Buchstaben oder einer Zahl beginnen und enden.";
  if (name.includes("..")) return "Der Name darf keine aufeinanderfolgenden Punkte enthalten.";
  return null;
}

type AwsLabState = {
  buckets: S3Bucket[];
  activeView: "list" | "create";
  mistakeCount: number;

  openCreateView: () => void;
  closeCreateView: () => void;
  createBucket: (name: string, region: string, blockPublicAccess: boolean) => { ok: boolean; message: string };
  deleteBucket: (name: string) => void;
  reset: () => void;
};

export const useAwsLabStore = create<AwsLabState>((set, get) => ({
  buckets: [],
  activeView: "list",
  mistakeCount: 0,

  openCreateView: () => set({ activeView: "create" }),
  closeCreateView: () => set({ activeView: "list" }),

  createBucket: (name, region, blockPublicAccess) => {
    const nameError = validateBucketName(name);
    if (nameError) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: nameError };
    }
    if (get().buckets.some((b) => b.name.toLowerCase() === name.toLowerCase())) {
      set((s) => ({ mistakeCount: s.mistakeCount + 1 }));
      return { ok: false, message: `Ein Bucket namens "${name}" existiert bereits (Bucket-Namen sind global eindeutig).` };
    }
    const bucket: S3Bucket = { name, region, blockPublicAccess, createdAt: Date.now() };
    set((s) => ({ buckets: [...s.buckets, bucket], activeView: "list" }));
    return { ok: true, message: `Bucket "${name}" wurde erfolgreich erstellt.` };
  },

  deleteBucket: (name) => {
    set((s) => ({ buckets: s.buckets.filter((b) => b.name.toLowerCase() !== name.toLowerCase()) }));
  },

  reset: () => set({ buckets: [], activeView: "list", mistakeCount: 0 }),
}));
