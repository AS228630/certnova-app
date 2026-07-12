"use client";

import { useEffect, useRef, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useCommunityStore } from "@/lib/store/communityStore";

// Video/voice calling via our own self-hosted Coach Live server
// (MiroTalk P2P, open-source, running on Render's free tier at
// coach-live-server.onrender.com). We moved here from the free public
// meet.jit.si after hitting two hard limits with it: a 5-minute
// disconnect on embedded calls, and no way to remove Jitsi's own
// branding on the public server. Because we host this instance
// ourselves, both are solved — calls run as long as needed, and the
// UI is fully rebranded as "Coach Live" (see coach-live-server repo,
// app/src/config.template.js). The only trade-off of the free Render
// tier: if the server has been idle, the first person to open a room
// may wait up to ~50s for it to spin back up before the call starts.
const CALL_SERVER = "https://coach-live-server.onrender.com";

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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // The free Render instance can take up to ~50s to wake from sleep,
    // so we don't show an error for a while — just keep the spinner
    // with a reassuring status message.
    const timer = setTimeout(() => setLoading(false), 60000);
    return () => clearTimeout(timer);
  }, [roomName]);

  const params = new URLSearchParams();
  if (userName) params.set("name", userName);
  if (audioOnly) params.set("video", "0");
  params.set("audio", "1");
  params.set("screen", "0");
  params.set("hide", "0");
  params.set("notify", "0");

  const url = `${CALL_SERVER}/join/${encodeURIComponent(roomName)}?${params.toString()}`;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      <div className="flex items-center justify-between border-b border-white/10 bg-panel px-4 py-3">
        <p className="text-sm font-bold text-white">
          {roomName} <span className="text-[10px] font-normal text-white/30">(Coach Live)</span>
        </p>
        <button onClick={onClose} className="text-white/70 hover:text-white">
          <X size={20} />
        </button>
      </div>

      <div className="relative flex-1">
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black">
            <Loader2 size={28} className="animate-spin text-white/60" />
            <p className="max-w-xs text-center text-xs text-white/50">
              Verbindung wird hergestellt... Falls der Raum eine Weile nicht
              genutzt wurde, kann der erste Aufbau bis zu 50 Sekunden dauern.
            </p>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={url}
          allow="camera; microphone; display-capture; autoplay; clipboard-write; fullscreen"
          className="h-full w-full border-0"
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
}
