"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Terminal, Wrench, Download, Video, BookMarked, Lightbulb, ArrowRight } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";
import { useGuestOnlyRedirect } from "@/lib/useGuestOnlyRedirect";
import ResourcesHero from "@/components/resources/ResourcesHero";
import { SiGoogle } from "react-icons/si";
import { getCompanyIcon } from "@/lib/vendorIcons";
import { useSupportMessageStore } from "@/lib/store/supportMessageStore";
import { useUser } from "@/components/UserContext";
import { getFullName } from "@/lib/supabase/useUser";

const CATEGORIES = [
  { icon: BookOpen, badgeKey: "resHome.badgeNew", titleKey: "resHome.guidesTitle", descKey: "resHome.guidesDesc", href: "/resources/guides" },
  { icon: Terminal, badgeKey: "resHome.badgePopular", titleKey: "resHome.cheatTitle", descKey: "resHome.cheatDesc", href: "/resources/cheatsheets" },
  { icon: Wrench, badgeKey: "resHome.badgeTools", titleKey: "resHome.toolsTitle", descKey: "resHome.toolsDesc", href: "/resources/tools" },
  { icon: Download, badgeKey: "resHome.badgeNew", titleKey: "resHome.templatesTitle", descKey: "resHome.templatesDesc", href: "/resources/templates" },
  { icon: Video, badgeKey: "resHome.badgeLive", titleKey: "resHome.webinarsTitle", descKey: "resHome.webinarsDesc", href: "/resources/webinars" },
  { icon: BookMarked, badgeKey: "resHome.badgeFree", titleKey: "resHome.ebooksTitle", descKey: "resHome.ebooksDesc", href: "/resources/ebooks" },
];

const trustLogos = [
  { name: "Google", render: () => <SiGoogle size={20} /> },
  { name: "Microsoft", render: () => getCompanyIcon("microsoft", 20) },
  { name: "AWS", render: () => getCompanyIcon("aws", 20) },
  { name: "IBM", render: () => getCompanyIcon("ibm", 20) },
  { name: "Cisco", render: () => getCompanyIcon("cisco", 20) },
  { name: "Oracle", render: () => getCompanyIcon("oracle", 20) },
];

function SuggestTopicBox() {
  const { t } = useLocale();
  const { user } = useUser();
  const submit = useSupportMessageStore((s) => s.submit);
  const sending = useSupportMessageStore((s) => s.sending);
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !topic.trim()) return;
    const ok = await submit(user.id, getFullName(user), user.email ?? "", `Ressourcen-Themenvorschlag: ${topic}`, "Themenvorschlag Ressourcen");
    if (ok) setSent(true);
  }

  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-border-soft bg-panel p-6 sm:flex-row sm:items-center">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
        <Lightbulb size={20} />
      </div>
      <div className="flex-1">
        <p className="font-bold text-text">{t("resHome.notFoundTitle")}</p>
        <p className="text-sm text-text-muted">{t("resHome.notFoundDesc")}</p>
      </div>
      {sent ? (
        <span className="shrink-0 text-sm font-semibold text-success">{t("resHome.suggestSent")}</span>
      ) : open ? (
        <form onSubmit={handleSubmit} className="flex w-full shrink-0 gap-2 sm:w-auto">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t("resHome.suggestPlaceholder")}
            className="min-w-0 flex-1 rounded-lg border border-border-soft bg-panel-alt px-3 py-2 text-sm text-text focus:border-primary focus:outline-none sm:w-56"
          />
          <button type="submit" disabled={sending} className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-60">
            {t("resHome.suggestSend")}
          </button>
        </form>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
        >
          {t("resHome.suggestTopic")}
          <ArrowRight size={15} />
        </button>
      )}
    </div>
  );
}

export default function ResourcesPage() {
  const { t } = useLocale();
  const { checking } = useGuestOnlyRedirect();

  if (checking) return null;

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <ResourcesHero />

      <main className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <section id="overview">
          <h2 className="mb-6 text-xl font-extrabold text-text sm:text-2xl">{t("resHome.overviewTitle")}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="flex flex-col rounded-2xl border border-border-soft bg-panel p-5 transition-colors hover:border-primary/40"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <c.icon size={20} />
                  </div>
                  <span className="rounded-full bg-panel-alt px-2.5 py-1 text-[10px] font-bold text-text-faint">{t(c.badgeKey)}</span>
                </div>
                <h3 className="mb-1 font-bold text-text">{t(c.titleKey)}</h3>
                <p className="mb-4 text-xs leading-relaxed text-text-faint">{t(c.descKey)}</p>
                <span className="mt-auto flex items-center gap-1 text-xs font-bold text-primary">
                  {t("resHome.viewAll")}
                  <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-12">
          <SuggestTopicBox />
        </div>

        <section className="mt-14">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wide text-text-faint">
            {t("landing.trustedByTitle")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70 grayscale">
            {trustLogos.map((l) => (
              <span key={l.name} className="flex items-center gap-2 text-text-muted">
                {l.render()}
                <span className="text-base font-semibold">{l.name}</span>
              </span>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
