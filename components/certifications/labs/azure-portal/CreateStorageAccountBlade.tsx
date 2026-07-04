"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useLabStore, validateStorageAccountName } from "@/lib/store/labStore";
import { AZL } from "./AzurePortalFrame";

export default function CreateStorageAccountBlade() {
  const resourceGroups = useLabStore((s) => s.resourceGroups);
  const createStorageAccount = useLabStore((s) => s.createStorageAccount);
  const closeCreateBlade = useLabStore((s) => s.closeCreateBlade);

  const [tab, setTab] = useState<"basics" | "review">("basics");
  const [name, setName] = useState("");
  const [rg, setRg] = useState(resourceGroups[0]?.name ?? "");
  const [liveError, setLiveError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (resourceGroups.length === 0) {
    return (
      <div className="max-w-md rounded border p-4 text-[12px]" style={{ borderColor: AZL.warning, color: AZL.warning }}>
        Du musst zuerst eine Ressourcengruppe erstellen, bevor du ein Speicherkonto anlegen kannst.
      </div>
    );
  }

  function handleNameChange(v: string) {
    setName(v);
    setLiveError(v ? validateStorageAccountName(v) : null);
  }

  function handleCreate() {
    const result = createStorageAccount(name, rg, resourceGroups.find((r) => r.name === rg)?.location ?? "westeurope");
    if (!result.ok) {
      setError(result.message);
      setSuccess(null);
    } else {
      setError(null);
      setSuccess(result.message);
    }
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-[#201f1e]">Create a storage account</h2>

      <div className="mb-4 flex gap-4 border-b" style={{ borderColor: AZL.border }}>
        {(["basics", "review"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="border-b-2 pb-2 text-[12px] font-medium"
            style={{
              borderColor: tab === t ? AZL.blue : "transparent",
              color: tab === t ? "white" : AZL.textMuted,
            }}
          >
            {t === "basics" ? "Basics" : "Review + create"}
          </button>
        ))}
      </div>

      {tab === "basics" ? (
        <div className="max-w-md space-y-4">
          <div>
            <label className="mb-1 block text-[12px]" style={{ color: AZL.textMuted }}>
              Resource group <span style={{ color: AZL.danger }}>*</span>
            </label>
            <select
              value={rg}
              onChange={(e) => setRg(e.target.value)}
              className="w-full rounded border px-3 py-2 text-[12px] text-[#201f1e] outline-none"
              style={{ borderColor: AZL.border, backgroundColor: "#ffffff" }}
            >
              {resourceGroups.map((r) => (
                <option key={r.name} value={r.name}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[12px]" style={{ color: AZL.textMuted }}>
              Storage account name <span style={{ color: AZL.danger }}>*</span>
            </label>
            <input
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="z.B. certcoachstorage"
              className="w-full rounded border px-3 py-2 text-[12px] text-[#201f1e] outline-none"
              style={{ borderColor: liveError ? AZL.danger : AZL.border, backgroundColor: "#ffffff" }}
            />
            <p className="mt-1 text-[11px]" style={{ color: liveError ? AZL.danger : AZL.textFaint }}>
              {liveError ?? "3-24 Zeichen, nur Kleinbuchstaben und Zahlen, global eindeutig."}
            </p>
          </div>

          <button
            onClick={() => setTab("review")}
            disabled={!name.trim() || !!liveError}
            className="rounded px-4 py-2 text-[12px] font-semibold text-white disabled:opacity-40"
            style={{ backgroundColor: AZL.blue }}
          >
            Review + create
          </button>
        </div>
      ) : (
        <div className="max-w-md space-y-4">
          <div className="rounded border p-3 text-[12px]" style={{ borderColor: AZL.border }}>
            <div className="mb-2 flex justify-between">
              <span style={{ color: AZL.textMuted }}>Resource group</span>
              <span className="text-[#201f1e]">{rg}</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span style={{ color: AZL.textMuted }}>Storage account name</span>
              <span className="text-[#201f1e]">{name || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: AZL.textMuted }}>Redundancy</span>
              <span className="text-[#201f1e]">Standard_LRS</span>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded border p-2.5 text-[12px]" style={{ borderColor: AZL.danger, color: AZL.danger }}>
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-start gap-2 rounded border p-2.5 text-[12px]" style={{ borderColor: AZL.success, color: AZL.success }}>
              <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
              {success}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setTab("basics")}
              className="rounded border px-4 py-2 text-[12px] font-medium"
              style={{ borderColor: AZL.border, color: AZL.textMuted }}
            >
              Zurück
            </button>
            {success ? (
              <button
                onClick={closeCreateBlade}
                className="rounded px-4 py-2 text-[12px] font-semibold text-white"
                style={{ backgroundColor: AZL.success }}
              >
                Zu den Speicherkonten
              </button>
            ) : (
              <button
                onClick={handleCreate}
                className="rounded px-4 py-2 text-[12px] font-semibold text-white"
                style={{ backgroundColor: AZL.blue }}
              >
                Create
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
