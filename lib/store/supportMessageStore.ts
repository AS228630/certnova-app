import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

type SupportMessageState = {
  sending: boolean;
  sent: boolean;
  error: string | null;
  submit: (userId: string, name: string, email: string, message: string) => Promise<boolean>;
  reset: () => void;
};

// Sends a real message into the support_messages table (see migration
// 013) instead of a mailto: link — this keeps the owner's personal
// email address out of the frontend entirely while still genuinely
// delivering the message somewhere the owner can read it (Supabase
// Table Editor).
export const useSupportMessageStore = create<SupportMessageState>((set) => ({
  sending: false,
  sent: false,
  error: null,

  submit: async (userId, name, email, message) => {
    set({ sending: true, error: null });
    const { error } = await supabase.from("support_messages").insert({
      user_id: userId,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });
    if (error) {
      set({ sending: false, error: error.message });
      return false;
    }
    set({ sending: false, sent: true });
    return true;
  },

  reset: () => set({ sending: false, sent: false, error: null }),
}));
