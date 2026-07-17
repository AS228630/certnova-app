"use client";

import Link from "next/link";
import { Compass } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <LandingHeader />
      <main className="mx-auto flex flex-1 max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light text-primary">
          <Compass size={28} />
        </div>
        <h1 className="mb-2 text-3xl font-extrabold text-text">404</h1>
        <p className="mb-6 text-sm leading-relaxed text-text-muted">
          Diese Seite konnte nicht gefunden werden. Möglicherweise wurde sie verschoben oder existiert nicht
          mehr.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            href="/"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
          >
            Zur Startseite
          </Link>
          <Link
            href="/zertifizierungen"
            className="rounded-lg border border-border-soft px-5 py-2.5 text-sm font-semibold text-text hover:bg-panel-alt"
          >
            Zertifizierungen ansehen
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
