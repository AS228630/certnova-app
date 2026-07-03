"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Award,
  Languages,
  FolderKanban,
  Users,
  Newspaper,
  BarChart3,
  Briefcase,
  Bot,
  X,
  Crown,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learning-paths", label: "Lernpfade", icon: GraduationCap },
  { href: "/certifications", label: "Zertifizierungen", icon: Award },
  { href: "/language-courses", label: "Sprachkurse", icon: Languages },
  { href: "/projects", label: "Projekte", icon: FolderKanban },
  { href: "/community", label: "Community", icon: Users },
  { href: "/news", label: "Aktuelles", icon: Newspaper, badge: "Neu" },
  { href: "/analytics", label: "Analysen", icon: BarChart3 },
  { href: "/interview", label: "Interview-Vorbereitung", icon: Briefcase },
  { href: "/ai-coach", label: "KI Coach", icon: Bot, badge: "BETA" },
];

const streakDays = ["M", "D", "M", "D", "F", "S", "S"];
const streakDone = [true, true, true, true, true, true, false];

export default function Sidebar({
  open = false,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] -translate-x-full flex-col overflow-y-auto bg-panel transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:max-w-none lg:shrink-0 lg:translate-x-0 lg:border-r lg:border-border-soft ${
          open ? "translate-x-0" : ""
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 lg:px-6 lg:py-6">
          <Link href="/dashboard" className="flex items-center gap-2" onClick={onClose}>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              C
            </div>
            <span className="text-lg font-bold tracking-tight text-text">CertCoach</span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Menü schließen"
            className="text-text-muted hover:text-text lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="space-y-1 px-3 py-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-white"
                    : "text-text-muted hover:bg-panel-alt hover:text-text"
                }`}
              >
                <Icon size={18} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      item.badge === "Neu"
                        ? "bg-success-light text-success"
                        : "bg-primary-light text-primary"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-3 px-4 py-4">
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

        <div className="mt-auto space-y-1 border-t border-border-soft px-3 py-4">
          <Link
            href="/settings"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-panel-alt hover:text-text"
          >
            <Settings size={18} />
            Einstellungen
          </Link>
          <Link
            href="/help"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-panel-alt hover:text-text"
          >
            <HelpCircle size={18} />
            Hilfe & Support
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-text-muted hover:bg-panel-alt hover:text-text"
          >
            <LogOut size={18} />
            Logout
          </button>

          <div className="flex items-center justify-between rounded-lg px-3 py-2.5">
            <span className="text-sm font-medium text-text-muted">Dark Mode</span>
            <button
              onClick={toggleTheme}
              aria-label="Design wechseln"
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                theme === "dark" ? "bg-primary" : "bg-panel-alt"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  theme === "dark" ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
