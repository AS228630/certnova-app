"use client";

import { createContext, useContext, useEffect, useState } from "react";
import de, { type Dictionary } from "@/lib/i18n/dictionaries/de";
import en from "@/lib/i18n/dictionaries/en";
import fa from "@/lib/i18n/dictionaries/fa";
import ar from "@/lib/i18n/dictionaries/ar";

// Languages with a real dictionary today. Others in LanguageSwitcher.tsx
// (es, fr, ru, tr) are on the roadmap but fall back to German until their
// dictionaries are written with the same care as these — showing a
// half-translated page would confuse users more than a consistent German
// one, so untranslated locales intentionally do NOT switch anything yet.
const dictionaries: Partial<Record<string, Dictionary>> = { de, en, fa, ar };
const RTL_LOCALES = new Set(["fa", "ar"]);

type LocaleContextValue = {
  locale: string;
  setLocale: (locale: string) => void;
  t: (path: string) => string;
  availableLocales: string[];
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "de",
  setLocale: () => {},
  t: (path: string) => path,
  availableLocales: ["de"],
});

export const useLocale = () => useContext(LocaleContext);

function getInitialLocale(): string {
  if (typeof window === "undefined") return "de";
  const stored = window.localStorage.getItem("certcoach-locale");
  return stored && dictionaries[stored] ? stored : "de";
}

function lookup(dict: Dictionary, path: string): string | undefined {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) return (acc as Record<string, unknown>)[key];
    return undefined;
  }, dict) as string | undefined;
}

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<string>(getInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = RTL_LOCALES.has(locale) ? "rtl" : "ltr";
  }, [locale]);

  function setLocale(next: string) {
    if (!dictionaries[next]) return; // don't switch to a locale with no real dictionary yet
    setLocaleState(next);
    window.localStorage.setItem("certcoach-locale", next);
  }

  function t(path: string): string {
    const active = dictionaries[locale] ?? de;
    return lookup(active, path) ?? lookup(de, path) ?? path;
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, availableLocales: Object.keys(dictionaries) }}>
      {children}
    </LocaleContext.Provider>
  );
}
