import React, { useEffect, useMemo, useState } from "react";
import {
  Clock3,
  LogIn,
  LogOut,
  UtensilsCrossed,
  Coffee,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const actionConfig = [
  { label: "Check In", value: "check_in", icon: LogIn },
  { label: "Lunch Out", value: "lunch_out", icon: UtensilsCrossed },
  { label: "Lunch In", value: "lunch_in", icon: Coffee },
  { label: "Check Out", value: "check_out", icon: LogOut },
];

export default function AttendancePage() {
  const token = localStorage.getItem("token");

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch (error) {
    user = null;
  }

  const [loadingAction, setLoadingAction] = useState(null);
  const [message, setMessage] = useState("");
  const [time, setTime] = useState(new Date());
  const [status, setStatus] = useState(null);
  const [todayActions, setTodayActions] = useState([]);
  const [todayHistory, setTodayHistory] = useState([]);
  const [loadingToday, setLoadingToday] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTodayAttendance = async () => {
      if (!token) {
        setTodayActions([]);
        setTodayHistory([]);
        setStatus(null);
        setLoadingToday(false);
        return;
      }

      try {
        setLoadingToday(true);
        setMessage("");
console.log("token:", token);
console.log("action:", action);
console.log("url:", `https://wmibcstaff-server.vercel.app/api/attendance`);
        const res = await fetch("https://wmibcstaff-server.vercel.app/api/attendance/today", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        let data = {};
        try {
          data = await res.json();
        } catch (jsonError) {
          data = {};
        }

        if (!res.ok) {
          setTodayActions([]);
          setTodayHistory([]);
          setStatus(null);
          setMessage(data.message || "");
          return;
        }

        const history = Array.isArray(data?.history) ? data.history : [];
        const actions = history.map((item) => item?.action).filter(Boolean);

        setTodayHistory(history);
        setTodayActions(actions);

        if (history.length > 0) {
          const last = history[history.length - 1];
          setStatus({
            action: last?.label || formatActionLabel(last?.action),
            time: last?.time || formatTime(last?.createdAt || last?.timestamp),
          });
        } else {
          setStatus(null);
        }
      } catch (err) {
        setTodayActions([]);
        setTodayHistory([]);
        setStatus(null);
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
              ? "Day already checked out"
              : "",
      },
      lunch_in: {
        disabled: !hasLunchOut || hasLunchIn || hasCheckOut,
        reason: !hasLunchOut
          ? "Lunch Out first"
          : hasLunchIn
            ? "Lunch In already recorded"
            : hasCheckOut
              ? "Day already checked out"
              : "",
      },
      check_out: {
        disabled: !hasCheckIn || hasCheckOut || (hasLunchOut && !hasLunchIn),
        reason: !hasCheckIn
          ? "Check In first"
          : hasCheckOut
            ? "Already checked out today"
            : hasLunchOut && !hasLunchIn
              ? "Lunch In first"
              : "",
      },
    };
  }, [todayActions]);

  const handleAttendance = async (action) => {
    if (!token) {
      setMessage("Please login again.");
      return;
    }

    const flowBlocked = actionState?.[action]?.disabled;

    if (flowBlocked) {
      setMessage(actionState?.[action]?.reason || "This action is not allowed now.");
      return;
    }

    try {
      setLoadingAction(action);
      setMessage("");

      const res = await fetch("https://wmibcstaff-server.vercel.app/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch (jsonError) {
        data = {};
      }

      if (!res.ok) {
        setMessage(data.message || "Failed to record attendance.");
        return;
      }

      const actionLabel =
        data?.record?.label ||
        actionConfig.find((a) => a.value === action)?.label ||
        formatActionLabel(action);

      const actionTime =
        data?.record?.time ||
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

      setStatus({
        action: actionLabel,
        time: actionTime,
      });

      setTodayActions((prev) => [...prev, action]);
      setTodayHistory((prev) => [
        ...prev,
        {
          action,
          label: actionLabel,
          time: actionTime,
        },
      ]);

      setMessage(data.message || `${actionLabel} recorded successfully`);
    } catch (err) {
      setMessage("Server error");
    } finally {
      setLoadingAction(null);
    }
  };

  function formatActionLabel(action) {
    if (!action || typeof action !== "string") return "";
    return action
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function formatTime(value) {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f172a] via-[#0b1120] to-[#020617] text-white flex justify-center">
      <div className="w-full max-w-md px-4 py-6 flex flex-col">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl mb-5">
          <div className="flex justify-between items-start gap-3">
            <div>
              <p className="text-xs text-blue-300 uppercase tracking-widest">
                Attendance
              </p>
              <h1 className="text-xl font-semibold mt-1">
                Hi, {user?.name || "User"} 👋
              </h1>
              <p className="text-sm text-white/70 mt-1">
                Mark your attendance
              </p>
            </div>

            <div className="bg-white/10 p-3 rounded-xl border border-white/10">
              <Clock3 className="w-5 h-5 text-blue-300" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-black/30 rounded-xl p-3 border border-white/5">
              <p className="text-xs text-white/60">Time</p>
              <p className="text-lg font-semibold">
                {time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>

            <div className="bg-black/30 rounded-xl p-3 border border-white/5">
              <p className="text-xs text-white/60">Date</p>
              <p className="text-sm">
                {time.toLocaleDateString([], {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 mb-5 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-400/20 p-3 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs text-white/60">Last Status</p>
              <p className="font-semibold">
                {loadingToday ? "Loading..." : status ? status.action : "No record yet"}
              </p>
              <p className="text-sm text-white/70">
                {status ? `at ${status.time}` : "First action will appear here"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {actionConfig.map((item) => {
            const Icon = item.icon;
            const isLoading = loadingAction === item.value;
            const isDisabled =
              !!loadingAction || loadingToday || actionState?.[item.value]?.disabled;
            const reason = actionState?.[item.value]?.reason;

            return (
              <button
                key={item.value}
                onClick={() => handleAttendance(item.value)}
                disabled={isDisabled}
                className={`rounded-2xl border p-4 backdrop-blur-xl shadow-lg transition text-left ${
                  isDisabled
                    ? "bg-white/5 border-white/5 opacity-45 cursor-not-allowed"
                    : "bg-white/10 border-white/10 active:scale-95 hover:bg-white/[0.14]"
                }`}
              >
                <div className="mb-3 flex justify-center">
                  {isLoading ? (
                    <Loader2 className="animate-spin w-5 h-5 text-blue-300" />
                  ) : (
                    <Icon className="w-5 h-5 text-blue-300" />
                  )}
                </div>

                <p className="text-sm font-semibold text-center">{item.label}</p>

                <p className="text-[11px] text-white/60 text-center mt-1 min-h-7">
                  {isDisabled && !loadingToday ? reason : "Available"}
                </p>
              </button>
            );
          })}
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 mt-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Today Activity</h2>
            <span className="text-xs text-white/55">
              {todayHistory.length} record{todayHistory.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loadingToday ? (
            <p className="text-sm text-white/60">Loading today’s records...</p>
          ) : todayHistory.length === 0 ? (
            <p className="text-sm text-white/60">No attendance recorded yet.</p>
          ) : (
            <div className="space-y-2">
              {todayHistory.map((item, index) => (
                <div
                  key={`${item?.action || "action"}-${index}`}
                  className="flex items-center justify-between rounded-xl bg-black/25 border border-white/5 px-3 py-2"
                >
                  <span className="text-sm font-medium">
                    {item?.label || formatActionLabel(item?.action)}
                  </span>
                  <span className="text-xs text-white/65">
                    {item?.time || formatTime(item?.createdAt || item?.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 text-center text-sm text-white/80 min-h-6">
          {message || "Tap an action to mark attendance"}
        </div>
      </div>
    </div>
  );
}