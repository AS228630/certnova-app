"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Award,
  FolderKanban,
  Users,
  BarChart3,
  Trophy,
  Briefcase,
  Menu,
  X,
  Crown,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learning-paths", label: "Lernpfade", icon: GraduationCap },
  { href: "/certifications", label: "Zertifizierungen", icon: Award },
  { href: "/projects", label: "Projekte", icon: FolderKanban },
  { href: "/community", label: "Community", icon: Users },
  { href: "/analytics", label: "Analysen", icon: BarChart3 },
  { href: "/leaderboard", label: "Bestenliste", icon: Trophy },
  { href: "/interview", label: "Interview-Vorbereitung", icon: Briefcase },
];

const streakDays = ["M", "D", "M", "D", "F", "S", "S"];
const streakDone = [true, true, true, true, true, true, false];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-border-soft bg-panel px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            C
          </div>
          <span className="text-lg font-bold text-text">CertCoach</span>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Menü öffnen" className="text-text">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <aside
        className={`${
          open ? "flex" : "hidden"
        } fixed inset-0 z-40 flex-col overflow-y-auto bg-panel lg:static lg:flex lg:w-64 lg:shrink-0 lg:border-r lg:border-border-soft`}
      >
        <div className="hidden items-center gap-2 px-6 py-6 lg:flex">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            C
          </div>
          <span className="text-lg font-bold tracking-tight text-text">CertCoach</span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-white"
                    : "text-text-muted hover:bg-panel-alt hover:text-text"
                }`}
              >
                <Icon size={18} />
                <span className="flex-1">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="space-y-3 px-4 pb-4">
          <div className="rounded-xl bg-panel-alt p-4">
            <div className="mb-2 flex items-center gap-2 text-warning">
              <Crown size={16} />
              <p className="text-sm font-bold text-text">Pro Upgrade</p>
            </div>
            <p className="text-xs leading-relaxed text-text-muted">
              Schalte alle Funktionen frei, unbegrenzte Labs und KI-gestützte Werkzeuge.
            </p>
            <button className="mt-3 w-full rounded-lg bg-primary py-2 text-sm font-bold text-white transition-colors hover:bg-primary-dark">
              Upgrade starten
            </button>
          </div>

          <div className="rounded-xl border border-border-soft p-4">
            <p className="text-sm font-bold text-text">Deine Lernserie 🔥</p>
            <p className="mt-1 text-2xl font-extrabold text-text">
              14 <span className="text-sm font-medium text-text-muted">Tage in Folge</span>
            </p>
            <div className="mt-3 flex justify-between">
              {streakDays.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                      streakDone[i]
                        ? "bg-success-light text-success"
                        : "bg-panel-alt text-text-faint"
                    }`}
                  >
                    {streakDone[i] ? "✓" : ""}
                  </span>
                  <span className="text-[10px] text-text-faint">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
