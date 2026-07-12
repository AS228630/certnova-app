"use client";

import { useEffect, useRef } from "react";
import { ExternalLink, X } from "lucide-react";
import { useCommunityStore } from "@/lib/store/communityStore";

// Video/voice calling via Jitsi Meet's free public server (meet.jit.si).
//
// IMPORTANT — why this opens a new tab instead of an embedded iframe:
// meet.jit.si officially disconnects any call after 5 minutes when it
// detects it's running inside an iframe on a third-party site (their
// own wording: "Embedding meet.jit.si is intended only for demo
// purposes, so this call will disconnect in 5 minutes"). This has been
// their policy since May 2023 and is enforced server-side — no
// configOverwrite/interfaceConfigOverwrite option can turn it off, so
// the previous iframe-based implementation was unusable for real
// sessions. Opening meet.jit.si directly in its own browser tab (not
// embedded) is not subject to that 5-minute limit and remains
// completely free with no account and no time cap. The trade-off is
// that the call now runs in a separate tab instead of inside our own
// page chrome.
const JITSI_DOMAIN = "meet.jit.si";

export default function VideoCallRoom({
  roomName,
  onClose,
  audioOnly = false,
}: {
  roomName: string;
  onClose: () => void;
  audioOnly?: boolean;
}) {
  const userName = useCommunityStore((s) => s.userName);
  const openedRef = useRef(false);

  useEffect(() => {
    if (openedRef.current) return;
    openedRef.current = true;

    const params = new URLSearchParams();
    if (userName) params.set("userInfo.displayName", userName);
    if (audioOnly) params.set("config.startWithVideoMuted", "true");
    const query = params.toString();
    const url = `https://${JITSI_DOMAIN}/${encodeURIComponent(roomName)}${
      query ? `#${query}` : ""
    }`;

    window.open(url, "_blank", "noopener,noreferrer");
  }, [roomName, audioOnly, userName]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/90 p-6 text-center">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-white/70 hover:text-white"
      >
        <X size={22} />
      </button>
      <ExternalLink size={32} className="text-white/60" />
      <p className="max-w-sm text-sm text-white/80">
        Der Anruf wurde in einem neuen Tab geöffnet (meet.jit.si). Falls sich
        kein Tab geöffnet hat, hat dein Browser das Öffnen evtl. blockiert —
        bitte Pop-ups für diese Seite erlauben und erneut versuchen.
      </p>
      <p className="max-w-sm text-xs text-white/40">
        Raum: {roomName}
      </p>
      <button
        onClick={onClose}
        className="mt-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-white"
      >
        Schließen
      </button>
    </div>
  );
}
