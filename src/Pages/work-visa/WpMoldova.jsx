import React from "react";

const COMPANIES = [
  {
    title: "Taxi Driver / Construction Jobs",
    subtitle: "Crane Operator / Excavator / Forklift Operator",
    salary: "600 - 800 €",
    benefits: "Accommodation + Food Allowance by Company",
    processTime: "4 to 5 Months",
    paymentTitle: "Payment Details",
    paymentNote: "Total Payment: 30,000 Riyal including air ticket and passport DHL charge",
    payments: [
      { label: "Initial Payment", amount: "3000 Riyal" },
      {
        label: "After Permit",
        amount: "4000 Riyal",
        note: "Passport will be sent directly to Moldova / Romania for stamping",
      },
      { label: "Rest Payment", amount: "After Visa" },
    ],
    extraNote: "",
  },
  {
    title: "Warehouse / Factory Jobs",
    subtitle: "Tissue Factory / Agriculture / Electronics / Mechanical",
    salary: "600 - 800 €",
    benefits: "Moldova Work Opportunity",
    processTime: "4 Months",
    processSub: "3 months e-approval + 1 month e-visa",
    paymentTitle: "Payment Details",
    paymentNote: "Total Payment: 30,000 Riyal including embassy fees, excluding ticket",
    payments: [
      { label: "With File", amount: "500 Euro" },
      { label: "After Approval", amount: "1000 Euro", note: "Moldova permit approval" },
      { label: "Rest Payment", amount: "After Stamping" },
    ],
    extraNote:
      "No need to face embassy. Authorization will be given on behalf of applicant and our agent will complete stamping from embassy.",
  },
];

const WpMoldova = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-blue-100">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <header className="relative bg-linear-to-br from-[#f0f9ff] via-white to-[#e0f2fe] rounded-[2.5rem] shadow-sm border border-blue-100 p-10 text-center overflow-hidden">
          {/* Decorative Premium Glow Elements */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl"></div>

          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-slate-800 italic">
            Moldova{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-slate-800">
              Work Visa
            </span>
          </h1>
          <p className="mt-3 text-slate-500 text-lg font-medium tracking-wide uppercase">
            Two Different Company Opportunities
          </p>
        </header>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {COMPANIES.map((company, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col justify-between"
            >
              {/* Top Section */}
              <div className="bg-slate-800 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 rounded-full blur-xl pointer-events-none" />
                <p className="text-blue-300 text-xs uppercase tracking-widest font-bold mb-2">
                  Opportunity {index + 1}
                </p>
                <h2 className="text-2xl font-bold leading-snug tracking-tight">{company.title}</h2>
                <p className="mt-2 text-slate-300 text-xs font-medium uppercase tracking-wider">{company.subtitle}</p>
              </div>

              {/* Body Content */}
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Salary Card */}
                  <div className="bg-blue-50/20 border border-blue-100 rounded-2xl p-6 text-center">
                    <h3 className="text-blue-500 text-xs uppercase tracking-widest font-bold mb-2">
                      Monthly Salary
                    </h3>
                    <p className="text-3xl font-black text-slate-800 tracking-tight">{company.salary}</p>
                    <p className="mt-3 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                      {company.benefits}
                    </p>
                  </div>

                  {/* Processing Timeline */}
                  <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
                    <h3 className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-3 border-b border-blue-50 pb-2">
                      Process Time
                    </h3>
                    <p className="text-slate-700 font-bold text-base">{company.processTime}</p>
                    {company.processSub && (
                      <p className="text-slate-400 text-xs italic mt-1">{company.processSub}</p>
                    )}
                  </div>

                  {/* Payment Breakdown */}
                  <section className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200/60">
                      <h3 className="text-base font-bold text-slate-800">{company.paymentTitle}</h3>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">{company.paymentNote}</p>
                    </div>

                    <div className="p-5 space-y-4 bg-white">
                      {company.payments.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-slate-50/50 border-l-4 border-blue-400 transition-colors hover:bg-blue-50/10"
                        >
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-slate-600 font-semibold text-sm">{item.label}</span>
                            <span className="text-slate-800 font-black text-sm text-right">{item.amount}</span>
                          </div>
                          {item.note && (
                            <p className="text-[11px] text-slate-400 italic mt-1.5 leading-relaxed">{item.note}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Extra Notes Optional Module */}
                {company.extraNote && (
                  <div className="mt-6 bg-blue-50/40 border border-blue-100 rounded-2xl p-5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
                      Important Note
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{company.extraNote}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <footer className="text-center text-slate-400 text-[10px] tracking-[0.4em] uppercase py-6">
          Moldova Employment Intake • 2026
        </footer>
      </div>
    </div>
  );
};

export default WpMoldova;