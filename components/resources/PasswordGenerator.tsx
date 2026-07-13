"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function generate(length: number, opts: { upper: boolean; digits: boolean; symbols: boolean }) {
  let pool = LOWER;
  if (opts.upper) pool += UPPER;
  if (opts.digits) pool += DIGITS;
  if (opts.symbols) pool += SYMBOLS;

  // Uses crypto.getRandomValues (a real CSPRNG available in every
  // browser) rather than Math.random(), so the generated password is
  // genuinely suitable for real account security, not just a demo.
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => pool[b % pool.length]).join("");
}

function strengthLabel(length: number, opts: { upper: boolean; digits: boolean; symbols: boolean }, t: (k: string) => string) {
  const variety = 1 + (opts.upper ? 1 : 0) + (opts.digits ? 1 : 0) + (opts.symbols ? 1 : 0);
  const score = length * variety;
  if (score < 40) return { label: t("resTools.strengthWeak"), color: "bg-danger" };
  if (score < 80) return { label: t("resTools.strengthOk"), color: "bg-warning" };
  return { label: t("resTools.strengthStrong"), color: "bg-success" };
}

export default function PasswordGenerator() {
  const { t } = useLocale();
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState(() => generate(16, { upper: true, digits: true, symbols: true }));
  const [copied, setCopied] = useState(false);

  function regenerate() {
    setPassword(generate(length, { upper, digits, symbols }));
  }

  function copy() {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const strength = strengthLabel(length, { upper, digits, symbols }, t);

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex-1 overflow-x-auto rounded-lg border border-border-soft bg-panel-alt px-3 py-3 font-mono text-sm text-text">
          {password}
        </div>
        <button
          onClick={copy}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border-soft text-text-muted hover:text-text"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
        <button
          onClick={regenerate}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-white hover:bg-primary-dark"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-panel-alt">
          <div className={`h-1.5 rounded-full ${strength.color}`} style={{ width: `${Math.min(100, length * 5)}%` }} />
        </div>
        <span className="text-xs font-semibold text-text-muted">{strength.label}</span>
      </div>

      <div className="mb-4">
        <label className="mb-1.5 flex items-center justify-between text-xs font-semibold text-text-muted">
          {t("resTools.pwLength")}
          <span>{length}</span>
        </label>
        <input
          type="range"
          min={8}
          max={32}
          value={length}
          onChange={(e) => {
            const v = Number(e.target.value);
            setLength(v);
            setPassword(generate(v, { upper, digits, symbols }));
          }}
          className="w-full accent-primary"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { key: "upper", label: t("resTools.pwUpper"), checked: upper, set: setUpper },
          { key: "digits", label: t("resTools.pwDigits"), checked: digits, set: setDigits },
          { key: "symbols", label: t("resTools.pwSymbols"), checked: symbols, set: setSymbols },
        ].map((o) => (
          <label key={o.key} className="flex items-center gap-2 rounded-lg border border-border-soft px-3 py-2 text-xs text-text">
            <input
              type="checkbox"
              checked={o.checked}
              onChange={(e) => {
                o.set(e.target.checked);
                setPassword(generate(length, { upper: o.key === "upper" ? e.target.checked : upper, digits: o.key === "digits" ? e.target.checked : digits, symbols: o.key === "symbols" ? e.target.checked : symbols }));
              }}
              className="accent-primary"
            />
            {o.label}
          </label>
        ))}
      </div>
    </div>
  );
}
