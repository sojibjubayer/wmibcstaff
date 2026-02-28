import React from "react";

const JOBS = ["Cleaner", "Vegetable Worker"];

const PAYMENTS = [
  { label: "1st Payment (With Documents)", amount: "3,000" },
  { label: "2nd Payment (After Work Permit)", amount: "4,000" },
  { label: "3rd Payment (After Visa Approval)", amount: "15,000" },
];

const WpNorthMacedonia = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="bg-linear-to-br from-[#fce4ec] to-[#f8bbd0] rounded-3xl shadow-sm border border-pink-100 p-10 text-center relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>
          
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-800">
            North Macedonia <span className="font-light italic text-slate-700">Work Visa</span>
          </h1>
          <p className="mt-3 text-slate-600 text-lg font-medium tracking-wide">
            Industrial Cleaning & Agricultural Sector
          </p>
        </header>

        {/* Positions & Salary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Position Section */}
          <section className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-pink-400 mb-6">Available Positions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {JOBS.map((job, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-6 rounded-2xl bg-slate-50 border border-slate-100 font-semibold text-slate-700 hover:bg-[#fce4ec]/30 transition-all duration-300"
                >
                  {job}
                </div>
              ))}
            </div>
          </section>

          {/* Salary Section */}
          <section className="bg-slate-700 rounded-2xl shadow-lg p-8 text-center text-white flex flex-col justify-center">
            <h3 className="text-pink-200 text-xs uppercase tracking-widest font-bold mb-2">Monthly Salary</h3>
            <p className="text-4xl font-light italic">700 €</p>
            <p className="mt-4 text-[10px] uppercase tracking-wider text-slate-400 leading-tight">
               Includes Company Provided <br/> Food & Housing
            </p>
          </section>
        </div>

        {/* Logistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm flex flex-col items-center sm:items-start">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest mb-3 border-b border-pink-100 pb-2 w-full">Duty Hours</h3>
            <p className="text-slate-600 font-medium">8 Hours + Overtime</p>
            <p className="text-slate-400 text-sm italic">5 Days per week</p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm flex flex-col items-center sm:items-start">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest mb-3 border-b border-pink-100 pb-2 w-full">Timeline</h3>
            <p className="text-slate-600 font-medium">TRC: 3 Months</p>
            <p className="text-slate-400 text-sm italic">5 – 6 Months Processing</p>
          </div>
        </div>

        {/* Pricing Section */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 p-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">Service Charge</h2>
              <p className="text-slate-400 text-sm italic">Secure Payment Milestones</p>
            </div>
            <div className="text-3xl font-light text-pink-300">
              22,000 <span className="text-sm text-slate-500 font-bold uppercase">QAR</span>
            </div>
          </div>
          
          <div className="p-8">
            <div className="space-y-4">
              {PAYMENTS.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-[#fafafa] border-l-4 border-pink-200 hover:bg-white transition-colors">
                  <span className="text-slate-600 font-medium">{item.label}</span>
                  <div className="text-right">
                    <span className="text-slate-900 font-bold">{item.amount}</span>
                    <span className="ml-1 text-[10px] text-slate-400 font-bold uppercase">QAR</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="text-center text-slate-400 text-[10px] tracking-[0.3em] uppercase py-6">
          North Macedonia Placement Program • 2026
        </footer>
      </div>
    </div>
  );
};

export default WpNorthMacedonia;