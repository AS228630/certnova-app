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

function useAddOns() {
  const { t } = useLocale();
  return [
    {
      icon: BookOpen,
      name: t("upgrade.addonCourseName"),
      tag: t("upgrade.addonCourseTag"),
      price: "ab €29",
      period: "Kurs",
      features: [t("upgrade.addonCourseFeature1"), t("upgrade.addonCourseFeature2"), t("upgrade.addonCourseFeature3")],
      cta: t("upgrade.addonCourseCta"),
      href: "/certifications",
    },
    {
      icon: MonitorSmartphone,
      name: t("upgrade.addonLabName"),
      tag: t("upgrade.addonLabTag"),
      price: "ab €9",
      period: "Monat",
      features: [t("upgrade.addonLabFeature1"), t("upgrade.addonLabFeature2"), t("upgrade.addonLabFeature3")],
      cta: t("upgrade.addonLabCta"),
      href: "/certifications",
    },
    {
      icon: FileQuestion,
      name: t("upgrade.addonExamName"),
      tag: t("upgrade.addonExamTag"),
      price: "ab €14",
      period: "Monat",
      features: [t("upgrade.addonExamFeature1"), t("upgrade.addonExamFeature2"), t("upgrade.addonExamFeature3")],
      cta: t("upgrade.addonExamCta"),
      href: "/certifications",
    },
    {
      icon: Sparkles,
      name: t("upgrade.addonAiCoachName"),
      tag: t("upgrade.addonAiCoachTag"),
      price: "ab €9",
      period: "Monat",
      features: [t("upgrade.addonAiCoachFeature1"), t("upgrade.addonAiCoachFeature2"), t("upgrade.addonAiCoachFeature3")],
      cta: t("upgrade.addonAiCoachCta"),
      href: "/ai-coach",
    },
    {
      icon: Route,
      name: t("upgrade.addonPathName"),
      tag: t("upgrade.addonPathTag"),
      price: "ab €29",
      period: "Monat",
      features: [t("upgrade.addonPathFeature1"), t("upgrade.addonPathFeature2"), t("upgrade.addonPathFeature3")],
      cta: t("upgrade.addonPathCta"),
      href: "/learning-paths",
    },
  ];
}

export default function UpgradeAddOns({ onNotAvailable }: { onNotAvailable: (label: string) => void }) {
  const { t } = useLocale();
  const addOns = useAddOns();

  return (
    <div className="mt-12 space-y-8">
      <section>
        <h2 className="mb-4 text-base font-bold text-text">{t("upgrade.addOnsHeading")}</h2>
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
              {t("upgrade.studentDiscountTitle")}
              <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
                {t("upgrade.studentDiscountBadge")}
              </span>
            </p>
            <p className="mt-0.5 text-xs text-text-muted">{t("upgrade.studentDiscountDesc")}</p>
          </div>
          <button
            onClick={() => onNotAvailable(t("upgrade.studentDiscountTitle"))}
            className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
          >
            {t("upgrade.studentDiscountCta")}
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
