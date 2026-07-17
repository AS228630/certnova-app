"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";
import "./globals.css";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <html lang="de">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#0a0e1a] px-4 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-danger/15 text-danger">
          <AlertTriangle size={28} />
        </div>
        <h1 className="mb-2 text-xl font-extrabold text-white">Etwas ist schiefgelaufen</h1>
        <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/60">
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
            className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/5"
          >
            Zur Startseite
          </Link>
        </div>
      </body>
    </html>
  );
}
