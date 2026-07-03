import Link from "next/link";
import { Gift, ArrowRight } from "lucide-react";

const stats = [
  { value: "128.420+", label: "Aktive Lernende" },
  { value: "54.000+", label: "Zertifikate erhalten" },
  { value: "92", label: "Länder" },
  { value: "4,9/5", label: "Durchschnittsbewertung" },
  { value: "2,4 Mio.", label: "KI-Coaching Sessions" },
];

export default function CertificationsCTA() {
  return (
    <div className="mt-10 flex flex-col gap-6 rounded-2xl bg-gradient-to-r from-primary-dark to-primary p-6 md:flex-row md:items-center md:justify-between md:p-8">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-white/15">
          <Gift size={20} className="text-white" />
        </div>
        <div>
          <p className="text-lg font-extrabold text-white">Bereit für deine nächste Zertifizierung?</p>
          <p className="text-sm text-white/70">
            IT-Zertifizierungen, Labs, KI Coach und mehr – alles auf einer Plattform.
          </p>
        </div>
      </div>

      <Link
        href="/register"
        className="flex flex-none items-center justify-center gap-1.5 rounded-lg bg-white px-6 py-3 text-sm font-bold text-primary-dark hover:bg-white/90"
      >
        Jetzt loslegen <ArrowRight size={15} />
      </Link>

      <div className="grid grid-cols-2 gap-4 border-t border-white/15 pt-4 text-center sm:grid-cols-5 md:border-t-0 md:border-l md:pl-6 md:pt-0">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-sm font-extrabold text-white">{s.value}</p>
            <p className="text-[11px] text-white/70">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
