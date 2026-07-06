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
    <div className="min-h-screen bg-[#fff8fb] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-[#8A1538]/20">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="relative bg-linear-to-br from-[#fff1f6] via-white to-[#f9dce8] rounded-[2.5rem] shadow-sm border border-[#8A1538]/10 p-10 text-center overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#8A1538]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#8A1538]/10 rounded-full blur-3xl"></div>

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-800 italic">
            Portugal{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-[#8A1538] to-slate-800">
              Work Visa
            </span>
          </h1>

          <p className="mt-4 text-slate-500 text-lg font-medium tracking-wide">
            Qatar to Portugal • Agriculture Sector • Full-Time Opportunity
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-[#8A1538]/10 p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Briefcase size={16} className="text-[#8A1538]" />
              Current Opening
            </h2>

            <div className="rounded-2xl border border-[#8A1538]/10 bg-[#8A1538]/5 p-8 text-center space-y-4">
              <p className="text-lg font-semibold text-slate-700 leading-relaxed">
                Agriculture (Non-Seasonal), Forest Wood Cutter, and Construction
                Workers
              </p>

              <span className="inline-block mt-2 text-[#8A1538] text-xs font-bold uppercase tracking-widest">
                Qatar Client Program
              </span>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="bg-[#8A1538] text-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center gap-2 text-white/80 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} />
                Salary Package
              </div>

              <p className="text-3xl font-light italic text-white">
                900 – 1100 €
              </p>

              <div className="mt-6 space-y-3 text-sm text-white/80 border-t border-white/20 pt-5">
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-white" />
                  Company Food & Housing
                </p>

                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-white" />
                  8 Hrs + OT | 5-6 Days
                </p>
              </div>
            </section>

            <section className="bg-white border border-[#8A1538]/10 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-[#8A1538]/5 p-2 rounded-lg text-[#8A1538]">
                  <Clock size={18} />
                </div>

                <div>
                  <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                    Processing Time
                  </h4>
                  <p className="text-slate-800 font-medium text-sm">
                    6 - 8 Months
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        <section className="bg-white rounded-[2.5rem] border border-[#8A1538]/10 shadow-sm overflow-hidden">
          <div className="bg-[#8A1538]/5 px-10 py-8 border-b border-[#8A1538]/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Service Charge Options
              </h2>

              <p className="text-slate-400 text-xs mt-1 uppercase tracking-[0.2em] font-bold">
                Valid Only For Qatar Residents
              </p>
            </div>

            <div className="px-4 py-1.5 bg-white rounded-full border border-[#8A1538]/10 text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
              <Milestone size={12} className="text-[#8A1538]" />
              Milestone Based
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#8A1538]/10">
            {SERVICE_CHARGES.map(({ country, process, amount, icon: Icon }) => (
              <div key={`${country}-${process}`} className="p-10 bg-white group">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-[#8A1538]/5 rounded-xl group-hover:bg-[#8A1538]/10 transition-colors">
                    <Icon size={20} className="text-[#8A1538]" />
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

                  <div className="mt-8 p-6 bg-[#8A1538]/5 rounded-2xl border-2 border-dashed border-[#8A1538]/20">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-[#8A1538] uppercase tracking-widest">
                        Total Payable
                      </span>

                      <span className="text-3xl font-black text-slate-800">
                        {amount}{" "}
                        <span className="text-sm font-bold text-[#8A1538]">
                          QAR
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="md:col-span-2 p-6 bg-[#8A1538]/5 text-center">
              <p className="font-bold text-sm text-slate-700">
                Price valid only for Qatar residents. Ticket and embassy fees are
                not included.
              </p>
            </div>
          </div>
        </section>

        <footer className="text-center py-8">
          <div className="flex justify-center items-center gap-4 text-slate-300 mb-4">
            <Plane size={16} />
            <div className="h-px w-12 bg-slate-100"></div>
            <ShieldCheck size={16} />
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
