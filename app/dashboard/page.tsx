import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";
import RecentActivity from "@/components/RecentActivity";
import DailyPlan from "@/components/DailyPlan";
import AICoach from "@/components/AICoach";
import ProgressPanel from "@/components/ProgressPanel";
import Community from "@/components/Community";
import { Users, BookOpen, FlaskConical, CheckCircle2, Star } from "lucide-react";
import { getVendorIcon } from "@/lib/vendorIcons";

const certs = [
  { title: "AZ-900", subtitle: "Microsoft Azure Fundamentals", questions: 563, level: "Beginner", vendor: "Microsoft" },
  { title: "AWS Cloud", subtitle: "Practitioner", questions: 416, level: "Beginner", vendor: "AWS" },
  { title: "Security+", subtitle: "CompTIA", questions: 601, level: "Intermediate", vendor: "CompTIA" },
  { title: "Linux Essentials", subtitle: "Linux Professional Institute", questions: 261, level: "Beginner", vendor: "Linux" },
];

const stats = [
  { icon: Users, label: "Active Learners", value: "100K+" },
  { icon: BookOpen, label: "Practice Questions", value: "25,000+" },
  { icon: FlaskConical, label: "Hands-on Labs", value: "1,500+" },
  { icon: CheckCircle2, label: "Pass Rate", value: "98%" },
  { icon: Star, label: "User Rating", value: "4.8/5" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="grid grid-cols-1 gap-6 p-4 md:p-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
              <p className="mb-2 text-sm text-slate-500">Welcome back, Arman! 👋</p>
              <h1 className="text-xl font-extrabold leading-snug text-slate-900 md:text-2xl">
                Let&apos;s get you certified.
                <br />
                <span className="text-primary">Your future is waiting.</span>
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Practice, learn and master in-demand skills with AI-powered guidance.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white">
                  Continue Learning
                </button>
                <button className="rounded-lg border border-border px-5 py-2.5 text-sm font-bold text-slate-700">
                  Explore Paths
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-5">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <s.icon size={16} className="text-primary" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{s.value}</p>
                      <p className="text-[10px] text-slate-400">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="mb-1 flex items-center justify-between">
                <h2 className="font-bold text-slate-900">Continue Learning</h2>
                <span className="text-xs font-semibold text-primary">View My Paths</span>
              </div>
              <p className="mb-4 text-sm text-slate-500">AZ-900: Microsoft Azure Fundamentals</p>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div className="h-2 w-2/3 rounded-full bg-primary" />
              </div>
              <p className="mt-2 text-xs text-slate-400">65% Complete</p>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-slate-900">Popular Certifications</h2>
                <span className="text-xs font-semibold text-primary">View All</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {certs.map((c) => (
                  <div key={c.title} className="rounded-xl border border-border bg-white p-5">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50">
                      {getVendorIcon(c.vendor)}
                    </div>
                    <h3 className="font-bold text-slate-900">{c.title}</h3>
                    <p className="text-sm text-slate-500">{c.subtitle}</p>
                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="text-slate-400">{c.questions} Questions</span>
                      <span className="rounded-full bg-primary-light px-2 py-1 font-semibold text-primary">{c.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ProgressPanel />
          </div>

          <div className="space-y-6">
            <DailyPlan />
            <AICoach />
            <Leaderboard />
            <Community />
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  );
}
