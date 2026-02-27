import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFilter, FaUndo, FaEye, FaPassport, FaUserTag, FaGlobe } from "react-icons/fa";

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
      const isAdminOrAccountant = userRole === "admin" || userRole === "accountant";

      // If Admin/Accountant, we send NO consultant param (to get all)
      // If regular user, we send their name as the consultant param
      const params = isAdminOrAccountant ? {} : { consultant: storedUser.name };

      const response = await axios.get(
        "https://wmibcstaff-server.vercel.app/api/clients",
        { params }
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
      const matchMobile = client.contactNo?.toString().toLowerCase().includes(query);
      const matchPassport = client.passport?.toString().toLowerCase().includes(query);
      const matchNewPassport = client.newPassport?.toString().toLowerCase().includes(query);

      const matchSearch = matchName || matchMobile || matchPassport || matchNewPassport;
      const matchVisa = visaFilter ? client.visaType === visaFilter : true;
      const matchCountry = countryFilter ? client.destinationCountry === countryFilter : true;

      return matchSearch && matchVisa && matchCountry;
    });
  }, [clients, searchQuery, visaFilter, countryFilter]);

  const resetFilters = () => {
    setSearchQuery("");
    setVisaFilter("");
    setCountryFilter("");
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mb-4"></div>
      <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">Loading Database...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Client Summary</h2>
            <p className="text-slate-500 text-sm font-medium">Manage and track your active visa applications</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">
              {filteredClients.length} Clients Found
            </span>
          </div>
        </div>

        {/* 🔍 Search + Filter Bar */}
        <div className="bg-white p-4 rounded-4xl shadow-xl shadow-slate-200/60 border border-white mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="relative group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-pink-400 transition-colors" />
              <input
                type="text"
                placeholder="Search Name, Mobile..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-pink-50 focus:border-pink-200 transition-all"
              />
            </div>

            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-xs" />
              <select
                value={visaFilter}
                onChange={(e) => setVisaFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none appearance-none font-medium text-slate-600"
              >
                <option value="">All Visa Types</option>
                <option value="Tourist">Tourist</option>
                <option value="Work Permit">Work Permit</option>
                <option value="Student">Student</option>
              </select>
            </div>

            <div className="relative">
              <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-xs" />
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none appearance-none font-medium text-slate-600"
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
              className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95 text-xs tracking-widest"
            >
              <FaUndo size={10} /> RESET FILTERS
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900">
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Client Identity</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Service Details</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Timeline</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <tr key={client._id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-sm">
                            {client.clientName?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm leading-none mb-1">{client.clientName}</p>
                            <p className="text-xs text-slate-400 font-medium">{client.contactNo}</p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold w-fit uppercase">
                            {client.visaType}
                          </span>
                          <p className="text-sm font-bold text-slate-700">{client.destinationCountry}</p>
                          <div className="flex items-center gap-1.5 text-[10px] text-pink-400 font-bold uppercase">
                            <FaPassport size={10} /> {client.passport}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-300 uppercase w-12">Submit:</span>
                            <span className="text-xs font-bold text-slate-600">{formatDate(client.fileSubmissionDate)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-300 uppercase w-12">Period:</span>
                            <span className="text-xs font-bold text-slate-600">{client.processingTime}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => navigate(`/client-details/${client._id}`)}
                          className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 hover:bg-pink-200 hover:text-slate-900 px-4 py-2 rounded-xl text-xs font-black transition-all"
                        >
                          <FaEye /> DETAILS
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-20">
                      <div className="flex flex-col items-center">
                        <div className="bg-slate-50 p-4 rounded-full mb-3">
                          <FaUserTag className="text-slate-200 text-3xl" />
                        </div>
                        <p className="text-slate-400 font-bold text-sm">No clients found matching your search</p>
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