import React, { useEffect, useMemo, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FaSearch,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaEye,
  FaTimes,
} from "react-icons/fa";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://wmibcstaff-server.vercel.app";

const initialForm = {
  clientName: "",
  mobile: "",
  qid: "",
  passport: "",
  processingCountry: "",
  startDate: "",
  appliedForRefund: "No",
  refundApplicationDate: "",
  previousRefundDate: "",
  nextRefundDate: "",
  totalAmount: "",
  amountAfterDeduction: "",
  paidAmount: "",
  dueAmount: "",
  clientConsultantName: "",
  refundConsultantName: "",
  note: "",
};

const calculateSpentTime = (startDate) => {
  if (!startDate) return "Select visa applied date";

  const start = new Date(startDate);
  const today = new Date();

  if (Number.isNaN(start.getTime())) return "Invalid date";

  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (start > today) return "Date is in future";

  let years = today.getFullYear() - start.getFullYear();
  let months = today.getMonth() - start.getMonth();
  let days = today.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);

  return parts.length ? parts.join(", ") : "Today";
};

const formatDate = (dateValue) => {
  if (!dateValue) return "-";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateForInput = (dateValue) => {
  if (!dateValue) return "";

  if (typeof dateValue === "string" && /^\d{4}-\d{2}-\d{2}/.test(dateValue)) {
    return dateValue.slice(0, 10);
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getPreviousRefundDate = (item) => {
  return (
    item?.previousRefundDate ||
    item?.prevRefundDate ||
    item?.previousRefund ||
    item?.previousRefunddate ||
    ""
  );
};

const getLoggedUserName = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    return (
      user?.name ||
      user?.userName ||
      user?.username ||
      user?.fullName ||
      user?.email ||
      ""
    )
      .toString()
      .trim();
  } catch {
    return "";
  }
};

const isRefundApplied = (value) => {
  return String(value || "").trim().toLowerCase() === "yes";
};

const formatAmount = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  return value;
};

const sortByNearestNextRefundDate = (items = []) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return items.slice().sort((a, b) => {
    const dateA = a?.nextRefundDate ? new Date(a.nextRefundDate) : null;
    const dateB = b?.nextRefundDate ? new Date(b.nextRefundDate) : null;

    const timeA =
      dateA && !Number.isNaN(dateA.getTime())
        ? Math.abs(dateA.setHours(0, 0, 0, 0) - today.getTime())
        : Infinity;

    const timeB =
      dateB && !Number.isNaN(dateB.getTime())
        ? Math.abs(dateB.setHours(0, 0, 0, 0) - today.getTime())
        : Infinity;

    return timeA - timeB;
  });
};

const Field = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  readOnly = false,
}) => {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
          readOnly
            ? "cursor-not-allowed border-orange-200 bg-orange-50 font-bold text-orange-700"
            : "border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        }`}
      />
    </div>
  );
};

const SelectField = ({ label, name, value, onChange, required, disabled }) => {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full rounded-xl border px-4 py-3 text-sm font-bold outline-none transition ${
          disabled
            ? "cursor-not-allowed border-orange-200 bg-orange-50 text-orange-700"
            : "border-slate-200 bg-white text-slate-800 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        }`}
      >
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
    </div>
  );
};

