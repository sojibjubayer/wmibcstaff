import React from "react";

const JOBS = ["Hospitality", "Construction Worker", "Housekeeping", "Helper"];

const PAYMENTS = [
  { label: "1st Payment (With Documents)", amount: "2,500" },
  { label: "2nd Payment (After Work Permit)", amount: "5,000" },
  { label: "3rd Payment (After Visa)", amount: "22,500" },
];

const WpBulgaria = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="bg-linear-to-br from-[#fce4ec] to-[#f8bbd0] rounded-3xl shadow-sm border border-pink-100 p-10 text-center relative overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-40 h-40 bg-white/30 rounded-full blur-3xl"></div>
          
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-800">
            Bulgaria <span className="font-light italic text-slate-700">Work Visa</span>
          </h1>
          <p className="mt-3 text-slate-600 text-lg font-medium tracking-wide">
            Skilled & General Labor Opportunities
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Content: Positions */}
          <section className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-pink-400 mb-6 flex items-center gap-2">
              Available Positions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {JOBS.map((job, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 rounded-xl border border-slate-50 bg-[#fafafa] hover:bg-[#fce4ec]/20 transition-all duration-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-300 mr-3"></span>
                  <span className="font-medium text-slate-700">{job}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Sidebar: Salary & Bonus */}
          <div className="space-y-6">
            <section className="bg-slate-700 text-white rounded-2xl shadow-lg p-7 text-center">
              <h3 className="text-pink-200 text-xs uppercase tracking-widest font-bold mb-2">Salary Package</h3>
              <p className="text-3xl font-light italic">700 – 900 €</p>
              <div className="mt-4 pt-4 border-t border-slate-600 text-[11px] text-slate-400 uppercase tracking-tighter">
                Food & Accommodation Provided
              </div>
            </section>

            <section className="bg-[#fce4ec]/20 border border-pink-100 rounded-2xl p-7 space-y-4">
              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-widest">Duty Hours</h4>
                <p className="text-slate-600 text-sm mt-1">8 Hrs + OT | 5-6 Days</p>
              </div>
              <div className="pt-4 border-t border-pink-100">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-widest">Processing</h4>
                <p className="text-slate-600 text-sm mt-1">6 – 8 Months Total</p>
              </div>
            </section>
          </div>
        </div>

        {/* Pricing Table */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 p-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">Service Charge</h2>
              <p className="text-slate-400 text-sm font-medium italic">Excluding Air Ticket</p>
            </div>
            <div className="bg-white/5 px-6 py-2 rounded-full border border-pink-300/30">
              <span className="text-2xl font-bold text-pink-200">30,000 <span className="text-sm font-normal text-slate-400 uppercase">QAR</span></span>
            </div>
          </div>
          
          <div className="p-8">
            <div className="space-y-3">
              {PAYMENTS.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 font-medium">{item.label}</span>
                  <span className="text-lg font-bold text-slate-800">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="text-center text-slate-400 text-[10px] tracking-[0.3em] uppercase py-6">
          Bulgaria Employment Division • Intake 2026
        </footer>
      </div>
    </div>
  );
};

export default WpBulgaria;