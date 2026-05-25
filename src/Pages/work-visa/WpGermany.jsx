import React from "react";

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
    <div className="min-h-screen bg-[#fafafa] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header Section */}
        <header className="bg-linear-to-br from-[#e0f2fe] via-white to-[#dbeafe] rounded-3xl shadow-sm border border-blue-100 p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-48 h-48 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-12%] left-[-8%] w-44 h-44 bg-sky-100/60 rounded-full blur-3xl"></div>

          <h1 className="relative text-3xl sm:text-5xl font-bold tracking-tight text-slate-800">
            Germany{" "}
            <span className="font-light italic text-slate-700">
              Work Visa
            </span>
          </h1>

          <p className="relative mt-3 text-slate-600 text-base sm:text-lg font-medium tracking-wide">
            Food Court & Super Market Opportunities
          </p>
        </header>

        {/* Positions & Salary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Position Section */}
          <section className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-blue-500 mb-6">
              Available Roles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {JOBS.map((job, index) => (
                <div
                  key={index}
                  className="flex items-center p-5 rounded-2xl bg-slate-50 border border-slate-100 font-semibold text-slate-700 hover:bg-blue-50 transition-all duration-300"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400 mr-3"></span>
                  {job}
                </div>
              ))}
            </div>
          </section>

          {/* Salary Section */}
          <section className="bg-slate-800 rounded-2xl shadow-lg p-8 text-center text-white flex flex-col justify-center">
            <h3 className="text-blue-200 text-xs uppercase tracking-widest font-bold mb-2">
              Monthly Salary
            </h3>

            <p className="text-4xl font-light italic">1,500 €</p>

            <p className="mt-4 text-[11px] uppercase tracking-wider text-slate-400">
              Food Court / Super Market
            </p>
          </section>
        </div>

        {/* Timeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest mb-2">
              Processing Time
            </h3>
            <p className="text-slate-600 text-2xl font-light italic">
              3 – 4 Months
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest mb-2">
              Assessment Report
            </h3>
            <p className="text-slate-600 text-2xl font-light">
              Within 1 Week*
            </p>
          </div>
        </div>

        {/* Pricing Section */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                Service Charge
              </h2>
              <p className="text-slate-400 text-sm italic">
                Excluding ticket, embassy fees & medical
              </p>
            </div>

            <div className="text-3xl font-light text-blue-300">
              38,000{" "}
              <span className="text-sm text-slate-500 font-bold uppercase">
                QAR
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="space-y-4">
              {PAYMENTS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-4 rounded-xl bg-[#fafafa] border-b border-slate-100 last:border-0 hover:bg-white hover:shadow-sm transition-all"
                >
                  <span className="text-slate-600 font-medium">
                    {item.label}
                  </span>

                  <div className="text-left sm:text-right">
                    <span className="text-slate-900 font-bold">
                      {item.amount}
                    </span>
                    {item.amount !== "Rest Amount" && (
                      <span className="ml-1 text-[10px] text-slate-400 font-bold">
                        QAR
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-blue-500 mb-6">
            Important Requirements
          </h2>

          <div className="space-y-4">
            {NOTES.map((note, index) => (
              <div
                key={index}
                className="flex gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <span className="mt-2 w-2 h-2 rounded-full bg-blue-400 shrink-0"></span>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center text-slate-400 text-[10px] tracking-[0.3em] uppercase py-4">
          Germany Employment Gate • 2026 Intake
        </footer>
      </div>
    </div>
  );
};

export default WpGermany;