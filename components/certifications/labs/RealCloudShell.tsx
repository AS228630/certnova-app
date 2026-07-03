"use client";

import { useRef, useState } from "react";
import { useLabStore } from "@/lib/store/labStore";

export default function RealCloudShell() {
  const cliLog = useLabStore((s) => s.cliLog);
  const runCliCommand = useLabStore((s) => s.runCliCommand);
  const [input, setInput] = useState("");
  const [tab, setTab] = useState<"cloudshell" | "powershell">("cloudshell");
  const scrollRef = useRef<HTMLDivElement>(null);

  function submit() {
    if (!input.trim()) return;
    runCliCommand(input);
    setInput("");
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    });
  }

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
        <span className="ml-auto text-[10px] text-white/30">Bash — Simulation</span>
      </div>

      <div ref={scrollRef} className="h-40 overflow-y-auto p-4 font-mono text-[12px] leading-relaxed text-white/80">
        {cliLog.map((line, i) =>
          line.type === "cmd" ? (
            <p key={i}>
              <span className="text-success">PS /home/azureuser&gt;</span> {line.text}
            </p>
          ) : (
            <p
              key={i}
              className={`whitespace-pre-wrap ${line.type === "err" ? "text-danger" : "text-white/50"}`}
            >
              {line.text}
            </p>
          )
        )}
      </div>

      <div className="flex items-center gap-2 border-t border-white/10 px-4 py-2">
        <span className="font-mono text-[12px] text-success">PS /home/azureuser&gt;</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="az group create --name CC-Lab-RG --location westeurope"
          className="flex-1 bg-transparent font-mono text-[12px] text-white outline-none placeholder:text-white/25"
        />
      </div>
    </div>
  );
}
