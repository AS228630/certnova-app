"use client";

import Link from "next/link";
import { Handshake } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";

export default function PartnerPage() {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
          <Handshake size={24} />
        </div>
        <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("partnerPage.title")}</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-text-muted">{t("partnerPage.desc")}</p>
        <Link
          href="/kontakt"
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
        >
          {t("partnerPage.cta")}
        </Link>
      </main>
      <Footer />
    </div>
  );
}
