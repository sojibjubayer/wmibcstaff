import React from "react";
import { CreditCard, ShieldAlert, Sparkles, ReceiptText } from "lucide-react";

export default function PaymentTerms() {
  return (
    <div className="min-h-screen bg-[#071a3d] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden font-sans">
      {/* --- Premium Background Glow Layers --- */}
      <div className="pointer-events-none absolute left-1/2 -top-40 h-120 w-140 -translate-x-1/2 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-30 top-1/3 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* --- Header --- */}
        <div className="text-center space-y-3">
          <div className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            Financial Framework 2026
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white flex items-center justify-center gap-3">
            <ReceiptText className="text-cyan-400 h-8 w-8" /> Payment Terms
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full"></div>
        </div>

        {/* --- Visit Visa Payments --- */}
        <section className="bg-white/5 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md overflow-hidden">
          <div className="bg-linear-to-r from-[#0d2a63] to-[#081d45] border-b border-white/5 px-6 py-4 font-black uppercase tracking-wide text-sm text-blue-100 flex items-center gap-2.5">
            <CreditCard className="text-cyan-400 h-4 w-4" />
            Visit Visa Payments
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/2 border-b border-white/5 text-cyan-400 uppercase text-[10px] font-black tracking-widest">
                  <th className="p-4 text-left">Package</th>
                  <th className="p-4 text-left">Details</th>
                  <th className="p-4 text-left">Total (QAR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/2 transition">
                  <td className="p-4 font-bold text-white tracking-wide uppercase text-xs">Standard Processing</td>
                  <td className="p-4 text-blue-100/70 font-medium">
                    Standard processing infrastructure (excludes custom auxiliary options)
                  </td>
                  <td className="p-4 font-black text-cyan-300 text-base">500</td>
                </tr>

                <tr className="hover:bg-white/2 transition">
                  <td className="p-4 font-bold text-white tracking-wide uppercase text-xs">Comprehensive Visa Support</td>
                  <td className="p-4 text-blue-100/70 font-medium">
                    Travel Insurance + Flight Itinerary + Hotel Bookings + VFS/BLS Slot Processing <span className="text-cyan-400/80 italic">(Excludes Official Government Embassy Fee)</span>
                  </td>
                  <td className="p-4 font-black text-cyan-300 text-base">1000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Special Cases --- */}
        <section className="bg-white/5 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md overflow-hidden">
          <div className="bg-linear-to-r from-[#0d2a63] to-[#081d45] border-b border-white/5 px-6 py-4 font-black uppercase tracking-wide text-sm text-blue-100 flex items-center gap-2.5">
            <ShieldAlert className="text-cyan-400 h-4 w-4" />
            Special Case Tier Programs
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/2 border-b border-white/5 text-cyan-400 uppercase text-[10px] font-black tracking-widest">
                  <th className="p-4 text-left">Country</th>
                  <th className="p-4 text-left">Total Charge</th>
                  <th className="p-4 text-left">1st Payment</th>
                  <th className="p-4 text-left">After Visa</th>
                  <th className="p-4 text-left">Non-Refundable</th>
                  <th className="p-4 text-left">Commission Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/2 transition">
                  <td className="p-4 font-bold text-white uppercase text-xs tracking-wide">Spain</td>
                  <td className="p-4 font-semibold text-blue-100/90">20,000</td>
                  <td className="p-4 text-blue-100/70">2,000</td>
                  <td className="p-4 text-blue-100/70">18,000</td>
                  <td className="p-4 text-cyan-400 font-bold">1,000</td>
                  <td className="p-4 font-black text-emerald-400 text-xs uppercase tracking-wider">
                    10% (On Visa Success Only)
                  </td>
                </tr>

                <tr className="hover:bg-white/2 transition">
                  <td className="p-4 font-bold text-white uppercase text-xs tracking-wide">UK</td>
                  <td className="p-4 font-semibold text-blue-100/90">35,000</td>
                  <td className="p-4 text-blue-100/70">5,000</td>
                  <td className="p-4 text-blue-100/70">30,000</td>
                  <td className="p-4 text-cyan-400 font-bold">1,500</td>
                  <td className="p-4 text-blue-100/40 font-medium">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}