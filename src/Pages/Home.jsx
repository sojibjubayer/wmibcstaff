import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Globe,
  GraduationCap,
  Building2,
  ArrowRight,
  Sparkles,
  Activity,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const cards = [
    {
      title: "Work Visa",
      description: "Explore job opportunities and work permits for skilled professionals.",
      route: "/work-visa",
      icon: Briefcase,
      accent: "from-blue-500 to-indigo-600",
      bg: "bg-blue-500/10",
      text: "text-blue-600",
      ring: "focus:ring-blue-200",
    },
    {
      title: "Visit Visa",
      description: "Hassle-free tourist and short-term travel visas for your next trip.",
      route: "/visit-visa",
      icon: Globe,
      accent: "from-sky-400 to-blue-500",
      bg: "bg-sky-400/10",
      text: "text-sky-600",
      ring: "focus:ring-sky-200",
    },
    {
      title: "Student Visa",
      description: "Admission guidance and visa support for top global universities.",
      route: "/student-visa",
      icon: GraduationCap,
      accent: "from-violet-500 to-purple-600",
      bg: "bg-violet-500/10",
      text: "text-violet-600",
      ring: "focus:ring-violet-200",
    },
    {
      title: "Business Visa",
      description: "Business travel visa support for meetings, conferences, and company visits.",
      route: "/business-visa",
      icon: Building2,
      accent: "from-emerald-400 to-teal-600",
      bg: "bg-emerald-400/10",
      text: "text-emerald-600",
      ring: "focus:ring-emerald-200",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-700 selection:bg-blue-200 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl space-y-8 sm:space-y-10 lg:space-y-12">
        <header className="group relative overflow-hidden rounded-4xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:p-8 md:rounded-5xl md:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-linear-to-br from-blue-100 to-sky-100/40 blur-3xl transition-transform duration-700 group-hover:scale-110" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-indigo-50/70 blur-2xl" />

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
            <section className="max-w-2xl space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                WMIBC Management Core
              </div>

              <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Visa{" "}
                <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text font-light italic text-transparent">
                  Portal 
                </span>
              </h1>

              <p className="mx-auto max-w-xl text-sm font-medium leading-relaxed text-slate-500 sm:text-base md:mx-0 lg:text-lg">
                Manage visa services, track applications, and access work,
                visit, student, and business visa options from one simple dashboard.
              </p>
            </section>

            <section className="w-full max-w-85 shrink-0 md:w-auto">
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 text-white shadow-xl transition-all duration-500 group-hover:scale-[1.02] md:p-6 md:group-hover:-rotate-1">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Activity size={16} className="text-sky-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Global Status
                    </span>
                  </div>

                  <span className="rounded-lg border border-blue-500/30 bg-blue-500/20 px-2 py-0.5 text-xs font-bold text-blue-400">
                    Live
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-medium text-slate-400">
                      Active Operations
                    </span>
                    <span className="font-bold tracking-wider text-white">
                      2026 Intake
                    </span>
                  </div>

                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-4/5 rounded-full bg-linear-to-r from-blue-500 to-indigo-500" />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-1">
                    <Sparkles size={12} className="text-indigo-400" />
                    Secure Encryption
                  </span>
                  <span>v4.1.2</span>
                </div>
              </div>
            </section>
          </div>
        </header>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.title}
                type="button"
                onClick={() => navigate(card.route)}
                className={`group relative flex min-h-65 flex-col justify-between overflow-hidden rounded-4xl border border-slate-200/70 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 active:scale-98 focus:outline-none focus:ring-4 ${card.ring} sm:p-7 lg:p-8`}
              >
                <div
                  className={`absolute left-0 right-0 top-0 h-1.5 bg-linear-to-r ${card.accent}`}
                />

                <div>
                  <div
                    className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl ${card.bg} ${card.text} shadow-sm ring-1 ring-transparent transition-all duration-300 group-hover:scale-110 group-hover:ring-slate-200`}
                  >
                    <Icon size={24} />
                  </div>

                  <h2 className="mb-3 text-xl font-bold tracking-tight text-slate-800 transition-colors duration-200 group-hover:text-slate-950 sm:text-2xl">
                    {card.title}
                  </h2>

                  <p className="text-sm font-semibold leading-relaxed text-slate-500 transition-colors duration-200 group-hover:text-slate-600 md:min-h-20">
                    {card.description}
                  </p>
                </div>

                <div className={`mt-8 flex items-center text-xs font-black uppercase tracking-widest ${card.text}`}>
                  Explore Services
                  <ArrowRight
                    size={16}
                    className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
                  />
                </div>
              </button>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default Home;