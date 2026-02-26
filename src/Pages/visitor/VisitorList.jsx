import React, { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFilePdf, FaTimes, FaUserCircle, FaSearch, FaChevronLeft, FaChevronRight, FaPassport } from "react-icons/fa";

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

  const formatLabel = (key) => key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
  const formatValue = (key, value) => {
    if (!value) return "N/A";
    if (key.toLowerCase().includes("date") || (typeof value === 'string' && value.includes('T'))) {
      const date = new Date(value);
      return isNaN(date.getTime()) ? String(value) : date.toLocaleDateString();
    }
    return String(value);
  };

  const downloadPDF = (visitor) => {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setFontSize(20);
    doc.setTextColor(15, 23, 42);
    doc.text("Consultation Profile", 40, 50);
    const tableRows = Object.entries(visitor)
      .filter(([key]) => !["_id", "__v", "createdAt", "consultant", "date", "time"].includes(key))
      .map(([key, value]) => [formatLabel(key), formatValue(key, value)]);
    autoTable(doc, { startY: 80, head: [["Field", "Info"]], body: tableRows, theme: "striped", headStyles: { fillColor: [15, 23, 42] } });
    doc.save(`${visitor.name}_Profile.pdf`);
  };

  const fetchVisitors = useCallback(async () => {
    if (!consultantName) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ consultant: consultantName, page: currentPage, searchMobile, filterVisa, filterCountry, filterStatus, filterDate });
      const res = await fetch(`https://wmibcstaff-server.vercel.app/api/visitor?${params}`);
      const data = await res.json();
      setVisitors(data.visitors || []);
      setTotalPages(data.totalPages || 1);
      setAvailableVisas(data.visaCounts || []);
      setAvailableCountries(data.countryCounts || []);
      setAvailableStatuses(data.statusCounts || []);
    } catch (err) { toast.error("Load failed"); } finally { setLoading(false); }
  }, [consultantName, currentPage, searchMobile, filterVisa, filterCountry, filterStatus, filterDate]);

  useEffect(() => { fetchVisitors(); }, [fetchVisitors]);

  return (
    <div className="min-h-screen bg-slate-100 p-2 md:p-6 text-slate-700">
      <Toaster position="top-right" />
      
      {/* Centered & Width-Limited Container */}
      <div className="max-w-5xl mx-auto space-y-4">
        
        {/* Compact Header */}
        <div className="flex justify-between items-center bg-white px-5 py-3 rounded-2xl border border-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-pink-200 rounded-lg flex items-center justify-center text-slate-900 shadow-sm"><FaPassport size={16} /></div>
            <h1 className="text-base font-black text-slate-900 tracking-tight uppercase">Visitor Log</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right"><p className="text-[10px] font-bold text-slate-400 uppercase leading-none">{consultantName}</p></div>
            <FaUserCircle size={20} className="text-slate-300" />
          </div>
        </div>

        {/* Dense Filter Bar */}
        <div className="bg-slate-900 p-4 rounded-2xl shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            <div className="relative">
                <FaSearch className="absolute left-3 top-2.5 text-slate-500 text-[10px]" />
                <input type="text" placeholder="Mobile" className="w-full pl-8 pr-2 py-2 bg-slate-800 border-none rounded-lg text-[11px] text-white outline-none" value={searchMobile} onChange={(e) => {setSearchMobile(e.target.value); setCurrentPage(1);}} />
            </div>
            <input type="date" className="w-full px-2 py-2 bg-slate-800 border-none rounded-lg text-[11px] text-white outline-none" value={filterDate} onChange={(e) => {setFilterDate(e.target.value); setCurrentPage(1);}} />
            <select className="w-full px-2 py-2 bg-slate-800 border-none rounded-lg text-[11px] text-white outline-none" value={filterVisa} onChange={(e) => {setFilterVisa(e.target.value); setCurrentPage(1);}}>
              <option value="">Visas</option>
              {availableVisas.map((v) => <option key={v._id} value={v._id}>{v._id}</option>)}
            </select>
            <select className="w-full px-2 py-2 bg-slate-800 border-none rounded-lg text-[11px] text-white outline-none" value={filterCountry} onChange={(e) => {setFilterCountry(e.target.value); setCurrentPage(1);}}>
              <option value="">Countries</option>
              {availableCountries.map((c) => <option key={c._id} value={c._id}>{c._id}</option>)}
            </select>
            <select className="w-full px-2 py-2 bg-slate-800 border-none rounded-lg text-[11px] text-white outline-none" value={filterStatus} onChange={(e) => {setFilterStatus(e.target.value); setCurrentPage(1);}}>
              <option value="">Status</option>
              {availableStatuses.map((s) => <option key={s._id} value={s._id}>{s._id}</option>)}
            </select>
            <button onClick={() => {setSearchMobile(""); setFilterVisa(""); setFilterCountry(""); setFilterStatus(""); setFilterDate("");}} className="w-full py-2 bg-pink-200 text-slate-900 font-bold rounded-lg text-[10px] uppercase tracking-widest hover:bg-pink-300 transition-all">Reset</button>
          </div>
        </div>

        {/* Table Content - Narrower & Truncated */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="bg-slate-50">
                <th className="w-1/3 p-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">Visitor</th>
                <th className="hidden md:table-cell p-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">Contact</th>
                <th className="p-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">Service</th>
                <th className="p-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b text-center">Status</th>
                <th className="w-20 p-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan="5" className="p-10 text-center text-slate-400 text-xs">Loading...</td></tr>
              ) : visitors.length === 0 ? (
                <tr><td colSpan="5" className="p-10 text-center text-slate-300 text-xs uppercase font-bold">No Records</td></tr>
              ) : (
                visitors.map((v) => (
                  <tr key={v._id} className="hover:bg-slate-50 transition-all group">
                    <td className="p-3">
                      <p className="font-bold text-slate-900 text-xs truncate capitalize">{v.name}</p>
                      <p className="text-[9px] text-slate-400">{v.date ? new Date(v.date).toLocaleDateString() : 'N/A'}</p>
                    </td>
                    <td className="hidden md:table-cell p-3 text-xs text-slate-600 font-medium">{v.mobile}</td>
                    <td className="p-3 truncate">
                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-bold uppercase mr-1">{v.visaType}</span>
                        <span className="text-[11px] font-bold text-slate-800">{v.interestedCountry}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 text-[8px] font-black rounded-full uppercase tracking-tighter ${
                        v.consultationStatus === "Highly Interested" ? "bg-emerald-100 text-emerald-700" : "bg-pink-100 text-pink-600"
                      }`}>{v.consultationStatus.split(' ')[0]}</span>
                    </td>
                    <td className="p-3 text-right">
                      <button onClick={() => setSelectedVisitor(v)} className="p-1.5 bg-slate-900 text-white rounded-lg hover:bg-pink-300 hover:text-slate-900 transition-all">
                        <FaPassport size={12}/>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Compact Pagination */}
          <div className="p-3 bg-slate-50 border-t flex justify-between items-center">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="p-1.5 rounded-lg border bg-white disabled:opacity-30"><FaChevronLeft size={10}/></button>
            <span className="text-[9px] font-black text-slate-400 uppercase">Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)} className="p-1.5 rounded-lg border bg-white disabled:opacity-30"><FaChevronRight size={10}/></button>
          </div>
        </div>
      </div>

      {/* Tighter Detail Modal */}
      {selectedVisitor && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-5 bg-slate-900 flex justify-between items-center">
              <h2 className="text-sm font-black text-white uppercase tracking-widest">Visitor Detail</h2>
              <button onClick={() => setSelectedVisitor(null)} className="text-slate-400 hover:text-white"><FaTimes/></button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto">
              {Object.entries(selectedVisitor)
                .filter(([key]) => !["_id", "__v", "createdAt"].includes(key))
                .map(([key, value]) => (
                  <div key={key} className="border-b border-slate-50 pb-1">
                    <label className="text-[8px] font-black text-slate-300 uppercase block">{formatLabel(key)}</label>
                    <span className="text-[11px] font-bold text-slate-800 block truncate">{formatValue(key, value)}</span>
                  </div>
                ))}
            </div>
            <div className="p-5 bg-slate-50 flex gap-2">
              <button onClick={() => downloadPDF(selectedVisitor)} className="flex-1 py-3 bg-pink-200 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"><FaFilePdf/> PDF Report</button>
              <button onClick={() => setSelectedVisitor(null)} className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}