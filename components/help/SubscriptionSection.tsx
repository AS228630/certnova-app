"use client";

import Link from "next/link";
import { ArrowUpRight, FileText, Wallet } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

// Every account on the platform is, honestly, on the Free plan — there
// is no real payment processor behind "Upgrade to Pro" yet (see the
// Upgrade page), so showing a fabricated "€19/month" charge or a fake
// "VISA •••• 4242" on file here would be actively misleading. This
// shows the one plan that's actually active, with a real link to start
// upgrading, rather than a paid-plan mockup nobody has really bought.
export default function SubscriptionSection() {
  const { t } = useLocale();

  return (
    <section id="subscription">
      <h2 className="mb-1 font-bold text-text">{t("help.subscriptionTitle")}</h2>
      <p className="mb-4 text-sm text-text-muted">{t("help.subscriptionDesc")}</p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border-soft bg-panel p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-panel-alt text-text-muted">
              <Wallet size={16} />
            </div>
            <div>
              <p className="text-sm font-bold text-text">{t("help.currentPlanLabel")}</p>
              <span className="rounded-full bg-success-light px-2 py-0.5 text-[10px] font-bold text-success">
                {t("help.freePlanBadge")}
              </span>
            </div>
          </div>
          <p className="text-2xl font-extrabold text-text">
            €0 <span className="text-sm font-normal text-text-faint">/ {t("help.forever")}</span>
          </p>
          <p className="mt-2 text-xs text-text-muted">{t("help.freePlanDesc")}</p>
        </div>

        <div className="rounded-2xl border border-border-soft bg-panel p-5">
          <p className="mb-3 text-sm font-bold text-text">{t("help.subscriptionOptionsTitle")}</p>
          <div className="space-y-1">
            <Link
              href="/upgrade"
              className="flex items-center justify-between rounded-lg px-2 py-2.5 text-sm text-text hover:bg-panel-alt"
            >
              <span className="flex items-center gap-2">
                <ArrowUpRight size={15} className="text-primary" />
                {t("help.changePlan")}
              </span>
              <ArrowUpRight size={14} className="text-text-faint" />
            </Link>
            <a
              href="mailto:support@certcoach.de?subject=Rechnungen"
              className="flex items-center justify-between rounded-lg px-2 py-2.5 text-sm text-text hover:bg-panel-alt"
            >
              <span className="flex items-center gap-2">
                <FileText size={15} className="text-text-muted" />
                {t("help.viewInvoices")}
              </span>
              <ArrowUpRight size={14} className="text-text-faint" />
            </a>
          </div>
          <p className="mt-3 rounded-lg bg-panel-alt px-3 py-2 text-xs text-text-faint">{t("help.noActiveSubscriptionNote")}</p>
        </div>
      </div>
    </section>
  );
}
