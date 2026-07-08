import React from "react";
import { Briefcase, Clock, Wallet, CheckCircle2, Globe, Plane, ShieldCheck } from "lucide-react";

const JOBS = [
  "Mechanical",
  "Welder",
  "Construction",
  "Driver (Heavy)",
];

const WpSlovakia = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-blue-100">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <header className="relative bg-linear-to-br from-[#f0f9ff] via-white to-[#e0f2fe] rounded-[2.5rem] shadow-sm border border-blue-100 p-10 text-center overflow-hidden">
          
          {/* Decorative Premium Glow Elements */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl"></div>

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-800 italic">
            Slovakia{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-slate-800">
              Work Visa
            </span>
          </h1>

          <p className="mt-4 text-slate-500 text-lg font-medium tracking-wide">
            Professional Recruitment & Documentation
          </p>
        </header>

        {/* MAIN LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT AREA: ROLES */}
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-xs border border-slate-200/80 p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Briefcase size={16} className="text-blue-500" />
              Available Positions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {JOBS.map((job, index) => (
                <div
                  key={index}
                  className="group flex items-center p-5 rounded-2xl border border-blue-100 bg-blue-50/30 font-semibold text-slate-700 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-4 shrink-0 ring-4 ring-blue-100 group-hover:scale-110 transition-transform"></span>

                  <span className="text-slate-700 text-sm group-hover:text-slate-900 transition-colors">
                    {job}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT SIDEBAR: FINANCIAL & TRACKING SUMMARY */}
          <aside className="space-y-6">
            
            {/* PACKAGE CARD */}
            <section className="bg-slate-800 text-white rounded-3xl shadow-lg p-8 relative overflow-hidden flex flex-col justify-center min-h-55">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 text-blue-300 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} />
                Full Process Cost
              </div>

              <p className="text-4xl font-black text-blue-50">
                25,000{" "}
                <span className="text-lg font-medium text-blue-400">
                  QAR
                </span>
              </p>

              <div className="mt-6 space-y-3 text-xs text-slate-300 border-t border-slate-700/80 pt-5 leading-relaxed">
                <p className="flex items-center gap-2 text-slate-300 font-medium">
                  <CheckCircle2 size={12} className="text-blue-400 shrink-0" /> 
                  Excluding Air Ticket
                </p>

                <p className="flex items-center gap-2 text-slate-300 font-medium">
                  <CheckCircle2 size={12} className="text-blue-400 shrink-0" />
                  Excluding Embassy Fees
                </p>
              </div>
            </section>

            {/* QUICK LOGISTICS INFO CARD */}
            <section className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600 shrink-0">
                  <Clock size={18} />
                </div>

                <div>
                  <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mb-0.5">
                    Submission Note
                  </h4>
                  <p className="text-slate-700 font-medium text-xs leading-relaxed">
                    Applicants from Qatar are required to submit their application in Kuwait.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* PRICING & PAYMENT TIMELINE */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-xs overflow-hidden">
          
          <div className="bg-slate-50/50 px-10 py-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Service Charge Breakdown
              </h2>

              <p className="text-slate-400 text-xs mt-1 uppercase tracking-[0.2em] font-bold">
                Saudi & Kuwait Applicants
              </p>
            </div>

            <div className="px-4 py-1.5 bg-white rounded-full border border-slate-200/80 text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
              <ShieldCheck size={12} className="text-blue-500" />
              Verified Process
            </div>
          </div>

          <div className="p-10 bg-white">
            <div className="space-y-1 max-w-3xl mx-auto">
              
              {/* First Payment */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 py-5 border-b border-dashed border-slate-100">
                <div>
                  <p className="text-slate-800 font-semibold text-base">
                    1st Payment
                  </p>
                  <p className="text-xs text-slate-400">
                    Initial Documentation & Intake
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-2xl font-bold text-slate-800">2,500</span>
                  <span className="text-xs font-bold text-slate-400 uppercase ml-1">QAR</span>
                </div>
              </div>

              {/* Second Payment */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 py-5 border-b border-dashed border-slate-100">
                <div>
                  <p className="text-slate-800 font-semibold text-base">
                    2nd Payment
                  </p>
                  <p className="text-xs text-slate-400">
                    Processing Stage Update
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-2xl font-bold text-slate-800">5,000</span>
                  <span className="text-xs font-bold text-slate-400 uppercase ml-1">QAR</span>
                </div>
              </div>

              {/* Remaining Payment */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 py-5">
                <div>
                  <p className="text-slate-800 font-semibold text-base">
                    Rest After Visa
                  </p>
                  <p className="text-xs text-slate-400">
                    Final Settlement Post Approval
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-2xl font-bold text-slate-800">17,500</span>
                  <span className="text-xs font-bold text-slate-400 uppercase ml-1">QAR</span>
                </div>
              </div> 

              {/* Total Summary Row */}
              <div className="mt-8 p-6 sm:p-8 bg-blue-50/30 rounded-3xl border-2 border-dashed border-blue-100/70">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    Total Payable Amount
                  </span>

                  <span className="text-3xl sm:text-4xl font-black text-slate-800">
                    25,000{" "}
                    <span className="text-sm font-bold text-blue-500 ml-0.5">
                      QAR
                    </span>
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center py-6">
          <div className="flex justify-center items-center gap-4 text-slate-200 mb-4">
            <Plane size={16} className="text-slate-300" />
            <div className="h-px w-12 bg-slate-200"></div>
            <Globe size={16} className="text-slate-300" />
          </div>

          <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase">
            © 2026 Slovakia Career Transitions
          </p>
        </footer>
        
      </div>
    </div>
  );
};

export default WpSlovakia;