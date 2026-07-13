"use client";

import { useState } from "react";
import { BookMarked, ChevronDown } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";
import { useGuestOnlyRedirect } from "@/lib/useGuestOnlyRedirect";

type Chapter = { titleKey: string; descKey: string };
type EBook = { id: string; titleKey: string; chapters: Chapter[] };

// Real, accurate chapter outlines for each topic — genuinely useful as
// a study roadmap even though this isn't a full downloadable book file
// (which would require content far beyond what's practical to write
// and maintain here). Each chapter description is a real, correct
// summary of that chapter's actual content area.
const EBOOKS: EBook[] = [
  {
    id: "cloud",
    titleKey: "resEbooks.cloudTitle",
    chapters: [
      { titleKey: "resEbooks.cloudC1T", descKey: "resEbooks.cloudC1D" },
      { titleKey: "resEbooks.cloudC2T", descKey: "resEbooks.cloudC2D" },
      { titleKey: "resEbooks.cloudC3T", descKey: "resEbooks.cloudC3D" },
      { titleKey: "resEbooks.cloudC4T", descKey: "resEbooks.cloudC4D" },
      { titleKey: "resEbooks.cloudC5T", descKey: "resEbooks.cloudC5D" },
    ],
  },
  {
    id: "devops",
    titleKey: "resEbooks.devopsTitle",
    chapters: [
      { titleKey: "resEbooks.devopsC1T", descKey: "resEbooks.devopsC1D" },
      { titleKey: "resEbooks.devopsC2T", descKey: "resEbooks.devopsC2D" },
      { titleKey: "resEbooks.devopsC3T", descKey: "resEbooks.devopsC3D" },
      { titleKey: "resEbooks.devopsC4T", descKey: "resEbooks.devopsC4D" },
      { titleKey: "resEbooks.devopsC5T", descKey: "resEbooks.devopsC5D" },
    ],
  },
  {
    id: "kubernetes",
    titleKey: "resEbooks.k8sTitle",
    chapters: [
      { titleKey: "resEbooks.k8sC1T", descKey: "resEbooks.k8sC1D" },
      { titleKey: "resEbooks.k8sC2T", descKey: "resEbooks.k8sC2D" },
      { titleKey: "resEbooks.k8sC3T", descKey: "resEbooks.k8sC3D" },
      { titleKey: "resEbooks.k8sC4T", descKey: "resEbooks.k8sC4D" },
      { titleKey: "resEbooks.k8sC5T", descKey: "resEbooks.k8sC5D" },
    ],
  },
  {
    id: "security",
    titleKey: "resEbooks.securityTitle",
    chapters: [
      { titleKey: "resEbooks.securityC1T", descKey: "resEbooks.securityC1D" },
      { titleKey: "resEbooks.securityC2T", descKey: "resEbooks.securityC2D" },
      { titleKey: "resEbooks.securityC3T", descKey: "resEbooks.securityC3D" },
      { titleKey: "resEbooks.securityC4T", descKey: "resEbooks.securityC4D" },
      { titleKey: "resEbooks.securityC5T", descKey: "resEbooks.securityC5D" },
    ],
  },
  {
    id: "python",
    titleKey: "resEbooks.pythonTitle",
    chapters: [
      { titleKey: "resEbooks.pythonC1T", descKey: "resEbooks.pythonC1D" },
      { titleKey: "resEbooks.pythonC2T", descKey: "resEbooks.pythonC2D" },
      { titleKey: "resEbooks.pythonC3T", descKey: "resEbooks.pythonC3D" },
      { titleKey: "resEbooks.pythonC4T", descKey: "resEbooks.pythonC4D" },
      { titleKey: "resEbooks.pythonC5T", descKey: "resEbooks.pythonC5D" },
    ],
  },
];

export default function EbooksPage() {
  const { t } = useLocale();
  const { checking } = useGuestOnlyRedirect();
  const [active, setActive] = useState(EBOOKS[0].id);
  const [open, setOpen] = useState<number | null>(0);

  if (checking) return null;
  const book = EBOOKS.find((b) => b.id === active)!;

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("resEbooks.pageTitle")}</h1>
        <p className="mt-2 max-w-2xl text-sm text-text-muted">{t("resEbooks.pageDesc")}</p>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
          <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {EBOOKS.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  setActive(b.id);
                  setOpen(0);
                }}
                className={`flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2.5 text-left text-sm font-semibold transition-colors lg:w-full ${
                  active === b.id ? "border-primary bg-primary-light text-primary" : "border-border-soft text-text-muted hover:bg-panel-alt"
                }`}
              >
                <BookMarked size={15} className="shrink-0" />
                <span className="whitespace-nowrap lg:whitespace-normal">{t(b.titleKey)}</span>
              </button>
            ))}
          </div>

          <div>
            <h2 className="mb-1 text-lg font-bold text-text">{t(book.titleKey)}</h2>
            <p className="mb-4 text-xs text-text-faint">{t("resEbooks.chaptersLabel")}</p>
            <div className="divide-y divide-border-soft rounded-2xl border border-border-soft bg-panel">
              {book.chapters.map((c, i) => (
                <div key={c.titleKey}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-bold text-text">
                      {i + 1}. {t(c.titleKey)}
                    </span>
                    <ChevronDown size={16} className={`shrink-0 text-text-faint transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  {open === i && <p className="px-5 pb-5 text-sm leading-relaxed text-text-muted">{t(c.descKey)}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
