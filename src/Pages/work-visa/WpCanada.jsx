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
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-red-100">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header className="relative bg-linear-to-br from-[#fff5f5] via-[#fef2f2] to-[#eff6ff] rounded-[2.5rem] shadow-sm border border-red-100 p-10 text-center overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/50 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -left-10 w-40 h-40 bg-red-100/40 rounded-full blur-3xl"></div>

          <div className="flex">
            {/* 🔥 LOTTIE ANIMATION */}
            <div className="flex justify-center mb-6">
              <div className="w-15 sm:w-20">
                <Lottie animationData={canadaAnimation} loop={true} />
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-800 italic">
              Canada{" "}
              <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-red-600 to-blue-600">
                Pre-Approved LMIA
              </span>
            </h1>
          </div>

          <p className=" text-slate-500 text-lg font-medium tracking-wide">
            Premium Processing & Documentation Support
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 rounded-full bg-white/80 border border-red-200 text-xs font-bold uppercase tracking-wider text-red-700">
              Canada LMIA Program
            </span>
            <span className="px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700">
              Sure Shot Visit Visa
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Briefcase size={16} className="text-red-500" /> Available
              Programs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {JOBS.map((job, index) => (
                <div
                  key={index}
                  className="group flex items-center p-4 rounded-xl border border-red-50 bg-red-50/40 hover:bg-white hover:border-red-200 transition-all duration-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-4"></div>
                  <span className="font-semibold text-slate-700">{job}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Right */}
          <aside className="space-y-6">
            <section className="bg-linear-to-br from-red-700 to-red-900 text-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center gap-2 text-red-100 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} /> Total Package
              </div>

              <p className="text-3xl font-light italic">60,000 Riyal</p>

              <div className="mt-6 space-y-3 text-sm text-red-50 border-t border-red-600 pt-5">
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-300" />{" "}
                  Pre-Approved LMIA
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-300" /> Full
                  Processing Support
                </p>
                <p className="flex items-center gap-2">
                  <BadgeCheck size={14} className="text-blue-300" /> Premium
                  Processing
                </p>
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-red-50 p-2 rounded-lg text-red-600">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                    Process Time
                  </h4>
                  <p className="text-slate-800 font-medium text-sm">
                    3–4 Month
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* Payment Breakdown */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-linear-to-r from-red-50 to-blue-50 px-10 py-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Payment Breakdown
              </h2>
              <p className="text-slate-500 text-xs mt-1 uppercase tracking-[0.2em] font-bold">
                Payment Plan for Qatar Applicants
              </p>
            </div>

            <div className="flex gap-2">
              <div className="px-4 py-1.5 bg-white rounded-full border border-red-200 text-[10px] font-bold text-red-700 uppercase flex items-center gap-2">
                <ShieldCheck size={12} className="text-blue-500" /> Verified
                Process
              </div>
            </div>
          </div>

          <div className="p-10 bg-white group">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-red-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                <Globe
                  size={20}
                  className="text-red-600 group-hover:text-blue-600"
                />
              </div>
              <span className="font-bold text-slate-800 tracking-wider uppercase text-xs">
                Qatar Applicants
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* LMIA PACKAGE */}
              <div className="p-6 rounded-2xl border border-red-200 bg-red-50/40">
                <h3 className="text-lg font-bold text-red-700 mb-4 uppercase tracking-wider">
                  Canada Pre-Approved LMIA
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">First Payment</span>
                    <span className="font-semibold">3,000 Riyal</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-600">
                      VFS Finger + LMIA Switch Fees
                    </span>
                    <span className="font-semibold">5,000 Riyal</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-600">After PPR</span>
                    <span className="font-semibold">Remaining Amount Half</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-600">After Stamping</span>
                    <span className="font-semibold">Full Payment</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-red-200 flex justify-between items-center">
                  <span className="text-xs font-bold text-red-600 uppercase">
                    Total
                  </span>
                  <span className="text-2xl font-black text-slate-800">
                    60,000 <span className="text-sm text-red-600">Riyal</span>
                  </span>
                </div>
              </div>

              {/* VISIT VISA */}
              <div className="p-6 rounded-2xl border border-blue-200 bg-blue-50/40">
                <h3 className="text-lg font-bold text-blue-700 mb-4 uppercase tracking-wider">
                  Sure Shot Visit Visa
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Program Type</span>
                    <span className="font-semibold">Visit Visa</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-600">Processing</span>
                    <span className="font-semibold">Sure Shot</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-600">Package Amount</span>
                    <span className="font-semibold">50,000 Riyal</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-600">Support</span>
                    <span className="font-semibold">Full Documentation</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-blue-200 flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-600 uppercase">
                    Total
                  </span>
                  <span className="text-2xl font-black text-slate-800">
                    50,000 <span className="text-sm text-blue-600">Riyal</span>
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
            <div className="grid md:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-slate-200 p-5 bg-white">
                <div className="mb-3 inline-flex p-2 rounded-xl bg-red-50 text-red-600">
                  <Wallet size={18} />
                </div>
                <h3 className="font-bold text-slate-800">Step 1</h3>
                <p className="text-sm text-slate-500 mt-2">
                  First payment with file opening
                </p>
                <p className="text-base font-semibold text-red-700 mt-3">
                  3,000 Riyal
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5 bg-white">
                <div className="mb-3 inline-flex p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Stamp size={18} />
                </div>
                <h3 className="font-bold text-slate-800">Step 2</h3>
                <p className="text-sm text-slate-500 mt-2">
                  VFS finger and LMIA switch fees
                </p>
                <p className="text-base font-semibold text-blue-700 mt-3">
                  5,000 Riyal
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5 bg-white">
                <div className="mb-3 inline-flex p-2 rounded-xl bg-red-50 text-red-600">
                  <CheckCircle2 size={18} />
                </div>
                <h3 className="font-bold text-slate-800">Step 3</h3>
                <p className="text-sm text-slate-500 mt-2">
                  After PPR remaining amount half
                </p>
                <p className="text-base font-semibold text-red-700 mt-3">
                  Half Payment
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5 bg-white">
                <div className="mb-3 inline-flex p-2 rounded-xl bg-blue-50 text-blue-600">
                  <ShieldCheck size={18} />
                </div>
                <h3 className="font-bold text-slate-800">Step 4</h3>
                <p className="text-sm text-slate-500 mt-2">
                  After stamping full payment complete
                </p>
                <p className="text-base font-semibold text-blue-700 mt-3">
                  Final Settlement
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center py-8">
          <div className="flex justify-center items-center gap-4 text-red-300 mb-4">
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
