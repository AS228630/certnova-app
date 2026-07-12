"use client";

import { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import { useLocale } from "@/components/LocaleProvider";
import HelpHero from "@/components/help/HelpHero";
import QuickHelpGrid from "@/components/help/QuickHelpGrid";
import PopularArticles from "@/components/help/PopularArticles";
import ContactSupportSection from "@/components/help/ContactSupportSection";
import AccountManagementSection from "@/components/help/AccountManagementSection";
import SubscriptionSection from "@/components/help/SubscriptionSection";
import HelpResourcesSection from "@/components/help/HelpResourcesSection";
import ComingSoonToast from "@/components/coachLive/ComingSoonToast";

export default function HelpPage() {
  const { t } = useLocale();
  const [toast, setToast] = useState<string | null>(null);

  return (
    <DashboardShell>
      <main className="mx-auto max-w-6xl space-y-10 p-3 sm:p-4 md:p-8">
        <HelpHero />
        <QuickHelpGrid />
        <PopularArticles />
        <ContactSupportSection />
        <AccountManagementSection />
        <SubscriptionSection />
        <HelpResourcesSection onNotAvailable={(label) => setToast(label)} />

        <p className="pb-6 text-center text-xs text-text-faint">
          {t("help.footerNote")}
        </p>
      </main>
      {toast && <ComingSoonToast label={toast} onClose={() => setToast(null)} />}
    </DashboardShell>
  );
}
