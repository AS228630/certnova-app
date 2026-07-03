"use client";

import { useState } from "react";

const SAMPLE_OUTPUT = [
  { cmd: "Connect-AzAccount" },
  { cmd: "Get-AzResourceGroup | Select-Object ResourceGroupName,Location" },
  { out: "ResourceGroupName    Location" },
  { out: "-----------------    --------" },
  { out: "CC-Lab-RG            westeurope" },
];

export default function CloudShell() {
  const [tab, setTab] = useState<"cloudshell" | "powershell">("cloudshell");

  return (
    <div className="overflow-hidden rounded-2xl border border-border-soft bg-[#0b0f1a]">
      <div className="flex items-center gap-4 border-b border-white/10 px-4 py-2.5">
        {(["cloudshell", "powershell"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-xs font-semibold ${tab === t ? "text-primary" : "text-white/50 hover:text-white/80"}`}
          >
            {t === "cloudshell" ? "Cloud Shell" : "PowerShell"}
          </button>
        ))}
      </div>
      <div className="h-40 overflow-y-auto p-4 font-mono text-[12px] leading-relaxed text-white/80">
        {SAMPLE_OUTPUT.map((line, i) =>
          "cmd" in line ? (
            <p key={i}>
              <span className="text-success">PS /home/azureuser&gt;</span> {line.cmd}
            </p>
          ) : (
            <p key={i} className="text-white/50">
              {line.out}
            </p>
          )
        )}
        <p>
          <span className="text-success">PS /home/azureuser&gt;</span>
          <span className="ml-1 animate-pulse">▍</span>
        </p>
      </div>
    </div>
  );
}
