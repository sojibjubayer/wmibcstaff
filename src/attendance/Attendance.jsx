import React, { useEffect, useMemo, useState } from "react";
import {
  Clock3,
  LogIn,
  LogOut,
  UtensilsCrossed,
  Coffee,
  CheckCircle2,
  Loader2,
  Calendar,
  Activity,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const actionConfig = [
  {
    label: "Check In",
    value: "check_in",
    icon: LogIn,
    cardClass:
      "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 focus-visible:ring-emerald-500/50",
    iconClass: "bg-emerald-500/20 text-emerald-400",
    badgeClass: "bg-emerald-500/20 text-emerald-300",
  },
  {
    label: "Break",
    value: "lunch_out",
    icon: UtensilsCrossed,
    cardClass:
      "border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 focus-visible:ring-amber-500/50",
    iconClass: "bg-amber-500/20 text-amber-400",
    badgeClass: "bg-amber-500/20 text-amber-300",
  },
  {
    label: "Break End",
    value: "lunch_in",
    icon: Coffee,
    cardClass:
      "border-sky-500/20 bg-sky-500/5 hover:bg-sky-500/10 focus-visible:ring-sky-500/50",
    iconClass: "bg-sky-500/20 text-sky-400",
    badgeClass: "bg-sky-500/20 text-sky-300",
  },
  {
    label: "Check Out",
    value: "check_out",
    icon: LogOut,
    cardClass:
      "border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 focus-visible:ring-rose-500/50",
    iconClass: "bg-rose-500/20 text-rose-400",
    badgeClass: "bg-rose-500/20 text-rose-300",
  },
];

// TIME SETTING ZONEWISE
const DEFAULT_TIMEZONE = "Asia/Qatar";

function getUserTimezone(user) {
  if (user?.country === "Bangladesh") return "Asia/Dhaka";
  return DEFAULT_TIMEZONE;
}

function getTimezoneLabel(user) {
  if (user?.country === "Bangladesh") return "Bangladesh Time";
  return "Qatar Time"; 
}

const API_BASE = "https://wmibcstaff-server.vercel.app/api";

export default function AttendancePage() {
  const [loadingAction, setLoadingAction] = useState(null);
  const [time, setTime] = useState(new Date());
  const [status, setStatus] = useState(null);
  const [todayActions, setTodayActions] = useState([]);
  const [todayHistory, setTodayHistory] = useState([]);
  const [loadingToday, setLoadingToday] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const userTimezone = getUserTimezone(user);
  const timezoneLabel = getTimezoneLabel(user);

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
      timeZone: userTimezone,
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
      timeZone: userTimezone,
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
            action:
              last?.label || meta?.label || formatActionLabel(last?.action),
            time: formatTime(last?.createdAt),
            value: last?.action,
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
    const hasBreak = todayActions.includes("lunch_out");
    const hasBreakEnd = todayActions.includes("lunch_in");
    const hasCheckOut = todayActions.includes("check_out");

    return {
      check_in: {
        disabled: hasCheckIn,
        reason: hasCheckIn ? "Already checked in today" : "",
      },
      lunch_out: {
        disabled: !hasCheckIn || hasBreak || hasCheckOut,
        reason: !hasCheckIn
          ? "Check In first"
          : hasBreak
            ? "Break already started"
            : hasCheckOut
              ? "Already checked out"
              : "",
      },
      lunch_in: {
        disabled: !hasBreak || hasBreakEnd || hasCheckOut,
        reason: !hasBreak
          ? "Break first"
          : hasBreakEnd
            ? "Break already ended"
            : hasCheckOut
              ? "Already checked out"
              : "",
      },
      check_out: {
        disabled: !hasCheckIn || hasCheckOut,
        reason: !hasCheckIn
          ? "Check In first"
          : hasCheckOut
            ? "Already checked out"
            : "",
      },
    };
  }, [todayActions]);

  const handleAttendance = async (action) => {
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
        data?.record?.label || meta?.label || formatActionLabel(action);
      const createdAt = data?.record?.createdAt || new Date().toISOString();

      setStatus({
        action: label,
        time: formatTime(createdAt),
        value: action,
      });

      setTodayActions((prev) =>
        prev.includes(action) ? prev : [...prev, action],
      );

      setTodayHistory((prev) => [...prev, { action, label, createdAt }]);

      showSuccess(`${label} recorded successfully`);
    } catch {
      showError("Server error");
    } finally {
      setLoadingAction(null);
    }
  };

  const lastMeta = status?.value ? getActionMeta(status.value) : null;
  const LastIcon = lastMeta?.icon || CheckCircle2;

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 antialiased selection:bg-blue-500/30">
      <Toaster position="top-center" />

      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-12">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                  Workforce Portal
                </span>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-white">
                  Hi, {user?.name || "User"} 👋
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  Mark your shift attendance milestones.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-blue-400 shadow-inner">
                <Clock3 className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-4">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <Clock3 className="h-3.5 w-3.5 text-slate-500" />
                  {timezoneLabel}
                </span>

                <p className="mt-1.5 text-xl font-bold tracking-wide text-white tabular-nums">
                  {time.toLocaleTimeString("en-US", {
                    timeZone: userTimezone,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-4">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  Today
                </span>

                <p className="mt-1.5 text-base font-semibold text-slate-200">
                  {formatDate(time) || "Loading..."}
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-yellow-400/40 bg-linear-to-br from-[#3b2a00] via-[#1c1505] to-[#0f0c05] p-6 text-center shadow-[0_0_50px_rgba(250,204,21,0.15)]">
            <div className="absolute inset-0 bg-linear-to-r from-yellow-400/10 via-transparent to-amber-400/10" />
            <div className="absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-yellow-400/20 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-yellow-300/40 bg-yellow-400/15 text-yellow-300 shadow-[0_0_30px_rgba(250,204,21,0.25)]">
                {loadingToday ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : (
                  <LastIcon className="h-8 w-8" />
                )}
              </div>

              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-yellow-200">
                LAST STATUS
              </span>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-white">
                {loadingToday ? (
                  <span className="text-2xl text-yellow-200">Updating...</span>
                ) : status ? (
                  status.action
                ) : (
                  "No Action Logged"
                )}
              </h2>

              {status?.action && (
                <span className="mt-3 rounded-full border border-yellow-300/20 bg-yellow-400/10 px-4 py-1 text-sm font-bold text-yellow-100">
                  {status.action}
                </span>
              )}

              <p className="mt-4 text-sm font-medium text-yellow-100/70">
                {status
                  ? `Recorded at ${status.time}`
                  : "Waiting for first attendance"}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {actionConfig.map((item, index) => {
              const Icon = item.icon;
              const isLoading = loadingAction === item.value;
              const isCompleted = todayActions.includes(item.value);

              const isDisabled =
                !!loadingAction ||
                loadingToday ||
                actionState?.[item.value]?.disabled;

              return (
                <button
                  key={item.value}
                  onClick={() => handleAttendance(item.value)}
                  disabled={isDisabled}
                  className={`group relative flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left outline-none transition-all duration-200 focus-visible:ring-2 active:scale-[0.99] ${
                    isCompleted
                      ? "cursor-not-allowed opacity-45 border-slate-800 bg-slate-900/30"
                      : isDisabled
                        ? "cursor-not-allowed border-slate-900 bg-slate-900/20 opacity-40"
                        : `${item.cardClass} shadow-xs hover:translate-x-0.5`
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isCompleted
                          ? "bg-slate-800 text-slate-500"
                          : isDisabled
                            ? "bg-slate-900 text-slate-600"
                            : item.iconClass
                      }`}
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-400">
                          0{index + 1}
                        </span>

                        <p className="text-sm font-semibold tracking-tight text-slate-200">
                          Attendance Action
                        </p>
                      </div>

                      <p
                        className={`mt-0.5 text-xl font-bold tracking-wide ${
                          isCompleted ? "text-slate-500" : "text-white"
                        }`}
                      >
                        {item.label}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        isCompleted
                          ? "border-slate-700 bg-slate-800 text-slate-400"
                          : isDisabled
                            ? "border-slate-800 bg-slate-950 text-slate-500"
                            : `${item.badgeClass} border-current/10`
                      }`}
                    >
                      {isCompleted ? "Done" : "Tap"}
                    </span>

                    {!isCompleted &&
                      isDisabled &&
                      actionState?.[item.value]?.reason && (
                        <span className="max-w-30 truncate text-right text-[10px] text-slate-500">
                          {actionState[item.value].reason}
                        </span>
                      )}

                    {!isDisabled && (
                      <span className="text-[10px] font-medium text-slate-400 transition-colors group-hover:text-current">
                        Ready
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Activity className="h-3.5 w-3.5 text-slate-500" />
                Today's Timeline
              </h3>

              <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-400">
                {todayHistory.length} Record
                {todayHistory.length !== 1 ? "s" : ""}
              </span>
            </div>

            {todayHistory.length === 0 ? (
              <div className="py-6 text-center">
                <p className="text-sm text-slate-500">
                  No events logged for this schedule window.
                </p>
              </div>
            ) : (
              <div className="subtle-scrollbar max-h-60 space-y-2 overflow-y-auto pr-1">
                {todayHistory.map((item, index) => {
                  const meta = getActionMeta(item?.action);

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-800/50 bg-slate-950/50 px-4 py-3 transition-colors hover:border-slate-800"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-200">
                          {item?.label ||
                            meta?.label ||
                            formatActionLabel(item?.action)}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-md border border-slate-800 bg-slate-900 px-2 py-0.5 text-xs font-medium tabular-nums text-slate-400">
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
