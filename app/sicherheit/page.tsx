"use client";

import { Lock, ShieldCheck, KeyRound, Database, Eye } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";

// Every measure described here is something genuinely implemented on
// the platform (Supabase Row Level Security, HTTPS, hashed passwords
// via Supabase Auth) — not generic marketing claims about security
// features that don't exist.
export default function SicherheitPage() {
  const { t } = useLocale();
  const measures = [
    { icon: Lock, titleKey: "sicherheitPage.m1Title", descKey: "sicherheitPage.m1Desc" },
    { icon: KeyRound, titleKey: "sicherheitPage.m2Title", descKey: "sicherheitPage.m2Desc" },
    { icon: Database, titleKey: "sicherheitPage.m3Title", descKey: "sicherheitPage.m3Desc" },
    { icon: Eye, titleKey: "sicherheitPage.m4Title", descKey: "sicherheitPage.m4Desc" },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
            <ShieldCheck size={24} />
          </div>
          <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("sicherheitPage.title")}</h1>
          <p className="mt-2 text-sm text-text-muted">{t("sicherheitPage.desc")}</p>
        </div>

        <div className="space-y-4">
          {measures.map((m) => (
            <div key={m.titleKey} className="flex items-start gap-4 rounded-xl border border-border-soft bg-panel p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                <m.icon size={18} />
              </div>
              <div>
                <p className="mb-1 font-bold text-text">{t(m.titleKey)}</p>
                <p className="text-sm text-text-muted">{t(m.descKey)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-border-soft bg-panel-alt p-5 text-sm text-text-muted">
          {t("sicherheitPage.reportNote")}{" "}
          <a href="mailto:info@certcoach.de" className="text-primary hover:underline">
            info@certcoach.de
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
