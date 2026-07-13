"use client";

import { useState } from "react";
import { load as yamlLoad, YAMLException } from "js-yaml";
import { CheckCircle2, XCircle } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

const SAMPLE = `name: certcoach\nservices:\n  - web\n  - api\nenv:\n  NODE_ENV: production\n`;

export default function YamlValidator() {
  const { t } = useLocale();
  const [input, setInput] = useState(SAMPLE);
  const [result, setResult] = useState<{ valid: boolean; message: string; parsed?: string } | null>(null);

  function validate() {
    try {
      const parsed = yamlLoad(input);
      setResult({ valid: true, message: t("resTools.yamlValid"), parsed: JSON.stringify(parsed, null, 2) });
    } catch (e) {
      const msg = e instanceof YAMLException ? e.message : t("resTools.yamlInvalidGeneric");
      setResult({ valid: false, message: msg });
    }
  }

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5 sm:p-6">
      <label className="mb-1.5 block text-xs font-semibold text-text-muted">{t("resTools.yamlInput")}</label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={10}
        className="w-full resize-none rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 font-mono text-xs text-text focus:border-primary focus:outline-none"
      />
      <button
        onClick={validate}
        className="mt-3 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-dark"
      >
        {t("resTools.validate")}
      </button>

      {result && (
        <div className="mt-4">
          <div
            className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold ${
              result.valid ? "bg-success-light text-success" : "bg-danger/10 text-danger"
            }`}
          >
            {result.valid ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
            {result.message}
          </div>
          {result.parsed && (
            <pre className="mt-3 max-h-56 overflow-auto rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 font-mono text-xs text-text">
              {result.parsed}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
