import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ITEMS_PER_PAGE = 12;

const Pagination = ({ currentPage, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className="flex justify-center items-center gap-4 py-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft />
      </button>

      <span className="text-xs font-bold">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;