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
    <div className="min-h-screen bg-[#fafafa] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <header className="bg-linear-to-br from-[#fce4ec] to-[#f8bbd0] rounded-3xl shadow-sm border border-pink-100 p-10 text-center relative overflow-hidden">
          <div className="absolute bottom-[-10%] right-[-5%] w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-800">
            Moldova <span className="font-light italic text-slate-700">Work Visa</span>
          </h1>
          <p className="mt-3 text-slate-600 text-lg font-medium tracking-wide">
            Two Different Company Opportunities
          </p>
        </header>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {COMPANIES.map((company, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col"
            >
              {/* Top */}
              <div className="bg-slate-800 p-8 text-white">
                <p className="text-pink-200 text-xs uppercase tracking-widest font-bold mb-2">
                  Opportunity {index + 1}
                </p>
                <h2 className="text-2xl font-bold leading-snug">{company.title}</h2>
                <p className="mt-2 text-slate-300 text-sm">{company.subtitle}</p>
              </div>

              {/* Body */}
              <div className="p-8 space-y-6">
                {/* Salary */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center">
                  <h3 className="text-pink-400 text-xs uppercase tracking-widest font-bold mb-2">
                    Monthly Salary
                  </h3>
                  <p className="text-3xl font-light italic text-slate-800">{company.salary}</p>
                  <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
                    {company.benefits}
                  </p>
                </div>

                {/* Process Time */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest mb-3 border-b border-pink-100 pb-2">
                    Process Time
                  </h3>
                  <p className="text-slate-600 font-medium">{company.processTime}</p>
                  {company.processSub && (
                    <p className="text-slate-400 text-sm italic mt-1">{company.processSub}</p>
                  )}
                </div>

                {/* Payment */}
                <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800">{company.paymentTitle}</h3>
                    <p className="text-sm text-slate-500 mt-1">{company.paymentNote}</p>
                  </div>

                  <div className="p-6 space-y-4">
                    {company.payments.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#fafafa] border-l-4 border-pink-200"
                      >
                        <div className="flex justify-between items-center gap-4">
                          <span className="text-slate-600 text-sm sm:text-base">{item.label}</span>
                          <span className="text-slate-900 font-bold text-right">{item.amount}</span>
                        </div>
                        {item.note && (
                          <p className="text-xs text-slate-400 italic mt-2">{item.note}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Extra Note */}
                {company.extraNote && (
                  <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 mb-2">
                      Important Note
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{company.extraNote}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <footer className="text-center text-slate-400 text-[10px] tracking-[0.3em] uppercase py-4">
          Moldova Employment Intake • 2026
        </footer>
      </div>
    </div>
  );
};

export default WpMoldova;