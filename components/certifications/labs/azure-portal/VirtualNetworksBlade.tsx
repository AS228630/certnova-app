"use client";

import { Plus, RefreshCw, Waypoints, Trash2 } from "lucide-react";
import { useLabStore } from "@/lib/store/labStore";
import { AZL } from "./AzurePortalFrame";

export default function VirtualNetworksBlade() {
  const virtualNetworks = useLabStore((s) => s.virtualNetworks);
  const openCreateBlade = useLabStore((s) => s.openCreateBlade);
  const deleteVirtualNetwork = useLabStore((s) => s.deleteVirtualNetwork);

  return (
    <div>
      <h2 className="mb-1 text-lg font-semibold text-[#201f1e]">Virtual networks</h2>
      <p className="mb-4 text-[12px]" style={{ color: AZL.textMuted }}>
        Isolierte, sichere Netzwerke für deine Azure-Ressourcen.
      </p>

      <div className="mb-3 flex items-center gap-2">
        <button
          onClick={openCreateBlade}
          className="flex items-center gap-1.5 rounded px-3 py-1.5 text-[12px] font-medium text-white"
          style={{ backgroundColor: AZL.blue }}
        >
          <Plus size={13} />
          Create
        </button>
        <button
          className="flex items-center gap-1.5 rounded border px-3 py-1.5 text-[12px]"
          style={{ borderColor: AZL.border, color: AZL.textMuted }}
        >
          <RefreshCw size={12} />
          Refresh
        </button>
      </div>

      <div className="overflow-hidden rounded border" style={{ borderColor: AZL.border }}>
        <div
          className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 border-b px-3 py-2 text-[11px] font-semibold"
          style={{ borderColor: AZL.border, color: AZL.textFaint, backgroundColor: AZL.panelAlt }}
        >
          <span>Name</span>
          <span>Resource group</span>
          <span>Address space</span>
          <span></span>
        </div>

        {virtualNetworks.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <Waypoints size={28} style={{ color: AZL.textFaint }} />
            <p className="text-[12px]" style={{ color: AZL.textFaint }}>
              Kein virtuelles Netzwerk gefunden. Erstelle eins über &quot;Create&quot; oder die Cloud Shell.
            </p>
          </div>
        ) : (
          virtualNetworks.map((vnet) => (
            <div
              key={vnet.name}
              className="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-4 border-b px-3 py-2.5 text-[12px] last:border-b-0"
              style={{ borderColor: AZL.border }}
            >
              <span className="font-medium" style={{ color: AZL.blue }}>
                {vnet.name}
              </span>
              <span className="text-[#201f1e]">{vnet.resourceGroup}</span>
              <span className="text-[#201f1e]">{vnet.addressSpace}</span>
              <button
                onClick={() => deleteVirtualNetwork(vnet.name)}
                title="Löschen"
                className="rounded p-1 hover:bg-black/5"
                style={{ color: AZL.textFaint }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
