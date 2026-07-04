"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useLabStore, validateStorageAccountName } from "@/lib/store/labStore";
import { AZ } from "./AzurePortalFrame";

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
      <div className="max-w-md rounded border p-4 text-[12px]" style={{ borderColor: AZ.warning, color: AZ.warning }}>
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
      <h2 className="mb-4 text-lg font-semibold text-white">Create a storage account</h2>

      <div className="mb-4 flex gap-4 border-b" style={{ borderColor: AZ.border }}>
        {(["basics", "review"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="border-b-2 pb-2 text-[12px] font-medium"
            style={{
              borderColor: tab === t ? AZ.blue : "transparent",
              color: tab === t ? "white" : AZ.textMuted,
            }}
          >
            {t === "basics" ? "Basics" : "Review + create"}
          </button>
        ))}
      </div>

      {tab === "basics" ? (
        <div className="max-w-md space-y-4">
          <div>
            <label className="mb-1 block text-[12px]" style={{ color: AZ.textMuted }}>
              Resource group <span style={{ color: AZ.danger }}>*</span>
            </label>
            <select
              value={rg}
              onChange={(e) => setRg(e.target.value)}
              className="w-full rounded border px-3 py-2 text-[12px] text-white outline-none"
              style={{ borderColor: AZ.border, backgroundColor: "#0f0f0f" }}
            >
              {resourceGroups.map((r) => (
                <option key={r.name} value={r.name}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[12px]" style={{ color: AZ.textMuted }}>
              Storage account name <span style={{ color: AZ.danger }}>*</span>
            </label>
            <input
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="z.B. certcoachstorage"
              className="w-full rounded border px-3 py-2 text-[12px] text-white outline-none"
              style={{ borderColor: liveError ? AZ.danger : AZ.border, backgroundColor: "#0f0f0f" }}
            />
            <p className="mt-1 text-[11px]" style={{ color: liveError ? AZ.danger : AZ.textFaint }}>
              {liveError ?? "3-24 Zeichen, nur Kleinbuchstaben und Zahlen, global eindeutig."}
            </p>
          </div>

          <button
            onClick={() => setTab("review")}
            disabled={!name.trim() || !!liveError}
            className="rounded px-4 py-2 text-[12px] font-semibold text-white disabled:opacity-40"
            style={{ backgroundColor: AZ.blueDark }}
          >
            Review + create
          </button>
        </div>
      ) : (
        <div className="max-w-md space-y-4">
          <div className="rounded border p-3 text-[12px]" style={{ borderColor: AZ.border }}>
            <div className="mb-2 flex justify-between">
              <span style={{ color: AZ.textMuted }}>Resource group</span>
              <span className="text-white">{rg}</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span style={{ color: AZ.textMuted }}>Storage account name</span>
              <span className="text-white">{name || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: AZ.textMuted }}>Redundancy</span>
              <span className="text-white">Standard_LRS</span>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded border p-2.5 text-[12px]" style={{ borderColor: AZ.danger, color: AZ.danger }}>
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-start gap-2 rounded border p-2.5 text-[12px]" style={{ borderColor: AZ.success, color: AZ.success }}>
              <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
              {success}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setTab("basics")}
              className="rounded border px-4 py-2 text-[12px] font-medium"
              style={{ borderColor: AZ.border, color: AZ.textMuted }}
            >
              Zurück
            </button>
            {success ? (
              <button
                onClick={closeCreateBlade}
                className="rounded px-4 py-2 text-[12px] font-semibold text-white"
                style={{ backgroundColor: AZ.success }}
              >
                Zu den Speicherkonten
              </button>
            ) : (
              <button
                onClick={handleCreate}
                className="rounded px-4 py-2 text-[12px] font-semibold text-white"
                style={{ backgroundColor: AZ.blueDark }}
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
