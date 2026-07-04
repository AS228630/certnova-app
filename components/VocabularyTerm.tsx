"use client";

import { useState } from "react";
import { Languages } from "lucide-react";
import vocabulary from "@/lib/locales/vocabulary.json";

type Entry = { en: string; fa: string; explanation: string };
const dict = vocabulary as Record<string, Entry>;

export function VocabularyTerm({ term }: { term: string }) {
  const [open, setOpen] = useState(false);
  const entry = dict[term];
  if (!entry) return <>{term}</>;

  return (
    <span className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="cursor-help border-b border-dotted border-primary/60 text-text underline-offset-2 hover:text-primary"
      >
        {term}
      </button>
      {open && (
        <span className="absolute left-0 top-full z-20 mt-1.5 w-64 rounded-lg border border-border-soft bg-panel p-3 text-xs shadow-xl">
          <span className="mb-2 flex items-center gap-1.5 font-semibold text-text">
            <Languages size={12} className="text-primary" />
            {term}
          </span>
          <span className="mb-1.5 block text-text-muted">{entry.explanation}</span>
          <span className="flex gap-3 border-t border-border-soft pt-1.5">
            <span>
              <span className="text-text-faint">EN: </span>
              <span className="text-text">{entry.en}</span>
            </span>
            <span dir="rtl">
              <span className="text-text-faint">FA: </span>
              <span className="text-text">{entry.fa}</span>
            </span>
          </span>
        </span>
      )}
    </span>
  );
}

/** Splits plain instruction text and wraps any known vocabulary terms with a translation tooltip. */
export function VocabularyText({ text }: { text: string }) {
  const terms = Object.keys(dict).sort((a, b) => b.length - a.length);
  if (terms.length === 0) return <>{text}</>;

  const pattern = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        dict[part] ? <VocabularyTerm key={i} term={part} /> : <span key={i}>{part}</span>
      )}
    </>
  );
}
