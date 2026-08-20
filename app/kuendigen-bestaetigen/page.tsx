"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";

type Stage = "loading" | "success" | "invalid" | "expired" | "alreadyConfirmed" | "error";

// Step two of the email-confirmed cancellation flow (see
// app/api/cancel-subscription/route.ts and
// app/api/confirm-cancellation/route.ts). Reached only via the link in
// the confirmation email — the token in the URL is what actually
// authorizes the cancellation, so this page calls the confirm endpoint
// automatically on load rather than requiring another click.
export default function KuendigenBestaetigenPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-bg">
          <Loader2 size={28} className="animate-spin text-primary" />
        </div>
      }
    >
      <KuendigenBestaetigenContent />
    </Suspense>
  );
}

function KuendigenBestaetigenContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [stage, setStage] = useState<Stage>(token ? "loading" : "invalid");
  const [cancelAt, setCancelAt] = useState<number | null>(null);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await fetch("/api/confirm-cancellation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const json = await res.json();
        if (json.success) {
          setCancelAt(json.cancelAt);
          setStage("success");
        } else if (res.status === 410) {
          setStage("expired");
        } else if (res.status === 409) {
          setStage("alreadyConfirmed");
        } else if (res.status === 404 || res.status === 400) {
          setStage("invalid");
        } else {
          setStage("error");
        }
      } catch {
        setStage("error");
      }
    })();
  }, [token]);

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-xl px-4 py-14 text-center sm:px-6 lg:px-8">
        {stage === "loading" && (
          <div className="flex flex-col items-center gap-3 py-10">
            <Loader2 size={28} className="animate-spin text-primary" />
            <p className="text-sm text-text-muted">Kündigung wird bestätigt …</p>
          </div>
        )}

        {stage === "success" && (
          <div className="rounded-2xl border border-border-soft bg-panel p-6 sm:p-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
              <CheckCircle2 size={24} />
            </div>
            <h1 className="mb-2 text-xl font-extrabold text-text">Kündigung bestätigt</h1>
            <p className="mb-1 text-sm text-text-muted">Dein Abonnement wird nicht verlängert.</p>
            {cancelAt && (
              <p className="text-sm text-text-muted">
                Wirksam zum {new Date(cancelAt).toLocaleDateString("de-DE")}.
              </p>
            )}
            <Link href="/" className="mt-6 inline-block text-sm font-semibold text-primary hover:underline">
              Zurück zur Startseite
            </Link>
          </div>
        )}

        {(stage === "invalid" || stage === "expired" || stage === "alreadyConfirmed" || stage === "error") && (
          <div className="rounded-2xl border border-border-soft bg-panel p-6 sm:p-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-danger-light text-danger">
              <XCircle size={24} />
            </div>
            <h1 className="mb-2 text-xl font-extrabold text-text">
              {stage === "expired" ? "Bestätigungslink abgelaufen" : stage === "alreadyConfirmed" ? "Bereits bestätigt" : "Bestätigungslink ungültig"}
            </h1>
            <p className="mb-6 text-sm leading-relaxed text-text-muted">
              {stage === "expired" &&
                "Dieser Link ist nach 30 Minuten abgelaufen. Bitte starte den Kündigungsvorgang erneut."}
              {stage === "alreadyConfirmed" && "Diese Kündigung wurde bereits bestätigt."}
              {stage === "invalid" && "Dieser Bestätigungslink ist ungültig oder unvollständig."}
              {stage === "error" &&
                "Bei der Bearbeitung ist ein Fehler aufgetreten. Bitte versuche es erneut oder wende dich an unseren Support."}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Link
                href="/kuendigen"
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
              >
                Erneut versuchen
              </Link>
              <Link
                href="/kontakt"
                className="rounded-lg border border-border-soft px-5 py-2.5 text-sm font-semibold text-text hover:bg-panel-alt"
              >
                Support kontaktieren
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
