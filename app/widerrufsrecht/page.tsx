"use client";

import { FileText } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";

// Standard German consumer right-of-withdrawal notice for digital
// services, since online payment (and therefore actual withdrawable
// purchases) doesn't exist on the platform yet. Honestly notes that no
// paid subscriptions are currently active.
export default function WiderrufsrechtPage() {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
            <FileText size={24} />
          </div>
          <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("footer.withdrawal")}</h1>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-text-muted">
          <p className="rounded-xl border border-border-soft bg-panel-alt p-4">{t("widerrufPage.noPaymentsNote")}</p>
          <h2 className="font-bold text-text">{t("widerrufPage.title1")}</h2>
          <p>{t("widerrufPage.p1")}</p>
          <h2 className="font-bold text-text">{t("widerrufPage.title2")}</h2>
          <p>{t("widerrufPage.p2")}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
