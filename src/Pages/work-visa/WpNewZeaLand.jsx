import React from "react";
import {
  Briefcase,
  Clock,
  Wallet,
  CheckCircle2,
  Globe,
  Plane,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

const JOBS = [
  "Meat Processing Worker",
  "Meat Boner & Slicer",
  "Seafood Processing Worker",
  "Calf Rearer",
  "Relief Milker",
  "Wool Handler",
  "Forestry Worker",
  "Winery Cellar Hand",
  "Mussel / Oyster Worker",
  "Fruit Farm Worker",
];

const WpNewZealand = () => {
  return (
    <div className="min-h-screen bg-[#f0fdfa] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-teal-100">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header Section */}
        <header className="relative bg-[linear-gradient(to_bottom_right,#ecfeff,#f0fdfa,#eff6ff)] rounded-[2.5rem] shadow-sm border border-teal-100 p-6 sm:p-10 text-center overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/40 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-100/50 rounded-full blur-3xl"></div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-slate-800 italic">
            New Zealand{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-[linear-gradient(to_right,#0ea5a4,#2563eb)]">
              Work Visa
            </span>
          </h1>

          <p className="mt-4 text-slate-500 text-base sm:text-lg font-medium tracking-wide">
            RSE & AEWV Job Processing Support
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 rounded-full bg-white/80 border border-teal-200 text-xs font-bold uppercase tracking-wider text-teal-700">
              New Zealand Demand Letter 2026
            </span>
            <span className="px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700">
              RSE & AEWV Categories
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Positions */}
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-teal-100 p-6 sm:p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Briefcase size={16} className="text-teal-500" /> Available Positions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {JOBS.map((job, index) => (
                <div
                  key={index}
                  className="group flex items-center p-4 rounded-xl border border-teal-100 bg-teal-50/40 hover:bg-white hover:border-teal-200 transition-all duration-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-4"></div>
                  <span className="font-semibold text-slate-700 text-sm leading-snug">
                    {job}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            <section className="bg-[linear-gradient(to_bottom_right,#0f766e,#1e3a8a)] text-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center gap-2 text-teal-100 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} /> Salary Structure
              </div>

              <p className="text-3xl font-light italic">Up to 42 NZD / Hour</p>

              <div className="mt-6 space-y-3 text-sm text-slate-200 border-t border-teal-700 pt-5">
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-teal-300" /> RSE & AEWV Opportunities
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-teal-300" /> Agriculture, Seafood & Forestry
                </p>
                <p className="flex items-center gap-2">
                  <BadgeCheck size={14} className="text-teal-300" /> With Air Ticket Package
                </p>
              </div>
            </section>

            <section className="bg-white border border-teal-100 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-teal-50 p-2 rounded-lg text-teal-600">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                    Processing Time
                  </h4>
                  <p className="text-slate-800 font-medium text-sm">2–6 Weeks</p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* Service Charge */}
        <section className="bg-white rounded-[2.5rem] border border-teal-100 shadow-sm overflow-hidden">
          <div className="bg-[linear-gradient(to_right,#ecfeff,#eff6ff)] px-6 sm:px-10 py-8 border-b border-teal-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Service Charge Breakdown
              </h2>
              <p className="text-slate-500 text-xs mt-1 uppercase tracking-[0.2em] font-bold">
                Payment Plan for Qatar Applicants
              </p>
            </div>

            <div className="px-4 py-1.5 bg-white rounded-full border border-teal-200 text-[10px] font-bold text-teal-700 uppercase flex items-center gap-2">
              <ShieldCheck size={12} className="text-blue-500" /> Verified Process
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-teal-50 rounded-xl">
                <Globe size={20} className="text-teal-500" />
              </div>
              <span className="font-bold text-slate-800 uppercase text-xs">
                Qatar Applicants
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Main Package */}
              <div className="p-6 rounded-2xl border border-teal-200 bg-teal-50/30">
                <h3 className="text-lg font-bold text-teal-700 mb-4 uppercase tracking-wider">
                  Main Package
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">1st Payment</span>
                    <span className="font-semibold text-slate-800">3,000 QAR</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Embassy Fee</span>
                    <span className="font-semibold text-slate-800">1,540 NZD</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">After Visa</span>
                    <span className="font-semibold text-slate-800">42,000 QAR</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Air Ticket</span>
                    <span className="font-semibold text-slate-800">Included</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-teal-200 flex justify-between items-center">
                  <span className="text-xs font-bold text-teal-600 uppercase">Total</span>
                  <span className="text-2xl font-black text-slate-800">
                    45,000 <span className="text-sm text-teal-600">QAR</span>
                  </span>
                </div>
              </div>

              {/* Seasonal Visa */}
              <div className="p-6 rounded-2xl border border-blue-200 bg-blue-50/30">
                <h3 className="text-lg font-bold text-blue-700 mb-4 uppercase tracking-wider">
                  Seasonal Visa
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Validity</span>
                    <span className="font-semibold text-slate-800">7–11 Month</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Charge</span>
                    <span className="font-semibold text-slate-800">35,000 QAR</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Air Ticket</span>
                    <span className="font-semibold text-slate-800">Included</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Category</span>
                    <span className="font-semibold text-slate-800">Seasonal Work</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-blue-200 flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-600 uppercase">Total</span>
                  <span className="text-2xl font-black text-slate-800">
                    35,000 <span className="text-sm text-blue-600">QAR</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        <footer className="text-center py-8">
          <div className="flex justify-center items-center gap-4 text-teal-300 mb-4">
            <Plane size={16} />
            <div className="h-px w-12 bg-teal-100"></div>
            <ShieldCheck size={16} />
          </div>
          <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase">
            © 2026 New Zealand Career Transitions
          </p>
        </footer>
      </div>
    </div>
  );
};

export default WpNewZealand;