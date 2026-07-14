"use client";

import { Accessibility } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";

export default function BarrierefreiheitPage() {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
            <Accessibility size={24} />
          </div>
          <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("footer.accessibility")}</h1>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-text-muted">
          <p>{t("barrierePage.p1")}</p>
          <p>{t("barrierePage.p2")}</p>
          <p>
            {t("barrierePage.p3")}{" "}
            <a href="mailto:info@certcoach.de" className="text-primary hover:underline">
              info@certcoach.de
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
