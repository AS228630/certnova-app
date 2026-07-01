"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Award,
  CheckSquare,
  FlaskConical,
  FolderKanban,
  Bot,
  BarChart3,
  Users,
  Trophy,
  Briefcase,
  Store,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learning-paths", label: "Learning Paths", icon: GraduationCap },
  { href: "/certifications", label: "Certifications", icon: Award },
  { href: "/practice", label: "Practice", icon: CheckSquare, badge: "New" },
  { href: "/labs", label: "Lab Environment", icon: FlaskConical },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/ai-tutor", label: "AI Tutor", icon: Bot },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/community", label: "Community", icon: Users },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/career", label: "Career Center", icon: Briefcase },
  { href: "/marketplace", label: "Marketplace", icon: Store },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-border bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rotate-45 rounded-md bg-primary" />
          <span className="text-lg font-bold text-slate-900">CertCoach</span>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <aside
        className={`${
          open ? "flex" : "hidden"
        } fixed inset-0 z-40 flex-col bg-white lg:static lg:flex lg:w-64 lg:shrink-0 lg:border-r lg:border-border`}
      >
        <div className="hidden items-center gap-2 px-6 py-6 lg:flex">
          <div className="h-6 w-6 rotate-45 rounded-md bg-primary" />
          <span className="text-lg font-bold text-slate-900">CertCoach</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary-light text-primary"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon size={18} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-success-light px-2 py-0.5 text-[10px] font-bold text-success">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-3 px-4 pb-4">
          <div className="rounded-xl bg-gradient-to-br from-primary to-primary-dark p-4 text-white">
            <p className="text-sm font-bold">Upgrade to Pro</p>
            <p className="mt-1 text-xs text-blue-100">
              Unlock all features, labs, AI tutor and more.
            </p>
            <button className="mt-3 w-full rounded-lg bg-white py-2 text-sm font-bold text-primary">
              Upgrade Now
            </button>
          </div>

          <div className="rounded-xl border border-border bg-white p-4">
            <p className="text-sm font-bold text-slate-900">Your Streak</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">
              14 <span className="text-sm font-medium text-slate-400">days</span>
            </p>
            <div className="mt-3 flex justify-between">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} className="text-orange-400">
                  🔥
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-400">Best: 28 days</p>
          </div>
        </div>
      </aside>
    </>
  );
}
EOFcat > components/Sidebar.tsx << 'EOF'
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Award,
  CheckSquare,
  FlaskConical,
  FolderKanban,
  Bot,
  BarChart3,
  Users,
  Trophy,
  Briefcase,
  Store,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learning-paths", label: "Learning Paths", icon: GraduationCap },
  { href: "/certifications", label: "Certifications", icon: Award },
  { href: "/practice", label: "Practice", icon: CheckSquare, badge: "New" },
  { href: "/labs", label: "Lab Environment", icon: FlaskConical },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/ai-tutor", label: "AI Tutor", icon: Bot },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/community", label: "Community", icon: Users },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/career", label: "Career Center", icon: Briefcase },
  { href: "/marketplace", label: "Marketplace", icon: Store },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-border bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rotate-45 rounded-md bg-primary" />
          <span className="text-lg font-bold text-slate-900">CertCoach</span>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <aside
        className={`${
          open ? "flex" : "hidden"
        } fixed inset-0 z-40 flex-col bg-white lg:static lg:flex lg:w-64 lg:shrink-0 lg:border-r lg:border-border`}
      >
        <div className="hidden items-center gap-2 px-6 py-6 lg:flex">
          <div className="h-6 w-6 rotate-45 rounded-md bg-primary" />
          <span className="text-lg font-bold text-slate-900">CertCoach</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary-light text-primary"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon size={18} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-success-light px-2 py-0.5 text-[10px] font-bold text-success">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-3 px-4 pb-4">
          <div className="rounded-xl bg-gradient-to-br from-primary to-primary-dark p-4 text-white">
            <p className="text-sm font-bold">Upgrade to Pro</p>
            <p className="mt-1 text-xs text-blue-100">
              Unlock all features, labs, AI tutor and more.
            </p>
            <button className="mt-3 w-full rounded-lg bg-white py-2 text-sm font-bold text-primary">
              Upgrade Now
            </button>
          </div>

          <div className="rounded-xl border border-border bg-white p-4">
            <p className="text-sm font-bold text-slate-900">Your Streak</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">
              14 <span className="text-sm font-medium text-slate-400">days</span>
            </p>
            <div className="mt-3 flex justify-between">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} className="text-orange-400">
                  🔥
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-400">Best: 28 days</p>
          </div>
        </div>
      </aside>
    </>
  );
}
