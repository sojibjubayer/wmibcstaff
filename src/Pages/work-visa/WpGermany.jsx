import React from "react";
import { 
  Briefcase, 
  Clock, 
  Wallet, 
  CheckCircle2, 
  Scale, 
  Plane, 
  ShieldCheck, 
  Milestone,
  FileCheck2,
  AlertCircle
} from "lucide-react";

const JOBS = ["Food Court", "Super Market"];

const PAYMENTS = [
  { label: "1st Payment (With Documents)", amount: "1,500" },
  { label: "2nd Payment (After Assessment)", amount: "5,000" },
  { label: "Final Payment (After Visa Stamping)", amount: "Rest Amount" },
];

const NOTES = [
  "Current work experience is required along with documents.",
  "Pre-medical is required while submitting at the embassy.",
  "Assessment reports may come within a week in some cases.",
  "Ticket, embassy fees, and medical are not included in the service charge.",
];

const WpGermany = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-blue-100">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* HEADER */}
        <header className="relative bg-linear-to-br from-[#f0f9ff] via-white to-[#e0f2fe] rounded-[2.5rem] shadow-sm border border-blue-100 p-10 text-center overflow-hidden">
          
          {/* Decorative Premium Glow Elements */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl"></div>

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-800 italic">
            Germany{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-slate-800">
              Work Visa
            </span>
          </h1>

          <p className="mt-4 text-slate-500 text-lg font-medium tracking-wide">
            Food Court & Super Market Opportunities • 2026 Intake
          </p>
        </header>

        {/* MAIN JOBS & SALARY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT AREA: ROLES */}
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-xs border border-slate-200/80 p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Briefcase size={16} className="text-blue-500" />
              Available Positions
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

            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-2.5 text-xs text-slate-400">
              <AlertCircle size={14} className="text-slate-400 mt-0.5 shrink-0" />
              <p>Applicants must meet standard German employment requirements and verification metrics corresponding to these business roles.</p>
            </div>
          </section>

          {/* RIGHT SIDEBAR: SALARY & PROCESSING */}
          <aside className="space-y-6">
            
            {/* Monthly Salary Card */}
            <section className="bg-slate-800 text-white rounded-3xl shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 text-blue-300 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} />
                Monthly Salary
              </div>

              <p className="text-4xl font-light italic text-blue-50">
                1,500 €
              </p>

              <div className="mt-6 space-y-3 text-sm text-slate-300 border-t border-slate-700/80 pt-5">
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-400 shrink-0" />
                  Standard German Working Hours
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-400 shrink-0" />
                  Food Court & Super Market Rate
                </p>
              </div>
            </section>

            {/* Timelines Info */}
            <section className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                    Processing Time
                  </h4>
                  <p className="text-slate-800 font-semibold text-sm">
                    3 – 4 Months
                  </p>
                </div>
              </div>

              <div className="h-px bg-slate-100"></div>

              <div className="flex items-center gap-3">
                <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600">
                  <FileCheck2 size={18} />
                </div>
                <div>
                  <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                    Assessment Report
                  </h4>
                  <p className="text-slate-800 font-semibold text-sm">
                    Within 1 Week *
                  </p>
                </div>
              </div>
            </section>

          </aside>
        </div>

        {/* SERVICE CHARGES & PAYMENT PLAN */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-xs overflow-hidden">
          
          <div className="bg-slate-50/50 px-10 py-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Service Charge Breakdown
              </h2>
              <p className="text-slate-400 text-xs mt-1 uppercase tracking-[0.2em] font-bold">
                Excluding ticket, embassy fees & medical
              </p>
            </div>

            <div className="px-6 py-4 bg-white rounded-2xl border border-slate-200/80 group-hover:border-blue-200 transition-colors text-center md:text-right">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-0.5">
                Total Service Fee
              </span>
              <span className="text-3xl font-black text-slate-800">
                38,000
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
                Milestone Milestone Structure
              </span>
            </div>

            <div className="space-y-5">
              {PAYMENTS.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-dashed border-slate-100 pb-4 last:border-b-0 last:pb-0"
                >
                  <span className="text-slate-600 text-sm font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    {item.label}
                  </span>

                  <div className="text-left sm:text-right">
                    <span className="font-bold text-lg text-slate-800">
                      {item.amount}
                    </span>
                    {item.amount !== "Rest Amount" && (
                      <span className="text-slate-400 text-xs font-bold ml-1 uppercase">QAR</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMPORTANT REQUIREMENTS */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200/80 p-10 shadow-xs">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <Scale size={16} className="text-blue-500" />
            Important Requirements
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {NOTES.map((note, index) => (
              <div
                key={index}
                className="flex gap-3 p-5 rounded-2xl bg-slate-50/50 border border-slate-200/60 hover:border-blue-100 hover:bg-white transition-all duration-200"
              >
                <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {note}
                </p>
              </div>
            ))}
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
            © Germany Employment Gate • Global Logistics
          </p>
        </footer>

      </div>
    </div>
  );
};

export default WpGermany;