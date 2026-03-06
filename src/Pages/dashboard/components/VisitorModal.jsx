import React from "react";
const VisitorModal = ({ visitor, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white p-6 rounded w-96">

        <h2 className="text-xl font-bold mb-3">
          Visitor Details
        </h2>

        <p>Name: {visitor.name}</p>
        <p>Mobile: {visitor.mobile}</p>
        <p>Country: {visitor.country}</p>

        <button
          onClick={onClose}
          className="mt-4 px-3 py-1 bg-red-500 text-white rounded"
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default VisitorModal;