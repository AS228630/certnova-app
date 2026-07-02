import { BookOpenCheck, Dumbbell, ShieldCheck, UserCheck, Flag } from "lucide-react";

const points = [
  { x: 8, y: 68, icon: BookOpenCheck, label: "Lernen", active: true },
  { x: 29, y: 84, icon: Dumbbell, label: "Üben", active: false },
  { x: 51, y: 52, icon: ShieldCheck, label: "Zertifizierung", active: false },
  { x: 73, y: 34, icon: UserCheck, label: "Interview", active: false },
  { x: 93, y: 12, icon: Flag, label: "Ziel erreichen", active: false, goal: true },
];

const linePath = points.map((p) => `${p.x},${p.y}`).join(" ");

export default function HeroPath() {
  return (
    <div className="relative h-44 w-full sm:h-52">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* mountain silhouette */}
        <polygon points="0,100 18,45 34,100" className="fill-panel-alt" opacity="0.6" />
        <polygon points="20,100 45,25 68,100" className="fill-panel-alt" opacity="0.8" />
        <polygon points="55,100 82,15 100,55 100,100" className="fill-panel-alt" />

        {/* dashed connecting line */}
        <polyline
          points={linePath}
          fill="none"
          className="stroke-border-soft"
          strokeWidth="0.6"
          strokeDasharray="2.5 2.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {points.map((p) => (
        <div
          key={p.label}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full sm:h-11 sm:w-11 ${
              p.active
                ? "bg-primary text-white"
                : p.goal
                  ? "bg-warning text-white"
                  : "border border-border-soft bg-panel text-text-muted"
            }`}
          >
            <p.icon size={16} className="sm:hidden" />
            <p.icon size={18} className="hidden sm:block" />
          </div>
          <span className="whitespace-nowrap text-[9px] font-medium text-text-muted sm:text-[11px]">
            {p.label}
          </span>
        </div>
      ))}
    </div>
  );
}
