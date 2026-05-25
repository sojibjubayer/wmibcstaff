import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  Loader2,
  MessageSquare,
  User2,
} from "lucide-react";

const members = [
  "Neshat",
  "Saiful",
  "Sumaya",
  "Razzak",
  "Sandesh",
  "Nizam",
  "Tarikul",
  "Adil",
];

export default function MeetingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = "https://wmibcstaff-server.vercel.app/api/meetings";

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await fetch(`${API_BASE}/${id}`);
        const data = await res.json();

        if (res.ok) {
          setMeeting(data);
          console.log(data)
        } else {
          console.error(data.message || "Failed to fetch meeting");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, [id]);

  const stats = useMemo(() => {
    const filledCount = members.filter((member) =>
      meeting?.updates?.[member]?.trim()
    ).length;

    return {
      filledCount,
      totalCount: members.length,
      noteExists: !!meeting?.note?.trim(),
    };
  }, [meeting]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-8 text-white">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
          <div className="rounded-3xl border border-white/10 bg-white/4 px-8 py-10 text-center shadow-2xl backdrop-blur">
            <Loader2 className="mx-auto mb-4 animate-spin text-blue-400" size={30} />
            <h2 className="text-lg font-semibold">Loading meeting details</h2>
            <p className="mt-2 text-sm text-slate-400">
              Please wait while the meeting record is loading.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-8 text-white">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
          <div className="rounded-3xl border border-white/10 bg-white/4 px-8 py-10 text-center shadow-2xl backdrop-blur">
            <ClipboardList className="mx-auto mb-4 text-slate-500" size={30} />
            <h2 className="text-lg font-semibold">Meeting not found</h2>
            <p className="mt-2 text-sm text-slate-400">
              The requested meeting record could not be found.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-900 to-slate-800 p-6 shadow-2xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                <ClipboardList size={14} />
                Sales Meeting Details
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Weekly Sales Discussion
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={15} />
                  {new Date(meeting.meetingDate).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs text-slate-400">Members</p>
                <p className="mt-1 text-lg font-semibold">{stats.totalCount}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs text-slate-400">Updated</p>
                <p className="mt-1 text-lg font-semibold">{stats.filledCount}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 col-span-2 sm:col-span-1">
                <p className="text-xs text-slate-400">Note</p>
                <p className="mt-1 text-lg font-semibold">
                  {stats.noteExists ? "Added" : "Empty"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-3xl border border-white/10 bg-white/4 p-5 shadow-xl backdrop-blur sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare className="text-blue-400" size={18} />
            <h2 className="text-lg font-semibold">Meeting Note</h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm leading-7 text-slate-300 whitespace-pre-wrap sm:p-5">
            {meeting.note?.trim() ? meeting.note : "No note added for this meeting."}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/4 p-5 shadow-xl backdrop-blur sm:p-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Member Updates</h2>
              <p className="mt-1 text-sm text-slate-400">
                Individual sales discussion updates for each team member.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
              {stats.filledCount} / {stats.totalCount} completed
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {members.map((member) => {
              const content = meeting.updates?.[member]?.trim();

              return (
                <div
                  key={member}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 transition hover:border-blue-500/30 hover:bg-slate-900"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-xl bg-blue-500/10 p-2 text-blue-400">
                        <User2 size={16} />
                      </div>
                      <p className="text-sm font-semibold text-white">{member}</p>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                        content
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "bg-slate-700/60 text-slate-400"
                      }`}
                    >
                      {content ? "Updated" : "No update"}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-sm leading-7 text-slate-300 whitespace-pre-wrap">
                      {content || "No update submitted for this member."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}