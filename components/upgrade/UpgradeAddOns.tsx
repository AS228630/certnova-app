"use client";

import Link from "next/link";
import {
  BookOpen,
  MonitorSmartphone,
  FileQuestion,
  Sparkles,
  Route,
  Check,
  GraduationCap,
  Users,
} from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

const addOns = [
  {
    icon: BookOpen,
    name: "Kurse einzeln kaufen",
    tag: "Single Course Purchase",
    price: "ab €29",
    period: "Kurs",
    features: ["Lebenslanger Zugriff", "Zertifikat inklusive", "Für jedes Level"],
    cta: "Kurse entdecken",
    href: "/certifications",
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
    href: "/ai-coach",
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

export default function UpgradeAddOns({ onNotAvailable }: { onNotAvailable: (label: string) => void }) {
  const { t } = useLocale();

  return (
    <div className="mt-12 space-y-8">
      <section>
        <h2 className="mb-4 text-base font-bold text-text">Weitere Optionen &amp; Add-ons</h2>
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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Student Discount */}
        <section className="flex flex-col items-start gap-4 rounded-2xl border border-border-soft bg-panel p-5 sm:flex-row sm:items-center">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            <GraduationCap size={20} />
          </div>
          <div className="flex-1">
            <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-text">
              Student Discount
              <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">Bis zu 50% Rabatt</span>
            </p>
            <p className="mt-0.5 text-xs text-text-muted">
              Du bist Student? Profitiere von einem exklusiven Rabatt auf alle kostenpflichtigen Pläne.
            </p>
          </div>
          <button
            onClick={() => onNotAvailable("Student Discount")}
            className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
          >
            Rabatt sichern
          </button>
        </section>

        {/* Team / Company Licensing */}
        <section className="flex flex-col items-start gap-4 rounded-2xl border border-border-soft bg-panel p-5 sm:flex-row sm:items-center">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success-light text-success">
            <Users size={20} />
          </div>
          <div className="flex-1">
            <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-text">
              {t("upgrade.teamLicensingTitle")}
              <span className="rounded-full bg-success-light px-2 py-0.5 text-[10px] font-bold text-success">
                {t("upgrade.teamLicensingBadge")}
              </span>
            </p>
            <p className="mt-0.5 text-xs text-text-muted">{t("upgrade.teamLicensingDesc")}</p>
          </div>
          <Link
            href="/business"
            className="shrink-0 rounded-lg border border-border-soft px-4 py-2.5 text-sm font-bold text-text hover:bg-panel-alt"
          >
            {t("upgrade.learnMore")}
          </Link>
        </section>
      </div>
    </div>
  );
}
