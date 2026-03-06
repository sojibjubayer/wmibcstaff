import React from "react";
const Table = ({ columns, data, loading, onDetailsClick }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead className="bg-slate-50 text-slate-400 text-[9px] uppercase font-black">
        <tr>
          {columns.map((col) => (
            <th key={col} className="px-8 py-4">
              {col}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-50">
        {!loading &&
          data.map((item, idx) => (
            <tr key={idx} className="hover:bg-slate-50">
              <td className="px-8 py-5 font-bold text-xs">
                {item.name || item.clientName}
              </td>

              <td className="px-8 py-5">
                {item.consultant || "HQ"}
              </td>

              <td className="px-8 py-5">
                {item.interestedCountry ||
                  item.destinationCountry ||
                  "General Inquiry"}
              </td>

              <td className="px-8 py-5">
                {new Date(item.date || item.createdAt).toLocaleDateString()}
              </td>

              {onDetailsClick && (
                <td className="px-8 py-5 text-right">
                  <button
                    onClick={() => onDetailsClick(item)}
                    className="bg-white border px-4 py-2 rounded-xl text-[10px]"
                  >
                    Details
                  </button>
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

export default Table;