import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

const CONSULTANTS = ["nizam", "sandesh", "saru", "tarikul", "adil"];

const normalize = (value) => String(value || "").trim().toLowerCase();

const Clients = ({ data = [], searchQuery = "", loading = false }) => {
  const navigate = useNavigate();

  const [filterConsultant, setFilterConsultant] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 12; 

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

  const normalizedSearch = useMemo(() => normalize(searchQuery), [searchQuery]);

  const uniqueCountries = useMemo(() => {
    const seen = new Map();

    data.forEach((client) => {
      const original = client?.destinationCountry?.trim();
      const key = normalize(original);

      if (original && !seen.has(key)) {
        seen.set(key, original);
      }
    });

    return Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const filtered = useMemo(() => {
    return data.filter((client) => {
      const clientName = normalize(client?.clientName);
      const qid = normalize(client?.QID);
      const consultant = normalize(client?.consultant);
      const country = normalize(client?.destinationCountry);

      const matchesSearch =
        !normalizedSearch ||
        clientName.includes(normalizedSearch) ||
        qid.includes(normalizedSearch);

      const matchesConsultant =
        !filterConsultant || consultant === normalize(filterConsultant);

      const matchesCountry =
        !filterCountry || country === normalize(filterCountry);

      return matchesSearch && matchesConsultant && matchesCountry;
    });
  }, [data, normalizedSearch, filterConsultant, filterCountry]);

  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, page]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, filterConsultant, filterCountry]);

  return (
    <div className="max-w-7xl mx-auto space-y-4 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900 p-4 rounded-3xl shadow-lg border border-slate-800">
        <select
          value={filterConsultant}
          onChange={(e) => setFilterConsultant(e.target.value)}
          className="bg-slate-800 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-3 rounded-2xl border-none focus:ring-2 focus:ring-pink-300 outline-none"
        >
          <option value="">All Consultants</option>
          {CONSULTANTS.map((name) => (
            <option key={name} value={name}>
              {name.toUpperCase()}
            </option>
          ))}
        </select>

        <select
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
          className="bg-slate-800 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-3 rounded-2xl border-none focus:ring-2 focus:ring-pink-300 outline-none"
        >
          <option value="">All Destination Countries</option>
          {uniqueCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setFilterConsultant("");
            setFilterCountry("");
            setPage(1);
          }}
          className="bg-pink-200 text-slate-900 text-[11px] font-black uppercase px-4 py-3 rounded-2xl hover:bg-pink-300 transition-all"
        >
          Reset Directory
        </button>
      </div>

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
              {!loading &&
                paginated.map((client, idx) => (
                  <tr
                    key={client._id}
                    className="hover:bg-slate-50/80 transition-all"
                  >
                    <td className="px-8 py-5 text-center text-slate-300 font-bold text-xs">
                      {(page - 1) * itemsPerPage + idx + 1}
                    </td>

                    <td className="px-8 py-5">
                      <div className="font-bold text-slate-900 text-sm">
                        {client.clientName}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">
                        {client.destinationCountry || "Global"} •{" "}
                        {client.nationality || "N/A"}
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <div className="text-xs font-bold text-slate-700">
                        {client.contactNo || "N/A"}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold">
                        QID: {client.QID || "N/A"}
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

                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            navigate(`/client-details/${client._id}`)
                          }
                          className="w-24 h-9 flex items-center justify-center bg-white border border-slate-200 text-slate-900 text-[10px] rounded-xl font-black uppercase hover:bg-pink-200 transition-all"
                        >
                          Profile
                        </button>

                        {client.agreementFile ? (
                          <button
                            onClick={() =>
                              handleDownload(
                                client.agreementFile,
                                client.clientName
                              )
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

              {!loading && paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-8 py-10 text-center text-sm font-bold text-slate-400"
                  >
                    No clients found.
                  </td>
                </tr>
              )}

              {loading && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-8 py-10 text-center text-sm font-bold text-slate-400"
                  >
                    Loading clients...
                  </td>
                </tr>
              )}
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