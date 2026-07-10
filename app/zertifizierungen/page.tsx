"use client";

import Link from "next/link";
import { ArrowRight, Star, Users, Award, BadgeCheck } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { companies } from "@/lib/companiesData";
import { getCompanyIcon } from "@/lib/vendorIcons";
import { useLocale } from "@/components/LocaleProvider";
import { useGuestOnlyRedirect } from "@/lib/useGuestOnlyRedirect";

export default function ZertifizierungenPreviewPage() {
  const { t } = useLocale();
  const sorted = [...companies].sort((a, b) => b.rating - a.rating);
  const { checking } = useGuestOnlyRedirect();

  if (checking) return null;

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
            <Award size={13} />
            {t("certPreview.badge")}
          </span>
          <h1 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight text-text sm:text-4xl">
            {t("certPreview.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-text-muted sm:text-base">
            {t("certPreview.subtitle")}
          </p>
          <Link
            href="/register"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
          >
            {t("certPreview.ctaMain")}
            <ArrowRight size={16} />
          </Link>
        </section>

        {/* Real catalog grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((c) => (
              <div
                key={c.slug}
                className="flex flex-col gap-3 rounded-2xl border border-border-soft bg-panel p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-panel-alt">
                    {getCompanyIcon(c.slug, 22)}
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-warning">
                    <Star size={12} className="fill-warning" />
                    {c.rating.toFixed(1)}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-text">{c.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-text-faint">{c.tagline}</p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-border-soft pt-3 text-xs text-text-faint">
                  <span className="flex items-center gap-1">
                    <BadgeCheck size={13} />
                    {c.totalCertCount} {t("certPreview.certsSuffix")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={13} />
                    {c.students}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-primary to-fuchsia-600 p-8 text-center">
          <h2 className="text-xl font-extrabold text-white sm:text-2xl">{t("certPreview.bottomCtaTitle")}</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-white/80">{t("certPreview.bottomCtaDesc")}</p>
          <Link
            href="/register"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-primary hover:bg-white/90"
          >
            {t("certPreview.ctaMain")}
            <ArrowRight size={16} />
          </Link>
        </section>

        <div className="mt-12">
          <Footer />
        </div>
      </main>
    </div>
  );
}
