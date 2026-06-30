import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Cloud, ShieldCheck, Terminal, Server } from "lucide-react";

const allCerts = [
  { title: "AZ-900", subtitle: "Microsoft Azure Fundamentals", questions: 563, level: "Beginner", icon: Cloud },
  { title: "AZ-104", subtitle: "Microsoft Azure Administrator", questions: 811, level: "Intermediate", icon: Cloud },
  { title: "AZ-305", subtitle: "Azure Solutions Architect", questions: 1021, level: "Advanced", icon: Cloud },
  { title: "AWS Cloud", subtitle: "Practitioner", questions: 416, level: "Beginner", icon: Cloud },
  { title: "Security+", subtitle: "CompTIA", questions: 601, level: "Intermediate", icon: ShieldCheck },
  { title: "Linux Essentials", subtitle: "Linux Professional Institute", questions: 261, level: "Beginner", icon: Terminal },
  { title: "RHCSA", subtitle: "Red Hat System Admin", questions: 381, level: "Advanced", icon: Server },
  { title: "CCNA 200-301", subtitle: "Cisco Certified Network Associate", questions: 598, level: "Intermediate", icon: Server },
];

export default function CertificationsPage() {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="bg-slate-50 p-4 md:p-8">
          <h1 className="mb-1 text-2xl font-bold text-navy">Certifications</h1>
          <p className="mb-6 text-sm text-slate-500">
            Master IT certifications and advance your career.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allCerts.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-navy/10">
                    <Icon size={18} className="text-navy" />
                  </div>
                  <h3 className="font-bold text-navy">{c.title}</h3>
                  <p className="text-sm text-slate-500">{c.subtitle}</p>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{c.questions} Questions</span>
                    <span className="rounded-full bg-gold/10 px-2 py-1 font-semibold text-gold">{c.level}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
