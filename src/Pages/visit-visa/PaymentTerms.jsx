import React from "react";

export default function PaymentTerms() {
  return (
    <div className="min-h-screen bg-white text-black p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-2xl sm:text-3xl font-bold border-b-2 border-black pb-2">
          Payment Terms & Commission Structure
        </h1>

        {/* Visit Visa Payments */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Visit Visa Payments</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-black border-collapse text-xs sm:text-sm md:text-base">
              <thead>
                <tr className="bg-black text-white">
                  <th className="border border-black p-3 text-left">Package</th>
                  <th className="border border-black p-3 text-left">Details</th>
                  <th className="border border-black p-3 text-left">Total (QAR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-3">Normal Charge</td>
                  <td className="border border-black p-3">Standard processing (no additional services)</td>
                  <td className="border border-black p-3">500</td>
                </tr>
                <tr>
                  <td className="border border-black p-3">Premium Package</td>
                  <td className="border border-black p-3">
                    Insurance + Dummy Ticket + Hotel + VFS/BLS Fee (Excludes Embassy Fee)
                  </td>
                  <td className="border border-black p-3">1000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Commission Structure */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Commission Structure</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-black border-collapse text-xs sm:text-sm md:text-base">
              <thead>
                <tr className="bg-black text-white">
                  <th className="border border-black p-3 text-left">Sale Amount (QAR)</th>
                  <th className="border border-black p-3 text-left">Commission</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-3">500</td>
                  <td className="border border-black p-3">5%</td>
                </tr>
                <tr>
                  <td className="border border-black p-3">1000</td>
                  <td className="border border-black p-3">10%</td>
                </tr>
                <tr>
                  <td className="border border-black p-3">1500</td>
                  <td className="border border-black p-3">15%</td>
                </tr>
                <tr>
                  <td className="border border-black p-3">2000</td>
                  <td className="border border-black p-3">20%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Special Cases */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Special Cases</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-black border-collapse text-xs sm:text-sm md:text-base">
              <thead>
                <tr className="bg-black text-white">
                  <th className="border border-black p-3 text-left">Country</th>
                  <th className="border border-black p-3 text-left">Total Charge (QAR)</th>
                  <th className="border border-black p-3 text-left">1st Payment</th>
                  <th className="border border-black p-3 text-left">After Visa</th>
                  <th className="border border-black p-3 text-left">Non-Refundable</th>
                  <th className="border border-black p-3 text-left">Commission</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-3">Spain</td>
                  <td className="border border-black p-3">20000</td>
                  <td className="border border-black p-3">2000</td>
                  <td className="border border-black p-3">18000</td>
                  <td className="border border-black p-3">1000</td>
                  <td className="border border-black p-3">10% (If Visa Success)</td>
                </tr>
                <tr>
                  <td className="border border-black p-3">UK</td>
                  <td className="border border-black p-3">35000</td>
                  <td className="border border-black p-3">5000</td>
                  <td className="border border-black p-3">30000</td>
                  <td className="border border-black p-3">1500</td>
                  <td className="border border-black p-3">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
