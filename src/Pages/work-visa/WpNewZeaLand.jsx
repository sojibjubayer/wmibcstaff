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
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-blue-100">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="relative bg-linear-to-br from-[#f0f7ff] via-white to-[#e0f2fe] rounded-[2.5rem] shadow-xs border border-blue-100 p-8 sm:p-12 text-center overflow-hidden flex flex-col items-center">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/60 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100/40 rounded-full blur-3xl"></div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-slate-800 italic relative z-10">
            New Zealand{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600">
              Work Visa
            </span>
          </h1>

          <p className="mt-4 text-slate-500 text-base sm:text-lg font-medium tracking-wide relative z-10">
            RSE & AEWV Job Processing Support
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 relative z-10">
            <span className="px-4 py-2 rounded-full bg-white/80 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-2xs">
              New Zealand Demand Letter 2026
            </span>
            <span className="px-4 py-2 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold uppercase tracking-wider text-sky-700 shadow-2xs">
              RSE & AEWV Categories
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Positions */}
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-xs border border-slate-200/60 p-6 sm:p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Briefcase size={16} className="text-blue-500" /> Available Positions
            </h2> 

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {JOBS.map((job, index) => (
                <div
                  key={index}
                  className="group flex items-center p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-2xs transition-all duration-200"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-4 group-hover:scale-125 transition-transform"></div>
                  <span className="font-semibold text-slate-700 text-sm leading-snug group-hover:text-slate-900 transition-colors">
                    {job}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            <section className="bg-linear-to-br from-blue-700 to-indigo-950 text-white rounded-3xl shadow-sm p-8 relative overflow-hidden">
              <div className="flex items-center gap-2 text-blue-200 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} /> Salary Structure
              </div>

              <p className="text-3xl font-light italic tracking-tight">Up to 42 <span className="text-lg not-italic font-medium text-blue-200">NZD / Hour</span></p>

              <div className="mt-6 space-y-3 text-sm text-blue-100 border-t border-blue-600/60 pt-5">
                <p className="flex items-center gap-2.5">
                  <CheckCircle2 size={14} className="text-blue-300" /> RSE & AEWV Opportunities
                </p>
                <p className="flex items-center gap-2.5">
                  <CheckCircle2 size={14} className="text-blue-300" /> Agriculture, Seafood & Forestry
                </p>
              </div>
            </section>

            <section className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                    Processing Time
                  </h4>
                  <p className="text-slate-800 font-semibold text-base mt-0.5">2–6 Weeks</p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* Service Charge */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="bg-linear-to-r from-blue-50/60 to-sky-50/60 px-6 sm:px-10 py-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Service Charge Breakdown
              </h2>
              <p className="text-slate-500 text-xs mt-1 uppercase tracking-[0.2em] font-bold">
                Payment Plan for Qatar Applicants
              </p>
            </div>

            <div className="px-4 py-1.5 bg-white rounded-full border border-slate-200 text-[10px] font-bold text-slate-700 uppercase flex items-center gap-2 shadow-2xs">
              <ShieldCheck size={12} className="text-blue-500" /> Verified Support
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-600">
                <Globe size={20} />
              </div>
              <span className="font-bold text-slate-800 uppercase text-xs tracking-wider">
                Qatar Applicants
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Main Package */}
              <div className="p-6 rounded-2xl border border-blue-100 bg-blue-50/20 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-blue-800 mb-4 uppercase tracking-wider border-b border-blue-100 pb-2">
                    Main Package
                  </h3>

                  <div className="space-y-4 text-sm text-slate-600">
                    <div className="flex justify-between gap-4 items-center">
                      <span>1st Payment / File Opening</span>
                      <span className="font-semibold text-slate-800">3,000 QAR</span>
                    </div>

                    <div className="flex justify-between gap-4 items-center">
                      <span>Embassy Fee Processing</span>
                      <span className="font-semibold text-slate-800">1,540 NZD</span>
                    </div>

                    <div className="flex justify-between gap-4 items-center">
                      <span>After Visa Approval Milestone</span>
                      <span className="font-semibold text-slate-800">42,000 QAR</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-blue-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-700 uppercase">Total Investment</span>
                  <span className="text-2xl font-black text-slate-800">
                    45,000 <span className="text-sm font-bold text-blue-700">QAR</span>
                  </span>
                </div>
              </div>

              {/* Seasonal Visa */}
              <div className="p-6 rounded-2xl border border-sky-100 bg-sky-50/20 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-sky-800 mb-4 uppercase tracking-wider border-b border-sky-100 pb-2">
                    Seasonal Visa
                  </h3>

                  <div className="space-y-4 text-sm text-slate-600">
                    <div className="flex justify-between gap-4 items-center">
                      <span>Validity Term</span>
                      <span className="font-semibold text-slate-800">7–11 Month</span>
                    </div>

                    <div className="flex justify-between gap-4 items-center">
                      <span>Consular Category</span>
                      <span className="font-semibold text-slate-800">Seasonal Work</span>
                    </div>

                    <div className="flex justify-between gap-4 items-center">
                      <span>Processing Logistics</span>
                      <span className="font-semibold text-slate-800">Standard Pathway</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-sky-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-sky-700 uppercase">Total Investment</span>
                  <span className="text-2xl font-black text-slate-800">
                    35,000 <span className="text-sm font-bold text-sky-700">QAR</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8">
          <div className="flex justify-center items-center gap-4 text-slate-300 mb-4">
            <Plane size={16} />
            <div className="h-px w-12 bg-slate-200"></div>
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