"use client";

import { Bot, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/UserContext";
import { getFirstName } from "@/lib/supabase/useUser";
import { useUserProgressStore } from "@/lib/store/userProgressStore";

export default function AICoach() {
  const { user } = useUser();
  const firstName = getFirstName(user);
  const progress = useUserProgressStore((s) => s.progress);
  const answered = progress?.questions_answered ?? 0;
  const accuracy = answered === 0 ? 0 : Math.round(((progress?.questions_correct ?? 0) / answered) * 100);

  let message: string;
  if (answered === 0) {
    message = `Hallo ${firstName}! Beantworte ein paar Übungsfragen, damit ich dir personalisierte Tipps geben kann.`;
  } else if (accuracy < 70) {
    message = `Hallo ${firstName}! Deine Trefferquote liegt bei ${accuracy}%. Übe weiter, um deine Grundlagen zu festigen.`;
  } else {
    message = `Hallo ${firstName}! Starke Leistung — deine Trefferquote liegt bei ${accuracy}%. Weiter so!`;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-soft bg-panel p-5">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="font-bold text-text">KI Coach</h2>
        <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
          BETA
        </span>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-panel-alt">
          <Bot size={24} className="text-primary" />
        </div>
        <p className="text-sm leading-relaxed text-text-muted">{message}</p>
      </div>

      <Link
        href="/certifications"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
      >
        Smart Practice starten
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}
