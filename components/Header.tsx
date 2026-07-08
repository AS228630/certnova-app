"use client";

import Link from "next/link";
import { Search, Bell, Moon, Sun, ChevronDown, Menu } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useUser } from "@/components/UserContext";
import { getFullName } from "@/lib/supabase/useUser";
import { useProfileStore } from "@/lib/store/profileStore";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();
  const profile = useProfileStore((s) => s.profile);
  const displayName = getFullName(user);
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b border-border-soft bg-panel px-3 py-3 sm:px-4 md:px-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            onClick={onMenuClick}
            aria-label="Menü öffnen"
            className="shrink-0 text-text-muted hover:text-text lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              C
            </div>
            <span className="text-base font-bold tracking-tight text-text">CertCoach</span>
          </div>

          <div className="hidden w-full max-w-md items-center gap-2 rounded-lg border border-border-soft bg-panel-alt px-3 py-2 lg:flex">
            <Search size={16} className="text-text-faint" />
            <input
              placeholder="Nach Kursen, Labs, Fragen suchen..."
              className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-faint"
            />
            <kbd className="hidden rounded border border-border-soft bg-panel px-1.5 py-0.5 text-[10px] text-text-faint md:inline">
              ⌘K
            </kbd>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <div className="hidden md:block">
            <LanguageSwitcher variant="dark" />
          </div>

          <button
            onClick={toggleTheme}
            className="hidden text-text-muted hover:text-text sm:block"
            aria-label="Design wechseln"
          >
            {theme === "dark" ? <Moon size={19} /> : <Sun size={19} />}
          </button>

          {user ? (
            <>
              <button className="relative text-text-muted hover:text-text" aria-label="Benachrichtigungen">
                <Bell size={19} />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white">
                  3
                </span>
              </button>

              <Link href="/profile" className="flex items-center gap-2 hover:opacity-80">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-fuchsia-500 text-xs font-bold text-white">
                  {profile?.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profile.avatar_url} alt="Profilbild" className="h-full w-full object-cover" />
                  ) : (
                    initial
                  )}
                </div>
                <div className="hidden leading-tight sm:block">
                  <p className="text-sm font-semibold text-text">{displayName}</p>
                  <p className="text-xs text-text-muted">Kostenloser Plan</p>
                </div>
                <ChevronDown size={14} className="hidden text-text-faint sm:block" />
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-lg px-3 py-1.5 text-sm font-semibold text-text-muted hover:text-text"
              >
                Anmelden
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-primary px-3.5 py-1.5 text-sm font-bold text-white hover:bg-primary-dark"
              >
                Jetzt starten
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 lg:hidden">
        <Search size={16} className="text-text-faint" />
        <input
          placeholder="Nach Kursen, Labs, Fragen suchen..."
          className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-faint"
        />
      </div>
    </header>
  );
}
