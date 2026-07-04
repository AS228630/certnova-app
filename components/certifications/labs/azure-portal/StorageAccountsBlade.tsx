"use client";

import { Plus, RefreshCw, Database, Trash2 } from "lucide-react";
import { useLabStore } from "@/lib/store/labStore";
import { AZ } from "./AzurePortalFrame";

export default function StorageAccountsBlade() {
  const storageAccounts = useLabStore((s) => s.storageAccounts);
  const openCreateBlade = useLabStore((s) => s.openCreateBlade);
  const deleteStorageAccount = useLabStore((s) => s.deleteStorageAccount);

  return (
    <div>
      <h2 className="mb-1 text-lg font-semibold text-white">Storage accounts</h2>
      <p className="mb-4 text-[12px]" style={{ color: AZ.textMuted }}>
        Sichere, skalierbare Cloud-Speicherkonten für deine Ressourcengruppe.
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
          className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 border-b px-3 py-2 text-[11px] font-semibold"
          style={{ borderColor: AZ.border, color: AZ.textFaint, backgroundColor: AZ.panelAlt }}
        >
          <span>Name</span>
          <span>Resource group</span>
          <span>Location</span>
          <span></span>
        </div>

        {storageAccounts.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <Database size={28} style={{ color: AZ.textFaint }} />
            <p className="text-[12px]" style={{ color: AZ.textFaint }}>
              Kein Speicherkonto gefunden. Erstelle eins über &quot;Create&quot; oder die Cloud Shell.
            </p>
          </div>
        ) : (
          storageAccounts.map((sa) => (
            <div
              key={sa.name}
              className="grid grid-cols-[1fr_1fr_auto_auto] items-center gap-4 border-b px-3 py-2.5 text-[12px] last:border-b-0"
              style={{ borderColor: AZ.border }}
            >
              <span className="font-medium" style={{ color: AZ.blue }}>
                {sa.name}
              </span>
              <span className="text-white">{sa.resourceGroup}</span>
              <span className="text-white">{sa.location}</span>
              <button
                onClick={() => deleteStorageAccount(sa.name)}
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
