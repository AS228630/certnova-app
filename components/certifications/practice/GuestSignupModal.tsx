"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/lib/supabase/client";
import { useLocale } from "@/components/LocaleProvider";

/**
 * Shown in-page (never a hard redirect) when a guest tries to go past
 * the free preview limit. Google sign-in returns the person to this
 * exact page (redirectTo = current URL) so their guest answers — saved
 * to localStorage right before this modal appears — can be migrated
 * into their new account instead of lost.
 */
export default function GuestSignupModal({ onClose }: { onClose: () => void }) {
  const { t } = useLocale();
  const [oauthLoading, setOauthLoading] = useState(false);

  async function handleGoogle() {
    setOauthLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.href },
    });
    if (error) setOauthLoading(false);
    // On success, Supabase redirects the browser away — nothing more to do here.
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="guest-signup-title">
      <div className="relative w-full max-w-sm rounded-2xl border border-border-soft bg-panel p-6 text-center">
        <button onClick={onClose} className="absolute right-4 top-4 text-text-faint hover:text-text" aria-label={t("help.close")}>
          <X size={18} />
        </button>

        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary">
          <Sparkles size={22} />
        </div>

        <h3 id="guest-signup-title" className="mb-2 text-lg font-extrabold text-text">{t("guestGate.title")}</h3>
        <p className="mb-6 text-sm leading-relaxed text-text-muted">{t("guestGate.desc")}</p>

        <button
          onClick={handleGoogle}
          disabled={oauthLoading}
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border-soft bg-panel-alt px-4 py-3 text-sm font-bold text-text hover:bg-panel disabled:opacity-60"
        >
          <FcGoogle size={18} />
          {t("guestGate.googleCta")}
        </button>

        <Link
          href={`/register?redirect=${encodeURIComponent(typeof window !== "undefined" ? window.location.pathname : "/dashboard")}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary-dark"
        >
          {t("guestGate.emailCta")}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
