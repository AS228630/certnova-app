"use client";

import { useState, useRef, useEffect } from "react";
import { useCiscoLabStore } from "@/lib/store/ciscoLabStore";

function promptFor(hostname: string, mode: string) {
  if (mode === "user") return `${hostname}>`;
  if (mode === "privileged") return `${hostname}#`;
  if (mode === "config") return `${hostname}(config)#`;
  return `${hostname}(config-if)#`;
}

export default function CiscoTerminalEnvironment() {
  const {
    mode,
    hostname,
    currentInterface,
    interfaces,
    setMode,
    setHostname,
    markPrivileged,
    enterInterface,
    setInterfaceIp,
    setInterfaceEnabled,
  } = useCiscoLabStore();

  const [history, setHistory] = useState<{ cmd: string; out: string[] }[]>([
    { cmd: "", out: ["Cisco IOS Software (simuliert). Tippe `?` für verfügbare Befehle im aktuellen Modus."] },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  function run(cmdRaw: string) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;
    const parts = cmd.split(/\s+/);
    const head = parts.join(" ").toLowerCase();
    let out: string[] = [];

    if (cmd === "?") {
      if (mode === "user") out = ["enable"];
      else if (mode === "privileged") out = ["configure terminal", "show running-config", "disable"];
      else if (mode === "config") out = ["hostname <name>", "interface <name>", "exit"];
      else out = ["ip address <ip> <mask>", "no shutdown", "shutdown", "exit", "end"];
    } else if (mode === "user" && head === "enable") {
      setMode("privileged");
      markPrivileged();
    } else if (mode === "privileged" && (head === "configure terminal" || head === "conf t")) {
      setMode("config");
    } else if (mode === "privileged" && head === "disable") {
      setMode("user");
    } else if (mode === "privileged" && head === "show running-config") {
      out = [
        "Building configuration...",
        "!",
        `hostname ${hostname}`,
        "!",
        ...interfaces.flatMap((i) => [
          `interface ${i.name}`,
          i.ip ? ` ip address ${i.ip} ${i.mask}` : " no ip address",
          i.enabled ? " no shutdown" : " shutdown",
        ]),
        "!",
        "end",
      ];
    } else if (mode === "config" && parts[0]?.toLowerCase() === "hostname" && parts[1]) {
      setHostname(parts[1]);
    } else if (mode === "config" && parts[0]?.toLowerCase() === "interface" && parts[1]) {
      enterInterface(parts.slice(1).join(" "));
      setMode("config-if");
    } else if (mode === "config" && head === "exit") {
      setMode("privileged");
    } else if (mode === "config-if" && parts[0]?.toLowerCase() === "ip" && parts[1]?.toLowerCase() === "address" && parts[2] && parts[3] && currentInterface) {
      setInterfaceIp(currentInterface, parts[2], parts[3]);
    } else if (mode === "config-if" && head === "no shutdown" && currentInterface) {
      setInterfaceEnabled(currentInterface, true);
    } else if (mode === "config-if" && head === "shutdown" && currentInterface) {
      setInterfaceEnabled(currentInterface, false);
    } else if (mode === "config-if" && head === "exit") {
      setMode("config");
    } else if (mode === "config-if" && head === "end") {
      setMode("privileged");
    } else if (head === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else {
      out = ["% Invalid input detected."];
    }

    setHistory((prev) => [...prev, { cmd, out }]);
    setInput("");
  }

  const prompt = promptFor(hostname, mode);

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-3 sm:p-4">
      <div className="overflow-hidden rounded-xl border border-border-soft bg-[#0c0c0c]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#1e1e1e] px-3 py-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[11px] text-white/60">Cisco IOS: {prompt}</span>
        </div>

        <div className="h-72 overflow-y-auto p-3 font-mono text-[12px] leading-relaxed text-emerald-400 sm:h-80">
          {history.map((h, i) => (
            <div key={i}>
              {h.cmd && (
                <p>
                  <span className="text-sky-400">{prompt}</span> {h.cmd}
                </p>
              )}
              {h.out.map((line, j) => (
                <p key={j} className="text-slate-300">
                  {line}
                </p>
              ))}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(input);
          }}
          className="flex items-center gap-2 border-t border-white/10 bg-black px-3 py-2"
        >
          <span className="shrink-0 font-mono text-[12px] text-sky-400">{prompt}</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent font-mono text-[12px] text-white focus:outline-none"
            placeholder="IOS-Befehl eingeben..."
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
