"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useLocale } from "@/components/LocaleProvider";

export default function VideoCallRoom({ roomName, onClose }: { roomName: string; onClose: () => void }) {
  const { t } = useLocale();
  const [token, setToken] = useState<string | null>(null);
  const [wsUrl, setWsUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function connect() {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      if (!accessToken) {
        setError(t("community.notSignedIn"));
        return;
      }

      try {
        const res = await fetch("/api/livekit-token", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
          body: JSON.stringify({ roomName }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? t("community.callUnavailable"));
          return;
        }
        if (!cancelled) {
          setToken(data.token);
          setWsUrl(data.url);
        }
      } catch {
        if (!cancelled) setError(t("community.callUnavailable"));
      }
    }

    connect();
    return () => {
      cancelled = true;
    };
  }, [roomName, t]);

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

        {!error && (!token || !wsUrl) && (
          <div className="flex h-full items-center justify-center">
            <Loader2 size={28} className="animate-spin text-white/60" />
          </div>
        )}

        {!error && token && wsUrl && (
          <LiveKitRoom
            token={token}
            serverUrl={wsUrl}
            connect
            data-lk-theme="default"
            style={{ height: "100%" }}
            onDisconnected={onClose}
          >
            <VideoConference />
          </LiveKitRoom>
        )}
      </div>
    </div>
  );
}
