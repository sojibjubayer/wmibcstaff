import React from "react";

const WpBulgaria = () => {
  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-green-300 via-green-200 to-green-300 text-gray-800 rounded-xl shadow-lg p-6 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold">
            Bulgaria Work Visa
          </h1>
          <p className="mt-2 text-gray-700">
            Job Opportunities for Skilled & Unskilled Workers
          </p>
        </div>

        {/* Position Names */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-green-700 mb-4">
            Available Positions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
            {[
              "Hospitality",
              "Construction Worker",
              "Housekeeping",
              "Helper",
            ].map((job, index) => (
              <div
                key={index}
                className="bg-green-100 rounded-lg p-3 text-center font-medium"
              >
                {job}
              </div>
            ))}
          </div>
        </div>

        {/* Salary Section */}
        <div className="mt-8 bg-linear-to-r from-green-300  text-gray-800 rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold">Salary Package</h2>
          <p className="text-3xl font-bold mt-2">700 – 900 Euro</p>
          <p className="mt-2 text-gray-700">
            + Food & Accommodation Provided by Company
          </p>
        </div>

        {/* Job Details */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-green-700 mb-2">Duty Hours</h3>
            <p>8 hours + Overtime</p>
            <p>5/6 days per week</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-green-700 mb-2">TRC & Processing</h3>
            <p>TRC: 3 Months</p>
            <p>Processing Time: 6 – 8 Months</p>
          </div>
        </div>

        {/* Service Charge */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-green-700 mb-4">
            Service Charge
          </h2>
          <p className="text-lg font-semibold text-gray-800 mb-4">
            30,000 Riyal (Excluding Air Ticket)
          </p>

          <div className="space-y-3">
            <div className="bg-green-100 p-4 rounded-lg flex justify-between">
              <span>1st Payment (With Documents)</span>
              <span className="font-semibold">2,500</span>
            </div>

            <div className="bg-green-100 p-4 rounded-lg flex justify-between">
              <span>2nd Payment (After Work Permit)</span>
              <span className="font-semibold">5,000</span>
            </div>

            <div className="bg-green-100 p-4 rounded-lg flex justify-between">
              <span>3rd Payment (After Visa)</span>
              <span className="font-semibold">22,500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WpBulgaria;
