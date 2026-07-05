"use client";

import { useState, useRef, useEffect } from "react";

type FsNode = { type: "dir" | "file"; name: string; executable?: boolean };

const PROMPT = "student@certcoach-lab";

export default function LinuxTerminalEnvironment() {
  const [cwd, setCwd] = useState("/home/student");
  const [fs, setFs] = useState<Record<string, FsNode[]>>({
    "/home/student": [],
  });
  const [history, setHistory] = useState<{ cmd: string; out: string[] }[]>([
    {
      cmd: "",
      out: ["Willkommen im isolierten Linux-Terminal. Tippe `help` für verfügbare Befehle."],
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  function run(cmdRaw: string) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;
    const [name, ...args] = cmd.split(/\s+/);
    let out: string[] = [];

    if (name === "help") {
      out = ["Verfügbar: pwd, ls, ls -l, mkdir <name>, cd <name>, cd .., touch <name>, chmod +x <name>, cat <name>, clear"];
    } else if (name === "pwd") {
      out = [cwd];
    } else if (name === "ls" && args[0] !== "-l") {
      out = [(fs[cwd] ?? []).map((n) => n.name).join("  ") || ""];
    } else if (name === "ls" && args[0] === "-l") {
      out = (fs[cwd] ?? []).map(
        (n) =>
          `${n.type === "dir" ? "d" : "-"}rw${n.executable ? "x" : "-"}r--r--  1 student student  ${n.name}`
      );
      if (out.length === 0) out = [""];
    } else if (name === "mkdir" && args[0]) {
      const dirName = args[0];
      setFs((prev) => ({
        ...prev,
        [cwd]: [...(prev[cwd] ?? []), { type: "dir", name: dirName }],
        [`${cwd}/${dirName}`]: prev[`${cwd}/${dirName}`] ?? [],
      }));
      out = [""];
    } else if (name === "cd" && args[0] === "..") {
      setCwd((prev) => prev.split("/").slice(0, -1).join("/") || "/");
      out = [""];
    } else if (name === "cd" && args[0]) {
      const target = `${cwd}/${args[0]}`;
      if (fs[target] !== undefined) {
        setCwd(target);
        out = [""];
      } else {
        out = [`bash: cd: ${args[0]}: No such file or directory`];
      }
    } else if (name === "touch" && args[0]) {
      const fileName = args[0];
      setFs((prev) => ({
        ...prev,
        [cwd]: [...(prev[cwd] ?? []).filter((n) => n.name !== fileName), { type: "file", name: fileName }],
      }));
      out = [""];
    } else if (name === "chmod" && args[0] === "+x" && args[1]) {
      const fileName = args[1];
      setFs((prev) => ({
        ...prev,
        [cwd]: (prev[cwd] ?? []).map((n) => (n.name === fileName ? { ...n, executable: true } : n)),
      }));
      out = [""];
    } else if (name === "cat" && args[0]) {
      const exists = (fs[cwd] ?? []).some((n) => n.name === args[0]);
      out = [exists ? "" : `cat: ${args[0]}: No such file or directory`];
    } else if (name === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else {
      out = [`bash: ${name}: command not found`];
    }

    setHistory((prev) => [...prev, { cmd, out }]);
    setInput("");
  }

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-3 sm:p-4">
      <div className="overflow-hidden rounded-xl border border-border-soft bg-[#0c0c0c]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#1e1e1e] px-3 py-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[11px] text-white/60">{PROMPT}: {cwd}</span>
        </div>

        <div className="h-72 overflow-y-auto p-3 font-mono text-[12px] leading-relaxed text-emerald-400 sm:h-80">
          {history.map((h, i) => (
            <div key={i}>
              {h.cmd && (
                <p>
                  <span className="text-sky-400">{PROMPT}</span>
                  <span className="text-white/60">:{cwd}$</span> {h.cmd}
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
          <span className="shrink-0 font-mono text-[12px] text-sky-400">{PROMPT}:{cwd}$</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent font-mono text-[12px] text-white focus:outline-none"
            placeholder="Linux-Befehl eingeben..."
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
