import { GraduationCap, FlaskConical, Laptop, ClipboardList, Clock } from "lucide-react";

export default function PhaseIllustration({ phaseKey }: { phaseKey: "lernen" | "labore" | "pruefung" }) {
  if (phaseKey === "lernen") {
    return (
      <div className="flex h-24 items-center justify-center">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10">
          <GraduationCap size={32} className="text-primary" />
        </div>
      </div>
    );
  }
  if (phaseKey === "labore") {
    return (
      <div className="flex h-24 items-center justify-center gap-2">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/30 to-sky-500/10">
          <Laptop size={28} className="text-sky-400" />
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-success/30 to-success/10">
          <FlaskConical size={20} className="text-success" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-24 items-center justify-center">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/30 to-fuchsia-500/10">
        <ClipboardList size={28} className="text-fuchsia-400" />
        <Clock size={16} className="absolute -bottom-1 -right-1 rounded-full bg-panel text-text-muted" />
      </div>
    </div>
  );
}
