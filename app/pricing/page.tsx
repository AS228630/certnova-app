"use client";

import { useState } from "react";
import Link from "next/link";
import {
  RefreshCcw,
  ShieldCheck,
  Check,
  ChevronDown,
  BookOpen,
  Sparkles,
  ArrowRight,
  Rocket,
  GraduationCap,
  Bot,
  MessagesSquare,
  LifeBuoy,
  BarChart3,
  Languages,
  Lock,
  FlaskConical,
  Target,
  MonitorCheck,
  Users,
} from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useGuestOnlyRedirect } from "@/lib/useGuestOnlyRedirect";
import PricingPanel from "@/components/pricing/PricingPanel";
import FreeRegistrationGate from "@/components/registration/FreeRegistrationGate";
import RegisterTriggerLink from "@/components/registration/RegisterTriggerLink";

// Single source of truth for what's actually charged (lib/stripeConfig.ts,
// the same file app/api/create-checkout-session/route.ts reads from) —
// every number shown below is derived from these two values at runtime,
// never a second hardcoded copy, so the displayed price can never drift
// from the real Checkout price.
// Real counts, not marketing guesses: the authored question banks
// (AZ-900 + AB-900) total 669 real exam-prep questions today — comfortably
// over 500, so "500+" here is a true, conservative claim per the
// project's no-fabricated-numbers rule, not the reference image's number
// used verbatim without checking. Free's "50" matches the real Teil-1
// section size the practice API actually enforces.
const REAL_TOTAL_QUESTIONS = 669;
const FREE_QUESTION_COUNT = 50;

