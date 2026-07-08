import React from "react";
import { Briefcase, Clock, Wallet, CheckCircle2, Globe, Plane, ShieldCheck } from "lucide-react";

const JOBS = [
  "Kitchen Assistant",
  "Waiter",
  "Room Attendant",
  "Warehouse Helper",
  "Creperie",
  "Bartender"
];

const WpAlbania = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-blue-100">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <header className="relative bg-linear-to-br from-[#f0f9ff] via-white to-[#e0f2fe] rounded-[2.5rem] shadow-sm border border-blue-100 p-10 text-center overflow-hidden">
          {/* Decorative Premium Glow Elements */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl"></div>

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-800 italic">
            Albania{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-slate-800">
              Work Visa
            </span>
          </h1>
          <p className="mt-4 text-slate-500 text-lg font-medium tracking-wide uppercase "> 
            Labor & General Worker Opportunities
          </p> 
        </header>

        {/* MAIN BODY LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* AVAILABLE POSITIONS */}
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-xs border border-slate-200/80 p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Briefcase size={16} className="text-blue-500" /> Available Positions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {JOBS.map((job, index) => (
                <div
                  key={index}
                  className="group flex items-center p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-xs transition-all duration-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-4 group-hover:scale-125 transition-transform"></div>
                  <span className="font-semibold text-slate-600">{job}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SIDE DETAILS */}
          <aside className="space-y-6">
            {/* Salary Package */}
            <section className="bg-slate-800 text-white rounded-3xl shadow-md p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-2 text-blue-300 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} /> Salary Package
              </div>
              <p className="text-3xl font-light italic">480 – 500 € / Month</p>
              <div className="mt-6 space-y-3 text-sm text-slate-300 border-t border-slate-700/80 pt-5">
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-400" /> Food & Accommodation
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-400" /> 8 Hrs + OT | 6 Days
                </p>
              </div>
            </section>

            {/* Processing Timeline */}
            <section className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                    Processing Time
                  </h4>
                  <p className="text-slate-800 font-bold text-base">2-4 Months</p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* SERVICE CHARGE BREAKDOWN */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="bg-slate-50/50 px-10 py-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Service Charge Breakdown
              </h2>
              <p className="text-slate-400 text-xs mt-1 uppercase tracking-[0.2em] font-bold">
                India / Africa Applicants
              </p>
            </div>
            <div className="px-4 py-1.5 bg-white rounded-full border border-slate-200 text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
              <ShieldCheck size={12} className="text-blue-500" /> Verified Process
            </div>
          </div>

          <div className="p-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-slate-50 rounded-xl">
                <Globe size={20} className="text-slate-400" />
              </div>
              <span className="font-bold text-slate-800 uppercase text-xs tracking-wider">
                Territory Breakdown
              </span>
            </div>

            <div className="space-y-6 max-w-3xl">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500 text-sm font-medium">1st Payment (With Docs)</span>
                <span className="text-lg font-bold text-slate-800">
                  2,000 <span className="text-[10px] text-slate-400 font-bold">QAR</span>
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500 text-sm font-medium">Final Payment (After Visa)</span>
                <span className="text-lg font-bold text-slate-800">
                  8,000 <span className="text-[10px] text-slate-400 font-bold">QAR</span>
                </span>
              </div>

              {/* Total Card */}
              <div className="mt-8 p-6 bg-blue-50/30 rounded-2xl border-2 border-dashed border-blue-100">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    Total Payable
                  </span>
                  <span className="text-3xl font-black text-slate-800 tracking-tight">
                    10,000 <span className="text-sm font-bold text-blue-500">QAR</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center py-8">
          <div className="flex justify-center items-center gap-4 text-slate-300 mb-4">
            <Plane size={16} />
            <div className="h-px w-12 bg-slate-200"></div>
            <ShieldCheck size={16} />
          </div>
          <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase">
            © 2026 Albania Employment Program
          </p>
        </footer>
      </div>
    </div>
  );
};

export default WpAlbania;