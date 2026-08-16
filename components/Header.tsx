"use client";

import Link from "next/link";
import { Moon, Sun, ChevronDown, Menu } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserContext";
import { getFullName } from "@/lib/supabase/useUser";
import { useProfileStore } from "@/lib/store/profileStore";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";
import SearchBox from "@/components/SearchBox";
import NotificationBell from "@/components/NotificationBell";

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLocale();
  const { user } = useUser();
  const profile = useProfileStore((s) => s.profile);
  const displayName = getFullName(user);
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex min-h-20 flex-col justify-center border-b border-border-soft bg-topbar-bg px-3 py-3 sm:px-4 md:px-8">
      <div className="flex w-full items-center justify-between gap-2 sm:gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            onClick={onMenuClick}
            aria-label="Menü öffnen"
            className="shrink-0 text-text-muted hover:text-text lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <Logo size={28} />
            <span className="text-base font-bold tracking-tight text-text">CertCoach</span>
          </div>

          <SearchBox variant="desktop" />
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <LanguageSwitcher variant="dark" />

          <button
            onClick={toggleTheme}
            className="text-text-muted hover:text-text"
            aria-label="Design wechseln"
          >
            {theme === "dark" ? <Moon size={19} /> : <Sun size={19} />}
          </button>

          {user && (
            <>
              <NotificationBell />

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
                  <p className="text-xs text-text-muted">{t("header.freePlan")}</p>
                </div>
                <ChevronDown size={14} className="hidden text-text-faint sm:block" />
              </Link>
            </>
          )}
          {/* Deliberately renders nothing here for a Guest (no Anmelden/
              Jetzt starten pair) — this Header is the app-shell header
              used inside DashboardShell, now reachable by Guests on
              /certifications, /practice, etc. per the agreed journey.
              Per that journey, registration is only ever prompted at
              stage 5 (GuestSignupModal / GuestResultBanner at the real
              moment it matters), never pushed here as a second,
              redundant CTA duplicating LandingHeader's own. */}
        </div>
      </div>

      <div className="mt-3 lg:hidden">
        <SearchBox variant="mobile" />
      </div>
    </header>
  );
}
