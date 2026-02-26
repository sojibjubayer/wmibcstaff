import React from "react";

const WpPoland = () => {
  return (
    <div className="min-h-screen bg-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-linear-to-r from-white to-red-300 text-gray-800 rounded-xl shadow-lg p-6 text-center ">
          <h1 className="text-2xl sm:text-4xl font-bold">Poland Work Visa</h1>
          <p className="mt-2 text-gray-700">Construction & Cleaning Job Opportunity</p>
        </div>

        {/* Position Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-red-700 mb-4">
            Position Name 
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Construction", "Cleaner"].map((job, index) => (
              <div
                key={index}
                className="bg-red-100 rounded-lg p-4 text-center font-semibold text-lg"
              >
                {job}
              </div>
            ))}
          </div>
        </div>

        {/* Salary Section */}
        <div className="mt-8 bg-red-100 text-gray-800 rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold">Salary Package</h2>
          <p className="text-3xl font-bold mt-2">700 Euro</p>
          <p className="mt-2 text-gray-800">
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
            <p>Processing Time: 7 – 8 Months</p> 
          </div>
        </div>

        {/* Service Charge */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-red-700 mb-4">
            Service Charge
          </h2>
          <p className="text-lg font-semibold text-gray-800 mb-4">
            18,000 Riyal
          </p>

          <div className="space-y-3">
            <div className="bg-red-100 p-4 rounded-lg flex justify-between">
              <span>1st Payment (With Documents)</span>
              <span className="font-semibold">1,500</span>
            </div>

            <div className="bg-red-100 p-4 rounded-lg flex justify-between">
              <span>2nd Payment (After Work Permit)</span>
              <span className="font-semibold">5,000</span>
            </div>

            <div className="bg-red-100 p-4 rounded-lg flex justify-between">
              <span>3rd Payment (After Visa Approval)</span>
              <span className="font-semibold">11,500</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WpPoland;
