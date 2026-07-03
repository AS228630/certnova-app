"use client";

import { RotateCcw, ChevronDown, Circle, LayoutGrid, Search } from "lucide-react";

export default function VirtualEnvironment() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border-soft bg-panel">
      <div className="flex items-center justify-between border-b border-border-soft px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-text">
          <span className="h-2 w-2 rounded-full bg-success" />
          Virtuelle Umgebung
          <span className="text-xs font-normal text-text-faint">· Aktiv</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-border-soft px-3 py-1.5 text-xs font-semibold text-text-muted hover:text-text">
            <RotateCcw size={13} />
            Neustarten
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-border-soft px-3 py-1.5 text-xs font-semibold text-text-muted hover:text-text">
            Optionen
            <ChevronDown size={13} />
          </button>
        </div>
      </div>

      {/* Fake browser chrome */}
      <div className="bg-panel-alt px-3 pt-3">
        <div className="flex items-center gap-1.5 rounded-t-lg border border-b-0 border-border-soft bg-panel px-3 py-2">
          <Circle size={9} className="fill-danger text-danger" />
          <Circle size={9} className="fill-warning text-warning" />
          <Circle size={9} className="fill-success text-success" />
          <div className="ml-3 flex flex-1 items-center gap-2 rounded-md bg-panel-alt px-3 py-1 text-[11px] text-text-faint">
            <Search size={11} />
            portal.azure.com
          </div>
        </div>

        {/* Simplified portal preview */}
        <div className="flex h-[280px] flex-col border border-border-soft bg-[#0b0f1a] sm:h-[340px]">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 text-xs text-white/70">
            <LayoutGrid size={13} />
            Microsoft Azure Portal — Demo-Ansicht
          </div>
          <div className="flex flex-1 items-center justify-center p-6 text-center">
            <div>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                <LayoutGrid size={22} className="text-primary" />
              </div>
              <p className="text-sm font-semibold text-white/90">Ihre Lab-Umgebung ist bereit</p>
              <p className="mt-1 max-w-xs text-xs text-white/50">
                Folgen Sie den Anweisungen links, um mit der Konfiguration zu beginnen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
