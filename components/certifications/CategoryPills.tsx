import { Cloud, ShieldCheck, Sparkles, Database, Grid2x2, Layers } from "lucide-react";
import type { CertCategoryDef, CertCategoryIcon, Certification } from "@/lib/companiesData";

const ICON_MAP: Record<CertCategoryIcon, typeof Cloud> = {
  cloud: Cloud,
  security: ShieldCheck,
  ai: Sparkles,
  data: Database,
  m365: Grid2x2,
  layers: Layers,
};

export default function CategoryPills({
  categories,
  certs,
  active,
  onChange,
}: {
  categories: CertCategoryDef[];
  certs: Certification[];
  active: string;
  onChange: (key: string) => void;
}) {
  const countFor = (key: string) => certs.filter((c) => c.categoryKey === key).length;

  return (
    <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {categories.map((cat) => {
        const Icon = ICON_MAP[cat.icon];
        const isActive = active === cat.key;
        return (
          <button
            key={cat.key}
            onClick={() => onChange(cat.key)}
            className={`flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-colors ${
              isActive
                ? "border-primary bg-primary-light"
                : "border-border-soft bg-panel hover:border-primary/30 hover:bg-panel-alt"
            }`}
          >
            <span className={`flex items-center gap-2 text-sm font-semibold ${isActive ? "text-primary" : "text-text"}`}>
              <Icon size={16} />
              {cat.label}
            </span>
            <span className="text-xs text-text-faint">{countFor(cat.key)} Zertifizierungen</span>
          </button>
        );
      })}
    </div>
  );
}
