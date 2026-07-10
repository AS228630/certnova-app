"use client";

import { Bot, ListChecks, LayoutGrid, MessagesSquare, FileCheck } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

const actions = [
  { id: "mock", icon: Bot, titleKey: "interview.actMockTitle", descKey: "interview.actMockDesc", color: "text-primary bg-primary-light" },
  { id: "questions", icon: ListChecks, titleKey: "interview.actQuestionsTitle", descKey: "interview.actQuestionsDesc", color: "text-primary bg-primary-light" },
  { id: "system-design", icon: LayoutGrid, titleKey: "interview.actSystemTitle", descKey: "interview.actSystemDesc", color: "text-success bg-success-light" },
  { id: "behavioral", icon: MessagesSquare, titleKey: "interview.actBehavioralTitle", descKey: "interview.actBehavioralDesc", color: "text-warning bg-warning/15" },
  { id: "cv", icon: FileCheck, titleKey: "interview.actCvTitle", descKey: "interview.actCvDesc", color: "text-success bg-success-light" },
];

export default function InterviewPrepActions({ onStartMock }: { onStartMock: () => void }) {
  const { t } = useLocale();

  return (
    <section>
      <h2 className="mb-4 font-bold text-text">{t("interview.step4Title")}</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {actions.map((a) => {
          const card = (
            <div className="flex h-full flex-col gap-2 rounded-xl border border-border-soft bg-panel p-4 transition-colors hover:border-primary/40">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${a.color}`}>
                <a.icon size={17} />
              </div>
              <p className="text-sm font-bold text-text">{t(a.titleKey)}</p>
              <p className="text-xs leading-snug text-text-faint">{t(a.descKey)}</p>
              <span className="mt-auto text-xs font-bold text-primary">{t("interview.startCta")} →</span>
            </div>
          );

          if (a.id === "cv") {
            return (
              <Link key={a.id} href="/profile">
                {card}
              </Link>
            );
          }
          // Mock, question practice, system design, and behavioral all
          // open the same real mock-interview flow with a different
          // opening prompt — there's one real AI interviewer, not
          // several separate simulated features.
          return (
            <button key={a.id} onClick={onStartMock} className="text-left">
              {card}
            </button>
          );
        })}
      </div>
    </section>
  );
}
