"use client";

import { useState, useRef, useEffect } from "react";
import { useK8sLabStore } from "@/lib/store/k8sLabStore";

const PROMPT = "student@certcoach-lab";

export default function KubernetesCliEnvironment() {
  const cliLog = useK8sLabStore((s) => s.cliLog);
  const runCliCommand = useK8sLabStore((s) => s.runCliCommand);

  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [cliLog]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    runCliCommand(input);
    setInput("");
  }

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-3 sm:p-4">
      <div className="overflow-hidden rounded-xl border border-border-soft bg-[#0c0c0c]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#1e1e1e] px-3 py-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[11px] text-white/60">kubectl CLI: {PROMPT}</span>
        </div>

        <div className="h-72 overflow-y-auto p-3 font-mono text-[12px] leading-relaxed sm:h-80">
          {cliLog.map((line, i) => (
            <p
              key={i}
              className={
                line.type === "in" ? "text-sky-400" : line.type === "err" ? "text-red-400" : "text-slate-300"
              }
              style={{ whiteSpace: "pre-wrap" }}
            >
              {line.text}
            </p>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-white/10 bg-black px-3 py-2">
          <span className="shrink-0 font-mono text-[12px] text-sky-400">$</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent font-mono text-[12px] text-white focus:outline-none"
            placeholder="kubectl-Befehl eingeben..."
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
