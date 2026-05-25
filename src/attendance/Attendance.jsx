import React, { useEffect, useMemo, useState } from "react";
import {
  Clock3,
  LogIn,
  LogOut,
  UtensilsCrossed,
  Coffee,
  CheckCircle2,
  Loader2,
  FileText,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const actionConfig = [
  {
    label: "Check In",
    bangla: "ডিউটি শুরু",
    value: "check_in",
    icon: LogIn,
    cardClass:
      "border-emerald-400/25 bg-emerald-500/15 hover:bg-emerald-500/25",
    iconClass: "bg-emerald-400/20 text-emerald-200",
    badgeClass: "bg-emerald-400/15 text-emerald-100",
  },
  {
    label: "Lunch Out",
    bangla: "খাইতে যাই",
    value: "lunch_out",
    icon: UtensilsCrossed,
    cardClass: "border-amber-400/25 bg-amber-500/15 hover:bg-amber-500/25",
    iconClass: "bg-amber-400/20 text-amber-200",
    badgeClass: "bg-amber-400/15 text-amber-100",
  },
  {
    label: "Lunch In",
    bangla: "খাওয়া শেষ",
    value: "lunch_in",
    icon: Coffee,
    cardClass: "border-sky-400/25 bg-sky-500/15 hover:bg-sky-500/25",
    iconClass: "bg-sky-400/20 text-sky-200",
    badgeClass: "bg-sky-400/15 text-sky-100",
  },
  {
    label: "Check Out",
    bangla: "ডিউটি শেষ",
    value: "check_out",
    icon: LogOut,
    cardClass: "border-rose-400/25 bg-rose-500/15 hover:bg-rose-500/25",
    iconClass: "bg-rose-400/20 text-rose-200",
    badgeClass: "bg-rose-400/15 text-rose-100",
  },
];

const QATAR_TIMEZONE = "Asia/Qatar";
const API_BASE = "https://wmibcstaff-server.vercel.app/api";

export default function AttendancePage() {
  const [loadingAction, setLoadingAction] = useState(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [time, setTime] = useState(new Date());
  const [status, setStatus] = useState(null);
  const [todayActions, setTodayActions] = useState([]);
  const [todayHistory, setTodayHistory] = useState([]);
  const [loadingToday, setLoadingToday] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    try {
      setToken(localStorage.getItem("token") || "");
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
    } catch {
      setToken("");
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  function formatActionLabel(action) {
    if (!action) return "";
    return action
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function getActionMeta(action) {
    return actionConfig.find((item) => item.value === action);
  }

  function formatTime(value) {
    if (!value) return "-";

    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "-";

    return d.toLocaleTimeString("en-US", {
      timeZone: QATAR_TIMEZONE,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  function formatDate(value) {
    if (!value) return "";

    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";

    return d.toLocaleDateString("en-US", {
      timeZone: QATAR_TIMEZONE,
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const showSuccess = (text) => toast.success(text);
  const showError = (text) => toast.error(text);

  useEffect(() => {
    const fetchTodayAttendance = async () => {
      if (!token) return;

      try {
        setLoadingToday(true);

        const res = await fetch(`${API_BASE}/attendance/today`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          showError(data.message || "Failed to load attendance");
          return;
        }

        const history = Array.isArray(data?.history) ? data.history : [];
        const actions = history.map((item) => item?.action).filter(Boolean);

        setTodayHistory(history);
        setTodayActions(actions);

        if (history.length > 0) {
          const last = history[history.length - 1];
          const meta = getActionMeta(last?.action);

          setStatus({
            action: last?.label || meta?.label || formatActionLabel(last?.action),
            bangla: meta?.bangla || "",
            time: formatTime(last?.createdAt),
          });
        }
      } catch {
        showError("Failed to load today's attendance");
      } finally {
        setLoadingToday(false);
      }
    };

    fetchTodayAttendance();
  }, [token]);

  const actionState = useMemo(() => {
    const hasCheckIn = todayActions.includes("check_in");
    const hasLunchOut = todayActions.includes("lunch_out");
    const hasLunchIn = todayActions.includes("lunch_in");
    const hasCheckOut = todayActions.includes("check_out");

    return {
      check_in: {
        disabled: hasCheckIn,
        reason: hasCheckIn ? "Already checked in today" : "",
      },
      lunch_out: {
        disabled: !hasCheckIn || hasLunchOut || hasCheckOut,
        reason: !hasCheckIn
          ? "Check In first"
          : hasLunchOut
          ? "Lunch Out already recorded"
          : hasCheckOut
          ? "Already checked out"
          : "",
      },
      lunch_in: {
        disabled: !hasLunchOut || hasLunchIn || hasCheckOut,
        reason: !hasLunchOut
          ? "Lunch Out first"
          : hasLunchIn
          ? "Lunch In already recorded"
          : hasCheckOut
          ? "Already checked out"
          : "",
      },
      check_out: {
        disabled: !hasCheckIn || hasCheckOut || (hasLunchOut && !hasLunchIn),
        reason: !hasCheckIn
          ? "Check In first"
          : hasCheckOut
          ? "Already checked out"
          : hasLunchOut && !hasLunchIn
          ? "Lunch In first"
          : "",
      },
    };
  }, [todayActions]);

  const qatarHour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: QATAR_TIMEZONE,
      hour: "2-digit",
      hour12: false,
    }).format(time)
  );

  const isOutsideTime = qatarHour < 9 || qatarHour >= 24;

  const handleAttendance = async (action) => {
    if (isOutsideTime) {
      showError("Attendance allowed only between 9 AM and 11 PM");
      return;
    }

    if (!token) {
      showError("Please login again");
      return;
    }

    if (actionState?.[action]?.disabled) {
      showError(actionState[action].reason);
      return;
    }

    try {
      setLoadingAction(action);

      const res = await fetch(`${API_BASE}/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });

      const data = await res.json();

      if (!res.ok) {
        showError(data.message || "Failed");
        return;
      }

      const meta = getActionMeta(action);

      const label =
        data?.record?.label ||
        meta?.label ||
        formatActionLabel(action);

      const createdAt = data?.record?.createdAt || new Date().toISOString();

      setStatus({
        action: label,
        bangla: meta?.bangla || "",
        time: formatTime(createdAt),
      });

      setTodayActions((prev) =>
        prev.includes(action) ? prev : [...prev, action]
      );

      setTodayHistory((prev) => [
        ...prev,
        {
          action,
          label,
          createdAt,
        },
      ]);

      showSuccess(`${label} recorded successfully`);
    } catch {
      showError("Server error");
    } finally {
      setLoadingAction(null);
    }
  };

  const generateMonthlyPdf = async () => {
    showSuccess("Monthly PDF feature connected here");
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#0f172a] via-[#0b1120] to-[#020617] text-white">
      <Toaster position="top-center" />

      <div className="mx-auto w-full max-w-3xl px-3 py-5 sm:px-5 lg:px-6">
        <div className="space-y-5">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl">
            <div className="flex justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-blue-300">
                  Attendance
                </p>
                <h1 className="mt-1 text-xl font-semibold">
                  Hi, {user?.name || "User"} 👋
                </h1>
                <p className="mt-1 text-sm text-white/70">
                  Mark your attendance step by step
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/10 p-3">
                <Clock3 className="h-5 w-5 text-blue-300" />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/5 bg-black/30 p-3">
                <p className="text-xs text-white/60">Time</p>
                <p className="text-lg font-semibold">
                  {time.toLocaleTimeString("en-US", {
                    timeZone: QATAR_TIMEZONE,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-black/30 p-3">
                <p className="text-xs text-white/60">Date</p>
                <p className="text-sm">{formatDate(time)}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-400/20 p-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
              </div>

              <div>
                <p className="text-xs text-white/60">Last Status</p>
                <p className="font-semibold">
                  {loadingToday
                    ? "Loading..."
                    : status
                    ? status.action
                    : "No record yet"}
                </p>

                {status?.bangla && (
                  <p className="text-sm font-medium text-emerald-100">
                    {status.bangla}
                  </p>
                )}

                <p className="text-sm text-white/70">
                  {status
                    ? `at ${status.time}`
                    : "First action will appear here"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {actionConfig.map((item, index) => {
              const Icon = item.icon;
              const isLoading = loadingAction === item.value;
              const isCompleted = todayActions.includes(item.value);

              const isDisabled =
                !!loadingAction ||
                loadingToday ||
                actionState?.[item.value]?.disabled ||
                isOutsideTime;

              return (
                <button
                  key={item.value}
                  onClick={() => handleAttendance(item.value)}
                  disabled={isDisabled}
                  className={`w-full rounded-3xl border p-4 text-left shadow-xl transition ${
                    isDisabled
                      ? "cursor-not-allowed border-white/5 bg-white/5 opacity-45"
                      : item.cardClass
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                        isDisabled ? "bg-white/10 text-white/60" : item.iconClass
                      }`}
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-semibold text-white">
                            {index + 1}. {item.label}
                          </p>
                          <p className="mt-1 text-lg font-bold leading-none text-white">
                            {item.bangla}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${
                            isCompleted
                              ? "bg-emerald-400/20 text-emerald-100"
                              : isDisabled
                              ? "bg-white/10 text-white/55"
                              : item.badgeClass
                          }`}
                        >
                          {isCompleted ? "Done" : "Tap"}
                        </span>
                      </div>

                      <p className="mt-3 text-xs text-white/70">
                        {isOutsideTime
                          ? "Allowed only 9 AM – 11 PM"
                          : isDisabled
                          ? actionState?.[item.value]?.reason
                          : "Available now"}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-xl backdrop-blur-xl">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Today Activity</h2>
              <span className="text-xs text-white/55">
                {todayHistory.length} record
                {todayHistory.length !== 1 ? "s" : ""}
              </span>
            </div>

            {todayHistory.length === 0 ? (
              <p className="text-sm text-white/60">
                No attendance recorded yet.
              </p>
            ) : (
              <div className="space-y-2">
                {todayHistory.map((item, index) => {
                  const meta = getActionMeta(item?.action);

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-black/25 px-3 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold">
                          {item?.label ||
                            meta?.label ||
                            formatActionLabel(item?.action)}
                        </p>

                        {meta?.bangla && (
                          <p className="text-xs text-white/60">
                            {meta.bangla}
                          </p>
                        )}
                      </div>

                      <span className="shrink-0 text-xs text-white/65">
                        {formatTime(item?.createdAt)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}