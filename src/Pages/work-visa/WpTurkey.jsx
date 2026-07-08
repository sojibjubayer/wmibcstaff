import React from "react";
import { Briefcase, Clock, Wallet, CheckCircle2, Globe, Plane, ShieldCheck } from "lucide-react";

const JOBS = [
  "Waiter",
  "Waitress",
  "Cook",
  "Chef",
  "Housekeeping",
  "Barista",
  "Dish Washer",
];

const PAYMENTS = [
  { label: "1st Payment (With Documents)", amount: "2,000" },
  { label: "2nd Payment (After Work Permit)", amount: "4,000" },
  { label: "Final Payment (After Visa)", amount: "12,000" },
];

const WpTurkey = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-blue-100">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="relative bg-linear-to-br from-[#f0f7ff] via-white to-[#e0f2fe] rounded-[2.5rem] shadow-xs border border-blue-100 p-10 text-center overflow-hidden flex flex-col items-center">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/60 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100/40 rounded-full blur-3xl"></div>

          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-slate-800 italic relative z-10">
            Turkey{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600">
              Work Visa
            </span>
          </h1>
          <p className="mt-3 text-slate-500 text-base sm:text-lg font-medium tracking-wide relative z-10">
            Hospitality & Service Sector Opportunities
          </p>
        </header>

        {/* Positions & Salary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Position Section */}
          <section className="md:col-span-2 bg-white rounded-3xl shadow-xs border border-slate-200/60 p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Briefcase size={16} className="text-blue-500" /> Available Roles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {JOBS.map((job, index) => (
                <div
                  key={index}
                  className="group flex items-center p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-2xs transition-all duration-200"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-4 group-hover:scale-125 transition-transform"></div>
                  <span className="font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                    {job}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Salary Section */}
          <section className="bg-linear-to-br from-blue-700 to-indigo-950 text-white rounded-3xl shadow-sm p-8 relative overflow-hidden flex flex-col justify-center text-center">
            <h3 className="text-blue-200 text-xs uppercase tracking-widest font-bold mb-2 flex items-center justify-center gap-1.5">
              <Wallet size={14} /> Monthly Package
            </h3>
            <p className="text-2xl lg:text-3xl font-light italic tracking-tight">
              22,000 – 32,000{" "}
              <span className="text-base not-italic font-medium text-blue-200 block sm:inline">
                TRY
              </span>
            </p>
            <div className="mt-6 pt-5 border-t border-blue-600/60 text-xs text-blue-100 space-y-2">
              <p className="flex items-center justify-center gap-1.5">
                <CheckCircle2 size={12} className="text-blue-300" /> Full Food Allowance
              </p>
              <p className="flex items-center justify-center gap-1.5">
                <CheckCircle2 size={12} className="text-blue-300" /> Company Accommodation
              </p>
            </div>
          </section>
        </div>

        {/* Timeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
          <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-xs flex flex-col items-center justify-center">
            <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-blue-500" /> TRC Status
            </h3>
            <p className="text-slate-800 text-2xl font-semibold">3 Months</p>
          </div>

          <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-xs flex flex-col items-center justify-center">
            <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Clock size={14} className="text-blue-500" /> Processing Time
            </h3>
            <p className="text-slate-800 text-2xl font-semibold">4 Months Only</p>
          </div>
        </div>

        {/* Pricing Section */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="bg-linear-to-r from-blue-50/60 to-sky-50/60 px-8 py-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Service Charge Breakdown
              </h2>
              <p className="text-slate-500 text-xs mt-0.5 uppercase tracking-[0.2em] font-bold">
                Payment Schedule & Logistics
              </p>
            </div>
            <div className="px-4 py-1.5 bg-white rounded-full border border-slate-200 text-[10px] font-bold text-slate-700 uppercase flex items-center gap-2 shadow-2xs">
              <Globe size={12} className="text-blue-500" /> Qatar Logistics Plan
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-4 max-w-2xl mx-auto text-sm text-slate-600">
              {PAYMENTS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b border-slate-50 pb-3 last:border-0 last:pb-0"
                >
                  <span className="font-medium">{item.label}</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-slate-800">{item.amount}</span>
                    <span className="ml-1 text-xs text-slate-400 font-medium">QAR</span>
                  </div>
                </div>
              ))}

              <div className="mt-8 pt-6 border-t border-blue-100 flex justify-between items-center">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Total Investment
                </span>
                <span className="text-2xl font-black text-slate-800">
                  18,000 <span className="text-sm font-bold text-blue-700">QAR</span>
                </span>
              </div>
            </div>

            {/* Region Specific Documentation Notes */}
            <div className="mt-10 pt-8 border-t border-slate-100 grid gap-4 sm:grid-cols-2 text-center sm:text-left">
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Bangladesh Processing Portal
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Processing Fee: <span className="font-semibold text-slate-800">BDT 28,750</span> (All-inclusive, Cash Settlement)
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/30 border border-blue-100">
                <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">
                  Submission Requirement
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Physical submission requested. Candidates are required to visit the branch office to finalise application protocols.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-4 flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-4 text-slate-300">
            <Plane size={16} />
            <div className="h-px w-12 bg-slate-200"></div>
            <ShieldCheck size={16} />
          </div>
          <p className="text-slate-400 text-[10px] tracking-[0.3em] uppercase">
            Turkey Employment Gate • 2026 Intake
          </p>
        </footer>
      </div>
    </div>
  );
};

export default WpTurkey;