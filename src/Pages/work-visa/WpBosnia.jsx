import React from "react";
import { Briefcase, Clock, Wallet, CheckCircle2, Globe, MapPin, Plane, ShieldCheck } from "lucide-react";

const JOBS = ["General Worker (Any Nationality)"];

const WpBosnia = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-blue-100">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <header className="relative bg-linear-to-br from-[#f0f9ff] via-white to-[#e0f2fe] rounded-[2.5rem] shadow-sm border border-blue-100 p-10 text-center overflow-hidden">
          {/* Decorative Premium Glow Elements */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl"></div>

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-800 italic">
            Bosnia{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-slate-800">
              Work Visa
            </span>
          </h1>
          <p className="mt-4 text-slate-500 text-lg font-medium tracking-wide uppercase">
            General Worker Opportunities
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: POSITIONS */}
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-xs border border-slate-200/80 p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Briefcase size={16} className="text-blue-500" /> Available Roles
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {JOBS.map((job, index) => (
                <div 
                  key={index} 
                  className="group flex items-center p-6 rounded-xl border border-blue-100 bg-blue-50/20 hover:bg-blue-50/50 hover:border-blue-300 transition-all duration-300"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-400 mr-4 ring-4 ring-blue-50/30 group-hover:bg-blue-600 transition-all"></div>
                  <span className="font-semibold text-slate-700 text-lg group-hover:text-slate-900 transition-colors">{job}</span>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT: SIDEBAR INFO */}
          <aside className="space-y-6">
            {/* Salary Package */}
            <section className="bg-slate-800 text-white rounded-3xl shadow-lg p-8 relative overflow-hidden flex flex-col justify-center min-h-55">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 text-blue-300 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} /> Salary Package
              </div>
              <p className="text-3xl font-black text-blue-50">450 – 600 €</p>
              
              <div className="mt-6 space-y-3 text-xs text-slate-300 border-t border-slate-700/80 pt-5 leading-relaxed">
                <p className="flex items-center gap-2 text-slate-300 font-medium">
                  <CheckCircle2 size={12} className="text-blue-400 shrink-0" /> Food & Accommodation Provided
                </p>
                <p className="flex items-center gap-2 text-slate-300 font-medium">
                  <CheckCircle2 size={12} className="text-blue-400 shrink-0" /> 8 Hrs + OT | 6 Days Per Week
                </p>
              </div>
            </section>

            {/* Processing Timeline */}
            <section className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
              <div className="flex items-center gap-4">
                 <div className="bg-blue-50 p-3 rounded-xl text-blue-600 shrink-0"><Clock size={20} /></div>
                 <div>
                    <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mb-0.5">Processing Time</h4>
                    <p className="text-slate-800 font-bold text-base">6 Months</p>
                 </div>
              </div>
            </section>
          </aside>
        </div>

        {/* SERVICE CHARGE BREAKDOWN */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="bg-slate-50/50 px-10 py-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Service Charge Breakdown</h2>
              <p className="text-slate-400 text-xs mt-1 uppercase tracking-[0.2em] font-bold">Excluding Air Ticket</p>
            </div>
            <div className="px-4 py-1.5 bg-white rounded-full border border-slate-200/80 text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
              <ShieldCheck size={12} className="text-blue-500" /> Verified Intake
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            {/* QATAR PAYMENT PLAN */}
            <div className="p-10 bg-white group">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                  <Globe size={20} className="text-slate-400 group-hover:text-blue-500" />
                </div>
                <span className="font-bold text-slate-800 tracking-wider uppercase text-xs">Qatar Applicants</span>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-100">
                  <span className="text-slate-500 text-sm font-medium">1st Payment (Docs)</span>
                  <span className="text-lg font-bold text-slate-800">1,500 <span className="text-[10px] text-slate-400 font-bold uppercase">QAR</span></span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-100">
                  <span className="text-slate-500 text-sm font-medium">2nd Payment (Permit)</span>
                  <span className="text-lg font-bold text-slate-800">3,000 <span className="text-[10px] text-slate-400 font-bold uppercase">QAR</span></span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-100">
                  <span className="text-slate-500 text-sm font-medium">3rd Payment (Visa)</span>
                  <span className="text-lg font-bold text-slate-800">22,500 <span className="text-[10px] text-slate-400 font-bold uppercase">QAR</span></span>
                </div>
                
                <div className="mt-8 p-6 bg-blue-50/30 rounded-2xl border-2 border-dashed border-blue-100/70">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Total Payable</span>
                    <span className="text-3xl font-black text-slate-800">27,000 <span className="text-sm font-bold text-blue-500">QAR</span></span>
                  </div>
                </div>
                
                {/* Alternative Regions Sub-panel */}
                <div className="mt-4 p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/60 flex items-center justify-center text-xs">
                  <p className="font-semibold text-slate-500 text-center">
                    Nepali / Indian / Sri Lankan:{" "}
                    <span className="ml-1.5 inline-block bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                      12k (1.5 + 5 + rest)
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* BANGLADESH PAYMENT PLAN */}
            <div className="p-10 bg-white group">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                  <MapPin size={20} className="text-slate-400 group-hover:text-blue-500" />
                </div>
                <span className="font-bold text-slate-800 tracking-wider uppercase text-xs">Bangladesh Applicants</span>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-100">
                  <span className="text-slate-500 text-sm font-medium">1st Payment (Docs)</span>
                  <span className="text-lg font-bold text-slate-800">100,000 <span className="text-[10px] text-slate-400 font-bold uppercase">BDT</span></span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-100">
                  <span className="text-slate-500 text-sm font-medium">2nd Payment (Permit)</span>
                  <span className="text-lg font-bold text-slate-800">300,000 <span className="text-[10px] text-slate-400 font-bold uppercase">BDT</span></span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-100">
                  <span className="text-slate-500 text-sm font-medium">3rd Payment (Visa)</span>
                  <span className="text-lg font-bold text-slate-800">700,000 <span className="text-[10px] text-slate-400 font-bold uppercase">BDT</span></span>
                </div>

                <div className="mt-8 p-6 bg-blue-50/30 rounded-2xl border-2 border-dashed border-blue-100/70">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Total Payable</span>
                    <span className="text-3xl font-black text-slate-800">1,100,000 <span className="text-sm font-bold text-blue-500">BDT</span></span>
                  </div>
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
          <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase">© 2026 Bosnia Employment Division</p>
        </footer>
      </div>
    </div>
  );
};

export default WpBosnia;