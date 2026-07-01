"use client";

import { Search, Sparkles, Globe, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-border bg-white px-4 py-3 md:px-8">
      <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-border bg-slate-50 px-3 py-2">
        <Search size={16} className="text-slate-400" />
        <input
          placeholder="Search for certifications, topics, questions..."
          className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
        <kbd className="hidden rounded border border-border bg-white px-1.5 py-0.5 text-[10px] text-slate-400 sm:inline">
          Ctrl K
        </kbd>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden items-center gap-2 rounded-full bg-purple-light px-3 py-1.5 text-sm font-semibold text-purple md:flex">
          <Sparkles size={15} />
          AI Coach
        </button>

        <button className="hidden items-center gap-1 text-sm font-medium text-slate-500 md:flex">
          <Globe size={16} />
          EN
        </button>

        <button className="relative text-slate-500">
          <Bell size={20} />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple" />
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold text-slate-900">Arman</p>
            <p className="text-xs text-primary">Pro Plan</p>
          </div>
        </div>
      </div>
    </header>
  );
}
