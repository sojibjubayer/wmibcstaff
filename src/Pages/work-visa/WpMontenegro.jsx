import React from "react";
import { Briefcase, Clock, Wallet, CheckCircle2, ShieldCheck, CalendarRange, Info } from "lucide-react";

const JOBS = [
  "Front Office & Sales Manager", "Housekeeping / Maid", "Receptionist",
  "Night Receptionist", "Maintenance / Handyman", "Driver",
  "Kitchen Assistant", "Assistant Cook", "Bartender",
  "Assistant Bartender", "Restaurant Host", "General Laborer",
  "Electrician", "Tiles Mason", "Gypsum"
];

const PAYMENTS = [
  { label: "1st Payment", subLabel: "With Documents", amount: "2,000" },
  { label: "2nd Payment", subLabel: "After Work Permit", amount: "3,500" },
  { label: "3rd Payment", subLabel: "After Visa Approval", amount: "16,000" },
];

const WpMontenegro = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-blue-100">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <header className="relative bg-linear-to-br from-[#f0f9ff] via-white to-[#e0f2fe] rounded-[2.5rem] shadow-sm border border-blue-100 p-10 text-center overflow-hidden">
          {/* Decorative Premium Glow Elements */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl"></div>

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-800 italic">
            Montenegro{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-slate-800">
              Work Visa 
            </span> 
          </h1>
          <p className="mt-4 text-slate-500 text-lg font-medium tracking-wide uppercase ">
            Seasonal / Non-Seasonal Hospitality Program
          </p>
        </header> 

        {/* HIRING POSITIONS */}
        <section className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-slate-100 pb-6 gap-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                <Briefcase size={22} className="text-blue-500" /> Available Vacancies
              </h2>
              <p className="text-slate-400 text-xs mt-1">Hospitality, Service & Skilled Trade Positions</p>
            </div>
            <span className="text-blue-600 text-xs font-bold tracking-widest uppercase bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
              Join the Service Sector
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {JOBS.map((job, index) => (
              <div
                key={index}
                className="group flex items-center justify-between p-4 rounded-xl border border-blue-100 bg-blue-50/20 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300"
              >
                <span className="text-slate-700 text-sm font-semibold group-hover:text-slate-900 transition-colors">
                  {job}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-300 ring-4 ring-blue-50/30 group-hover:bg-blue-500 group-hover:scale-110 transition-all"></div>
              </div>
            ))}
          </div>
        </section>

        {/* SALARY & DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Salary Card */}
          <section className="lg:col-span-1 bg-slate-800 text-white rounded-3xl shadow-lg p-8 relative overflow-hidden flex flex-col justify-center min-h-55">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2 text-blue-300 mb-2 font-bold text-xs uppercase tracking-widest">
              <Wallet size={16} /> Monthly Compensation
            </div>
            <p className="text-4xl font-black text-blue-50">1000 €</p>
            
            <div className="mt-6 space-y-3 text-xs text-slate-300 border-t border-slate-700/80 pt-5 leading-relaxed">
              <p className="flex items-center gap-2 text-slate-300 font-medium">
                <CheckCircle2 size={12} className="text-blue-400 shrink-0" /> Full Food Package Provided
              </p>
              <p className="flex items-center gap-2 text-slate-300 font-medium">
                <CheckCircle2 size={12} className="text-blue-400 shrink-0" /> Company Accommodations Included
              </p>
            </div>
          </section>

          {/* Logistics Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex items-center gap-5">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 shrink-0"><Clock size={24} /></div>
              <div>
                <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mb-0.5">Duty Schedule</h4>
                <p className="text-slate-800 font-bold text-base">9 Hours + Overtime</p>
                <p className="text-blue-600 text-xs font-semibold mt-0.5">6 Days Per Week</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex items-center gap-5">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 shrink-0"><CalendarRange size={24} /></div>
              <div>
                <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mb-0.5">Processing Timeline</h4>
                <p className="text-slate-800 font-bold text-base">TRC: 3 Months</p>
                <p className="text-blue-600 text-xs font-semibold mt-0.5">Total Duration: 6 Months</p>
              </div>
            </div>
          </div>
        </div>

        {/* PAYMENT BREAKDOWN */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="bg-slate-50/50 px-10 py-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Service Charge</h2>
              <p className="text-slate-400 text-xs mt-1 uppercase tracking-[0.2em] font-bold">Total Placement Management Fees</p>
            </div>
            <div className="px-4 py-1.5 bg-white rounded-full border border-slate-200/80 text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
              <ShieldCheck size={12} className="text-blue-500" /> Secure Milestones
            </div>
          </div>
          
          <div className="p-10 bg-white">
            <div className="space-y-1">
              {PAYMENTS.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex justify-between items-center py-4 border-b border-dashed border-slate-100 last:border-none group transition-colors"
                >
                  <div>
                    <p className="text-slate-800 font-semibold text-sm group-hover:text-blue-600 transition-colors">{item.label}</p>
                    <p className="text-[11px] text-slate-400">{item.subLabel}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-slate-800">{item.amount}</span>
                    <span className="ml-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">QAR</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50/30 rounded-3xl border-2 border-dashed border-blue-100/70">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Total Cost Assurance</span>
                <span className="text-3xl font-black text-slate-800">21,500 <span className="text-sm font-bold text-blue-500">QAR</span></span>
              </div>
            </div>

            {/* Regional Adjustments Panel */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5 text-blue-500 uppercase tracking-wide font-bold text-[10px] mr-2">
                <Info size={14} /> Alternative Schemes:
              </div>
              <div className="px-3 py-1 bg-white border border-slate-200 rounded-full">
                Bangladeshi: <span className="text-slate-800 font-bold">21.5k</span>
              </div>
              <div className="px-3 py-1 bg-white border border-slate-200 rounded-full">
                Pakistani: <span className="text-slate-800 font-bold">12k</span>
              </div>
              <div className="px-3 py-1 bg-white border border-slate-200 rounded-full">
                Indian / Sri Lankan: <span className="text-slate-800 font-bold">10k</span>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center py-6">
          <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase">
            Montenegro • Non-Seasonal / Seasonal Employment • 2026
          </p>
        </footer>
      </div>
    </div>
  );
};

export default WpMontenegro;