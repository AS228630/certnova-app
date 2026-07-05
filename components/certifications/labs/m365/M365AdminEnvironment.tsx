"use client";

import {
  Home24Regular,
  People24Regular,
  PeopleTeam24Regular,
  DeviceMeetingRoom24Regular,
  Shield24Regular,
  Money24Regular,
  Settings24Regular,
  Alert24Regular,
  QuestionCircle24Regular,
  Search24Regular,
} from "@fluentui/react-icons";
import { UserPlus, RefreshCw } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", icon: Home24Regular },
  { label: "Benutzer", icon: People24Regular },
  { label: "Gruppen", icon: PeopleTeam24Regular },
  { label: "Geräte", icon: DeviceMeetingRoom24Regular },
  { label: "Sicherheit", icon: Shield24Regular },
  { label: "Abrechnung", icon: Money24Regular },
  { label: "Einstellungen", icon: Settings24Regular },
];

export default function M365AdminEnvironment() {
  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-3 sm:p-4">
      <div className="overflow-hidden rounded-xl border border-border-soft bg-bg">
        <div className="overflow-x-auto">
          <div className="min-w-[900px] bg-white text-[#242424]">
            {/* Real Microsoft 365 admin top bar */}
            <div className="flex items-center gap-3 bg-[#f3f2f1] px-3 py-1.5">
              <div className="flex items-center gap-1.5">
                <svg width="18" height="18" viewBox="0 0 23 23">
                  <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                  <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
                  <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
                  <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
                </svg>
                <span className="text-sm font-semibold text-[#242424]">Microsoft 365 Admin Center</span>
              </div>
              <div className="ml-2 flex h-7 flex-1 max-w-md items-center gap-2 rounded border border-[#e1dfdd] bg-white px-2">
                <Search24Regular fontSize={13} className="shrink-0 text-[#605e5c]" />
                <span className="truncate text-[11px] text-[#605e5c]">Suchen</span>
              </div>
              <div className="ml-auto flex items-center gap-3 text-[#605e5c]">
                <Alert24Regular fontSize={16} />
                <Settings24Regular fontSize={16} />
                <QuestionCircle24Regular fontSize={16} />
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5b5fc7] text-[10px] font-bold text-white">
                  A
                </span>
              </div>
            </div>

            <div className="flex" style={{ height: 340 }}>
              <div className="w-48 shrink-0 overflow-y-auto border-r border-[#e1dfdd] bg-[#faf9f8] p-2 text-[12px]">
                {NAV_ITEMS.map((n, i) => (
                  <p
                    key={n.label}
                    className={`flex items-center gap-2 rounded px-2 py-1.5 ${
                      i === 1 ? "bg-[#e8e6fa] font-semibold text-[#5b5fc7]" : "text-[#242424] hover:bg-black/5"
                    }`}
                  >
                    <n.icon fontSize={16} style={{ color: i === 1 ? "#5b5fc7" : "#605e5c" }} />
                    {n.label}
                  </p>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <h2 className="mb-1 text-lg font-semibold text-[#242424]">Aktive Benutzer</h2>
                <p className="mb-3 text-[12px] text-[#605e5c]">
                  Verwalte Benutzerkonten, Lizenzen und Rollen für deine Organisation.
                </p>

                <div className="mb-3 flex items-center gap-2">
                  <button className="flex items-center gap-1.5 rounded bg-[#5b5fc7] px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-[#4f52b2]">
                    <UserPlus size={13} />
                    Benutzer hinzufügen
                  </button>
                  <button className="flex items-center gap-1.5 rounded border border-[#e1dfdd] px-2.5 py-1.5 text-[12px] text-[#242424] hover:bg-black/5">
                    <RefreshCw size={12} />
                    Aktualisieren
                  </button>
                </div>

                <div className="rounded border border-[#e1dfdd]">
                  <div className="grid grid-cols-[1fr_1fr_auto] gap-4 border-b border-[#e1dfdd] bg-[#faf9f8] px-3 py-2 text-[11px] font-semibold text-[#605e5c]">
                    <span>Anzeigename</span>
                    <span>Benutzername</span>
                    <span>Lizenz</span>
                  </div>
                  <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-4 border-b border-[#e1dfdd] px-3 py-2.5 text-[12px] last:border-b-0">
                    <span className="font-medium text-[#5b5fc7]">CertCoach Admin</span>
                    <span className="text-[#242424]">admin@certcoach-lab.onmicrosoft.com</span>
                    <span className="text-[#242424]">Microsoft 365 E5</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 py-8 text-center">
                    <People24Regular fontSize={26} className="text-[#c8c6c4]" />
                    <p className="text-[12px] text-[#605e5c]">
                      Noch keine weiteren Benutzer angelegt. Klicke auf „Benutzer hinzufügen&quot;.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-[#e1dfdd] bg-[#faf9f8] px-3 py-1.5 text-[10px] text-[#605e5c]">
              © 2026 Microsoft (Simulation)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
