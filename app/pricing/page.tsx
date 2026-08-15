"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  CreditCard,
  RefreshCcw,
  ShieldCheck,
  Check,
  ChevronDown,
  BookOpen,
  MonitorSmartphone,
  FileQuestion,
  Sparkles,
  ArrowRight,
  Rocket,
  GraduationCap,
  Bot,
  MessagesSquare,
  LifeBuoy,
  BarChart3,
  Languages,
} from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useGuestOnlyRedirect } from "@/lib/useGuestOnlyRedirect";
import { PLAN_PRICES } from "@/lib/stripeConfig";

// Single source of truth for what's actually charged (lib/stripeConfig.ts,
// the same file app/api/create-checkout-session/route.ts reads from) —
// every number shown below is derived from these two values at runtime,
// never a second hardcoded copy, so the displayed price can never drift
// from the real Checkout price.
const MONTHLY_EUR = PLAN_PRICES.monthly.amount / 100;
const YEARLY_EUR = PLAN_PRICES.yearly.amount / 100;
const YEARLY_EQUIVALENT_MONTHLY = MONTHLY_EUR * 12;
const YEARLY_SAVINGS_EUR = YEARLY_EQUIVALENT_MONTHLY - YEARLY_EUR;
const YEARLY_SAVINGS_PERCENT = Math.round((YEARLY_SAVINGS_EUR / YEARLY_EQUIVALENT_MONTHLY) * 100);

const faqs = [
  {
    q: "Kann ich meinen Plan jederzeit ändern oder kündigen?",
    a: "Ja. Du kannst jederzeit zwischen den Plänen wechseln oder dein Abo direkt in den Kontoeinstellungen kündigen — ohne Mindestlaufzeit und ohne versteckte Gebühren.",
  },
  {
    q: "Was passiert nach Ablauf meines Plans?",
    a: "Dein Zugriff auf kostenpflichtige Inhalte endet zum Ende der Abrechnungsperiode. Deine Lernfortschritte und Zertifikate bleiben erhalten und werden nicht gelöscht.",
  },
  {
    q: "Ist eine Kreditkarte für den kostenlosen Plan erforderlich?",
    a: "Nein. Der kostenlose Plan benötigt keine Zahlungsinformationen. Du kannst sofort starten und später jederzeit upgraden.",
  },
  {
    q: "Gibt es Rabatte für Studenten oder Bildungseinrichtungen?",
    a: "Ja, wir bieten vergünstigte Konditionen für Studierende und Bildungseinrichtungen an. Kontaktiere unseren Support für weitere Informationen.",
  },
];


