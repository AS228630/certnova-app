"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useLabStore, TARGET_LOCATION_LABEL } from "@/lib/store/labStore";
import { AZL } from "./AzurePortalFrame";

const REGIONS = ["West Europe", "North Europe", "East US", "Southeast Asia", "UK South"];

export default function CreateResourceGroupBlade() {
  const createResourceGroup = useLabStore((s) => s.createResourceGroup);
  const closeCreateBlade = useLabStore((s) => s.closeCreateBlade);

  const [tab, setTab] = useState<"basics" | "review">("basics");
  const [name, setName] = useState("");
  const [region, setRegion] = useState(TARGET_LOCATION_LABEL);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleCreate() {
    const locationValue = region.toLowerCase().replace(/\s+/g, "");
    const result = createResourceGroup(name, locationValue === "westeurope" ? "westeurope" : region);
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
      <h2 className="mb-4 text-lg font-semibold text-[#201f1e]">Create a resource group</h2>

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
              Subscription
            </label>
            <div
              className="rounded border px-3 py-2 text-[12px] text-[#201f1e]"
              style={{ borderColor: AZL.border, backgroundColor: AZL.panelAlt }}
            >
              Azure Pass - Sponsorship
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[12px]" style={{ color: AZL.textMuted }}>
              Resource group name <span style={{ color: AZL.danger }}>*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="z.B. CC-Lab-RG"
              className="w-full rounded border px-3 py-2 text-[12px] text-[#201f1e] outline-none"
              style={{ borderColor: AZL.border, backgroundColor: "#ffffff" }}
            />
          </div>

          <div>
            <label className="mb-1 block text-[12px]" style={{ color: AZL.textMuted }}>
              Region <span style={{ color: AZL.danger }}>*</span>
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded border px-3 py-2 text-[12px] text-[#201f1e] outline-none"
              style={{ borderColor: AZL.border, backgroundColor: "#ffffff" }}
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setTab("review")}
            disabled={!name.trim()}
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
              <span style={{ color: AZL.textMuted }}>Subscription</span>
              <span className="text-[#201f1e]">Azure Pass - Sponsorship</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span style={{ color: AZL.textMuted }}>Resource group</span>
              <span className="text-[#201f1e]">{name || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: AZL.textMuted }}>Region</span>
              <span className="text-[#201f1e]">{region}</span>
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
                Zu den Ressourcengruppen
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
