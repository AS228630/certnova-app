"use client";

import Link from "next/link";
import { Bot, Mail, Users, Clock, Globe2, CalendarClock } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

const SUPPORT_EMAIL = "support@certcoach.de";

export default function ContactSupportSection() {
  const { t } = useLocale();

  return (
    <section>
      <h2 className="mb-1 font-bold text-text">{t("help.contactTitle")}</h2>
      <p className="mb-4 text-sm text-text-muted">{t("help.contactDesc")}</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* AI Coach — honestly framed as an instant AI assistant, not a
            human live-chat agent, since we don't have a real staffed
            live-chat system. */}
        <div className="flex flex-col rounded-xl border border-border-soft bg-panel p-4">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light text-primary">
            <Bot size={17} />
          </div>
          <p className="text-sm font-bold text-text">{t("help.aiChatTitle")}</p>
          <p className="mb-2 text-xs text-text-faint">{t("help.aiChatDesc")}</p>
          <span className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            {t("help.availableNow")}
          </span>
          <Link
            href="/ai-coach"
            className="mt-auto rounded-lg bg-primary py-2 text-center text-xs font-bold text-white hover:bg-primary-dark"
          >
            {t("help.startChat")}
          </Link>
        </div>

        <div className="flex flex-col rounded-xl border border-border-soft bg-panel p-4">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light text-primary">
            <Mail size={17} />
          </div>
          <p className="text-sm font-bold text-text">{t("help.emailSupportTitle")}</p>
          <p className="mb-3 text-xs text-text-faint">{t("help.emailSupportDesc")}</p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="mt-auto rounded-lg bg-primary py-2 text-center text-xs font-bold text-white hover:bg-primary-dark"
          >
            {t("help.sendEmail")}
          </a>
        </div>

        <div className="flex flex-col rounded-xl border border-border-soft bg-panel p-4">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light text-primary">
            <Users size={17} />
          </div>
          <p className="text-sm font-bold text-text">{t("help.communityTitle")}</p>
          <p className="mb-3 text-xs text-text-faint">{t("help.communityDesc")}</p>
          <Link
            href="/community"
            className="mt-auto rounded-lg border border-border-soft py-2 text-center text-xs font-bold text-text hover:bg-panel-alt"
          >
            {t("help.toCommunity")}
          </Link>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-2 rounded-lg border border-border-soft bg-panel px-3 py-2.5 text-xs text-text-muted">
          <Clock size={14} className="shrink-0 text-text-faint" />
          {t("help.emailResponseTime")}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border-soft bg-panel px-3 py-2.5 text-xs text-text-muted">
          <Globe2 size={14} className="shrink-0 text-text-faint" />
          {t("help.languagesSupported")}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border-soft bg-panel px-3 py-2.5 text-xs text-text-muted">
          <CalendarClock size={14} className="shrink-0 text-text-faint" />
          {t("help.aiCoachAvailability")}
        </div>
      </div>
    </section>
  );
}
