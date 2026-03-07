import React from 'react';
import { FaSearch } from "react-icons/fa";

const DashboardHeader = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white rounded-[2.5rem] p-7 shadow-xl shadow-pink-500/5 border border-slate-50 mb-10">
      {/* Brand & System Title */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
          Executive <span className="text-pink-500">Panel</span>
        </h1>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mt-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          WMIBC Management System
        </p>
      </div>

      {/* Global Intelligence Search */}
      <div className="relative group w-full md:w-96">
        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 text-xs group-focus-within:text-pink-500 transition-colors" />
        <input
          type="text"
          placeholder="Search System Intelligence..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-3xl text-[11px] font-bold focus:bg-white focus:border-pink-200 focus:ring-4 focus:ring-pink-500/5 outline-none transition-all shadow-inner"
        />
      </div>
    </div>
  );
};

export default DashboardHeader;