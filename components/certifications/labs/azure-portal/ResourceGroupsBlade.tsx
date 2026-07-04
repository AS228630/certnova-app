"use client";

import { Plus, RefreshCw, FolderOpen, Trash2 } from "lucide-react";
import { useLabStore } from "@/lib/store/labStore";
import { AZ } from "./AzurePortalFrame";

export default function ResourceGroupsBlade() {
  const resourceGroups = useLabStore((s) => s.resourceGroups);
  const openCreateBlade = useLabStore((s) => s.openCreateBlade);
  const deleteResourceGroup = useLabStore((s) => s.deleteResourceGroup);

  return (
    <div>
      <h2 className="mb-1 text-lg font-semibold text-white">Resource groups</h2>
      <p className="mb-4 text-[12px]" style={{ color: AZ.textMuted }}>
        Manage and organize your Azure resources.
      </p>

      <div className="mb-3 flex items-center gap-2">
        <button
          onClick={openCreateBlade}
          className="flex items-center gap-1.5 rounded px-3 py-1.5 text-[12px] font-medium text-white"
          style={{ backgroundColor: AZ.blueDark }}
        >
          <Plus size={13} />
          Create
        </button>
        <button
          className="flex items-center gap-1.5 rounded border px-3 py-1.5 text-[12px]"
          style={{ borderColor: AZ.border, color: AZ.textMuted }}
        >
          <RefreshCw size={12} />
          Refresh
        </button>
      </div>

      <div className="overflow-hidden rounded border" style={{ borderColor: AZ.border }}>
        <div
          className="grid grid-cols-[1fr_auto_auto] gap-4 border-b px-3 py-2 text-[11px] font-semibold"
          style={{ borderColor: AZ.border, color: AZ.textFaint, backgroundColor: AZ.panelAlt }}
        >
          <span>Name</span>
          <span>Location</span>
          <span></span>
        </div>

        {resourceGroups.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <FolderOpen size={28} style={{ color: AZ.textFaint }} />
            <p className="text-[12px]" style={{ color: AZ.textFaint }}>
              Keine Ressourcengruppen gefunden. Erstelle deine erste über &quot;Create&quot; oder
              die Cloud Shell.
            </p>
          </div>
        ) : (
          resourceGroups.map((rg) => (
            <div
              key={rg.name}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b px-3 py-2.5 text-[12px] last:border-b-0"
              style={{ borderColor: AZ.border }}
            >
              <span className="font-medium" style={{ color: AZ.blue }}>
                {rg.name}
              </span>
              <span className="text-white">{rg.location}</span>
              <button
                onClick={() => deleteResourceGroup(rg.name)}
                title="Löschen"
                className="rounded p-1 hover:bg-white/10"
                style={{ color: AZ.textFaint }}
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
