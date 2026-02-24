import React from "react";

const WpCroatia = () => {
  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-linear-to-r from-red-400 via-white to-blue-400 text-black rounded-xl shadow-lg p-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Croatia Work Visa
          </h1>
          <p className="mt-2 text-black">
            Hospitality & Service Sector Opportunities
          </p>
        </div>

        {/* Hiring Positions */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Available Positions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "House Keeping",
              "Butcher",
              "General Worker",
            ].map((job, index) => (
              <div
                key={index}
                className="bg-red-50 rounded-lg p-4 text-center font-semibold text-lg"
              >
                {job}
              </div>
            ))}
          </div>
        </div>

    {/* Salary Section */}
        <div className="mt-8 bg-red-100 rounded-xl shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Salary Package</h2>
          <p className="text-3xl font-bold mt-2 text-gray-700">800 – 1200 Euro</p>
          <p className="mt-2 text-gray-700">
            + Food & Accommodation Provided by Company
          </p>
        </div>
        
        {/* TRC & Processing */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-red-600 mb-2">TRC</h3>
            <p>3 Months</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-red-600 mb-2">Processing Time</h3>
            <p>4 Months</p>
          </div>
        </div>

        {/* Service Charge */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Service Charge
          </h2>

          <p className="text-lg font-semibold text-gray-800 mb-4">
            12,000 QAR
          </p>

          <div className="space-y-3">
            <div className="bg-red-50 p-4 rounded-lg flex justify-between">
              <span>1st Payment</span>
              <span className="font-semibold">1,000 QAR</span>
            </div>

            <div className="bg-red-50  p-4 rounded-lg flex justify-between">
              <span>2nd Payment</span>
              <span className="font-semibold">2,000 QAR</span>
            </div>

            <div className="bg-red-50  p-4 rounded-lg flex justify-between">
              <span>Final Payment (After Visa)</span>
              <span className="font-semibold">9,000 QAR</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WpCroatia;
