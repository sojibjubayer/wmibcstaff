import React from "react";

const PAYMENTS = [
  { label: "1st Payment (With Documents)", amount: "3,500" },
  { label: "2nd Payment (After Embassy Date)", amount: "6,000" },
  { label: "3rd Payment (After Visa)", amount: "25,500" },
];

const WpPortugal = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="bg-linear-to-br from-[#fce4ec] to-[#f8bbd0] rounded-3xl shadow-sm border border-pink-100 p-10 text-center relative overflow-hidden">
          <div className="absolute -top-5 -left-5 w-40 h-40 bg-white/30 rounded-full blur-3xl"></div>
          
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-800">
            Portugal <span className="font-light italic text-slate-700">Work Visa</span>
          </h1>
          <p className="mt-3 text-slate-600 text-lg font-medium tracking-wide">
            Agriculture Sector • Non-Seasonal Opportunity
          </p>
        </header>

        {/* Position & Salary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Position Card */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col justify-center">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-pink-400 mb-4 text-center">Current Opening</h2>
            <div className="py-4 border-y border-slate-50 text-center">
              <span className="text-2xl font-semibold text-slate-800">Agriculture Specialist</span>
              <p className="text-slate-400 text-sm mt-1">(Non-Seasonal / Full-Time)</p>
            </div>
          </section>

          {/* Salary Card */}
          <section className="bg-slate-700 rounded-2xl shadow-lg p-8 text-center text-white">
            <h3 className="text-pink-200 text-xs uppercase tracking-widest font-bold mb-2">Salary Package</h3>
            <p className="text-3xl font-light italic">900 – 1100 €</p>
            <div className="mt-4 pt-4 border-t border-slate-600 text-xs text-slate-300">
               Company Provided Food & Accommodation
            </div>
          </section>
        </div>

        {/* Job Details Logistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-[#fce4ec]/20 border border-pink-100 p-8 rounded-2xl">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest mb-3">Duty Hours</h3>
            <p className="text-slate-600 text-lg">8 Hours <span className="text-pink-400 font-bold">+</span> Overtime</p>
            <p className="text-slate-500 text-sm italic">5 to 6 Days per week</p>
          </div>

          <div className="bg-[#fce4ec]/20 border border-pink-100 p-8 rounded-2xl">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest mb-3">Timeline</h3>
            <p className="text-slate-600 text-lg">TRC: 3 – 4 Months</p>
            <p className="text-slate-500 text-sm italic">Total Processing: 6 Months</p>
          </div>
        </div>

        {/* Service Charge Section */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 p-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">Service Charge</h2>
              <p className="text-slate-400 text-sm font-medium italic">Complete Legal & Documentation Fees</p>
            </div>
            <div className="bg-pink-100/10 px-6 py-2 rounded-full border border-pink-300/30">
              <span className="text-2xl font-bold text-pink-300">35,000 <span className="text-sm font-normal">QAR</span></span>
            </div>
          </div>
          
          <div className="p-8 bg-white">
            <div className="space-y-3">
              {PAYMENTS.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-pink-200 transition-colors">
                  <span className="text-slate-600 font-medium">{item.label}</span>
                  <span className="text-lg font-bold text-slate-800">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="text-center text-slate-400 text-xs tracking-widest uppercase py-6">
          Portugal Agricultural Programs • Official Intake 2026
        </footer>
      </div>
    </div>
  );
};

export default WpPortugal;