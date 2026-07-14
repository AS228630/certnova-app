"use client";

import { Star, Trophy } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";

// Same honest pattern used elsewhere on the site: illustrative example
// stories clearly labeled "Beispiel" (not real user testimonials with
// fabricated names/photos), since no real verified success stories
// exist yet to publish.
const stories = [
  { initials: "DM", roleKey: "erfolgPage.story1Role", quoteKey: "erfolgPage.story1Quote" },
  { initials: "LB", roleKey: "erfolgPage.story2Role", quoteKey: "erfolgPage.story2Quote" },
  { initials: "AK", roleKey: "erfolgPage.story3Role", quoteKey: "erfolgPage.story3Quote" },
  { initials: "SR", roleKey: "erfolgPage.story4Role", quoteKey: "erfolgPage.story4Quote" },
];

export default function ErfolgsgeschichtenPage() {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
            <Trophy size={24} />
          </div>
          <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("erfolgPage.title")}</h1>
          <p className="mx-auto mt-2 max-w-lg text-sm text-text-muted">{t("erfolgPage.desc")}</p>
          <span className="mt-3 inline-block rounded-full bg-panel-alt px-3 py-1 text-[11px] font-semibold text-text-faint">
            {t("erfolgPage.beispielNote")}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stories.map((s) => (
            <div key={s.initials} className="relative rounded-xl border border-border-soft bg-panel p-5">
              <span className="absolute right-4 top-4 rounded-full bg-panel-alt px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-text-faint">
                {t("lpLanding.beispielBadge")}
              </span>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">
                  {s.initials}
                </div>
                <p className="text-xs text-text-faint">{t(s.roleKey)}</p>
              </div>
              <div className="mb-2 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-warning text-warning" />
                ))}
              </div>
              <p className="text-sm italic leading-relaxed text-text-muted">&quot;{t(s.quoteKey)}&quot;</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
