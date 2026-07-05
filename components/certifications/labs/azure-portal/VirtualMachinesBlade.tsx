"use client";

import { Plus, RefreshCw, Server, Trash2 } from "lucide-react";
import { useLabStore } from "@/lib/store/labStore";
import { AZL } from "./AzurePortalFrame";

export default function VirtualMachinesBlade() {
  const virtualMachines = useLabStore((s) => s.virtualMachines);
  const openCreateBlade = useLabStore((s) => s.openCreateBlade);
  const deleteVirtualMachine = useLabStore((s) => s.deleteVirtualMachine);

  return (
    <div>
      <h2 className="mb-1 text-lg font-semibold text-[#201f1e]">Virtual machines</h2>
      <p className="mb-4 text-[12px]" style={{ color: AZL.textMuted }}>
        Erstelle und verwalte Linux- und Windows-VMs in deiner Ressourcengruppe.
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
          className="grid grid-cols-[1fr_1fr_1fr_auto_auto] gap-4 border-b px-3 py-2 text-[11px] font-semibold"
          style={{ borderColor: AZL.border, color: AZL.textFaint, backgroundColor: AZL.panelAlt }}
        >
          <span>Name</span>
          <span>Resource group</span>
          <span>Size</span>
          <span>Status</span>
          <span></span>
        </div>

        {virtualMachines.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <Server size={28} style={{ color: AZL.textFaint }} />
            <p className="text-[12px]" style={{ color: AZL.textFaint }}>
              Keine virtuelle Maschine gefunden. Erstelle eine über &quot;Create&quot; oder die Cloud Shell.
            </p>
          </div>
        ) : (
          virtualMachines.map((vm) => (
            <div
              key={vm.name}
              className="grid grid-cols-[1fr_1fr_1fr_auto_auto] items-center gap-4 border-b px-3 py-2.5 text-[12px] last:border-b-0"
              style={{ borderColor: AZL.border }}
            >
              <span className="font-medium" style={{ color: AZL.blue }}>
                {vm.name}
              </span>
              <span className="text-[#201f1e]">{vm.resourceGroup}</span>
              <span className="text-[#201f1e]">{vm.size}</span>
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: vm.status === "Running" ? AZL.success : AZL.textFaint }}
                />
                <span style={{ color: vm.status === "Running" ? AZL.success : AZL.textMuted }}>{vm.status}</span>
              </span>
              <button
                onClick={() => deleteVirtualMachine(vm.name)}
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
