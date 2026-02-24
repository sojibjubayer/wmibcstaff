import React from "react";

const VisitNewZealand = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-1 px-4 sm:px-6 md:px-10 pb-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Header Gradient: New Zealand Flag Colors (Blue → White → Red) */}
        <div className="bg-linear-to-r from-blue-800 via-white to-red-700 px-6 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">
            New Zealand – Visitor Visa
          </h1>
        </div>

        <div className="p-6 sm:p-8">
          {/* Visa Name */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Visa Name</h2>
            <p className="text-gray-600">Visitor Visa – Tourist / Short Stay</p>
          </div>

          {/* Validity */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Validity</h2>
            <p className="text-gray-600">
              Typically 6 months or 9 months depending on visa type and approval
            </p>
          </div>

          {/* Embassy / VFS Fee */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Embassy / VFS Fee</h2>
            <p className="text-gray-600">961 QAR (NZD 441 including IVL)</p>
          </div>

          {/* Family Info */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Family Info</h2>
            <p className="text-gray-600">
              No separate family form. Each applicant applies individually; family members can submit applications together.
            </p>
          </div>

          {/* Official Links */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Official Links (Qatar)</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                <a
                  href="https://www.immigration.govt.nz/visas/visitor-visa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline"
                >
                  New Zealand Immigration – Visitor Visa Info
                </a>
              </li>
            </ul>
          </div>

          {/* Required Documents */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Required Documents</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Passport (valid 6+ months) + copies</li>
              <li>Completed visa application form (online via Immigration New Zealand)</li>
              <li>Passport-size photo</li>
              <li>Qatar ID copy (QID)</li>
              <li>Bank statements (last 6 months)</li>
              <li>Travel itinerary / hotel bookings</li>
              <li>Employment letter or sponsor letter</li>
              <li>Invitation letter (if visiting friends/family)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitNewZealand;
