import React from "react";
import {
  Briefcase,
  Clock,
  Wallet,
  CheckCircle2,
  Globe,
  Plane,
  ShieldCheck,
  BadgeCheck,
  Stamp,
} from "lucide-react";
import Lottie from "lottie-react";
import canadaAnimation from "../../assets/canada-animation.json";

const JOBS = [
  "Cashier - CAD 3200–3500",
  "Store Keeper - CAD 3200–3500",
  "Store Manager - CAD 4200–4500",
  "Driver - CAD 4000–4800",
  "Warehouse Workers - CAD 3290–3500",
  "Supervisor - CAD 3500–4200",
  "Waiter - CAD 3400",
  "Chef - CAD 4000–4500",
  "Front Office - CAD 3200–3500",
  "Receptionist - CAD 3200–3500",
  "Home Care Giver - CAD 4000–4800",
];

const WpCanada = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-blue-100">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="relative bg-linear-to-br from-[#f0f7ff] via-[#f8fafc] to-[#e0f2fe] rounded-[2.5rem] shadow-sm border border-blue-100 p-10 text-center overflow-hidden flex flex-col items-center">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/50 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -left-10 w-40 h-40 bg-blue-100/40 rounded-full blur-3xl"></div>

          {/* LOTTIE ANIMATION */}
          <div className="w-16 sm:w-20 mb-4 z-10">
            <Lottie animationData={canadaAnimation} loop={true} />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-slate-800 italic z-10">
            Canada{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600">
              Pre-Approved LMIA
            </span>
          </h1>

          <p className="text-slate-500 text-lg font-medium tracking-wide mt-3 z-10">
            Premium Processing & Documentation Support
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 z-10">
            <span className="px-4 py-2 rounded-full bg-white/80 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-xs">
              Canada LMIA Program
            </span>
            <span className="px-4 py-2 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold uppercase tracking-wider text-sky-700 shadow-xs">
              Sure Shot Visit Visa
            </span>
          </div>
        </header>

        {/* LMIA Overview */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
            LMIA Process Overview
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            <span className="font-semibold">LMIA</span> (Labour Market Impact
            Assessment) is an approval from{" "}
            <span className="font-semibold text-slate-800">
              Employment and Social Development Canada (ESDC)
            </span>{" "}
            that allows Canadian employers to hire foreign workers.
          </p>

          {/* Process Flow */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-xs">Employer Advertises</span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-xs">LMIA Approved</span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-xs">Job Offer</span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-xs">Apply Work Permit</span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-xs">Biometrics</span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-xs">PPR</span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-xs">Fly</span>
          </div>

          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 text-sm">
            <p className="font-bold text-blue-800 mb-1">
              Pre-Approved LMIA Status
            </p>
            <p className="text-slate-600">
              Employer already holds an active LMIA approval slots — allows direct transition to work permit applications without marketing delays.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-sm pt-2">
            {[
              { title: "Work Permit", desc: "Apply online via IRCC portal" },
              { title: "Biometrics (VFS)", desc: "Fingerprints + photos processing" },
              { title: "Processing", desc: "Background & eligibility screening" },
              { title: "PPR", desc: "Passport request milestone" },
              { title: "Visa Stamping", desc: "Final entry counterfoil issuance" }
            ].map((step, idx) => (
              <div key={idx} className="p-4 border border-slate-200 bg-linear-to-b from-white to-slate-50/50 rounded-xl flex flex-col justify-between">
                <p className="font-semibold text-slate-800">{step.title}</p>
                <p className="text-slate-500 text-xs mt-1.5">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content Splitting Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Jobs */}
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Briefcase size={16} className="text-blue-500" /> Available Programs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {JOBS.map((job, index) => (
                <div
                  key={index}
                  className="group flex items-center p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-xs transition-all duration-200"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-4 group-hover:scale-125 transition-transform"></div>
                  <span className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">{job}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Right Column: Pricing Overview */}
          <aside className="space-y-6">
            <section className="bg-linear-to-br from-blue-700 to-indigo-950 text-white rounded-3xl shadow-md p-8 relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 opacity-10 text-white pointer-events-none">
                <Plane size={140} />
              </div>
              <div className="flex items-center gap-2 text-blue-200 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} /> Total Package
              </div>

              <p className="text-4xl font-light italic tracking-tight">60,000 <span className="text-xl not-italic font-medium text-blue-200">QAR</span></p>

              <div className="mt-6 space-y-3 text-sm text-blue-100 border-t border-blue-600/60 pt-5">
                <p className="flex items-center gap-2.5">
                  <CheckCircle2 size={15} className="text-blue-300 dynamic-icon" /> Pre-Approved LMIA Secured
                </p>
                <p className="flex items-center gap-2.5">
                  <CheckCircle2 size={15} className="text-blue-300 dynamic-icon" /> Full Documentation Logistics
                </p>
                <p className="flex items-center gap-2.5">
                  <BadgeCheck size={15} className="text-blue-300 dynamic-icon" /> Premium Portal Processing
                </p>
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                    Estimated Timeline
                  </h4>
                  <p className="text-slate-800 font-semibold text-base mt-0.5">
                    3 – 4 Months
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* Detailed Payment Breakdown */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-linear-to-r from-blue-50/60 to-sky-50/60 px-10 py-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Payment Breakdown
              </h2>
              <p className="text-slate-500 text-xs mt-1 uppercase tracking-[0.2em] font-bold">
                Payment Milestone Structures
              </p>
            </div>

            <div className="px-4 py-1.5 bg-white rounded-full border border-slate-200 text-[10px] font-bold text-slate-700 uppercase flex items-center gap-2 shadow-xs">
              <ShieldCheck size={12} className="text-blue-500" /> Secure Escrow Processing
            </div>
          </div>

          <div className="p-10 bg-white">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-600">
                <Globe size={20} />
              </div>
              <span className="font-bold text-slate-800 tracking-wider uppercase text-xs">
                Available Programs & Terms
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* LMIA PACKAGE */}
              <div className="p-6 rounded-2xl border border-blue-100 bg-blue-50/20 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-blue-800 mb-4 uppercase tracking-wider border-b border-blue-100 pb-2">
                    Canada Pre-Approved LMIA
                  </h3>

                  <div className="space-y-4 text-sm text-slate-600">
                    <div className="flex justify-between items-center">
                      <span>First Payment / File Opening</span>
                      <span className="font-semibold text-slate-800">3,000 QAR</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>VFS Fingerprint + LMIA Setup</span>
                      <span className="font-semibold text-slate-800">5,000 QAR</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Upon PPR Letter Issued</span>
                      <span className="font-semibold text-slate-800">50% of Balance</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Passport Stamping Completed</span>
                      <span className="font-semibold text-slate-800">Final Settlement</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-blue-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-700 uppercase">Total Investment</span>
                  <span className="text-2xl font-black text-slate-800">
                    60,000 <span className="text-sm font-bold text-blue-700">QAR</span>
                  </span>
                </div>
              </div>

              {/* VISIT VISA */}
              <div className="p-6 rounded-2xl border border-sky-100 bg-sky-50/20 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-sky-800 mb-4 uppercase tracking-wider border-b border-sky-100 pb-2">
                    Sure Shot Visit Visa
                  </h3>

                  <div className="space-y-4 text-sm text-slate-600">
                    <div className="flex justify-between items-center">
                      <span>Program Target</span>
                      <span className="font-semibold text-slate-800">Visit Counterfoil</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Initial Booking Deposit</span>
                      <span className="font-semibold text-slate-800">5,000 QAR</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>VFS Global Fee (Direct)</span>
                      <span className="font-semibold text-slate-800">CAD $185</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Post-Approval Balance</span>
                      <span className="font-semibold text-slate-800">Remaining Settlement</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-sky-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-sky-700 uppercase">Total Investment</span>
                  <span className="text-2xl font-black text-slate-800">
                    50,000 <span className="text-sm font-bold text-sky-700">QAR</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-10 py-8 border-b border-slate-100 bg-slate-50/70">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              Process Timeline
            </h2>
            <p className="text-slate-500 text-xs mt-1 uppercase tracking-[0.2em] font-bold">
              Step By Step Payment Stage
            </p>
          </div>

          <div className="p-10">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { step: "Step 1", icon: <Wallet size={18} />, bgClass: "bg-blue-50", textClass: "text-blue-600", borderClass: "text-blue-700", desc: "First payment with file opening", amount: "3,000 QAR" },
                { step: "Step 2", icon: <Stamp size={18} />, bgClass: "bg-sky-50", textClass: "text-sky-600", borderClass: "text-sky-700", desc: "VFS finger and LMIA switch fees", amount: "5,000 QAR" },
                { step: "Step 3", icon: <CheckCircle2 size={18} />, bgClass: "bg-blue-50", textClass: "text-blue-600", borderClass: "text-blue-700", desc: "After PPR remaining amount half", amount: "Half Payment" },
                { step: "Step 4", icon: <ShieldCheck size={18} />, bgClass: "bg-sky-50", textClass: "text-sky-600", borderClass: "text-sky-700", desc: "After stamping full payment complete", amount: "Final Settlement" }
              ].map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 p-5 bg-white shadow-2xs hover:border-slate-300 transition-colors">
                  <div className={`mb-3 inline-flex p-2 rounded-xl ${item.bgClass} ${item.textClass}`}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-slate-800">{item.step}</h3>
                  <p className="text-sm text-slate-500 mt-2 min-h-10">{item.desc}</p>
                  <p className={`text-base font-semibold ${item.borderClass} mt-3`}>{item.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8">
          <div className="flex justify-center items-center gap-4 text-slate-300 mb-4">
            <Plane size={16} />
            <div className="h-px w-12 bg-slate-200"></div>
            <ShieldCheck size={16} />
          </div>
          <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase">
            © 2026 Canada Immigration Processing
          </p>
        </footer>
      </div>
    </div>
  );
};

export default WpCanada;