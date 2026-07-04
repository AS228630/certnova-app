"use client";

import { useState } from "react";
import {
  RotateCw,
  ChevronDown,
  Search,
  Info,
  Plus,
  LayoutGrid,
  Trash2,
  RefreshCw,
  MessageSquare,
  X,
  Home,
  LayoutDashboard,
  Grid3x3,
  List,
  FolderKanban,
  AppWindow,
  Zap,
  Database,
  Server,
  Waypoints,
  HardDrive,
  Share2,
  Users,
  Activity,
  Lightbulb,
  ShieldCheck,
  HelpCircle,
  Settings,
  Bell,
  ChevronsUpDown,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Create a resource", icon: Plus },
  { label: "Home", icon: Home },
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "All services", icon: Grid3x3 },
];

const FAVORITE_ITEMS = [
  { label: "All resources", icon: List },
  { label: "Resource groups", icon: FolderKanban },
  { label: "App Services", icon: AppWindow },
  { label: "Function App", icon: Zap },
  { label: "SQL databases", icon: Database },
  { label: "Azure Cosmos DB", icon: Database },
  { label: "Virtual machines", icon: Server },
  { label: "Load balancers", icon: Waypoints },
  { label: "Storage accounts", icon: HardDrive },
  { label: "Virtual networks", icon: Share2 },
  { label: "Azure Active Directory", icon: Users },
  { label: "Monitor", icon: Activity },
  { label: "Advisor", icon: Lightbulb },
  { label: "Microsoft Defender for Cloud", icon: ShieldCheck },
];

const TABLE_COLUMNS = ["Name", "Domain Name", "Resource Group", "Location", "Subscription"];

const TABLE_ROWS = [
  {
    name: "certcoachb2c",
    domain: "certcoachb2c.onmicrosoft.com",
    resourceGroup: "CC-Lab-RG",
    location: "West Europe",
    subscription: "Azure Pass - Sponsorship",
  },
];

