"use client";

import Link from "next/link";
import { ShieldCheck, Check, BookOpen, MonitorSmartphone, FileQuestion, Sparkles } from "lucide-react";
import { PLAN_PRICES } from "@/lib/stripeConfig";

// Single source of truth for what's actually charged (the same file
// app/api/create-checkout-session/route.ts reads from) — every number
// below is derived from these two values at runtime, never a second
// hardcoded copy, on either page that renders this panel.
export const MONTHLY_EUR = PLAN_PRICES.monthly.amount / 100;
export const YEARLY_EUR = PLAN_PRICES.yearly.amount / 100;
export const YEARLY_EQUIVALENT_MONTHLY = MONTHLY_EUR * 12;
export const YEARLY_SAVINGS_EUR = YEARLY_EQUIVALENT_MONTHLY - YEARLY_EUR;
export const YEARLY_SAVINGS_PERCENT = Math.round((YEARLY_SAVINGS_EUR / YEARLY_EQUIVALENT_MONTHLY) * 100);

type PlanAction = { href: string } | { onClick: () => void; loading?: boolean };

export default function PricingPanel({
  monthly,
  yearly,
  currentPlanLabel,
}: {
  monthly: PlanAction;
  yearly: PlanAction;
  /** Shown above the panel only where relevant (a signed-in user on
   * /upgrade) — the guest /pricing page has no "current plan" concept,
   * so it simply omits this prop rather than showing a fake one. */
  currentPlanLabel?: string;
}) {
  return (
    <div>
      {currentPlanLabel && (
        <p className="mb-3 text-xs text-text-faint">
          Aktueller Plan: <span className="font-semibold text-text">{currentPlanLabel}</span>
        </p>
      )}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_1fr_1fr_260px]">
        {/* Left panel */}
        <div className="flex flex-col justify-between rounded-2xl border border-border-soft bg-panel p-5">
          <div>
            {/* Deliberately NOT a "30-Tage Geld-zurück-Garantie" badge —
                checked against the real AGB (Abschnitt 5): cancelling
                explicitly does NOT refund the remaining paid period
                ("eine anteilige Rückerstattung für die laufende Periode
                erfolgt nicht"). A money-back guarantee badge here would
                directly contradict the site's own binding terms. Shows
                the real, confirmed policy instead. */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-semibold text-primary">
              <ShieldCheck size={12} />
              Monatlich kündbar
            </span>
            <p className="mt-5 text-lg font-extrabold text-text">Wähle deinen Plan</p>
            <Link href="/widerrufsrecht" className="mt-2 block text-xs text-text-faint underline hover:text-text-muted">
              Gesetzliches Widerrufsrecht
            </Link>
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
          {"href" in monthly ? (
            <Link
              href={monthly.href}
              className="mt-5 rounded-lg border border-border-soft px-4 py-2.5 text-center text-sm font-bold text-text transition-colors hover:bg-panel-alt"
            >
              Monatlich starten
            </Link>
          ) : (
            <button
              onClick={monthly.onClick}
              disabled={monthly.loading}
              className="mt-5 rounded-lg border border-border-soft px-4 py-2.5 text-center text-sm font-bold text-text transition-colors hover:bg-panel-alt disabled:opacity-60"
            >
              Monatlich starten
            </button>
          )}
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
          {"href" in yearly ? (
            <Link
              href={yearly.href}
              className="mt-5 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-primary-dark"
            >
              Jährlich starten
            </Link>
          ) : (
            <button
              onClick={yearly.onClick}
              disabled={yearly.loading}
              className="mt-5 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
            >
              Jährlich starten
            </button>
          )}
        </div>

        {/* Add-ons — display only: these aren't real purchasable Stripe
            products (Premium already includes Labs/Practice/Exam
            Simulation per the earlier Option-B decision), so no
            checkout button is wired here rather than pretending one
            works. */}
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

      <p className="mt-4 text-center text-[11px] text-text-faint">
        Für Unternehmen und Teams?{" "}
        <Link href="/business" className="font-semibold text-primary hover:underline">
          Business-Plan ansehen
        </Link>
      </p>
    </div>
  );
}