export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { checking } = useGuestOnlyRedirect();

  if (checking) return null;

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                <Wallet size={13} />
                Preise &amp; Pläne
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight text-text sm:text-4xl">
                Wähle den Plan,
                <br />
                <span className="text-primary">der zu dir passt.</span>
              </h1>
              <p className="mt-3 max-w-lg text-sm text-text-muted sm:text-base">
                Lerne ohne Limits, übe in realistischen Labs und bestehe deine Zertifizierungen —
                mit CertCoach.
              </p>

              <div className="mt-6 flex flex-wrap gap-5 text-sm text-text-muted">
                <span className="flex items-center gap-1.5">
                  <CreditCard size={15} className="text-primary" />
                  Keine Kreditkarte erforderlich
                </span>
                <span className="flex items-center gap-1.5">
                  <RefreshCcw size={15} className="text-primary" />
                  Jederzeit kündbar
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-primary" />
                  Sichere Zahlung
                </span>
              </div>
            </div>

            <div className="mx-auto hidden h-40 w-40 items-center justify-center rounded-full bg-primary-light lg:flex">
              <Wallet size={64} className="text-primary" strokeWidth={1.5} />
            </div>
          </div>

          <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        </section>

        {/* Pricing panel — Monthly / Yearly / Add-ons, matching the
            approved reference design. Every price below comes from
            MONTHLY_EUR/YEARLY_EUR (lib/stripeConfig.ts, the same values
            Checkout actually charges) and YEARLY_SAVINGS_PERCENT is
            computed at runtime — never a second hardcoded number that
            could drift out of sync or repeat the old "Spare 40%" math
            error (the real savings is ~30%). */}
        <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[220px_1fr_1fr_260px]">
          {/* Left panel */}
          <div className="flex flex-col justify-between rounded-2xl border border-border-soft bg-panel p-5">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-semibold text-primary">
                <ShieldCheck size={12} />
                30-Tage Geld-zurück-Garantie
              </span>
              <p className="mt-5 text-lg font-extrabold text-text">Wähle deinen Plan</p>
            </div>
          </div>

          {/* Monthly */}
          <div className="flex flex-col rounded-2xl border border-border-soft bg-panel p-5">
            <p className="text-base font-bold text-text">Monatlich</p>
            <p className="text-xs text-text-faint">Flexibel bleiben</p>
            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-text">€{MONTHLY_EUR}</span>
              <span className="text-sm text-text-faint">/ Monat</span>
            </div>
            <ul className="mt-4 flex-1 space-y-2">
              {["Voller Zugriff auf alle Premium-Funktionen", "Jederzeit kündbar", "Ideal für kurze Vorbereitung"].map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-text-muted">
                  <Check size={14} className="mt-0.5 shrink-0 text-success" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/register?plan=monthly"
              className="mt-5 rounded-lg border border-border-soft px-4 py-2.5 text-center text-sm font-bold text-text transition-colors hover:bg-panel-alt"
            >
              Monatlich starten
            </Link>
          </div>

          {/* Yearly (featured) */}
          <div className="relative flex flex-col rounded-2xl border border-primary bg-panel p-5 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-white">
              Am beliebtesten – Spare {YEARLY_SAVINGS_PERCENT}%
            </span>
            <p className="text-base font-bold text-text">Jährlich</p>
            <p className="text-xs text-text-faint">Beste Wahl für deinen Erfolg</p>
            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-text">€{YEARLY_EUR}</span>
              <span className="text-sm text-text-faint">/ Jahr</span>
              <span className="text-xs text-text-faint line-through">statt €{YEARLY_EQUIVALENT_MONTHLY}</span>
            </div>
            <ul className="mt-4 flex-1 space-y-2">
              <li className="flex items-start gap-2 text-xs text-text-muted">
                <Check size={14} className="mt-0.5 shrink-0 text-success" />
                Voller Zugriff auf alle Premium-Funktionen
              </li>
              <li className="flex items-start gap-2 text-xs text-text-muted">
                <Check size={14} className="mt-0.5 shrink-0 text-success" />
                {Math.round(YEARLY_SAVINGS_EUR / MONTHLY_EUR)} Monate kostenlos
              </li>
              <li className="flex items-start gap-2 text-xs text-text-muted">
                <Check size={14} className="mt-0.5 shrink-0 text-success" />
                Priorität Support
              </li>
              <li className="flex items-start gap-2 text-xs text-text-muted">
                <Check size={14} className="mt-0.5 shrink-0 text-success" />
                Bester Preis – Spare {YEARLY_SAVINGS_PERCENT}%
              </li>
            </ul>
            <Link
              href="/register?plan=yearly"
              className="mt-5 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-primary-dark"
            >
              Jährlich starten
            </Link>
          </div>

          {/* Add-ons — display only for now: these aren't real
              purchasable Stripe products yet (Premium already includes
              Labs/Practice/Exam Simulation), so no checkout button is
              wired here rather than pretending one works. */}
          <div className="rounded-2xl border border-border-soft bg-panel p-5">
            <p className="mb-3 text-sm font-bold text-text">
              Add-ons <span className="font-normal text-text-faint">(Optional)</span>
            </p>
            <ul className="space-y-3">
              {[
                { icon: MonitorSmartphone, name: "Labs Only", price: "€9", period: "Monat" },
                { icon: FileQuestion, name: "Exam Simulator", price: "€14", period: "Monat" },
                { icon: Sparkles, name: "AI Coach", price: "€9", period: "Monat" },
                { icon: BookOpen, name: "Single Certification", price: "€29", period: "Einmalig" },
              ].map((a) => (
                <li key={a.name} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-xs text-text-muted">
                    <a.icon size={15} className="text-primary" />
                    {a.name}
                  </span>
                  <span className="text-xs font-semibold text-text">
                    {a.price} <span className="font-normal text-text-faint">/ {a.period}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Payment methods / security */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-text-faint">
          <span>Sichere Zahlung mit</span>
          <span className="font-semibold text-text-muted">Visa</span>
          <span className="font-semibold text-text-muted">Mastercard</span>
          <span className="font-semibold text-text-muted">PayPal</span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={13} className="text-primary" />
            SSL verschlüsselt &amp; sicher
          </span>
        </div>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="mb-5 text-center text-lg font-bold text-text">Häufige Fragen</h2>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
            {faqs.map((f, i) => (
              <div key={f.q} className="rounded-xl border border-border-soft bg-panel">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-xs font-semibold text-text"
                >
                  {f.q}
                  <ChevronDown
                    size={15}
                    className={`shrink-0 text-text-faint transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && <p className="px-4 pb-3 text-xs text-text-muted">{f.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Student Discount */}
        <section className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-border-soft bg-panel p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
              <GraduationCap size={20} />
            </div>
            <div>
              <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-text">
                Student Discount
                <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">Bis zu 50% Rabatt</span>
              </p>
              <p className="mt-0.5 text-xs text-text-muted">
                Du bist Student? Profitiere von einem exklusiven Rabatt auf alle kostenpflichtigen Pläne.
              </p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-text-muted">
                <span className="flex items-center gap-1">
                  <Check size={12} className="text-success" />
                  Gültiger Studentenausweis erforderlich
                </span>
                <span className="flex items-center gap-1">
                  <Check size={12} className="text-success" />
                  Alle Pläne mit Studentenrabatt
                </span>
              </div>
            </div>
          </div>
          <Link
            href="/register?discount=student"
            className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
          >
            Rabatt sichern
          </Link>
        </section>

        {/* CertCoach AI */}
        <section className="mt-8 rounded-2xl border border-border-soft bg-panel p-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                <Bot size={22} />
              </div>
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-text">
                  CertCoach AI
                  <span className="rounded-full bg-success-light px-2 py-0.5 text-[10px] font-bold text-success">Immer für dich da</span>
                </p>
                <p className="mt-0.5 text-xs text-text-muted">
                  Dein intelligenter KI-Coach unterstützt dich beim Lernen, Üben und Verstehen — rund um die Uhr.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border-soft pt-5 sm:grid-cols-4">
            {[
              { icon: MessagesSquare, label: "Antworten auf Fragen" },
              { icon: BookOpen, label: "Erklärungen & Beispiele" },
              { icon: LifeBuoy, label: "Hilfe bei Übungen" },
              { icon: BarChart3, label: "Analyse von Fortschritt" },
              { icon: Sparkles, label: "Persönliche Lernempfehlungen" },
              { icon: Languages, label: "Mehrsprachige Unterstützung" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-panel-alt text-primary">
                  <f.icon size={16} />
                </div>
                <p className="text-[11px] text-text-muted">{f.label}</p>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-panel-alt text-success">
                <ShieldCheck size={16} />
              </div>
              <p className="text-[11px] text-text-muted">Privacy First — deine Daten sind geschützt</p>
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-gradient-to-r from-primary to-primary-dark p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
              <Rocket size={20} />
            </div>
            <div>
              <p className="text-base font-bold text-white">Bereit, deine Zukunft zu gestalten?</p>
              <p className="text-xs text-white/80">
                Starte noch heute mit IT-Zertifizierungen, Labs, KI-Coach und Karriere-Tools.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <input
              placeholder="Deine E-Mail-Adresse"
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/60 focus:outline-none sm:w-64"
            />
            <Link
              href="/register"
              className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-primary hover:bg-white/90"
            >
              Kostenlos starten
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-[11px] text-white/80 sm:hidden">
            <span>Kostenlos starten</span>
            <span>Keine Kreditkarte erforderlich</span>
            <span>Jederzeit kündbar</span>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
