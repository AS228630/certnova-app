"use client";

import { useState, type MouseEvent as ReactMouseEvent } from "react";
import { RotateCw, ChevronDown, ArrowLeftRight } from "lucide-react";
import {
  Home24Color,
  ViewDesktop24Regular,
  Apps24Color,
  List24Regular,
  Folder24Regular,
  WindowDevTools24Regular,
  Flash24Regular,
  Database24Color,
  Server24Regular,
  Scales24Regular,
  Storage24Regular,
  VirtualNetwork24Regular,
  PeopleTeam24Color,
  Pulse24Regular,
  Lightbulb24Color,
  ShieldCheckmark24Color,
  Search24Regular,
  QuestionCircle24Color,
  Settings24Color,
  Alert24Color,
  Person24Color,
  Add24Regular,
  Grid24Regular,
  Delete24Regular,
  ArrowSync24Color,
  CommentMultiple24Color,
  Info24Filled,
  Dismiss24Regular,
  ArrowSort24Regular,
  Prompt24Regular,
  FullScreenMaximize24Regular,
  FullScreenMinimize24Regular,
} from "@fluentui/react-icons";

const NAV_ITEMS = [
  { label: "Create a resource", icon: Add24Regular, color: "#0078d4" },
  { label: "Home", icon: Home24Color, color: "#0078d4" },
  { label: "Dashboard", icon: ViewDesktop24Regular, color: "#0078d4" },
  { label: "All services", icon: Apps24Color, color: "#0078d4" },
];

