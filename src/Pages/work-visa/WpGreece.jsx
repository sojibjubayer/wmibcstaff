import React from "react";
import {
  Briefcase,
  Clock,
  Wallet,
  CheckCircle2,
  Globe,
  MapPin,
  Plane,
  ShieldCheck,
} from "lucide-react";

const JOBS = [
  // From Greece Demand Letter
  "General Construction Labour",
  "Steel Fixer",
  "Shuttering / Framework Carpenter",
  "Concrete Worker",
  "Construction Electrician",
  "Plumber",
  "Drywall Installer / Gypsum Board Worker",
  "Tile Mason / Marble Worker",
  "Painter",
  "Aluminium & Metal Construction Technician",

  // Previous positions
  "Cleaner",
  "Dish Washer",
  "Kitchen Helper",
  "Waiter",
  "Barista",
  "Housekeeping",
  "Chef",
  "Construction Worker",
  "Warehouse Worker",
  "General Labor",
];

const SERVICE_CHARGES = [
  {
    title: "Bangladeshi & Pakistani Applicants",
    icon: Globe,
    payments: [
      ["1st Payment (With Docs)", "2,500", "QAR"],
      ["2nd Payment (After Permit)", "5,000", "QAR"],
      ["3rd Payment (After Visa)", "22,500", "QAR"],
    ],
    total: "30,000",
    currency: "QAR",
  },
  {
    title: "Nepali, Indian & Sri Lankan Applicants",
    icon: MapPin,
    payments: [
      ["1st Payment (With Docs)", "2,000", "QAR"],
      ["2nd Payment (After Permit)", "4,000", "QAR"],
      ["3rd Payment (After Visa)", "11,000", "QAR"],
    ],
    total: "17,000",
    currency: "QAR",
  },
];

const WpGreece = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-blue-100">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="relative bg-linear-to-br from-[#f0fdf4] via-[#f0f9ff] to-[#e0f2fe] rounded-[2.5rem] shadow-sm border border-blue-100 p-10 text-center overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/40 rounded-full blur-3xl" />

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-800 italic">
            Greece{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-slate-800">
              Work Visa
            </span>
          </h1>

          <p className="mt-4 text-slate-500 text-lg font-medium tracking-wide">
            Professional Recruitment & Documentation
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Positions */}
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-xs border border-slate-200/80 p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Briefcase size={16} className="text-blue-500" />
              Available Positions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {JOBS.map((job, index) => (
                <div
                  key={index}
                  className="group flex items-center p-4 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-white hover:border-blue-200 hover:shadow-xs transition-all duration-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-4 shrink-0 transition-transform group-hover:scale-125" />
                  <span className="font-semibold text-slate-600 transition-colors group-hover:text-slate-900">{job}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Right: Sidebar Info */}
          <aside className="space-y-6">
            <section className="bg-slate-800 text-white rounded-3xl shadow-lg p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2 text-blue-300 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} /> Salary Package
              </div>

              <p className="text-3xl font-light italic text-blue-50">800 – 1200 €</p>

              <div className="mt-6 space-y-3 text-sm text-slate-300 border-t border-slate-700/80 pt-5">
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-400" />
                  Food & Accommodation
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-400" />8 Hrs + OT | 6 Days
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-400" />2 Years Renewable Contract
                </p>
              </div>
            </section>

            <section className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                    Processing Time
                  </h4>
                  <p className="text-slate-800 font-semibold text-sm">6–8 Months</p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* SERVICE CHARGE */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="bg-slate-50/50 px-10 py-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Service Charge Breakdown
              </h2>
              <p className="text-slate-400 text-xs mt-1 uppercase tracking-[0.2em] font-bold">
                Includes Air Ticket & Documentation
              </p>
            </div>

            <div className="px-4 py-1.5 bg-white rounded-full border border-slate-200 text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
              <ShieldCheck size={12} className="text-blue-500" />
              Verified Process
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {SERVICE_CHARGES.map(({ title, icon: Icon, payments, total, currency }) => (
              <div key={title} className="p-10 bg-white group">
                <div className="flex items-center gap-3 mb-10">
                  <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                    <Icon size={20} className="text-slate-400 group-hover:text-blue-600" />
                  </div>
                  <span className="font-bold text-slate-800 tracking-wider uppercase text-xs">
                    {title}
                  </span>
                </div>

                {payments.map(([label, amount, paymentCurrency]) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-dashed border-slate-50 last:border-b-0">
                    <span className="text-slate-500 text-sm font-medium">{label}</span>
                    <span className="text-lg font-bold text-slate-800">
                      {amount}{" "}
                      <span className="text-[10px] text-slate-400 font-semibold">
                        {paymentCurrency}
                      </span>
                    </span>
                  </div>
                ))}

                <div className="mt-8 p-6 bg-blue-50/20 rounded-2xl border-2 border-dashed border-blue-100 group-hover:border-blue-200 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                      Total Payable
                    </span>
                    <span className="text-3xl font-black text-slate-800">
                      {total}{" "}
                      <span className="text-sm font-bold text-blue-500">
                        {currency}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="md:col-span-2 p-6 font-bold text-sm text-center text-slate-500 bg-slate-50/40 border-t border-slate-100">
              Bangladeshi, Pakistani: 30k | Nepali, Indian, Sri Lankan: 17k
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8">
          <div className="flex justify-center items-center gap-4 text-slate-200 mb-4">
            <Plane size={16} className="text-slate-300" />
            <div className="h-px w-12 bg-slate-200" />
            <ShieldCheck size={16} className="text-slate-300" />
          </div>
          <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase">
            © 2026 Greek Career Transitions
          </p>
        </footer>
      </div>
    </div>
  );
};

export default WpGreece;