
import React from "react";
import {
  Briefcase,
  Clock,
  Wallet,
  CheckCircle2,
  Globe,
  Plane,
  ShieldCheck,
  Milestone,
} from "lucide-react";

import KSAFlag from "../../../src/assets/ksaflag.gif";

const WpPortugalKSA = () => {
  return (
    <div className="min-h-screen bg-[#f6fef9] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-green-100">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* HEADER */}
        <header className="relative bg-linear-to-br from-[#ecfdf5] via-white to-[#d1fae5] rounded-[2.5rem] shadow-sm border border-green-100 p-10 text-center overflow-hidden">

          {/* Glow */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-green-200/40 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-emerald-200/40 rounded-full blur-3xl"></div>

          {/* Flag */}
          <div className="absolute top-6 right-6">
            <img
              src={KSAFlag}
              alt="Saudi Flag"
              className="w-14 h-10 object-cover rounded-md shadow-md border border-white"
            />
          </div>

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-800 italic">
            Portugal{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-green-600 to-slate-900">
              Work Visa
            </span>
          </h1>

          <p className="mt-4 text-slate-600 text-lg font-medium tracking-wide">
            For Saudi Arabia, Bahrain, Yemen & Oman Applicants • Full-Time Opportunity
          </p>

        </header>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Briefcase size={16} className="text-green-600" />
              Current Opening
            </h2>

            <div className="rounded-2xl border border-green-100 bg-green-50/50 p-8 text-center space-y-4">
              <p className="text-lg font-semibold text-slate-700 leading-relaxed">
                Agriculture Non-Seasonal, Forest Wood Cutter, and Construction Workers
              </p>

              <span className="inline-block mt-2 text-green-600 text-xs font-bold uppercase tracking-widest">
                GCC Client Program
              </span>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-5">

              <div className="border border-slate-200 rounded-2xl p-5">
                <h4 className="font-bold text-slate-800 mb-2">
                  Benefits
                </h4>

                <div className="space-y-3 text-sm">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-500" />
                    Legal Portugal Employment
                  </p>

                  <p className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-500" />
                    Renewable Residence Permit
                  </p>

                  <p className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-500" />
                    Pathway to Long-Term Residence
                  </p>

                  <p className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-500" />
                    Family Reunification Opportunity
                  </p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl p-5">
                <h4 className="font-bold text-slate-800 mb-2">
                  Requirements
                </h4>

                <div className="space-y-3 text-sm">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-500" />
                    Valid Passport
                  </p>

                  <p className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-500" />
                    Basic Supporting Documents
                  </p>

                  <p className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-500" />
                    Medical & Visa Eligibility
                  </p>

                  <p className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-500" />
                    Ready for Overseas Employment
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6">

            {/* Salary */}
            <section className="bg-slate-900 text-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center gap-2 text-green-300 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} />
                Salary Package
              </div>

              <p className="text-3xl font-light italic text-white">
                900 – 1100 €
              </p>

              <div className="mt-6 space-y-3 text-sm text-slate-300 border-t border-slate-700 pt-5">
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-400" />
                  Company Food & Housing
                </p>

                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-400" />
                  8 Hrs + OT | 5-6 Days
                </p>

                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-400" />
                  Legal Employment Contract
                </p>
              </div>
            </section>

            {/* Processing */}
            <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-green-50 p-2 rounded-lg text-green-600">
                  <Clock size={18} />
                </div>

                <div>
                  <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                    Processing Time
                  </h4>

                  <p className="text-slate-800 font-medium text-sm">
                    5 - 6 Months
                  </p>
                </div>
              </div>
            </section>

          </aside>
        </div>

        {/* PAYMENT SECTION */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">

          <div className="bg-green-50/50 px-10 py-8 border-b border-green-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Service Charge Breakdown
              </h2>

              <p className="text-slate-400 text-xs mt-1 uppercase tracking-[0.2em] font-bold">
                Saudi Arabia, Bahrain, Yemen & Oman Applicant Payment Plan
              </p>
            </div>

            <div className="px-4 py-1.5 bg-white rounded-full border border-green-100 text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
              <Milestone size={12} className="text-green-600" />
              Milestone Based
            </div>
          </div>

          <div className="p-10">

            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-green-50 rounded-xl">
                <Globe size={20} className="text-green-600" />
              </div>

              <span className="font-bold text-slate-800 uppercase text-xs tracking-wider">
                Saudi Arabia, Bahrain, Yemen & Oman Applicants
              </span>
            </div>


            <div className="space-y-6">

              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-slate-500 text-sm">
                  First Payment (Advance Payment)
                </span>

                <span className="font-bold text-lg text-slate-800">
                  3,000 SAR / 1,00,000 BDT
                </span>
              </div>

              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-slate-500 text-sm">
                  After Appointment Confirmation
                </span>

                <span className="font-bold text-lg text-slate-800">
                  6,000 SAR / 2,00,000 BDT
                </span>
              </div>

              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-slate-500 text-sm">
                  Final Payment
                </span>

                <span className="font-bold text-lg text-slate-800">
                  After Visa Approval & Issuance
                </span>
              </div>

              {/* TOTAL */}
              <div className="mt-8 p-6 bg-green-50/60 rounded-2xl border-2 border-dashed border-green-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-green-600 uppercase tracking-widest">
                    Total Service Fee
                  </span>

                  <div className="text-right">
                    <span className="text-3xl font-black text-slate-800">
                      36,000
                      <span className="text-green-600 text-lg ml-1">
                        SAR
                      </span>
                    </span>

                    <div className="text-base font-semibold text-slate-600 mt-1">
                      12,00,000 BDT
                    </div>
                  </div>
                </div>
              </div>



              {/* REFUND POLICY */}
              <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6">

                <h3 className="font-bold text-slate-800 text-lg mb-4">
                  Visa Rejection & Refund Policy
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  In the event of a visa rejection, we will submit an appeal
                  and make every reasonable effort to obtain approval.
                  If the appeal is also unsuccessful and the visa remains
                  rejected, 50% of the total amount paid by the client
                  will be refunded.
                </p>

                <p className="text-sm text-slate-600 leading-relaxed mt-4">
                  The remaining 50% will be retained to cover third-party
                  and administrative expenses already incurred.
                </p>

                <div className="mt-5 grid md:grid-cols-2 gap-3 text-sm">

                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={14}
                      className="text-green-600 shrink-0"
                    />
                    Work Permit Processing Fees
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={14}
                      className="text-green-600 shrink-0"
                    />
                    Legal & Lawyer Fees
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={14}
                      className="text-green-600 shrink-0"
                    />
                    Accommodation Booking Charges
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={14}
                      className="text-green-600 shrink-0"
                    />
                    Appointment Booking Fees
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={14}
                      className="text-green-600 shrink-0"
                    />
                    Courier & Delivery Costs
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={14}
                      className="text-green-600 shrink-0"
                    />
                    Insurance Fees
                  </div>

                  <div className="flex items-center gap-2 md:col-span-2">
                    <CheckCircle2
                      size={14}
                      className="text-green-600 shrink-0"
                    />
                    Document Preparation & Processing Costs
                  </div>

                </div>

                <div className="mt-5 p-4 bg-white rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    By proceeding with the application, the client
                    acknowledges and agrees to the above payment and
                    refund terms and conditions.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center py-8">
          <div className="flex justify-center items-center gap-4 text-slate-300 mb-4">
            <Plane size={16} />
            <div className="h-px w-12 bg-slate-100"></div>
            <ShieldCheck size={16} />
          </div>

          <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase">
            © 2026 Portugal Work Visa Program
          </p>
        </footer>

      </div>
    </div>
  );
};

export default WpPortugalKSA;

