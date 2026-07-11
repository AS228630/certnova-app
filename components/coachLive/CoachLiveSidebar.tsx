"use client";

import Link from "next/link";
import {
  Plus,
  Home,
  Video,
  Phone,
  MessageCircle,
  Calendar,
  Users,
  Folder,
  CheckSquare,
  StickyNote,
  UserCircle2,
  Bell,
  Settings,
} from "lucide-react";
import { useLiveRoomStore } from "@/lib/store/liveRoomStore";

type NavItem = {
  icon: typeof Home;
  label: string;
  action: "home" | "video" | "voice" | "chat" | "soon";
  badge?: number;
};

export default function CoachLiveSidebar({
  onNewMeeting,
  onVoiceCall,
  onOpenChat,
  onComingSoon,
  active,
  open,
  onClose,
}: {
  onNewMeeting: () => void;
  onVoiceCall: () => void;
  onOpenChat: () => void;
  onComingSoon: (label: string) => void;
  active: "home" | "video" | "voice" | "chat";
  open: boolean;
  onClose: () => void;
}) {
  const unreadRoomCount = useLiveRoomStore((s) => s.rooms.length);

  const navItems: NavItem[] = [
    { icon: Home, label: "Startseite", action: "home" },
    { icon: Calendar, label: "Meetings", action: "soon" },
    { icon: Video, label: "Videoanrufe", action: "video" },
    { icon: Phone, label: "Sprachanrufe", action: "voice" },
    { icon: MessageCircle, label: "Chat", action: "chat", badge: unreadRoomCount || undefined },
    { icon: Calendar, label: "Kalender", action: "soon" },
    { icon: Users, label: "Teams", action: "soon" },
    { icon: Folder, label: "Dateien", action: "soon" },
    { icon: CheckSquare, label: "Aufgaben", action: "soon" },
    { icon: StickyNote, label: "Notizen", action: "soon" },
    { icon: UserCircle2, label: "Kontakte", action: "soon" },
  ];

  function handleClick(item: NavItem) {
    if (item.action === "video") onNewMeeting();
    else if (item.action === "voice") onVoiceCall();
    else if (item.action === "chat") onOpenChat();
    else if (item.action === "soon") onComingSoon(item.label);
    onClose();
  }

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={onClose} />}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] -translate-x-full flex-col overflow-y-auto bg-panel transition-transform duration-200 lg:static lg:h-full lg:w-60 lg:max-w-none lg:shrink-0 lg:translate-x-0 lg:border-r lg:border-border-soft ${
          open ? "translate-x-0" : ""
        }`}
      >
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-extrabold text-white">C</div>
        <p className="text-base font-extrabold text-text">Coach Live</p>
      </div>

      <div className="px-4">
        <button
          onClick={() => {
            onNewMeeting();
            onClose();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
        >
          <Plus size={16} />
          Neues Meeting
        </button>
      </div>

      <nav className="mt-4 flex-1 space-y-0.5 overflow-y-auto px-3">
        {navItems.map((item) => {
          const isActive = active === item.action;
          return (
            <button
              key={item.label}
              onClick={() => handleClick(item)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                isActive ? "bg-primary-light text-primary" : "text-text-muted hover:bg-panel-alt"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <item.icon size={17} />
                {item.label}
              </span>
              {item.badge ? (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
        <button
          onClick={() => onComingSoon("Benachrichtigungen")}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-text-muted hover:bg-panel-alt"
        >
          <Bell size={17} />
          Benachrichtigungen
        </button>
        <button
          onClick={() => onComingSoon("Einstellungen")}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-text-muted hover:bg-panel-alt"
        >
          <Settings size={17} />
          Einstellungen
        </button>
      </nav>

      <div className="border-t border-border-soft p-4">
        <Link href="/community" className="text-xs font-semibold text-text-faint hover:text-text">
          ← Zurück zur Community
        </Link>
      </div>
      </div>
    </>
  );
}
