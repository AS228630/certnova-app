"use client";

import { Cookie } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";

// Honestly describes what the site actually stores: only localStorage
// for theme/language preference and a Supabase auth session cookie —
// no third-party tracking or advertising cookies exist on the platform,
// so there's nothing to "opt out of" beyond what's described here.
export default function CookieEinstellungenPage() {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
            <Cookie size={24} />
          </div>
          <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("cookiePage.title")}</h1>
          <p className="mt-2 text-sm text-text-muted">{t("cookiePage.desc")}</p>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border-soft bg-panel p-5">
            <p className="mb-1 font-bold text-text">{t("cookiePage.essentialTitle")}</p>
            <p className="text-sm text-text-muted">{t("cookiePage.essentialDesc")}</p>
          </div>
          <div className="rounded-xl border border-border-soft bg-panel p-5">
            <p className="mb-1 font-bold text-text">{t("cookiePage.preferencesTitle")}</p>
            <p className="text-sm text-text-muted">{t("cookiePage.preferencesDesc")}</p>
          </div>
          <div className="rounded-xl border border-border-soft bg-panel p-5">
            <p className="mb-1 font-bold text-text">{t("cookiePage.noTrackingTitle")}</p>
            <p className="text-sm text-text-muted">{t("cookiePage.noTrackingDesc")}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
