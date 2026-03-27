import React from "react";
import { Briefcase, Clock, Wallet, CheckCircle2, Globe, MapPin, Plane, ShieldCheck } from "lucide-react";

const JOBS = [
  "Cleaner", "Dish Washer", "Kitchen Helper", "Waiter",
  "Barista", "Housekeeping", "Chef", "Construction Worker",
  "Warehouse Worker", "General Labor"
];

const WpGreece = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfd] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-pink-100">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="relative bg-linear-to-br from-[#fdf2f8] to-[#fce4ec] rounded-[2.5rem] shadow-sm border border-pink-100 p-10 text-center overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/40 rounded-full blur-3xl"></div>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-800 italic">
            Greece <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-slate-800">Work Visa</span>
          </h1>
          <p className="mt-4 text-slate-500 text-lg font-medium tracking-wide">Professional Recruitment & Documentation</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Positions */}
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Briefcase size={16} className="text-pink-400" /> Available Positions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {JOBS.map((job, index) => (
                <div key={index} className="group flex items-center p-4 rounded-xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-pink-200 transition-all duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mr-4"></div>
                  <span className="font-semibold text-slate-600">{job}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Right: Sidebar Info */}
          <aside className="space-y-6">
            <section className="bg-slate-700 text-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center gap-2 text-pink-200 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} /> Salary Package
              </div>
              <p className="text-3xl font-light italic">800 – 1200 €</p>
              <div className="mt-6 space-y-3 text-sm text-slate-300 border-t border-slate-600 pt-5">
                <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-pink-400" /> Food & Accommodation</p>
                <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-pink-400" /> 8 Hrs + OT | 6 Days</p>
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3">
                 <div className="bg-pink-50 p-2 rounded-lg text-pink-500"><Clock size={18} /></div>
                 <div>
                    <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Processing Time</h4>
                    <p className="text-slate-800 font-medium text-sm">6-8 Months</p>
                 </div>
              </div>
            </section>
          </aside>
        </div>

        {/* SERVICE CHARGE - IMPROVED CLEAN UI */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50/50 px-10 py-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Service Charge Breakdown</h2>
              <p className="text-slate-400 text-xs mt-1 uppercase tracking-[0.2em] font-bold">Includes Air Ticket & Documentation</p>
            </div>
            <div className="flex gap-2">
              <div className="px-4 py-1.5 bg-white rounded-full border border-slate-200 text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
                <ShieldCheck size={12} className="text-pink-400" /> Verified Process
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            {/* Qatar Payment Plan */}
            <div className="p-10 bg-white group">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-pink-50 transition-colors">
                  <Globe size={20} className="text-slate-400 group-hover:text-pink-500" />
                </div>
                <span className="font-bold text-slate-800 tracking-wider uppercase text-xs">Qatar Applicants</span>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500 text-sm font-medium">1st Payment (With Docs)</span>
                  <span className="text-lg font-bold text-slate-800">2,500 <span className="text-[10px] text-slate-400">QAR</span></span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500 text-sm font-medium">2nd Payment (After Permit)</span>
                  <span className="text-lg font-bold text-slate-800">5,000 <span className="text-[10px] text-slate-400">QAR</span></span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500 text-sm font-medium">3rd Payment (After Visa)</span>
                  <span className="text-lg font-bold text-slate-800">22,500 <span className="text-[10px] text-slate-400">QAR</span></span>
                </div>
                
                <div className="mt-8 p-6 bg-pink-50/30 rounded-2xl border-2 border-dashed border-pink-100">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">Total Payable</span>
                    <span className="text-3xl font-black text-slate-800">30,000 <span className="text-sm font-bold text-pink-400">QAR</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bangladesh Payment Plan */}
            <div className="p-10 bg-white group">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-pink-50 transition-colors">
                  <MapPin size={20} className="text-slate-400 group-hover:text-pink-500" />
                </div>
                <span className="font-bold text-slate-800 tracking-wider uppercase text-xs">Bangladesh Applicants</span>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500 text-sm font-medium">1st Payment (With Docs)</span>
                  <span className="text-lg font-bold text-slate-800">150,000 <span className="text-[10px] text-slate-400">BDT</span></span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500 text-sm font-medium">2nd Payment (After Permit)</span>
                  <span className="text-lg font-bold text-slate-800">200,000 <span className="text-[10px] text-slate-400">BDT</span></span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500 text-sm font-medium">3rd Payment (After Visa)</span>
                  <span className="text-lg font-bold text-slate-800">800,000 <span className="text-[10px] text-slate-400">BDT</span></span>
                </div>

                <div className="mt-8 p-6 bg-pink-50/30 rounded-2xl border-2 border-dashed border-pink-100">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">Total Payable</span>
                    <span className="text-3xl font-black text-slate-800">1,150,000 <span className="text-sm font-bold text-pink-400">BDT</span></span>
                  </div>
                </div>
              </div>
            </div>
                <p className="p-6 font-bold text-sm text-center">Bangladeshi,Pakistani: 30k  | Nepali, Indian, Srilankan: 15k </p>
          </div>
        </section>

        <footer className="text-center py-8">
          <div className="flex justify-center items-center gap-4 text-slate-300 mb-4">
            <Plane size={16} />
            <div className="h-px w-12 bg-slate-100"></div>
            <ShieldCheck size={16} />
          </div>
          <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase">© 2026 Greek Career Transitions</p>
        </footer>
      </div>
    </div>
  );
};

export default WpGreece;