"use client";

import { useRef } from "react";
import { ChevronRight, Star } from "lucide-react";
import { getVendorIcon } from "@/lib/vendorIcons";

type Cert = {
  title: string;
  subtitle: string;
  level: string;
  rating: string;
  vendor: string;
};

export default function CertsScroller({ certs }: { certs: Cert[] }) {
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
        {certs.map((c) => (
          <div
            key={c.title}
            className="w-[240px] shrink-0 rounded-xl border border-border-soft bg-panel p-5 transition-colors hover:border-primary/40 sm:w-[260px]"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-panel-alt">
              {getVendorIcon(c.vendor)}
            </div>
            <h3 className="font-bold text-text">{c.title}</h3>
            <p className="text-sm text-text-muted">{c.subtitle}</p>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="rounded-full bg-primary-light px-2 py-1 font-semibold text-primary">
                {c.level}
              </span>
              <span className="flex items-center gap-1 font-semibold text-text">
                <Star size={12} className="fill-warning text-warning" />
                {c.rating}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        aria-label="Weitere Zertifizierungen anzeigen"
        className="absolute right-0 top-1/2 hidden h-9 w-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border-soft bg-panel text-text-muted shadow-lg hover:text-text sm:flex"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
