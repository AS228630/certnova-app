"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export default function JsonFormatter() {
  const { t } = useLocale();
  const [input, setInput] = useState('{"name":"CertCoach","free":true,"users":120000}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function format() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  }

  function minify() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  }

  function copyOutput() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5 sm:p-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-text-muted">{t("resTools.jsonInput")}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            className="w-full resize-none rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 font-mono text-xs text-text focus:border-primary focus:outline-none"
          />
          <div className="mt-2 flex gap-2">
            <button onClick={format} className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-dark">
              {t("resTools.format")}
            </button>
            <button
              onClick={minify}
              className="rounded-lg border border-border-soft px-4 py-2 text-xs font-bold text-text hover:bg-panel-alt"
            >
              {t("resTools.minify")}
            </button>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-text-muted">{t("resTools.result")}</label>
          {error ? (
            <div className="rounded-lg border border-danger/30 bg-danger/5 px-3 py-2.5 text-xs text-danger">{error}</div>
          ) : (
            <div className="relative">
              <pre className="max-h-64 overflow-auto rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 font-mono text-xs text-text">
                {output || t("resTools.resultPlaceholder")}
              </pre>
              {output && (
                <button
                  onClick={copyOutput}
                  className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-panel px-2 py-1 text-[10px] font-semibold text-text-muted hover:text-text"
                >
                  {copied ? <Check size={11} /> : <Copy size={11} />}
                  {copied ? t("resTools.copied") : t("resTools.copy")}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
