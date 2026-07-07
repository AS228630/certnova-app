"use client";

import { CheckCircle2, FlaskConical, Sparkles } from "lucide-react";
import { useUserProgressStore } from "@/lib/store/userProgressStore";

export default function RecentActivity() {
  const progress = useUserProgressStore((s) => s.progress);
  const answered = progress?.questions_answered ?? 0;
  const correct = progress?.questions_correct ?? 0;
  const labsCompleted = progress?.labs_completed ?? 0;
  const xp = progress?.xp ?? 0;

  const hasActivity = answered > 0 || labsCompleted > 0;

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5">
      <h2 className="mb-4 font-bold text-text">Deine Aktivität</h2>

      {!hasActivity ? (
        <p className="text-sm text-text-faint">
          Noch keine Aktivität. Starte mit deiner ersten Übungsfrage oder einem Lab!
        </p>
      ) : (
        <ul className="space-y-4 text-sm">
          {answered > 0 && (
            <li className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" />
                <p className="text-text-muted">
                  {answered} Übungsfragen beantwortet, {correct} davon richtig
                </p>
              </div>
            </li>
          )}
          {labsCompleted > 0 && (
            <li className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <FlaskConical size={16} className="mt-0.5 shrink-0 text-primary" />
                <p className="text-text-muted">
                  {labsCompleted} {labsCompleted === 1 ? "Lab" : "Labs"} abgeschlossen
                </p>
              </div>
            </li>
          )}
          <li className="flex items-start justify-between border-t border-border-soft pt-4">
            <div className="flex items-start gap-2">
              <Sparkles size={16} className="mt-0.5 shrink-0 text-warning" />
              <p className="font-semibold text-text">{xp} XP gesamt gesammelt</p>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}
