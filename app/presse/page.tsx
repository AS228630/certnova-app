"use client";

import { Newspaper } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";

export default function PressePage() {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
          <Newspaper size={24} />
        </div>
        <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("pressePage.title")}</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-text-muted">{t("pressePage.desc")}</p>
        <a
          href="mailto:info@certcoach.de?subject=Presseanfrage"
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
        >
          {t("pressePage.cta")}
        </a>
      </main>
      <Footer />
    </div>
  );
}
