"use client";

import { Plus, RefreshCw, FolderOpen, Trash2 } from "lucide-react";
import { useLabStore } from "@/lib/store/labStore";
import { AZL } from "./AzurePortalFrame";

export default function ResourceGroupsBlade() {
  const resourceGroups = useLabStore((s) => s.resourceGroups);
  const openCreateBlade = useLabStore((s) => s.openCreateBlade);
  const deleteResourceGroup = useLabStore((s) => s.deleteResourceGroup);

  return (
    <div>
      <h2 className="mb-1 text-lg font-semibold" style={{ color: AZL.text }}>
        Resource groups
      </h2>
      <p className="mb-4 text-[12px]" style={{ color: AZL.textMuted }}>
        Manage and organize your Azure resources.
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
          className="grid grid-cols-[1fr_auto_auto] gap-4 border-b px-3 py-2 text-[11px] font-semibold"
          style={{ borderColor: AZL.border, color: AZL.textMuted, backgroundColor: AZL.panelAlt }}
        >
          <span>Name</span>
          <span>Location</span>
          <span></span>
        </div>

        {resourceGroups.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center" style={{ backgroundColor: AZL.bg }}>
            <FolderOpen size={28} style={{ color: AZL.textFaint }} />
            <p className="text-[12px]" style={{ color: AZL.textFaint }}>
              Keine Ressourcengruppen gefunden. Erstelle deine erste über &quot;Create&quot; oder
              die Cloud Shell.
            </p>
          </div>
        ) : (
          resourceGroups.map((rg) => (
            <div
              key={rg.name}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b px-3 py-2.5 text-[12px] last:border-b-0"
              style={{ borderColor: AZL.border, backgroundColor: AZL.bg }}
            >
              <span className="font-medium" style={{ color: AZL.blue }}>
                {rg.name}
              </span>
              <span style={{ color: AZL.text }}>{rg.location}</span>
              <button
                onClick={() => deleteResourceGroup(rg.name)}
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
