import React from "react";

const VisitCanada = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-1 px-4 sm:px-6 md:px-10 pb-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Gradient: Canada Flag */}
        <div className="bg-linear-to-r from-red-600 via-white to-red-600 px-6 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">
            Canada – Visitor Visa
          </h1>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Visa Name
            </h2>
            <p className="text-gray-600">Canada Visitor Visa</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Validity
            </h2>
            <p className="text-gray-600">Up to 10 years or passport expiry</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Embassy / VFS Fee
            </h2>
            <p className="text-gray-600">
              500 QAR (CAD 100) + 425 QAR (Biometrics)
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Family Info
            </h2>
            <p className="text-gray-600">
              Each family member must apply separately; family may submit
              applications together.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Official Links (Qatar)
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline"
                >
                  Canada Visitor Visa – IRCC Official Page
                </a>
              </li>
              <li>
                <a
                  href="https://visa.vfsglobal.com/qat/en/can"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline"
                >
                  VFS Global – Canada Visa in Qatar
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
              <li> QID </li>
              <li> Completed TRV application (IMM 5257) and Family Information form (IMM 5645/5707).
              </li>
              <li>
                Bank statements for the last 6 months, pay slips, or proof of
                assets.
              </li>
              <li>
                NOC from your employer in Qatar, specifying your position and
                salary.{" "}
              </li>
              <li>
                Photos: Two recent passport-size photos (white background).
              </li>
              <li>Flight reservations and hotel bookings/itinerary.</li>
              <li>Purpose of Visit: A cover letter detailing travel purpose</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitCanada;
