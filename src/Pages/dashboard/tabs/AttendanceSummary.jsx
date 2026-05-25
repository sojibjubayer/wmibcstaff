import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  Clock3,
  Users,
  CheckCircle2,
  XCircle,
  TimerReset,
  Loader2,
  BarChart3,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const monthOptions = [
  { value: "2026-01", label: "January 2026" },
  { value: "2026-02", label: "February 2026" },
  { value: "2026-03", label: "March 2026" },
  { value: "2026-04", label: "April 2026" },
  { value: "2026-05", label: "May 2026" },
  { value: "2026-06", label: "June 2026" },
  { value: "2026-07", label: "July 2026" },
  { value: "2026-08", label: "August 2026" },
  { value: "2026-09", label: "September 2026" },
  { value: "2026-10", label: "October 2026" },
  { value: "2026-11", label: "November 2026" },
  { value: "2026-12", label: "December 2026" },
];

function formatTime(value) {
  if (!value) return "-";

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";

  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDayLabel(dateStr) {
  if (!dateStr) return "-";

  const parts = String(dateStr).split("-");
  if (parts.length === 3) return Number(parts[2]);

  return dateStr;
}

function minutesToText(totalMinutes) {
  if (!totalMinutes || totalMinutes <= 0) return "-";

  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  if (hrs > 0 && mins > 0) return `${hrs}h ${mins}m`;
  if (hrs > 0) return `${hrs}h`;
  return `${mins}m`;
}

function getWorkingMinutes(item) {
  if (!item?.checkIn || !item?.checkOut) return 0;

  const checkIn = new Date(item.checkIn);
  const checkOut = new Date(item.checkOut);

  if (
    Number.isNaN(checkIn.getTime()) ||
    Number.isNaN(checkOut.getTime()) ||
    checkOut <= checkIn
  ) {
    return 0;
  }

  let totalMinutes = Math.floor((checkOut - checkIn) / (1000 * 60));

  if (item?.lunchOut && item?.lunchIn) {
    const lunchOut = new Date(item.lunchOut);
    const lunchIn = new Date(item.lunchIn);

    if (
      !Number.isNaN(lunchOut.getTime()) &&
      !Number.isNaN(lunchIn.getTime()) &&
      lunchIn > lunchOut
    ) {
      totalMinutes -= Math.floor((lunchIn - lunchOut) / (1000 * 60));
    }
  }

  return Math.max(totalMinutes, 0);
}

function getWorkingHour(item) {
  return minutesToText(getWorkingMinutes(item));
}

function getStatus(item) {
  if (!item?.checkIn) return "Absent";
  if (item?.checkOut) return "Checked Out";
  if (item?.lunchOut && !item?.lunchIn) return "On Break";
  return "Working";
}

function getBreakTime(item) {
  if (!item?.lunchOut && !item?.lunchIn) return "-";
  if (item?.lunchOut && !item?.lunchIn) return "Ongoing";
  if (!item?.lunchOut || !item?.lunchIn) return "-";

  const out = new Date(item.lunchOut);
  const inTime = new Date(item.lunchIn);

  if (Number.isNaN(out.getTime()) || Number.isNaN(inTime.getTime())) return "-";

  const diff = inTime - out;
  if (diff <= 0) return "-";

  return minutesToText(Math.floor(diff / (1000 * 60)));
}

function getSelectedMonthLabel(selectedMonth) {
  return (
    monthOptions.find((month) => month.value === selectedMonth)?.label ||
    selectedMonth
  );
}

function StatusBadge({ status }) {
  const styles = {
    Working: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",
    "Checked Out": "bg-blue-500/15 text-blue-300 border-blue-400/20",
    Absent: "bg-red-500/15 text-red-300 border-red-400/20",
    "On Break": "bg-amber-500/15 text-amber-300 border-amber-400/20",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium whitespace-nowrap ${
        styles[status] || "bg-white/10 text-white border-white/10"
      }`}
    >
      {status}
    </span>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">
          {label}
        </p>
        <div className="text-sky-300">{icon}</div>
      </div>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function MonthlyCell({ item }) {
  if (!item) {
    return <span className="text-[11px] text-white/30">-</span>;
  }

  return (
    <div className="text-center text-[10px] leading-[1.2] text-white/85 whitespace-nowrap">
      <p>
        <span className="font-semibold text-sky-300">I</span>{" "}
        {formatTime(item.checkIn)}
      </p>
      <p>
        <span className="font-semibold text-emerald-300">O</span>{" "}
        {formatTime(item.checkOut)}
      </p>
      <p>
        <span className="font-semibold text-amber-300">Br</span>{" "}
        {getBreakTime(item)}
      </p>
      <p>
        <span className="font-semibold text-purple-300">Wh</span>{" "}
        {getWorkingHour(item)}
      </p>
    </div>
  );
}

export default function AttendanceSummary() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("daily");

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        setMessage("");

        const url =
          viewMode === "daily"
            ? `https://wmibcstaff-server.vercel.app/api/attendance?date=${selectedDate}`
            : `https://wmibcstaff-server.vercel.app/api/attendance?monthly=true&month=${selectedMonth}`;

        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        let data = [];

        try {
          data = await res.json();
        } catch {
          data = [];
        }

        if (!res.ok) {
          setRecords([]);
          setMessage(data?.message || "Failed to load attendance.");
          return;
        }

        setRecords(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Attendance fetch error:", error);
        setRecords([]);
        setMessage("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [selectedDate, selectedMonth, viewMode]);

  const filteredDailyRecords = useMemo(() => {
    const q = search.toLowerCase().trim();

    const mapped = records.map((item) => ({
      ...item,
      status: getStatus(item),
    }));

    if (!q) return mapped;

    return mapped.filter(
      (item) =>
        item.userName?.toLowerCase().includes(q) ||
        item.status?.toLowerCase().includes(q)
    );
  }, [records, search]);

  const monthlyTable = useMemo(() => {
    if (viewMode !== "monthly") return { staffNames: [], rows: [] };

    const q = search.toLowerCase().trim();

    const filtered = !q
      ? records
      : records.filter((item) => item.userName?.toLowerCase().includes(q));

    const staffSet = new Set();
    const dateMap = {};

    filtered.forEach((item) => {
      const staffName = item.userName || "Unknown";
      const date = item.date;

      if (!date) return;

      staffSet.add(staffName);

      if (!dateMap[date]) {
        dateMap[date] = { date };
      }

      dateMap[date][staffName] = item;
    });

    const staffNames = Array.from(staffSet).sort((a, b) =>
      a.localeCompare(b)
    );

    const [year, month] = selectedMonth.split("-").map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();

    const rows = Array.from({ length: daysInMonth }, (_, index) => {
      const day = String(index + 1).padStart(2, "0");
      const date = `${selectedMonth}-${day}`;

      return dateMap[date] || { date };
    });

    return { staffNames, rows };
  }, [records, search, viewMode, selectedMonth]);

  const monthlyStaffTotals = useMemo(() => {
    const totals = {};

    records.forEach((item) => {
      const name = item.userName || "Unknown";
      totals[name] = (totals[name] || 0) + getWorkingMinutes(item);
    });

    return totals;
  }, [records]);

  const totalRecords =
    viewMode === "daily" ? filteredDailyRecords.length : monthlyTable.rows.length;

  const presentCount = filteredDailyRecords.filter((i) => i.checkIn).length;
  const absentCount = filteredDailyRecords.filter((i) => !i.checkIn).length;
  const checkedOutCount = filteredDailyRecords.filter((i) => i.checkOut).length;
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="w-full rounded-[28px] border border-slate-200 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.18)] sm:p-4 lg:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.35em] text-sky-300">
              Admin Panel
            </p>
            <h1 className="mt-2 text-xl font-semibold text-white sm:text-2xl xl:text-3xl">
              Staff Attendance
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Daily attendance and month-wise report
            </p>
          </div>

          <div className="flex max-w-full items-center gap-2 self-start rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/85 backdrop-blur-md">
            <CalendarDays className="h-4 w-4 shrink-0 text-sky-300" />
            <span className="truncate">
              {viewMode === "daily"
                ? new Date(selectedDate).toLocaleDateString([], {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : getSelectedMonthLabel(selectedMonth)}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setViewMode("daily")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              viewMode === "daily"
                ? "bg-sky-400 text-slate-950"
                : "border border-white/10 bg-white/5 text-white"
            }`}
          >
            Daily Attendance
          </button>

          <button
            onClick={() => setViewMode("monthly")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              viewMode === "monthly"
                ? "bg-sky-400 text-slate-950"
                : "border border-white/10 bg-white/5 text-white"
            }`}
          >
            Monthly Attendance Report
          </button>
{user?.name?.toLowerCase() === "adil" && (
  <button
    onClick={() => navigate("/admin/attendance/edit")}
    className="inline-flex items-center gap-2 rounded-xl border border-amber-400/30 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
  >
    Edit Attendance
  </button>
)}

          <button
            onClick={() => navigate("/attendance/report")}
            className="inline-flex items-center gap-2 rounded-xl border border-sky-400/30 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            <FileText className="h-4 w-4 text-sky-300" />
            Get Attendance Report
          </button>
        </div>

        <div
          className={`mt-5 grid grid-cols-2 gap-3 ${
            viewMode === "daily" ? "xl:grid-cols-4" : "xl:grid-cols-2"
          }`}
        >
          <StatCard
            label={viewMode === "daily" ? "Total Records" : "Total Dates"}
            value={totalRecords}
            icon={<Users className="h-4 w-4" />}
          />

          {viewMode === "monthly" ? (
            <StatCard
              label="Total Staff"
              value={monthlyTable.staffNames.length}
              icon={<BarChart3 className="h-4 w-4" />}
            />
          ) : (
            <>
              <StatCard
                label="Present"
                value={presentCount}
                icon={<CheckCircle2 className="h-4 w-4" />}
              />
              <StatCard
                label="Absent"
                value={absentCount}
                icon={<XCircle className="h-4 w-4" />}
              />
              <StatCard
                label="Checked Out"
                value={checkedOutCount}
                icon={<TimerReset className="h-4 w-4" />}
              />
            </>
          )}
        </div>

        <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-3 shadow-inner backdrop-blur-md sm:p-4">
          <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex w-full min-w-0 flex-col gap-3 md:flex-row md:items-center">
              <div className="relative w-full xl:max-w-sm">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder={
                    viewMode === "daily"
                      ? "Search by staff name or status"
                      : "Search by staff name"
                  }
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/35"
                />
              </div>

              {viewMode === "daily" && (
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none md:w-auto"
                />
              )}

              {viewMode === "monthly" && (
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none md:w-auto"
                >
                  {monthOptions.map((month) => (
                    <option
                      key={month.value}
                      value={month.value}
                      className="bg-slate-900 text-white"
                    >
                      {month.label}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-white/60">
              <Clock3 className="h-4 w-4 text-sky-300" />
              {viewMode === "daily"
                ? "Daily overview"
                : "All days of selected month"}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-sky-300" />
            </div>
          ) : viewMode === "daily" ? (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-180 border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-[0.18em] text-white/45">
                    <th className="px-4 py-2">Staff</th>
                    <th className="px-4 py-2">Check In</th>
                    <th className="px-4 py-2">Lunch Out</th>
                    <th className="px-4 py-2">Lunch In</th>
                    <th className="px-4 py-2">Check Out</th>
                    <th className="px-4 py-2">Working Hour</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredDailyRecords.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-10 text-center text-sm text-white/55"
                      >
                        {message || "No attendance records found for this date."}
                      </td>
                    </tr>
                  ) : (
                    filteredDailyRecords.map((item) => (
                      <tr key={item._id} className="bg-black/20">
                        <td className="rounded-l-2xl border-y border-l border-white/5 px-4 py-3.5">
                          <div>
                            <p className="text-sm font-medium text-white">
                              {item.userName || "-"}
                            </p>
                            <p className="mt-1 text-xs text-white/45">
                              {item.date || "-"}
                            </p>
                          </div>
                        </td>

                        <td className="border-y border-white/5 px-4 py-3.5 text-sm text-white/80">
                          {formatTime(item.checkIn)}
                        </td>

                        <td className="border-y border-white/5 px-4 py-3.5 text-sm text-white/80">
                          {formatTime(item.lunchOut)}
                        </td>

                        <td className="border-y border-white/5 px-4 py-3.5 text-sm text-white/80">
                          {formatTime(item.lunchIn)}
                        </td>

                        <td className="border-y border-white/5 px-4 py-3.5 text-sm text-white/80">
                          {formatTime(item.checkOut)}
                        </td>

                        <td className="border-y border-white/5 px-4 py-3.5 text-sm font-semibold text-purple-300">
                          {getWorkingHour(item)}
                        </td>

                        <td className="rounded-r-2xl border-y border-r border-white/5 px-4 py-3.5">
                          <StatusBadge status={item.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-black/10">
              <div className="custom-scrollbar max-w-full overflow-x-auto">
                <table className="min-w-max border-collapse">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="sticky left-0 z-20 min-w-20 border-b border-r border-white/10 bg-slate-950 px-3 py-3 text-left text-[11px] uppercase tracking-[0.18em] text-white/55">
                        Date
                      </th>

                      {monthlyTable.staffNames.map((name) => (
                        <th
                          key={name}
                          className="min-w-27.5 border-b border-white/10 px-3 py-3 text-center text-[11px] uppercase tracking-[0.12em] text-white/55"
                        >
                          <div className="truncate">{name}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {monthlyTable.staffNames.length === 0 ? (
                      <tr>
                        <td
                          colSpan={2}
                          className="py-10 text-center text-sm text-white/55"
                        >
                          {message ||
                            `No attendance records found for ${getSelectedMonthLabel(
                              selectedMonth
                            )}.`}
                        </td>
                      </tr>
                    ) : (
                      <>
                        {monthlyTable.rows.map((row) => (
                          <tr
                            key={row.date}
                            className="odd:bg-black/10 even:bg-black/20"
                          >
                            <td className="sticky left-0 z-10 border-r border-t border-white/10 bg-slate-950 px-3 py-3 text-sm font-semibold text-white">
                              {formatDayLabel(row.date)}
                            </td>

                            {monthlyTable.staffNames.map((name) => (
                              <td
                                key={`${row.date}-${name}`}
                                className="min-w-27.5 border-t border-white/10 px-2 py-3 align-top"
                              >
                                <MonthlyCell item={row[name]} />
                              </td>
                            ))}
                          </tr>
                        ))}

                        <tr className="bg-sky-400/10">
                          <td className="sticky left-0 z-10 border-r border-t border-white/10 bg-slate-900 px-3 py-3 text-sm font-bold text-sky-300">
                            Total
                          </td>

                          {monthlyTable.staffNames.map((name) => (
                            <td
                              key={`total-${name}`}
                              className="min-w-27.5 border-t border-white/10 px-2 py-3 text-center text-xs font-bold text-sky-300"
                            >
                              {minutesToText(monthlyStaffTotals[name] || 0)}
                            </td>
                          ))}
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}