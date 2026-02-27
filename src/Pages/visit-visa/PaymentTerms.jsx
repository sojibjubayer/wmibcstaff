import React from "react";

export default function PaymentTerms() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">
            Payment Terms & Commission Structure
          </h1>
          <div className="w-24 h-1 bg-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Visit Visa Payments */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="bg-slate-800 text-white px-6 py-4 font-semibold text-lg">
            Visit Visa Payments
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="bg-pink-50 text-slate-700 uppercase text-xs tracking-wider">
                  <th className="p-4 text-left">Package</th>
                  <th className="p-4 text-left">Details</th>
                  <th className="p-4 text-left">Total (QAR)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-100 hover:bg-slate-50 transition">
                  <td className="p-4 font-semibold">Standard Processing</td>
                  <td className="p-4 text-slate-600">
                    Standard processing (no additional services)
                  </td>
                  <td className="p-4 font-bold text-pink-600">500</td>
                </tr>

                <tr className="border-t border-slate-100 hover:bg-slate-50 transition">
                  <td className="p-4 font-semibold">Comprehensive Visa Support</td>
                  <td className="p-4 text-slate-600">
                    Insurance + Dummy Ticket + Hotel + VFS/BLS Fee (Excludes Embassy Fee)
                  </td>
                  <td className="p-4 font-bold text-pink-600">1000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Commission Structure */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="bg-slate-800 text-white px-6 py-4 font-semibold text-lg">
            Commission Structure
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="bg-pink-50 text-slate-700 uppercase text-xs tracking-wider">
                  <th className="p-4 text-left">Sale Amount (QAR)</th>
                  <th className="p-4 text-left">Commission</th>
                </tr>
              </thead>
              <tbody>
                {[500, 1000, 1500, 2000].map((amount, i) => (
                  <tr
                    key={i}
                    className="border-t border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="p-4 font-semibold">{amount}</td>
                    <td className="p-4 font-bold text-pink-600">
                      {amount / 100}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Special Cases */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="bg-slate-800 text-white px-6 py-4 font-semibold text-lg">
            Special Cases
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="bg-pink-50 text-slate-700 uppercase text-xs tracking-wider">
                  <th className="p-4 text-left">Country</th>
                  <th className="p-4 text-left">Total Charge</th>
                  <th className="p-4 text-left">1st Payment</th>
                  <th className="p-4 text-left">After Visa</th>
                  <th className="p-4 text-left">Non-Refundable</th>
                  <th className="p-4 text-left">Commission</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-100 hover:bg-slate-50 transition">
                  <td className="p-4 font-semibold">Spain</td>
                  <td className="p-4">20000</td>
                  <td className="p-4">2000</td>
                  <td className="p-4">18000</td>
                  <td className="p-4 text-pink-600 font-semibold">1000</td>
                  <td className="p-4 font-bold text-slate-700">
                    10% (If Visa Success)
                  </td>
                </tr>

                <tr className="border-t border-slate-100 hover:bg-slate-50 transition">
                  <td className="p-4 font-semibold">UK</td>
                  <td className="p-4">35000</td>
                  <td className="p-4">5000</td>
                  <td className="p-4">30000</td>
                  <td className="p-4 text-pink-600 font-semibold">1500</td>
                  <td className="p-4">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}