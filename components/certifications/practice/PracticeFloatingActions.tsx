"use client";

import { Lightbulb, StickyNote, Sparkles } from "lucide-react";

export default function PracticeFloatingActions({
  onHint,
  onNotes,
  onCoach,
}: {
  onHint: () => void;
  onNotes: () => void;
  onCoach: () => void;
}) {
  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-3">
      <FabButton onClick={onHint} icon={Lightbulb} color="bg-warning" label="AI Hint" />
      <FabButton onClick={onNotes} icon={StickyNote} color="bg-primary" label="Notizen" />
      <FabButton onClick={onCoach} icon={Sparkles} color="bg-[#8b5cf6]" label="KI Coach" badge={1} />
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
