"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, Mail, Users, Clock, Globe2, CalendarClock, X, Loader2, Check } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserContext";
import { getFullName } from "@/lib/supabase/useUser";
import { useSupportMessageStore } from "@/lib/store/supportMessageStore";

// A real contact form that saves into the support_messages table
// (migration 013) instead of a mailto: link — this keeps the owner's
// personal email address out of the frontend entirely while still
// genuinely delivering the message somewhere real (Supabase Table
// Editor → support_messages) rather than nowhere.
function EmailSupportModal({ onClose }: { onClose: () => void }) {
  const { t } = useLocale();
  const { user } = useUser();
  const submit = useSupportMessageStore((s) => s.submit);
  const sending = useSupportMessageStore((s) => s.sending);
  const sent = useSupportMessageStore((s) => s.sent);
  const error = useSupportMessageStore((s) => s.error);

  const [name, setName] = useState(user ? getFullName(user) : "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !name.trim() || !email.trim() || !message.trim()) return;
    await submit(user.id, name, email, message);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl border border-border-soft bg-panel p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-text">{t("help.emailSupportTitle")}</h3>
          <button onClick={onClose} className="text-text-faint hover:text-text">
            <X size={18} />
          </button>
        </div>

        {sent ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-light text-success">
              <Check size={22} />
            </div>
            <p className="text-sm font-semibold text-text">{t("help.messageSentTitle")}</p>
            <p className="text-xs text-text-faint">{t("help.messageSentDesc")}</p>
            <button onClick={onClose} className="mt-2 rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white hover:bg-primary-dark">
              {t("help.close")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-text-muted">{t("help.formName")}</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-border-soft bg-panel-alt px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-text-muted">{t("help.formEmail")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-border-soft bg-panel-alt px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-text-muted">{t("help.formMessage")}</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full resize-none rounded-lg border border-border-soft bg-panel-alt px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
              />
            </div>
            {error && <p className="text-xs font-medium text-danger">{error}</p>}
            <button
              type="submit"
              disabled={sending}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-60"
            >
              {sending && <Loader2 size={14} className="animate-spin" />}
              {t("help.sendEmail")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ContactSupportSection() {
  const { t } = useLocale();
  const [modalOpen, setModalOpen] = useState(false);
  const reset = useSupportMessageStore((s) => s.reset);

  return (
    <section>
      <h2 className="mb-1 font-bold text-text">{t("help.contactTitle")}</h2>
      <p className="mb-4 text-sm text-text-muted">{t("help.contactDesc")}</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* AI Coach — honestly framed as an instant AI assistant, not a
            human live-chat agent, since we don't have a real staffed
            live-chat system. */}
        <div className="flex flex-col rounded-xl border border-border-soft bg-panel p-4">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light text-primary">
            <Bot size={17} />
          </div>
          <p className="text-sm font-bold text-text">{t("help.aiChatTitle")}</p>
          <p className="mb-2 text-xs text-text-faint">{t("help.aiChatDesc")}</p>
          <span className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            {t("help.availableNow")}
          </span>
          <Link
            href="/ai-coach"
            className="mt-auto rounded-lg bg-primary py-2 text-center text-xs font-bold text-white hover:bg-primary-dark"
          >
            {t("help.startChat")}
          </Link>
        </div>

        <div className="flex flex-col rounded-xl border border-border-soft bg-panel p-4">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light text-primary">
            <Mail size={17} />
          </div>
          <p className="text-sm font-bold text-text">{t("help.emailSupportTitle")}</p>
          <p className="mb-3 text-xs text-text-faint">{t("help.emailSupportDesc")}</p>
          <button
            onClick={() => {
              reset();
              setModalOpen(true);
            }}
            className="mt-auto rounded-lg bg-primary py-2 text-center text-xs font-bold text-white hover:bg-primary-dark"
          >
            {t("help.sendEmail")}
          </button>
        </div>

        <div className="flex flex-col rounded-xl border border-border-soft bg-panel p-4">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light text-primary">
            <Users size={17} />
          </div>
          <p className="text-sm font-bold text-text">{t("help.communityTitle")}</p>
          <p className="mb-3 text-xs text-text-faint">{t("help.communityDesc")}</p>
          <Link
            href="/community"
            className="mt-auto rounded-lg border border-border-soft py-2 text-center text-xs font-bold text-text hover:bg-panel-alt"
          >
            {t("help.toCommunity")}
          </Link>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-2 rounded-lg border border-border-soft bg-panel px-3 py-2.5 text-xs text-text-muted">
          <Clock size={14} className="shrink-0 text-text-faint" />
          {t("help.emailResponseTime")}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border-soft bg-panel px-3 py-2.5 text-xs text-text-muted">
          <Globe2 size={14} className="shrink-0 text-text-faint" />
          {t("help.languagesSupported")}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border-soft bg-panel px-3 py-2.5 text-xs text-text-muted">
          <CalendarClock size={14} className="shrink-0 text-text-faint" />
          {t("help.aiCoachAvailability")}
        </div>
      </div>

      {modalOpen && <EmailSupportModal onClose={() => setModalOpen(false)} />}
    </section>
  );
}
