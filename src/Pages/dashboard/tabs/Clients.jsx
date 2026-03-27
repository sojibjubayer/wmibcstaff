import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';

const CONSULTANTS = ["nizam", "sandesh", "saru", "shohag", "adil"];

const Clients = ({ data, searchQuery, loading }) => {
  const navigate = useNavigate();
  const [filterConsultant, setFilterConsultant] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // ✅ Download function
  const handleDownload = (fileUrl, clientName) => {
    if (!fileUrl) return;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.target = "_blank";
    link.download = `${clientName || "agreement"}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uniqueCountries = useMemo(() => 
    [...new Set(data.map(c => c.destinationCountry).filter(Boolean))], 
  [data]);

  const filtered = data.filter(c => {
    const matchesSearch =
      c.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.QID?.includes(searchQuery);

    const matchesConsultant = !filterConsultant || c.consultant === filterConsultant;
    const matchesCountry = !filterCountry || c.destinationCountry === filterCountry;

    return matchesSearch && matchesConsultant && matchesCountry;
  });

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto space-y-4 animate-in fade-in duration-300">

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900 p-4 rounded-3xl shadow-lg border border-slate-800">

        <select
          value={filterConsultant}
          onChange={(e) => { setFilterConsultant(e.target.value); setPage(1); }}
          className="bg-slate-800 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-3 rounded-2xl border-none focus:ring-2 focus:ring-pink-300 outline-none"
        >
          <option value="">All Consultants</option>
          {CONSULTANTS.map(n => (
            <option key={n} value={n}>{n.toUpperCase()}</option>
          ))}
        </select>

        <select
          value={filterCountry}
          onChange={(e) => { setFilterCountry(e.target.value); setPage(1); }}
          className="bg-slate-800 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-3 rounded-2xl border-none focus:ring-2 focus:ring-pink-300 outline-none"
        >
          <option value="">All Destination Countries</option>
          {uniqueCountries.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button
          onClick={() => {
            setFilterConsultant("");
            setFilterCountry("");
          }}
          className="bg-pink-200 text-slate-900 text-[11px] font-black uppercase px-4 py-3 rounded-2xl hover:bg-pink-300 transition-all"
        >
          Reset Directory
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-4xl shadow-xl border border-white overflow-hidden">

        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-black text-slate-900 text-xs uppercase tracking-[0.2em]">
            Active Client Database
          </h3>
          <span className="text-xs font-bold text-pink-500">
            {filtered.length} Results
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[9px] uppercase font-black tracking-[0.2em] border-b">
                <th className="px-8 py-4 text-center w-16">#</th>
                <th className="px-8 py-4">Client Detail</th>
                <th className="px-8 py-4">Identification</th>
                <th className="px-8 py-4">Consultant</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {!loading && paginated.map((client, idx) => (
                <tr key={client._id} className="hover:bg-slate-50/80 transition-all">

                  <td className="px-8 py-5 text-center text-slate-300 font-bold text-xs">
                    {(page - 1) * itemsPerPage + idx + 1}
                  </td>

                  <td className="px-8 py-5">
                    <div className="font-bold text-slate-900 text-sm">
                      {client.clientName}
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">
                      {client.destinationCountry || "Global"} • {client.nationality}
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <div className="text-xs font-bold text-slate-700">
                      {client.contactNo}
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold">
                      QID: {client.QID}
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                        client.consultant
                          ? "bg-slate-900 text-white"
                          : "bg-rose-100 text-rose-600"
                      }`}
                    >
                      {client.consultant || "System"}
                    </span>
                  </td>

                  {/* ✅ ACTION COLUMN */}
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">

                      {/* Profile */}
                      <button
                        onClick={() => navigate(`/client-details/${client._id}`)}
                        className="w-24 h-9 flex items-center justify-center bg-white border border-slate-200 text-slate-900 text-[10px] rounded-xl font-black uppercase hover:bg-pink-200 transition-all"
                      >
                        Profile
                      </button>

                      {/* Download */}
                      {client.agreementFile ? (
                        <button
                          onClick={() =>
                            handleDownload(client.agreementFile, client.clientName)
                          }
                          className="w-24 h-9 flex items-center justify-center bg-emerald-50 text-emerald-600 text-[8px] rounded-xl font-black uppercase hover:bg-emerald-200 transition-all"
                        >
                          Download File
                        </button>
                      ) : (
                        <div className="w-24 h-9 flex items-center justify-center bg-slate-100 text-slate-400 text-[10px] rounded-xl font-black uppercase">
                          No File
                        </div>
                      )}

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={page}
          totalItems={filtered.length}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Clients;