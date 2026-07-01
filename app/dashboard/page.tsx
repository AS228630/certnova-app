import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";
import RecentActivity from "@/components/RecentActivity";
import { Flame } from "lucide-react";
import { getVendorIcon } from "@/lib/vendorIcons";

const certs = [
  { title: "AZ-900", subtitle: "Microsoft Azure Fundamentals", questions: 563, level: "Beginner", vendor: "Microsoft" },
  { title: "AWS Cloud", subtitle: "Practitioner", questions: 416, level: "Beginner", vendor: "AWS" },
  { title: "Security+", subtitle: "CompTIA", questions: 601, level: "Intermediate", vendor: "CompTIA" },
  { title: "Linux Essentials", subtitle: "Linux Professional Institute", questions: 261, level: "Beginner", vendor: "Linux" },
];

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 bg-navy">
        <Header />
        <main className="grid grid-cols-1 gap-6 bg-navy p-4 md:p-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl bg-navy-light p-6 text-white md:p-8">
              <p className="mb-2 text-sm text-slate-400">Welcome back, Arman! 👋</p>
              <h1 className="text-xl font-extrabold leading-snug md:text-2xl">
                Let&apos;s get you certified.
                <br />
                <span className="text-gold">Your future is waiting.</span>
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-navy">
                  Continue Learning
                </button>
                <button className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-bold text-white">
                  Explore Paths
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
              <h2 className="mb-1 font-bold text-white">Continue Learning</h2>
              <p className="mb-4 text-sm text-slate-400">AZ-900: Microsoft Azure Fundamentals</p>
              <div className="h-2 w-full rounded-full bg-white/10">
                <div className="h-2 w-2/3 rounded-full bg-gold" />
              </div>
              <p className="mt-2 text-xs text-slate-400">65% Complete</p>
            </div>

            <div>
              <h2 className="mb-4 font-bold text-white">Popular Certifications</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {certs.map((c) => (
                  <div key={c.title} className="rounded-xl border border-white/10 bg-navy-light p-5">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                      {getVendorIcon(c.vendor)}
                    </div>
                    <h3 className="font-bold text-white">{c.title}</h3>
                    <p className="text-sm text-slate-400">{c.subtitle}</p>
                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="text-slate-400">{c.questions} Questions</span>
                      <span className="rounded-full bg-gold/10 px-2 py-1 font-semibold text-gold">{c.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
              <h2 className="mb-4 font-bold text-white">Daily Plan</h2>
              <p className="text-xs text-slate-400">Study Time</p>
              <p className="mb-3 text-sm font-semibold text-white">32m / 60m</p>
              <p className="text-xs text-slate-400">Today&apos;s Goal</p>
              <p className="mb-3 text-sm font-semibold text-white">12 / 20 questions</p>
              <div className="flex items-center gap-2 rounded-lg bg-orange-500/10 px-3 py-2 text-sm text-orange-400">
                <Flame size={16} />
                Current Streak: 14 days
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
              <p className="mb-1 text-sm font-bold text-gold">AI Coach</p>
              <p className="mb-4 text-sm text-slate-300">
                Hi Arman! Focus on these weak areas:
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {["Azure Storage", "Network Security", "NSG"].map((t) => (
                  <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">{t}</span>
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
