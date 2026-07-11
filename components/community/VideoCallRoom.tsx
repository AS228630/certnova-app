"use client";

import { useEffect, useRef, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useCommunityStore } from "@/lib/store/communityStore";

// Video/voice calling via Jitsi Meet's free public server (meet.jit.si)
// and its External API — genuinely $0, no account, no API keys, no usage
// caps for normal use (unlike LiveKit, which needs a paid tier past
// 5,000 minutes/month). Trade-off: runs on Jitsi's shared public
// infrastructure rather than dedicated capacity, so reliability depends
// on their servers rather than ours.

declare global {
  interface Window {
    JitsiMeetExternalAPI?: new (domain: string, options: Record<string, unknown>) => {
      dispose: () => void;
      addEventListener: (event: string, cb: () => void) => void;
    };
  }
}

const JITSI_DOMAIN = "meet.jit.si";
const JITSI_SCRIPT_URL = `https://${JITSI_DOMAIN}/external_api.js`;

export default function VideoCallRoom({ roomName, onClose }: { roomName: string; onClose: () => void }) {
  const { t } = useLocale();
  const userName = useCommunityStore((s) => s.userName);
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<InstanceType<NonNullable<typeof window.JitsiMeetExternalAPI>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    function initJitsi() {
      if (cancelled || !containerRef.current || !window.JitsiMeetExternalAPI) return;
      try {
        const api = new window.JitsiMeetExternalAPI(JITSI_DOMAIN, {
          roomName,
          parentNode: containerRef.current,
          userInfo: { displayName: userName || "Teilnehmer" },
          width: "100%",
          height: "100%",
          configOverwrite: { prejoinPageEnabled: false },
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: [
              "microphone", "camera", "desktop", "chat", "raisehand",
              "tileview", "hangup", "fullscreen", "settings",
            ],
          },
        });
        apiRef.current = api;
        api.addEventListener("videoConferenceJoined", () => setLoading(false));
        api.addEventListener("readyToClose", onClose);
      } catch {
        setError(t("community.callUnavailable"));
      }
    }

    if (window.JitsiMeetExternalAPI) {
      initJitsi();
    } else {
      const existing = document.querySelector(`script[src="${JITSI_SCRIPT_URL}"]`);
      if (existing) {
        existing.addEventListener("load", initJitsi);
      } else {
        const script = document.createElement("script");
        script.src = JITSI_SCRIPT_URL;
        script.async = true;
        script.onload = initJitsi;
        script.onerror = () => setError(t("community.callUnavailable"));
        document.body.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      apiRef.current?.dispose();
      apiRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomName]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      <div className="flex items-center justify-between border-b border-white/10 bg-panel px-4 py-3">
        <p className="text-sm font-bold text-white">{roomName}</p>
        <button onClick={onClose} className="text-white/70 hover:text-white">
          <X size={20} />
        </button>
      </div>

      <div className="relative flex-1">
        {error && (
          <div className="flex h-full items-center justify-center p-6 text-center">
            <p className="max-w-sm text-sm text-white/80">{error}</p>
          </div>
        )}

        {!error && loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <Loader2 size={28} className="animate-spin text-white/60" />
          </div>
        )}

        {!error && <div ref={containerRef} className="h-full w-full" />}
      </div>
    </div>
  );
}