const FAVORITE_ITEMS = [
  { label: "All resources", icon: List24Regular, color: "#0078d4" },
  { label: "Resource groups", icon: Folder24Regular, color: "#0078d4" },
  { label: "App Services", icon: WindowDevTools24Regular, color: "#0062ad" },
  { label: "Function App", icon: Flash24Regular, color: "#f2a815" },
  { label: "SQL databases", icon: Database24Color, color: "#0078d4" },
  { label: "Azure Cosmos DB", icon: Database24Color, color: "#0078d4" },
  { label: "Virtual machines", icon: Server24Regular, color: "#0089d6" },
  { label: "Load balancers", icon: Scales24Regular, color: "#5c2d91" },
  { label: "Storage accounts", icon: Storage24Regular, color: "#0078d4" },
  { label: "Virtual networks", icon: VirtualNetwork24Regular, color: "#00bcf2" },
  { label: "Azure Active Directory", icon: PeopleTeam24Color, color: "#0078d4" },
  { label: "Monitor", icon: Pulse24Regular, color: "#7fba00" },
  { label: "Advisor", icon: Lightbulb24Color, color: "#f2c811" },
  { label: "Microsoft Defender for Cloud", icon: ShieldCheckmark24Color, color: "#7fba00" },
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

const QUICK_COMMANDS = [
  { label: "Ressourcengruppe auflisten", cmd: "az group list", out: "CC-Lab-RG          westeurope" },
  { label: "Speicherkonten auflisten", cmd: "az storage account list", out: "certcoachb2c        CC-Lab-RG" },
  { label: "Aktuelles Abo anzeigen", cmd: "az account show", out: "Azure Pass - Sponsorship" },
];

export default function LabEnvironment() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [extraLines, setExtraLines] = useState<string[]>([]);
  const [boxSize, setBoxSize] = useState({ width: 760, height: 360 });
  const [maximized, setMaximized] = useState(false);

  function runQuickCommand(cmd: string, out: string) {
    setTerminalOpen(true);
    setExtraLines((prev) => [...prev, `PS /home/azureuser> ${cmd}`, out]);
  }

  function startResize(e: ReactMouseEvent) {
    if (maximized) return;
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = boxSize.width;
    const startH = boxSize.height;

    function onMove(ev: MouseEvent) {
      const newW = Math.min(1400, Math.max(480, startW + (ev.clientX - startX)));
      const newH = Math.min(720, Math.max(260, startH + (ev.clientY - startY)));
      setBoxSize({ width: newW, height: newH });
    }
    function onUp() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  const effectiveWidth = maximized ? 1200 : boxSize.width;
  const effectiveHeight = maximized ? 560 : boxSize.height;

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-4 sm:p-6">
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
      <p className="mb-1.5 flex items-center gap-1 text-[11px] text-text-faint sm:hidden">
        <ArrowLeftRight size={12} />
        Zur Seite wischen, um mehr zu sehen
      </p>
      <div className="relative overflow-hidden rounded-xl border border-border-soft bg-bg">
        <div className="flex items-center gap-2 border-b border-border-soft bg-panel-alt px-3 py-2">
          <Search24Regular fontSize={14} className="text-text-faint" />
          <span className="text-xs text-text-faint">Azure-Portal</span>
        </div>

        <div className="overflow-x-auto">
          {/* Light-mode Azure Portal simulation */}
          <div className="bg-white text-[#323130]" style={{ minWidth: effectiveWidth }}>
            {/* Real Azure blue top bar */}
            <div className="flex items-center gap-4 bg-[#0078d4] px-3 py-1.5">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                <Grid24Regular fontSize={16} />
                Microsoft Azure
              </span>
              <div className="flex flex-1 items-center gap-2 rounded bg-white px-2 py-1">
                <Search24Regular fontSize={13} className="text-[#605e5c]" />
                <span className="text-[11px] text-[#605e5c]">Search resources, services, and docs (G+/)</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <button
                  onClick={() => setTerminalOpen((v) => !v)}
                  title="Cloud Shell"
                  className={`rounded p-0.5 ${terminalOpen ? "bg-white/20" : "hover:bg-white/10"}`}
                >
                  <Prompt24Regular fontSize={16} />
                </button>
                <button
                  onClick={() => setMaximized((v) => !v)}
                  title={maximized ? "Verkleinern" : "Maximieren"}
                  className="rounded p-0.5 hover:bg-white/10"
                >
                  {maximized ? <FullScreenMinimize24Regular fontSize={16} /> : <FullScreenMaximize24Regular fontSize={16} />}
                </button>
                <QuestionCircle24Color fontSize={16} />
                <Settings24Color fontSize={16} />
                <Alert24Color fontSize={16} />
                <Person24Color fontSize={18} />
              </div>
            </div>

            <div className="flex" style={{ height: effectiveHeight }}>
              <div className="w-48 shrink-0 overflow-y-auto border-r border-[#e1e1e1] bg-[#f9f9f9] p-2 text-[11px]">
                {NAV_ITEMS.map((n) => (
                  <p
                    key={n.label}
                    className="flex cursor-default items-center gap-2 truncate rounded px-1.5 py-1.5 text-[#323130] hover:bg-[#eeeeee]"
                  >
                    <n.icon fontSize={16} className="shrink-0" style={{ color: n.color }} />
                    {n.label}
                  </p>
                ))}
                <p className="mt-2 flex items-center gap-1 px-1.5 pb-1 font-semibold text-[#605e5c]">
                  ★ FAVORITES
                </p>
                {FAVORITE_ITEMS.map((n) => (
                  <p
                    key={n.label}
                    className={`flex cursor-default items-center gap-2 truncate rounded px-1.5 py-1.5 hover:bg-[#eeeeee] ${
                      n.label === "Azure Active Directory" ? "bg-[#deecf9] text-[#0078d4]" : "text-[#323130]"
                    }`}
                  >
                    <n.icon fontSize={16} className="shrink-0" style={{ color: n.color }} />
                    {n.label}
                  </p>
                ))}
              </div>

              <div className="w-[540px] shrink-0 overflow-y-auto bg-white p-4">
                <p className="mb-1 text-[11px] text-[#605e5c]">
                  Home <span className="mx-1">&gt;</span> Azure AD B2C
                </p>
                <h3 className="mb-3 text-lg font-semibold text-[#201f1e]">Azure AD B2C</h3>
                <p className="mb-3 text-[11px] text-[#605e5c]">CertCoach</p>

                <div className="mb-3 flex flex-wrap items-center gap-4 border-b border-[#e1e1e1] pb-2 text-xs text-[#323130]">
                  <span className="flex items-center gap-1">
                    <Add24Regular fontSize={14} className="text-[#0078d4]" /> Create
                  </span>
                  <span className="flex items-center gap-1">
                    <Grid24Regular fontSize={14} className="text-[#0078d4]" /> Manage view <ChevronDown size={11} />
                  </span>
                  <span className="flex items-center gap-1">
                    <Delete24Regular fontSize={14} className="text-[#0078d4]" /> Delete
                  </span>
                  <span className="flex items-center gap-1">
                    <ArrowSync24Color fontSize={14} /> Refresh
                  </span>
                  <span className="flex items-center gap-1">
                    <CommentMultiple24Color fontSize={14} /> Got feedback?
                  </span>
                </div>

                <div className="mb-3 flex items-center justify-between rounded border border-[#c7e0f4] bg-[#f3f9fd] px-3 py-1.5 text-[11px] text-[#004578]">
                  <span className="flex items-center gap-1.5">
                    <Info24Filled fontSize={13} className="text-[#0078d4]" />
                    Click here to switch back to the old Azure AD B2C experience.
                  </span>
                  <Dismiss24Regular fontSize={13} className="text-[#004578]" />
                </div>

                <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px]">
                  <input
                    readOnly
                    placeholder="Filter for any field..."
                    className="w-40 rounded border border-[#c8c6c4] bg-white px-2 py-1 text-[#323130] placeholder:text-[#a19f9d]"
                  />
                  <span className="flex items-center gap-1 rounded border border-[#c8c6c4] bg-white px-2 py-1 text-[#323130]">
                    Subscription equals all <ChevronDown size={11} />
                  </span>
                  <span className="flex items-center gap-1 rounded border border-[#c8c6c4] bg-white px-2 py-1 text-[#323130]">
                    Location equals all <ChevronDown size={11} />
                  </span>
                  <span className="flex items-center gap-1 text-[#0078d4]">
                    <Add24Regular fontSize={11} /> Add filter
                  </span>
                </div>

                <p className="mb-2 text-[11px] text-[#605e5c]">Showing 1 to 1 of 1 records</p>

                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-[#e1e1e1] text-[#605e5c]">
                      {TABLE_COLUMNS.map((col) => (
                        <th key={col} className="pb-1.5 pr-3 font-medium">
                          <span className="flex items-center gap-1">
                            {col}
                            <ArrowSort24Regular fontSize={11} />
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS.map((row) => (
                      <tr key={row.name} className="border-b border-[#f3f2f1]">
                        <td className="py-2 pr-3 text-[#0078d4]">{row.name}</td>
                        <td className="py-2 pr-3 text-[#323130]">{row.domain}</td>
                        <td className="py-2 pr-3 text-[#323130]">{row.resourceGroup}</td>
                        <td className="py-2 pr-3 text-[#323130]">{row.location}</td>
                        <td className="py-2 pr-3 text-[#323130]">{row.subscription}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-border-soft bg-panel-alt px-3 py-1.5 text-text-faint">
          <Grid24Regular fontSize={14} />
          <span className="ml-auto text-[10px]">10:15 AM 20/05/2024</span>
        </div>

        {!maximized && (
          <div
            onMouseDown={startResize}
            title="Größe ändern"
            className="absolute bottom-1 right-1 hidden h-4 w-4 cursor-nwse-resize items-end justify-end text-text-faint/60 hover:text-primary sm:flex"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M9 1L1 9M9 5L5 9M9 9L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold text-text-faint">Schnellbefehle:</span>
        {QUICK_COMMANDS.map((q) => (
          <button
            key={q.cmd}
            onClick={() => runQuickCommand(q.cmd, q.out)}
            className="rounded-full border border-border-soft bg-panel-alt px-2.5 py-1 font-mono text-[10px] text-text-muted transition-colors hover:border-primary hover:text-primary"
          >
            {q.label}
          </button>
        ))}
      </div>

      <div
        className={`grid transition-all duration-300 ease-out ${
          terminalOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <LabTerminal extraLines={extraLines} />
        </div>
      </div>
    </div>
  );
}

function LabTerminal({ extraLines = [] }: { extraLines?: string[] }) {
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
        {extraLines.map((line, i) =>
          line.startsWith("PS ") ? (
            <p key={i} className="mt-1 text-emerald-400">
              {line}
            </p>
          ) : (
            <p key={i} className="text-slate-300">
              {line}
            </p>
          )
        )}
        <p className="mt-1">
          PS /home/azureuser&gt; <span className="animate-pulse">▍</span>
        </p>
      </div>
    </div>
  );
}
