"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import {
  Linkedin,
  Youtube,
  Github,
  Twitter,
  Instagram,
  Lock,
  CreditCard,
  ShieldCheck,
  Star,
  Sparkles,
  Globe2,
  Send,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

const columns = [
  {
    titleKey: "footer.platform",
    links: [
      { labelKey: "nav.dashboard", href: "/dashboard" },
      { labelKey: "nav.learningPaths", href: "/learning-paths" },
      { labelKey: "nav.certifications", href: "/certifications" },
      { labelKey: "nav.languageCourses", href: "/language-courses" },
      { labelKey: "nav.projects", href: "/projects" },
      { labelKey: "nav.community", href: "/community" },
      { labelKey: "nav.analytics", href: "/analytics" },
      { labelKey: "nav.aiCoach", href: "/ai-coach" },
      { labelKey: "nav.interview", href: "/interview" },
    ],
  },
  {
    titleKey: "footer.resources",
    links: [
      { labelKey: "footer.blog", href: "/blog" },
      { labelKey: "footer.guides", href: "/resources/guides" },
      { labelKey: "footer.successStories", href: "/erfolgsgeschichten" },
      { labelKey: "footer.practiceQuestions", href: "/certifications" },
      { labelKey: "footer.practiceExams", href: "/certifications" },
      { labelKey: "footer.faq", href: "/faq" },
      { labelKey: "nav.help", href: "/help" },
    ],
  },
  {
    titleKey: "footer.business",
    links: [
      { labelKey: "footer.aboutUs", href: "/ueber-uns" },
      { labelKey: "footer.careers", href: "/karriere" },
      { labelKey: "footer.partners", href: "/partner" },
      { labelKey: "footer.contact", href: "/kontakt" },
      { labelKey: "footer.press", href: "/presse" },
      { labelKey: "footer.affiliate", href: "/affiliate" },
    ],
  },
  {
    titleKey: "footer.legal",
    links: [
      { labelKey: "footer.imprint", href: "/impressum" },
      { labelKey: "footer.privacy", href: "/datenschutz" },
      { labelKey: "footer.cookies", href: "/cookie-einstellungen" },
      { labelKey: "footer.terms", href: "/agb" },
      { labelKey: "footer.withdrawal", href: "/widerrufsrecht" },
      { labelKey: "footer.accessibility", href: "/barrierefreiheit" },
      { labelKey: "footer.security", href: "/sicherheit" },
    ],
  },
];

const trustBadges = [
  { icon: Lock, labelKey: "footer.sslEncrypted", color: "#22c55e" },
  { icon: CreditCard, labelKey: "footer.securePayment", color: "#6d4cff" },
  { icon: ShieldCheck, labelKey: "footer.gdprCompliant", color: "#0ea5e9" },
  { icon: Star, labelKey: "footer.trustedByLearners", color: "#f59e0b" },
  { icon: Sparkles, labelKey: "footer.aiPowered", color: "#ec4899" },
  { icon: Globe2, labelKey: "footer.availableWorldwide", color: "#ef4444" },
];

const languages = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "es", label: "ES" },
  { code: "tr", label: "TR" },
];

function NewsletterForm() {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: email.trim() });
    setStatus(error ? "error" : "sent");
  }

  if (status === "sent") {
    return <p className="text-sm font-semibold text-success">{t("footer.newsletterSuccess")}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("footer.emailPlaceholder")}
        className="min-w-0 flex-1 rounded-lg border border-border-soft bg-panel-alt px-3 py-2 text-xs text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white hover:bg-primary-dark disabled:opacity-60"
      >
        <Send size={13} />
        {t("footer.subscribe")}
      </button>
    </form>
  );
}

export default function Footer() {
  const { t, locale, setLocale } = useLocale();
  return (
    <footer className="mt-10 rounded-2xl border border-border-soft bg-panel p-6 md:p-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-1">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-white" />
            </span>
            <span className="text-base font-bold text-text">CertCoach</span>
          </div>
          <p className="mb-4 text-sm text-text-muted">{t("footer.tagline")}</p>
          <div className="flex items-center gap-3 text-text-faint">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={17} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube size={17} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={17} />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
              <Twitter size={17} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={17} />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.titleKey}>
            <p className="mb-3 text-sm font-bold text-text">{t(col.titleKey)}</p>
            <ul className="space-y-2">
              {col.links.map((l, i) => (
                <li key={`${l.href}-${i}`}>
                  <Link href={l.href} className="text-sm text-text-muted hover:text-primary">
                    {t(l.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="mb-3 text-sm font-bold text-text">{t("footer.newsletterTitle")}</p>
          <p className="mb-3 text-xs text-text-faint">{t("footer.newsletterDesc")}</p>
          <NewsletterForm />
          <p className="mb-2 mt-5 text-sm font-bold text-text">{t("footer.getTheApp")}</p>
          <div className="flex flex-col gap-2">
            <span className="rounded-lg border border-border-soft px-3 py-1.5 text-[11px] text-text-muted">
              📱 App Store — {t("footer.comingSoonBadge")}
            </span>
            <span className="rounded-lg border border-border-soft px-3 py-1.5 text-[11px] text-text-muted">
              ▶ Google Play — {t("footer.comingSoonBadge")}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-border-soft pt-6 text-xs text-text-faint sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-4">
          {trustBadges.map((b) => (
            <span key={b.labelKey} className="flex items-center gap-1.5">
              <b.icon size={13} style={{ color: b.color }} />
              {t(b.labelKey)}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-border-soft pt-4 text-xs text-text-faint sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span>{t("footer.language")}:</span>
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => setLocale(l.code)}
              className={`rounded px-1.5 py-0.5 font-semibold transition-colors ${
                locale === l.code ? "bg-primary text-white" : "text-text-faint hover:text-text"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <p>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}
