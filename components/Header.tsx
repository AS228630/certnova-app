"use client";

import { useState } from "react";
import { Search, Globe, Bell, Moon, Sun, ChevronDown, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-border-soft bg-panel px-3 py-3 sm:px-4 md:px-8">
      {mobileSearchOpen ? (
        <div className="flex items-center gap-2 sm:hidden">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-border-soft bg-panel-alt px-3 py-2">
            <Search size={16} className="text-text-faint" />
            <input
              autoFocus
              placeholder="Suchen..."
              className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-faint"
            />
          </div>
          <button
            onClick={() => setMobileSearchOpen(false)}
            className="text-text-muted hover:text-text"
            aria-label="Suche schließen"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              onClick={onMenuClick}
              aria-label="Menü öffnen"
              className="shrink-0 text-text-muted hover:text-text lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div className="hidden w-full max-w-md items-center gap-2 rounded-lg border border-border-soft bg-panel-alt px-3 py-2 sm:flex">
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
            <button
              onClick={() => setMobileSearchOpen(true)}
              aria-label="Suche öffnen"
              className="text-text-muted hover:text-text sm:hidden"
            >
              <Search size={20} />
            </button>

            <button className="hidden items-center gap-1 text-sm font-medium text-text-muted hover:text-text md:flex">
              <Globe size={16} />
              DE
              <ChevronDown size={14} />
            </button>

            <button
              onClick={toggleTheme}
              className="hidden text-text-muted hover:text-text sm:block"
              aria-label="Design wechseln"
            >
              {theme === "dark" ? <Moon size={19} /> : <Sun size={19} />}
            </button>

            <button className="relative text-text-muted hover:text-text" aria-label="Benachrichtigungen">
              <Bell size={19} />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white">
                3
              </span>
            </button>

            <div className="flex items-center gap-2">
              <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-primary to-fuchsia-500" />
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-semibold text-text">Arman</p>
                <p className="text-xs text-text-muted">Pro Plan</p>
              </div>
              <ChevronDown size={14} className="hidden text-text-faint sm:block" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
