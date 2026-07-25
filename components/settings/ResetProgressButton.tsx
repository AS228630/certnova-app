"use client";

import { useState } from "react";
import { RotateCcw, X, AlertTriangle, Loader2, Check } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserContext";
import { useCertProgressStore } from "@/lib/store/certProgressStore";
import { useQuestionAnswersStore } from "@/lib/store/questionAnswersStore";
import { useSectionAttemptsStore } from "@/lib/store/sectionAttemptsStore";
import { findCertByCertId } from "@/lib/companiesData";

// Self-service version of the same reset the practice page's "restart
// the whole exam" button does — question answers + attempt history for
// one certification. Deliberately does NOT touch unlocked_sections:
// a section you've genuinely earned (>=90% once) stays unlocked
// forever, exactly like every other reset/retry already in the app.
function ResetProgressModal({ onClose }: { onClose: () => void }) {
  const { t } = useLocale();
  const { user } = useUser();
  const progressMap = useCertProgressStore((s) => s.progressMap);
  const resetCertPracticeDetail = useCertProgressStore((s) => s.resetPracticeDetail);
  const clearPersistedAnswers = useQuestionAnswersStore((s) => s.clearForCert);
  const resetCertHistory = useSectionAttemptsStore((s) => s.resetCertHistory);

  const attemptedCertIds = Object.keys(progressMap).filter((id) => progressMap[id] > 0);
  const [certId, setCertId] = useState(attemptedCertIds[0] ?? "");
  const [resetting, setResetting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleConfirm() {
    if (!user || !certId) return;
    setResetting(true);
    try {
      await clearPersistedAnswers(user.id, certId);
      await resetCertHistory(user.id, certId);
      await resetCertPracticeDetail(certId);
      setDone(true);
    } finally {
      setResetting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-border-soft bg-panel p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-danger">
            <AlertTriangle size={18} />
            <h3 className="font-bold text-text">{t("settings.resetProgressTitle")}</h3>
          </div>
          <button onClick={onClose} className="text-text-faint hover:text-text">
            <X size={18} />
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-light text-success">
              <Check size={22} />
            </div>
            <p className="text-sm font-semibold text-text">{t("settings.resetProgressDoneTitle")}</p>
            <p className="text-xs text-text-faint">{t("settings.resetProgressDoneDesc")}</p>
            <button onClick={onClose} className="mt-2 rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white hover:bg-primary-dark">
              {t("help.close")}
            </button>
          </div>
        ) : attemptedCertIds.length === 0 ? (
          <p className="text-sm text-text-muted">{t("settings.resetProgressNoCerts")}</p>
        ) : (
          <>
            <p className="mb-3 text-sm leading-relaxed text-text-muted">{t("settings.resetProgressDesc")}</p>
            <select
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              className="mb-4 w-full rounded-lg border border-border-soft bg-panel px-3 py-2.5 text-sm text-text"
            >
              {attemptedCertIds.map((id) => {
                const found = findCertByCertId(id);
                return (
                  <option key={id} value={id}>
                    {found ? `${found.cert.code} — ${found.cert.title}` : id}
                  </option>
                );
              })}
            </select>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 rounded-lg border border-border-soft px-4 py-2.5 text-sm font-semibold text-text hover:bg-panel-alt"
              >
                {t("help.cancel")}
              </button>
              <button
                onClick={handleConfirm}
                disabled={resetting}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-danger px-4 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
              >
                {resetting && <Loader2 size={14} className="animate-spin" />}
                {t("settings.resetProgressConfirm")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ResetProgressButton() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-danger/30 px-5 py-2.5 text-sm font-bold text-danger transition-colors hover:bg-danger/10"
      >
        <RotateCcw size={15} />
        {t("settings.resetProgressCta")}
      </button>
      {open && <ResetProgressModal onClose={() => setOpen(false)} />}
    </>
  );
}
