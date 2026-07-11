import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";

export type LiveRoom = {
  id: string;
  name: string;
  topic: string | null;
  createdBy: string;
  createdAt: string;
};

export type RoomMessage = {
  id: string;
  roomId: string;
  userId: string;
  authorName: string;
  body: string;
  createdAt: string;
};

type LiveRoomState = {
  userId: string | null;
  userName: string;
  rooms: LiveRoom[];
  activeRoomId: string | null;
  messages: RoomMessage[];
  channel: RealtimeChannel | null;
  error: string | null;

  loadRooms: () => Promise<void>;
  createRoom: (name: string, topic?: string) => Promise<LiveRoom | null>;
  joinRoomChat: (roomId: string) => Promise<void>;
  leaveRoomChat: () => void;
  sendMessage: (body: string) => Promise<void>;
  setUser: (userId: string, userName: string) => void;
  reset: () => void;
};

export const useLiveRoomStore = create<LiveRoomState>((set, get) => ({
  userId: null,
  userName: "",
  rooms: [],
  activeRoomId: null,
  messages: [],
  channel: null,
  error: null,

  setUser: (userId, userName) => set({ userId, userName }),

  loadRooms: async () => {
    const { data, error } = await supabase
      .from("community_rooms")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      set({ error: "Live-Study-Räume sind noch nicht eingerichtet. Der Betreiber muss die Datenbank-Migration ausführen." });
      return;
    }

    set({
      error: null,
      rooms: (data ?? []).map((r) => ({
        id: r.id,
        name: r.name,
        topic: r.topic,
        createdBy: r.created_by,
        createdAt: r.created_at,
      })),
    });
  },

  createRoom: async (name: string, topic?: string) => {
    const { userId } = get();
    if (!userId) return null;
    const { data, error } = await supabase
      .from("community_rooms")
      .insert({ created_by: userId, name, topic: topic ?? null })
      .select("*")
      .single();
    if (error || !data) {
      set({ error: "Raum konnte nicht erstellt werden. Bitte versuche es erneut." });
      return null;
    }

    const room: LiveRoom = { id: data.id, name: data.name, topic: data.topic, createdBy: data.created_by, createdAt: data.created_at };
    set((s) => ({ rooms: [room, ...s.rooms], error: null }));
    return room;
  },

  joinRoomChat: async (roomId: string) => {
    get().leaveRoomChat();

    const { data: history, error } = await supabase
      .from("community_room_messages")
      .select("*")
      .eq("room_id", roomId)
      .order("created_at", { ascending: true })
      .limit(200);

    if (error) {
      set({ error: "Chat konnte nicht geladen werden. Bitte versuche es erneut." });
      return;
    }

    const userIds = Array.from(new Set((history ?? []).map((m) => m.user_id)));
    const { data: profiles } = userIds.length
      ? await supabase.from("profiles").select("id, full_name").in("id", userIds)
      : { data: [] };
    const nameByUserId = new Map((profiles ?? []).map((p) => [p.id, p.full_name as string | null]));

    const mapped: RoomMessage[] = (history ?? []).map((m) => ({
      id: m.id,
      roomId: m.room_id,
      userId: m.user_id,
      authorName: nameByUserId.get(m.user_id) ?? "—",
      body: m.body,
      createdAt: m.created_at,
    }));

    const channel = supabase
      .channel(`room-chat-${roomId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "community_room_messages", filter: `room_id=eq.${roomId}` },
        async (payload) => {
          const row = payload.new as { id: string; room_id: string; user_id: string; body: string; created_at: string };
          // Skip messages we already appended optimistically from this client.
          if (get().messages.some((m) => m.id === row.id)) return;
          const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", row.user_id).maybeSingle();
          set((s) => ({
            messages: [
              ...s.messages,
              {
                id: row.id,
                roomId: row.room_id,
                userId: row.user_id,
                authorName: profile?.full_name ?? "—",
                body: row.body,
                createdAt: row.created_at,
              },
            ],
          }));
        }
      )
      .subscribe();

    set({ activeRoomId: roomId, messages: mapped, channel });
  },

  leaveRoomChat: () => {
    const { channel } = get();
    if (channel) supabase.removeChannel(channel);
    set({ activeRoomId: null, messages: [], channel: null });
  },

  sendMessage: async (body: string) => {
    const { userId, userName, activeRoomId } = get();
    if (!userId || !activeRoomId || !body.trim()) return;

    const { data, error } = await supabase
      .from("community_room_messages")
      .insert({ room_id: activeRoomId, user_id: userId, body: body.trim() })
      .select("*")
      .single();
    if (error || !data) {
      set({ error: "Nachricht konnte nicht gesendet werden. Bitte versuche es erneut." });
      return;
    }

    set((s) => ({
      messages: [
        ...s.messages,
        { id: data.id, roomId: data.room_id, userId: data.user_id, authorName: userName, body: data.body, createdAt: data.created_at },
      ],
      error: null,
    }));
  },

  reset: () => {
    get().leaveRoomChat();
    set({ userId: null, userName: "", rooms: [], activeRoomId: null, messages: [], channel: null, error: null });
  },
}));
