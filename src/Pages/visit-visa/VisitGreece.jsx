import React from "react";

const VisitGreece = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-1 px-4 sm:px-6 md:px-10 pb-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Gradient Header */}
        <div className="bg-linear-to-r from-blue-700 via-white to-blue-700 px-6 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">
            Greece – Schengen Visitor Visa
          </h1>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Visa Name</h2>
            <p className="text-gray-600">Schengen Short-Stay Visa (Type C)</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Validity</h2>
            <p className="text-gray-600">
              Up to 90 days within a 180-day period (single or multiple entry)
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Embassy / VFS Fee
            </h2>
            <p className="text-gray-600">
              ~330–400 QAR (Embassy visa fee) + ~100–150 QAR (VFS service fee)
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Family Info</h2>
            <p className="text-gray-600">
              Each applicant submits separately; family members may apply together.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Official Links (Qatar)
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                <a
                  href="https://www.mfa.gr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline"
                >
                  Greece MFA – Visa Information
                </a>
              </li>
              <li>
                <a
                  href="https://visa.vfsglobal.com/qat/en/grc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline"
                >
                  VFS Global – Greece Visa in Qatar
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Required Documents
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Passport (valid at least 6 months)</li>
              <li>Completed Schengen visa application form</li>
              <li>Two recent passport-size photos</li>
              <li>Qatar ID (QID) copy</li>
              <li>Bank statements (last 6 months)</li>
              <li>Confirmed flight itinerary</li>
              <li>Hotel booking or accommodation proof</li>
              <li>Travel medical insurance (minimum €30,000 coverage)</li>
              <li>Employment letter or sponsor letter</li>
              <li>Ties to home (job, salary, family, assets)</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VisitGreece;
