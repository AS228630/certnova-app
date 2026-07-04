"use client";

import {
  Grid24Regular,
  Search24Regular,
  QuestionCircle24Color,
  Settings24Color,
  Alert24Color,
  Person24Color,
  Folder24Regular,
  Storage24Regular,
} from "@fluentui/react-icons";
import { useLabStore } from "@/lib/store/labStore";

// Authentic Azure Portal "Dark theme" palette — kept available for anything
// that still needs the dark chrome look elsewhere.
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

// Real Azure Portal is light by default: blue command bar, white/near-white
// sidebar and blades. This matches the approved AZ-104 lab reference exactly.
export const AZL = {
  bg: "#ffffff",
  sidebar: "#f9f9f9",
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
      style={{ backgroundColor: AZL.bg, borderColor: AZL.border }}
    >
      {/* Real Azure blue top command bar */}
      <div className="flex items-center gap-3 overflow-hidden px-3 py-2" style={{ backgroundColor: AZL.blue }}>
        <div className="flex shrink-0 items-center gap-1.5 text-white">
          <Grid24Regular fontSize={18} />
          <span className="hidden text-[13px] font-semibold sm:inline">Microsoft Azure</span>
        </div>
        <div className="ml-1 flex h-7 min-w-0 flex-1 items-center gap-2 rounded bg-white px-2 sm:ml-2 sm:max-w-md">
          <Search24Regular fontSize={13} className="shrink-0 text-[#605e5c]" />
          <span className="hidden truncate text-[11px] text-[#605e5c] sm:inline">
            Search resources, services, and docs (G+/)
          </span>
          <span className="truncate text-[11px] text-[#605e5c] sm:hidden">Search</span>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2.5 text-white sm:gap-3">
          <QuestionCircle24Color fontSize={17} className="hidden sm:block" />
          <Settings24Color fontSize={17} className="hidden sm:block" />
          <Alert24Color fontSize={17} />
          <Person24Color fontSize={19} />
        </div>
      </div>

      {/* breadcrumb */}
      <div
        className="flex items-center gap-1.5 border-b px-4 py-2 text-[12px]"
        style={{ borderColor: AZL.border, backgroundColor: AZL.sidebar, color: AZL.textMuted }}
      >
        {breadcrumb.map((b, i) => (
          <span key={b} className="flex items-center gap-1.5">
            {i > 0 && <span style={{ color: AZL.textFaint }}>&gt;</span>}
            <span style={i === breadcrumb.length - 1 ? { color: AZL.text, fontWeight: 600 } : undefined}>
              {b}
            </span>
          </span>
        ))}
      </div>

      <div className="flex">
        <div
          className="flex w-12 flex-col items-center gap-1 border-r py-3"
          style={{ borderColor: AZL.border, backgroundColor: AZL.sidebar }}
        >
          {(
            [
              { key: "resource-groups" as const, icon: Folder24Regular, label: "Resource groups", color: "#0078d4" },
              { key: "storage-accounts" as const, icon: Storage24Regular, label: "Storage accounts", color: "#00bcf2" },
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
                  backgroundColor: active ? "#deecf9" : "transparent",
                  borderLeft: active ? `2px solid ${AZL.blue}` : "2px solid transparent",
                }}
              >
                <Icon fontSize={18} style={{ color: item.color }} />
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
