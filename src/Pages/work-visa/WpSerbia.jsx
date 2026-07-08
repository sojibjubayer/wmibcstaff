import React from "react";
import { Briefcase, Clock, Wallet, CheckCircle2, Globe, MapPin, Plane, ShieldCheck } from "lucide-react";

const JOBS = ["Construction Worker", "Cleaner", "Warehouse Worker", "Tile Mason"];

const WpSerbia = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-blue-100">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <header className="relative bg-linear-to-br from-[#f0f9ff] via-white to-[#e0f2fe] rounded-[2.5rem] shadow-sm border border-blue-100 p-10 text-center overflow-hidden">
          
          {/* Decorative Premium Glow Elements */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl"></div>

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-800 italic">
            Serbia{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-slate-800">
              Work Visa
            </span>
          </h1>
          <p className="mt-4 text-slate-500 text-lg font-medium tracking-wide">
            Construction, Logistics & Maintenance
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT AREA: ROLES */}
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-xs border border-slate-200/80 p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Briefcase size={16} className="text-blue-500" /> Available Roles
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {JOBS.map((job, index) => (
                <div 
                  key={index} 
                  className="group flex items-center p-5 rounded-2xl border border-blue-100 bg-blue-50/30 font-semibold text-slate-700 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-4 shrink-0 ring-4 ring-blue-100 group-hover:scale-110 transition-transform"></span>
                  <span className="text-slate-700 text-sm group-hover:text-slate-900 transition-colors">{job}</span>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT SIDEBAR: FINANCIAL & TRACKING SUMMARY */}
          <aside className="space-y-6">
            {/* SALARY PACKAGE CARD */}
            <section className="bg-slate-800 text-white rounded-3xl shadow-lg p-8 relative overflow-hidden flex flex-col justify-center min-h-55">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 text-blue-300 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} /> Salary Package
              </div>
              <p className="text-4xl font-black text-blue-50">550 – 650 €</p>
              
              <div className="mt-6 space-y-3 text-xs text-slate-300 border-t border-slate-700/80 pt-5 leading-relaxed">
                <p className="flex items-center gap-2 text-slate-300 font-medium">
                  <CheckCircle2 size={12} className="text-blue-400 shrink-0" /> Food & Accommodation Provided
                </p>
                <p className="flex items-center gap-2 text-slate-300 font-medium">
                  <CheckCircle2 size={12} className="text-blue-400 shrink-0" /> 8 Hrs + OT | 5-6 Days per Week
                </p>
              </div>
            </section>

            {/* QUICK TIMELINE ASSURANCE CARD */}
            <section className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
              <div className="flex items-center gap-3">
                 <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600"><Clock size={18} /></div>
                 <div>
                    <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mb-0.5">Processing Time</h4>
                    <p className="text-slate-800 font-semibold text-sm">5-6 Months Total</p>
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
              <p className="text-slate-400 text-xs mt-1 uppercase tracking-[0.2em] font-bold">Serbia Recruitment Division</p>
            </div>
            <div className="px-4 py-1.5 bg-white rounded-full border border-slate-200/80 text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
              <ShieldCheck size={12} className="text-blue-500" /> Secure Documentation
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            {/* Qatar Payment Plan */}
            <div className="p-10 bg-white group">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                  <Globe size={20} className="text-slate-400 group-hover:text-blue-500" />
                </div>
                <span className="font-bold text-slate-800 tracking-wider uppercase text-xs">Qatar Applicants</span>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between items-center py-4 border-b border-dashed border-slate-100">
                  <div>
                    <p className="text-slate-800 font-semibold text-sm">1st Payment</p>
                    <p className="text-[11px] text-slate-400">Documentation Processing</p>
                  </div>
                  <span className="text-lg font-bold text-slate-800">3,000 <span className="text-[10px] text-slate-400 font-bold uppercase">QAR</span></span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-dashed border-slate-100">
                  <div>
                    <p className="text-slate-800 font-semibold text-sm">2nd Payment</p>
                    <p className="text-[11px] text-slate-400">Work Permit Issuance</p>
                  </div>
                  <span className="text-lg font-bold text-slate-800">7,000 <span className="text-[10px] text-slate-400 font-bold uppercase">QAR</span></span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <div>
                    <p className="text-slate-800 font-semibold text-sm">3rd Payment</p>
                    <p className="text-[11px] text-slate-400">After Visa Approval</p>
                  </div>
                  <span className="text-lg font-bold text-slate-800">18,000 <span className="text-[10px] text-slate-400 font-bold uppercase">QAR</span></span>
                </div>
                
                <div className="mt-8 p-6 bg-blue-50/30 rounded-3xl border-2 border-dashed border-blue-100/70">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Total Payable</span>
                    <span className="text-3xl font-black text-slate-800">28,000 <span className="text-sm font-bold text-blue-500">QAR</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bangladesh Payment Plan */}
            <div className="p-10 bg-white group">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                  <MapPin size={20} className="text-slate-400 group-hover:text-blue-500" />
                </div>
                <span className="font-bold text-slate-800 tracking-wider uppercase text-xs">Bangladesh Applicants</span>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between items-center py-4 border-b border-dashed border-slate-100">
                  <div>
                    <p className="text-slate-800 font-semibold text-sm">1st Payment</p>
                    <p className="text-[11px] text-slate-400">Documentation Processing</p>
                  </div>
                  <span className="text-lg font-bold text-slate-800">100,000 <span className="text-[10px] text-slate-400 font-bold uppercase">BDT</span></span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-dashed border-slate-100">
                  <div>
                    <p className="text-slate-800 font-semibold text-sm">2nd Payment</p>
                    <p className="text-[11px] text-slate-400">Work Permit Issuance</p>
                  </div>
                  <span className="text-lg font-bold text-slate-800">300,000 <span className="text-[10px] text-slate-400 font-bold uppercase">BDT</span></span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <div>
                    <p className="text-slate-800 font-semibold text-sm">3rd Payment</p>
                    <p className="text-[11px] text-slate-400">After Visa Approval</p>
                  </div>
                  <span className="text-lg font-bold text-slate-800">600,000 <span className="text-[10px] text-slate-400 font-bold uppercase">BDT</span></span>
                </div>

                <div className="mt-8 p-6 bg-blue-50/30 rounded-3xl border-2 border-dashed border-blue-100/70">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Total Payable</span>
                    <span className="text-3xl font-black text-slate-800">1,000,000 <span className="text-sm font-bold text-blue-500">BDT</span></span>
                  </div>
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
            <ShieldCheck size={16} className="text-slate-300" />
          </div>
          <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase">© 2026 Serbian Career Transitions</p>
        </footer>
      </div>
    </div>
  );
};

export default WpSerbia;