const NotesHistory = ({ latestNote, history = [], latestUpdatedAt }) => {
  const [expanded, setExpanded] = useState(false);

  const cleanLatestNote = String(latestNote || "").trim();

  const historyNotes = Array.isArray(history)
    ? history
        .filter((item) => String(item?.note || "").trim())
        .slice()
        .reverse()
    : [];

  const latestHistoryNote = historyNotes[0];

  const isLatestDuplicatedInHistory =
    cleanLatestNote &&
    latestHistoryNote &&
    String(latestHistoryNote.note || "").trim() === cleanLatestNote;

  const finalHistoryNotes = isLatestDuplicatedInHistory
    ? historyNotes
    : [
        ...(cleanLatestNote
          ? [
              {
                note: cleanLatestNote,
                createdAt: latestUpdatedAt,
                refundConsultantName: "Latest",
              },
            ]
          : []),
        ...historyNotes,
      ];

  const visibleNotes = expanded
    ? finalHistoryNotes
    : finalHistoryNotes.slice(0, 2);

  if (finalHistoryNotes.length === 0) {
    return <span className="text-slate-400">-</span>;
  }

  return (
    <div className="space-y-3">
      {visibleNotes.map((item, index) => {
        const isLatest = index === 0;

        return (
          <div
            key={`${item.createdAt || index}-${index}`}
            className={`rounded-xl border px-3 py-2 ${
              isLatest
                ? "border-orange-100 bg-orange-50"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="mb-1 flex items-center justify-between gap-3">
              <p
                className={`text-xs font-black ${
                  isLatest ? "text-orange-700" : "text-slate-700"
                }`}
              >
                {formatDate(item.createdAt || latestUpdatedAt)}
              </p>

              <p className="text-[11px] font-bold text-slate-500">
                {isLatest ? "Latest" : item.refundConsultantName || "-"}
              </p>
            </div>

            <p className="whitespace-pre-wrap wrap-break-word text-sm text-slate-700">
              {item.note || "-"}
            </p>
          </div>
        );
      })}

      {finalHistoryNotes.length > 2 && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-orange-700 transition hover:bg-orange-200"
        >
          {expanded
            ? "Show less notes"
            : `Show all ${finalHistoryNotes.length} notes`}
        </button>
      )}
    </div>
  );
};

const RefundDateHistory = ({ history = [], currentNextRefundDate }) => {
  if (!Array.isArray(history) || history.length === 0) {
    return currentNextRefundDate ? (
      <div className="rounded-xl border border-orange-100 bg-orange-50 px-3 py-2">
        <p className="text-xs font-black text-orange-700">
          Next: {formatDate(currentNextRefundDate)}
        </p>
      </div>
    ) : (
      <span className="text-slate-400">-</span>
    );
  }

  const sortedHistory = history.slice().reverse();
  const latestNextDate =
    currentNextRefundDate || sortedHistory?.[0]?.nextRefundDate || "";

  const previousDates = sortedHistory
    .map((item) => item.previousRefundDate)
    .filter(Boolean);

  const uniquePreviousDates = [
    ...new Set(previousDates.map((date) => String(date))),
  ];

  return (
    <div className="max-h-45 overflow-y-auto rounded-xl border border-orange-100 bg-orange-50 px-3 py-2">
      <p className="text-xs font-black text-orange-700">
        Next: {formatDate(latestNextDate)}
      </p>

      <div className="mt-2 space-y-1">
        {uniquePreviousDates.length > 0 ? (
          uniquePreviousDates.map((date, index) => (
            <p key={index} className="text-xs font-semibold text-slate-600">
              Previous: {formatDate(date)}
            </p>
          ))
        ) : (
          <p className="text-xs font-semibold text-slate-400">Previous: -</p>
        )}
      </div>
    </div>
  );
};

const FilterDateInput = ({ label, value, onChange }) => {
  return (
    <div>
      <label className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-500">
        {label}
      </label>

      <input
        type="date"
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
      />
    </div>
  );
};

const Refund = () => {
  const formRef = useRef(null);

  const [formData, setFormData] = useState(initialForm);
  const [refunds, setRefunds] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [nextRefundDateFilter, setNextRefundDateFilter] = useState("");
  const [refundApplicationDateFilter, setRefundApplicationDateFilter] =
    useState("");

  const [selectedUpdateClient, setSelectedUpdateClient] = useState(null);
  const [detailsClient, setDetailsClient] = useState(null);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 30,
    totalPages: 1,
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");
  const refundConsultantName = getLoggedUserName();

  const spentTime = useMemo(() => {
    return calculateSpentTime(formData.startDate);
  }, [formData.startDate]);

  const fetchRefunds = async ({
    pageNumber = 1,
    search = "",
    nextRefundDate = "",
    refundApplicationDate = "",
  } = {}) => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: String(pageNumber),
        limit: "30",
      });

      if (search.trim()) params.append("search", search.trim());
      if (nextRefundDate) params.append("nextRefundDate", nextRefundDate);
      if (refundApplicationDate) {
        params.append("refundApplicationDate", refundApplicationDate);
      }

      const response = await fetch(`${API_BASE_URL}/api/refunds?${params}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch refund data.");
      }

      setRefunds(sortByNearestNextRefundDate(data.data || []));

      setPagination(
        data.pagination || {
          total: 0,
          page: pageNumber,
          limit: 30,
          totalPages: 1,
        },
      );
    } catch (error) {
      toast.error(error.message || "Failed to fetch refund data.");
      setRefunds([]);
      setPagination({
        total: 0,
        page: pageNumber,
        limit: 30,
        totalPages: 1,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefunds({
      pageNumber: page,
      search: activeSearch,
      nextRefundDate: nextRefundDateFilter,
      refundApplicationDate: refundApplicationDateFilter,
    });
  }, [page, activeSearch, nextRefundDateFilter, refundApplicationDateFilter]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      refundConsultantName,
    }));
  }, [refundConsultantName]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setSelectedUpdateClient(null);

    setFormData({
      ...initialForm,
      refundConsultantName,
    });
  };

  const handleAddNewUpdate = (item) => {
    const latestPreviousRefundDate =
      item?.nextRefundDate || getPreviousRefundDate(item);

    setSelectedUpdateClient(item);

    setFormData({
      clientName: item?.clientName || "",
      mobile: item?.mobile || "",
      qid: item?.qid || "",
      passport: item?.passport || "",
      processingCountry: item?.processingCountry || "",
      startDate: formatDateForInput(item?.startDate),
      appliedForRefund: isRefundApplied(item?.appliedForRefund) ? "Yes" : "No",
      refundApplicationDate: formatDateForInput(item?.refundApplicationDate),
      previousRefundDate: formatDateForInput(latestPreviousRefundDate),
      nextRefundDate: "",
      totalAmount: item?.totalAmount || "",
      amountAfterDeduction: item?.amountAfterDeduction || "",
      paidAmount: item?.paidAmount || "",
      dueAmount: item?.dueAmount || "",
      clientConsultantName: item?.clientConsultantName || "",
      refundConsultantName,
      note: "",
    });

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

    toast.success("Client data loaded. Add new note and next refund date.");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      clientName: formData.clientName.trim(),
      mobile: formData.mobile.trim(),
      qid: formData.qid.trim(),
      passport: formData.passport.trim(),
      processingCountry: formData.processingCountry.trim(),
      startDate: formData.startDate,
      appliedForRefund: formData.appliedForRefund,
      refundApplicationDate: formData.refundApplicationDate,
      previousRefundDate: formData.previousRefundDate,
      nextRefundDate: formData.nextRefundDate,
      totalAmount: formData.totalAmount,
      amountAfterDeduction: formData.amountAfterDeduction,
      paidAmount: formData.paidAmount,
      dueAmount: formData.dueAmount,
      clientConsultantName: formData.clientConsultantName.trim(),
      refundConsultantName:
        formData.refundConsultantName.trim() || refundConsultantName,
      note: formData.note.trim(),
      spentTime,
    };

    if (!payload.clientName) return toast.error("Client name is required.");
    if (!payload.mobile) return toast.error("Mobile number is required.");
    if (!payload.startDate) return toast.error("Visa applied date is required.");
    if (!payload.clientConsultantName) {
      return toast.error("Client consultant name is required.");
    }
    if (!payload.refundConsultantName) {
      return toast.error("Refund consultant name not found. Please login again.");
    }
    if (selectedUpdateClient && !payload.nextRefundDate) {
      return toast.error("Next refund date is required for a new update.");
    }
    if (selectedUpdateClient && !payload.note) {
      return toast.error("Note is required for a new update.");
    }

    try {
      setSubmitting(true);

      const response = await fetch(`${API_BASE_URL}/api/refunds`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save refund discussion.");
      }

      resetForm();
      setSearchTerm("");
      setActiveSearch("");
      setNextRefundDateFilter("");
      setRefundApplicationDateFilter("");
      setPage(1);

      fetchRefunds({
        pageNumber: 1,
        search: "",
        nextRefundDate: "",
        refundApplicationDate: "",
      });

      toast.success(
        data.updated
          ? "Existing refund client updated successfully."
          : "New refund client saved successfully.",
      );
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setActiveSearch(searchTerm);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveSearch("");
    setNextRefundDateFilter("");
    setRefundApplicationDateFilter("");
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <Toaster position="top-right" reverseOrder={false} />

      {detailsClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-7">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  {detailsClient.clientName || "Client Details"}
                </h3>
                <p className="text-sm font-semibold text-slate-500">
                  Refund full details and discussion history
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDetailsClient(null)}
                className="rounded-xl bg-slate-100 p-3 text-slate-700 transition hover:bg-slate-200"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {[
                ["Mobile", detailsClient.mobile],
                ["QID", detailsClient.qid],
                ["Passport", detailsClient.passport],
                ["Country", detailsClient.processingCountry],
                [
                  "Refund Application",
                  formatDate(detailsClient.refundApplicationDate),
                ],
                ["Visa Applied", formatDate(detailsClient.startDate)],
                [
                  "Previous Refund",
                  formatDate(getPreviousRefundDate(detailsClient)),
                ],
                ["Next Refund", formatDate(detailsClient.nextRefundDate)],
                ["Spent Time", calculateSpentTime(detailsClient.startDate)],
                ["Total Amount", formatAmount(detailsClient.totalAmount)],
                [
                  "After Deduction",
                  formatAmount(detailsClient.amountAfterDeduction),
                ],
                ["Paid Amount", formatAmount(detailsClient.paidAmount)],
                ["Due Amount", formatAmount(detailsClient.dueAmount)],
                ["Client Consultant", detailsClient.clientConsultantName],
                ["Refund Consultant", detailsClient.refundConsultantName],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="text-xs font-black uppercase text-slate-400">
                    {label}
                  </p>
                  <p className="mt-1 wrap-break-word text-sm font-bold text-slate-800">
                    {value || "-"}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-4">
              <p className="mb-3 text-sm font-black text-orange-700">
                All Refund Dates
              </p>
              <RefundDateHistory
                history={detailsClient.refundHistory}
                currentNextRefundDate={detailsClient.nextRefundDate}
              />
            </div>

            <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-4">
              <p className="mb-3 text-sm font-black text-slate-800">
                Notes History
              </p>
              <NotesHistory
                latestNote={detailsClient.note}
                history={detailsClient.refundHistory}
                latestUpdatedAt={
                  detailsClient.updatedAt || detailsClient.createdAt
                }
              />
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-425">
        <section className="mb-6 overflow-hidden rounded-3xl bg-linear-to-br from-orange-500 via-orange-500 to-slate-950 p-5 text-white shadow-xl sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-white/15 px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-orange-50">
                Refund Management
              </p>

              <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                Refund Client Discussion
              </h1>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-orange-50 sm:text-base">
                Search refund clients, filter by next refund date or refund
                application date, and view nearest refund clients first.
              </p>
            </div>

            <div className="w-full rounded-2xl bg-white/15 p-5 backdrop-blur lg:w-80">
              <p className="text-xs font-black uppercase tracking-wide text-orange-100">
                Total Records
              </p>
              <p className="mt-1 text-3xl font-black">
                {pagination.total || 0}
              </p>
            </div>
          </div>
        </section>

        <section
          ref={formRef}
          className="mb-7 rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/60 sm:p-7"
        >
          <div className="mb-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                <FaPlus />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  {selectedUpdateClient
                    ? "Add New Refund Update"
                    : "Add Refund Discussion"}
                </h2>
                <p className="text-sm text-slate-500">
                  {selectedUpdateClient
                    ? "Existing client loaded. Add new note and next refund date."
                    : "Save a new refund client discussion."}
                </p>
              </div>
            </div>

            {selectedUpdateClient && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-black text-slate-700 transition hover:bg-slate-200"
              >
                Cancel Update Mode
              </button>
            )}
          </div>

          {selectedUpdateClient && (
            <div className="mb-6 rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4">
              <p className="text-sm font-black text-orange-700">
                Update Mode: {selectedUpdateClient.clientName} — Mobile:{" "}
                {selectedUpdateClient.mobile || "-"}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                The system will update this client’s latest note and next refund
                date, then save the update inside refund history.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <Field
                label="Client Name"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="Enter client name"
                required
                readOnly={Boolean(selectedUpdateClient)}
              />

              <Field
                label="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                required
                readOnly={Boolean(selectedUpdateClient)}
              />

              <Field
                label="QID"
                name="qid"
                value={formData.qid}
                onChange={handleChange}
                placeholder="Enter QID"
                readOnly={Boolean(selectedUpdateClient)}
              />

              <Field
                label="Passport"
                name="passport"
                value={formData.passport}
                onChange={handleChange}
                placeholder="Passport number"
                readOnly={Boolean(selectedUpdateClient)}
              />

              <Field
                label="Processing Country"
                name="processingCountry"
                value={formData.processingCountry}
                onChange={handleChange}
                placeholder="Example: Greece"
                readOnly={Boolean(selectedUpdateClient)}
              />

              <Field
                label="Visa Applied"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                readOnly={Boolean(selectedUpdateClient && formData.startDate)}
              />

              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Spent Time
                </label>

                <div className="flex min-h-11.5 items-center rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-black text-orange-700">
                  {spentTime}
                </div>
              </div>

              <SelectField
                label="Applied for Refund?"
                name="appliedForRefund"
                value={formData.appliedForRefund}
                onChange={handleChange}
                required
              />

              <Field
                label="Refund Application Date"
                type="date"
                name="refundApplicationDate"
                value={formData.refundApplicationDate}
                onChange={handleChange}
              />

              <Field
                label="Previous Refund Date"
                type="date"
                name="previousRefundDate"
                value={formData.previousRefundDate}
                onChange={handleChange}
              />

              <Field
                label="Next Refund Date"
                type="date"
                name="nextRefundDate"
                value={formData.nextRefundDate}
                onChange={handleChange}
              />

              <Field
                label="Total Amount"
                type="number"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleChange}
                placeholder="Enter total amount"
              />

              <Field
                label="Amount after Deduction"
                type="number"
                name="amountAfterDeduction"
                value={formData.amountAfterDeduction}
                onChange={handleChange}
                placeholder="Enter amount after deduction"
              />

              <Field
                label="Paid Amount"
                type="number"
                name="paidAmount"
                value={formData.paidAmount}
                onChange={handleChange}
                placeholder="Enter paid amount"
              />

              <Field
                label="Due Amount"
                type="number"
                name="dueAmount"
                value={formData.dueAmount}
                onChange={handleChange}
                placeholder="Enter due amount"
              />

              <Field
                label="Client Consultant Name"
                name="clientConsultantName"
                value={formData.clientConsultantName}
                onChange={handleChange}
                placeholder="Original consultant"
                required
                readOnly={Boolean(
                  selectedUpdateClient && formData.clientConsultantName,
                )}
              />

              <Field
                label="Refund Consultant Name"
                name="refundConsultantName"
                value={formData.refundConsultantName || refundConsultantName}
                onChange={handleChange}
                placeholder="Logged-in user"
                required
                readOnly
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                Note / Today Discussion
              </label>

              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows={7}
                placeholder={
                  selectedUpdateClient
                    ? "Write the new update note for this existing refund client..."
                    : "Write full discussion details, client reason, refund update, follow-up plan, and next action..."
                }
                className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3 text-base font-black text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-70"
              >
                {submitting && <FaSpinner className="animate-spin" />}
                {submitting
                  ? "Saving..."
                  : selectedUpdateClient
                    ? "Save New Update"
                    : "Save Refund Discussion"}
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/60 sm:p-7">
          <div className="mb-6 flex flex-col justify-between gap-5 2xl:flex-row 2xl:items-start">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Refund Clients
              </h2>
              <p className="text-sm text-slate-500">
                Nearest next refund date clients will show first.
              </p>
            </div>

            <form
              onSubmit={handleSearch}
              className="grid w-full gap-3 2xl:max-w-6xl 2xl:grid-cols-[minmax(0,1fr)_220px_220px_auto_auto]"
            >
              <div>
                <label className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-500">
                  Search Client
                </label>

                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search name, mobile, QID, passport, consultant..."
                    className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              <FilterDateInput
                label="Next Refund Date"
                value={nextRefundDateFilter}
                onChange={(event) => {
                  setPage(1);
                  setNextRefundDateFilter(event.target.value);
                }}
              />

              <FilterDateInput
                label="Refund Application Date"
                value={refundApplicationDateFilter}
                onChange={(event) => {
                  setPage(1);
                  setRefundApplicationDateFilter(event.target.value);
                }}
              />

              <div className="flex items-end">
                <button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-slate-900 px-5 text-sm font-black text-white transition hover:bg-slate-800"
                >
                  Search
                </button>
              </div>

              {(activeSearch ||
                nextRefundDateFilter ||
                refundApplicationDateFilter) && (
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="h-12 w-full rounded-xl bg-slate-100 px-5 text-sm font-black text-slate-700 transition hover:bg-slate-200"
                  >
                    Clear
                  </button>
                </div>
              )}
            </form>
          </div>

          {(activeSearch ||
            nextRefundDateFilter ||
            refundApplicationDateFilter) && (
            <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-3">
              {activeSearch && (
                <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm font-bold text-orange-700">
                  Search result for: “{activeSearch}”
                </div>
              )}

              {nextRefundDateFilter && (
                <div className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">
                  Next refund date: {formatDate(nextRefundDateFilter)}
                </div>
              )}

              {refundApplicationDateFilter && (
                <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
                  Refund application: {formatDate(refundApplicationDateFilter)}
                </div>
              )}
            </div>
          )}

          <div className="rounded-2xl border border-slate-100">
            <div className="w-full overflow-x-auto">
              <table className="min-w-637.5 divide-y divide-slate-100">
                <thead className="bg-slate-50">
                  <tr>
                    {[
                      "Client",
                      "Mobile",
                      "QID",
                      "Passport",
                      "Country",
                      "Applied?",
                      "Refund Application",
                      "Visa Applied",
                      "Spent",
                      "Previous Refund",
                      "Next Refund",
                      "All Refund Dates",
                      "Total Amount",
                      "After Deduction",
                      "Paid Amount",
                      "Due Amount",
                      "Client Consultant",
                      "Refund Consultant",
                      "Note",
                      "Action",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan="20" className="px-4 py-12 text-center">
                        <div className="flex items-center justify-center gap-2 text-sm font-bold text-slate-500">
                          <FaSpinner className="animate-spin" />
                          Loading refund data...
                        </div>
                      </td>
                    </tr>
                  ) : refunds.length === 0 ? (
                    <tr>
                      <td
                        colSpan="20"
                        className="px-4 py-12 text-center text-sm font-bold text-slate-500"
                      >
                        No data found
                      </td>
                    </tr>
                  ) : (
                    refunds.map((item) => (
                      <tr key={item._id} className="hover:bg-orange-50/50">
                        <td className="max-w-42.5 wrap-break-word px-4 py-4 text-sm font-black text-slate-900">
                          {item.clientName || "-"}
                        </td>

                        <td className="max-w-35 wrap-break-word px-4 py-4 text-sm text-slate-700">
                          {item.mobile || "-"}
                        </td>

                        <td className="max-w-35 wrap-break-word px-4 py-4 text-sm text-slate-700">
                          {item.qid || "-"}
                        </td>

                        <td className="max-w-35 wrap-break-word px-4 py-4 text-sm text-slate-700">
                          {item.passport || "-"}
                        </td>

                        <td className="max-w-35 wrap-break-word px-4 py-4 text-sm text-slate-700">
                          {item.processingCountry || "-"}
                        </td>

                        <td className="px-4 py-4 text-sm">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-black ${
                              isRefundApplied(item.appliedForRefund)
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {isRefundApplied(item.appliedForRefund)
                              ? "Yes"
                              : "No"}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-sm font-bold text-slate-700">
                          {formatDate(item.refundApplicationDate)}
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-700">
                          {formatDate(item.startDate)}
                        </td>

                        <td className="max-w-37.5 wrap-break-word px-4 py-4 text-sm font-black text-orange-600">
                          {calculateSpentTime(item.startDate)}
                        </td>

                        <td className="px-4 py-4 text-sm font-bold text-slate-700">
                          {formatDate(getPreviousRefundDate(item))}
                        </td>

                        <td className="px-4 py-4 text-sm font-bold text-orange-700">
                          {formatDate(item.nextRefundDate)}
                        </td>

                        <td className="max-w-65 px-4 py-4 text-sm text-slate-700">
                          <RefundDateHistory
                            history={item.refundHistory}
                            currentNextRefundDate={item.nextRefundDate}
                          />
                        </td>

                        <td className="px-4 py-4 text-sm font-bold text-slate-700">
                          {formatAmount(item.totalAmount)}
                        </td>

                        <td className="px-4 py-4 text-sm font-bold text-slate-700">
                          {formatAmount(item.amountAfterDeduction)}
                        </td>

                        <td className="px-4 py-4 text-sm font-bold text-green-700">
                          {formatAmount(item.paidAmount)}
                        </td>

                        <td className="px-4 py-4 text-sm font-bold text-red-700">
                          {formatAmount(item.dueAmount)}
                        </td>

                        <td className="max-w-42.5 wrap-break-word px-4 py-4 text-sm text-slate-700">
                          {item.clientConsultantName || "-"}
                        </td>

                        <td className="max-w-42.5 wrap-break-word px-4 py-4 text-sm text-slate-700">
                          {item.refundConsultantName || "-"}
                        </td>

                        <td className="max-w-130 px-4 py-4 text-sm text-slate-600">
                          <NotesHistory
                            latestNote={item.note}
                            history={item.refundHistory}
                            latestUpdatedAt={item.updatedAt || item.createdAt}
                          />
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setDetailsClient(item)}
                              className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2 text-sm font-black text-white transition hover:bg-slate-800"
                            >
                              <FaEye />
                              View
                            </button>

                            <button
                              type="button"
                              onClick={() => handleAddNewUpdate(item)}
                              className="whitespace-nowrap rounded-xl bg-orange-500 px-4 py-2 text-sm font-black text-white shadow-md shadow-orange-100 transition hover:bg-orange-600"
                            >
                              Add New Update
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl bg-slate-50 px-5 py-4 sm:flex-row">
            <p className="text-sm font-bold text-slate-500">
              Page {pagination.page || page} of {pagination.totalPages || 1} —
              Total {pagination.total || 0}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1 || loading}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaChevronLeft />
                Prev
              </button>

              <button
                type="button"
                disabled={page >= pagination.totalPages || loading}
                onClick={() =>
                  setPage((prev) =>
                    Math.min(prev + 1, pagination.totalPages || 1),
                  )
                }
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <FaChevronRight />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Refund;