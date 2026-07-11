"use client";

import { useEffect, useState } from "react";
import {
  Video,
  Zap,
  Hash,
  MonitorUp,
  Phone,
  MessageCircle,
  Users,
  Search,
  Calendar,
  Bell,
  ChevronDown,
  CheckSquare,
  Mic,
  PenTool,
  CircleDot,
  Menu,
} from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import CoachLiveSidebar from "@/components/coachLive/CoachLiveSidebar";
import ComingSoonToast from "@/components/coachLive/ComingSoonToast";
import LiveStudyModal from "@/components/community/LiveStudyModal";
import VideoCallRoom from "@/components/community/VideoCallRoom";
import { useUser } from "@/components/UserContext";
import { useProfileStore } from "@/lib/store/profileStore";
import { getFirstName } from "@/lib/supabase/useUser";

type QuickAction = {
  icon: typeof Video;
  label: string;
  kind: "video" | "voice" | "chat" | "soon";
  primary?: boolean;
};

const quickActions: QuickAction[] = [
  { icon: Video, label: "Neues Meeting", kind: "video", primary: true },
  { icon: Zap, label: "Sofortmeeting", kind: "video" },
  { icon: Hash, label: "Beitritt mit ID", kind: "soon" },
  { icon: MonitorUp, label: "Bildschirm teilen", kind: "soon" },
  { icon: Phone, label: "Anruf starten", kind: "voice" },
  { icon: MessageCircle, label: "Chat starten", kind: "chat" },
  { icon: Users, label: "Team erstellen", kind: "soon" },
];

const quickAccess: { icon: typeof Video; title: string; desc: string; color: string; kind: QuickAction["kind"] }[] = [
  { icon: Video, title: "Videoanruf", desc: "Mit Kamera verbinden", color: "bg-primary text-white", kind: "video" },
  { icon: Phone, title: "Sprachanruf", desc: "Nur Audio verbinden", color: "bg-success text-white", kind: "voice" },
  { icon: MonitorUp, title: "Bildschirm teilen", desc: "Deinen Bildschirm präsentieren", color: "bg-blue-500 text-white", kind: "soon" },
  { icon: PenTool, title: "Whiteboard", desc: "Ideen gemeinsam visualisieren", color: "bg-warning text-white", kind: "soon" },
  { icon: CircleDot, title: "Aufzeichnung", desc: "Meetings sicher in der Cloud speichern", color: "bg-danger text-white", kind: "soon" },
];

