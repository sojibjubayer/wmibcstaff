import { RefreshCw } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

const API_BASE_URL = "https://wmibcstaff-server.vercel.app";
const API_URL = `${API_BASE_URL}/api/leads`;

const LEADS_PER_PAGE = 100;

const statuses = [
  "New",
  "Interested",
  "Busy",
  "No Answer",
  "Switched Off", 
  "Wrong Number", 
  "Not Interested",
  "Visited",
  "Contacted Before", 
  "Already Contacted by Another Consultant",
];

export default function ConsultantLeads() {
  const [consultant, setConsultant] = useState("");

  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [viewFilter, setViewFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchPhone, setSearchPhone] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setConsultant((user?.name || "").trim());
  }, []);

  const fetchLeads = useCallback(
    async ({ silent = false } = {}) => {
      if (!consultant) {
        setLoading(false);
        setInitialLoading(false);
        return;
      }

      try {
        if (initialLoading && !silent) {
          setLoading(true);
        } else {
          setRefreshing(true);
        }

        const params = new URLSearchParams({
          consultant,
          page: String(currentPage),
          limit: String(LEADS_PER_PAGE),
          search: searchPhone.trim(),
          viewFilter,
          statusFilter,
        });

        const res = await fetch(`${API_URL}?${params}`);
        const data = await res.json();

        console.log("LEADS API RESPONSE:", data);

        if (!res.ok) {
          alert(data.message || "Failed to load leads");
          setLeads([]);
          setStats({});
          setTotalPages(1);
          setTotalLeads(0);
          return;
        }

        if (!data || !Array.isArray(data.leads)) {
          console.error(
            "Backend pagination is not active. Wrong response:",
            data,
          );
          alert("Backend pagination is not active. Check /api/leads route.");
          setLeads([]);
          setStats({});
          setTotalPages(1);
          setTotalLeads(0);
          return;
        }

        setLeads(data.leads || []);
        setStats(data.stats || {});
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalLeads(data.pagination?.totalLeads || 0);
      } catch (error) {
        console.error("Fetch leads error:", error);
        alert("Server error");
        setLeads([]);
        setStats({});
        setTotalPages(1);
        setTotalLeads(0);
      } finally {
        setLoading(false);
        setInitialLoading(false);
        setRefreshing(false);
      }
    },
    [
      consultant,
      currentPage,
      searchPhone,
      viewFilter,
      statusFilter,
      initialLoading,
    ],
  );

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchPhone, viewFilter, statusFilter]);

  const updatePhone = async (batchId, phoneIndex, updateData) => {
    try {
      const res = await fetch(`${API_URL}/${batchId}/phone/${phoneIndex}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update lead");
        return false;
      }

      const updatedAt = new Date().toISOString();

      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          String(lead.batchId) === String(batchId) &&
          Number(lead.phoneIndex) === Number(phoneIndex)
            ? {
                ...lead,
                ...updateData,
                updatedAt,
              }
            : lead,
        ),
      );

      // Quietly sync latest stats/pagination from backend without hiding the table.
      fetchLeads({ silent: true });

      return true;
    } catch (error) {
      console.error("Update lead error:", error);
      alert("Server error");
      return false;
    }
  };

  const totalNumbers = Number(stats.total || 0);
  const acknowledgedCount = Number(stats.acknowledged || 0);
  const unacknowledgedCount = Number(stats.unacknowledged || 0);
  const todayFollowUps = Number(stats.todayFollowups || 0);
  const overdueCount = Number(stats.overdue || 0);

  return (
    <div className="min-h-screen bg-slate-100 p-3 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-5">
        <header className="overflow-hidden rounded-3xl bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-white shadow-xl">
          <div className="p-5 sm:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="mt-3 text-3xl font-black sm:text-4xl">
                  Lead Follow-up Workspace
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-slate-300">
                  Manage assigned leads, update status, add notes, and follow up
                  at the right time.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20 active:scale-95"
                  title="Refresh"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>

                <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
                  <p className="mt-1 text-xl font-black">
                    {consultant || "No user found"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <DashboardCard title="Total Leads" value={totalNumbers} />
              <DashboardCard title="Acknowledged" value={acknowledgedCount} />
              <DashboardCard
                title="Unacknowledged"
                value={unacknowledgedCount}
              />
              <DashboardCard 
                title="Today Follow-ups"
                value={todayFollowUps}
                highlight
              />
              <DashboardCard title="Overdue" value={overdueCount} danger />
            </div>
          </div>
        </header>

        <section className="rounded-3xl bg-white p-5 shadow">
          <div className="grid gap-3 lg:grid-cols-4">
            <input
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              placeholder="Search phone number..."
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
            />

            <select
              value={viewFilter}
              onChange={(e) => setViewFilter(e.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
            >
              <option value="all">All Leads</option>
              <option value="today">Today Follow-ups</option>
              <option value="overdue">Overdue Follow-ups</option>
              <option value="upcoming">Upcoming Follow-ups</option>
              <option value="noFollowup">No Follow-up Date</option>
              <option value="unacknowledged">Unacknowledged</option>
              <option value="acknowledged">Acknowledged</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
            >
              <option value="all">All Statuses</option>

              {statuses.map((status) => (
                <option key={status} value={status.toLowerCase()}>
                  {status}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setSearchPhone("");
                setViewFilter("all");
                setStatusFilter("all");
                setCurrentPage(1);
              }}
              className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-black text-white hover:bg-slate-800"
            >
              Reset Filters
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing <b className="text-slate-900">{leads.length}</b> of{" "}
              <b className="text-slate-900">{totalLeads}</b> filtered leads. 100
              leads per page.
            </p>

            <p>
              Page <b className="text-slate-900">{currentPage}</b> of{" "}
              <b className="text-slate-900">{totalPages}</b>
            </p>
          </div>

          {refreshing && !loading && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
              Syncing latest lead data...
            </div>
          )}
        </section>

        {!consultant ? (
          <EmptyCard
            text="No logged-in user found. Please login again."
            error
          />
        ) : loading ? (
          <EmptyCard text="Loading leads..." />
        ) : leads.length === 0 ? (
          <EmptyCard text="No leads found for selected filter." />
        ) : (
          <section className="overflow-hidden rounded-3xl bg-white shadow">
            <div className="overflow-x-auto">
              <table className="w-full min-w-262.5 text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3">Lead</th>
                    <th className="px-4 py-3">Acknowledge</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Note</th>
                    <th className="px-4 py-3">Follow-up Date</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {leads.map((lead) => (
                    <PhoneRow
                      key={`${lead.batchId}-${lead.phoneIndex}`}
                      lead={lead}
                      onUpdate={updatePhone}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
              onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              onGo={(page) => setCurrentPage(page)}
            />
          </section>
        )}
      </div>
    </div>
  );
}

function PhoneRow({ lead, onUpdate }) {
  const [acknowledged, setAcknowledged] = useState(
    lead.acknowledged || false,
  );

  const [status, setStatus] = useState(
    lead.status || "New",
  );

  const [note, setNote] = useState(
    lead.note || "",
  );

  const [nextFollowUpDate, setNextFollowUpDate] =
    useState(
      normalizeDate(lead.nextFollowUpDate),
    );

  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] =
    useState(false);

  useEffect(() => {
    setAcknowledged(
      lead.acknowledged || false,
    );

    setStatus(
      lead.status || "New",
    );

    setNote(
      lead.note || "",
    );

    setNextFollowUpDate(
      normalizeDate(
        lead.nextFollowUpDate,
      ),
    );
  }, [lead]);

  const isVisited =
    String(lead.status || "")
      .trim()
      .toLowerCase() === "visited";

  const savedDate = normalizeDate(
    lead.nextFollowUpDate,
  );

  const hasChanged =
    !isVisited &&
    (
      acknowledged !==
        (lead.acknowledged || false) ||
      status !==
        (lead.status || "New") ||
      note !==
        (lead.note || "") ||
      nextFollowUpDate !== savedDate
    );

  const handleSave = async () => {
    if (
      isVisited ||
      !hasChanged ||
      saving
    ) {
      return;
    }

    setSaving(true);
    setJustSaved(false);

    const success = await onUpdate(
      lead.batchId,
      lead.phoneIndex,
      {
        acknowledged,
        status,
        note,
        nextFollowUpDate:
          nextFollowUpDate || null,
      },
    );

    setSaving(false);

    if (success) {
      setJustSaved(true);

      window.setTimeout(() => {
        setJustSaved(false);
      }, 1800);
    }
  };

  const cleanPhone = String(
    lead.number || "",
  ).replace(/\D/g, "");

  const whatsappUrl =
    `https://web.whatsapp.com/send?phone=${cleanPhone}`;

  const followUpStatus =
    getFollowUpStatus(
      nextFollowUpDate,
    );

  return (
    <tr
      className={`border-b border-slate-100 align-top transition ${
        isVisited
          ? "bg-emerald-50/40"
          : saving
            ? "bg-blue-50/60"
            : justSaved
              ? "bg-green-50/70"
              : "hover:bg-slate-50"
      }`}
    >
      {/* Lead */}
      <td className="px-4 py-4">
        <p className="font-black text-slate-900">
          {lead.number}
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex rounded-lg bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 hover:bg-green-200"
        >
          Send Message
        </a>
      </td>

      {/* Acknowledgement */}
      <td className="px-4 py-4">
        <label
          className={`flex items-center gap-2 ${
            isVisited
              ? "cursor-not-allowed opacity-70"
              : "cursor-pointer"
          }`}
        >
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(event) =>
              setAcknowledged(
                event.target.checked,
              )
            }
            disabled={
              saving || isVisited
            }
            className="h-4 w-4"
          />

          <span
            className={`rounded-full px-2 py-1 text-xs font-black ${
              acknowledged
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {acknowledged
              ? "Acknowledged"
              : "Unacknowledged"}
          </span>
        </label>
      </td>

      {/* Status */}
      <td className="px-4 py-4">
        <select
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value,
            )
          }
          disabled={
            saving || isVisited
          }
          className="rounded-xl border border-slate-300 px-3 py-2 font-semibold outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100"
        >
          {statuses.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </td>

      {/* Note */}
      <td className="px-4 py-4">
        <textarea
          value={note}
          onChange={(event) =>
            setNote(
              event.target.value,
            )
          }
          disabled={
            saving || isVisited
          }
          placeholder="Call note, interest, objection..."
          rows={2}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100"
        />
      </td>

      {/* Follow-up date */}
      <td className="px-4 py-4">
        <CustomDatePicker
          value={nextFollowUpDate}
          onChange={
            setNextFollowUpDate
          }
          disabled={
            saving || isVisited
          }
        />

        {followUpStatus && (
          <div
            className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-black ${followUpStatus.className}`}
          >
            {followUpStatus.label}
          </div>
        )}
      </td>

      {/* Action */}
      <td className="px-4 py-4 text-right">
        {isVisited ? (
          <div className="inline-flex min-w-44 flex-col items-end gap-2">
            <span className="rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1.5 text-xs font-black text-emerald-700">
              Visited
            </span>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-right">
              <p className="text-[10px] font-semibold text-slate-500">
                Visited to
              </p>

              <p className="text-xs font-black text-slate-800">
                {lead.visitedTo ||
                  "Unknown consultant"}
              </p>

              <p className="mt-2 text-[10px] font-semibold text-slate-500">
                Visited at
              </p>

              <p className="text-xs font-bold text-slate-700">
                {formatVisitedDateTime(
                  lead.visitedAt,
                )}
              </p>
            </div>
          </div>
        ) : (
          <>
            {saving ? (
              <p className="mb-2 text-xs font-black text-blue-600">
                Saving...
              </p>
            ) : hasChanged ? (
              <p className="mb-2 text-xs font-black text-amber-600">
                Unsaved changes
              </p>
            ) : justSaved ? (
              <p className="mb-2 text-xs font-black text-green-500">
                Saved
              </p>
            ) : (
              <p className="mb-2 text-xs font-black text-slate-400">
                No changes
              </p>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={
                !hasChanged || saving
              }
              className={`rounded-xl px-4 py-2 text-xs font-black text-white transition ${
                saving
                  ? "cursor-wait bg-blue-400"
                  : hasChanged
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "cursor-not-allowed bg-green-300"
              }`}
            >
              {saving
                ? "Saving..."
                : hasChanged
                  ? "Save Changes"
                  : "Saved"}
            </button>
          </>
        )}
      </td>
    </tr>
  );
}

function CustomDatePicker({ value, onChange, disabled }) {
  const wrapperRef = useRef(null);
  const [open, setOpen] = useState(false);

  const baseDate = value ? parseDate(value) : new Date();
  const [viewYear, setViewYear] = useState(baseDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(baseDate.getMonth());

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const days = getCalendarDays(viewYear, viewMonth);

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const selectedDate = value || "";
  const today = getTodayLocal();

  const handleSelect = (dateString) => {
    onChange(dateString);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-45">
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) setOpen((prev) => !prev);
        }}
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-left text-sm font-bold text-slate-800 hover:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
      >
        {value ? formatDateDMY(value) : "Select date"}
      </button>

      {open && !disabled && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72.5 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (viewMonth === 0) {
                  setViewMonth(11);
                  setViewYear((y) => y - 1);
                } else {
                  setViewMonth((m) => m - 1);
                }
              }}
              className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-black text-slate-700 hover:bg-slate-200"
            >
              ‹
            </button>

            <p className="text-sm font-black text-slate-900">{monthLabel}</p>

            <button
              type="button"
              onClick={() => {
                if (viewMonth === 11) {
                  setViewMonth(0);
                  setViewYear((y) => y + 1);
                } else {
                  setViewMonth((m) => m + 1);
                }
              }}
              className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-black text-slate-700 hover:bg-slate-200"
            >
              ›
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[11px] font-black text-slate-400">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="h-9" />;
              }

              const dateString = toLocalDateString(
                new Date(viewYear, viewMonth, day),
              );

              const isSelected = selectedDate === dateString;
              const isToday = today === dateString;

              return (
                <button
                  key={dateString}
                  type="button"
                  onClick={() => handleSelect(dateString)}
                  className={`h-9 rounded-lg text-sm font-black ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : isToday
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-50 text-slate-700 hover:bg-blue-50"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => handleSelect(today)}
              className="flex-1 rounded-xl bg-amber-100 px-3 py-2 text-xs font-black text-amber-700 hover:bg-amber-200"
            >
              Today
            </button>

            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="flex-1 rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 hover:bg-slate-200"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPrev, onNext, onGo }) {
  const pages = getPaginationPages(currentPage, totalPages);

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      <div className="flex flex-wrap justify-center gap-2">
        {pages.map((page, index) =>
          page === "..." ? (
            <span
              key={`dots-${index}`}
              className="px-2 py-2 text-sm font-black text-slate-400"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onGo(page)}
              className={`rounded-xl px-4 py-2 text-sm font-black ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border border-slate-300 bg-white text-slate-700"
              }`}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}

function DashboardCard({ title, value, highlight, danger }) {
  return (
    <div
      className={`rounded-2xl border p-4 backdrop-blur ${
        danger
          ? "border-red-300/30 bg-red-500/15"
          : highlight
            ? "border-amber-300/30 bg-amber-500/15"
            : "border-white/10 bg-white/10"
      }`}
    >
      <p className="text-xs font-semibold text-slate-300">{title}</p>

      <h3
        className={`mt-2 text-3xl font-black ${
          danger ? "text-red-300" : highlight ? "text-amber-300" : "text-white"
        }`}
      >
        {value}
      </h3>
    </div>
  );
}

function EmptyCard({ text, error }) {
  return (
    <div
      className={`rounded-3xl bg-white p-8 text-center font-semibold shadow ${
        error ? "text-red-500" : "text-slate-500"
      }`}
    >
      {text}
    </div>
  );
}

function getTodayLocal() {
  return toLocalDateString(new Date());
}

function toLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function normalizeDate(value) {
  if (!value) return "";

  if (typeof value === "string") {
    return value.slice(0, 10);
  }

  return "";
}

function formatDateDMY(dateString) {
  if (!dateString) return "";

  const [year, month, day] = dateString.slice(0, 10).split("-");
  return `${day}-${month}-${year}`;
}

function formatVisitedDateTime(value) {
  if (!value) {
    return "Time unavailable";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Time unavailable";
  }

  return date.toLocaleString("en-GB", {
    timeZone: "Asia/Qatar",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function parseDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getFollowUpStatus(date) {
  if (!date) return null;

  const today = getTodayLocal();

  if (date === today) {
    return {
      type: "today",
      label: "Due Today",
      className: "bg-amber-100 text-amber-700",
    };
  }

  if (date < today) {
    return {
      type: "overdue",
      label: "Overdue",
      className: "bg-red-100 text-red-700",
    };
  }

  return {
    type: "upcoming",
    label: "Upcoming",
    className: "bg-blue-100 text-blue-700",
  };
}

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= totalDays; day++) {
    days.push(day);
  }

  return days;
}

function getPaginationPages(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}
