import React from "react";
import { Globe, MapPin, ShieldCheck, Plane } from "lucide-react";

const DATA = [
  {
    country: "Saudi Arabia",
    services: ["Portugal Work Permit", "Bulgaria Work Permit"],
  },
  {
    country: "Kuwait",
    services: ["Greece", "Montenegro", "Serbia", "Slovakia Work Permit"],
  },
  {
    country: "Dubai",
    services: ["Romania Work Permit", "Montenegro Work Permit"],
  },
  {
    country: "Bahrain",
    services: ["Bosnia Work Permit", "Montenegro Work Permit"],
  },
  {
    country: "Oman",
    services: ["Bosnia Work Permit", "Montenegro Work Permit"],
  },
  { country: "Singapore", services: ["Portugal Work Permit"] },
  {
    country: "Malaysia",
    services: ["Romania Work Permit", "Montenegro Work Permit"],
  },
  { country: "South Africa", services: ["Romania Work Permit"] },
  {
    country: "Bangladesh",
    services: [
      "Serbia-10L (1L-3L-6L)",
      "Bosnia-11L (1L-3L-7L)",
      "Bulgaria-14L (1L-3L-10L)",
      "Portugal-22L (1.5L-2L-3.5L-15L)",
    ],
  },
];

const International = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans selection:bg-blue-100">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="relative bg-linear-to-br from-[#f0f7ff] via-white to-[#e0f2fe] rounded-[2.5rem] shadow-xs border border-blue-100 p-8 sm:p-12 text-center overflow-hidden flex flex-col items-center">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/60 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100/40 rounded-full blur-3xl"></div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-slate-800 italic relative z-10">
            International{" "}
            <span className="font-extrabold not-italic bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600">
              Hubs Gateway
            </span>
          </h1>

          <p className="mt-4 text-slate-500 text-base sm:text-lg font-medium tracking-wide relative z-10">
            Global Work Permit Availability & Logistics
          </p>
        </header>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {DATA.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/60 hover:border-blue-200 hover:shadow-2xs transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 group-hover:bg-blue-50/50 group-hover:text-blue-600 transition-colors">
                    <MapPin size={18} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Global Portal
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-4 tracking-tight group-hover:text-slate-900 transition-colors">
                  {item.country}
                </h3>

                <div className="space-y-2.5">
                  {item.services.map((service, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                      <p className="text-sm font-semibold text-slate-600 group-hover:text-slate-700 transition-colors leading-snug">
                        {service}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center py-8">
          <div className="flex justify-center items-center gap-4 text-slate-300 mb-4">
            <Plane size={16} />
            <div className="h-px w-12 bg-slate-200"></div>
            <ShieldCheck size={16} />
          </div>
          <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase">
            Global Coordination Grid • 2026 Operations
          </p>
        </footer>
      </div>
    </div>
  );
};

export default International;