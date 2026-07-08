"use client";

import { useRef, useState } from "react";
import { Pencil, Loader2 } from "lucide-react";
import { useProfileStore } from "@/lib/store/profileStore";

export default function AvatarUpload({
  userId,
  initial,
  size = 96,
}: {
  userId: string;
  initial: string;
  size?: number;
}) {
  const profile = useProfileStore((s) => s.profile);
  const uploading = useProfileStore((s) => s.uploading);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError(null);
    const result = await useProfileStore.getState().uploadAvatar(userId, file);
    if (!result.ok) setError(result.error ?? "Upload fehlgeschlagen.");
  }

  return (
    <div className="relative flex-none" style={{ width: size, height: size }}>
      <div
        className="flex items-center justify-center overflow-hidden rounded-full border-4 border-primary/40 bg-panel-alt"
        style={{ width: size, height: size }}
      >
        {profile?.avatar_url ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={profile.avatar_url} alt="Profilbild" className="h-full w-full object-cover" />
        ) : (
          <span className="text-2xl font-bold text-primary">{initial}</span>
        )}
      </div>

      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        aria-label="Profilbild ändern"
        className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-panel bg-primary text-white shadow-md hover:bg-primary-dark disabled:opacity-60"
      >
        {uploading ? <Loader2 size={14} className="animate-spin" /> : <Pencil size={14} />}
      </button>

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      {error && (
        <p className="absolute left-1/2 top-full mt-2 w-48 -translate-x-1/2 rounded-lg bg-danger/10 p-2 text-center text-[11px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
