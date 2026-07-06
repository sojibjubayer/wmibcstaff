import React, { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  FaFilePdf,
  FaTimes,
  FaUserCircle,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaPassport,
  FaEdit,
  FaSave,
} from "react-icons/fa";

export default function VisitorList() {
  const [visitors, setVisitors] = useState([]);
  const [consultantName, setConsultantName] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination & Filters
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Search States
  const [searchMobile, setSearchMobile] = useState("");
  const [debouncedMobile, setDebouncedMobile] = useState(""); // For API performance
  const [filterVisa, setFilterVisa] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Modal & Edit States
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  // Dynamic Options from Backend
  const [availableVisas, setAvailableVisas] = useState([]);
  const [availableCountries, setAvailableCountries] = useState([]);
  const [availableStatuses, setAvailableStatuses] = useState([]);

  // Load User Data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setConsultantName((user?.name || "").trim());
  }, []);

  // 1. DEBOUNCE LOGIC: Wait 500ms after user stops typing mobile number
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedMobile(searchMobile);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchMobile]);

  const formatLabel = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  const formatValue = (key, value) => {
    if (!value) return "N/A";
    if (
      key.toLowerCase().includes("date") ||
      (typeof value === "string" && value.includes("T"))
    ) {
      const date = new Date(value);
      return isNaN(date.getTime()) ? String(value) : date.toLocaleDateString();
    }
    return String(value);
  };

  // 2. FETCH DATA: Updated to use debounced value and specific query keys
  const fetchVisitors = useCallback(async () => {
    if (!consultantName) return;
    setLoading(true);
    try {
      // Ensure these keys (mobile, visaType, etc.) match your Express/MongoDB query keys
      const params = new URLSearchParams({
        consultant: consultantName,
        page: currentPage,
        mobile: debouncedMobile, // Key must be 'mobile'
        visaType: filterVisa, // Key must be 'visaType'
        filterCountry: filterCountry, // Key must match backend
        filterStatus: filterStatus, // Key must match backend
        filterDate: filterDate,
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
      toast.error("Load failed");
    } finally {
      setLoading(false);
    }
  }, [
    consultantName,
    currentPage,
    debouncedMobile,
    filterVisa,
    filterCountry,
    filterStatus,
    filterDate,
  ]);

  useEffect(() => {
    fetchVisitors();
  }, [fetchVisitors]);

  const handleOpenDetails = (visitor) => {
    setSelectedVisitor(visitor);
    setEditData(visitor);
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    const updatePromise = async () => {
      const { _id, ...updatePayload } = editData;
      const res = await fetch(
        `https://wmibcstaff-server.vercel.app/api/visitor/${_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatePayload),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      setVisitors((prev) =>
        prev.map((v) => (v._id === _id ? { ...v, ...updatePayload } : v)),
      );
      setSelectedVisitor({ ...selectedVisitor, ...updatePayload });
      setIsEditing(false);
      return data;
    };

    toast.promise(
      updatePromise(),
      {
        loading: "Saving changes... ✨",
        success: "Visitor updated! 💖",
        error: (err) => `Oops! ${err.message} ❌`,
      },
      {
        style: { borderRadius: "15px", background: "#0f172a", color: "#fff" },
      },
    );
  };

  const downloadPDF = (visitor) => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.setFontSize(20);
    doc.setTextColor(15, 23, 42);
    doc.text("Consultation Profile", 40, 50);
    const tableRows = Object.entries(visitor)
      .filter(
        ([key]) =>
          !["_id", "__v", "createdAt", "consultant", "date", "time"].includes(
            key,
          ),
      )
      .map(([key, value]) => [formatLabel(key), formatValue(key, value)]);
    autoTable(doc, {
      startY: 80,
      head: [["Field", "Info"]],
      body: tableRows,
      theme: "striped",
      headStyles: { fillColor: [15, 23, 42] },
    });
    doc.save(`${visitor.name}_Profile.pdf`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 p-3 font-sans text-blue-50 md:p-6">
      <Toaster position="top-right" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-linear(circle_at_top_left,rgba(37,99,235,0.34),transparent_32%),radial-linear(circle_at_bottom_right,rgba(14,165,233,0.22),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-linear(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-linear(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[44px_44px] opacity-20" />

      <div className="relative mx-auto max-w-5xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-3 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-300/30 bg-white/10 text-sky-200 shadow-lg shadow-blue-500/20">
              <FaPassport size={16} />
            </div>
            <h1 className="text-base font-black uppercase tracking-tight text-white">
              Visitor Log
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-[10px] font-black uppercase leading-none tracking-wider text-blue-100/60">
                {consultantName}
              </p>
            </div>
            <FaUserCircle size={22} className="text-sky-200/70" />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-6">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-blue-100/35" />
              <input
                type="text"
                placeholder="Mobile"
                className="w-full rounded-xl border border-white/10 bg-slate-950/45 py-2.5 pl-8 pr-2 text-[11px] font-bold text-white outline-none transition-all placeholder:text-blue-100/35 focus:border-sky-300/70 focus:ring-4 focus:ring-sky-400/20"
                value={searchMobile}
                onChange={(e) => {
                  setSearchMobile(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <input
              type="date"
              className="w-full rounded-xl border border-white/10 bg-slate-950/45 px-2 py-2.5 text-[11px] font-bold text-white outline-none transition-all focus:border-sky-300/70 focus:ring-4 focus:ring-sky-400/20"
              value={filterDate}
              onChange={(e) => {
                setFilterDate(e.target.value);
                setCurrentPage(1);
              }}
            />

            <select
              className="w-full rounded-xl border border-white/10 bg-slate-950/45 px-2 py-2.5 text-[11px] font-bold text-white outline-none transition-all focus:border-sky-300/70 focus:ring-4 focus:ring-sky-400/20"
              value={filterVisa}
              onChange={(e) => {
                setFilterVisa(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Visas</option>
              {availableVisas.map((v) => (
                <option key={v._id} value={v._id}>
                  {v._id}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded-xl border border-white/10 bg-slate-950/45 px-2 py-2.5 text-[11px] font-bold text-white outline-none transition-all focus:border-sky-300/70 focus:ring-4 focus:ring-sky-400/20"
              value={filterCountry}
              onChange={(e) => {
                setFilterCountry(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Countries</option>
              {availableCountries.map((c) => (
                <option key={c._id} value={c._id}>
                  {c._id}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded-xl border border-white/10 bg-slate-950/45 px-2 py-2.5 text-[11px] font-bold text-white outline-none transition-all focus:border-sky-300/70 focus:ring-4 focus:ring-sky-400/20"
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Statuses</option>
              {availableStatuses.map((s) => (
                <option key={s._id} value={s._id}>
                  {s._id}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setSearchMobile("");
                setFilterVisa("");
                setFilterCountry("");
                setFilterStatus("");
                setFilterDate("");
                setCurrentPage(1);
              }}
              className="w-full rounded-xl bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400 py-2.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-400/45 active:scale-95"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] shadow-2xl shadow-blue-950/50 backdrop-blur-2xl">
          <div className="overflow-x-auto">
          <table className="w-full min-w-190 table-fixed border-collapse text-left">
            <thead>
              <tr className="bg-slate-950/80">
                <th className="w-1/3 border-b border-white/10 p-3 text-[10px] font-black uppercase tracking-widest text-blue-100/45">
                  Visitor
                </th>
                <th className="hidden border-b border-white/10 p-3 text-[10px] font-black uppercase tracking-widest text-blue-100/45 md:table-cell">
                  Contact
                </th>
                <th className="border-b border-white/10 p-3 text-[10px] font-black uppercase tracking-widest text-blue-100/45">
                  Service
                </th>
                <th className="border-b border-white/10 p-3 text-center text-[10px] font-black uppercase tracking-widest text-blue-100/45">
                  Status
                </th>
                <th className="w-20 border-b border-white/10 p-3 text-right text-[10px] font-black uppercase tracking-widest text-blue-100/45">
                  View
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-10 text-center text-xs font-bold text-blue-100/50"
                  >
                    Loading...
                  </td>
                </tr>
              ) : visitors.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-10 text-center text-xs font-black uppercase text-blue-100/45"
                  >
                    No Records Found
                  </td>
                </tr>
              ) : (
                visitors.map((v) => (
                  <tr
                    key={v._id}
                    className="group transition-all hover:bg-sky-400/10"
                  >
                    <td className="p-3">
                      <p className="truncate text-xs font-black capitalize text-white">
                        {v.name}
                      </p>
                      <p className="text-[9px] text-blue-100/45">
                        {v.date ? new Date(v.date).toLocaleDateString() : "N/A"}
                      </p>
                    </td>
                    <td className="hidden p-3 text-xs font-medium text-blue-100/65 md:table-cell">
                      {v.mobile}
                    </td>
                    <td className="p-3 truncate">
                      <span className="mr-1 rounded border border-sky-300/20 bg-sky-400/10 px-1.5 py-0.5 text-[9px] font-black uppercase text-sky-100">
                        {v.visaType}
                      </span>
                      <span className="text-[11px] font-black text-blue-50">
                        {v.interestedCountry}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-1 text-[8px] font-black rounded-full uppercase tracking-tighter ${
                          v.consultationStatus === "Highly Interested"
                            ? "border border-sky-300/25 bg-sky-400/15 text-sky-100"
                            : "border border-blue-300/20 bg-blue-500/10 text-blue-100"
                        }`}
                      >
                        {v.consultationStatus?.split(" ")[0]}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleOpenDetails(v)}
                        className="rounded-lg bg-sky-400/15 p-1.5 text-sky-100 transition-all hover:bg-sky-400/25 hover:text-white"
                      >
                        <FaPassport size={12} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Pagination */}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 bg-slate-950/45 p-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="rounded-lg border border-white/10 bg-white/[0.07] p-1.5 text-blue-50 disabled:opacity-30"
            >
              <FaChevronLeft size={10} />
            </button>
            <span className="text-[9px] font-black uppercase tracking-widest text-blue-100/50">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="rounded-lg border border-white/10 bg-white/[0.07] p-1.5 text-blue-50 disabled:opacity-30"
            >
              <FaChevronRight size={10} />
            </button>
          </div>
        </div>
      </div>

      {/* Editable Detail Modal */}
      {selectedVisitor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-blue-950/70">
            <div className="flex items-center justify-between border-b border-white/10 bg-linear-to-r from-blue-950 via-blue-900 to-sky-900 p-5">
              <h2 className="text-sm font-black text-white uppercase tracking-widest">
                {isEditing ? "Editing Visitor" : "Visitor Detail"}
              </h2>
              <button
                onClick={() => {
                  setSelectedVisitor(null);
                  setIsEditing(false);
                }}
                className="text-blue-100/50 transition-all hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid max-h-[50vh] grid-cols-1 gap-4 overflow-y-auto p-5 sm:grid-cols-2">
              {Object.entries(editData)
                .filter(
                  ([key]) =>
                    !["_id", "__v", "createdAt", "consultant"].includes(key),
                )
                .map(([key, value]) => (
                  <div key={key} className="border-b border-white/10 pb-2">
                    <label className="mb-1 block text-[8px] font-black uppercase tracking-widest text-blue-100/45">
                      {formatLabel(key)}
                    </label>
                    {isEditing ? (
                      <input
                        className="w-full rounded-lg border border-white/10 bg-slate-900/70 p-2 text-[11px] font-bold text-white outline-none transition-all focus:border-sky-300/70 focus:ring-4 focus:ring-sky-400/20"
                        value={value || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, [key]: e.target.value })
                        }
                      />
                    ) : (
                      <span className="block truncate text-[11px] font-bold text-blue-50">
                        {formatValue(key, value)}
                      </span>
                    )}
                  </div>
                ))}
            </div>

            <div className="flex gap-2 border-t border-white/10 bg-slate-950/70 p-5">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] py-3 text-[10px] font-black uppercase tracking-widest text-blue-50 transition-all hover:border-sky-300/30 hover:bg-sky-400/10"
                  >
                    <FaEdit /> Edit Profile
                  </button>
                  <button
                    onClick={() => downloadPDF(selectedVisitor)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-400/45"
                  >
                    <FaFilePdf /> PDF Report
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleUpdate}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-400/45"
                  >
                    <FaSave /> Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditData(selectedVisitor);
                    }}
                    className="flex-1 rounded-xl border border-white/10 bg-white/[0.07] py-3 text-[10px] font-black uppercase tracking-widest text-blue-100/65 transition-all hover:bg-white/10 hover:text-white"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
