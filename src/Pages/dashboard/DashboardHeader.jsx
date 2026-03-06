import React from "react";
import { FaSearch, FaSync, FaPassport } from "react-icons/fa";
import { generateSalesReport } from "./utils/PdfReport";
import { useState } from "react";

const DashboardHeader = ({ fetchData, loading }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
      <div className="relative w-full max-w-md">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />

        <input
          type="text"
          placeholder="Search directory..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-12 py-3 bg-slate-100 border-none rounded-2xl text-xs"
        />
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={fetchData}
          className="p-3 bg-slate-50 text-slate-400 rounded-xl"
        >
          <FaSync className={loading ? "animate-spin" : ""} />
        </button>

        <button
          onClick={generateSalesReport}
          className="flex items-center gap-2 bg-pink-200 text-slate-900 text-[10px] px-4 py-2.5 rounded-xl font-black uppercase"
        >
          <FaPassport />
          Sales Report
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;