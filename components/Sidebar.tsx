import {
  LayoutDashboard,
  GraduationCap,
  Award,
  ListChecks,
  FlaskConical,
  FolderKanban,
  Bot,
  BarChart3,
  Users,
  Trophy,
  Briefcase,
  Store,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Learning Paths", icon: GraduationCap },
  { label: "Certifications", icon: Award },
  { label: "Practice", icon: ListChecks, badge: "New" },
  { label: "Lab Environment", icon: FlaskConical },
  { label: "Projects", icon: FolderKanban },
  { label: "AI Tutor", icon: Bot },
  { label: "Analytics", icon: BarChart3 },
  { label: "Community", icon: Users },
  { label: "Leaderboard", icon: Trophy },
  { label: "Career Center", icon: Briefcase },
  { label: "Marketplace", icon: Store },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col bg-navy text-white">
      <div className="flex items-center gap-2 px-6 py-5">
        <div className="h-7 w-7 rounded bg-gold" />
        <span className="text-lg font-bold">CertCoach</span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                item.active
                  ? "bg-navy-light font-semibold text-white"
                  : "text-slate-300 hover:bg-navy-light/60"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-navy">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="m-3 rounded-xl bg-navy-light p-4">
        <p className="mb-1 text-sm font-bold text-gold">Upgrade to Pro</p>
        <p className="mb-3 text-xs text-slate-300">
          Unlock all features, labs, AI tutor and more.
        </p>
        <button className="w-full rounded-lg bg-gold py-2 text-sm font-bold text-navy">
          Upgrade Now
        </button>
      </div>
    </aside>
  );
}
