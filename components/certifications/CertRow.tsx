import { Star, Users, Lock, ChevronRight } from "lucide-react";
import { getCompanyIcon } from "@/lib/vendorIcons";
import type { Certification } from "@/lib/companiesData";

const LEVEL_STYLES: Record<string, string> = {
  Anfänger: "bg-success-light text-success",
  Fortgeschritten: "bg-warning/10 text-warning",
  Experte: "bg-danger/10 text-danger",
};

export default function CertRow({ cert, companySlug }: { cert: Certification; companySlug: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border-soft bg-panel p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-panel-alt">
          {getCompanyIcon(companySlug, 22)}
        </div>
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-text">{cert.title}</h3>
            {cert.free && (
              <span className="rounded-full bg-success-light px-2 py-0.5 text-[11px] font-semibold text-success">
                Kostenlos
              </span>
            )}
          </div>
          <p className="mb-2 max-w-md text-sm text-text-muted">{cert.description}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-text-faint">
            <span className="rounded-full bg-primary-light px-2 py-0.5 font-semibold text-primary">
              {cert.category}
            </span>
            <span className={`rounded-full px-2 py-0.5 font-semibold ${LEVEL_STYLES[cert.level]}`}>
              {cert.level}
            </span>
            <span>{cert.questions.toLocaleString("de-DE")} Fragen</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center sm:gap-2">
        <div className="flex items-center gap-3 text-xs text-text-faint">
          <span className="flex items-center gap-1">
            <Users size={12} /> {cert.students.toLocaleString("de-DE")} Lernende
          </span>
          <span className="flex items-center gap-1 text-warning">
            <Star size={12} className="fill-warning" /> {cert.rating.toFixed(1)}
          </span>
        </div>
        {cert.locked ? (
          <span className="flex items-center gap-1 text-xs font-semibold text-text-faint">
            <Lock size={12} /> Gesperrt
          </span>
        ) : (
          <button className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-primary-dark">
            Lernen starten
            <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
