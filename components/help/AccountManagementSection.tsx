"use client";

import { useState } from "react";
import Link from "next/link";
import { Settings, ShieldCheck, FileDown, Trash2, X, AlertTriangle } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserContext";

const SUPPORT_EMAIL = "support@certcoach.de";

// Account deletion is deliberately NOT instant client-side. Supabase
// Auth user deletion requires the service-role key, which must never be
// exposed to the browser — so there is no safe way to actually delete
// an auth.users row from client code. Rather than fake a "delete"
// button that does nothing (or silently only clears some local state
// while leaving the real account intact), this opens a real,
// pre-filled email to support with the account's email address, so a
// human on the other end can verify identity and actually delete it.
// This mirrors how many real platforms handle irreversible account
// deletion — it's not less real for requiring a confirmation step.
function DeleteAccountModal({ onClose }: { onClose: () => void }) {
  const { t } = useLocale();
  const { user } = useUser();
  const email = user?.email ?? "";
  const subject = encodeURIComponent("Konto löschen");
  const body = encodeURIComponent(
    `Hallo CertCoach-Team,\n\nbitte löscht mein Konto (${email}) und alle zugehörigen Daten dauerhaft.\n\nDanke.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-border-soft bg-panel p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-danger">
            <AlertTriangle size={18} />
            <h3 className="font-bold text-text">{t("help.deleteAccountTitle")}</h3>
          </div>
          <button onClick={onClose} className="text-text-faint hover:text-text">
            <X size={18} />
          </button>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-text-muted">{t("help.deleteAccountDesc")}</p>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-border-soft px-4 py-2.5 text-sm font-semibold text-text hover:bg-panel-alt"
          >
            {t("help.cancel")}
          </button>
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`}
            onClick={onClose}
            className="flex-1 rounded-lg bg-danger px-4 py-2.5 text-center text-sm font-bold text-white hover:opacity-90"
          >
            {t("help.confirmDeleteAccount")}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AccountManagementSection() {
  const { t } = useLocale();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <section>
      <h2 className="mb-1 font-bold text-text">{t("help.manageAccountTitle")}</h2>
      <p className="mb-4 text-sm text-text-muted">{t("help.manageAccountDesc")}</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/settings" className="flex items-start gap-3 rounded-xl border border-border-soft bg-panel p-4 hover:border-primary/40">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
            <Settings size={16} />
          </div>
          <div>
            <p className="text-sm font-bold text-text">{t("help.accountSettingsTitle")}</p>
            <p className="text-xs text-text-faint">{t("help.accountSettingsDesc")}</p>
          </div>
        </Link>

        <Link href="/settings" className="flex items-start gap-3 rounded-xl border border-border-soft bg-panel p-4 hover:border-primary/40">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
            <ShieldCheck size={16} />
          </div>
          <div>
            <p className="text-sm font-bold text-text">{t("help.securityTitle")}</p>
            <p className="text-xs text-text-faint">{t("help.securityDesc")}</p>
          </div>
        </Link>

        <a
          href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Datenauskunft (DSGVO)")}`}
          className="flex items-start gap-3 rounded-xl border border-border-soft bg-panel p-4 hover:border-primary/40"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
            <FileDown size={16} />
          </div>
          <div>
            <p className="text-sm font-bold text-text">{t("help.dataPrivacyTitle")}</p>
            <p className="text-xs text-text-faint">{t("help.dataPrivacyDesc")}</p>
          </div>
        </a>

        <button
          onClick={() => setDeleteModalOpen(true)}
          className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/5 p-4 text-left hover:bg-danger/10"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-danger/15 text-danger">
            <Trash2 size={16} />
          </div>
          <div>
            <p className="text-sm font-bold text-danger">{t("help.deleteAccountCta")}</p>
            <p className="text-xs text-danger/70">{t("help.deleteAccountCtaDesc")}</p>
          </div>
        </button>
      </div>

      {deleteModalOpen && <DeleteAccountModal onClose={() => setDeleteModalOpen(false)} />}
    </section>
  );
}
