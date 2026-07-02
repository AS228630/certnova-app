import { BookOpenCheck, Dumbbell, ShieldCheck, UserCheck, Flag } from "lucide-react";

const steps = [
  { icon: BookOpenCheck, label: "Lernen", lift: 0, active: true },
  { icon: Dumbbell, label: "Üben", lift: 14, active: false },
  { icon: ShieldCheck, label: "Zertifizierung", lift: 28, active: false },
  { icon: UserCheck, label: "Interview", lift: 14, active: false },
  { icon: Flag, label: "Ziel erreichen", lift: 40, active: false, goal: true },
];

export default function HeroPath() {
  return (
    <div className="no-scrollbar -mx-1 overflow-x-auto px-1">
      <div className="flex min-w-[560px] items-end justify-between gap-1 sm:min-w-0">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-1 items-end">
            <div
              className="flex flex-col items-center gap-2"
              style={{ transform: `translateY(-${step.lift}px)` }}
            >
              {step.goal && (
                <div className="mb-1 h-9 w-9 rounded-full bg-gradient-to-br from-primary/30 to-fuchsia-400/20 blur-md" />
              )}
              <div
                className={`relative flex h-11 w-11 items-center justify-center rounded-full ${
                  step.active
                    ? "bg-primary text-white"
                    : step.goal
                      ? "bg-warning text-white"
                      : "border border-border-soft bg-panel-alt text-text-muted"
                }`}
              >
                <step.icon size={18} />
              </div>
              <span className="whitespace-nowrap text-[11px] font-medium text-text-muted">
                {step.label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div
                className="mx-1.5 mb-[34px] h-px flex-1 border-t border-dashed border-border-soft sm:mx-2"
                style={{
                  transform: `translateY(-${(step.lift + steps[i + 1].lift) / 2}px) rotate(${
                    step.lift < steps[i + 1].lift ? "-4deg" : step.lift > steps[i + 1].lift ? "4deg" : "0deg"
                  })`,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
