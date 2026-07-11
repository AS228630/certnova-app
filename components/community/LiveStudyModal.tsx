"use client";

import { useEffect, useState } from "react";
import { X, Send, Video, Plus } from "lucide-react";
import { useLiveRoomStore } from "@/lib/store/liveRoomStore";
import { useLocale } from "@/components/LocaleProvider";
import VideoCallRoom from "@/components/community/VideoCallRoom";

function timeAgo(iso: string, locale: string) {
  const diffMin = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (diffMin < 1) return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(0, "minute");
  return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(-diffMin, "minute");
}

export default function LiveStudyModal({ onClose }: { onClose: () => void }) {
  const { t, locale } = useLocale();
  const rooms = useLiveRoomStore((s) => s.rooms);
  const activeRoomId = useLiveRoomStore((s) => s.activeRoomId);
  const messages = useLiveRoomStore((s) => s.messages);
  const error = useLiveRoomStore((s) => s.error);
  const loadRooms = useLiveRoomStore((s) => s.loadRooms);
  const createRoom = useLiveRoomStore((s) => s.createRoom);
  const joinRoomChat = useLiveRoomStore((s) => s.joinRoomChat);
  const leaveRoomChat = useLiveRoomStore((s) => s.leaveRoomChat);
  const sendMessage = useLiveRoomStore((s) => s.sendMessage);

  const [newRoomName, setNewRoomName] = useState("");
  const [input, setInput] = useState("");
  const [showVideoCall, setShowVideoCall] = useState(false);

  useEffect(() => {
    loadRooms();
    return () => leaveRoomChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeRoom = rooms.find((r) => r.id === activeRoomId);

  async function handleCreateRoom() {
    const name = newRoomName.trim();
    if (!name) return;
    const room = await createRoom(name);
    setNewRoomName("");
    if (room) joinRoomChat(room.id);
  }

  async function handleSend() {
    if (!input.trim()) return;
    const body = input;
    setInput("");
    await sendMessage(body);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="flex h-full max-h-[600px] w-full max-w-3xl overflow-hidden rounded-2xl border border-border-soft bg-panel">
        {/* Room list */}
        <div className="hidden w-56 shrink-0 flex-col border-r border-border-soft sm:flex">
          <div className="border-b border-border-soft p-3">
            <div className="flex gap-1.5">
              <input
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateRoom()}
                placeholder={t("community.newRoomPlaceholder")}
                className="w-full rounded-lg border border-border-soft bg-panel-alt px-2.5 py-2 text-xs text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
              />
              <button onClick={handleCreateRoom} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <Plus size={14} />
              </button>
            </div>
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto p-2">
            {rooms.length === 0 ? (
              <p className="p-2 text-xs text-text-faint">{t("community.noRoomsYet")}</p>
            ) : (
              rooms.map((r) => (
                <button
                  key={r.id}
                  onClick={() => joinRoomChat(r.id)}
                  className={`w-full rounded-lg px-2.5 py-2 text-left text-xs font-semibold ${
                    activeRoomId === r.id ? "bg-primary text-white" : "text-text-muted hover:bg-panel-alt"
                  }`}
                >
                  {r.name}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat panel */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-border-soft p-3">
            <p className="text-sm font-bold text-text">{activeRoom ? activeRoom.name : t("community.liveStudyTitle")}</p>
            <div className="flex items-center gap-2">
              {activeRoom && (
                <button
                  onClick={() => setShowVideoCall(true)}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-primary-dark"
                >
                  <Video size={13} />
                  {t("community.joinCallCta")}
                </button>
              )}
              <button onClick={onClose} className="text-text-faint hover:text-text">
                <X size={18} />
              </button>
            </div>
          </div>

          {error && (
            <div className="mx-3 mt-3 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
              {error}
            </div>
          )}

          {!activeRoom ? (
            <div className="flex flex-1 items-center justify-center p-6 text-center">
              <p className="text-sm text-text-faint">{t("community.selectOrCreateRoom")}</p>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-2 overflow-y-auto p-3">
                {messages.length === 0 ? (
                  <p className="text-center text-xs text-text-faint">{t("community.noMessagesYet")}</p>
                ) : (
                  messages.map((m) => (
                    <div key={m.id} className="flex gap-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-panel-alt text-[11px] font-bold text-text-muted">
                        {m.authorName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-text">
                          {m.authorName} <span className="font-normal text-text-faint">{timeAgo(m.createdAt, locale)}</span>
                        </p>
                        <p className="text-sm text-text-muted">{m.body}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex gap-2 border-t border-border-soft p-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={t("community.messagePlaceholder")}
                  className="w-full rounded-lg border border-border-soft bg-panel-alt px-3 py-2 text-sm text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white disabled:opacity-40"
                >
                  <Send size={15} />
                </button>
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
