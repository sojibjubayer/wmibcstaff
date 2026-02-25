import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-GB");
};

const ClientInfo = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Renamed to be more general
  const [searchQuery, setSearchQuery] = useState("");
  const [visaFilter, setVisaFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getClients = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser || !storedUser.name) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://wmibcstaff-server.vercel.app/api/clients",
          {
            params: { consultant: storedUser.name },
          },
        );

        setClients(response.data.reverse());
      } catch (err) {
        console.error(err);
        setError("Failed to fetch clients");
      } finally {
        setLoading(false);
      }
    };

    getClients();
  }, []);

  // ✅ UPDATED FILTER LOGIC: Search by Name OR Mobile OR Passport OR New Passport
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const query = searchQuery.toLowerCase();

      // Check Name
      const matchName = client.clientName?.toLowerCase().includes(query);

      // Check Mobile
      const matchMobile = client.contactNo
        ?.toString()
        .toLowerCase()
        .includes(query);

      // Check Original Passport
      const matchPassport = client.passport
        ?.toString()
        .toLowerCase()
        .includes(query);

      // Check New Passport (if it exists)
      const matchNewPassport = client.newPassport
        ?.toString()
        .toLowerCase()
        .includes(query);

      // Combine all conditions (Added matchName here)
      const matchSearch =
        matchName || matchMobile || matchPassport || matchNewPassport;

      const matchVisa = visaFilter ? client.visaType === visaFilter : true;

      const matchCountry = countryFilter
        ? client.destinationCountry === countryFilter
        : true;

      return matchSearch && matchVisa && matchCountry;
    });
  }, [clients, searchQuery, visaFilter, countryFilter]);

  const handleViewDetails = (id) => {
    navigate(`/client-details/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading clients...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  // RESET FILTER
  const resetFilters = () => {
    setSearchQuery("");
    setVisaFilter("");
    setCountryFilter("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">
        Client Information Summary
      </h2>

      {/* 🔍 Search + Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Search by Name, Mobile, Passport */}
        <input
          type="text"
          placeholder="Search Name, Mobile or Passport..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-emerald-400 px-4 py-2 rounded-md w-full md:w-1/4 focus:ring-2 focus:ring-emerald-300 outline-none"
        />

        {/* Filter by Visa Type */}
        <select
          value={visaFilter}
          onChange={(e) => setVisaFilter(e.target.value)}
          className="border px-4 py-2 rounded-md w-full md:w-1/4"
        >
          <option value="">All Visa Types</option>
          <option value="Tourist">Tourist</option>
          <option value="Work Permit">Work Permit</option>
          <option value="Student">Student</option>
        </select>

        {/* Filter by Destination Country */}
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="border px-4 py-2 rounded-md w-full md:w-1/4"
        >
          <option value="">All Destinations</option>
          <option value="Greece">Greece</option>
          <option value="Portugal">Portugal</option>
          <option value="Poland">Poland</option>
          <option value="Bulgaria">Bulgaria</option>
          <option value="Croatia">Croatia</option>
          <option value="Serbia">Serbia</option>
          <option value="North Macedonia">North Macedonia</option>
          <option value="Cyprus">Cyprus</option>
        </select>
        {/* ✅ RESET BUTTON */}
        <button
          onClick={resetFilters}
          className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-6 py-2 rounded-md font-bold transition text-sm w-full md:w-auto"
        >
          RESET
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-emerald-200 text-gray-700">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Contact / Passport</th>
              <th className="px-6 py-3">Visa Type</th>
              <th className="px-6 py-3">Destination</th>
              <th className="px-6 py-3">File Submission</th>
              <th className="px-6 py-3">Processing Time</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <tr key={client._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {client.clientName}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-800">{client.contactNo}</div>
                    <div className="text-xs text-emerald-600 font-semibold">
                      P: {client.passport}
                      {client.newPassport ? ` / ${client.newPassport}` : ""}
                    </div>
                  </td>
                  <td className="px-6 py-4">{client.visaType}</td>
                  <td className="px-6 py-4">{client.destinationCountry}</td>
                  <td className="px-6 py-4">
                    {formatDate(client.fileSubmissionDate)}
                  </td>
                  <td className="px-6 py-4">{client.processingTime}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleViewDetails(client._id)}
                      className="bg-emerald-300 hover:bg-emerald-400 text-gray-700 hover:text-white px-4 py-2 rounded-md text-xs font-bold"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No clients found matching "{searchQuery}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientInfo;
