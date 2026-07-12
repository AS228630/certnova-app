"use client";

import { useState } from "react";
import { Search, Headset } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";

const ARTICLE_KEYS = ["help.article1", "help.article2", "help.article3", "help.article4", "help.article5", "help.article6"];

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function HelpHero() {
  const { t } = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ key: string; question: string }[] | null>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = normalize(query.trim());
    if (q.length === 0) {
      setResults(null);
      return;
    }
    const matches = ARTICLE_KEYS.map((key) => ({ key, question: t(`${key}Q`) })).filter((a) => normalize(a.question).includes(q));
    setResults(matches);
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border-soft bg-gradient-to-br from-panel to-panel-alt p-6 md:p-10">
      <div className="relative z-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_180px]">
        <div>
          <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("help.heroTitle")}</h1>
          <p className="mt-2 max-w-lg text-sm text-text-muted">{t("help.heroDesc")}</p>

          <form onSubmit={handleSearch} className="mt-5 flex max-w-xl flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-faint" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("help.searchPlaceholder")}
                className="w-full rounded-xl border border-border-soft bg-panel py-3 pl-10 pr-3 text-sm text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
              />
            </div>
            <button type="submit" className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary-dark">
              {t("help.searchBtn")}
            </button>
          </form>

          {results && (
            <div className="mt-3 max-w-xl rounded-xl border border-border-soft bg-panel p-2">
              {results.length === 0 ? (
                <p className="px-3 py-2 text-xs text-text-faint">{t("help.noResults")}</p>
              ) : (
                results.map((r) => (
                  <button
                    key={r.key}
                    onClick={() => {
                      document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" });
                      router.refresh();
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-xs text-text hover:bg-panel-alt"
                  >
                    {r.question}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <div className="mx-auto hidden h-32 w-32 items-center justify-center rounded-full bg-primary-light lg:flex">
          <Headset size={52} className="text-primary" strokeWidth={1.5} />
        </div>
      </div>

      <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
    </section>
  );
}
