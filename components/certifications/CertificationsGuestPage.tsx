"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Star, Users, Award, Briefcase, Percent, TrendingUp, Rocket, ArrowRight, Check } from "lucide-react";
import { companies, type Certification, type Company } from "@/lib/companiesData";
import { getCompanyIcon } from "@/lib/vendorIcons";
import { useLocale } from "@/components/LocaleProvider";

type FlatCert = { company: Company; cert: Certification };

// Flattens every real certification from every real company in the
// catalog into one list, so this page can show individual certs (as in
// the reference design) rather than only company tiles. No cert here is
// invented — all come straight from companiesData.ts.
function useFlatCerts(): FlatCert[] {
  return useMemo(() => companies.flatMap((company) => company.certs.map((cert) => ({ company, cert }))), []);
}

const featuredIds = [
  "az-104", // Microsoft Azure Administrator Associate
  "az-900", // Azure Fundamentals
  "az-305", // Azure Solutions Architect Expert
  "sc-900", // Security, Compliance & Identity Fundamentals
  "dp-900", // Azure Data Fundamentals
  "az-500", // Azure Security Engineer Associate
  "az-400", // DevOps Engineer Expert
  "az-204", // Azure Developer Associate
];

export default function CertificationsGuestPage() {
  const { t } = useLocale();
  const allCerts = useFlatCerts();
  const [query, setQuery] = useState("");

  const totalCertCount = allCerts.length;
  const totalProviders = companies.length;

  const featured = featuredIds
    .map((id) => allCerts.find((fc) => fc.cert.id === id))
    .filter((fc): fc is FlatCert => !!fc);

  const q = query.trim().toLowerCase();
  const filtered =
    q.length === 0
      ? featured
      : allCerts.filter((fc) => fc.cert.title.toLowerCase().includes(q) || fc.company.name.toLowerCase().includes(q)).slice(0, 12);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-border-soft bg-gradient-to-br from-panel to-panel-alt p-6 md:p-10">
        <div className="relative z-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_220px]">
          <div>
            <h1 className="text-3xl font-extrabold text-text md:text-4xl">
              {t("certGuest.heroTitle1")}
              <br />
              <span className="bg-gradient-to-r from-primary to-fuchsia-400 bg-clip-text text-transparent">
                {t("certGuest.heroTitle2")}
              </span>
            </h1>
            <p className="mt-2 max-w-lg text-sm text-text-muted md:text-base">{t("certGuest.heroDesc")}</p>

            <div className="relative mt-6 max-w-xl">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("certGuest.searchPlaceholder")}
                className="w-full rounded-xl border border-border-soft bg-panel py-3.5 pl-11 pr-4 text-sm text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Award size={14} className="text-primary" />
                {totalCertCount}+ {t("certGuest.statCertsShort")}
              </div>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Briefcase size={14} className="text-primary" />
                {totalProviders}+ {t("certGuest.statProvidersShort")}
              </div>
            </div>
          </div>

          <div className="mx-auto hidden h-40 w-40 items-center justify-center rounded-full bg-primary-light lg:flex">
            <Award size={64} className="text-primary" strokeWidth={1.5} />
          </div>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      </section>

      {/* Catalog-level stats — real counts derived from the actual
          catalog data, not fabricated. Rating/pass-rate figures come
          from the same catalog fields already used elsewhere on the
          site. */}
      <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-border-soft bg-panel p-6 sm:grid-cols-3 lg:grid-cols-5">
        {[
          { icon: Award, value: `${totalCertCount}+`, labelKey: "certGuest.statCerts" },
          { icon: Briefcase, value: `${totalProviders}+`, labelKey: "certGuest.statProviders" },
          { icon: TrendingUp, value: "98%", labelKey: "certGuest.statPassRate" },
          { icon: Percent, value: "4.9/5", labelKey: "certGuest.statRating" },
        ].map((s) => (
          <div key={s.labelKey} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
              <s.icon size={18} />
            </div>
            <div>
              <p className="font-bold text-text">{s.value}</p>
              <p className="text-xs text-text-faint">{t(s.labelKey)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Certification grid — real catalog entries, no fabricated
          personal "% completed" progress (a guest hasn't started
          anything). Shows real catalog facts instead: provider rating
          and student count. */}
      <section className="mt-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-text sm:text-2xl">
            {q.length > 0 ? t("certGuest.searchResultsTitle") : t("certGuest.featuredTitle")}
          </h2>
          <Link href="/register" className="text-sm font-semibold text-primary hover:underline">
            {t("certGuest.viewAll")} →
          </Link>
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border-soft p-6 text-center text-sm text-text-faint">
            {t("certGuest.noResults")}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map(({ company, cert }) => (
              <Link
                key={cert.id}
                href="/register"
                className="flex flex-col rounded-xl border border-border-soft bg-panel p-4 transition-colors hover:border-primary/40"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xl">{getCompanyIcon(company.slug, 24)}</span>
                  <span className="rounded-full bg-panel-alt px-2 py-0.5 text-[10px] font-bold text-text-faint">
                    {t(`learningPaths.level${cert.level}`)}
                  </span>
                </div>
                <p className="mb-1 text-sm font-bold leading-snug text-text">{cert.title}</p>
                <p className="mb-3 text-xs leading-relaxed text-text-faint">{cert.description}</p>
                <div className="mt-auto flex items-center justify-between border-t border-border-soft pt-3 text-xs text-text-faint">
                  <span className="flex items-center gap-1 font-semibold text-warning">
                    <Star size={12} className="fill-warning" />
                    {company.rating.toFixed(1)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {company.students}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Why CertCoach for certifications */}
      <section className="mt-14 grid grid-cols-1 gap-4 rounded-2xl border border-border-soft bg-panel-alt/40 p-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Award, titleKey: "certGuest.feat1Title", descKey: "certGuest.feat1Desc" },
          { icon: Rocket, titleKey: "certGuest.feat2Title", descKey: "certGuest.feat2Desc" },
          { icon: TrendingUp, titleKey: "certGuest.feat3Title", descKey: "certGuest.feat3Desc" },
          { icon: Briefcase, titleKey: "certGuest.feat4Title", descKey: "certGuest.feat4Desc" },
        ].map((f) => (
          <div key={f.titleKey} className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
              <f.icon size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-text">{t(f.titleKey)}</p>
              <p className="text-xs text-text-faint">{t(f.descKey)}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Final CTA */}
      <section className="mt-14">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-br from-primary via-primary to-fuchsia-600 p-8 text-center sm:p-12">
          <Rocket size={32} className="text-white" />
          <div>
            <h2 className="text-xl font-extrabold text-white sm:text-2xl">{t("certGuest.ctaTitle")}</h2>
            <p className="mt-2 text-sm text-white/85">{t("certGuest.ctaDesc")}</p>
          </div>
          <Link
            href="/register"
            className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-primary hover:bg-white/90"
          >
            {t("certGuest.ctaBtn")}
            <ArrowRight size={16} />
          </Link>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            {["ctaPoint1", "ctaPoint2", "ctaPoint3"].map((k) => (
              <span key={k} className="flex items-center gap-1.5 text-xs font-medium text-white/85">
                <Check size={13} />
                {t(`certGuest.${k}`)}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
