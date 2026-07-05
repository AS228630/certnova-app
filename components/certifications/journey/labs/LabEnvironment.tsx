"use client";

import { useState } from "react";
import { RotateCw, ChevronDown, Apple, Play } from "lucide-react";
import {
  Navigation24Regular,
  Search24Regular,
  Sparkle24Filled,
  Prompt24Regular,
  Alert24Color,
  Settings24Color,
  QuestionCircle24Color,
  PersonAdd24Regular,
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
  Add24Regular,
  Grid24Regular,
  Rocket24Filled,
  Sparkle24Regular,
  CubeTree24Filled,
  Globe24Color,
  ArrowRight24Regular,
  Key24Filled,
  BoxMultiple24Regular,
  HatGraduation24Filled,
  DataHistogram24Regular,
  Money24Regular,
  Box24Regular,
} from "@fluentui/react-icons";

const NAV_ITEMS = [
  { label: "Resource erstellen", icon: Add24Regular },
  { label: "Home", icon: Home24Color },
  { label: "Dashboard", icon: ViewDesktop24Regular },
  { label: "Alle Dienste", icon: Apps24Color },
];

const FAVORITE_ITEMS = [
  { label: "Anwendungsvorlagen", icon: List24Regular },
  { label: "Alle Ressourcen", icon: Grid24Regular },
  { label: "Ressourcengruppen", icon: Folder24Regular },
  { label: "App Services", icon: WindowDevTools24Regular },
  { label: "Funktions-App", icon: Flash24Regular },
  { label: "Azure SQL-Datenbank", icon: Database24Color },
  { label: "Azure Cosmos DB", icon: Database24Color },
  { label: "Virtuelle Computer", icon: Server24Regular },
  { label: "Lastenausgleich", icon: Scales24Regular },
  { label: "Speicherkonten", icon: Storage24Regular },
  { label: "Virtuelle Netzwerke", icon: VirtualNetwork24Regular },
  { label: "Microsoft Entra ID", icon: PeopleTeam24Color },
  { label: "Überwachen", icon: Pulse24Regular },
  { label: "Advisor", icon: Lightbulb24Color },
  { label: "Microsoft Defender for Cloud", icon: ShieldCheckmark24Color },
  { label: "Kostenverwaltung + Abrechnung", icon: Money24Regular },
];

const SERVICE_TILES_ROW1 = [
  { label: "Resource erstellen", icon: Add24Regular, color: "text-[#0078d4]", link: true },
  { label: "Microsoft Entra ID", icon: PeopleTeam24Color },
  { label: "Virtuelle Computer", icon: Server24Regular, color: "text-[#0078d4]" },
  { label: "Alle Ressourcen", icon: Grid24Regular, color: "text-[#2ca02c]" },
  { label: "Schnellstartcenter", icon: Rocket24Filled, color: "text-[#e07b00]" },
  { label: "Foundry", icon: Sparkle24Filled, color: "text-[#8661c5]" },
  { label: "Kubernetes-Dienste", icon: CubeTree24Filled, color: "text-[#8661c5]" },
  { label: "Speicherkonten", icon: Storage24Regular, color: "text-[#00838f]" },
  { label: "Weitere Dienste", icon: ArrowRight24Regular, color: "text-[#0078d4]", link: true },
];

const SERVICE_TILES_ROW2 = [
  { label: "App Services", icon: Globe24Color },
  { label: "Speicherkonten", icon: Storage24Regular, color: "text-[#00838f]" },
  { label: "SQL-Datenbanken", icon: Database24Color },
  { label: "Azure Cosmos DB", icon: Database24Color },
  { label: "Virtuelle Netzwerke", icon: VirtualNetwork24Regular, color: "text-[#0078d4]" },
  { label: "Überwachen", icon: Pulse24Regular, color: "text-[#0078d4]" },
];

const NAVIGATE_TILES = [
  { label: "Abonnements", icon: Key24Filled, color: "text-[#e0a300]" },
  { label: "Ressourcengruppen", icon: BoxMultiple24Regular, color: "text-[#0078d4]" },
  { label: "Alle Ressourcen", icon: Grid24Regular, color: "text-[#2ca02c]" },
  { label: "Dashboard", icon: ViewDesktop24Regular, color: "text-[#00838f]" },
];

