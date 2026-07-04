"use client";

import { Menu, Search, Bell, HelpCircle, Settings, Grid3x3, FolderKanban, HardDrive } from "lucide-react";
import { useLabStore } from "@/lib/store/labStore";

// Authentic Azure Portal "Dark theme" palette — used for the top command bar
// and the left icon rail (matches portal.azure.com dark chrome).
export const AZ = {
  bg: "#1b1a19",
  panel: "#201f1e",
  panelAlt: "#252423",
  border: "#3b3a39",
  blue: "#2899f5",
  blueDark: "#0078d4",
  text: "#ffffff",
  textMuted: "#c8c6c4",
  textFaint: "#8a8886",
  success: "#57a300",
  warning: "#fce100",
  danger: "#f1707b",
};

// Real Azure Portal blades are white/light by default (matching the approved
// desktop lab reference) — the content pane uses this palette, not the dark
// chrome colors above.
export const AZL = {
  bg: "#ffffff",
  panelAlt: "#f3f2f1",
  border: "#e1dfdd",
  blue: "#0078d4",
  text: "#201f1e",
  textMuted: "#605e5c",
  textFaint: "#8a8886",
  success: "#107c10",
  warning: "#8a6116",
  danger: "#a4262c",
};

export default function AzurePortalFrame({
  breadcrumb,
  children,
}: {
  breadcrumb: string[];
  children: React.ReactNode;
}) {
  const section = useLabStore((s) => s.activeSection);
  const setSection = useLabStore((s) => s.setSection);

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ backgroundColor: AZ.bg, borderColor: AZ.border }}
    >
      {/* top command bar */}
      <div
        className="flex items-center gap-2 overflow-hidden border-b px-2 py-2 sm:gap-3 sm:px-3"
        style={{ backgroundColor: "#0a0a0a", borderColor: AZ.border }}
      >
        <Menu size={16} className="shrink-0" style={{ color: AZ.textMuted }} />
        <div className="flex shrink-0 items-center gap-1.5">
          <div
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded"
            style={{ backgroundColor: AZ.blueDark }}
          >
            <span className="text-[10px] font-bold text-white">A</span>
          </div>
          <span className="hidden text-[13px] font-medium text-white sm:inline">Microsoft Azure</span>
        </div>
        <div
          className="ml-1 flex h-7 min-w-0 flex-1 items-center gap-2 rounded border px-2 sm:ml-2 sm:max-w-md"
          style={{ backgroundColor: "#1f1f1f", borderColor: AZ.border }}
        >
          <Search size={12} className="shrink-0" style={{ color: AZ.textFaint }} />
          <span className="hidden truncate text-[11px] sm:inline" style={{ color: AZ.textFaint }}>
            Search resources, services, and docs (G+/)
          </span>
          <span className="truncate text-[11px] sm:hidden" style={{ color: AZ.textFaint }}>
            Search
          </span>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3" style={{ color: AZ.textMuted }}>
          <HelpCircle size={15} className="hidden sm:block" />
          <Settings size={15} className="hidden sm:block" />
          <Bell size={15} />
          <Grid3x3 size={15} className="hidden sm:block" />
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{ backgroundColor: AZ.blueDark }}
          >
            CC
          </div>
        </div>
      </div>

      {/* breadcrumb */}
      <div
        className="flex items-center gap-1.5 border-b px-4 py-2 text-[12px]"
        style={{ borderColor: AZ.border, color: AZ.textMuted }}
      >
        {breadcrumb.map((b, i) => (
          <span key={b} className="flex items-center gap-1.5">
            {i > 0 && <span style={{ color: AZ.textFaint }}>&gt;</span>}
            <span className={i === breadcrumb.length - 1 ? "text-white" : ""}>{b}</span>
          </span>
        ))}
      </div>

      <div className="flex">
        <div
          className="flex w-12 flex-col items-center gap-1 border-r py-3"
          style={{ borderColor: AZ.border, backgroundColor: AZ.panel }}
        >
          {(
            [
              { key: "resource-groups" as const, icon: FolderKanban, label: "Resource groups" },
              { key: "storage-accounts" as const, icon: HardDrive, label: "Storage accounts" },
            ]
          ).map((item) => {
            const active = section === item.key;
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => setSection(item.key)}
                title={item.label}
                className="flex h-9 w-9 items-center justify-center rounded"
                style={{
                  backgroundColor: active ? "rgba(40,153,245,0.15)" : "transparent",
                  color: active ? AZ.blue : AZ.textMuted,
                  borderLeft: active ? `2px solid ${AZ.blue}` : "2px solid transparent",
                }}
              >
                <Icon size={16} />
              </button>
            );
          })}
        </div>

        <div className="flex-1 p-4" style={{ backgroundColor: AZL.bg, minHeight: 320 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
