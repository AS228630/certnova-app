import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  title: string;
  updatedAt: string;
};

type AiCoachState = {
  userId: string | null;
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: ChatMessage[];
  loaded: boolean;
  sending: boolean;
  error: string | null;

  load: (userId: string) => Promise<void>;
  startNewConversation: () => void;
  selectConversation: (conversationId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  reset: () => void;
};

async function deriveTitle(content: string): Promise<string> {
  const trimmed = content.trim().replace(/\s+/g, " ");
  return trimmed.length > 48 ? trimmed.slice(0, 48) + "…" : trimmed || "Neuer Chat";
}

export const useAiCoachStore = create<AiCoachState>((set, get) => ({
  userId: null,
  conversations: [],
  activeConversationId: null,
  messages: [],
  loaded: false,
  sending: false,
  error: null,

  load: async (userId: string) => {
    const { data, error } = await supabase
      .from("ai_conversations")
      .select("id, title, updated_at")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });

    if (error || !data) {
      set({ userId, conversations: [], loaded: true });
      return;
    }

    const conversations: Conversation[] = data.map((row) => ({
      id: row.id,
      title: row.title,
      updatedAt: row.updated_at,
    }));

    set({ userId, conversations, loaded: true });

    if (conversations.length > 0) {
      await get().selectConversation(conversations[0].id);
    }
  },

  startNewConversation: () => {
    set({ activeConversationId: null, messages: [], error: null });
  },

  selectConversation: async (conversationId: string) => {
    set({ activeConversationId: conversationId, messages: [], error: null });
    const { data, error } = await supabase
      .from("ai_messages")
      .select("id, role, content, created_at")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error || !data) return;

    set({
      messages: data.map((row) => ({
        id: row.id,
        role: row.role as ChatRole,
        content: row.content,
        createdAt: row.created_at,
      })),
    });
  },

  sendMessage: async (content: string) => {
    const trimmedContent = content.trim();
    if (!trimmedContent) return;
    const userId = get().userId;
    if (!userId) return;

    set({ sending: true, error: null });

    let conversationId = get().activeConversationId;

    // Create the conversation lazily, on first message, so we never leave
    // empty "Neuer Chat" rows behind for chats the user never actually started.
    if (!conversationId) {
      const title = await deriveTitle(trimmedContent);
      const { data, error } = await supabase
        .from("ai_conversations")
        .insert({ user_id: userId, title })
        .select("id, title, updated_at")
        .single();

      if (error || !data) {
        set({ sending: false, error: "Der Chat konnte nicht erstellt werden." });
        return;
      }

      conversationId = data.id;
      set((s) => ({
        activeConversationId: conversationId,
        conversations: [{ id: data.id, title: data.title, updatedAt: data.updated_at }, ...s.conversations],
      }));
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedContent,
      createdAt: new Date().toISOString(),
    };
    set((s) => ({ messages: [...s.messages, userMessage] }));

    await supabase.from("ai_messages").insert({
      conversation_id: conversationId,
      user_id: userId,
      role: "user",
      content: trimmedContent,
    });

    try {
      const history = get()
        .messages.slice(-20)
        .map((m) => ({ role: m.role, content: m.content }));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45_000);

      const res = await fetch("/api/ai-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await res.json();

      if (!res.ok) {
        set({ sending: false, error: data.error ?? "Etwas ist schiefgelaufen." });
        return;
      }

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
        createdAt: new Date().toISOString(),
      };
      set((s) => ({ messages: [...s.messages, assistantMessage], sending: false }));

      await supabase.from("ai_messages").insert({
        conversation_id: conversationId,
        user_id: userId,
        role: "assistant",
        content: data.reply,
      });
      await supabase
        .from("ai_conversations")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", conversationId);
    } catch (err) {
      const isTimeout = err instanceof DOMException && err.name === "AbortError";
      set({
        sending: false,
        error: isTimeout
          ? "Die Antwort hat zu lange gedauert. Bitte versuche es erneut."
          : "Der KI Coach ist gerade nicht erreichbar. Bitte versuche es erneut.",
      });
    }
  },

  reset: () =>
    set({
      userId: null,
      conversations: [],
      activeConversationId: null,
      messages: [],
      loaded: false,
      sending: false,
      error: null,
    }),
}));
