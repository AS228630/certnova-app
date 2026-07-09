"use client";

import { Lightbulb, StickyNote, Sparkles } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export default function PracticeFloatingActions({
  onHint,
  onNotes,
  onCoach,
}: {
  onHint: () => void;
  onNotes: () => void;
  onCoach: () => void;
}) {
  const { t } = useLocale();
  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-3">
      <FabButton onClick={onHint} icon={Lightbulb} color="bg-warning" label={t("practice.aiHint")} />
      <FabButton onClick={onNotes} icon={StickyNote} color="bg-primary" label={t("practice.notes")} />
      <FabButton onClick={onCoach} icon={Sparkles} color="bg-[#8b5cf6]" label={t("practice.aiCoachBtn")} badge={1} />
    </div>
  );
}

function FabButton({
  onClick,
  icon: Icon,
  color,
  label,
  badge,
}: {
  onClick: () => void;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
  label: string;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`relative flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 ${color}`}
    >
      <Icon size={20} />
      {!!badge && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
    </button>
  );
}