function CoachLiveBody() {
  const { user } = useUser();
  const profile = useProfileStore((s) => s.profile);
  const firstName = getFirstName(user);

  const [toast, setToast] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCall, setShowCall] = useState<"video" | "voice" | null>(null);
  const [callRoomName, setCallRoomName] = useState("");

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Generate a fresh, unique room name for every new call session instead
  // of reusing one fixed name tied only to the user's id. Reusing the
  // exact same room name across many repeated sessions (as we did while
  // testing) appears to make the public Jitsi server treat it as
  // requiring authenticated moderation on later joins, showing a
  // 'waiting for moderator' screen instead of connecting directly. A
  // fresh room per session avoids that entirely.
  function startCall(kind: "video" | "voice") {
    setCallRoomName(`coach-live-${user?.id ?? "guest"}-${crypto.randomUUID().slice(0, 8)}`);
    setShowCall(kind);
  }

  function handleAction(kind: QuickAction["kind"], label: string) {
    if (kind === "video") startCall("video");
    else if (kind === "voice") startCall("voice");
    else if (kind === "chat") setShowChat(true);
    else setToast(label);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <CoachLiveSidebar
        active="home"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewMeeting={() => startCall("video")}
        onVoiceCall={() => startCall("voice")}
        onOpenChat={() => setShowChat(true)}
        onComingSoon={(label) => setToast(label)}
      />

      <div className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 border-b border-border-soft bg-panel px-4 py-3.5 sm:px-6">
          <button onClick={() => setSidebarOpen(true)} className="text-text-faint hover:text-text lg:hidden">
            <Menu size={22} />
          </button>
          <div className="hidden w-full max-w-md items-center gap-2 rounded-lg border border-border-soft bg-panel-alt px-3 py-2 text-sm text-text-faint sm:flex">
            <Search size={15} />
            Suchen in Coach Live...
            <kbd className="ml-auto rounded border border-border-soft px-1.5 py-0.5 text-[10px]">Ctrl / K</kbd>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setToast("Kalender")} className="text-text-faint hover:text-text">
              <Calendar size={19} />
            </button>
            <button onClick={() => setToast("Benachrichtigungen")} className="relative text-text-faint hover:text-text">
              <Bell size={19} />
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary-light text-sm font-bold text-primary">
                {profile?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.avatar_url} alt={firstName} className="h-full w-full object-cover" />
                ) : (
                  firstName.charAt(0).toUpperCase()
                )}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-text">{firstName}</p>
                <p className="flex items-center gap-1 text-[11px] text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  Verfügbar
                </p>
              </div>
              <ChevronDown size={14} className="text-text-faint" />
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
          {/* Hero */}
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-panel to-fuchsia-500/10 p-6">
            <h1 className="text-2xl font-extrabold text-text">Guten Morgen, {firstName}! 👋</h1>
            <p className="mt-1 text-sm text-text-muted">Schön, dich wieder bei Coach Live zu sehen.</p>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
              {quickActions.map((a) => (
                <button
                  key={a.label}
                  onClick={() => handleAction(a.kind, a.label)}
                  className={`flex flex-col items-center gap-2 rounded-xl px-3 py-4 text-center transition-colors ${
                    a.primary ? "bg-primary text-white hover:bg-primary-dark" : "bg-panel text-text hover:bg-panel-alt"
                  }`}
                >
                  <a.icon size={20} />
                  <span className="text-xs font-bold">{a.label}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Upcoming meetings - honest empty state, no fabricated meetings */}
            <section className="rounded-2xl border border-border-soft bg-panel p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-bold text-text">Nächste Meetings</h2>
                <button onClick={() => setToast("Kalender")} className="text-xs font-semibold text-primary hover:underline">
                  Zum Kalender
                </button>
              </div>
              <div className="flex flex-col items-center gap-2 py-8 text-center">
                <Calendar size={22} className="text-text-faint" />
                <p className="text-xs text-text-faint">Noch keine geplanten Meetings.</p>
                <button
                  onClick={() => startCall("video")}
                  className="mt-1 text-xs font-bold text-primary hover:underline"
                >
                  Jetzt ein Meeting starten
                </button>
              </div>
            </section>

            {/* Tasks - honest empty state */}
            <section className="rounded-2xl border border-border-soft bg-panel p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-bold text-text">Meine Aufgaben</h2>
                <button onClick={() => setToast("Aufgaben")} className="text-xs font-semibold text-primary hover:underline">
                  Alle anzeigen
                </button>
              </div>
              <div className="flex flex-col items-center gap-2 py-8 text-center">
                <CheckSquare size={22} className="text-text-faint" />
                <p className="text-xs text-text-faint">Aufgaben sind bald verfügbar.</p>
              </div>
            </section>
          </div>

          {/* Quick access */}
          <section>
            <h2 className="mb-3 font-bold text-text">Schnellzugriff</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {quickAccess.map((q) => (
                <button
                  key={q.title}
                  onClick={() => handleAction(q.kind, q.title)}
                  className="flex flex-col items-start gap-2 rounded-xl border border-border-soft bg-panel p-4 text-left hover:border-primary/40"
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${q.color}`}>
                    <q.icon size={17} />
                  </div>
                  <p className="text-sm font-bold text-text">{q.title}</p>
                  <p className="text-[11px] text-text-faint">{q.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Recent files - honest empty state */}
          <section className="rounded-2xl border border-border-soft bg-panel p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-bold text-text">Letzte Dateien</h2>
              <button onClick={() => setToast("Dateien")} className="text-xs font-semibold text-primary hover:underline">
                Alle anzeigen
              </button>
            </div>
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <Mic size={22} className="text-text-faint" />
              <p className="text-xs text-text-faint">Dateifreigabe ist bald verfügbar.</p>
            </div>
          </section>
        </main>
      </div>

      {toast && <ComingSoonToast label={toast} onClose={() => setToast(null)} />}
      {showChat && <LiveStudyModal onClose={() => setShowChat(false)} />}
      {showCall && (
        <VideoCallRoom
          roomName={callRoomName}
          audioOnly={showCall === "voice"}
          onClose={() => setShowCall(null)}
        />
      )}
    </div>
  );
}

export default function CoachLivePage() {
  return (
    <DashboardShell>
      <CoachLiveBody />
    </DashboardShell>
  );
}