export default function LabEnvironment() {
  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-text">Virtuelle Umgebung</h2>
          <span className="flex items-center gap-1 text-xs font-semibold text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Aktiv
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-border-soft px-2.5 py-1.5 text-xs font-semibold text-text-muted hover:text-text">
            <RotateCw size={13} /> Neustarten
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-border-soft px-2.5 py-1.5 text-xs font-semibold text-text-muted hover:text-text">
            Optionen <ChevronDown size={13} />
          </button>
        </div>
      </div>

      {/* Mock browser chrome */}
      <div className="overflow-hidden rounded-xl border border-border-soft bg-bg">
        <div className="flex items-center gap-2 border-b border-border-soft bg-panel-alt px-3 py-2">
          <Search size={12} className="text-text-faint" />
          <span className="text-xs text-text-faint">Azure-Portal</span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[760px] bg-[#0f1420] text-[#e2e5ea]">
            {/* Real Azure-style top bar */}
            <div className="flex items-center gap-4 border-b border-white/10 bg-[#0b1220] px-3 py-1.5">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                <Grid3x3 size={15} className="text-[#50b4ff]" />
                Microsoft Azure
              </span>
              <div className="flex flex-1 items-center gap-2 rounded bg-white/5 px-2 py-1">
                <Search size={12} className="text-[#8b92a3]" />
                <span className="text-[11px] text-[#8b92a3]">Search resources, services, and docs (G+/)</span>
              </div>
              <div className="flex items-center gap-3 text-[#c7cbd4]">
                <HelpCircle size={14} />
                <Settings size={14} />
                <Bell size={14} />
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#50b4ff] text-[9px] font-bold text-white">
                  A
                </span>
              </div>
            </div>

            <div className="flex h-[360px]">
              <div className="w-44 shrink-0 overflow-y-auto border-r border-white/10 bg-[#141a29] p-2 text-[11px]">
                {NAV_ITEMS.map((n) => (
                  <p
                    key={n.label}
                    className="flex cursor-default items-center gap-2 truncate rounded px-1.5 py-1.5 text-[#c7cbd4] hover:bg-white/5"
                  >
                    <n.icon size={13} className="shrink-0 text-[#8b92a3]" />
                    {n.label}
                  </p>
                ))}
                <p className="mt-2 flex items-center gap-1 px-1.5 pb-1 font-semibold text-[#8b92a3]">
                  ★ FAVORITES
                </p>
                {FAVORITE_ITEMS.map((n) => (
                  <p
                    key={n.label}
                    className={`flex cursor-default items-center gap-2 truncate rounded px-1.5 py-1.5 hover:bg-white/5 ${
                      n.label === "Azure Active Directory" ? "bg-primary/20 text-primary" : "text-[#c7cbd4]"
                    }`}
                  >
                    <n.icon size={13} className="shrink-0 text-[#8b92a3]" />
                    {n.label}
                  </p>
                ))}
              </div>

              <div className="w-[540px] shrink-0 overflow-y-auto p-4">
                <p className="mb-1 text-[11px] text-[#8b92a3]">
                  Home <span className="mx-1">&gt;</span> Azure AD B2C
                </p>
                <h3 className="mb-3 text-lg font-semibold text-white">Azure AD B2C</h3>
                <p className="mb-3 text-[11px] text-[#8b92a3]">CertCoach</p>

                <div className="mb-3 flex flex-wrap items-center gap-4 border-b border-white/10 pb-2 text-xs text-[#c7cbd4]">
                  <span className="flex items-center gap-1">
                    <Plus size={13} /> Create
                  </span>
                  <span className="flex items-center gap-1">
                    <LayoutGrid size={13} /> Manage view <ChevronDown size={11} />
                  </span>
                  <span className="flex items-center gap-1">
                    <Trash2 size={13} /> Delete
                  </span>
                  <span className="flex items-center gap-1">
                    <RefreshCw size={13} /> Refresh
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={13} /> Got feedback?
                  </span>
                </div>

                <div className="mb-3 flex items-center justify-between rounded border border-[#2b6cb0]/40 bg-[#12253f] px-3 py-1.5 text-[11px] text-[#9cc4ec]">
                  <span className="flex items-center gap-1.5">
                    <Info size={12} />
                    Click here to switch back to the old Azure AD B2C experience.
                  </span>
                  <X size={12} className="text-[#9cc4ec]" />
                </div>

                <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px]">
                  <input
                    readOnly
                    placeholder="Filter for any field..."
                    className="w-40 rounded border border-white/15 bg-[#141a29] px-2 py-1 text-[#c7cbd4] placeholder:text-[#6b7284]"
                  />
                  <span className="flex items-center gap-1 rounded border border-white/15 bg-[#141a29] px-2 py-1 text-[#c7cbd4]">
                    Subscription equals all <ChevronDown size={11} />
                  </span>
                  <span className="flex items-center gap-1 rounded border border-white/15 bg-[#141a29] px-2 py-1 text-[#c7cbd4]">
                    Location equals all <ChevronDown size={11} />
                  </span>
                  <span className="flex items-center gap-1 text-[#9cc4ec]">
                    <Plus size={11} /> Add filter
                  </span>
                </div>

                <p className="mb-2 text-[11px] text-[#8b92a3]">Showing 1 to 1 of 1 records</p>

                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-white/10 text-[#8b92a3]">
                      {TABLE_COLUMNS.map((col) => (
                        <th key={col} className="pb-1.5 pr-3 font-medium">
                          <span className="flex items-center gap-1">
                            {col}
                            <ChevronsUpDown size={10} />
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS.map((row) => (
                      <tr key={row.name} className="border-b border-white/5">
                        <td className="py-2 pr-3 text-[#9cc4ec]">{row.name}</td>
                        <td className="py-2 pr-3 text-[#c7cbd4]">{row.domain}</td>
                        <td className="py-2 pr-3 text-[#c7cbd4]">{row.resourceGroup}</td>
                        <td className="py-2 pr-3 text-[#c7cbd4]">{row.location}</td>
                        <td className="py-2 pr-3 text-[#c7cbd4]">{row.subscription}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-border-soft bg-panel-alt px-3 py-1.5 text-text-faint">
          <LayoutGrid size={13} />
          <span className="ml-auto text-[10px]">10:15 AM 20/05/2024</span>
        </div>
      </div>

      <LabTerminal />
    </div>
  );
}

function LabTerminal() {
  const [tab, setTab] = useState<"cloudshell" | "powershell">("cloudshell");

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-border-soft bg-black">
      <div className="flex items-center gap-4 border-b border-border-soft bg-panel-alt px-3 py-2">
        <button
          onClick={() => setTab("cloudshell")}
          className={`text-xs font-semibold ${tab === "cloudshell" ? "text-primary" : "text-text-faint"}`}
        >
          Cloud Shell
        </button>
        <button
          onClick={() => setTab("powershell")}
          className={`text-xs font-semibold ${tab === "powershell" ? "text-primary" : "text-text-faint"}`}
        >
          PowerShell
        </button>
      </div>
      <div className="h-32 overflow-y-auto p-3 font-mono text-[11px] leading-relaxed text-emerald-400">
        <p>PS /home/azureuser&gt; Connect-AzAccount</p>
        <p>PS /home/azureuser&gt; Get-AzResourceGroup | Select-Object ResourceGroupName,Location</p>
        <p className="mt-1 text-slate-300">ResourceGroupName&emsp;&emsp;Location</p>
        <p className="text-slate-300">-----------------&emsp;&emsp;--------</p>
        <p className="text-slate-300">CC-Lab-RG&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;westeurope</p>
        <p className="mt-1">
          PS /home/azureuser&gt; <span className="animate-pulse">▍</span>
        </p>
      </div>
    </div>
  );
}
