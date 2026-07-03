"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, Menu, X } from "lucide-react";

const navLinksBefore = [
  { label: "Kurse", href: "/courses" },
  { label: "Zertifizierungen", href: "/certifications" },
  { label: "Lernpfade", href: "/learning-paths" },
];

const navLinksAfter = [
  { label: "Für Unternehmen", href: "/business" },
  { label: "Preise", href: "/pricing" },
];

export default function LandingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-panel/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            C
          </div>
          <span className="text-lg font-bold tracking-tight text-text">CertCoach</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinksBefore.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-text"
            >
              {l.label}
            </Link>
          ))}
          <button className="flex items-center gap-1 text-sm font-medium text-text-muted transition-colors hover:text-text">
            Ressourcen
            <ChevronDown size={14} />
          </button>
          {navLinksAfter.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-text"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            aria-label="Suchen"
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-border-soft text-text-muted hover:text-text sm:flex"
          >
            <Search size={16} />
          </button>
          <Link
            href="/login"
            className="hidden rounded-lg border border-border-soft px-4 py-2 text-sm font-semibold text-text hover:bg-panel-alt sm:inline-block"
          >
            Anmelden
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-primary px-3.5 py-2 text-sm font-bold text-white transition-colors hover:bg-primary-dark sm:px-4"
          >
            Jetzt starten
          </Link>
          <button
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-soft text-text-muted hover:text-text lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border-soft bg-panel px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {[...navLinksBefore, { label: "Ressourcen", href: "/resources" }, ...navLinksAfter].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-text-muted hover:bg-panel-alt hover:text-text"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg px-2 py-2.5 text-sm font-semibold text-text hover:bg-panel-alt sm:hidden"
            >
              Anmelden
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
