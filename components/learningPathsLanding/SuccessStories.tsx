"use client";

import { Star } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

// These are illustrative example testimonials, NOT real users — clearly
// labeled as "Beispiel" (same pattern already used for sample community
// posts elsewhere on the site) rather than presented as genuine reviews
// from real people. No stock photos of real faces are used; initials
// avatars make it visually obvious these are placeholder profiles, not
// photos of actual CertCoach learners.
const stories = [
  { initials: "DM", roleKey: "lpLanding.story1Role", quoteKey: "lpLanding.story1Quote" },
  { initials: "LB", roleKey: "lpLanding.story2Role", quoteKey: "lpLanding.story2Quote" },
  { initials: "AK", roleKey: "lpLanding.story3Role", quoteKey: "lpLanding.story3Quote" },
];

export default function SuccessStories() {
  const { t } = useLocale();
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-extrabold text-text sm:text-2xl">{t("lpLanding.storiesTitle")}</h2>
        <span className="rounded-full bg-panel-alt px-2.5 py-1 text-[11px] font-semibold text-text-faint">
          {t("lpLanding.storiesBeispielNote")}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stories.map((s) => (
          <div key={s.initials} className="relative rounded-xl border border-border-soft bg-panel p-5">
            <span className="absolute right-3 top-3 rounded-full bg-panel-alt px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-text-faint">
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
    </section>
  );
}
