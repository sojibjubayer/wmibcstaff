import React from "react";

const WpNorthMacedonia = () => {
  return (
    <div className="min-h-screen bg-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-linear-to-r from-red-300 to-yellow-200 text-gray-800 rounded-xl shadow-lg p-6 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold">
            North Macedonia Work Visa
          </h1>
          <p className="mt-2 text-gray-700">
            Cleaner & Vegetable Worker Opportunities
          </p>
        </div>

        {/* Position Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-red-700 mb-4">
            Position Name
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Cleaner", "Vegetable Worker"].map((job, index) => (
              <div
                key={index}
                className="bg-yellow-100 rounded-lg p-4 text-center font-semibold text-lg"
              >
                {job}
              </div>
            ))}
          </div>
        </div>

        {/* Salary Section */}
        <div className="mt-8 bg-[#FFC797] text-gray-700 rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold">Salary Package</h2>
          <p className="text-2xl font-bold mt-2">700 Euro</p>
          <p className="mt-2 text-gray-600">
            + Food & Accommodation Provided by Company
          </p>
        </div>

        {/* Job Details */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-red-700 mb-2">Duty Hours</h3>
            <p>8 hours + Overtime</p>
            <p>5 days per week</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-red-700 mb-2">TRC & Processing</h3>
            <p>TRC: 3 Months</p>
            <p>Processing Time: 5 – 6 Months</p>
          </div>
        </div>

        {/* Service Charge */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-red-700 mb-4">
            Service Charge
          </h2>
          <p className="text-lg font-semibold text-gray-800 mb-4">
            22,000 Riyal
          </p>

          <div className="space-y-3">
            <div className="bg-yellow-100 p-4 rounded-lg flex justify-between">
              <span>1st Payment (With Documents)</span>
              <span className="font-semibold">3,000</span>
            </div>

            <div className="bg-yellow-100 p-4 rounded-lg flex justify-between">
              <span>2nd Payment (After Work Permit)</span>
              <span className="font-semibold">4,000</span>
            </div>

            <div className="bg-yellow-100 p-4 rounded-lg flex justify-between">
              <span>3rd Payment (After Visa Approval)</span>
              <span className="font-semibold">15,000</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WpNorthMacedonia;
