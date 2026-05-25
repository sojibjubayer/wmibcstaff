import React from "react";
import {
  Briefcase,
  Clock,
  Wallet,
  CheckCircle2,
  Globe,
  Plane,
  ShieldCheck,
} from "lucide-react";

const JOBS = [
  "Welder Mig/Tig/4G/5G (Age limit 40)",
  "General Worker (Age limit 35)",
];

const WpBulgaria = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfd] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-pink-100">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="relative bg-linear-to-br from-[#fdf2f8] to-[#fce4ec] rounded-[2.5rem] shadow-sm border border-pink-100 p-10 text-center overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/40 rounded-full blur-3xl"></div>

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-800 italic">
            Bulgaria{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-slate-800">
              Work Visa
            </span>
          </h1>

          <p className="mt-4 text-slate-500 text-lg font-medium tracking-wide">
            Skilled & General Worker Opportunities
          </p>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side */}
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Briefcase size={16} className="text-pink-400" />
              Available Positions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {JOBS.map((job, index) => (
                <div
                  key={index}
                  className="group flex items-center p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-pink-200 transition-all duration-300"
                >
                  <div className="w-2 h-2 rounded-full bg-pink-400 mr-4"></div>

                  <span className="font-semibold text-slate-700 text-sm">
                    {job}
                  </span>
                </div>
              ))}
            </div>

            {/* Process Details */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50/50">
                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-2">
                  Processing Time
                </p>

                <p className="text-xl font-bold text-slate-800">
                  Max 3 Months
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50/50">
                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-2">
                  Permit Timeline
                </p>

                <p className="text-xl font-bold text-slate-800">
                  Within 1 Month
                </p>
              </div>
            </div>
          </section>

          {/* Right Side */}
          <aside className="space-y-6">
            
            {/* Package */}
            <section className="bg-slate-700 text-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center gap-2 text-pink-200 mb-2 font-bold text-xs uppercase tracking-widest">
                <Wallet size={16} />
                Total Package
              </div>

              <p className="text-4xl font-black text-white">
                27,000{" "}
                <span className="text-lg font-medium text-pink-200">
                  QAR
                </span>
              </p>

              <p className="mt-2 text-sm text-slate-300">
                Without Air Ticket
              </p>

              <div className="mt-6 space-y-3 text-sm text-slate-300 border-t border-slate-600 pt-5">
      
                <p className="flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-pink-400"
                  /> 
                  Applicant Will Submit From India
                </p>

                <p className="flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-pink-400"
                  />
                  Work Permit Assistance
                </p>
              </div>
            </section>

            {/* Timeline */}
            <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-pink-50 p-2 rounded-lg text-pink-500">
                  <Clock size={18} />
                </div>

                <div>
                  <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                    Visa Timeline
                  </h4>

                  <p className="text-slate-800 font-medium text-sm">
                    Fast Process
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* Payment Breakdown */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
          
          <div className="bg-slate-50/50 px-10 py-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Payment Breakdown
              </h2>

              <p className="text-slate-400 text-xs mt-1 uppercase tracking-[0.2em] font-bold">
                Bulgaria Work Permit Process
              </p>
            </div>

            <div className="px-4 py-1.5 bg-white rounded-full border border-slate-200 text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
              <ShieldCheck
                size={12}
                className="text-pink-400"
              />
              Verified Intake
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="space-y-6 max-w-3xl mx-auto">
              
              {/* First Payment */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 py-5 border-b border-slate-100">
                <div>
                  <p className="text-slate-800 font-semibold text-lg">
                    First Payment
                  </p>

                  <p className="text-sm text-slate-400">
                    Documentation Processing
                  </p>
                </div>

                <span className="text-3xl font-black text-slate-800">
                  1,500{" "}
                  <span className="text-sm text-pink-400">
                    QAR
                  </span>
                </span>
              </div>

              {/* Second Payment */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 py-5 border-b border-slate-100">
                <div>
                  <p className="text-slate-800 font-semibold text-lg">
                    After Permit
                  </p>

                  <p className="text-sm text-slate-400">
                    Permit Received Within 1 Month
                  </p>
                </div>

                <span className="text-3xl font-black text-slate-800">
                  5,000{" "}
                  <span className="text-sm text-pink-400">
                    QAR
                  </span>
                </span>
              </div>

              {/* Remaining */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 py-5">
                <div>
                  <p className="text-slate-800 font-semibold text-lg">
                    Remaining Payment
                  </p>

                  <p className="text-sm text-slate-400">
                    After Visa Approval
                  </p>
                </div>

                <span className="text-3xl font-black text-slate-800">
                  20,500{" "}
                  <span className="text-sm text-pink-400">
                    QAR
                  </span>
                </span>
              </div> 

              {/* Total */}
              <div className="mt-10 p-6 sm:p-8 bg-pink-50/30 rounded-3xl border-2 border-dashed border-pink-100">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <span className="text-[11px] font-black text-pink-500 uppercase tracking-widest">
                    Total Payable
                  </span>

                  <span className="text-4xl sm:text-5xl font-black text-slate-800">
                    27,000{" "}
                    <span className="text-base sm:text-lg font-bold text-pink-400">
                      QAR
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8">
          <div className="flex justify-center items-center gap-4 text-slate-300 mb-4">
            <Plane size={16} />

            <div className="h-px w-12 bg-slate-100"></div>

            <Globe size={16} />
          </div>

          <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase">
            © 2026 Bulgaria Recruitment Division
          </p>
        </footer>
      </div>
    </div>
  );
};

export default WpBulgaria;