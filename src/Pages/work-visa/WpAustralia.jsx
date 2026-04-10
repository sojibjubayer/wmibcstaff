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
} from "lucide-react";
import Lottie from "lottie-react";
import Revenue from "../../assets/Revenue.json";

const JOBS = ["Warehouse Packer", "Agriculture"];

const WpAustralia = () => {
  return (
    <div className="min-h-screen bg-[#f8faf7] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-emerald-100">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header Section */}
        <header className="relative bg-linear-to-br from-[#ecfdf5] via-[#f0fdf4] to-[#fefce8] rounded-[2.5rem] shadow-sm border border-emerald-100 p-10 text-center overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/50 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -left-10 w-40 h-40 bg-emerald-100/50 rounded-full blur-3xl"></div>

          <div className="flex flex-col md:flex-row justify-center items-center text-center md:text-left gap-6">
            {/* 🔥 LOTTIE ANIMATION */}
            <div className="flex justify-center">
              <div className="w-40 sm:w-50">
                <Lottie animationData={Revenue} loop={true} />
              </div>
            </div>

            {/* TEXT */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-slate-800 italic">
              Australia{" "}
              <span className="font-extrabold not-italic bg-clip-text text-transparent bg-[linear-gradient(to_right,#059669,#f59e0b)]">
                Work Visa
              </span>
            </h1>
          </div>

          <p className="mt-4 text-slate-500 text-lg font-medium tracking-wide">
            Warehouse Recruitment & Documentation
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold uppercase tracking-wider text-amber-700">
              Visitor-Subclass 600
            </span>
            <span className="px-4 py-2 rounded-full bg-white/80 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-700">
              Australia PR Pathway
            </span>
            <span className="px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold uppercase tracking-wider text-amber-700">
              Sure Shot
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Positions */}
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-emerald-100 p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Briefcase size={16} className="text-emerald-500" /> Available
              Positions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {JOBS.map((job, index) => (
                <div
                  key={index}
                  className="group flex items-center p-4 rounded-xl border border-emerald-50 bg-emerald-50/40 hover:bg-white hover:border-emerald-200 transition-all duration-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-4"></div>
                  <span className="font-semibold text-slate-700">{job}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Right: Sidebar Info */}
          <aside className="space-y-6">
            <section className="bg-linear-to-br from-emerald-700 to-emerald-900 text-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center gap-2 text-emerald-100 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} /> Salary Package
              </div>

              <p className="text-3xl font-light italic">26 AUD / Hour</p>

              <div className="mt-6 space-y-3 text-sm text-emerald-50 border-t border-emerald-600 pt-5">
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-400" /> Food &
                  Accommodation
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-400" />{" "}
                  Warehouse Sector
                </p>
                <p className="flex items-center gap-2">
                  <BadgeCheck size={14} className="text-amber-400" /> Sure Shot
                </p>
              </div>
            </section>

            <section className="bg-white border border-emerald-100 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                    Processing Time
                  </h4>
                  <p className="text-slate-800 font-medium text-sm">
                    3-5 Months
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* SERVICE CHARGE */}
        <section className="bg-white rounded-[2.5rem] border border-emerald-100 shadow-sm overflow-hidden">
          <div className="bg-linear-to-r from-emerald-50 to-amber-50 px-10 py-8 border-b border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Service Charge Breakdown
              </h2>
              <p className="text-slate-500 text-xs mt-1 uppercase tracking-[0.2em] font-bold">
                Payment Plan for Qatar Applicants
              </p>
            </div>

            <div className="flex gap-2">
              <div className="px-4 py-1.5 bg-white rounded-full border border-emerald-200 text-[10px] font-bold text-emerald-700 uppercase flex items-center gap-2">
                <ShieldCheck size={12} className="text-amber-500" /> Verified
                Process
              </div>
            </div>
          </div>

          <div className="p-10 bg-white group">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-emerald-50 rounded-xl group-hover:bg-amber-50 transition-colors">
                <Globe
                  size={20}
                  className="text-emerald-600 group-hover:text-amber-600"
                />
              </div>
              <span className="font-bold text-slate-800 tracking-wider uppercase text-xs">
                Qatar Applicants
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* WITH JOB */}
              <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/40">
                <h3 className="text-lg font-bold text-emerald-700 mb-4 uppercase tracking-wider">
                  With Job
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">1st Payment</span>
                    <span className="font-semibold">5,000 QAR</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-600">Final Payment</span>
                    <span className="font-semibold">50,000 QAR</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-200 flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-600 uppercase">
                    Total
                  </span>
                  <span className="text-2xl font-black text-slate-800">
                    55,000 <span className="text-sm text-emerald-600">QAR</span>
                  </span>
                </div>
              </div>

              {/* WITHOUT JOB */}
              <div className="p-6 rounded-2xl border border-amber-200 bg-amber-50/40">
                <h3 className="text-lg font-bold text-amber-700 mb-4 uppercase tracking-wider">
                  Without Job - (MCV)
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">1st Payment</span>
                    <span className="font-semibold">5,000 QAR</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-600">Final Payment</span>
                    <span className="font-semibold">30,000 QAR</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-200 flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-600 uppercase">
                    Total
                  </span>
                  <span className="text-2xl font-black text-slate-800">
                    35,000 <span className="text-sm text-amber-600">QAR</span>
                  </span>
                </div>
              </div>
            </div>
            {/* 🔥 OFFER HIGHLIGHTS (BOTTOM) */}
            <div className="mt-10 border border-emerald-200 rounded-xl bg-emerald-50/40 p-6 text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-700 mb-3">
                Australia Sub Class 600 - Visitor Visa
              </p>

              <div className="flex justify-center items-center gap-6 text-sm font-bold uppercase tracking-wider">
                <span className="text-amber-600">35K Without Ticket</span>

                <span className="text-emerald-700">Sure Shot</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center py-8">
          <div className="flex justify-center items-center gap-4 text-emerald-300 mb-4">
            <Plane size={16} />
            <div className="h-px w-12 bg-emerald-100"></div>
            <ShieldCheck size={16} />
          </div>
          <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase">
            © 2026 Australia Career Transitions
          </p>
        </footer>
      </div>
    </div>
  );
};

export default WpAustralia;
