import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";
import RecentActivity from "@/components/RecentActivity";
import { Flame, Cloud, ShieldCheck, Terminal } from "lucide-react";

const certs = [
  { title: "AZ-900", subtitle: "Microsoft Azure Fundamentals", questions: 563, level: "Beginner", icon: Cloud },
  { title: "AWS Cloud", subtitle: "Practitioner", questions: 416, level: "Beginner", icon: Cloud },
  { title: "Security+", subtitle: "CompTIA", questions: 601, level: "Intermediate", icon: ShieldCheck },
  { title: "Linux Essentials", subtitle: "Linux Professional Institute", questions: 261, level: "Beginner", icon: Terminal },
];

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="grid grid-cols-1 gap-6 bg-slate-50 p-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl bg-gradient-to-l from-navy to-navy-light p-8 text-white">
              <p className="mb-2 text-sm text-slate-300">Welcome back, Arman! 👋</p>
              <h1 className="text-2xl font-extrabold leading-snug">
                Let&apos;s get you certified.
                <br />
                <span className="text-gold">Your future is waiting.</span>
              </h1>
              <div className="mt-6 flex gap-3">
                <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-navy">
                  Continue Learning
                </button>
                <button className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-bold text-white">
                  Explore Paths
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="mb-1 font-bold text-navy">Continue Learning</h2>
              <p className="mb-4 text-sm text-slate-500">AZ-900: Microsoft Azure Fundamentals</p>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div className="h-2 w-2/3 rounded-full bg-navy" />
              </div>
              <p className="mt-2 text-xs text-slate-400">65% Complete</p>
            </div>

            <div>
              <h2 className="mb-4 font-bold text-navy">Popular Certifications</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {certs.map((c) => {
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
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 font-bold text-navy">Daily Plan</h2>
              <p className="text-xs text-slate-400">Study Time</p>
              <p className="mb-3 text-sm font-semibold text-navy">32m / 60m</p>
              <p className="text-xs text-slate-400">Today&apos;s Goal</p>
              <p className="mb-3 text-sm font-semibold text-navy">12 / 20 questions</p>
              <div className="flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2 text-sm text-orange-600">
                <Flame size={16} />
                Current Streak: 14 days
              </div>
            </div>

            <div className="rounded-2xl bg-navy p-6 text-white">
              <p className="mb-1 text-sm font-bold text-gold">AI Coach</p>
              <p className="mb-4 text-sm text-slate-300">
                Hi Arman! Focus on these weak areas:
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {["Azure Storage", "Network Security", "NSG"].map((t) => (
                  <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs">{t}</span>
                ))}
              </div>
              <button className="w-full rounded-lg bg-gold py-2 text-sm font-bold text-navy">
                Start Smart Practice
              </button>
            </div>

            <Leaderboard />
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  );
}
