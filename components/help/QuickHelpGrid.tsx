"use client";

import Link from "next/link";
import {
  CreditCard,
  RefreshCcw,
  UserCircle,
  BookOpen,
  Wrench,
  Award,
  Bot,
  FlaskConical,
  HelpCircle,
} from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

// Each category links to a real, existing destination on the site —
// either the relevant article group below (via anchor) or the actual
// feature page it's about, rather than a dead "coming soon" click.
const categories = [
  { icon: CreditCard, titleKey: "help.catBillingTitle", descKey: "help.catBillingDesc", href: "/help#subscription" },
  { icon: RefreshCcw, titleKey: "help.catSubscriptionTitle", descKey: "help.catSubscriptionDesc", href: "/help#subscription" },
  { icon: UserCircle, titleKey: "help.catAccountTitle", descKey: "help.catAccountDesc", href: "/settings" },
  { icon: BookOpen, titleKey: "help.catCoursesTitle", descKey: "help.catCoursesDesc", href: "/certifications" },
  { icon: Wrench, titleKey: "help.catTechTitle", descKey: "help.catTechDesc", href: "/help#articles" },
  { icon: Award, titleKey: "help.catCertsTitle", descKey: "help.catCertsDesc", href: "/certifications" },
  { icon: Bot, titleKey: "help.catAiCoachTitle", descKey: "help.catAiCoachDesc", href: "/ai-coach" },
  { icon: FlaskConical, titleKey: "help.catLabsTitle", descKey: "help.catLabsDesc", href: "/help#articles" },
  { icon: HelpCircle, titleKey: "help.catGeneralTitle", descKey: "help.catGeneralDesc", href: "/help#articles" },
];

export default function QuickHelpGrid() {
  const { t } = useLocale();
  return (
    <section>
      <h2 className="mb-1 font-bold text-text">{t("help.quickHelpTitle")}</h2>
      <p className="mb-4 text-sm text-text-muted">{t("help.quickHelpDesc")}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.titleKey}
            href={c.href}
            className="flex items-start gap-3 rounded-xl border border-border-soft bg-panel p-4 transition-colors hover:border-primary/40"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
              <c.icon size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-text">{t(c.titleKey)}</p>
              <p className="text-xs text-text-faint">{t(c.descKey)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
