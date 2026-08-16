"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/lib/supabase/client";
import { useLocale } from "@/components/LocaleProvider";

function MicrosoftLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 23 23">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

type OAuthProvider = "google" | "github" | "azure";

/**
 * The single, shared Stage 5 "Free Registration Gate" — per the
 * advisor's explicit architecture, this is the ONE component reused
 * (with a different `returnTo`) at all three trigger points: Practice
 * (Teil 2, question 2), Labs (the lab after the last free one), and
 * Exam Simulation ("continue with the full simulation"). Never
 * certId-specific — the caller decides where the gate fires, this
 * component only handles Auth + returning the browser to that exact
 * path afterward.
 *
 * Reuses the exact same real, already-configured OAuth providers
 * (google/github/azure — "azure" is Microsoft, verified against
 * AuthCard.tsx, the real /register page) and the same `redirect` query
 * param mechanism already proven there — no new Auth provider invented,
 * no new return-context system built from scratch.
 *
 * This creates an account only — never activates Premium. A brand-new
 * account is Free by default; Premium still only ever happens through
 * /upgrade's real Checkout, completely separately.
 */
export default function FreeRegistrationGate({
  returnTo,
  onClose,
}: {
  /** Real relative path to send the browser back to after a successful
   * sign-up — e.g. the exact practice/lab/exam page the person was on. */
  returnTo: string;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const [oauthLoading, setOauthLoading] = useState<OAuthProvider | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Same generic focus-return pattern as PremiumGateModal: captures
  // whatever was actually focused right before this opened (the real
  // trigger, whichever of this modal's several callers it was) and
  // restores it on close — one central mechanism, not duplicated per
  // page (Stage 5 spec item 7 / doc 22 item 7).
  const triggerElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    triggerElementRef.current = document.activeElement as HTMLElement | null;
    return () => {
      triggerElementRef.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  async function handleOAuth(provider: OAuthProvider) {
    setError(null);
    setOauthLoading(provider);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}${returnTo}` },
    });
    if (oauthError) {
      setOauthLoading(null);
      setError(oauthError.message);
    }
    // On success Supabase navigates the browser away — nothing more to do here.
  }

  const emailHref = `/register?redirect=${encodeURIComponent(returnTo)}`;
  const loginHref = `/login?redirect=${encodeURIComponent(returnTo)}`;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-[460px] rounded-2xl border border-border-soft bg-panel p-6 text-center sm:p-8">
        <button onClick={onClose} className="absolute right-4 top-4 text-text-faint hover:text-text" aria-label={t("help.close")}>
          <X size={18} />
        </button>

        {/* Celebration icon — deliberately smaller than Stage 4's Trophy
            (64-80px vs 160px), so the two remain visually distinct: this
            is a registration prompt, not a results celebration. */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10">
          <span className="text-3xl" aria-hidden="true">
            🎉
          </span>
        </div>

        <h2 className="text-xl font-extrabold text-text">{t("registrationGate.title")}</h2>
        <p className="mt-3 text-sm text-text-muted">{t("registrationGate.subtitle")}</p>

        <ul className="mx-auto mt-6 max-w-xs space-y-2 text-left">
          {[
            t("registrationGate.benefit1"),
            t("registrationGate.benefit2"),
            t("registrationGate.benefit3"),
            t("registrationGate.benefit4"),
          ].map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-text-muted">
              <span className="mt-0.5 text-success">✓</span>
              {b}
            </li>
          ))}
        </ul>

        {error && <p className="mt-4 text-xs font-medium text-danger">{error}</p>}

        <div className="mt-6 space-y-2.5">
          <button
            onClick={() => handleOAuth("google")}
            disabled={oauthLoading !== null}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-bold text-gray-800 hover:bg-gray-50 disabled:opacity-60"
          >
            <FcGoogle size={18} />
            {t("registrationGate.googleCta")}
          </button>
          <button
            onClick={() => handleOAuth("azure")}
            disabled={oauthLoading !== null}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-border-soft bg-panel-alt px-4 py-3 text-sm font-bold text-text hover:bg-panel disabled:opacity-60"
          >
            <MicrosoftLogo size={16} />
            {t("registrationGate.microsoftCta")}
          </button>
          <button
            onClick={() => handleOAuth("github")}
            disabled={oauthLoading !== null}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-border-soft bg-panel-alt px-4 py-3 text-sm font-bold text-text hover:bg-panel disabled:opacity-60"
          >
            <FaGithub size={18} />
            {t("registrationGate.githubCta")}
          </button>
          <Link
            href={emailHref}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-border-soft bg-panel-alt px-4 py-3 text-sm font-bold text-text hover:bg-panel"
          >
            <Mail size={17} />
            {t("registrationGate.emailCta")}
          </Link>
        </div>

        <p className="mt-5 text-sm text-text-faint">
          {t("registrationGate.alreadyHaveAccount")}{" "}
          <Link href={loginHref} className="font-semibold text-primary hover:underline">
            {t("registrationGate.loginCta")}
          </Link>
        </p>
      </div>
    </div>
  );
}
