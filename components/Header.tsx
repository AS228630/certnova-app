import { Search, Globe, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-navy px-8 py-3">
      <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-white/10 bg-navy-light px-3 py-2">
        <Search size={16} className="text-slate-400" />
        <input
          placeholder="Search for certifications, topics..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="flex items-center gap-1 text-sm text-slate-300">
          <Globe size={18} />
          DE
        </button>

        <button className="relative">
          <Bell size={20} className="text-slate-300" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-gold" />
          <div className="text-sm">
            <p className="font-semibold text-white">Arman</p>
            <p className="text-xs text-gold">Pro Plan</p>
          </div>
        </div>
      </div>
    </header>
  );
}
