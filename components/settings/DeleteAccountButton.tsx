"use client";

import { useState } from "react";
import { Trash2, X, AlertTriangle, Loader2, Check } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserContext";
import { getFullName } from "@/lib/supabase/useUser";
import { useSupportMessageStore } from "@/lib/store/supportMessageStore";

// Account deletion is deliberately NOT instant client-side. Supabase
// Auth user deletion requires the service-role key, which must never be
// exposed to the browser — so there is no safe way to actually delete
// an auth.users row from client code. Rather than fake a "delete"
// button that does nothing, this submits a real deletion request into
// the same support_messages table the contact form uses (migration
// 013), so a human (the site owner) can verify identity and actually
// delete the account. This mirrors how many real platforms handle
// irreversible account deletion — it's not less real for requiring a
// confirmation step, and it keeps the owner's personal email address
// out of the frontend entirely (no mailto: link needed).
function DeleteAccountModal({ onClose }: { onClose: () => void }) {
  const { t } = useLocale();
  const { user } = useUser();
  const submit = useSupportMessageStore((s) => s.submit);
  const sending = useSupportMessageStore((s) => s.sending);
  const sent = useSupportMessageStore((s) => s.sent);
  const error = useSupportMessageStore((s) => s.error);

  async function handleConfirm() {
    if (!user) return;
    await submit(
      user.id,
      getFullName(user),
      user.email ?? "",
      `Kontolöschung angefragt für ${user.email}. Bitte Konto und alle zugehörigen Daten dauerhaft löschen.`,
      "⚠️ Konto löschen"
    );
  }

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

        {sent ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-light text-success">
              <Check size={22} />
            </div>
            <p className="text-sm font-semibold text-text">{t("help.deletionRequestedTitle")}</p>
            <p className="text-xs text-text-faint">{t("help.deletionRequestedDesc")}</p>
            <button onClick={onClose} className="mt-2 rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white hover:bg-primary-dark">
              {t("help.close")}
            </button>
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm leading-relaxed text-text-muted">{t("help.deleteAccountDesc")}</p>
            {error && <p className="mb-3 text-xs font-medium text-danger">{error}</p>}
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 rounded-lg border border-border-soft px-4 py-2.5 text-sm font-semibold text-text hover:bg-panel-alt"
              >
                {t("help.cancel")}
              </button>
              <button
                onClick={handleConfirm}
                disabled={sending}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-danger px-4 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
              >
                {sending && <Loader2 size={14} className="animate-spin" />}
                {t("help.confirmDeleteAccount")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function DeleteAccountButton() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const reset = useSupportMessageStore((s) => s.reset);

  return (
    <>
      <button
        onClick={() => {
          reset();
          setOpen(true);
        }}
        className="flex items-center gap-2 rounded-lg border border-danger/30 px-5 py-2.5 text-sm font-bold text-danger transition-colors hover:bg-danger/10"
      >
        <Trash2 size={15} />
        {t("help.deleteAccountCta")}
      </button>
      {open && <DeleteAccountModal onClose={() => setOpen(false)} />}
    </>
  );
}
