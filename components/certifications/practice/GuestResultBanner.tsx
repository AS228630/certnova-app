"use client";

import { useState } from "react";
import Link from "next/link";
import { PartyPopper, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/lib/supabase/client";
import { useLocale } from "@/components/LocaleProvider";

/**
 * Journey stage 4->5 bridge: shown only to a Guest who just finished
 * their free question run (real score, computed by ExamCompleteScreen
 * from the same real answers — this component never invents its own
 * number). Registration itself is unchanged (same Google OAuth /
 * email-registration paths already used by GuestSignupModal); this is
 * just the results-page-specific framing the advisor's spec calls for,
 * rather than a generic paywall interrupt.
 */
export default function GuestResultBanner({ score, correct, total }: { score: number; correct: number; total: number }) {
  const { t } = useLocale();
  const [oauthLoading, setOauthLoading] = useState(false);

  async function handleGoogle() {
    setOauthLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.href },
    });
    if (error) setOauthLoading(false);
  }

  return (
    <div className="mb-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-panel to-fuchsia-500/10 p-6 text-center sm:p-8">
      <PartyPopper size={32} className="mx-auto mb-3 text-warning" />
      <h2 className="text-xl font-extrabold text-text sm:text-2xl">{t("guestGate.resultTitle")}</h2>
      <p className="mt-1 text-sm text-text-muted">
        {t("guestGate.resultDesc")} — {score}% ({correct}/{total})
      </p>

      <div className="mx-auto mt-5 max-w-sm space-y-2.5">
        <button
          onClick={handleGoogle}
          disabled={oauthLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-border-soft bg-panel-alt px-4 py-3 text-sm font-bold text-text hover:bg-panel disabled:opacity-60"
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
      <p className="mt-3 text-xs text-text-faint">{t("guestGate.resultKeepsResult")}</p>
    </div>
  );
}
