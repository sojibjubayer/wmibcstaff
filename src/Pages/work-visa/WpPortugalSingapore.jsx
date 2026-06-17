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

import SingaporeFlag from "../../../src/assets/singaporeflag.gif";

const WpPortugalSingapore = () => {
  return (
    <div className="min-h-screen bg-[#fff7f7] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-red-100">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* HEADER */}
        <header className="relative bg-linear-to-br from-[#fff1f2] via-white to-[#fee2e2] rounded-[2.5rem] shadow-sm border border-red-100 p-10 text-center overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-red-200/50 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-rose-200/50 rounded-full blur-3xl"></div>

          <div className="absolute top-6 right-6">
            <img
              src={SingaporeFlag}
              alt="Singapore Flag"
              className="w-14 h-10 object-cover rounded-md shadow-md border border-white"
            />
          </div>

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-800 italic">
            Portugal{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-red-600 to-slate-900">
              Work Visa
            </span>
          </h1>

          <p className="mt-4 text-slate-600 text-lg font-medium tracking-wide">
            Singapore to Portugal • Full-Time Opportunity
          </p>

        </header>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-red-100 p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Briefcase size={16} className="text-red-600" />
              Current Opening
            </h2>

            <div className="rounded-2xl border border-red-100 bg-red-50/50 p-8 text-center space-y-4">
              <p className="text-lg font-semibold text-slate-700 leading-relaxed">
                Agriculture Non-Seasonal, Forest Wood Cutter, and Construction Workers
              </p>

              <span className="inline-block mt-2 text-red-600 text-xs font-bold uppercase tracking-widest">
                Singapore Client Program
              </span>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-5">
              <div className="border border-slate-200 rounded-2xl p-5">
                <h4 className="font-bold text-slate-800 mb-2">Benefits</h4>

                <div className="space-y-3 text-sm">
                  {[
                    "Legal Portugal Employment",
                    "Renewable Residence Permit",
                    "Pathway to Long-Term Residence",
                    "Family Reunification Opportunity",
                  ].map((item) => (
                    <p key={item} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-red-500" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl p-5">
                <h4 className="font-bold text-slate-800 mb-2">Requirements</h4>

                <div className="space-y-3 text-sm">
                  {[
                    "Valid Passport",
                    "Basic Supporting Documents",
                    "Medical & Visa Eligibility",
                    "Ready for Overseas Employment",
                  ].map((item) => (
                    <p key={item} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-red-500" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="bg-red-700 text-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center gap-2 text-red-100 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} />
                Salary Package
              </div>

              <p className="text-3xl font-light italic text-white">
                900 – 1100 €
              </p>

              <div className="mt-6 space-y-3 text-sm text-red-50 border-t border-red-500 pt-5">
                {[
                  "Company Food & Housing",
                  "8 Hrs + OT | 5-6 Days",
                  "Legal Employment Contract",
                ].map((item) => (
                  <p key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-white" />
                    {item}
                  </p>
                ))}
              </div>
            </section>

            <section className="bg-white border border-red-100 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-red-50 p-2 rounded-lg text-red-600">
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
        <section className="bg-white rounded-[2.5rem] border border-red-100 shadow-sm overflow-hidden">
          <div className="bg-red-50 px-10 py-8 border-b border-red-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Service Charge Breakdown
              </h2>

              <p className="text-slate-400 text-xs mt-1 uppercase tracking-[0.2em] font-bold">
                Singapore Applicant Payment Plan
              </p>
            </div>

            <div className="px-4 py-1.5 bg-white rounded-full border border-red-100 text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
              <Milestone size={12} className="text-red-600" />
              Milestone Based
            </div>
          </div>

          <div className="p-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-red-50 rounded-xl">
                <Globe size={20} className="text-red-600" />
              </div>

              <span className="font-bold text-slate-800 uppercase text-xs tracking-wider">
                Singapore Applicants
              </span>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-slate-500 text-sm">
                  First Payment (Advance Payment)
                </span>
                <span className="font-bold text-lg text-slate-800">
                  1,000 SGD / 1,00,000 BDT
                </span>
              </div>

              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-slate-500 text-sm">
                  Second Payment (After Appointment Confirmation)
                </span>
                <span className="font-bold text-lg text-slate-800">
                  2,000 SGD / 2,00,000 BDT
                </span>
              </div>

              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-slate-500 text-sm">
                  Final Payment
                </span>
                <span className="font-bold text-lg text-slate-800">
                  Payable After Visa Approval & Issuance
                </span>
              </div>

              <div className="mt-8 p-6 bg-red-50 rounded-2xl border-2 border-dashed border-red-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-red-600 uppercase tracking-widest">
                    Total Service Fee
                  </span>

                  <div className="text-right">
                    <span className="text-3xl font-black text-slate-800">
                      11,500
                      <span className="text-red-600 text-lg ml-1">
                        SGD
                      </span>
                    </span>

                    <div className="text-base font-semibold text-slate-600 mt-1">
                      11,00,000 BDT
                    </div>
                  </div>
                </div>
              </div>

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
                  {[
                    "Work Permit Processing Fees",
                    "Legal & Lawyer Fees",
                    "Accommodation Booking Charges",
                    "Appointment Booking Fees",
                    "Courier & Delivery Costs",
                    "Insurance Fees",
                    "Document Preparation & Processing Costs",
                  ].map((item) => (
                    <div
                      key={item}
                      className={`flex items-center gap-2 ${
                        item === "Document Preparation & Processing Costs"
                          ? "md:col-span-2"
                          : ""
                      }`}
                    >
                      <CheckCircle2 size={14} className="text-red-600 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-4 bg-white rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    By proceeding with the application, the client acknowledges
                    and agrees to the above payment and refund terms and
                    conditions.
                  </p>
                </div>
              </div>
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
            © 2026 Portugal Work Visa Program
          </p>
        </footer>
      </div>
    </div>
  );
};

export default WpPortugalSingapore;