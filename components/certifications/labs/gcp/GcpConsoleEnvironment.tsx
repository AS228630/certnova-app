"use client";

import { Search24Regular, Alert24Regular, Settings24Regular, QuestionCircle24Regular } from "@fluentui/react-icons";
import { Folder, Plus, RefreshCw, Cloud, Database, Server, Network, ShieldCheck, BarChart3 } from "lucide-react";

const NAV_ITEMS = [
  { label: "Cloud Storage", icon: Database, active: true },
  { label: "Compute Engine", icon: Server },
  { label: "Kubernetes Engine", icon: Network },
  { label: "IAM & Verwaltung", icon: ShieldCheck },
  { label: "Monitoring", icon: BarChart3 },
];

export default function GcpConsoleEnvironment() {
  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-3 sm:p-4">
      <div className="overflow-hidden rounded-xl border border-border-soft bg-bg">
        <div className="overflow-x-auto">
          <div className="min-w-[900px] bg-white text-[#202124]">
            {/* Real Google Cloud Console top bar */}
            <div className="flex items-center gap-3 border-b border-[#e8eaed] px-3 py-1.5">
              <span className="flex items-center gap-1.5 text-base font-medium text-[#5f6368]">
                <Cloud size={20} className="text-[#4285F4]" />
                Google Cloud
              </span>
              <span className="rounded border border-[#dadce0] px-2 py-1 text-[12px] text-[#3c4043]">
                CertCoach-Lab ▾
              </span>
              <div className="ml-2 flex h-8 flex-1 max-w-lg items-center gap-2 rounded bg-[#f1f3f4] px-3">
                <Search24Regular fontSize={14} className="shrink-0 text-[#5f6368]" />
                <span className="truncate text-[12px] text-[#5f6368]">Suchen (nach Ressourcen, Docs, Produkten und mehr)</span>
              </div>
              <div className="ml-auto flex items-center gap-3 text-[#5f6368]">
                <Alert24Regular fontSize={16} />
                <QuestionCircle24Regular fontSize={16} />
                <Settings24Regular fontSize={16} />
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4285F4] text-[10px] font-bold text-white">
                  S
                </span>
              </div>
            </div>

            <div className="flex" style={{ height: 340 }}>
              <div className="w-52 shrink-0 overflow-y-auto border-r border-[#e8eaed] bg-white p-2 text-[12px]">
                {NAV_ITEMS.map((n) => (
                  <p
                    key={n.label}
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${
                      n.active ? "bg-[#e8f0fe] font-medium text-[#1967d2]" : "text-[#3c4043] hover:bg-black/5"
                    }`}
                  >
                    <n.icon size={15} className={n.active ? "text-[#1967d2]" : "text-[#5f6368]"} />
                    {n.label}
                  </p>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <p className="mb-1 text-[11px] text-[#5f6368]">Cloud Storage</p>
                <h2 className="mb-1 text-lg font-medium text-[#202124]">Buckets</h2>
                <p className="mb-3 text-[12px] text-[#5f6368]">
                  Buckets sind die grundlegenden Container zum Speichern deiner Daten in Cloud Storage.
                </p>

                <div className="mb-3 flex items-center gap-2">
                  <button className="flex items-center gap-1.5 rounded bg-[#1a73e8] px-3 py-1.5 text-[12px] font-medium text-white hover:bg-[#1765cc]">
                    <Plus size={13} />
                    Erstellen
                  </button>
                  <button className="flex items-center gap-1.5 rounded border border-[#dadce0] px-2.5 py-1.5 text-[12px] text-[#3c4043] hover:bg-black/5">
                    <RefreshCw size={12} />
                  </button>
                </div>

                <div className="rounded border border-[#e8eaed]">
                  <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-[#e8eaed] bg-[#f8f9fa] px-3 py-2 text-[11px] font-medium text-[#5f6368]">
                    <span>Name</span>
                    <span>Standorttyp</span>
                    <span>Standardspeicherklasse</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 py-10 text-center">
                    <Folder size={26} className="text-[#dadce0]" />
                    <p className="text-[12px] text-[#5f6368]">Es sind noch keine Buckets in diesem Projekt vorhanden.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-[#e8eaed] bg-[#f8f9fa] px-3 py-1.5 text-[10px] text-[#5f6368]">
              © 2026, Google Cloud (Simulation)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
