import React from "react";

const VisitNetherlands = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-1 px-4 sm:px-6 md:px-10 pb-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Gradient Header */}
        <div className="bg-linear-to-r from-red-600 via-white to-blue-700 px-6 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">
            Netherlands – Schengen Visitor Visa
          </h1>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Visa Name</h2>
            <p className="text-gray-600">Schengen Short-Stay Visa (Type C)</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Validity</h2>
            <p className="text-gray-600">
              Up to 90 days within a 180-day period
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Embassy / VFS Fee</h2>
            <p className="text-gray-600">
              ~330–400 QAR (Embassy visa fee) + ~100–150 QAR (VFS service fee)
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Family Info</h2>
            <p className="text-gray-600">
              Separate application per person; family may apply together.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Official Links (Qatar)</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                <a
                  href="https://www.netherlandsworldwide.nl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline"
                >
                  Netherlands Visa – Official Info
                </a>
              </li>
              <li>
                <a
                  href="https://visa.vfsglobal.com/qat/en/nld/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline"
                >
                  VFS Global – Netherlands Visa in Qatar
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Required Documents</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Passport (valid at least 6 months)</li>
              <li>Schengen visa application form</li>
              <li>Passport-size photos</li>
              <li>Qatar ID (QID) copy</li>
              <li>Bank statements (last 6 months)</li>
              <li>Flight & hotel bookings</li>
              <li>Travel insurance (€30,000 minimum)</li>
              <li>Employment or sponsor letter</li>
              <li>Ties to home</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitNetherlands;
