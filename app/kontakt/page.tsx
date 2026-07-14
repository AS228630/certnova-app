"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Loader2, Check } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";
import { EMAILJS_CONFIG } from "@/lib/emailjsConfig";

// Uses EmailJS directly (not the support_messages table, which requires
// a signed-in user_id) so guests who aren't logged in can still reach
// out — this is the public "Contact us" page, which must work for
// anyone.
export default function KontaktPage() {
  const { t } = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSending(true);
    setError(null);
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        { title: "Kontaktformular", name, email, message, time: new Date().toLocaleString("de-DE") },
        { publicKey: EMAILJS_CONFIG.publicKey }
      );
      setSent(true);
    } catch {
      setError(t("kontaktPage.error"));
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
            <Mail size={24} />
          </div>
          <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("kontaktPage.title")}</h1>
          <p className="mt-2 text-sm text-text-muted">{t("kontaktPage.desc")}</p>
        </div>

        {sent ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-border-soft bg-panel p-8 text-center">
            <Check size={28} className="text-success" />
            <p className="font-bold text-text">{t("kontaktPage.successTitle")}</p>
            <p className="text-sm text-text-muted">{t("kontaktPage.successDesc")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border-soft bg-panel p-6">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-text-muted">{t("kontaktPage.name")}</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-text-muted">{t("kontaktPage.email")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-text-muted">{t("kontaktPage.message")}</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full resize-none rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none"
              />
            </div>
            {error && <p className="text-xs font-medium text-danger">{error}</p>}
            <button
              type="submit"
              disabled={sending}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-60"
            >
              {sending && <Loader2 size={14} className="animate-spin" />}
              {t("kontaktPage.send")}
            </button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
