import React from "react";
import {
  FaGlobeAmericas,
  FaMapMarkerAlt,
  FaFileContract,
} from "react-icons/fa";

const International = () => {
  const data = [
    {
      country: "Saudi Arabia",
      services: ["Portugal Work Permit", "Bulgaria Work Permit"],
    },
    {
      country: "Kuwait",
      services: ["Greece", "Montenegro", "Serbia", "Romania Work Permit"],
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
    { country: "Singapore", services: ["Romania Work Permit"] },
    {
      country: "Malaysia",
      services: ["Romania Work Permit", "Montenegro Work Permit"],
    },
    { country: "South Africa", services: ["Romania Work Permit"] },
    {
      country: "Bangladesh",
      services: ["Serbia-10 lakh", "Bosnia-11 lakh", "Bulgaria-14 lakh"],
    },
  ];

  return (
    <div className="p-6 md:p-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="flex items-center gap-3 text-3xl font-black tracking-tight text-slate-900">
            <FaGlobeAmericas className="text-pink-500" />
            International Hubs
          </h2>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Global work permit availability
          </p>

          <p className="mt-1 text-sm font-medium text-pink-500">
            Note: The service charge will be the same as from Qatar.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-pink-100/50 transition-all group border-b-4 border-b-slate-200 hover:border-b-pink-400"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-slate-100 rounded-2xl group-hover:bg-pink-50 transition-colors">
                  <FaMapMarkerAlt className="text-slate-400 group-hover:text-pink-500" />
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                  Branch Office
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-4">
                {item.country}
              </h3>

              <div className="space-y-3">
                {item.services.map((service, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                    <p className="text-sm font-semibold text-slate-600">
                      {service}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default International;
