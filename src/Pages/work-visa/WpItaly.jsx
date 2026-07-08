import React from "react";
import { Briefcase, Clock, Wallet, CheckCircle2, Globe, Plane, ShieldCheck } from "lucide-react";

const JOBS = [
  "Forklift driver - truck loading",
  "Agricultural workers",
  "Waiters/Waitress",
  "Cleaners",
  "Factory workers",
  "Light duty drivers"
];

const WpItaly = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-blue-100">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="relative bg-linear-to-br from-[#f0f7ff] via-white to-[#e0f2fe] rounded-[2.5rem] shadow-xs border border-blue-100 p-10 text-center overflow-hidden flex flex-col items-center">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/60 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100/40 rounded-full blur-3xl"></div>
          
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-800 italic relative z-10">
            Italy <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600">Work Visa</span>
          </h1>
          <p className="mt-4 text-slate-500 text-lg font-medium tracking-wide relative z-10">Professional Recruitment & Documentation</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Positions */}
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-xs border border-slate-200/60 p-8">
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
                  <span className="font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">{job}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Right: Sidebar Info */}
          <aside className="space-y-6">
            <section className="bg-linear-to-br from-blue-700 to-indigo-950 text-white rounded-3xl shadow-sm p-8 relative overflow-hidden">
              <div className="flex items-center gap-2 text-blue-200 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} /> Salary Package
              </div>
              <p className="text-3xl font-light italic tracking-tight">1100 – 1500 <span className="text-xl not-italic font-medium text-blue-200">€</span></p>
              <div className="mt-6 space-y-3 text-sm text-blue-100 border-t border-blue-600/60 pt-5">
                <p className="flex items-center gap-2.5"><CheckCircle2 size={14} className="text-blue-300" /> Food & Accommodation</p>
                <p className="flex items-center gap-2.5"><CheckCircle2 size={14} className="text-blue-300" /> 8 Hrs + OT | 6 Days</p>
              </div>
            </section>

            <section className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Processing Time</h4>
                  <p className="text-slate-800 font-semibold text-base mt-0.5">6 Months</p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* SERVICE CHARGE */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="bg-linear-to-r from-blue-50/60 to-sky-50/60 px-10 py-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Service Charge Breakdown</h2>
              <p className="text-slate-500 text-xs mt-1 uppercase tracking-[0.2em] font-bold">Includes Air Ticket & Documentation</p>
            </div>
            <div className="flex gap-2">
              <div className="px-4 py-1.5 bg-white rounded-full border border-slate-200 text-[10px] font-bold text-slate-700 uppercase flex items-center gap-2 shadow-2xs">
                <ShieldCheck size={12} className="text-blue-500" /> Verified Support
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 divide-slate-100">
            {/* Qatar Payment Plan */}
            <div className="p-10 bg-white group">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-600">
                  <Globe size={20} />
                </div>
                <span className="font-bold text-slate-800 tracking-wider uppercase text-xs">Qatar Applicants</span>
              </div>
              
              <div className="space-y-4 max-w-2xl text-sm text-slate-600">
                <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                  <span className="font-medium">1st Payment (With Docs)</span>
                  <span className="text-lg font-bold text-slate-800">2,000 <span className="text-xs text-slate-400 font-medium">QAR</span></span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                  <span className="font-medium">2nd Payment (After Permit)</span>
                  <span className="text-lg font-bold text-slate-800">5,000 <span className="text-xs text-slate-400 font-medium">QAR</span></span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="font-medium">3rd Payment (After Visa)</span>
                  <span className="text-lg font-bold text-slate-800">23,000 <span className="text-xs text-slate-400 font-medium">QAR</span></span>
                </div>
                
                <div className="mt-8 pt-6 border-t border-blue-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Total Investment</span>
                  <span className="text-2xl font-black text-slate-800">30,000 <span className="text-sm font-bold text-blue-700">QAR</span></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center py-8">
          <div className="flex justify-center items-center gap-4 text-slate-300 mb-4">
            <Plane size={16} />
            <div className="h-px w-12 bg-slate-200"></div>
            <ShieldCheck size={16} />
          </div>
          <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase">© 2026 Italian Career Transitions</p>
        </footer>
      </div>
    </div>
  );
};

export default WpItaly; 