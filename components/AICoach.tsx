"use client";

import { useEffect, useState } from "react";
import { Bot, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/UserContext";
import { getFirstName } from "@/lib/supabase/useUser";
import { useUserProgressStore } from "@/lib/store/userProgressStore";
import { useLocale } from "@/components/LocaleProvider";
import { askAiCoach } from "@/lib/aiCoachClient";

export default function AICoach() {
  const { user } = useUser();
  const firstName = getFirstName(user);
  const progress = useUserProgressStore((s) => s.progress);
  const { t } = useLocale();
  const answered = progress?.questions_answered ?? 0;
  const correct = progress?.questions_correct ?? 0;
  const accuracy = answered === 0 ? 0 : Math.round((correct / answered) * 100);

  const templateKey = answered === 0 ? "dashboard.aiCoachEmpty" : accuracy < 70 ? "dashboard.aiCoachLow" : "dashboard.aiCoachGood";
  const fallbackMessage = t(templateKey).replace("{name}", firstName).replace("{accuracy}", String(accuracy));

  const [message, setMessage] = useState(fallbackMessage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const prompt =
      answered === 0
        ? `Der Nutzer heißt ${firstName} und hat noch keine Übungsfragen beantwortet. Schreibe eine kurze (max. 2 Sätze), motivierende Begrüßung, die ihn einlädt, mit dem Üben zu starten.`
        : `Der Nutzer heißt ${firstName} und hat bisher ${answered} Übungsfragen beantwortet, davon ${correct} richtig (${accuracy}% Trefferquote). Schreibe eine kurze (max. 2 Sätze), persönliche Rückmeldung zu diesem Stand — ermutigend, ohne generisch zu klingen.`;

    askAiCoach([{ role: "user", content: prompt }])
      .then((reply) => {
        if (!cancelled) {
          setMessage(reply);
          setLoading(false);
        }
      })
      .catch(() => {
        // Keep the honest, stats-based fallback message if the AI call fails
        // (e.g. rate limit) — never show an error here, this is a small
        // dashboard teaser, not the main chat surface.
        if (!cancelled) {
          setMessage(fallbackMessage);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answered, correct, accuracy, firstName]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-soft bg-panel p-5">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="font-bold text-text">{t("dashboard.aiCoachTitle")}</h2>
        <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
          {t("nav.beta")}
        </span>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-panel-alt">
          <Bot size={24} className="text-primary" />
        </div>
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-text-faint">
            <Loader2 size={14} className="animate-spin" />
          </div>
        ) : (
          <p className="text-sm leading-relaxed text-text-muted">{message}</p>
        )}
      </div>

      <Link
        href="/certifications"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
      >
        {t("dashboard.aiCoachCta")}
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}
