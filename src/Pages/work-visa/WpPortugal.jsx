import React from "react";
import {
  Briefcase,
  Clock,
  Wallet,
  CheckCircle2,
  Globe,
  MapPin,
  Plane,
  ShieldCheck,
  Milestone,
} from "lucide-react";

const SERVICE_CHARGES = [
  {
    country: "Bangladeshi Applicants",
    process: "Normal Process",
    amount: "34,000",
    icon: Globe,
  },
  {
    country: "Bangladeshi Applicants",
    process: "VIP Process",
    amount: "40,000",
    icon: ShieldCheck,
  },
  {
    country: "Indian Applicants",
    process: "Normal Process",
    amount: "20,000",
    icon: MapPin,
  },
  {
    country: "Pakistani Applicants",
    process: "Normal Process",
    amount: "28,000",
    icon: MapPin,
  },
];

const WpPortugal = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-blue-100">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="relative bg-linear-to-br from-[#f0fdf4] via-[#f0f9ff] to-[#e0f2fe] rounded-[2.5rem] shadow-sm border border-blue-100 p-10 text-center overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl"></div>

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-800 italic">
            Portugal{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-slate-800">
              Work Visa
            </span>
          </h1>

          <p className="mt-4 text-slate-500 text-lg font-medium tracking-wide">
            Qatar to Portugal • Agriculture Sector • Full-Time Opportunity
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Openings */}
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-xs border border-slate-200/80 p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Briefcase size={16} className="text-blue-500" />
              Current Opening
            </h2>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/30 p-8 text-center space-y-4 group hover:border-blue-200 transition-all duration-300">
              <p className="text-lg font-semibold text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
                Agriculture (Non-Seasonal), Forest Wood Cutter, and Construction
                Workers
              </p>

              <span className="inline-block mt-2 text-blue-600 text-xs font-bold uppercase tracking-widest">
                Qatar Client Program
              </span>
            </div>
          </section>

          {/* Right: Sidebar Info */}
          <aside className="space-y-6">
            <section className="bg-slate-800 text-white rounded-3xl shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2 text-blue-300 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} />
                Salary Package
              </div>

              <p className="text-3xl font-light italic text-blue-50">
                900 – 1100 €
              </p>

              <div className="mt-6 space-y-3 text-sm text-slate-300 border-t border-slate-700/80 pt-5">
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-400" />
                  Company Food & Housing
                </p>

                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-400" />
                  8 Hrs + OT | 5-6 Days
                </p>
              </div>
            </section>

            <section className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                  <Clock size={18} />
                </div>

                <div>
                  <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                    Processing Time
                  </h4>
                  <p className="text-slate-800 font-semibold text-sm">
                    6 - 8 Months
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* SERVICE CHARGES */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="bg-slate-50/50 px-10 py-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Service Charge Options
              </h2>

              <p className="text-slate-400 text-xs mt-1 uppercase tracking-[0.2em] font-bold">
                Valid Only For Qatar Residents
              </p>
            </div>

            <div className="px-4 py-1.5 bg-white rounded-full border border-slate-200 text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
              <Milestone size={12} className="text-blue-500" />
              Milestone Based
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {SERVICE_CHARGES.map(({ country, process, amount, icon: Icon }) => (
              <div key={`${country}-${process}`} className="p-10 bg-white group">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                    <Icon size={20} className="text-slate-400 group-hover:text-blue-600" />
                  </div>

                  <span className="font-bold text-slate-800 tracking-wider uppercase text-xs">
                    {country}
                  </span>
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 text-sm font-medium">
                      Process Type
                    </span>

                    <span className="text-lg font-bold text-slate-800">
                      {process}
                    </span>
                  </div>

                  <div className="mt-8 p-6 bg-blue-50/20 rounded-2xl border-2 border-dashed border-blue-100 group-hover:border-blue-200 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                        Total Payable
                      </span>

                      <span className="text-3xl font-black text-slate-800">
                        {amount}{" "}
                        <span className="text-sm font-bold text-blue-500">
                          QAR
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="md:col-span-2 p-6 bg-slate-50/40 border-t border-slate-100 text-center">
              <p className="font-semibold text-sm text-slate-500">
                Price valid only for Qatar residents. Ticket and embassy fees are
                not included.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8">
          <div className="flex justify-center items-center gap-4 text-slate-200 mb-4">
            <Plane size={16} className="text-slate-300" />
            <div className="h-px w-12 bg-slate-200"></div>
            <ShieldCheck size={16} className="text-slate-300" />
          </div>

          <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase">
            © 2026 Portugal Agricultural Programs
          </p>
        </footer>
      </div>
    </div>
  );
};

export default WpPortugal;