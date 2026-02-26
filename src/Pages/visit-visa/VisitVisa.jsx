import React from "react";
import { Link } from "react-router-dom";
import { Plane, CreditCard, ChevronRight, Map } from "lucide-react";

/**
 * VisitVisa Component
 * Slate & Pink UI for Global Tourism Pathways
 */
const VisitVisa = () => {
  const countries = [
    "USA", "Canada", "Australia", "New Zealand", "UK",
    "France", "Germany", "Italy", "Spain", "Greece",
    "Switzerland", "Netherlands", "Austria", "Turkey",
    "Thailand", "China", "Singapore", "South Korea",
    "Japan", "India", "Malaysia"
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 p-3 rounded-2xl shadow-xl shadow-slate-200">
              <Plane className="text-pink-500 w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900">
                Visit Visa 
              </h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tourism & Short-Stay 2026</p>
            </div>
          </div>

          <Link
            to="/visit-visa/payment-terms"
            className="group flex items-center gap-3 bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:border-pink-500 hover:text-pink-600 shadow-sm active:scale-95"
          >
            <CreditCard size={16} className="text-pink-500" />
            Payment Terms
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>

        {/* --- Countries Grid --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {countries.map((country, index) => (
            <Link
              key={index}
              to={`/visit-visa/${country.toLowerCase().replace(/\s+/g, "-")}`}
              className="relative group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-pink-100 transition-all duration-300 h-28 md:h-32 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle Decorative Icon */}
              <Map className="absolute -right-2 -bottom-2 w-16 h-16 text-slate-50 group-hover:text-pink-50 transition-colors duration-300" />

              <div className="z-10">
                <p className="text-[9px] font-black text-pink-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                  View Entry Req.
                </p>
                <span className="text-sm md:text-base font-black text-slate-800 uppercase tracking-tight group-hover:text-slate-900 transition-colors">
                  {country}
                </span>
              </div>
              
              <div className="w-8 h-1 bg-slate-100 group-hover:bg-pink-500 group-hover:w-full transition-all duration-500 rounded-full" />
            </Link>
          ))}
        </div>

        {/* --- Information Note --- */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-slate-200" />
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest text-center">
            * Select a destination to view 2026 checklist & processing times
          </p>
          <div className="h-px w-12 bg-slate-200" />
        </div>
      </div>
    </div>
  );
};

export default VisitVisa;