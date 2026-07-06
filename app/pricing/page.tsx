"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  CalendarDays,
  Crown,
  Building2,
  CreditCard,
  RefreshCcw,
  ShieldCheck,
  Check,
  ChevronDown,
  BookOpen,
  MonitorSmartphone,
  FileQuestion,
  Sparkles,
  Route,
  ArrowRight,
  Rocket,
} from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";

type Billing = "monthly" | "yearly";

const plans = [
  {
    icon: Wallet,
    iconClass: "bg-white/10 text-text",
    name: "Kostenlos",
    tag: "Free Plan",
    tagClass: "text-success",
    price: { monthly: "€0", yearly: "€0" },
    period: { monthly: "immer", yearly: "immer" },
    description: "Perfekt zum Starten und Kennenlernen der Plattform.",
    features: [
      "Zugriff auf kostenlose Kurse",
      "1 aktive Lab-Umgebung",
      "3 Exam-Simulationen / Monat",
      "KI Coach – begrenzter Zugriff",
      "Community-Zugang",
      "E-Mail-Support",
    ],
    cta: "Kostenlos starten",
    ctaHref: "/register",
    ctaClass: "border border-success/40 text-success hover:bg-success/10",
    featured: false,
  },
  {
    icon: CalendarDays,
    iconClass: "bg-primary-light text-primary",
    name: "Monatlich",
    tag: "Monthly Plan",
    tagClass: "text-text-muted",
    price: { monthly: "€19", yearly: "€19" },
    period: { monthly: "Monat", yearly: "Monat" },
    description: "Volle Flexibilität mit monatlicher Zahlung.",
    features: [
      "Unbegrenzte Kurse & Labs",
      "Unbegrenzter KI-Coach-Zugriff",
      "Praxisnahe Projekte",
      "Zertifikats-Downloads",
      "Priority Support",
      "Lernfortschritts-Analysen",
    ],
    cta: "Jetzt wählen",
    ctaHref: "/register?plan=monthly",
    ctaClass: "bg-primary text-white hover:bg-primary-dark",
    featured: false,
  },
  {
    icon: Crown,
    iconClass: "bg-primary text-white",
    name: "Jährlich",
    tag: "Annual Plan",
    tagClass: "text-text-muted",
    badge: "Spare 40%",
    price: { monthly: "€19", yearly: "€159" },
    period: { monthly: "Monat", yearly: "Jahr" },
    strikePrice: "€228",
    description: "Spare und profitiere mit dem Jahresabo.",
    features: [
      "Alles im Monatsabo",
      "2 Monate kostenlos",
      "Exklusive Inhalte",
      "Früher Zugriff auf neue Kurse",
      "Zertifikats-Downloads",
      "Priority Support",
    ],
    cta: "Jetzt wählen",
    ctaHref: "/register?plan=yearly",
    ctaClass: "bg-primary text-white hover:bg-primary-dark",
    featured: true,
  },
  {
    icon: Building2,
    iconClass: "bg-white/10 text-text",
    name: "Für Unternehmen",
    tag: "Enterprise Plan",
    tagClass: "text-text-muted",
    price: { monthly: "Individuelle Preise", yearly: "Individuelle Preise" },
    period: { monthly: "", yearly: "" },
    description: "Lösungen für Teams jeder Größe.",
    features: [
      "Team-Dashboards",
      "Fortschrittsanalysen",
      "Rollen & Rechte",
      "SLA & Support",
      "Rechnungsstellung",
      "Onboarding & Schulung",
    ],
    cta: "Mehr erfahren",
    ctaHref: "/business",
    ctaClass: "border border-border-soft text-text hover:bg-panel-alt",
    featured: false,
  },
];

const addOns = [
  {
    icon: BookOpen,
    name: "Kurse einzeln kaufen",
    tag: "Single Course Purchase",
    price: "ab €29",
    period: "Kurs",
    features: ["Lebenslanger Zugriff", "Zertifikat inklusive", "Für jedes Level"],
    cta: "Kurse entdecken",
    href: "/courses",
  },
  {
    icon: MonitorSmartphone,
    name: "Lab-Zugang",
    tag: "Cloud Labs Access",
    price: "ab €9",
    period: "Monat",
    features: ["Hands-on Labs", "Cloud-Umgebung", "Schritt-für-Schritt-Anleitungen"],
    cta: "Labs entdecken",
    href: "/certifications",
  },
  {
    icon: FileQuestion,
    name: "Exam-Simulation",
    tag: "Practice Exams",
    price: "ab €14",
    period: "Monat",
    features: ["Aktuelle Fragenpools", "Zeitgesteuerte Tests", "Detaillierte Auswertung"],
    cta: "Jetzt üben",
    href: "/certifications",
  },
  {
    icon: Sparkles,
    name: "KI Coach",
    tag: "AI Learning Assistant",
    price: "ab €9",
    period: "Monat",
    features: ["Persönlicher KI-Assistent", "Lernempfehlungen", "24/7 verfügbar"],
    cta: "KI Coach testen",
    href: "/dashboard",
  },
  {
    icon: Route,
    name: "Lernpfade",
    tag: "Career Paths",
    price: "ab €29",
    period: "Monat",
    features: ["Strukturierte Lernpfade", "Zertifikate inklusive", "Job-Ready Skills"],
    cta: "Pfad wählen",
    href: "/learning-paths",
  },
];

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
    a: "Ja, wir bieten vergünstigte Konditionen für Studierende und Bildungseinrichtungen an. Kontaktiere unser Team über die Unternehmensseite für weitere Informationen.",
  },
];

