import React from "react";
import { 
  Briefcase, 
  Clock, 
  Wallet, 
  CheckCircle2, 
  ShieldCheck, 
  Milestone,
  Plane,
  Building2,
  CalendarDays
} from "lucide-react";

const JOBS = ["House Keeping", "Butcher", "General Worker"];

const PAYMENTS = [
  { label: "1st Payment (With Documents)", amount: "1,000" },
  { label: "2nd Payment (After Work Permit)", amount: "2,000" },
  { label: "Final Payment (After Visa)", amount: "9,000" },
];

const WpCroatia = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-blue-100">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <header className="relative bg-linear-to-br from-[#f0f9ff] via-white to-[#e0f2fe] rounded-[2.5rem] shadow-sm border border-blue-100 p-10 text-center overflow-hidden">
          
          {/* Decorative Premium Glow Elements */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl"></div>

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-800 italic">
            Croatia{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-slate-800">
              Work Visa
            </span>
          </h1>
          <p className="mt-4 text-slate-500 text-lg font-medium tracking-wide">
            Hospitality & Service Sector Opportunities
          </p>
        </header>

        {/* POSITIONS & SALARY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* AVAILABLE ROLES SECTION */}
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-xs border border-slate-200/80 p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Briefcase size={16} className="text-blue-500" />
              Available Roles
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {JOBS.map((job, index) => (
                <div
                  key={index}
                  className="flex items-center p-5 rounded-2xl border border-blue-100 bg-blue-50/30 font-semibold text-slate-700 group hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-3 shrink-0 ring-4 ring-blue-100 group-hover:scale-110 transition-transform"></span>
                  <span className="group-hover:text-slate-900 transition-colors">{job}</span>
                </div>
              ))}
            </div>
          </section>

          {/* MONTHLY PACKAGE SIDEBAR */}
          <aside className="space-y-6">
            <section className="bg-slate-800 text-white rounded-3xl shadow-lg p-8 relative overflow-hidden flex flex-col justify-center h-full min-h-45">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 text-blue-300 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} />
                Monthly Package
              </div>
              
              <p className="text-3xl sm:text-4xl font-light italic text-blue-50 whitespace-nowrap">800 – 1200 €</p>
              
              <div className="mt-4 space-y-2 text-xs text-slate-400 border-t border-slate-700/80 pt-4 leading-relaxed">
                <p className="flex items-center gap-2 text-slate-300 font-medium">
                  <CheckCircle2 size={12} className="text-blue-400 shrink-0" />
                  Food & Accommodation Included
                </p>
              </div>
            </section>
          </aside>
        </div>

        {/* LOGISTICS TIMELINE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-xs flex items-start gap-4">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600 shrink-0">
              <Building2 size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-1">
                TRC Status
              </h3>
              <p className="text-slate-800 font-semibold text-base">
                3 Months
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-xs flex items-start gap-4">
            <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600 shrink-0">
              <CalendarDays size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-1">
                Processing Time
              </h3>
              <p className="text-slate-800 font-semibold text-base italic">
                4 Months Only
              </p>
            </div>
          </div>

        </div>

        {/* PRICING & MILESTONE SCHEDULE */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-xs overflow-hidden">
          
          <div className="bg-slate-50/50 px-10 py-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Service Charge
              </h2>
              <p className="text-slate-400 text-xs mt-1 uppercase tracking-[0.2em] font-bold">
                Transparent Payment Structure
              </p>
            </div>

            <div className="px-6 py-4 bg-white rounded-2xl border border-slate-200/80 text-center md:text-right">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-0.5">
                Total Service Fee
              </span>
              <span className="text-3xl font-black text-slate-800">
                12,000
                <span className="text-blue-500 text-sm font-bold ml-1">QAR</span>
              </span>
            </div>
          </div>
          
          <div className="p-10 bg-white group">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                <Milestone size={20} className="text-slate-400 group-hover:text-blue-600" />
              </div>
              <span className="font-bold text-slate-800 uppercase text-xs tracking-wider">
                Milestone Fee Structure
              </span>
            </div>

            <div className="space-y-5">
              {PAYMENTS.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-dashed border-slate-100 pb-4 last:border-b-0 last:pb-0"
                >
                  <span className="text-slate-600 text-sm font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    {item.label}
                  </span>

                  <div className="text-left sm:text-right">
                    <span className="font-bold text-lg text-slate-800">
                      {item.amount}
                    </span>
                    <span className="text-slate-400 text-xs font-bold ml-1 uppercase">QAR</span>
                  </div>
                </div>
              ))}
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
          <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase">
            © Croatia Employment Gate • 2026 Intake
          </p>
        </footer>

      </div>
    </div>
  );
};

export default WpCroatia;