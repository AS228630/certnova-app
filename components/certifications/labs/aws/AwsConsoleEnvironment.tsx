"use client";

import {
  Search24Regular,
  Alert24Regular,
  Settings24Regular,
  QuestionCircle24Regular,
  Grid24Regular,
} from "@fluentui/react-icons";
import { Folder, Plus, RefreshCw } from "lucide-react";

const NAV_ITEMS = ["Allgemeine Konfiguration", "Buckets", "Zugriffspunkte", "Objekt-Lambda-Zugriffspunkte", "Batch-Operationen"];

export default function AwsConsoleEnvironment() {
  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-3 sm:p-4">
      <div className="overflow-hidden rounded-xl border border-border-soft bg-bg">
        <div className="overflow-x-auto">
          <div className="min-w-[900px] bg-white text-[#16191f]">
            {/* Real AWS console top bar */}
            <div className="flex items-center gap-3 bg-[#232f3e] px-3 py-1.5">
              <span className="text-lg font-bold text-white">aws</span>
              <span className="text-xs text-[#d5dbdb]">Services</span>
              <div className="ml-2 flex h-7 flex-1 max-w-md items-center gap-2 rounded bg-white px-2">
                <Search24Regular fontSize={13} className="shrink-0 text-[#545b64]" />
                <span className="truncate text-[11px] text-[#545b64]">
                  Nach Diensten, Features, Blogs, Docs und mehr suchen
                </span>
              </div>
              <div className="ml-auto flex items-center gap-3 text-xs text-white">
                <span className="hidden sm:inline">Europe (Frankfurt) eu-central-1</span>
                <Alert24Regular fontSize={16} />
                <Settings24Regular fontSize={16} />
                <QuestionCircle24Regular fontSize={16} />
                <span className="rounded border border-white/30 px-2 py-1 text-[11px]">student@certcoach-lab</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 border-b border-[#e9ebed] bg-[#fafafa] px-3 py-2 text-[12px] text-[#545b64]">
              <Grid24Regular fontSize={14} />
              <span>S3</span>
              <span className="text-[#879596]">&gt;</span>
              <span className="font-semibold text-[#16191f]">Buckets</span>
            </div>

            <div className="flex" style={{ height: 340 }}>
              <div className="w-48 shrink-0 overflow-y-auto border-r border-[#e9ebed] bg-[#f9f9f9] p-2 text-[11px]">
                {NAV_ITEMS.map((n, i) => (
                  <p
                    key={n}
                    className={`flex items-center gap-2 rounded px-2 py-1.5 ${
                      i === 1 ? "bg-[#e9f2fe] font-semibold text-[#0972d3]" : "text-[#16191f] hover:bg-black/5"
                    }`}
                  >
                    <Folder size={13} className={i === 1 ? "text-[#0972d3]" : "text-[#545b64]"} />
                    {n}
                  </p>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <h2 className="mb-1 text-lg font-semibold text-[#16191f]">Buckets (0)</h2>
                <p className="mb-3 text-[12px] text-[#545b64]">
                  Buckets sind Container für in Amazon S3 gespeicherte Daten.
                </p>

                <div className="mb-3 flex items-center gap-2">
                  <button className="flex items-center gap-1.5 rounded border border-[#e9ebed] px-2.5 py-1.5 text-[12px] text-[#16191f] hover:bg-black/5">
                    <RefreshCw size={12} />
                  </button>
                  <button className="ml-auto flex items-center gap-1.5 rounded bg-[#ec7211] px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-[#eb5f07]">
                    <Plus size={13} />
                    Bucket erstellen
                  </button>
                </div>

                <div className="rounded border border-[#e9ebed]">
                  <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#e9ebed] bg-[#fafafa] px-3 py-2 text-[11px] font-semibold text-[#545b64]">
                    <span>Name</span>
                    <span>Region</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 py-10 text-center">
                    <Folder size={26} className="text-[#c9cfd3]" />
                    <p className="text-[12px] text-[#545b64]">Du hast noch keine Buckets in dieser Region.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-[#e9ebed] bg-[#fafafa] px-3 py-1.5 text-[10px] text-[#545b64]">
              © 2026, Amazon Web Services, Inc. (Simulation)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
