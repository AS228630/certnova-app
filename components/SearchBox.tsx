"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Award, Languages as LanguagesIcon, Compass } from "lucide-react";
import { searchSite, type SearchResult } from "@/lib/searchIndex";
import { useLocale } from "@/components/LocaleProvider";

const ICONS: Record<SearchResult["kind"], typeof Award> = {
  certification: Award,
  language: LanguagesIcon,
  page: Compass,
};

export default function SearchBox({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const { t } = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = searchSite(query);

  // ⌘K / Ctrl+K focuses the search box from anywhere on the page — the
  // shortcut hint next to the input was already shown before but did
  // nothing; this makes it real.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function goTo(result: SearchResult) {
    setOpen(false);
    setQuery("");
    router.push(result.href);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      goTo(results[activeIndex]);
    }
  }

  const isDesktop = variant === "desktop";

  return (
    <div ref={containerRef} className={`relative ${isDesktop ? "hidden w-full max-w-md lg:block" : "w-full lg:hidden"}`}>
      <div className="flex items-center gap-2 rounded-lg border border-border-soft bg-panel-alt px-3 py-2">
        <Search size={16} className="shrink-0 text-text-faint" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={t("header.searchPlaceholder")}
          className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-faint"
        />
        {isDesktop && (
          <kbd className="hidden shrink-0 rounded border border-border-soft bg-panel px-1.5 py-0.5 text-[10px] text-text-faint md:inline">
            ⌘K
          </kbd>
        )}
      </div>

      {open && query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-96 overflow-y-auto rounded-lg border border-border-soft bg-panel shadow-2xl">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-text-faint">{t("header.searchNoResults")}</p>
          ) : (
            results.map((r, i) => {
              const Icon = ICONS[r.kind];
              return (
                <button
                  key={`${r.kind}-${r.href}-${r.title}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => goTo(r)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    i === activeIndex ? "bg-panel-alt" : ""
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                    <Icon size={15} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-text">{r.title}</span>
                    <span className="block truncate text-xs text-text-faint">{r.subtitle}</span>
                  </span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
