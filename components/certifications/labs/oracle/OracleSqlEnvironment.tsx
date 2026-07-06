"use client";

import { useState, useRef, useEffect } from "react";

type Table = { columns: string[]; rows: string[][] };

const PROMPT = "SQL>";

export default function OracleSqlEnvironment() {
  const [tables, setTables] = useState<Record<string, Table>>({});
  const [history, setHistory] = useState<{ cmd: string; out: string[] }[]>([
    {
      cmd: "",
      out: [
        "Willkommen im isolierten Oracle-SQL-Terminal (SQL*Plus-Simulation).",
        "Verbunden mit: CERTCOACH_LAB@ORCL. Tippe `HELP` für verfügbare Befehle.",
      ],
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
    const upper = cmd.toUpperCase().replace(/;$/, "");
    let out: string[] = [];

    const createMatch = upper.match(/^CREATE TABLE (\w+)\s*\(([^)]*)\)$/i);
    const insertMatch = cmd.match(/^insert into (\w+)\s*values\s*\(([^)]*)\)$/i);
    const selectMatch = upper.match(/^SELECT \* FROM (\w+)$/i);

    if (upper === "HELP") {
      out = [
        "Verfügbar: CREATE TABLE <name> (spalte1, spalte2, ...);",
        "           INSERT INTO <name> VALUES (wert1, wert2, ...);",
        "           SELECT * FROM <name>;",
        "           SHOW TABLES;",
        "           CLEAR",
      ];
    } else if (upper === "SHOW TABLES") {
      const names = Object.keys(tables);
      out = names.length ? [`Tabellen: ${names.join(", ")}`] : ["Keine Tabellen vorhanden."];
    } else if (createMatch) {
      const [, name, colsRaw] = createMatch;
      const columns = colsRaw.split(",").map((c) => c.trim()).filter(Boolean);
      setTables((prev) => ({ ...prev, [name.toLowerCase()]: { columns, rows: [] } }));
      out = [`Tabelle ${name.toUpperCase()} wurde erstellt.`];
    } else if (insertMatch) {
      const [, name, valsRaw] = insertMatch;
      const key = name.toLowerCase();
      if (!tables[key]) {
        out = [`FEHLER: Tabelle "${name.toUpperCase()}" existiert nicht.`];
      } else {
        const values = valsRaw.split(",").map((v) => v.trim().replace(/^'(.*)'$/, "$1"));
        setTables((prev) => ({ ...prev, [key]: { ...prev[key], rows: [...prev[key].rows, values] } }));
        out = ["1 Zeile wurde erstellt."];
      }
    } else if (selectMatch) {
      const key = selectMatch[1].toLowerCase();
      const table = tables[key];
      if (!table) {
        out = [`FEHLER: Tabelle "${selectMatch[1]}" existiert nicht.`];
      } else if (table.rows.length === 0) {
        out = ["Keine Zeilen ausgewählt."];
      } else {
        const header = table.columns.map((c) => c.toUpperCase().padEnd(14)).join("");
        const sep = "-".repeat(header.length);
        const rows = table.rows.map((r) => r.map((v) => v.padEnd(14)).join(""));
        out = [header, sep, ...rows];
      }
    } else if (upper === "CLEAR") {
      setHistory([]);
      setInput("");
      return;
    } else {
      out = ["FEHLER: unbekannter Befehl oder Syntaxfehler."];
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
          <span className="ml-2 text-[11px] text-white/60">SQL*Plus: CERTCOACH_LAB@ORCL</span>
        </div>

        <div className="h-72 overflow-y-auto p-3 font-mono text-[12px] leading-relaxed text-amber-300 sm:h-80">
          {history.map((h, i) => (
            <div key={i}>
              {h.cmd && (
                <p>
                  <span className="text-sky-400">{PROMPT}</span> {h.cmd}
                </p>
              )}
              {h.out.map((line, j) => (
                <p key={j} className="whitespace-pre text-slate-300">
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
          <span className="shrink-0 font-mono text-[12px] text-sky-400">{PROMPT}</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent font-mono text-[12px] text-white focus:outline-none"
            placeholder="SQL-Befehl eingeben..."
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
