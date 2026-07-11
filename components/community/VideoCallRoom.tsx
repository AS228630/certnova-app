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
      addEventListener: (event: string, cb: (data?: unknown) => void) => void;
    };
  }
}

const JITSI_DOMAIN = "meet.jit.si";
const JITSI_SCRIPT_URL = `https://${JITSI_DOMAIN}/external_api.js`;

export default function VideoCallRoom({
  roomName,
  onClose,
  audioOnly = false,
}: {
  roomName: string;
  onClose: () => void;
  audioOnly?: boolean;
}) {
  const { t } = useLocale();
  const userName = useCommunityStore((s) => s.userName);
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<InstanceType<NonNullable<typeof window.JitsiMeetExternalAPI>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("Wird initialisiert...");

  useEffect(() => {
    let cancelled = false;

    // Covers the ENTIRE connection process — script loading, Jitsi
    // initialization, and joining — not just the post-script-load phase.
    // A prior version only started this timer inside initJitsi(), which
    // meant a stalled/blocked script load (no error, just never firing
    // onload) left the spinner stuck forever with no timeout ever
    // running. Starting it here as soon as the component mounts closes
    // that gap.
    const timeoutId = setTimeout(() => {
      if (!cancelled) setError(t("community.callTimeout"));
    }, 15000);

    function initJitsi() {
      if (cancelled) return;
      setStatus("Skript geladen, initialisiere Anruf...");
      if (!containerRef.current || !window.JitsiMeetExternalAPI) {
        setStatus(
          `Fehler: ${!containerRef.current ? "kein Container" : "API nicht verfügbar"}`
        );
        return;
      }
      try {
        const api = new window.JitsiMeetExternalAPI(JITSI_DOMAIN, {
          roomName,
          parentNode: containerRef.current,
          userInfo: { displayName: userName || "Teilnehmer" },
          width: "100%",
          height: "100%",
          configOverwrite: {
            startWithVideoMuted: audioOnly,
            disableDeepLinking: true,
            // Hides the top header bar showing the long room-ID text
            // (a different UI element from the watermark/logo, and a
            // genuinely new config path — worth trying since it targets
            // config.js rather than interface_config.js, which the free
            // public server may honor differently).
            conferenceHeader: { disabled: true },
            // Prevents the "waiting for a moderator, please log in"
            // screen we hit on repeated test rooms. That screen appears
            // when Jitsi's lobby/member-only feature kicks in for a
            // room; explicitly disabling it here (rather than relying
            // on defaults) keeps every room open-entry, so the first
            // person in just joins directly with no Google login step.
            enableLobby: false,
            hideLobbyButton: true,
            requireDisplayName: false,
            prejoinConfig: { enabled: false },
          },
          interfaceConfigOverwrite: {
            // "fullscreen" removed on purpose: it calls the browser's
            // native requestFullscreen() on the Jitsi iframe, which
            // breaks out of our layout, can expose the site's own menu
            // during the transition, and is the button most likely to
            // be tapped by mistake. Our own overlay is already
            // fixed/inset-0, so there's no real gain from Jitsi's
            // native fullscreen anyway — removing it costs nothing.
            TOOLBAR_BUTTONS: [
              "microphone", "camera", "desktop", "chat", "raisehand",
              "tileview", "hangup", "settings",
            ],
            // Hide all Jitsi branding so the call reads as part of
            // Coach Live rather than a third-party product — documented
            // IFrame API options, available on the free public server.
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_BRAND_WATERMARK: false,
            SHOW_POWERED_BY: false,
            DEFAULT_BACKGROUND: "#0a0a12",
            APP_NAME: "Coach Live",
            NATIVE_APP_NAME: "Coach Live",
            PROVIDER_NAME: "Coach Live",
            HIDE_DEEP_LINKING_LOGO: true,
          },
        });
        apiRef.current = api;

        // Explicitly grant the underlying iframe permission to access
        // camera/microphone/screen-share. JitsiMeetExternalAPI creates
        // its iframe dynamically via JS, and on some browsers (notably
        // mobile Chrome) a dynamically-created iframe does NOT
        // automatically get camera/microphone permission delegated to it
        // even though the parent page has that permission — the
        // getUserMedia() call inside the iframe then just hangs forever
        // with no permission prompt ever shown and no error thrown. This
        // exactly matches: script loads fine, API constructs fine, but
        // it's stuck indefinitely at "connecting to camera/mic".
        const iframe = (api as unknown as { getIFrame?: () => HTMLIFrameElement }).getIFrame?.();
        if (iframe) {
          iframe.setAttribute("allow", "camera; microphone; display-capture; autoplay; clipboard-write");
        }

        // The prejoin screen (camera preview + join button) now renders
        // inside the iframe and needs to be visible/interactive — stop
        // showing our own loading overlay here rather than waiting for
        // videoConferenceJoined, which only fires after the user
        // actually clicks Jitsi's own join button on that screen.
        clearTimeout(timeoutId);
        setLoading(false);

        api.addEventListener("videoConferenceJoined", () => setLoading(false));
        api.addEventListener("readyToClose", onClose);
        // videoConferenceLeft fires the moment the user hangs up — much
        // earlier than readyToClose, which only fires after Jitsi's own
        // internal post-call flow finishes (including, on the free
        // public server, a promotional 'powered by Jitsi / Jitsi as a
        // Service' page). Closing here prevents that page from ever
        // being shown to our users.
        api.addEventListener("videoConferenceLeft", onClose);
        api.addEventListener("errorOccurred", (e: unknown) => {
          setStatus(`Jitsi-Fehler: ${JSON.stringify(e)}`);
        });
      } catch (e) {
        clearTimeout(timeoutId);
        setStatus(`Fehler bei Initialisierung: ${e instanceof Error ? e.message : String(e)}`);
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
        script.onerror = () => {
          clearTimeout(timeoutId);
          setStatus("Fehler: Skript konnte nicht geladen werden (Netzwerk blockiert?)");
          setError(t("community.callUnavailable"));
        };
        document.body.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      apiRef.current?.dispose();
      apiRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomName, audioOnly]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      <div className="flex items-center justify-between border-b border-white/10 bg-panel px-4 py-3">
        <p className="text-sm font-bold text-white">
          {roomName} <span className="text-[10px] font-normal text-white/30">(v2)</span>
        </p>
        <button onClick={onClose} className="text-white/70 hover:text-white">
          <X size={20} />
        </button>
      </div>

      <div className="relative flex-1">
        {error && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black p-6 text-center">
            <p className="max-w-sm text-sm text-white/80">{error}</p>
            <p className="max-w-sm text-xs text-white/40">{status}</p>
          </div>
        )}

        {!error && loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center gap-4 bg-black pt-24">
            <Loader2 size={28} className="animate-spin text-white/60" />
            <p className="max-w-xs text-center text-xs text-white/50">{status}</p>
          </div>
        )}

        <div ref={containerRef} className="h-full w-full" />

        {/* Covers Jitsi's logo/watermark in the top-left corner with our
            own small Coach Live badge, in the same spot. The official
            branding-removal config options (SHOW_JITSI_WATERMARK etc.)
            are silently ignored on the free public meet.jit.si server —
            a known limitation confirmed by other developers hitting the
            same issue, not something fixable via configuration alone.
            Placing our own logo here (rather than a plain color block)
            reads as intentional branding instead of an obvious patch.
            Position/size is an approximation based on where the Jitsi
            logo has been observed to render; may not align perfectly in
            every screen size or call state. */}
        {!error && !loading && (
          <>
            <div className="pointer-events-none absolute left-2 top-2 z-20 h-14 w-52 rounded-lg backdrop-blur-2xl backdrop-brightness-110 backdrop-saturate-150" />
            <div className="pointer-events-none absolute left-3 top-3 z-20 flex items-center gap-1.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary text-[10px] font-extrabold text-white shadow">
                C
              </span>
              <span className="text-xs font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Coach Live</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
