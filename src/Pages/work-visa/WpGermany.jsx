import React from "react";
import {
  Briefcase,
  Clock,
  Wallet,
  CheckCircle2,
  Plane,
  ShieldCheck,
  Milestone,
  FileCheck2,
  AlertCircle,
  Video,
  Users,
  Home,
  Globe2,
  BadgeEuro,
} from "lucide-react";

const VACANCIES = [
  {
    title: "Bangladeshi Male",
    vacancies: "3 Vacancies",
    fee: "€9,000",
  },
  {
    title: "Nepali Male",
    vacancies: "Available",
    fee: "€7,000",
  },
  {
    title: "Bangladeshi Female",
    vacancies: "Available",
    fee: "€8,000",
  },
  {
    title: "Nepali Female",
    vacancies: "Available",
    fee: "€7,000",
  },
];

const PAYMENTS = [
  {
    label: "After Selection by Employer",
    amount: "€600",
  },
  {
    label: "After German Pre-Approval",
    amount: "€1,800",
  },
  {
    label: "After Visa Issuance",
    amount: "Remaining Balance",
  },
];

const REQUIREMENTS = [
  "A video from the current workplace is mandatory.",
  "Final interview will be conducted by the German employer.",
  "Candidates should have good basic English communication skills.",
  "Candidates must be presentable, confident, and interview-ready.",
];

const IMPORTANT_INFO = [
  "Germany pre-approval means the visa process is almost complete.",
  "After pre-approval, the candidate needs to attend the embassy interview.",
  "Employer interviews are scheduled for next week.",
  "Suitable new or existing candidate profiles should be submitted as soon as possible.",
  "Quality candidates are highly preferred.",
];

const WpGermany = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-12 font-sans text-slate-700 selection:bg-blue-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* HEADER */}
        <header className="relative overflow-hidden rounded-[2.5rem] border border-blue-100 bg-linear-to-br from-[#eff6ff] via-white to-[#dbeafe] p-8 text-center shadow-sm sm:p-10">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative z-10">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-700 shadow-sm">
              <Briefcase size={14} />
              Germany Hospitality Sector
            </p>

            <h1 className="text-4xl font-light tracking-tight text-slate-800 sm:text-6xl">
              Cleaner{" "}
              <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-slate-800 bg-clip-text font-black text-transparent">
                Vacancies
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-500 sm:text-lg">
              Excellent opportunity for Cleaner positions in the hospitality
              sector in Germany. Employer interviews are scheduled for next week.
            </p>
          </div>
        </header>

        {/* TOP INFO GRID */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* MAIN DETAILS */}
          <section className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xs lg:col-span-2">
            <h2 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
              <Users size={16} className="text-blue-500" />
              Available Vacancies & Processing Fees
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {VACANCIES.map((item, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-blue-100 bg-blue-50/30 p-5 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50/70"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-black text-slate-800">{item.title}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                        {item.vacancies}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white px-4 py-2 text-right shadow-sm ring-1 ring-blue-100">
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                        Fee
                      </p>
                      <p className="text-lg font-black text-slate-800">
                        {item.fee}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p className="font-semibold leading-relaxed">
                Applications are accepted only from candidates currently residing
                in the Middle East and Nepal. Please do not submit candidates
                from Bangladesh at this time, as there are currently no embassy
                appointment slots available.
              </p>
            </div>
          </section>

          {/* SALARY CARD */}
          <aside className="space-y-6">
            <section className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-lg">
              <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-600/20 blur-2xl" />

              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-300">
                <Wallet size={16} />
                Monthly Salary
              </div>

              <p className="text-5xl font-light italic text-blue-50">
                €1,800
              </p>

              <div className="mt-6 space-y-3 border-t border-slate-700/80 pt-5 text-sm text-slate-300">
                <p className="flex items-center gap-2">
                  <Home size={14} className="shrink-0 text-blue-400" />
                  Accommodation provided by company
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="shrink-0 text-blue-400" />
                  Hospitality sector cleaner role
                </p>
              </div>
            </section>

            <section className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Interview
                  </h4>
                  <p className="text-sm font-semibold text-slate-800">
                    Next Week
                  </p>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
                  <FileCheck2 size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    German Employer
                  </h4>
                  <p className="text-sm font-semibold text-slate-800">
                    Final Interview
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* REQUIREMENTS */}
        <section className="rounded-[2.5rem] border border-slate-200/80 bg-white p-8 shadow-xs sm:p-10">
          <h2 className="mb-8 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
            <Video size={16} className="text-blue-500" />
            Candidate Requirements
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {REQUIREMENTS.map((note, index) => (
              <div
                key={index}
                className="flex gap-3 rounded-2xl border border-slate-200/60 bg-slate-50/50 p-5 transition-all duration-200 hover:border-blue-100 hover:bg-white"
              >
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-blue-500"
                />
                <p className="text-sm font-medium leading-relaxed text-slate-600">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PAYMENT PLAN */}
        <section className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white shadow-xs">
          <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-8 py-8 md:flex-row sm:px-10">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                Payment Schedule
              </h2>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Step-by-step payment structure
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white px-5 py-4 text-center shadow-sm md:text-right">
              <span className="mb-0.5 block text-[10px] font-black uppercase tracking-widest text-blue-600">
                Currency
              </span>
              <span className="text-3xl font-black text-slate-800">
                Euro
                <span className="ml-1 text-sm font-bold text-blue-500">€</span>
              </span>
            </div>
          </div>

          <div className="bg-white p-8 sm:p-10">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl bg-slate-50 p-2">
                <Milestone size={20} className="text-blue-600" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Milestone Payment Structure
              </span>
            </div>

            <div className="space-y-5">
              {PAYMENTS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-2 border-b border-dashed border-slate-100 pb-4 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                    {item.label}
                  </span>

                  <div className="text-left sm:text-right">
                    <span className="text-lg font-black text-slate-800">
                      {item.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRE-APPROVAL INFO */}
        <section className="rounded-[2.5rem] border border-blue-100 bg-linear-to-br from-blue-50 via-white to-indigo-50 p-8 shadow-xs sm:p-10">
          <h2 className="mb-8 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
            <BadgeEuro size={16} className="text-blue-500" />
            Important Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {IMPORTANT_INFO.map((note, index) => (
              <div
                key={index}
                className="flex gap-3 rounded-2xl border border-blue-100 bg-white/80 p-5 shadow-sm"
              >
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-blue-500"
                />
                <p className="text-sm font-semibold leading-relaxed text-slate-600">
                  {note}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
            <Globe2 size={18} className="mt-0.5 shrink-0 text-indigo-600" />
            <p className="font-medium leading-relaxed">
              Eligible candidates must currently be residing in the Middle East
              or Nepal. Profiles should be submitted quickly because employer
              interviews are scheduled soon.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-4 text-slate-200">
            <Plane size={16} className="text-slate-300" />
            <div className="h-px w-12 bg-slate-200" />
            <ShieldCheck size={16} className="text-slate-300" />
          </div>

          <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400">
            Germany Hospitality Employment • Cleaner Vacancies
          </p>
        </footer>
      </div>
    </div>
  );
};

export default WpGermany; 