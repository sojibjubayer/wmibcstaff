import React from 'react';

const StatCard = ({ label, value, subValue, color, loading, live }) => (
  <div className="bg-white p-6 rounded-4xl shadow-xl shadow-slate-200/50 border border-white hover:shadow-2xl transition-shadow duration-300">
    <div className="flex justify-between items-center mb-3">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      {live && (
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
        </div>
      )}
    </div>
    
    <div className="space-y-1">
      <h3 className={`text-2xl font-black ${color} tracking-tight ${loading ? "animate-pulse" : ""}`}>
        {loading ? "..." : value}
      </h3>
      
      {/* New section for the Monthly/Secondary value */}
      {!loading && subValue && (
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg uppercase tracking-tighter">
            {subValue}
          </span>
        </div>
      )}
    </div>
  </div>
);

export default StatCard;