const trustedLogos = ["Google", "Microsoft", "Amazon", "Deloitte", "Siemens", "IBM"];

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

        {/* Billing toggle */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-border-soft bg-panel p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                billing === "monthly" ? "bg-panel-alt text-text" : "text-text-muted hover:text-text"
              }`}
            >
              Monatlich bezahlen
              <span className="ml-1.5 text-xs text-text-faint">0% sparen</span>
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                billing === "yearly" ? "bg-primary text-white" : "text-text-muted hover:text-text"
              }`}
            >
              Jährlich bezahlen
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] ${
                  billing === "yearly" ? "bg-white/20" : "bg-primary-light text-primary"
                }`}
              >
                Spare bis zu 40%
              </span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-5 ${
                plan.featured
                  ? "border-primary bg-panel shadow-[0_0_0_1px_rgba(109,76,255,0.4)]"
                  : "border-border-soft bg-panel"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-white">
                  {billing === "yearly" ? "Am beliebtesten" : plan.badge}
                </span>
              )}

              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${plan.iconClass}`}>
                <plan.icon size={20} />
              </div>

              <p className="mt-3 text-base font-bold text-text">{plan.name}</p>
              <p className={`text-xs font-medium ${plan.tagClass}`}>{plan.tag}</p>

              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-text">
                  {billing === "yearly" ? plan.price.yearly : plan.price.monthly}
                </span>
                {(billing === "yearly" ? plan.period.yearly : plan.period.monthly) && (
                  <span className="text-sm text-text-faint">
                    / {billing === "yearly" ? plan.period.yearly : plan.period.monthly}
                  </span>
                )}
                {plan.strikePrice && billing === "yearly" && (
                  <span className="text-xs text-text-faint line-through">statt {plan.strikePrice}</span>
                )}
              </div>

              <p className="mt-2 text-xs text-text-muted">{plan.description}</p>

              <ul className="mt-4 flex-1 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-text-muted">
                    <Check size={14} className="mt-0.5 shrink-0 text-success" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className={`mt-5 rounded-lg px-4 py-2.5 text-center text-sm font-bold transition-colors ${plan.ctaClass}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </section>

        {/* Add-ons */}
        <section className="mt-14">
          <h2 className="mb-5 text-lg font-bold text-text">Weitere Optionen &amp; Add-ons</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {addOns.map((a) => (
              <div key={a.name} className="flex flex-col rounded-xl border border-border-soft bg-panel p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light text-primary">
                  <a.icon size={17} />
                </div>
                <p className="mt-2.5 text-sm font-bold text-text">{a.name}</p>
                <p className="text-[11px] text-text-faint">{a.tag}</p>
                <p className="mt-2 text-sm font-bold text-text">
                  {a.price} <span className="text-xs font-normal text-text-faint">/ {a.period}</span>
                </p>
                <ul className="mt-3 flex-1 space-y-1.5">
                  {a.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-[11px] text-text-muted">
                      <Check size={12} className="mt-0.5 shrink-0 text-success" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={a.href}
                  className="mt-3 rounded-lg border border-border-soft px-3 py-2 text-center text-xs font-semibold text-text hover:bg-panel-alt"
                >
                  {a.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Enterprise strip */}
        <section className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-border-soft bg-panel p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
              <Building2 size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-text">Maßgeschneiderte Lösungen für dein Unternehmen</p>
              <p className="mt-0.5 text-xs text-text-muted">
                Skaliere das Lernen in deinem Team mit leistungsstarken Tools und Einblicken.
              </p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-text-muted">
                <span className="flex items-center gap-1">
                  <Check size={12} className="text-success" />
                  Flexible Preise
                </span>
                <span className="flex items-center gap-1">
                  <Check size={12} className="text-success" />
                  Dedicated Support
                </span>
                <span className="flex items-center gap-1">
                  <Check size={12} className="text-success" />
                  Individuelle Integrationen
                </span>
              </div>
            </div>
          </div>
          <Link
            href="/business"
            className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
          >
            Kontakt aufnehmen
          </Link>
        </section>

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

        {/* Trusted by */}
        <section className="mt-12 text-center">
          <p className="mb-5 text-xs text-text-faint">Vertrauenswürdig von führenden Unternehmen weltweit</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-bold text-text-faint">
            {trustedLogos.map((l) => (
              <span key={l}>{l}</span>
            ))}
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