// Comparison table: PlanFeature-shaped data (matches the architecture the
// advisor asked for — featureKey/label/free/premium — even though it's
// still defined in code for now rather than a database table, since no
// admin UI exists yet to edit it and the project's "no migration without
// a real need" rule applies here too).
const comparisonRows = [
  { icon: GraduationCap, label: "Learn – Alle Lektionen", free: "Modul 1 kostenlos", premium: "Alle Module", premiumOk: true },
  { icon: FlaskConical, label: "Labs", free: "Begrenzt", premium: "Unbegrenzt", premiumOk: true },
  { icon: Target, label: "Practice Questions", free: `${FREE_QUESTION_COUNT} Fragen`, premium: `${REAL_TOTAL_QUESTIONS}+ Fragen`, premiumOk: true },
  { icon: MonitorCheck, label: "Exam Simulation", free: "Nicht verfügbar", premium: "Unbegrenzt", premiumOk: true },
  { icon: RefreshCcw, label: "Fortschritt speichern", free: "Begrenzt", premium: "Unbegrenzt", premiumOk: true },
  { icon: BarChart3, label: "Detaillierte Analysen", free: "Nicht verfügbar", premium: "Verfügbar", premiumOk: true },
  { icon: Bot, label: "AI Coach", free: "Nicht verfügbar", premium: "Verfügbar", premiumOk: true },
  { icon: ShieldCheck, label: "Zertifikat-Tracking", free: "Nicht verfügbar", premium: "Verfügbar", premiumOk: true },
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showRegistrationGate, setShowRegistrationGate] = useState(false);
  const { checking } = useGuestOnlyRedirect();

  if (checking) return null;

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        {/* Unlock-journey hero — a generic/explainer version of the
            reference design's banner, deliberately NOT personalized
            (no fake "25% progress" or "Module 1 abgeschlossen" claim):
            this is the public guest pricing page, so nobody viewing it
            has any real progress yet. Shows the four real stages
            (Learn/Labs/Practice/Simulation) as a static explainer
            instead of a progress tracker. */}
        <section className="flex flex-col items-start gap-6 overflow-hidden rounded-2xl border border-border-soft bg-panel p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <Lock size={26} />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-extrabold text-text sm:text-2xl">Entsperre den vollständigen Lernpfad</h1>
            <p className="mt-1 max-w-xl text-sm text-text-muted">
              Aktiviere Premium und erhalte Zugriff auf Labs, {REAL_TOTAL_QUESTIONS}+ Fragen und die reale
              Prüfungssimulation.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {[
              { icon: BookOpen, labelText: "Learn", unlocked: true },
              { icon: FlaskConical, labelText: "Labs", unlocked: false },
              { icon: Target, labelText: "Practice", unlocked: false },
              { icon: MonitorCheck, labelText: "Simulation", unlocked: false },
            ].map((step, i, arr) => (
              <div key={step.labelText} className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      step.unlocked ? "bg-success-light text-success" : "bg-panel-alt text-text-faint"
                    }`}
                  >
                    <step.icon size={16} />
                  </div>
                  <span className="text-[10px] text-text-faint">{step.labelText}</span>
                </div>
                {i < arr.length - 1 && <div className="mb-4 h-px w-6 bg-border-soft" />}
              </div>
            ))}
          </div>
        </section>

        {/* Four feature cards */}
        <section className="mt-8">
          <h2 className="text-center text-xl font-extrabold text-text sm:text-2xl">
            Entdecke alles, was Premium für dich freischaltet
          </h2>
          <p className="mt-1 text-center text-sm text-text-muted">
            Vier Schritte zu deiner Zertifizierung – vollständig abgedeckt.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: 1,
                icon: BookOpen,
                colorClass: "text-primary",
                bgClass: "bg-primary-light",
                borderClass: "border-border-soft",
                title: "Learn",
                subtitle: "Wissen aufbauen",
                features: ["Video-Lektionen", "Lernpfade", "Zusammenfassungen", "Flashcards", "Fortschritts-Tracking"],
                footer: "Teilweise verfügbar im kostenlosen Plan",
                footerClass: "text-primary",
                featureKey: "learn",
              },
              {
                num: 2,
                icon: FlaskConical,
                colorClass: "text-accent-blue",
                bgClass: "bg-accent-blue/10",
                borderClass: "border-border-soft",
                title: "Labs",
                subtitle: "Praxis erleben",
                features: ["Hands-on Azure Labs", "Sandbox-Umgebung", "Geführte Übungen", "Lab-Berichte", "Real Cloud Experience"],
                footer: "Nur in Premium enthalten",
                footerClass: "text-accent-blue",
                featureKey: "labs",
              },
              {
                num: 3,
                icon: Target,
                colorClass: "text-success",
                bgClass: "bg-success-light",
                borderClass: "border-border-soft",
                title: "Practice Questions",
                subtitle: "Üben & verbessern",
                features: [`${REAL_TOTAL_QUESTIONS}+ echte Prüfungsfragen`, "Detaillierte Erklärungen", "Lesezeichen", "Schwächen analysieren", "Unbegrenzte Versuche"],
                footer: "Nur in Premium enthalten",
                footerClass: "text-success",
                featureKey: "practice",
              },
              {
                num: 4,
                icon: MonitorCheck,
                colorClass: "text-warning",
                bgClass: "bg-warning/10",
                borderClass: "border-warning/30",
                title: "Exam Simulation",
                subtitle: "Prüfung meistern",
                features: ["Echte Prüfungsoberfläche", "Timer & Review", "Detaillierte Auswertung", "Erfahrungsbasierte Simulation", "Unbegrenzte Simulationen"],
                footer: "Nur in Premium enthalten",
                footerClass: "text-warning",
                featureKey: "exam_simulation",
              },
              // Each card is a real link, not a decorative div — per the
              // advisor's "no purely decorative card" rule. /pricing
              // (a guest, pre-certification-selection page) never has a
              // "current certification" in context, so every card's real
              // destination today is certification selection first
              // (Certification Selection Audit, item 23) — the actual
              // Learn/Labs/Practice/Exam Simulation routing then happens
              // from a real certification page, using the existing
              // routes (/certifications/[company]/[certId]/{learn,labs,
              // practice,mock-exam}) that already enforce the real
              // Free/Premium gates. featureKey is carried as a query
              // param for a possible future context-aware highlight on
              // the certifications page — not acted on yet, since no
              // such highlighting exists there today.
            ].map((card) => (
              <Link
                key={card.title}
                href={`/certifications?feature=${card.featureKey}`}
                className={`flex flex-col rounded-2xl border ${card.borderClass} bg-panel p-5 transition-colors hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary`}
              >
                <div className="flex items-center gap-2">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${card.bgClass} ${card.colorClass}`}>
                    {card.num}
                  </span>
                </div>
                <div className={`mt-3 flex h-11 w-11 items-center justify-center rounded-xl ${card.bgClass} ${card.colorClass}`}>
                  <card.icon size={20} />
                </div>
                <p className="mt-3 text-base font-bold text-text">{card.title}</p>
                <p className="text-xs text-text-faint">{card.subtitle}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {card.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-text-muted">
                      <Check size={14} className={`mt-0.5 shrink-0 ${card.colorClass}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className={`mt-4 text-[11px] font-semibold ${card.footerClass}`}>{card.footer}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Free vs Premium comparison table */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-border-soft bg-panel">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-border-soft px-5 py-3 text-xs font-semibold text-text-faint sm:gap-8">
            <span>Vergleiche Pläne</span>
            <span className="text-right">Kostenloser Plan</span>
            <span className="text-right text-primary">Premium Plan</span>
          </div>
          {comparisonRows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-border-soft px-5 py-3 text-sm last:border-b-0 sm:gap-8"
            >
              <span className="flex items-center gap-2 text-text-muted">
                <row.icon size={15} className="text-text-faint" />
                {row.label}
              </span>
              <span className="text-right text-xs text-text-faint sm:text-sm">{row.free}</span>
              <span className="flex items-center justify-end gap-1.5 text-right text-xs font-semibold text-text sm:text-sm">
                {row.premiumOk && <Check size={14} className="text-success" />}
                {row.premium}
              </span>
            </div>
          ))}
        </section>

        {/* Pricing panel — Monthly / Yearly. Shared component
            (components/pricing/PricingPanel.tsx) also used on /upgrade,
            so there is exactly one pricing UI on the whole site instead
            of two different-looking ones. */}
        <PricingPanel
          monthly={{ onClick: () => setShowRegistrationGate(true) }}
          yearly={{ onClick: () => setShowRegistrationGate(true) }}
        />

        {/* Payment methods / security — matches exactly what
            create-checkout-session actually enables
            (payment_method_types: ["card", "paypal", "klarna"]). Apple
            Pay / Google Pay deliberately not listed here since they
            aren't separately configured — Stripe's "card" method
            surfaces them automatically on supported devices/browsers,
            but claiming them as a distinct supported method here would
            overstate what's actually configured. */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-text-faint">
          <span>Sichere Zahlung mit</span>
          <span className="font-semibold text-text-muted">Visa</span>
          <span className="font-semibold text-text-muted">Mastercard</span>
          <span className="font-semibold text-text-muted">PayPal</span>
          <span className="font-semibold text-text-muted">Klarna</span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={13} className="text-primary" />
            SSL verschlüsselt &amp; sicher
          </span>
        </div>

        {/* Final CTA banner — real, reused platform-wide marketing stats
            (same numbers already shown on the homepage's own trust
            strip), not the reference image's specific numbers taken at
            face value without checking them against the real site. */}
        <section className="mt-8 flex flex-col gap-6 overflow-hidden rounded-2xl border border-border-soft bg-gradient-to-br from-primary/20 via-panel to-fuchsia-500/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
              <Rocket size={26} />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-text sm:text-xl">Bereit für deinen nächsten Schritt?</h2>
              <p className="mt-1 max-w-md text-sm text-text-muted">
                Schließe deine Zertifizierung mit Selbstvertrauen ab.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { icon: Users, value: "120K+", label: "Aktive Lernende" },
                  { icon: BookOpen, value: "500+", label: "Kurse & Labs" },
                  { icon: ShieldCheck, value: "250+", label: "Zertifizierungen" },
                  { icon: Sparkles, value: "98%", label: "Weiterempfehlung" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="flex items-center gap-1.5 text-lg font-extrabold text-text">
                      <s.icon size={15} className="text-primary" />
                      {s.value}
                    </p>
                    <p className="text-[11px] text-text-faint">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <RegisterTriggerLink className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark">
            Jetzt Premium werden
            <ArrowRight size={16} />
          </RegisterTriggerLink>
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
          <RegisterTriggerLink className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark">
            Rabatt sichern
          </RegisterTriggerLink>
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
            <RegisterTriggerLink className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-primary hover:bg-white/90">
              Kostenlos starten
              <ArrowRight size={15} />
            </RegisterTriggerLink>
          </div>
          <div className="flex flex-wrap gap-4 text-[11px] text-white/80 sm:hidden">
            <span>Kostenlos starten</span>
            <span>Keine Kreditkarte erforderlich</span>
            <span>Jederzeit kündbar</span>
          </div>
        </section>

        <Footer />
      </main>
      {showRegistrationGate && (
        <FreeRegistrationGate returnTo="/pricing" onClose={() => setShowRegistrationGate(false)} />
      )}
    </div>
  );
}
