import React from "react";
import { Globe, Briefcase, ArrowRight } from "lucide-react";

const WorkVisa = () => {
  const countries = [
    "Greece", "Poland", "Portugal", "Bulgaria", "Croatia", 
    "Cyprus", "Serbia", "North Macedonia", "Montenegro"
  ];

  const countryFlagStyles = {
    Greece: "linear-gradient(to bottom, #0D5EAF 50%, #ffffff 50%)",
    Poland: "linear-gradient(to bottom, #ffffff 50%, #DC143C 50%)",
    Portugal: "linear-gradient(to right, #006400 40%, #FF0000 40%)",
    Bulgaria: "linear-gradient(to bottom, #FFFFFF 33%, #00966E 33%, #00966E 66%, #D62612 66%)",
    Cyprus: "linear-gradient(45deg, #FFFFFF 70%, #D57800 70%)",
    Croatia: "linear-gradient(to bottom, #FF0000 33%, #FFFFFF 33%, #FFFFFF 66%, #002395 66%)",
    Serbia: "linear-gradient(to bottom, #FF0000 33%, #002395 33%, #002395 66%, #FFFFFF 66%)",
    "North Macedonia": "radial-gradient(circle, #FFD700 20%, #D20000 21%)",
    Montenegro: "linear-gradient(#C8102E, #C8102E)",
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="bg-pink-100 p-3 rounded-2xl mb-4">
            <Briefcase className="text-pink-600 w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight text-slate-900 mb-2">
            Work Visa Destinations
          </h1>
          <div className="h-1 w-20 bg-pink-500 rounded-full mb-4"></div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
            European Employment Pathways 2026
          </p>
        </div>

        {/* Circular Grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {countries.map((country, index) => (
            <div key={index} className="flex flex-col items-center group">
              <a
                href={`/work-visa/${country.toLowerCase().replace(/\s+/g, "-")}`}
                className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl shadow-slate-200 overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-pink-200/50 flex items-center justify-center group"
                style={{ background: countryFlagStyles[country] || "#cbd5e1" }}
              >
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ArrowRight className="text-white w-6 h-6 transform -translate-x-2 group-hover:translate-x-0 transition-transform" />
                </div>
              </a>
              
              {/* Country Label */}
              <div className="mt-4 text-center">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest group-hover:text-pink-600 transition-colors">
                  {country}
                </span>
                <div className="flex items-center justify-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Globe className="w-3 h-3 text-pink-500" />
                   <span className="text-[8px] font-bold text-slate-400 uppercase">Europe</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-20 p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm text-center">
          <p className="text-slate-400 text-xs font-medium max-w-2xl mx-auto">
            Select a country to view specific job categories, salary brackets, and documentation requirements 
            for the <span className="text-slate-900 font-bold">2026 Work Permit</span> season.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkVisa;