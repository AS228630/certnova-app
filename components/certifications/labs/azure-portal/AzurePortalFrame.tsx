"use client";

import { Menu, Search, Bell, HelpCircle, Settings, Grid3x3 } from "lucide-react";

// Authentic Azure Portal "Dark theme" palette (matches portal.azure.com dark mode)
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

export default function AzurePortalFrame({
  breadcrumb,
  children,
}: {
  breadcrumb: string[];
  children: React.ReactNode;
}) {
  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ backgroundColor: AZ.bg, borderColor: AZ.border }}
    >
      {/* top command bar */}
      <div
        className="flex items-center gap-3 border-b px-3 py-2"
        style={{ backgroundColor: "#0a0a0a", borderColor: AZ.border }}
      >
        <Menu size={16} style={{ color: AZ.textMuted }} />
        <div className="flex items-center gap-1.5">
          <div
            className="flex h-5 w-5 items-center justify-center rounded"
            style={{ backgroundColor: AZ.blueDark }}
          >
            <span className="text-[10px] font-bold text-white">A</span>
          </div>
          <span className="text-[13px] font-medium text-white">Microsoft Azure</span>
        </div>
        <div
          className="ml-2 flex h-7 flex-1 max-w-md items-center gap-2 rounded border px-2"
          style={{ backgroundColor: "#1f1f1f", borderColor: AZ.border }}
        >
          <Search size={12} style={{ color: AZ.textFaint }} />
          <span className="text-[11px]" style={{ color: AZ.textFaint }}>
            Search resources, services, and docs (G+/)
          </span>
        </div>
        <div className="ml-auto flex items-center gap-3" style={{ color: AZ.textMuted }}>
          <HelpCircle size={15} />
          <Settings size={15} />
          <Bell size={15} />
          <Grid3x3 size={15} />
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

      <div className="p-4" style={{ backgroundColor: AZ.panel, minHeight: 320 }}>
        {children}
      </div>
    </div>
  );
}
