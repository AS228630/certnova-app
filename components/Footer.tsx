"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { Linkedin, Youtube, Twitter, Instagram, Facebook } from "lucide-react";

const columns = [
  {
    titleKey: "footer.platform",
    links: [
      { labelKey: "nav.dashboard", href: "/dashboard" },
      { labelKey: "nav.learningPaths", href: "/learning-paths" },
      { labelKey: "nav.certifications", href: "/certifications" },
      { labelKey: "nav.projects", href: "/projects" },
      { labelKey: "nav.community", href: "/community" },
      { labelKey: "nav.aiCoach", href: "/ai-coach" },
    ],
  },
  {
    titleKey: "footer.resources",
    links: [
      { labelKey: "nav.news", href: "/news" },
      { labelKey: "nav.interview", href: "/interview" },
      { labelKey: "nav.help", href: "/help" },
      { labelKey: "footer.pricing", href: "/pricing" },
    ],
  },
  {
    titleKey: "footer.legal",
    links: [
      { labelKey: "footer.terms", href: "/agb" },
      { labelKey: "footer.privacy", href: "/datenschutz" },
    ],
  },
];

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="mt-10 rounded-2xl border border-border-soft bg-panel p-6 md:p-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-white" />
            </span>
            <span className="text-base font-bold text-text">CertCoach</span>
          </div>
          <p className="mb-4 text-sm text-text-muted">
            {t("footer.tagline")}
          </p>
          <div className="flex items-center gap-3 text-text-faint">
            <Linkedin size={17} />
            <Youtube size={17} />
            <Twitter size={17} />
            <Instagram size={17} />
            <Facebook size={17} />
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.titleKey}>
            <p className="mb-3 text-sm font-bold text-text">{t(col.titleKey)}</p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-text-muted hover:text-primary">
                    {t(l.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-border-soft pt-6 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold text-text">{t("footer.getTheApp")}</p>
          <div className="flex gap-2">
            <span className="rounded-lg border border-border-soft px-4 py-2 text-xs text-text-muted">
              📱 App Store — {t("footer.comingSoonBadge")}
            </span>
            <span className="rounded-lg border border-border-soft px-4 py-2 text-xs text-text-muted">
              ▶ Google Play — {t("footer.comingSoonBadge")}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-border-soft pt-6 text-xs text-text-faint sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}
