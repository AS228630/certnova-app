"use client";

import { useState } from "react";
import { Video, Bell, Check, Loader2 } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";
import { useGuestOnlyRedirect } from "@/lib/useGuestOnlyRedirect";
import { supabase } from "@/lib/supabase/client";

// Webinars are, by definition, live scheduled events — we can't write
// "content" for one the way we can for a guide or cheat sheet, since
// that would mean fabricating a specific date/time for an event that
// isn't actually planned. Rather than show fake past-dated webinars (or
// invented future ones nobody will actually host), this offers a real,
// working signup: visitors who want to know about future webinars leave
// their email, stored genuinely in Supabase, so the platform owner can
// reach out once a real webinar is scheduled.
export default function WebinarsPage() {
  const { t } = useLocale();
  const { checking } = useGuestOnlyRedirect();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (checking) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    setError(null);
    const { error: dbError } = await supabase.from("webinar_signups").insert({ email: email.trim() });
    setSending(false);
    if (dbError) {
      setError(dbError.message);
      return;
    }
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border-soft bg-panel p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
            <Video size={26} />
          </div>
          <h1 className="text-2xl font-extrabold text-text">{t("resWebinars.pageTitle")}</h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-text-muted">{t("resWebinars.pageDesc")}</p>

          {sent ? (
            <div className="mt-6 flex flex-col items-center gap-2 rounded-xl bg-success-light px-5 py-4 text-success">
              <Check size={22} />
              <p className="text-sm font-semibold">{t("resWebinars.signupSuccess")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-sm flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("resWebinars.emailPlaceholder")}
                className="flex-1 rounded-lg border border-border-soft bg-panel-alt px-4 py-2.5 text-sm text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                disabled={sending}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-60"
              >
                {sending ? <Loader2 size={15} className="animate-spin" /> : <Bell size={15} />}
                {t("resWebinars.notifyMe")}
              </button>
            </form>
          )}
          {error && <p className="mt-3 text-xs font-medium text-danger">{error}</p>}
          <p className="mt-4 text-xs text-text-faint">{t("resWebinars.honestNote")}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
