"use client";

import { Search, Globe, Bell, Moon, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-border-soft bg-panel px-4 py-3 md:px-8">
      <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-border-soft bg-panel-alt px-3 py-2">
        <Search size={16} className="text-text-faint" />
        <input
          placeholder="Nach Kursen, Labs, Fragen suchen..."
          className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-faint"
        />
        <kbd className="hidden rounded border border-border-soft bg-panel px-1.5 py-0.5 text-[10px] text-text-faint sm:inline">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden items-center gap-1 text-sm font-medium text-text-muted hover:text-text md:flex">
          <Globe size={16} />
          DE
          <ChevronDown size={14} />
        </button>

        <button className="text-text-muted hover:text-text" aria-label="Design wechseln">
          <Moon size={19} />
        </button>

        <button className="relative text-text-muted hover:text-text" aria-label="Benachrichtigungen">
          <Bell size={19} />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-fuchsia-500" />
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold text-text">Arman</p>
            <p className="text-xs text-text-muted">Pro Plan</p>
          </div>
          <ChevronDown size={14} className="hidden text-text-faint sm:block" />
        </div>
      </div>
    </header>
  );
}
