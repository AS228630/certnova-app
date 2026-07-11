"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, Video, Plus, Users, Hash, MessageSquare, Phone } from "lucide-react";
import { useLiveRoomStore } from "@/lib/store/liveRoomStore";
import { useLocale } from "@/components/LocaleProvider";
import VideoCallRoom from "@/components/community/VideoCallRoom";

function timeLabel(iso: string, locale: string) {
  return new Date(iso).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
}

function dateDivider(iso: string, locale: string, t: (k: string) => string) {
  const date = new Date(iso);
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  if (isToday) return t("community.today");
  return date.toLocaleDateString(locale, { day: "numeric", month: "long" });
}

export default function LiveStudyModal({ onClose }: { onClose: () => void }) {
  const { t, locale } = useLocale();
  const rooms = useLiveRoomStore((s) => s.rooms);
  const activeRoomId = useLiveRoomStore((s) => s.activeRoomId);
  const messages = useLiveRoomStore((s) => s.messages);
  const error = useLiveRoomStore((s) => s.error);
  const userId = useLiveRoomStore((s) => s.userId);
  const loadRooms = useLiveRoomStore((s) => s.loadRooms);
  const createRoom = useLiveRoomStore((s) => s.createRoom);
  const joinRoomChat = useLiveRoomStore((s) => s.joinRoomChat);
  const leaveRoomChat = useLiveRoomStore((s) => s.leaveRoomChat);
  const sendMessage = useLiveRoomStore((s) => s.sendMessage);

  const [newRoomName, setNewRoomName] = useState("");
  const [showNewRoomInput, setShowNewRoomInput] = useState(false);
  const [input, setInput] = useState("");
  const [showVideoCall, setShowVideoCall] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadRooms();
    return () => leaveRoomChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const activeRoom = rooms.find((r) => r.id === activeRoomId);

  async function handleCreateRoom() {
    const name = newRoomName.trim();
    if (!name) return;
    const room = await createRoom(name);
    setNewRoomName("");
    setShowNewRoomInput(false);
    if (room) joinRoomChat(room.id);
  }

  async function handleSend() {
    if (!input.trim()) return;
    const body = input;
    setInput("");
    await sendMessage(body);
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-bg">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border-soft bg-panel px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
            <Video size={17} />
          </div>
          <div>
            <p className="text-sm font-extrabold text-text">{t("community.liveStudyTitle")}</p>
            <p className="text-[11px] text-text-faint">{t("community.liveStudySubtitle")}</p>
          </div>
        </div>
        <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg text-text-faint hover:bg-panel-alt hover:text-text">
          <X size={20} />
        </button>
      </div>

      {error && (
        <div className="mx-5 mt-3 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">{error}</div>
      )}

      <div className="flex min-h-0 flex-1">
        {/* Room sidebar */}
        <div className="hidden w-72 shrink-0 flex-col border-r border-border-soft bg-panel sm:flex">
          <div className="border-b border-border-soft p-4">
            {showNewRoomInput ? (
              <div className="flex gap-1.5">
                <input
                  autoFocus
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreateRoom();
                    if (e.key === "Escape") setShowNewRoomInput(false);
                  }}
                  placeholder={t("community.newRoomPlaceholder")}
                  className="w-full rounded-lg border border-border-soft bg-panel-alt px-3 py-2 text-sm text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
                />
                <button onClick={handleCreateRoom} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                  <Plus size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowNewRoomInput(true)}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
              >
                <Plus size={16} />
                {t("community.newRoomCta")}
              </button>
            )}
          </div>

          <div className="flex-1 space-y-0.5 overflow-y-auto p-2">
            <p className="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wide text-text-faint">
              {t("community.roomsTitle")} · {rooms.length}
            </p>
            {rooms.length === 0 ? (
              <div className="px-3 py-6 text-center">
                <Hash size={22} className="mx-auto mb-2 text-text-faint" />
                <p className="text-xs text-text-faint">{t("community.noRoomsYet")}</p>
              </div>
            ) : (
              rooms.map((r) => (
                <button
                  key={r.id}
                  onClick={() => joinRoomChat(r.id)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                    activeRoomId === r.id ? "bg-primary text-white" : "text-text-muted hover:bg-panel-alt"
                  }`}
                >
                  <Hash size={14} className={activeRoomId === r.id ? "text-white/80" : "text-text-faint"} />
                  <span className="truncate">{r.name}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex flex-1 flex-col">
          {!activeRoom ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
                <MessageSquare size={28} />
              </div>
              <p className="max-w-xs text-sm text-text-muted">{t("community.selectOrCreateRoom")}</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-border-soft px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <Hash size={16} className="text-text-faint" />
                  <p className="text-sm font-extrabold text-text">{activeRoom.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 rounded-full bg-panel-alt px-2.5 py-1 text-[11px] font-semibold text-text-faint">
                    <Users size={12} />1
                  </span>
                  <button
                    onClick={() => setShowVideoCall(true)}
                    className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-bold text-white hover:bg-primary-dark"
                  >
                    <Video size={14} />
                    {t("community.joinCallCta")}
                  </button>
                </div>
              </div>

              <div ref={scrollRef} className="flex-1 space-y-1 overflow-y-auto px-5 py-4">
                {messages.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                    <Phone size={24} className="text-text-faint" />
                    <p className="text-sm text-text-faint">{t("community.noMessagesYet")}</p>
                    <p className="max-w-xs text-xs text-text-faint">{t("community.inviteOthersHint")}</p>
                  </div>
                ) : (
                  messages.map((m, i) => {
                    const prev = messages[i - 1];
                    const showDateDivider = !prev || new Date(prev.createdAt).toDateString() !== new Date(m.createdAt).toDateString();
                    const isMine = m.userId === userId;
                    const showHeader = !prev || prev.userId !== m.userId || showDateDivider;
                    return (
                      <div key={m.id}>
                        {showDateDivider && (
                          <div className="my-3 flex items-center gap-3">
                            <div className="h-px flex-1 bg-border-soft" />
                            <span className="text-[11px] font-semibold text-text-faint">{dateDivider(m.createdAt, locale, t)}</span>
                            <div className="h-px flex-1 bg-border-soft" />
                          </div>
                        )}
                        <div className={`flex gap-2.5 py-0.5 ${isMine ? "flex-row-reverse" : ""}`}>
                          {showHeader ? (
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">
                              {m.authorName.charAt(0).toUpperCase()}
                            </div>
                          ) : (
                            <div className="w-8 shrink-0" />
                          )}
                          <div className={`max-w-[70%] ${isMine ? "items-end text-right" : ""}`}>
                            {showHeader && (
                              <p className={`mb-0.5 flex items-baseline gap-1.5 text-[11px] ${isMine ? "flex-row-reverse" : ""}`}>
                                <span className="font-bold text-text">{isMine ? t("community.you") : m.authorName}</span>
                                <span className="text-text-faint">{timeLabel(m.createdAt, locale)}</span>
                              </p>
                            )}
                            <div
                              className={`inline-block rounded-2xl px-3.5 py-2 text-sm ${
                                isMine ? "rounded-tr-sm bg-primary text-white" : "rounded-tl-sm bg-panel-alt text-text"
                              }`}
                            >
                              {m.body}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="border-t border-border-soft p-4">
                <div className="flex items-end gap-2 rounded-xl border border-border-soft bg-panel-alt p-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder={t("community.messagePlaceholder")}
                    rows={1}
                    className="max-h-28 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-text placeholder:text-text-faint focus:outline-none"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white hover:bg-primary-dark disabled:opacity-40"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {showVideoCall && activeRoom && (
        <VideoCallRoom roomName={`study-${activeRoom.id}`} onClose={() => setShowVideoCall(false)} />
      )}
    </div>
  );
}
