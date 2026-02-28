import React from "react";

const JOBS = [
  "Cleaner", "Dish Washer", "Kitchen Helper", "Waiter",
  "Barista", "Housekeeping", "Chef", "Construction Worker",
  "Warehouse Worker", "General Labor"
];

const PAYMENTS = [
  { label: "1st Payment (With Documents)", amount: "2,500" },
  { label: "2nd Payment (After Work Permit)", amount: "5,000" },
  { label: "3rd Payment (After Visa)", amount: "22,500" },
];

const WpGreece = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Section - Soft Pink Gradient */}
        <header className="relative bg-linear-to-br from-[#fce4ec] to-[#f8bbd0] rounded-3xl shadow-sm border border-pink-100 p-10 text-center overflow-hidden">
          {/* Decorative element */}
          <div className="absolute -top-5 -right-5 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
          
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-slate-800 italic">
            Greece <span className="font-bold not-italic">Work Visa</span>
          </h1>
          <p className="mt-3 text-slate-600 text-lg font-medium">
            Bridging Opportunities Between Continents
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Content: Positions */}
          <section className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-lg font-semibold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-3">
              Available Positions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {JOBS.map((job, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 rounded-lg border border-slate-100 bg-[#fafafa] hover:bg-[#fce4ec]/30 transition-colors duration-300"
                >
                  <div className="w-2 h-2 rounded-full bg-pink-300 mr-3"></div>
                  <span className="font-medium text-slate-700">{job}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Sidebar: Quick Details */}
          <div className="space-y-6">
            <section className="bg-slate-700 text-white rounded-2xl shadow-lg p-7">
              <h3 className="text-xs uppercase tracking-widest font-bold text-pink-200">Salary Package</h3>
              <p className="text-3xl font-light mt-2 italic">800 – 1200 €</p>
              <div className="mt-6 space-y-2 text-sm text-slate-300 border-t border-slate-600 pt-4">
                <p>• Food Provided</p>
                <p>• Accommodation Included</p>
              </div>
            </section>

            <section className="bg-[#fce4ec]/20 border border-pink-100 rounded-2xl p-7 space-y-5">
              <div>
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Duty Hours</h4>
                <p className="text-slate-600 mt-1">8 Hrs + OT | 6 Days</p>
              </div>
              <div className="pt-4 border-t border-pink-100">
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Processing Time</h4>
                <p className="text-slate-600 mt-1">6 – 8 Months</p>
              </div>
            </section>
          </div>
        </div>

        {/* Pricing Table */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-[#f1f3f5] p-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Total Service Charge</h2>
              <p className="text-slate-500 text-sm italic">Including Air Ticket & Documentation</p>
            </div>
            <div className="bg-white px-6 py-2 rounded-full border border-pink-200 shadow-sm">
              <span className="text-2xl font-bold text-slate-800">30,000 <span className="text-sm font-normal text-pink-400">QAR</span></span>
            </div>
          </div>
          
          <div className="p-8">
            <div className="space-y-4">
              {PAYMENTS.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 rounded-xl border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="text-lg font-semibold text-slate-800">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="text-center text-slate-400 text-xs tracking-widest uppercase">
          © 2026 Greek Career Transitions
        </footer>
      </div>
    </div>
  );
};

export default WpGreece;