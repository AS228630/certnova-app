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
} from "@fluentui/react-icons";

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
  { label: "SQL-Datenbanken", icon: Database24Color, color: "#0078d4" },
  { label: "Überwachen", icon: Pulse24Regular, color: "#7fba00" },
];

const NAVIGATE_TILES = [
  { label: "Abonnements", icon: Key24Regular, color: "#f2c811" },
  { label: "Ressourcengruppen", icon: Folder24Regular, color: "#0078d4" },
  { label: "Alle Ressourcen", icon: Apps24Color, color: "#0078d4" },
  { label: "Dashboard", icon: ViewDesktop24Regular, color: "#0078d4" },
];

export default function HomeServicesView() {
  return (
    <div className="w-[540px] shrink-0 overflow-y-auto bg-white p-4">
      <h3 className="mb-4 text-lg font-semibold text-[#201f1e]">Azure-Dienste</h3>

      <div className="mb-6 grid grid-cols-4 gap-x-2 gap-y-4">
        {SERVICE_TILES.map((t) => (
          <div key={t.label} className="flex flex-col items-center gap-1.5 text-center">
            <t.icon fontSize={22} style={{ color: t.color }} />
            <span className="text-[10px] leading-tight text-[#0078d4]">{t.label}</span>
          </div>
        ))}
      </div>

      <h4 className="mb-2 text-sm font-semibold text-[#201f1e]">Ressourcen</h4>
      <p className="mb-2 border-b border-[#0078d4] pb-1.5 text-[11px] font-semibold text-[#0078d4]">
        Zuletzt verwendet
      </p>
      <p className="mb-1 text-[11px] font-semibold text-[#605e5c]">Name</p>
      <p className="mb-6 text-[11px] text-[#a19f9d]">certcoachb2c</p>

      <h4 className="mb-2 text-sm font-semibold text-[#201f1e]">Navigieren</h4>
      <div className="grid grid-cols-2 gap-3">
        {NAVIGATE_TILES.map((t) => (
          <div key={t.label} className="flex items-center gap-2 text-[11px]">
            <t.icon fontSize={18} style={{ color: t.color }} />
            <span className="text-[#0078d4]">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
