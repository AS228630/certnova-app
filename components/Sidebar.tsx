"use client";

import { useState } from "react";
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
  Menu,
  X,
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
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between bg-navy px-4 py-3 text-white md:hidden">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-gold" />
          <span className="text-base font-bold">CertCoach</span>
        </div>
        <button onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-64 flex-col bg-navy text-white transition-transform duration-200 md:static md:translate-x-0 ${
          open ? "translate-x-0" : "translate-x-full"
        } md:flex md:h-screen`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded bg-gold" />
            <span className="text-lg font-bold">CertCoach</span>
          </div>
          <button onClick={() => setOpen(false)} className="md:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
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
    </>
  );
}
