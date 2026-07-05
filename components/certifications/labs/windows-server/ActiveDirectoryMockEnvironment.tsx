"use client";

import {
  Folder24Regular,
  Building24Regular,
  Person24Regular,
  Desktop24Regular,
  Server24Regular,
  Search24Regular,
  ArrowSync24Regular,
} from "@fluentui/react-icons";
import { UserPlus } from "lucide-react";

const TREE_ITEMS = [
  { label: "certcoach-lab.local", icon: Building24Regular, indent: 0 },
  { label: "Users", icon: Person24Regular, indent: 1, active: true },
  { label: "Computers", icon: Desktop24Regular, indent: 1 },
  { label: "Domain Controllers", icon: Server24Regular, indent: 1 },
  { label: "IT-Abteilung (OU)", icon: Folder24Regular, indent: 1 },
];

const AD_OBJECTS = [
  { name: "Administrator", type: "Benutzer", description: "Integriertes Administratorkonto" },
  { name: "Domain Admins", type: "Sicherheitsgruppe", description: "Designierte Administratoren der Domäne" },
  { name: "Domain Users", type: "Sicherheitsgruppe", description: "Alle Domänenbenutzer" },
];

export default function ActiveDirectoryMockEnvironment() {
  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-3 sm:p-4">
      <div className="overflow-hidden rounded-xl border border-border-soft bg-bg">
        <div className="overflow-x-auto">
          <div className="min-w-[900px] bg-[#f0f0f0] text-[#1f1f1f]">
            {/* Windows-style title bar */}
            <div className="flex items-center gap-2 bg-[#0a3d91] px-3 py-1.5 text-white">
              <Server24Regular fontSize={16} />
              <span className="text-sm font-semibold">Active Directory-Benutzer und -Computer</span>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-3 border-b border-[#c8c8c8] bg-[#f3f3f3] px-3 py-1.5 text-[12px] text-[#1f1f1f]">
              <span className="flex items-center gap-1.5">
                <UserPlus size={13} />
                Neuer Benutzer
              </span>
              <span className="flex items-center gap-1.5">
                <ArrowSync24Regular fontSize={14} />
                Aktualisieren
              </span>
              <div className="ml-auto flex h-7 w-56 items-center gap-2 rounded border border-[#c8c8c8] bg-white px-2">
                <Search24Regular fontSize={12} className="text-[#605e5c]" />
                <span className="text-[11px] text-[#605e5c]">Suchen</span>
              </div>
            </div>

            <div className="flex" style={{ height: 340 }}>
              {/* Domain tree */}
              <div className="w-56 shrink-0 overflow-y-auto border-r border-[#c8c8c8] bg-white p-2 text-[12px]">
                {TREE_ITEMS.map((t) => (
                  <p
                    key={t.label}
                    style={{ paddingLeft: 8 + t.indent * 16 }}
                    className={`flex items-center gap-2 rounded py-1.5 pr-2 ${
                      t.active ? "bg-[#cce4f7] font-semibold text-[#0a3d91]" : "text-[#1f1f1f] hover:bg-black/5"
                    }`}
                  >
                    <t.icon fontSize={15} style={{ color: t.active ? "#0a3d91" : "#605e5c" }} />
                    {t.label}
                  </p>
                ))}
              </div>

              {/* Object list */}
              <div className="flex-1 overflow-y-auto bg-white p-4">
                <h2 className="mb-1 text-base font-semibold text-[#1f1f1f]">Users</h2>
                <p className="mb-3 text-[12px] text-[#605e5c]">
                  3 Objekte in dieser Organisationseinheit (OU).
                </p>

                <div className="rounded border border-[#c8c8c8]">
                  <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-4 border-b border-[#c8c8c8] bg-[#f3f3f3] px-3 py-2 text-[11px] font-semibold text-[#605e5c]">
                    <span>Name</span>
                    <span>Typ</span>
                    <span>Beschreibung</span>
                  </div>
                  {AD_OBJECTS.map((o) => (
                    <div
                      key={o.name}
                      className="grid grid-cols-[1fr_1fr_1.4fr] items-center gap-4 border-b border-[#eaeaea] px-3 py-2 text-[12px] last:border-b-0"
                    >
                      <span className="flex items-center gap-1.5 font-medium text-[#0a3d91]">
                        <Person24Regular fontSize={14} />
                        {o.name}
                      </span>
                      <span className="text-[#1f1f1f]">{o.type}</span>
                      <span className="text-[#605e5c]">{o.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-[#c8c8c8] bg-[#f3f3f3] px-3 py-1.5 text-[10px] text-[#605e5c]">
              © 2026 Windows Server (Simulation)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
