import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaUndo,
  FaEye,
  FaPassport,
  FaUserTag,
  FaGlobe,
  FaDownload,
} from "react-icons/fa";

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-GB");
};

const ClientInfo = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [visaFilter, setVisaFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getClients = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser || !storedUser.name) {
          setError("Session expired. Please login again.");
          setLoading(false);
          return;
        }

        const userRole = storedUser.role?.toLowerCase();
        const isAdminOrAccountant =
          userRole === "admin" || userRole === "accountant";

        const params = isAdminOrAccountant
          ? {}
          : { consultant: storedUser.name };

        const response = await axios.get(
          "https://wmibcstaff-server.vercel.app/api/clients",
          { params },
        );

        setClients(response.data.reverse());
      } catch (err) {
        setError("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };

    getClients();
  }, []);

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const query = searchQuery.toLowerCase();
      const matchName = client.clientName?.toLowerCase().includes(query);
      const matchMobile = client.contactNo
        ?.toString()
        .toLowerCase()
        .includes(query);
      const matchPassport = client.passport
        ?.toString()
        .toLowerCase()
        .includes(query);
      const matchNewPassport = client.newPassport
        ?.toString()
        .toLowerCase()
        .includes(query);

      const matchSearch =
        matchName || matchMobile || matchPassport || matchNewPassport;
      const matchVisa = visaFilter ? client.visaType === visaFilter : true;
      const matchCountry = countryFilter
        ? client.destinationCountry === countryFilter
        : true;

      return matchSearch && matchVisa && matchCountry;
    });
  }, [clients, searchQuery, visaFilter, countryFilter]);

  const resetFilters = () => {
    setSearchQuery("");
    setVisaFilter("");
    setCountryFilter("");
  };

  const handleDownload = (fileUrl, clientName) => {
    if (!fileUrl) return;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download = `${clientName || "agreement"}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const inputStyle =
    "w-full rounded-2xl border border-white/10 bg-slate-950/45 py-3 pl-11 pr-4 text-sm font-medium text-white placeholder:text-blue-100/35 outline-none transition-all focus:border-sky-300/70 focus:bg-slate-950/65 focus:ring-4 focus:ring-sky-400/20";

  const selectStyle =
    "w-full appearance-none rounded-2xl border border-white/10 bg-slate-950/45 py-3 pl-10 pr-4 text-sm font-bold text-blue-50 outline-none transition-all focus:border-sky-300/70 focus:bg-slate-950/65 focus:ring-4 focus:ring-sky-400/20";

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-950">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-2 border-sky-400/20 border-b-sky-300" />
        <p className="animate-pulse text-xs font-black uppercase tracking-widest text-blue-100/60">
          Loading Database...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 p-4">
        <p className="rounded-2xl border border-red-300/20 bg-red-500/10 px-5 py-4 text-sm font-black text-red-100">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 p-4 md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-linear(circle_at_top_left,rgba(37,99,235,0.34),transparent_32%),radial-linear(circle_at_bottom_right,rgba(14,165,233,0.22),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-linear(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-linear(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[44px_44px] opacity-20" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white">
              Client Summary
            </h2>
            <p className="text-sm font-medium text-blue-100/60">
              Manage and track your active visa applications
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-2 shadow-lg shadow-blue-950/30 backdrop-blur-xl">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-xs font-black uppercase tracking-wider text-blue-50">
              {filteredClients.length} Clients Found
            </span>
          </div>
        </div>

        <div className="mb-8 rounded-4xl border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="group relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-100/35 transition-colors group-focus-within:text-sky-300" />
              <input
                type="text"
                placeholder="Search Name, Mobile..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={inputStyle}
              />
            </div>

            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-blue-100/35" />
              <select
                value={visaFilter}
                onChange={(e) => setVisaFilter(e.target.value)}
                className={selectStyle}
              >
                <option value="">All Visa Types</option>
                <option value="Tourist">Tourist</option>
                <option value="Work Permit">Work Permit</option>
                <option value="Student">Student</option>
              </select>
            </div>

            <div className="relative">
              <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-blue-100/35" />
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className={selectStyle}
              >
                <option value="">All Destinations</option>
                <option value="Greece">Greece</option>
                <option value="Portugal">Portugal</option>
                <option value="Poland">Poland</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Croatia">Croatia</option>
                <option value="Serbia">Serbia</option>
                <option value="Cyprus">Cyprus</option>
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400 px-6 py-3 text-xs font-black tracking-widest text-white shadow-xl shadow-blue-500/25 transition-all hover:shadow-blue-400/45 active:scale-95"
            >
              <FaUndo size={10} /> RESET FILTERS
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/[0.07] shadow-2xl shadow-blue-950/60 backdrop-blur-2xl md:rounded-[2.5rem]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-230 border-collapse text-left">
              <thead>
                <tr className="bg-slate-950/80">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/45">
                    Client Identity
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/45">
                    Service Details
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/45">
                    Timeline
                  </th>
                  <th className="px-6 py-5 text-center text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/45">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <tr
                      key={client._id}
                      className="group transition-colors hover:bg-sky-400/10"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-300/25 bg-sky-400/15 text-sm font-black text-sky-100">
                            {client.clientName?.charAt(0)}
                          </div>
                          <div>
                            <p className="mb-1 text-sm font-black leading-none text-white">
                              {client.clientName}
                            </p>
                            <p className="text-xs font-medium text-blue-100/50">
                              {client.contactNo}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex w-fit items-center rounded-lg border border-sky-300/20 bg-sky-400/10 px-2 py-0.5 text-[10px] font-black uppercase text-sky-100">
                            {client.visaType}
                          </span>
                          <p className="text-sm font-black text-blue-50">
                            {client.destinationCountry}
                          </p>
                          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-sky-300">
                            <FaPassport size={10} /> {client.passport}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-12 text-[10px] font-black uppercase text-blue-100/35">
                              Submit:
                            </span>
                            <span className="text-xs font-black text-blue-50">
                              {formatDate(client.fileSubmissionDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-12 text-[10px] font-black uppercase text-blue-100/35">
                              Period:
                            </span>
                            <span className="text-xs font-black text-blue-50">
                              {client.processingTime}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-center">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              navigate(`/client-details/${client._id}`)
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-sky-300/20 bg-sky-400/10 px-4 py-2 text-xs font-black text-sky-100 transition-all hover:bg-sky-400/20 hover:text-white"
                          >
                            <FaEye /> DETAILS
                          </button>

                          {client.agreementFile ? (
                            <button
                              onClick={() =>
                                handleDownload(
                                  client.agreementFile,
                                  client.clientName,
                                )
                              }
                              className="flex h-9 w-28 items-center justify-center gap-1 rounded-xl border border-emerald-300/20 bg-emerald-500/10 text-[10px] font-black text-emerald-200 transition-all hover:bg-emerald-500/20 hover:text-white"
                            >
                              <FaDownload size={12} /> Download File
                            </button>
                          ) : (
                            <div className="flex h-9 w-28 items-center justify-center rounded-xl border border-white/10 bg-slate-950/45 text-[10px] font-black uppercase text-blue-100/35">
                              No File
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-20 text-center">
                      <div className="flex flex-col items-center">
                        <div className="mb-3 rounded-full border border-white/10 bg-slate-950/45 p-4">
                          <FaUserTag className="text-3xl text-blue-100/25" />
                        </div>
                        <p className="text-sm font-black text-blue-100/50">
                          No clients found matching your search
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
