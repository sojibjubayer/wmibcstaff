import React, { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function VisitorList() {
  const [visitors, setVisitors] = useState([]);
  const [consultantName, setConsultantName] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination & Filters
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchMobile, setSearchMobile] = useState("");
  const [filterVisa, setFilterVisa] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const [availableVisas, setAvailableVisas] = useState([]);
  const [availableCountries, setAvailableCountries] = useState([]);
  const [availableStatuses, setAvailableStatuses] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setConsultantName((user?.name || "").trim());
  }, []);

  // --- HELPER FUNCTIONS ---
  const formatLabel = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  const formatValue = (key, value) => {
    if (!value) return "N/A";
    if (key.toLowerCase().includes("date") || (typeof value === 'string' && value.includes('T'))) {
      const date = new Date(value);
      return isNaN(date.getTime()) ? String(value) : date.toLocaleDateString();
    }
    if (typeof value === "boolean") return value ? "Yes" : "No";
    return String(value);
  };

  // --- PDF GENERATION (Using DB Date & Time) ---
  const downloadPDF = (visitor) => {
    const doc = new jsPDF('p', 'pt', 'a4');

    // Header 
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59); 
    doc.setFont("helvetica", "bold");
    doc.text("Consultation Form", 40, 50);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text(`Consultant: ${consultantName}`, 40, 70);

    // ✅ FIX: Use Date and Time directly from DB
    const dbDate = visitor.date ? new Date(visitor.date).toLocaleDateString() : "N/A";
    const dbTime = visitor.time || ""; 
    const timestamp = `${dbDate} | ${dbTime}`;

    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text(`Issued on: ${timestamp}`, 40, 85);

    // Filter out 'time' from the table rows to avoid repetition
    const tableRows = Object.entries(visitor)
      .filter(([key]) => 
        !["_id", "__v", "createdAt", "consultant", "consultantName", "date", "time"].includes(key)
      )
      .map(([key, value]) => [formatLabel(key), formatValue(key, value)]);

    autoTable(doc, {
      startY: 105,
      head: [["Field", "Details"]],
      body: tableRows,
      theme: "striped",
      margin: { left: 40, right: 40 },
      headStyles: { 
        fillColor: [30, 41, 59],
        fontSize: 11,
        fontStyle: 'bold' 
      },
      styles: { 
        fontSize: 10, 
        cellPadding: 8,
        overflow: 'linebreak'
      },
      columnStyles: {
        0: { fontStyle: 'bold', textColor: [51, 65, 85], cellWidth: 206 },
        1: { cellWidth: 309 }
      }
    });

    doc.save(`${visitor.name.replace(/\s+/g, "_")}_Consultation.pdf`);
    toast.success(`PDF Generated for ${visitor.name}`);
  };

  // --- DATA FETCHING ---
  const fetchVisitors = useCallback(async () => {
    if (!consultantName) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({
        consultant: consultantName,
        page: currentPage,
        searchMobile,
        filterVisa,
        filterCountry,
        filterStatus,
        filterDate,
      });
      const res = await fetch(
        `https://wmibcstaff-server.vercel.app/api/visitor?${params}`,
      );
      const data = await res.json();
      setVisitors(data.visitors || []);
      setTotalPages(data.totalPages || 1);
      setAvailableVisas(data.visaCounts || []);
      setAvailableCountries(data.countryCounts || []);
      setAvailableStatuses(data.statusCounts || []);
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [consultantName, currentPage, searchMobile, filterVisa, filterCountry, filterStatus, filterDate]);

  useEffect(() => {
    fetchVisitors();
  }, [fetchVisitors]);

  const handleFilter = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchMobile("");
    setFilterVisa("");
    setFilterCountry("");
    setFilterStatus("");
    setFilterDate("");
    setCurrentPage(1);
    toast.success("Filters cleared");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <Toaster />
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Visitor Records</h1>
            <p className="text-sm text-slate-400 mt-1">Manage and review all visitor consultations</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={clearAllFilters} className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all">
              Clear Filters
            </button>
            <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-100">
              <span className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">Staff</span>
              <p className="text-sm font-bold text-emerald-700">{consultantName}</p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <input type="text" placeholder="Search by Mobile..." className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none" value={searchMobile} onChange={handleFilter(setSearchMobile)} />
            <input type="date" className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none" value={filterDate} onChange={handleFilter(setFilterDate)} />
            <select className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none" value={filterVisa} onChange={handleFilter(setFilterVisa)}>
              <option value="">All Visas</option>
              {availableVisas.map((v) => <option key={v._id} value={v._id}>{v._id}</option>)}
            </select>
            <select className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none" value={filterCountry} onChange={handleFilter(setFilterCountry)}>
              <option value="">All Countries</option>
              {availableCountries.map((c) => <option key={c._id} value={c._id}>{c._id}</option>)}
            </select>
            <select className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none" value={filterStatus} onChange={handleFilter(setFilterStatus)}>
              <option value="">All Statuses</option>
              {availableStatuses.map((s) => <option key={s._id} value={s._id}>{s._id}</option>)}
            </select>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="p-4">Visitor Type</th>
                <th className="p-4">Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Visa & Country</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="6" className="p-10 text-center text-slate-400">Loading visitors...</td></tr>
              ) : visitors.length === 0 ? (
                <tr><td colSpan="6" className="p-10 text-center text-slate-400">No visitors found</td></tr>
              ) : (
                visitors.map((v) => (
                  <tr key={v._id} className="hover:bg-slate-50 transition-all">
                    <td className="p-4"><span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">{v.visitorType}</span></td>
                    <td className="p-4 font-semibold text-slate-800">{v.name}</td>
                    <td className="p-4 text-slate-600">{v.mobile}</td>
                    <td className="p-4">
                      <div className="font-medium text-slate-800">{v.visaType}</div>
                      <div className="text-xs text-slate-400">{v.interestedCountry}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${v.consultationStatus === "Approved" ? "bg-green-100 text-green-700" : v.consultationStatus === "Rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {v.consultationStatus}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => setSelectedVisitor(v)} className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 text-white hover:bg-black transition-all">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-10">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="px-5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-all">Previous</button>
          <span className="text-sm font-medium text-slate-600">Page <span className="font-bold">{currentPage}</span> of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)} className="px-5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-all">Next</button>
        </div>
      </div>

      {/* Modal */}
      {selectedVisitor && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b flex justify-between items-start bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Complete Visitor Profile</h2>
                {selectedVisitor.visitorType && <span className="inline-block mt-2 px-3 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-700 uppercase">{selectedVisitor.visitorType}</span>}
              </div>
              <button onClick={() => setSelectedVisitor(null)} className="text-slate-400 hover:text-slate-600 text-3xl">&times;</button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {Object.entries(selectedVisitor)
                .filter(([key]) => !["_id", "__v", "createdAt"].includes(key))
                .map(([key, value]) => (
                  <div key={key} className="border-b border-slate-100 pb-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">{formatLabel(key)}</label>
                    <span className="text-sm font-medium text-slate-700 block">{formatValue(key, value)}</span>
                  </div>
                ))}
            </div>

            <div className="p-4 bg-slate-50 border-t flex justify-between gap-3">
              <button onClick={() => downloadPDF(selectedVisitor)} className="px-6 py-2 bg-yellow-200 text-gray-800 rounded-xl text-sm font-bold hover:bg-yellow-400 flex items-center gap-2">
                Download PDF
              </button>
              <button onClick={() => setSelectedVisitor(null)} className="px-6 py-2 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-black">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}