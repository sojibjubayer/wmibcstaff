import React from "react";

const VisitTurkey = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-1 px-4 sm:px-6 md:px-10 pb-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Gradient Header */}
        <div className="bg-linear-to-r from-red-700 via-red-600 to-red-700 px-6 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-white">
            Turkey – Tourist Visa
          </h1>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Visa Name</h2>
            <p className="text-gray-600">Tourist Visa</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Validity</h2>
            <p className="text-gray-600">
              Valid up to 180 days; stay up to 30 days per visit
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Embassy / Agency Fee</h2>
            <p className="text-gray-600">
              ~810 QAR (single-entry visa)
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Family Info</h2>
            <p className="text-gray-600">
              Each applicant applies separately; family may apply together.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Official Links</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                <a
                  href="https://www.mfa.gov.tr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline"
                >
                  Turkey MFA – Visa Information
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-700 hover:underline"
                >
                  Authorized Visa Agent (Qatar)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Required Documents</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Passport (valid at least 6 months)</li>
              <li>Visa application form</li>
              <li>Passport-size photos</li>
              <li>Qatar ID (QID) copy</li>
              <li>Bank statements</li>
              <li>Flight & hotel booking</li>
              <li>Employment or sponsor letter</li>
              <li>Ties to home</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitTurkey;
