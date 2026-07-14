"use client";

import { Newspaper } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";

// No blog articles exist yet — honestly shown as "coming soon" rather
// than fabricating post titles and content.
export default function BlogPage() {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
          <Newspaper size={24} />
        </div>
        <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("blogPage.title")}</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-text-muted">{t("blogPage.desc")}</p>
      </main>
      <Footer />
    </div>
  );
}
