import React from "react";

const WpMontenegro = () => {
  return (
    <div className="min-h-screen bg-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-red-400 to-yellow-400 text-white rounded-xl shadow-lg p-6 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold">
            Montenegro Work Visa | Seasonal
          </h1>
          <p className="mt-2 text-red-100">
            Hospitality & Service Sector Opportunities
          </p>
        </div>

        {/* Hiring Positions */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-red-700 mb-4">
            We Are Currently Hiring
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Front Office & Sales Manager",
              "Housekeeping / Maid",
              "Receptionist",
              "Night Receptionist",
              "Maintance worker / Handyman",
              "Driver",
              "Kitchen Assistant",
              "Assistant Cook",
              "Bartender",
              "Assistant Bartender",
              "Restaurant Host",
              "Manual worker / General Laborer",
            ].map((job, index) => (
              <div
                key={index}
                className="bg-yellow-100 rounded-lg p-4 text-center font-semibold text-lg"
              >
                {job}
              </div>
            ))}
          </div>
        </div>

        {/* TRC & Processing */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-red-700 mb-2">TRC</h3>
            <p> - </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-red-700 mb-2">Processing Time</h3>
            <p>3-4 Months</p>
          </div>
        </div>

        {/* Service Charge */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-red-700 mb-4">
            Service Charge
          </h2>

          <p className="text-lg font-semibold text-gray-800 mb-4">8,000 QAR</p>

          <div className="space-y-3">
            <div className="bg-yellow-100 p-4 rounded-lg flex justify-between">
              <span>1st Payment</span>
              <span className="font-semibold">1500 QAR</span>
            </div>

            <div className="bg-yellow-100 p-4 rounded-lg flex justify-between">
              <span>2nd Payment (After Visa)</span>
              <span className="font-semibold">6500 QAR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WpMontenegro;
