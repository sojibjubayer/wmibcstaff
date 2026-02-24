import React from "react";
import { Link } from "react-router-dom";

/**
 * VisitVisa Component
 * Displays a grid of countries available for visit visa services.
 * Optimized for mobile responsiveness and fast navigation.
 */
const VisitVisa = () => {
  // Complete list of countries synchronized with Navbar menuData
  const countries = [
    "USA",
    "Canada",
    "Australia",
    "New Zealand",
    "UK",
    "France",
    "Germany",
    "Italy",
    "Spain",
    "Greece",
    "Switzerland",
    "Netherlands",
    "Austria",
    "Turkey",
    "Thailand",
    "China",
    "Singapore",
    "South Korea",
    "Japan",
    "India",
    "Malaysia"
  ];

  const cardBgColor = "bg-green-100 hover:bg-green-200";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      {/* --- Header Section --- */}
      <div className="w-full mx-auto py-5 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-800 uppercase tracking-tight">
          Visit Visa Countries
        </h1>

        <Link
          to="/visit-visa/payment-terms"
          className="bg-cyan-300 hover:bg-cyan-400 text-black px-6 py-2 rounded-lg text-sm sm:text-base font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Payment Terms
        </Link>
      </div>

      {/* --- Countries Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {countries.map((country, index) => (
          <Link
            key={index}
            // Logic to convert "South Korea" to "south-korea" for the URL
            to={`/visit-visa/${country.toLowerCase().replace(/\s+/g, "-")}`}
            className={`relative rounded-2xl shadow-sm border border-green-200/50 overflow-hidden ${cardBgColor}
              transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl
              h-24 sm:h-28 md:h-32
              flex items-center justify-center group`}
          >
            {/* Decorative Background Element */}
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <div className="w-20 h-20 bg-green-900 rounded-full"></div>
            </div>

            <span
              className="
                text-green-900 font-bold
                text-base sm:text-lg md:text-xl
                px-4 py-2
                rounded-md transition-all
                group-hover:tracking-widest
                z-10
              "
            >
              {country}
            </span>
          </Link>
        ))}
      </div>

      {/* --- Footer Note (Optional) --- */}
      <div className="mt-12 text-center text-gray-400 text-xs sm:text-sm">
        <p>* Please select a country to view detailed requirements and application processes.</p>
      </div>
    </div>
  );
};

export default VisitVisa;