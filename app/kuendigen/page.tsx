"use client";

import { useState } from "react";
import Link from "next/link";
import { XCircle, CheckCircle2, Loader2, AlertTriangle } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";
import { supabase } from "@/lib/supabase/client";

// Legally required cancellation flow (§ 312k BGB, in force since
// 1 July 2022): a permanently visible, non-login-gated way for
// consumers to cancel an online subscription contract. Reachable at
// /kuendigen and linked directly in the footer on every page. The
// button label "Jetzt kündigen" uses the statutory safe-harbor wording
// and is intentionally never translated, regardless of site locale,
// since that specific German wording is what case law requires.
type Stage = "intro" | "form" | "success" | "notFound" | "error";

export default function KuendigenPage() {
  const { t } = useLocale();
  const [stage, setStage] = useState<Stage>("intro");
  const [email, setEmail] = useState("");
  const [reasonType, setReasonType] = useState<"ordentlich" | "ausserordentlich">("ordentlich");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [cancelAt, setCancelAt] = useState<number | null>(null);

  async function handleSubmit() {
    setLoading(true);
    try {
      const { data } = await supabase.auth.getSession();
      const accessToken = data.session?.access_token;

      const res = await fetch("/api/cancel-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken, email: email || undefined }),
      });
      const json = await res.json();

      if (res.status === 404) {
        setStage("notFound");
      } else if (json.success) {
        setCancelAt(json.cancelAt);
        setStage("success");
      } else {
        setStage("error");
      }
    } catch {
      setStage("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-danger-light text-danger">
            <XCircle size={24} />
          </div>
          <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("kuendigen.title")}</h1>
        </div>

        {stage === "intro" && (
          <div className="rounded-2xl border border-border-soft bg-panel p-6 text-center sm:p-8">
            <p className="mb-6 text-sm leading-relaxed text-text-muted">{t("kuendigen.intro")}</p>
            <button
              onClick={() => setStage("form")}
              className="w-full rounded-lg bg-danger py-3 text-sm font-bold text-white hover:opacity-90"
            >
              Jetzt kündigen
            </button>
          </div>
        )}

        {stage === "form" && (
          <div className="rounded-2xl border border-border-soft bg-panel p-6 sm:p-8">
            <p className="mb-5 text-sm text-text-muted">{t("kuendigen.formIntro")}</p>

            <label className="mb-4 block text-left">
              <span className="mb-1.5 block text-xs font-semibold text-text-faint">{t("kuendigen.emailLabel")}</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@email.de"
                className="w-full rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 text-sm text-text"
              />
              <span className="mt-1 block text-[11px] text-text-faint">{t("kuendigen.emailHint")}</span>
            </label>

            <div className="mb-4 space-y-2">
              <span className="mb-1.5 block text-xs font-semibold text-text-faint">{t("kuendigen.typeLabel")}</span>
              {(["ordentlich", "ausserordentlich"] as const).map((opt) => (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-lg border p-3 text-left text-xs ${
                    reasonType === opt ? "border-primary bg-primary-light" : "border-border-soft"
                  }`}
                >
                  <input
                    type="radio"
                    checked={reasonType === opt}
                    onChange={() => setReasonType(opt)}
                    className="accent-primary"
                  />
                  <span className="text-text">
                    {opt === "ordentlich" ? t("kuendigen.typeOrdentlich") : t("kuendigen.typeAusserordentlich")}
                  </span>
                </label>
              ))}
            </div>

            {reasonType === "ausserordentlich" && (
              <label className="mb-4 block text-left">
                <span className="mb-1.5 block text-xs font-semibold text-text-faint">{t("kuendigen.reasonLabel")}</span>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 text-sm text-text"
                />
              </label>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !email}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-danger py-3 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              {t("kuendigen.ctaSubmit")}
            </button>
          </div>
        )}

        {stage === "success" && (
          <div className="rounded-2xl border border-border-soft bg-panel p-6 text-center sm:p-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success-light text-success">
              <CheckCircle2 size={26} />
            </div>
            <h2 className="mb-2 text-lg font-bold text-text">{t("kuendigen.successTitle")}</h2>
            <p className="mb-1 text-sm text-text-muted">{t("kuendigen.successType")}</p>
            {cancelAt && (
              <p className="mb-4 text-sm font-semibold text-text">
                {t("kuendigen.successEffective")}: {new Date(cancelAt).toLocaleDateString("de-DE")}
              </p>
            )}
            <Link href="/" className="text-sm font-semibold text-primary hover:underline">
              {t("kuendigen.backHome")}
            </Link>
          </div>
        )}

        {stage === "notFound" && (
          <div className="rounded-2xl border border-border-soft bg-panel p-6 text-center sm:p-8">
            <AlertTriangle size={26} className="mx-auto mb-3 text-warning" />
            <p className="mb-4 text-sm text-text-muted">{t("kuendigen.notFound")}</p>
            <Link href="/kontakt" className="text-sm font-semibold text-primary hover:underline">
              {t("kuendigen.contactSupport")}
            </Link>
          </div>
        )}

        {stage === "error" && (
          <div className="rounded-2xl border border-border-soft bg-panel p-6 text-center sm:p-8">
            <AlertTriangle size={26} className="mx-auto mb-3 text-danger" />
            <p className="mb-4 text-sm text-text-muted">{t("kuendigen.error")}</p>
            <Link href="/kontakt" className="text-sm font-semibold text-primary hover:underline">
              {t("kuendigen.contactSupport")}
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
