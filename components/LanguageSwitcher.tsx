"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export type LanguageOption = {
  code: string;
  label: string;
  flag: string;
};

// Researched against Microsoft's official AZ-900 exam languages (English,
// Japanese, Chinese, Korean, Spanish, German, French, Indonesian, Arabic,
// Italian, Portuguese, Russian) plus Persian/Farsi, which isn't an official
// Microsoft exam language but is widely used by Persian-speaking learners
// to study the material before sitting the exam in a supported language.
export const LANGUAGES: LanguageOption[] = [
  { code: "de", label: "Deutsch", flag: "\u{1F1E9}\u{1F1EA}" },
  { code: "en", label: "English", flag: "\u{1F1EC}\u{1F1E7}" },
  { code: "uk", label: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430", flag: "\u{1F1FA}\u{1F1E6}" },
  { code: "fa", label: "\u0641\u0627\u0631\u0633\u06CC", flag: "\u{1F1EE}\u{1F1F7}" },
  { code: "ar", label: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", flag: "\u{1F1F8}\u{1F1E6}" },
  { code: "es", label: "Espa\u00f1ol", flag: "\u{1F1EA}\u{1F1F8}" },
  { code: "fr", label: "Fran\u00e7ais", flag: "\u{1F1EB}\u{1F1F7}" },
  { code: "ru", label: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439", flag: "\u{1F1F7}\u{1F1FA}" },
  { code: "tr", label: "T\u00fcrk\u00e7e", flag: "\u{1F1F9}\u{1F1F7}" },
];

export default function LanguageSwitcher({
  variant = "light",
}: {
  /** "light" for use on dark headers (default), "dark" for use on light surfaces */
  variant?: "light" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, availableLocales } = useLocale();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
          variant === "dark"
            ? "border-border-soft text-text hover:border-primary"
            : "border-white/15 text-white/90 hover:border-white/40"
        }`}
      >
        <Globe size={14} />
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-border-soft bg-panel py-1 shadow-xl">
          {LANGUAGES.map((lang) => {
            const isAvailable = availableLocales.includes(lang.code);
            return (
              <button
                key={lang.code}
                onClick={() => {
                  if (!isAvailable) return;
                  setLocale(lang.code);
                  setOpen(false);
                }}
                disabled={!isAvailable}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm ${
                  isAvailable ? "text-text hover:bg-panel-alt" : "cursor-not-allowed text-text-faint"
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span className="flex-1">{lang.label}</span>
                {!isAvailable && <span className="text-[10px] text-text-faint">bald</span>}
                {locale === lang.code && <Check size={14} className="text-primary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
