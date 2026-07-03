import { Award, Briefcase, HelpCircle, ShieldCheck, Star } from "lucide-react";

const stats = [
  { icon: Award, value: "150+", label: "Zertifizierungen" },
  { icon: Briefcase, value: "25+", label: "Anbieter" },
  { icon: HelpCircle, value: "4.000+", label: "Prüfungsfragen" },
  { icon: ShieldCheck, value: "98%", label: "Bestehensrate" },
  { icon: Star, value: "4.9/5", label: "Bewertung" },
];

export default function CertificationsStats() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-border-soft bg-panel p-5 sm:grid-cols-5">
      {stats.map((s) => (
        <div key={s.label} className="flex items-center gap-3">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-primary-light">
            <s.icon size={17} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-text">{s.value}</p>
            <p className="text-[11px] text-text-muted">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
