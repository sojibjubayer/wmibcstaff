import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Clock3,
  Loader2,
  UserCheck,
  Coffee,
  LogOut,
  XCircle,
  RefreshCcw,
  CalendarDays,
  Users,
  Activity,
  MapPin,
} from "lucide-react";

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function getEmployeeTimeZone(item) {
  const bangladeshEmployees = ["israt", "nusrat", "jasmin", "shapna"];

  const name = item?.userName?.toLowerCase()?.trim();

  if (bangladeshEmployees.includes(name)) {
    return "Asia/Dhaka";
  }

  return "Asia/Qatar";
}

function getCountryLabel(timeZone) {
  return timeZone === "Asia/Dhaka" ? "Bangladesh" : "Qatar";
}

function formatTime(value, timeZone = "Asia/Qatar") {
  if (!value) return "-";

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";

  return d.toLocaleTimeString("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function getStatus(item) {
  if (!item?.checkIn) return "Absent";
  if (item?.checkOut) return "Checked Out";
  if (item?.lunchOut && !item?.lunchIn) return "On Break";
  return "Working";
}

function getStatusStyle(status) {
  if (status === "Working") {
    return {
      card:
        "border-emerald-400/25 bg-gradient-to-br from-emerald-500/15 via-slate-900/95 to-slate-950",
      glow: "shadow-[0_0_30px_rgba(16,185,129,0.12)]",
      badge: "bg-emerald-400 text-slate-950",
      iconBox: "bg-emerald-400/15 text-emerald-300",
      dot: "bg-emerald-400",
      activeBox: "border-sky-400/45 bg-sky-400/12 text-sky-300",
      icon: <UserCheck className="h-5 w-5" />,
      label: "Working",
    };
  }

  if (status === "On Break") {
    return {
      card:
        "border-amber-400/25 bg-gradient-to-br from-amber-500/15 via-slate-900/95 to-slate-950",
      glow: "shadow-[0_0_30px_rgba(251,191,36,0.12)]",
      badge: "bg-amber-400 text-slate-950",
      iconBox: "bg-amber-400/15 text-amber-300",
      dot: "bg-amber-400",
      activeBox: "border-amber-400/45 bg-amber-400/12 text-amber-300",
      icon: <Coffee className="h-5 w-5" />,
      label: "On Break",
    };
  }

  if (status === "Checked Out") {
    return {
      card:
        "border-sky-400/25 bg-gradient-to-br from-sky-500/15 via-slate-900/95 to-slate-950",
      glow: "shadow-[0_0_30px_rgba(56,189,248,0.12)]",
      badge: "bg-sky-400 text-slate-950",
      iconBox: "bg-sky-400/15 text-sky-300",
      dot: "bg-sky-400",
      activeBox: "border-sky-400/45 bg-sky-400/12 text-sky-300",
      icon: <LogOut className="h-5 w-5" />,
      label: "Checked Out",
    };
  }

  return {
    card:
      "border-red-400/20 bg-gradient-to-br from-red-500/10 via-slate-900/95 to-slate-950",
    glow: "shadow-[0_0_30px_rgba(248,113,113,0.10)]",
    badge: "bg-red-400 text-white",
    iconBox: "bg-red-400/15 text-red-300",
    dot: "bg-red-400",
    activeBox: "border-red-400/45 bg-red-400/12 text-red-300",
    icon: <XCircle className="h-5 w-5" />,
    label: "Absent",
  };
}

function ActionTimeBox({ label, time, active, activeClass }) {
  return (
    <div
      className={`rounded-2xl border px-3 py-2.5 transition ${
        active ? activeClass : "border-white/10 bg-black/25 text-white/75"
      }`}
    >
      <p className="text-[9px] font-black uppercase tracking-[0.16em] text-white/35">
        {label}
      </p>

      <p className="mt-1.5 text-base font-black leading-none">{time}</p>
    </div>
  );
}

function SummaryBox({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/6 p-3.5 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
          {label}
        </p>

        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-2xl font-black text-white">{value}</p>
    </div>
  );
}

function StatusCard({ item }) {
  const status = getStatus(item);
  const style = getStatusStyle(status);
  const timeZone = getEmployeeTimeZone(item);
  const country = getCountryLabel(timeZone);

  return (
    <div
      className={`group relative overflow-hidden rounded-[26px] border p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${style.card} ${style.glow}`}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-28 w-28 rounded-full bg-white/5 blur-3xl" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${style.dot}`} />

            <p className="truncate text-xl font-black text-white">
              {item.userName || "Unknown Staff"}
            </p>
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/45">
            <span>{item.date || getTodayDate()}</span>

            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold text-white/55">
              <MapPin className="h-3 w-3" />
              {country}
            </span>
          </div>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${style.iconBox}`}
        >
          {style.icon}
        </div>
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-2.5">
        <ActionTimeBox
          label="Check In"
          time={formatTime(item.checkIn, timeZone)}
          active={!!item?.checkIn}
          activeClass={style.activeBox}
        />

        <ActionTimeBox
          label="Break"
          time={formatTime(item.lunchOut, timeZone)}
          active={!!item?.lunchOut}
          activeClass={style.activeBox}
        />

        <ActionTimeBox
          label="Break End"
          time={formatTime(item.lunchIn, timeZone)}
          active={!!item?.lunchIn}
          activeClass={style.activeBox}
        />

        <ActionTimeBox
          label="Check Out"
          time={formatTime(item.checkOut, timeZone)}
          active={!!item?.checkOut}
          activeClass={style.activeBox}
        />
      </div>

      <div className="relative mt-4 flex items-center justify-between gap-3">
        <span className={`rounded-full px-4 py-2 text-xs font-black ${style.badge}`}>
          {style.label}
        </span>

        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold text-white/45">
          Current
        </span>
      </div>
    </div>
  );
}

export default function CurrentStatus() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchCurrentStatus = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(
        `https://wmibcstaff-server.vercel.app/api/attendance?date=${selectedDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let data = [];

      try {
        data = await res.json();
      } catch {
        data = [];
      }

      if (!res.ok) {
        setRecords([]);
        setMessage(data?.message || "Failed to load current status.");
        return;
      }

      setRecords(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Current status fetch error:", error);
      setRecords([]);
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentStatus();
  }, [selectedDate]);

  const filteredRecords = useMemo(() => {
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

  const workingCount = filteredRecords.filter(
    (item) => item.status === "Working"
  ).length;

  const breakCount = filteredRecords.filter(
    (item) => item.status === "On Break"
  ).length;

  const checkedOutCount = filteredRecords.filter(
    (item) => item.status === "Checked Out"
  ).length;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 p-2.5 text-white sm:p-4 lg:p-5">
      <div className="relative min-h-screen overflow-hidden rounded-[28px] border border-white/10 bg-linear-to-br from-slate-950 via-slate-900 to-black p-3.5 shadow-2xl sm:p-5 lg:p-6">
        <div className="pointer-events-none absolute left-0 top-0 h-60 w-60 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">
                <Activity className="h-3.5 w-3.5" />
                Live Attendance
              </div>

              <h1 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
                Current Staff Status
              </h1>

              <p className="mt-1.5 max-w-2xl text-xs leading-5 text-white/55 sm:text-sm">
                Showing Check In, Break, Break End, and Check Out times for each
                staff member.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3.5 py-2.5 text-xs font-semibold text-white/70 backdrop-blur-xl">
                <CalendarDays className="h-4 w-4 text-sky-300" />
                {selectedDate}
              </div>

              <button
                onClick={fetchCurrentStatus}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-400 px-4 py-2.5 text-xs font-black text-slate-950 shadow-lg shadow-sky-500/20 transition hover:bg-sky-300 disabled:opacity-60"
              >
                <RefreshCcw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            <SummaryBox
              label="Working"
              value={workingCount}
              icon={<UserCheck className="h-4.5 w-4.5 text-emerald-300" />}
            />

            <SummaryBox
              label="On Break"
              value={breakCount}
              icon={<Coffee className="h-4.5 w-4.5 text-amber-300" />}
            />

            <SummaryBox
              label="Checked Out"
              value={checkedOutCount}
              icon={<LogOut className="h-4.5 w-4.5 text-sky-300" />}
            />
          </div>

          <div className="mt-5 rounded-3xl border border-white/10 bg-white/6 p-3.5 backdrop-blur-xl">
            <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

                <input
                  type="text"
                  placeholder="Search by name or status..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/25 py-3 pl-10 pr-4 text-sm font-medium text-white outline-none transition placeholder:text-white/35 focus:border-sky-400/50 focus:ring-4 focus:ring-sky-400/10"
                />
              </div>

              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/25 px-3.5 py-3 text-sm font-medium text-white outline-none transition focus:border-sky-400/50 focus:ring-4 focus:ring-sky-400/10"
                />

                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/25 px-3.5 py-3 text-xs font-bold text-white/65">
                  <Users className="h-4 w-4 text-sky-300" />
                  Total Staff: {filteredRecords.length}
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/25 px-3.5 py-3 text-xs font-bold text-white/65">
                  <Clock3 className="h-4 w-4 text-sky-300" />
                  Status
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            {loading ? (
              <div className="flex min-h-65 items-center justify-center rounded-[26px] border border-white/10 bg-white/4">
                <div className="text-center">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-sky-300" />
                  <p className="mt-3 text-sm font-medium text-white/55">
                    Loading current status...
                  </p>
                </div>
              </div>
            ) : filteredRecords.length === 0 ? (
              <div className="flex min-h-65 items-center justify-center rounded-[26px] border border-white/10 bg-white/4 px-4 text-center">
                <div>
                  <XCircle className="mx-auto h-10 w-10 text-white/25" />
                  <p className="mt-3 text-base font-semibold text-white/70">
                    {message || "No attendance status found."}
                  </p>
                  <p className="mt-1 text-sm text-white/40">
                    Try another date or refresh the page.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredRecords.map((item) => (
                  <StatusCard key={item._id || item.userName} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}