const TOOLS = [
  {
    icon: HatGraduation24Filled,
    badge: "99",
    title: "Microsoft Learn",
    desc: "Erfahren Sie mit kostenlosen Onlinetrainings von Microsoft",
  },
  { icon: DataHistogram24Regular, title: "Azure Monitor", desc: "Überwachen Sie Ihre Apps und Infrastruktur" },
  {
    icon: ShieldCheckmark24Color,
    title: "Microsoft Defender for Cloud",
    desc: "Schützen Sie Ihre Apps und Infrastruktur",
  },
  { icon: Money24Regular, title: "Kostenverwaltung", desc: "Kosten analysieren und optimieren" },
];

const LINKS_COL1 = ["Technische Dokumentation", "Azure-Dienste", "Hilfe von Microsoft erhalten"];
const LINKS_COL2 = ["Azure Migrationstools", "Dienstupdates", "Azure-Community"];

export default function LabEnvironment() {
  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-3 sm:p-4">
      {/* Mock browser chrome */}
      <div className="overflow-hidden rounded-xl border border-border-soft bg-bg">
        <div className="overflow-x-auto">
          {/* Light-mode Azure Portal simulation */}
          <div className="min-w-[900px] bg-white text-[#323130]">
            {/* Real Azure blue top bar */}
            <div className="flex items-center gap-3 bg-[#0078d4] px-3 py-1.5">
              <Navigation24Regular fontSize={18} className="text-white" />
              <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                <Grid24Regular fontSize={16} />
                Microsoft Azure
              </span>
              <div className="flex flex-1 items-center gap-2 rounded bg-[#c7e0f4] px-2 py-1">
                <Search24Regular fontSize={13} className="text-[#605e5c]" />
                <span className="text-[11px] text-[#605e5c]">Nach Ressourcen, Diensten und Dokumenten suchen (G+/)</span>
              </div>
              <span className="flex items-center gap-1 rounded bg-white px-2 py-1 text-[11px] font-semibold text-[#8661c5]">
                <Sparkle24Regular fontSize={13} /> Copilot
              </span>
              <div className="flex items-center gap-2.5 text-white">
                <Prompt24Regular fontSize={16} />
                <Alert24Color fontSize={16} />
                <Settings24Color fontSize={16} />
                <QuestionCircle24Color fontSize={16} />
                <PersonAdd24Regular fontSize={16} />
              </div>
              <div className="flex items-center gap-2 border-l border-white/25 pl-2.5">
                <div className="text-right leading-tight">
                  <p className="text-[10px] text-white">student@certcoach-lab.com</p>
                  <p className="text-[9px] text-[#c7e0f4]">CertCoach GmbH (Lab)</p>
                </div>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#0078d4]">
                  A
                </span>
              </div>
            </div>

            <div className="flex max-h-[560px] flex-col overflow-y-auto lg:max-h-none lg:flex-row">
              {/* Left Azure nav */}
              <div className="w-full shrink-0 overflow-y-auto border-b border-[#e1e1e1] bg-[#f9f9f9] p-2 text-[11px] lg:h-[640px] lg:w-52 lg:border-b-0 lg:border-r">
                {NAV_ITEMS.map((n) => (
                  <p
                    key={n.label}
                    className="flex cursor-default items-center gap-2 truncate rounded px-1.5 py-1.5 text-[#323130] hover:bg-[#eeeeee]"
                  >
                    <n.icon fontSize={16} className="shrink-0 text-[#0078d4]" />
                    {n.label}
                  </p>
                ))}
                <p className="mt-2 flex items-center gap-1 px-1.5 pb-1 font-semibold text-[#605e5c]">★ FAVORITEN</p>
                {FAVORITE_ITEMS.map((n) => (
                  <p
                    key={n.label}
                    className="flex cursor-default items-center gap-2 truncate rounded px-1.5 py-1.5 text-[#323130] hover:bg-[#eeeeee]"
                  >
                    <n.icon fontSize={16} className="shrink-0 text-[#0078d4]" />
                    {n.label}
                  </p>
                ))}
              </div>

              {/* Main home content */}
              <div className="min-w-0 flex-1 overflow-y-auto bg-white p-5 lg:h-[640px]">
                <h3 className="mb-4 text-lg font-semibold text-[#201f1e]">Azure-Dienste</h3>

                <div className="mb-6 grid grid-cols-3 gap-x-4 gap-y-5 sm:grid-cols-5">
                  {SERVICE_TILES_ROW1.map((t) => (
                    <div key={t.label} className="flex flex-col items-center gap-1.5 text-center">
                      <t.icon fontSize={26} className={t.color ?? "text-[#0078d4]"} />
                      <span className={`text-[11px] ${t.link ? "text-[#0078d4]" : "text-[#323130]"}`}>{t.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mb-6 grid grid-cols-3 gap-x-4 gap-y-5 sm:grid-cols-5">
                  {SERVICE_TILES_ROW2.map((t) => (
                    <div key={t.label} className="flex flex-col items-center gap-1.5 text-center">
                      <t.icon fontSize={26} className={t.color ?? "text-[#0078d4]"} />
                      <span className="text-[11px] text-[#323130]">{t.label}</span>
                    </div>
                  ))}
                </div>

                <h4 className="mb-2 text-sm font-bold text-[#201f1e]">Ressourcen</h4>
                <div className="mb-2 flex gap-4 border-b border-[#e1e1e1] text-xs">
                  <span className="border-b-2 border-[#0078d4] pb-1.5 font-semibold text-[#0078d4]">Zuletzt verwendet</span>
                  <span className="pb-1.5 text-[#605e5c]">Favorit</span>
                </div>
                <div className="mb-2 flex justify-between text-[11px] text-[#605e5c]">
                  <span>Name</span>
                  <span>Zuletzt angezeigt</span>
                </div>
                <div className="mb-2 flex flex-col items-center gap-2 rounded border border-[#e1e1e1] py-8">
                  <Box24Regular fontSize={28} className="text-[#c8c6c4]" />
                  <p className="text-[11px] text-[#605e5c]">In letzter Zeit wurden keine Ressourcen angezeigt.</p>
                </div>
                <button className="mb-6 rounded border border-[#8a8886] px-3 py-1.5 text-[11px] font-semibold text-[#323130] hover:bg-[#f3f2f1]">
                  Alle Ressourcen anzeigen
                </button>

                <h4 className="mb-3 text-sm font-bold text-[#201f1e]">Navigieren</h4>
                <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {NAVIGATE_TILES.map((t) => (
                    <div key={t.label} className="flex items-center gap-2">
                      <t.icon fontSize={20} className={t.color} />
                      <span className="text-[11px] text-[#0078d4]">{t.label}</span>
                    </div>
                  ))}
                </div>

                <h4 className="mb-3 text-sm font-bold text-[#201f1e]">Tools</h4>
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {TOOLS.map((t) => (
                    <div key={t.title} className="flex items-start gap-2">
                      <span className="relative shrink-0">
                        <t.icon fontSize={22} className="text-[#0078d4]" />
                        {t.badge && (
                          <span className="absolute -right-1.5 -top-1.5 rounded bg-[#0078d4] px-1 text-[8px] font-bold text-white">
                            {t.badge}
                          </span>
                        )}
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold text-[#0078d4]">{t.title}</p>
                        <p className="text-[10px] text-[#605e5c]">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h4 className="mb-3 text-sm font-bold text-[#201f1e]">Nützliche Links</h4>
                <div className="mb-6 grid grid-cols-2 gap-x-8 gap-y-1.5 text-[11px] text-[#0078d4]">
                  {LINKS_COL1.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                  {LINKS_COL2.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>

                <h4 className="mb-3 text-sm font-bold text-[#201f1e]">Azure mobile App</h4>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1.5 rounded border border-[#8a8886] px-2.5 py-1.5">
                    <Apple size={16} className="text-[#201f1e]" />
                    <span className="text-[9px] leading-none text-[#323130]">
                      Download on the
                      <br />
                      <b>App Store</b>
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5 rounded border border-[#8a8886] px-2.5 py-1.5">
                    <Play size={16} className="text-[#201f1e]" />
                    <span className="text-[9px] leading-none text-[#323130]">
                      GET IT ON
                      <br />
                      <b>Google Play</b>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-border-soft bg-panel-alt px-3 py-1.5 text-text-faint">
          <Grid24Regular fontSize={14} />
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
