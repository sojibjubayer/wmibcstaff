import React from "react";

const JOBS = [
  "Front Office & Sales Manager", "Housekeeping / Maid", "Receptionist",
  "Night Receptionist", "Maintenance / Handyman", "Driver",
  "Kitchen Assistant", "Assistant Cook", "Bartender",
  "Assistant Bartender", "Restaurant Host", "General Laborer",
  "Electrician", "Tiles Mason", "Gypsum"
];

const PAYMENTS = [
  { label: "1st Payment (With Documents)", amount: "2,000" },
  { label: "2nd Payment (After Work Permit)", amount: "3,500" },
  { label: "3rd Payment (After Visa)", amount: "16,000" },
];

const WpMontenegro = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfc] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section - Deep Gray & Rose Accent */}
        <header className="bg-slate-800 rounded-3xl shadow-xl p-10 text-center relative overflow-hidden">
          {/* Subtle Pink Glow behind text */}
          <div className="absolute inset-0 bg-[#fce4ec] opacity-5 pointer-events-none"></div>
          
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Montenegro <span className="text-pink-300 font-light">Work Visa</span>
          </h1>
          <p className="mt-4 text-slate-300 text-lg sm:text-xl uppercase tracking-[0.2em] font-medium">
            Seasonal/Non-Seasonal Hospitality Program
          </p>
        </header>

        {/* Hiring Positions - Grid with Rose highlights */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-8 border-b border-slate-50 pb-6">
            <h2 className="text-2xl font-semibold text-slate-800">Available Vacancies</h2>
            <span className="text-pink-400 text-sm font-bold tracking-widest uppercase mt-2 sm:mt-0">Join the Service Sector</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {JOBS.map((job, index) => (
              <div
                key={index}
                className="group flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-transparent hover:border-pink-200 hover:bg-[#fff5f8] transition-all duration-300"
              >
                <span className="font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                  {job}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-pink-400"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Salary & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Salary Card */}
          <section className="lg:col-span-1 bg-[#fce4ec]/40 border border-pink-100 rounded-3xl p-8 flex flex-col justify-center text-center">
            <h3 className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-2">Monthly Compensation</h3>
            <p className="text-4xl font-light text-slate-800 italic">1000 €</p>
            <p className="mt-4 text-sm text-slate-600 font-medium bg-white/60 py-2 rounded-full border border-pink-50">
              + Full Food & Housing
            </p>
          </section>

          {/* Logistics Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-pink-400 italic">01</div>
              <h4 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Duty Schedule</h4>
              <p className="text-slate-600">9 Hours + Overtime<br/><span className="text-pink-400">6 Days Per Week</span></p>
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-pink-400 italic">02</div>
              <h4 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Processing</h4>
              <p className="text-slate-600">TRC: 3 Months<br/><span className="text-pink-400">Total: 6 Months</span></p>
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <section className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 sm:p-12 flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-slate-800">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white">Service Charge</h2>
              <p className="text-slate-400 mt-1">Total investment for Montenegro placement</p>
            </div>
            <div className="text-3xl font-light text-pink-300 tracking-wider">
              21,500 <span className="text-sm text-slate-500 uppercase">QAR</span>
            </div>
          </div>
          
          <div className="p-8 sm:p-12 bg-slate-800/50">
            <div className="max-w-2xl mx-auto space-y-4">
              {PAYMENTS.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-4 border-b border-slate-700 last:border-0">
                  <span className="text-slate-300 text-sm sm:text-base">{item.label}</span>
                  <span className="text-white font-bold tracking-tight">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="text-center pb-10">
          <p className="text-slate-400 text-xs tracking-widest uppercase italic">
            Montenegro • Non-Seasonal / Seasonal Employment • 2026
          </p>
        </footer>
      </div>
    </div>
  );
};

export default WpMontenegro;