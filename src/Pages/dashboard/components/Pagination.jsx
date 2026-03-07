import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalItems, itemsPerPage = 12, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;
  
  return (
    <div className="px-8 py-5 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(prev => prev - 1)}
          className="p-2.5 border border-slate-200 rounded-xl bg-white hover:bg-pink-50 disabled:opacity-30 transition-all shadow-sm"
        >
          <FaChevronLeft size={10} />
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(prev => prev + 1)}
          className="p-2.5 border border-slate-200 rounded-xl bg-white hover:bg-pink-50 disabled:opacity-30 transition-all shadow-sm"
        >
          <FaChevronRight size={10} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;