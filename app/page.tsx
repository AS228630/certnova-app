import { Check } from "lucide-react";
import { FaAws, FaMicrosoft, FaLinux, FaGoogle, FaRedhat } from "react-icons/fa";
import { SiComptia } from "react-icons/si";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between border-b border-slate-100 px-6 py-4 md:px-12">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-blue-600" />
          <span className="text-lg font-bold text-slate-900">CertCoach</span>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
          <span>Courses</span>
          <span>Certifications</span>
          <span>Labs</span>
          <span>Practice Tests</span>
          <span>For Teams</span>
          <span>Resources</span>
        </nav>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-slate-500 md:inline">DE</span>
          <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800">
            Login
          </button>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:px-12 lg:grid-cols-2">
        <div>
          <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            <Check size={14} />
            563+ verified questions
          </div>
          <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            Real Questions.
            <br />
            Trusted Answers.
            <br />
            <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
              Global Success.
            </span>
          </h1>
          <p className="mt-4 max-w-md text-slate-500">
            Top IT certifications. Real exam experience. Learn smarter, score higher.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white">
              Start Free Now
            </button>
            <button className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-bold text-slate-800">
              Explore Certifications
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center py-10">
          <div className="h-64 w-64 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 md:h-80 md:w-80" />
          <div className="absolute left-0 top-4 rounded-xl bg-white p-3 shadow-lg">
            <FaAws size={22} className="text-[#FF9900]" />
          </div>
          <div className="absolute right-4 top-0 rounded-xl bg-white p-3 shadow-lg">
            <FaGoogle size={22} className="text-[#4285F4]" />
          </div>
          <div className="absolute left-10 top-1/2 rounded-xl bg-white p-3 shadow-lg">
            <FaMicrosoft size={22} className="text-[#00A4EF]" />
          </div>
          <div className="absolute right-0 top-1/2 rounded-xl bg-white p-3 shadow-lg">
            <FaLinux size={22} className="text-[#FCC624]" />
          </div>
          <div className="absolute bottom-6 left-8 rounded-xl bg-white p-3 shadow-lg">
            <FaRedhat size={22} className="text-[#EE0000]" />
          </div>
          <div className="absolute bottom-0 right-2 rounded-xl bg-white px-4 py-3 shadow-lg">
            <p className="text-xl font-extrabold text-slate-900">90%</p>
            <p className="text-xs text-slate-400">Mastery System</p>
            <div className="mt-1 h-1 w-16 rounded-full bg-green-400" />
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-10 px-6 text-slate-400 md:px-12">
          <span className="text-sm font-semibold">Microsoft</span>
          <span className="text-sm font-semibold">aws</span>
          <span className="text-sm font-semibold">Google Cloud</span>
          <span className="text-sm font-semibold">CompTIA</span>
          <span className="text-sm font-semibold">Linux</span>
          <span className="text-sm font-semibold">RedHat</span>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Popular Certifications</h2>
          <span className="text-sm font-semibold text-blue-600">View All</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "AZ-900", vendor: "Microsoft Azure Fundamentals", q: 563, level: "Beginner", Icon: FaMicrosoft, color: "#00A4EF" },
            { title: "AWS Cloud", vendor: "Practitioner", q: 416, level: "Beginner", Icon: FaAws, color: "#FF9900" },
            { title: "Linux Essentials", vendor: "LPI-010", q: 261, level: "Beginner", Icon: FaLinux, color: "#FCC624" },
            { title: "Security+", vendor: "CompTIA", q: 601, level: "Intermediate", Icon: SiComptia, color: "#C8202F" },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50">
                <c.Icon size={18} style={{ color: c.color }} />
              </div>
              <h3 className="font-bold text-slate-900">{c.title}</h3>
              <p className="text-sm text-slate-500">{c.vendor}</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-slate-400">{c.q} Questions</span>
                <span className="font-semibold text-green-600">{c.level}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-12">
        <div className="rounded-2xl bg-slate-900 p-8 md:p-10">
          <h2 className="text-xl font-bold text-white">Our Mastery System</h2>
          <p className="mt-1 text-sm text-slate-400">
            Our proven 4-step system helps you master any certification
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: 1, title: "Learn", desc: "Study with structured learning paths" },
              { n: 2, title: "Practice", desc: "Hands-on labs and real questions" },
              { n: 3, title: "Analyze", desc: "AI-powered performance insights" },
              { n: 4, title: "Master", desc: "Achieve 90%+ and pass with confidence" },
            ].map((s) => (
              <div key={s.n}>
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {s.n}
                </div>
                <h3 className="font-bold text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
