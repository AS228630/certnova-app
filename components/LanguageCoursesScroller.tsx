"use client";

import { useRef } from "react";
import { ChevronRight, Star, Globe2 } from "lucide-react";

type LanguageCourse = {
  flag: string;
  language: string;
  level: string;
  rating: string;
};

export default function LanguageCoursesScroller({ courses }: { courses: LanguageCourse[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    scrollerRef.current?.scrollBy({ left: 280, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-1"
      >
        {courses.map((c) => (
          <div
            key={c.language}
            className="w-[200px] shrink-0 rounded-xl border border-border-soft bg-panel p-5 text-center transition-colors hover:border-primary/40"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-panel-alt text-2xl">
              {c.flag}
            </div>
            <h3 className="font-bold text-text">{c.language}</h3>
            <p className="mb-3 text-xs text-text-faint">{c.level}</p>
            <span className="mx-auto flex w-fit items-center gap-1 text-xs font-semibold text-text">
              <Star size={12} className="fill-warning text-warning" />
              {c.rating}
            </span>
          </div>
        ))}

        <div className="flex w-[200px] shrink-0 flex-col items-center justify-center rounded-xl border border-dashed border-border-soft bg-panel-alt/40 p-5 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-panel-alt text-primary">
            <Globe2 size={22} />
          </div>
          <p className="text-sm font-semibold text-text">Alle Sprachkurse anzeigen</p>
        </div>
      </div>

      <button
        onClick={scrollRight}
        aria-label="Weitere Sprachkurse anzeigen"
        className="absolute right-0 top-1/2 hidden h-9 w-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border-soft bg-panel text-text-muted shadow-lg hover:text-text sm:flex"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
