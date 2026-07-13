"use client";

import { useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";
import { useGuestOnlyRedirect } from "@/lib/useGuestOnlyRedirect";

type Section = { titleKey: string; bodyKey: string };
type Guide = { id: string; titleKey: string; sections: Section[] };

const GUIDES: Guide[] = [
  {
    id: "aws",
    titleKey: "resGuides.awsTitle",
    sections: [
      { titleKey: "resGuides.awsS1T", bodyKey: "resGuides.awsS1B" },
      { titleKey: "resGuides.awsS2T", bodyKey: "resGuides.awsS2B" },
      { titleKey: "resGuides.awsS3T", bodyKey: "resGuides.awsS3B" },
      { titleKey: "resGuides.awsS4T", bodyKey: "resGuides.awsS4B" },
    ],
  },
  {
    id: "azure",
    titleKey: "resGuides.azureTitle",
    sections: [
      { titleKey: "resGuides.azureS1T", bodyKey: "resGuides.azureS1B" },
      { titleKey: "resGuides.azureS2T", bodyKey: "resGuides.azureS2B" },
      { titleKey: "resGuides.azureS3T", bodyKey: "resGuides.azureS3B" },
      { titleKey: "resGuides.azureS4T", bodyKey: "resGuides.azureS4B" },
    ],
  },
  {
    id: "linux",
    titleKey: "resGuides.linuxTitle",
    sections: [
      { titleKey: "resGuides.linuxS1T", bodyKey: "resGuides.linuxS1B" },
      { titleKey: "resGuides.linuxS2T", bodyKey: "resGuides.linuxS2B" },
      { titleKey: "resGuides.linuxS3T", bodyKey: "resGuides.linuxS3B" },
      { titleKey: "resGuides.linuxS4T", bodyKey: "resGuides.linuxS4B" },
    ],
  },
  {
    id: "kubernetes",
    titleKey: "resGuides.k8sTitle",
    sections: [
      { titleKey: "resGuides.k8sS1T", bodyKey: "resGuides.k8sS1B" },
      { titleKey: "resGuides.k8sS2T", bodyKey: "resGuides.k8sS2B" },
      { titleKey: "resGuides.k8sS3T", bodyKey: "resGuides.k8sS3B" },
      { titleKey: "resGuides.k8sS4T", bodyKey: "resGuides.k8sS4B" },
    ],
  },
  {
    id: "examprep",
    titleKey: "resGuides.examTitle",
    sections: [
      { titleKey: "resGuides.examS1T", bodyKey: "resGuides.examS1B" },
      { titleKey: "resGuides.examS2T", bodyKey: "resGuides.examS2B" },
      { titleKey: "resGuides.examS3T", bodyKey: "resGuides.examS3B" },
      { titleKey: "resGuides.examS4T", bodyKey: "resGuides.examS4B" },
    ],
  },
];

export default function GuidesPage() {
  const { t } = useLocale();
  const { checking } = useGuestOnlyRedirect();
  const [activeGuide, setActiveGuide] = useState(GUIDES[0].id);
  const [openSection, setOpenSection] = useState<number | null>(0);

  if (checking) return null;
  const guide = GUIDES.find((g) => g.id === activeGuide)!;

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("resGuides.pageTitle")}</h1>
        <p className="mt-2 max-w-2xl text-sm text-text-muted">{t("resGuides.pageDesc")}</p>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
          <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {GUIDES.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  setActiveGuide(g.id);
                  setOpenSection(0);
                }}
                className={`flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2.5 text-left text-sm font-semibold transition-colors lg:w-full ${
                  activeGuide === g.id ? "border-primary bg-primary-light text-primary" : "border-border-soft text-text-muted hover:bg-panel-alt"
                }`}
              >
                <BookOpen size={15} className="shrink-0" />
                <span className="whitespace-nowrap lg:whitespace-normal">{t(g.titleKey)}</span>
              </button>
            ))}
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-text">{t(guide.titleKey)}</h2>
            <div className="divide-y divide-border-soft rounded-2xl border border-border-soft bg-panel">
              {guide.sections.map((s, i) => (
                <div key={s.titleKey}>
                  <button
                    onClick={() => setOpenSection(openSection === i ? null : i)}
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-bold text-text">{t(s.titleKey)}</span>
                    <ChevronDown size={16} className={`shrink-0 text-text-faint transition-transform ${openSection === i ? "rotate-180" : ""}`} />
                  </button>
                  {openSection === i && <p className="px-5 pb-5 text-sm leading-relaxed text-text-muted">{t(s.bodyKey)}</p>}
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
