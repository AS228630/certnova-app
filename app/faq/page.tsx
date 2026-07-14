"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"];

export default function FaqPage() {
  const { t } = useLocale();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
            <HelpCircle size={24} />
          </div>
          <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("faqPage.title")}</h1>
          <p className="mt-2 text-sm text-text-muted">{t("faqPage.desc")}</p>
        </div>

        <div className="divide-y divide-border-soft rounded-2xl border border-border-soft bg-panel">
          {FAQ_KEYS.map((key, i) => (
            <div key={key}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <span className="text-sm font-bold text-text">{t(`faqPage.${key}Q`)}</span>
                <ChevronDown size={16} className={`shrink-0 text-text-faint transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <p className="px-5 pb-5 text-sm leading-relaxed text-text-muted">{t(`faqPage.${key}A`)}</p>}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
