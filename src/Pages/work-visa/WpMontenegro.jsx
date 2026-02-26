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
              "Electrician",
              "Tiles Mason",
              "Gypsum"
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
        {/* Salary Section */}
        <div className="mt-8 bg-amber-200 text-gray-800 rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold">Salary Package</h2>
          <p className="text-3xl font-bold mt-2">1000 Euro</p>
          <p className="mt-2 text-gray-800">
            + Food & Accommodation Provided by Company
          </p>
        </div>

        {/* Job Details */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-amber-50 p-6 rounded-xl shadow-sm  ">
            <h3 className="font-bold text-black mb-2">Duty Hours</h3>
            <p>9 hours + Overtime</p>
            <p>6 days per week </p>
          </div>

          <div className="bg-amber-50 p-6 rounded-xl shadow-sm  ">
            <h3 className="font-bold text-black mb-2">
              TRC & Processing
            </h3>
            <p>TRC: 3 Months</p>
            <p>Processing Time: 6  Months</p>
          </div>
        </div>

        {/* Service Charge */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 ">
          <h2 className="text-xl font-bold text-black mb-4 border-b border-blue-100 pb-2">
            Service Charge
          </h2>

          <p className="text-lg font-semibold mb-4">
            21,500 Riyal 
          </p>

          <div className="space-y-3">
            <div className="border border-amber-100 bg-amber-50 p-4 rounded-lg flex justify-between">
              <span>1st Payment (With Documents)</span>
              <span className="font-semibold">2,000</span>
            </div>

            <div className="border border-amber-100 bg-amber-50 p-4 rounded-lg flex justify-between">
              <span>2nd Payment (After Work Permit)</span>
              <span className="font-semibold">3,500</span>
            </div>

            <div className="border border-amber-100 bg-amber-50 p-4 rounded-lg flex justify-between">
              <span>3rd Payment (After Visa)</span>
              <span className="font-semibold">16,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WpMontenegro;
