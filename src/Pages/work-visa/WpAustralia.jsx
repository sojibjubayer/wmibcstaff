"use client";

import React from "react";
import {
  BadgeCheck,
  Target,
  FileCheck,
  ShieldCheck,
  Zap,
  Clock,
  Briefcase,
  Gem,
  FileText,
} from "lucide-react";

const ADVANTAGES = [
  {
    title: "Priority 408 Processing",
    desc: "Dedicated case handling for applicants applying under the Subclass 408 pathway.",
    icon: <Zap size={32} />,
  },
  {
    title: "Precision Documentation",
    desc: "We review and organize your file to reduce avoidable mistakes before submission.",
    icon: <FileCheck size={32} />,
  },
  {
    title: "Professional Case Support",
    desc: "Step-by-step assistance from profile checking to application follow-up.",
    icon: <ShieldCheck size={32} />,
  },
  {
    title: "Clear Processing Roadmap",
    desc: "Simple guidance so the customer understands every stage of the process.",
    icon: <Clock size={32} />,
  },
];

const WpAustralia408 = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 px-6 py-16 font-sans text-slate-800 selection:bg-blue-100">
      <div className="mx-auto max-w-7xl">
        {/* HERO */}
        <section className="relative mb-16 overflow-hidden rounded-[2.5rem] bg-linear-to-br from-[#f0f7ff] via-white to-[#e0f2fe] px-6 py-12 text-center shadow-xs border border-blue-100 sm:px-8">
          <div className="absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-20 right-6 h-52 w-52 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-4xl flex flex-col items-center">
            {/* FLAG */}
            <div className="mb-5 flex h-16 w-24 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xs">
              <img
                src="/australia-flag.gif"
                alt="Australia flag"
                className="h-full w-full rounded-lg object-cover"
              />
            </div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-blue-700">
              <Gem size={14} /> Premium Service Tier
            </div>

            <h1 className="text-4xl font-black tracking-tighter text-slate-900 sm:text-5xl md:text-6xl">
              Subclass <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600">408</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-500 sm:text-base">
              Australia visa processing support with premium documentation,
              profile assessment, application guidance, and professional
              follow-up.
            </p>

            <div className="mx-auto mt-8 w-full max-w-md rounded-3xl border border-blue-100 bg-white p-6 text-slate-900 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600">
                Total Service Charge
              </p>

              <div className="mt-2 flex items-baseline justify-center gap-2">
                <span className="text-4xl font-black text-slate-900 sm:text-5xl">
                  45,000
                </span>
                <span className="text-base font-bold text-slate-400">
                  QAR
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ADVANTAGES */}
        <section className="mb-24">
          <div className="mb-10 text-center">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
              Advantages
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900">
              Why Choose This Program
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {ADVANTAGES.map((item, index) => (
              <div
                key={index}
                className="group rounded-[3rem] border border-slate-200/60 bg-white p-10 transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xs"
              >
                <div className="mb-8 flex h-18 w-18 items-center justify-center rounded-3xl bg-slate-50 text-blue-600 shadow-2xs transition duration-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-black text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-5 text-lg leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="overflow-hidden rounded-[3rem] bg-linear-to-br from-[#012169] via-[#0b4ea2] to-[#1d4ed8] p-10 text-white shadow-md">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-200">
                Australia Subclass 408
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight">
                Premium Visa Processing Support
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-blue-50">
                Complete support for profile assessment, document preparation,
                application guidance, and professional follow-up.
              </p>
            </div>

            <div className="rounded-4xl bg-white p-8 text-center text-slate-900 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">
                Total Charge
              </p>

              <p className="mt-4 text-5xl font-black">45,000</p>

              <p className="mt-1 text-lg font-bold text-slate-400">QAR</p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-20 border-t border-slate-200 pt-10">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                <BadgeCheck size={18} className="text-blue-600" />
                Verified Process
              </div>

              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                <Target size={18} className="text-blue-600" />
                Profile Based
              </div>

              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                <Briefcase size={18} className="text-blue-600" />
                Professional Support
              </div>

              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                <FileText size={18} className="text-blue-600" />
                Document Ready
              </div>
            </div>

            <p className="text-sm font-bold uppercase tracking-tight text-slate-400">
              Australia Subclass 408
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default WpAustralia408;