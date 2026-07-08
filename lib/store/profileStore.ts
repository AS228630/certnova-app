import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
};

type ProfileState = {
  profile: Profile | null;
  loading: boolean;
  uploading: boolean;
  load: (userId: string) => Promise<void>;
  uploadAvatar: (userId: string, file: File) => Promise<{ ok: boolean; error?: string }>;
  updateFields: (userId: string, fields: Partial<Pick<Profile, "full_name" | "bio" | "location">>) => Promise<void>;
  reset: () => void;
};

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  loading: true,
  uploading: false,

  load: async (userId: string) => {
    set({ loading: true });
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
    set({ profile: (data as Profile) ?? null, loading: false });
  },

  uploadAvatar: async (userId: string, file: File) => {
    set({ uploading: true });
    try {
      if (!file.type.startsWith("image/")) {
        return { ok: false, error: "Bitte wähle eine Bilddatei aus." };
      }
      if (file.size > 5 * 1024 * 1024) {
        return { ok: false, error: "Das Bild darf höchstens 5 MB groß sein." };
      }

      const ext = file.name.split(".").pop() || "jpg";
      const path = `${userId}/avatar.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true, cacheControl: "3600" });
      if (uploadError) return { ok: false, error: uploadError.message };

      const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
      // Cache-bust so the new image shows immediately even if the URL path is unchanged.
      const avatarUrl = `${pub.publicUrl}?t=${Date.now()}`;

      const { error: dbError } = await supabase
        .from("profiles")
        .upsert({ id: userId, avatar_url: avatarUrl }, { onConflict: "id" });
      if (dbError) return { ok: false, error: dbError.message };

      set((s) => ({
        profile: s.profile ? { ...s.profile, avatar_url: avatarUrl } : { id: userId, full_name: null, email: null, avatar_url: avatarUrl, bio: null, location: null },
      }));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : "Unbekannter Fehler beim Hochladen." };
    } finally {
      set({ uploading: false });
    }
  },

  updateFields: async (userId, fields) => {
    const current = get().profile;
    set({ profile: current ? { ...current, ...fields } : ({ id: userId, full_name: null, email: null, avatar_url: null, bio: null, location: null, ...fields } as Profile) });
    await supabase.from("profiles").upsert({ id: userId, ...fields }, { onConflict: "id" });
  },

  reset: () => set({ profile: null, loading: true, uploading: false }),
}));
