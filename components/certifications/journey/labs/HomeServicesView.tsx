"use client";

import { useState } from "react";
import {
  Add24Regular,
  PeopleTeam24Color,
  Server24Regular,
  Apps24Color,
  Rocket24Regular,
  Bot24Color,
  CubeTree24Regular,
  Storage24Regular,
  ArrowRight24Regular,
  WindowDevTools24Regular,
  Database24Color,
  Pulse24Regular,
  Key24Regular,
  Folder24Regular,
  ViewDesktop24Regular,
  VirtualNetwork24Regular,
} from "@fluentui/react-icons";
import { GraduationCap, Activity, ShieldCheck, DollarSign, ExternalLink, Download } from "lucide-react";

const SERVICE_TILES = [
  { label: "Resource erstellen", icon: Add24Regular, color: "#0078d4" },
  { label: "Microsoft Entra ID", icon: PeopleTeam24Color, color: "#0078d4" },
  { label: "Virtuelle Computer", icon: Server24Regular, color: "#0089d6" },
  { label: "Alle Ressourcen", icon: Apps24Color, color: "#0078d4" },
  { label: "Schnellstartcenter", icon: Rocket24Regular, color: "#ca5010" },
  { label: "Foundry", icon: Bot24Color, color: "#8764b8" },
  { label: "Kubernetes-Dienste", icon: CubeTree24Regular, color: "#326ce5" },
  { label: "Speicherkonten", icon: Storage24Regular, color: "#0078d4" },
  { label: "Weitere Dienste", icon: ArrowRight24Regular, color: "#0078d4" },
  { label: "App Services", icon: WindowDevTools24Regular, color: "#0062ad" },
  { label: "Speicherkonten", icon: Storage24Regular, color: "#0078d4" },
  { label: "SQL-Datenbanken", icon: Database24Color, color: "#0078d4" },
  { label: "Azure Cosmos DB", icon: Database24Color, color: "#3999c6" },
  { label: "Virtuelle Netzwerke", icon: VirtualNetwork24Regular, color: "#00bcf2" },
  { label: "Überwachen", icon: Pulse24Regular, color: "#7fba00" },
];

const NAVIGATE_TILES = [
  { label: "Abonnements", icon: Key24Regular, color: "#f2c811" },
  { label: "Ressourcengruppen", icon: Folder24Regular, color: "#0078d4" },
  { label: "Alle Ressourcen", icon: Apps24Color, color: "#0078d4" },
  { label: "Dashboard", icon: ViewDesktop24Regular, color: "#0078d4" },
];

const TOOLS_TILES = [
  {
    label: "Microsoft Learn",
    desc: "Erfahren Sie mit kostenlosen Onlinetrainings von Microsoft",
    icon: GraduationCap,
    color: "#0078d4",
  },
  {
    label: "Azure Monitor",
    desc: "Überwachen Sie Ihre Apps und Infrastruktur",
    icon: Activity,
    color: "#2ca01c",
  },
  {
    label: "Microsoft Defender for Cloud",
    desc: "Schützen Sie Ihre Apps und Infrastruktur",
    icon: ShieldCheck,
    color: "#0078d4",
  },
  {
    label: "Kostenverwaltung",
    desc: "Kosten analysieren und optimieren",
    icon: DollarSign,
    color: "#2ca01c",
  },
];

const USEFUL_LINKS = [
  "Technische Dokumentation",
  "Azure-Dienste",
  "Hilfe von Microsoft erhalten",
  "Azure Migrationstools",
  "Dienstupdates",
  "Azure-Community",
];

