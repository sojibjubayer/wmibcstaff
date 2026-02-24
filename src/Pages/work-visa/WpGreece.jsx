import React from "react";

const WpGreece = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 text-black">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-100 to-blue-300 text-gray-900 rounded-xl shadow-md p-6 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold">
            Greece Work Visa
          </h1>
          <p className="mt-2 text-gray-800">
            Job Opportunities for Skilled & Unskilled Workers
          </p>
        </div>

        {/* Position Names */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 ">
          <h2 className="text-xl font-bold text-black mb-4 border-b border-blue-300 pb-2">
            Available Positions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Cleaner",
              "Dish Washer",
              "Kitchen Helper",
              "Waiter",
              "Barista",
              "Housekeeping",
              "Chef",
              "Construction Worker",
              "Warehouse Worker",
            ].map((job, index) => (
              <div
                key={index}
                className="border border-blue-100 bg-gray-50 rounded-lg p-3 text-center font-medium hover:bg-gray-200 transition"
              >
                {job}
              </div>
            ))}
          </div>
        </div>

        {/* Salary Section */}
        <div className="mt-8 bg-blue-50 rounded-xl shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Salary Package</h2>
          <p className="text-2xl font-bold mt-2 text-gray-700">800 – 1200 Euro</p>
          <p className="mt-2 text-gray-700">
            + Food & Accommodation Provided by Company
          </p>
        </div>

        {/* Job Details */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl shadow-sm  ">
            <h3 className="font-bold text-black mb-2">Duty Hours</h3>
            <p>8 hours + Overtime</p>
            <p>5/6 days per week</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl shadow-sm  ">
            <h3 className="font-bold text-black mb-2">
              TRC & Processing
            </h3>
            <p>TRC: 3 Months</p>
            <p>Processing Time: 6 – 8 Months</p>
          </div>
        </div>

        {/* Service Charge */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 ">
          <h2 className="text-xl font-bold text-black mb-4 border-b border-blue-100 pb-2">
            Service Charge
          </h2>

          <p className="text-lg font-semibold mb-4">
            30,000 Riyal (Including Air Ticket)
          </p>

          <div className="space-y-3">
            <div className="border border-blue-100 bg-gray-50 p-4 rounded-lg flex justify-between">
              <span>1st Payment (With Documents)</span>
              <span className="font-semibold">2,500</span>
            </div>

            <div className="border border-blue-100 bg-gray-50 p-4 rounded-lg flex justify-between">
              <span>2nd Payment (After Work Permit)</span>
              <span className="font-semibold">5,000</span>
            </div>

            <div className="border border-blue-100 bg-gray-50 p-4 rounded-lg flex justify-between">
              <span>3rd Payment (After Visa)</span>
              <span className="font-semibold">22,500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WpGreece;
