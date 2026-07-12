import { create } from "zustand";
import emailjs from "@emailjs/browser";
import { supabase } from "@/lib/supabase/client";
import { EMAILJS_CONFIG } from "@/lib/emailjsConfig";

type SupportMessageState = {
  sending: boolean;
  sent: boolean;
  error: string | null;
  submit: (userId: string, name: string, email: string, message: string, title?: string) => Promise<boolean>;
  reset: () => void;
};

// Sends a real email straight to the site owner's inbox via EmailJS
// (client-side, no backend needed — see lib/emailjsConfig.ts), and also
// logs the same message into the support_messages table (migration
// 013) as a backup record the owner can browse later even if an email
// gets lost or filtered. If the email send fails for any reason, the
// Supabase log still succeeds, so the message is never silently lost.
export const useSupportMessageStore = create<SupportMessageState>((set) => ({
  sending: false,
  sent: false,
  error: null,

  submit: async (userId, name, email, message, title = "Support-Anfrage") => {
    set({ sending: true, error: null });

    const emailResult = await emailjs
      .send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          title,
          name,
          email,
          message,
          time: new Date().toLocaleString("de-DE"),
        },
        { publicKey: EMAILJS_CONFIG.publicKey }
      )
      .then(() => true)
      .catch((err) => {
        console.error("EmailJS send failed:", err);
        return false;
      });

    const { error: dbError } = await supabase.from("support_messages").insert({
      user_id: userId,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    if (!emailResult && dbError) {
      set({ sending: false, error: dbError.message });
      return false;
    }

    set({ sending: false, sent: true });
    return true;
  },

  reset: () => set({ sending: false, sent: false, error: null }),
}));