export default function HomeServicesView() {
  const [tab, setTab] = useState<"recent" | "favorites">("recent");

  return (
    <div className="w-[540px] shrink-0 overflow-y-auto bg-white p-4">
      <h3 className="mb-4 text-lg font-semibold text-[#201f1e]">Azure-Dienste</h3>

      <div className="mb-3 grid grid-cols-5 gap-x-2 gap-y-4 sm:grid-cols-9">
        {SERVICE_TILES.slice(0, 9).map((t, i) => (
          <div key={`${t.label}-${i}`} className="flex flex-col items-center gap-1.5 text-center">
            <t.icon fontSize={22} style={{ color: t.color }} />
            <span className="text-[10px] leading-tight text-[#0078d4]">{t.label}</span>
          </div>
        ))}
      </div>
      <div className="mb-6 grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-6">
        {SERVICE_TILES.slice(9).map((t, i) => (
          <div key={`${t.label}-${i + 9}`} className="flex flex-col items-center gap-1.5 text-center">
            <t.icon fontSize={22} style={{ color: t.color }} />
            <span className="text-[10px] leading-tight text-[#0078d4]">{t.label}</span>
          </div>
        ))}
      </div>

      <h4 className="mb-2 text-sm font-semibold text-[#201f1e]">Ressourcen</h4>
      <div className="mb-2 flex gap-4 border-b border-[#e1e1e1] text-[11px] font-semibold">
        <button
          onClick={() => setTab("recent")}
          className={`pb-1.5 ${tab === "recent" ? "border-b-2 border-[#0078d4] text-[#0078d4]" : "text-[#605e5c]"}`}
        >
          Zuletzt verwendet
        </button>
        <button
          onClick={() => setTab("favorites")}
          className={`pb-1.5 ${tab === "favorites" ? "border-b-2 border-[#0078d4] text-[#0078d4]" : "text-[#605e5c]"}`}
        >
          Favoriten
        </button>
      </div>

      <table className="mb-6 w-full text-left text-[11px]">
        <thead>
          <tr className="border-b border-[#e1e1e1] text-[#605e5c]">
            <th className="py-1.5 font-medium">Name</th>
            <th className="py-1.5 font-medium">Typ</th>
          </tr>
        </thead>
        <tbody>
          {tab === "recent" ? (
            <tr>
              <td className="py-1.5 text-[#0078d4]">certcoachb2c</td>
              <td className="py-1.5 text-[#605e5c]">Azure AD B2C Tenant</td>
            </tr>
          ) : (
            <tr>
              <td className="py-3 text-[#a19f9d]" colSpan={2}>
                Keine Favoriten vorhanden.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h4 className="mb-2 text-sm font-semibold text-[#201f1e]">Navigieren</h4>
      <div className="mb-6 grid grid-cols-2 gap-3">
        {NAVIGATE_TILES.map((t) => (
          <div key={t.label} className="flex items-center gap-2 text-[11px]">
            <t.icon fontSize={18} style={{ color: t.color }} />
            <span className="text-[#0078d4]">{t.label}</span>
          </div>
        ))}
      </div>

      <h4 className="mb-2 text-sm font-semibold text-[#201f1e]">Tools</h4>
      <div className="mb-6 grid grid-cols-2 gap-4">
        {TOOLS_TILES.map((t) => (
          <div key={t.label} className="flex gap-2">
            <t.icon size={20} style={{ color: t.color }} className="mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] font-semibold text-[#0078d4]">{t.label}</p>
              <p className="text-[10px] leading-tight text-[#605e5c]">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h4 className="mb-2 text-sm font-semibold text-[#201f1e]">Nützliche Links</h4>
      <div className="mb-6 grid grid-cols-2 gap-y-2 text-[11px]">
        {USEFUL_LINKS.map((l) => (
          <a key={l} href="#" className="flex items-center gap-1 text-[#0078d4] hover:underline">
            {l}
            <ExternalLink size={10} />
          </a>
        ))}
      </div>

      <h4 className="mb-2 text-sm font-semibold text-[#201f1e]">Azure mobile App</h4>
      <div className="flex gap-2">
        <div className="flex items-center gap-1.5 rounded border border-[#e1e1e1] px-2.5 py-1.5 text-[10px] text-[#201f1e]">
          <Download size={13} />
          App Store
        </div>
        <div className="flex items-center gap-1.5 rounded border border-[#e1e1e1] px-2.5 py-1.5 text-[10px] text-[#201f1e]">
          <Download size={13} />
          Google Play
        </div>
      </div>
    </div>
  );
}
