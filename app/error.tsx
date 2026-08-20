"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";
import * as Sentry from "@sentry/nextjs";

// Catches errors thrown while rendering any page — this fires far more
// often than app/global-error.tsx, which only catches errors in the
// root layout itself. Same reporting + fallback UI pattern as
// global-error.tsx, kept in sync with it deliberately.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Unhandled page error:", error);
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-bg px-4 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-danger/15 text-danger">
        <AlertTriangle size={28} />
      </div>
      <h1 className="mb-2 text-xl font-extrabold text-text">Etwas ist schiefgelaufen</h1>
      <p className="mb-6 max-w-sm text-sm leading-relaxed text-text-muted">
        Es ist ein unerwarteter Fehler aufgetreten. Bitte versuche es erneut oder kehre zur Startseite zurück.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          onClick={() => reset()}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
        >
          <RotateCcw size={15} />
          Erneut versuchen
        </button>
        <Link
          href="/"
          className="rounded-lg border border-border-soft px-5 py-2.5 text-sm font-semibold text-text hover:bg-panel-alt"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
