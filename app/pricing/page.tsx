"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Wallet,
  CalendarDays,
  Crown,
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
  GraduationCap,
  Bot,
  MessagesSquare,
  LifeBuoy,
  BarChart3,
  Languages,
  Loader2,
} from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase/client";

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
    a: "Ja, wir bieten vergünstigte Konditionen für Studierende und Bildungseinrichtungen an. Kontaktiere unseren Support für weitere Informationen.",
  },
];


export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (!data.session) {
        router.replace("/register");
        return;
      }
      setChecked(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/register");
        return;
      }
      setChecked(true);
    });
    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [router]);

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <Loader2 size={22} className="animate-spin text-text-faint" />
      </div>
    );
  }

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
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
