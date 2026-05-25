import React, { useEffect, useMemo, useState } from "react";
import { Loader2, Save, Search } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

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

function toTimeInput(value) {
  if (!value) return "";

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";

  return d.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Qatar",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function makeDateTime(date, time) {
  if (!date || !time) return null;

  return new Date(`${date}T${time}:00+03:00`).toISOString();
}

function formatDay(dateStr) {
  if (!dateStr) return "-";
  return Number(String(dateStr).split("-")[2]);
}

export default function AttendanceEdit() {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [selectedStaff, setSelectedStaff] = useState("");
  const [records, setRecords] = useState([]);
  const [editing, setEditing] = useState({});
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://wmibcstaff-server.vercel.app/api/attendance?monthly=true&month=${selectedMonth}`
        );

        const data = await res.json();
        setRecords(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [selectedMonth]);

  const staffList = useMemo(() => {
    const map = new Map();

    records.forEach((item) => {
      if (item.userId && item.userName) {
        map.set(item.userId, {
          userId: item.userId,
          userName: item.userName,
        });
      }
    });

    return Array.from(map.values()).sort((a, b) =>
      a.userName.localeCompare(b.userName)
    );
  }, [records]);

  const selectedStaffData = useMemo(() => {
    return staffList.find((staff) => staff.userId === selectedStaff);
  }, [staffList, selectedStaff]);

  const filteredRows = useMemo(() => {
    if (!selectedStaff || !selectedStaffData) return [];

    const [year, month] = selectedMonth.split("-").map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();

    const recordMap = {};

    records
      .filter((item) => item.userId === selectedStaff)
      .forEach((item) => {
        recordMap[item.date] = item;
      });

    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = String(index + 1).padStart(2, "0");
      const date = `${selectedMonth}-${day}`;

      return (
        recordMap[date] || {
          _id: `new-${date}`,
          isNew: true,
          userId: selectedStaffData.userId,
          userName: selectedStaffData.userName,
          date,
          checkIn: null,
          lunchOut: null,
          lunchIn: null,
          checkOut: null,
        }
      );
    });
  }, [records, selectedMonth, selectedStaff, selectedStaffData]);

  const handleEditChange = (id, field, value) => {
    setEditing((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const getValue = (item, field) => {
    if (editing[item._id]?.[field] !== undefined) {
      return editing[item._id][field];
    }

    return toTimeInput(item[field]);
  };

  const updateRow = async (item) => {
    try {
      setSavingId(item._id);

      const payload = {
        userId: item.userId,
        userName: item.userName,
        date: item.date,
        checkIn: makeDateTime(item.date, getValue(item, "checkIn")),
        lunchOut: makeDateTime(item.date, getValue(item, "lunchOut")),
        lunchIn: makeDateTime(item.date, getValue(item, "lunchIn")),
        checkOut: makeDateTime(item.date, getValue(item, "checkOut")),
      };

      const res = await fetch(
        "https://wmibcstaff-server.vercel.app/api/attendance/manual",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data?.message || "Failed to save attendance");
        return;
      }

      setRecords((prev) => {
        const existing = prev.some(
          (row) => row.userId === item.userId && row.date === item.date
        );

        if (existing) {
          return prev.map((row) =>
            row.userId === item.userId && row.date === item.date
              ? {
                  ...row,
                  ...payload,
                  _id: row._id,
                  isNew: false,
                }
              : row
          );
        }

        return [
          ...prev,
          {
            ...payload,
            _id: data?.upsertedId || `saved-${item.userId}-${item.date}`,
            isNew: false,
          },
        ];
      });

      setEditing((prev) => {
        const copy = { ...prev };
        delete copy[item._id];
        return copy;
      });

      toast.success("Attendance saved");
    } catch (error) {
      console.error(error);
      toast.error(data?.message || "Failed to save attendance");
    } finally {
      setSavingId("");
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden">
        <Toaster position="top-center" />
      <div className="w-full rounded-[28px] border border-slate-200 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-amber-300">
            Admin Panel
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-white">
            Edit Attendance
          </h1>

          <p className="mt-2 text-sm text-white/60">
            Select month and staff. Full month dates will appear, including empty
            days.
          </p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setSelectedStaff("");
              setEditing({});
            }}
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
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

          <select
            value={selectedStaff}
            onChange={(e) => {
              setSelectedStaff(e.target.value);
              setEditing({});
            }}
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
          >
            <option value="" className="bg-slate-900">
              Select Staff
            </option>

            {staffList.map((staff) => (
              <option
                key={staff.userId}
                value={staff.userId}
                className="bg-slate-900"
              >
                {staff.userName}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-3">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-sky-300" />
            </div>
          ) : !selectedStaff ? (
            <div className="flex flex-col items-center justify-center py-16 text-white/55">
              <Search className="mb-3 h-6 w-6 text-sky-300" />
              Select month and staff to view attendance.
            </div>
          ) : filteredRows.length === 0 ? (
            <div className="py-16 text-center text-white/55">
              No staff data found.
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-220 border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-[0.18em] text-white/45">
                    <th className="px-4 py-2">Day</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Staff</th>
                    <th className="px-4 py-2">Check In</th>
                    <th className="px-4 py-2">Lunch Out</th>
                    <th className="px-4 py-2">Lunch In</th>
                    <th className="px-4 py-2">Check Out</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRows.map((item) => (
                    <tr key={item._id} className="bg-black/20">
                      <td className="rounded-l-2xl border-y border-l border-white/5 px-4 py-3 text-sm font-semibold text-white">
                        {formatDay(item.date)}
                      </td>

                      <td className="border-y border-white/5 px-4 py-3 text-sm text-white/80">
                        {item.date}
                      </td>

                      <td className="border-y border-white/5 px-4 py-3 text-sm text-white">
                        {item.userName}
                        {item.isNew && (
                          <span className="ml-2 rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] text-amber-300">
                            New
                          </span>
                        )}
                      </td>

                      {["checkIn", "lunchOut", "lunchIn", "checkOut"].map(
                        (field) => (
                          <td
                            key={field}
                            className="border-y border-white/5 px-4 py-3"
                          >
                            <input
                              type="time"
                              value={getValue(item, field)}
                              onChange={(e) =>
                                handleEditChange(
                                  item._id,
                                  field,
                                  e.target.value
                                )
                              }
                              className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none"
                            />
                          </td>
                        )
                      )}

                      <td className="rounded-r-2xl border-y border-r border-white/5 px-4 py-3">
                        <button
                          onClick={() => updateRow(item)}
                          disabled={savingId === item._id}
                          className="inline-flex items-center gap-2 rounded-xl bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50"
                        >
                          {savingId === item._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                          {item.isNew ? "Create" : "Update"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}