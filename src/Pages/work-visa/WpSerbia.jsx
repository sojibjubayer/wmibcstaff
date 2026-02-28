import React from "react";

const JOBS = ["Construction", "Cleaner", "Warehouse", "Tile Mason"];

const PAYMENTS = [
  { label: "1st Payment (With Documents)", amount: "1,500" },
  { label: "2nd Payment (After Online Approval)", amount: "2,000" },
  { label: "3rd Payment (After Visa Approval)", amount: "9,000" },
  { label: "4th Payment (After Visa Stamping)", amount: "8,500" },
];

const WpSerbia = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="bg-linear-to-br from-[#fce4ec] to-[#f8bbd0] rounded-3xl shadow-sm border border-pink-100 p-10 text-center relative overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-56 h-56 bg-white/20 rounded-full blur-3xl"></div>
          
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-800">
            Serbia <span className="font-light italic text-slate-700">Work Visa</span>
          </h1>
          <p className="mt-3 text-slate-600 text-lg font-medium tracking-wide">
            Construction, Logistics & Maintenance Sectors
          </p>
        </header>

        {/* Positions & Salary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Position Section */}
          <section className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-pink-400 mb-6">Available Roles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {JOBS.map((job, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 rounded-xl border border-slate-100 bg-[#fafafa] hover:bg-[#fce4ec]/20 transition-all duration-300"
                >
                  <div className="w-2 h-2 rounded-full bg-pink-300 mr-3"></div>
                  <span className="font-medium text-slate-700">{job}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Salary Section */}
          <section className="bg-slate-700 rounded-2xl shadow-lg p-8 text-center text-white flex flex-col justify-center">
            <h3 className="text-pink-200 text-xs uppercase tracking-widest font-bold mb-2">Salary Package</h3>
            <p className="text-3xl font-light italic">550 – 650 €</p>
            <div className="mt-4 pt-4 border-t border-slate-600 text-[10px] text-slate-400 uppercase tracking-widest">
               Food & Accommodation <br/> Included
            </div>
          </section>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-[#fce4ec]/10 border border-pink-100 p-8 rounded-2xl flex flex-col justify-center">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-2">Duty Hours</h4>
            <p className="text-slate-600">8 Hours + Overtime</p>
            <p className="text-slate-400 text-sm italic">5 Days per week</p>
          </div>

          <div className="bg-[#fce4ec]/10 border border-pink-100 p-8 rounded-2xl flex flex-col justify-center">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-2">Processing</h4>
            <p className="text-slate-600">TRC: 3 Months</p>
            <p className="text-slate-400 text-sm italic">5 – 6 Months Total Time</p>
          </div>
        </div>

        {/* Service Charge Section */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 p-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">Service Charge</h2>
              <p className="text-slate-400 text-sm italic">21,000 QAR Total Investment</p>
            </div>
            <div className="px-6 py-2 rounded-full border border-pink-300/30 bg-white/5">
              <span className="text-2xl font-bold text-pink-300">21,000 <span className="text-sm font-normal text-slate-500">QAR</span></span>
            </div>
          </div>
          
          <div className="p-8">
            <div className="space-y-3">
              {PAYMENTS.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-pink-200 transition-colors">
                  <span className="text-slate-600 font-medium text-sm sm:text-base">{item.label}</span>
                  <div className="text-right">
                    <span className="text-slate-900 font-bold">{item.amount}</span>
                    <span className="ml-1 text-[10px] text-slate-400 font-bold">QAR</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="text-center text-slate-400 text-[10px] tracking-[0.4em] uppercase py-8">
          Serbia Recruitment Division • 2026
        </footer>
      </div>
    </div>
  );
};

export default WpSerbia;