"use client";

import { Target, Heart, Zap } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";

export default function UeberUnsPage() {
  const { t } = useLocale();
  const values = [
    { icon: Target, titleKey: "ueberUnsPage.v1Title", descKey: "ueberUnsPage.v1Desc" },
    { icon: Zap, titleKey: "ueberUnsPage.v2Title", descKey: "ueberUnsPage.v2Desc" },
    { icon: Heart, titleKey: "ueberUnsPage.v3Title", descKey: "ueberUnsPage.v3Desc" },
  ];
  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("ueberUnsPage.title")}</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-text-muted">{t("ueberUnsPage.desc")}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.titleKey} className="rounded-xl border border-border-soft bg-panel p-5 text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                <v.icon size={19} />
              </div>
              <p className="mb-1 font-bold text-text">{t(v.titleKey)}</p>
              <p className="text-xs text-text-faint">{t(v.descKey)}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
