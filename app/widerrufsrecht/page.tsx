"use client";

import { FileText } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";

// Complete German consumer right-of-withdrawal notice for a digital
// subscription service (§ 355, § 356 Abs. 4 BGB), including the
// legally required sample withdrawal form and the early-expiry clause
// for digital services that begin immediately upon payment. The German
// version is the legally authoritative one; other locales are provided
// for information only (see each dictionary's "intro" string).
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
          <p className="rounded-xl border border-border-soft bg-panel-alt p-4">{t("widerrufPage.intro")}</p>

          <h2 className="pt-2 font-bold text-text">{t("widerrufPage.title1")}</h2>
          <p>{t("widerrufPage.p1")}</p>
          <p>{t("widerrufPage.p1b")}</p>
          <p>{t("widerrufPage.p1c")}</p>

          <h2 className="pt-2 font-bold text-text">{t("widerrufPage.title2")}</h2>
          <p>{t("widerrufPage.p2")}</p>
          <p>{t("widerrufPage.p2b")}</p>

          <h2 className="pt-2 font-bold text-text">{t("widerrufPage.title3")}</h2>
          <p>{t("widerrufPage.p3")}</p>
          <p>{t("widerrufPage.p3b")}</p>

          <div className="mt-4 rounded-xl border border-border-soft bg-panel-alt p-5">
            <h2 className="mb-3 font-bold text-text">{t("widerrufPage.formTitle")}</h2>
            <p className="mb-3 text-xs text-text-faint">{t("widerrufPage.formIntro")}</p>
            <div className="space-y-3">
              <p>{t("widerrufPage.formTo")}</p>
              <p>{t("widerrufPage.formBody")}</p>
              <p>{t("widerrufPage.formOrdered")}</p>
              <p>{t("widerrufPage.formName")}</p>
              <p>{t("widerrufPage.formAddress")}</p>
              <p>{t("widerrufPage.formSignature")}</p>
              <p>{t("widerrufPage.formDate")}</p>
            </div>
            <p className="mt-3 text-xs text-text-faint">{t("widerrufPage.formNote")}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
