import React from "react";

const VisitUSA = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-1 px-4 sm:px-6 md:px-10 pb-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Flag Color Gradient Header */}
        <div className="bg-linear-to-r from-blue-600 via-white to-red-600 px-6 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">
            United States – B‑2 Tourist Visa
          </h1>
        </div>

        <div className="p-6 sm:p-8">
          {/* Visa Name */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Visa Name</h2>
            <p className="text-gray-600">B‑2 Visitor/Tourist Visa</p>
          </div>

          {/* Validity */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Validity</h2>
            <p className="text-gray-600">
              Up to 10 years (multiple entry), stay ~6 months per visit
            </p>
          </div>

          {/* Embassy / VFS Fee */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Embassy / VFS Fee</h2>
            <p className="text-gray-600">
              675 QAR (USD 185) visa fee (non‑refundable)
            </p>
          </div>

          {/* Family Info */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Family Info</h2>
            <p className="text-gray-600">
              No separate family form. Each applicant fills their own DS‑160; family can apply together.
            </p>
          </div>

          {/* Official Links */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Official Links (Qatar)</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                <a
                  href="https://qa.usembassy.gov/visas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline"
                >
                  U.S. Embassy Doha – Visa info/applications
                </a>
              </li>
              <li>
                <span className="text-gray-600">
                  DS‑160 and appointment: use official U.S. Department of State visa portal
                </span>
              </li>
            </ul>
          </div>

          {/* Required Documents */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Required Documents</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Passport (valid 6+ months) + copies</li>
              <li>DS‑160 confirmation page</li>
              <li>Photo (U.S. specs)</li>
              <li>Qatar ID copy (QID)</li>
              <li>Bank statements (last 6 months)</li>
              <li>Travel itinerary / hotel bookings</li>
              <li>Employment letter or sponsor letter</li>
              <li>Invitation (if visiting friends/family)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitUSA;
