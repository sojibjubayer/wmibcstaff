import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, CalendarDays, ClipboardList, RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";

const members = [
  "Neshat",
  "Saiful",
  "Sumaya",
  "Tarikul",
  "Razzak",
  "Sandesh",
  "Nizam",
  "Adil",
];

const createInitialForm = () => {
  const updates = {};
  members.forEach((name) => {
    updates[name] = "";
  });

  return {
    note: "",
    updates,
  };
};

export default function Meeting() {
  const [formData, setFormData] = useState(createInitialForm());
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const API_BASE = "https://wmibcstaff-server.vercel.app/api/meetings";

  const filledUpdatesCount = useMemo(() => {
    return Object.values(formData.updates).filter(
      (value) => value.trim() !== ""
    ).length;
  }, [formData.updates]);

  const handleUpdateChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      updates: {
        ...prev.updates,
        [name]: value,
      },
    }));
  };

  const handleNoteChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      note: value,
    }));
  };

  const fetchMeetings = async ({ silent = false } = {}) => {
    try {
      if (!silent) setFetching(true);

      const res = await fetch(API_BASE);
      const data = await res.json();

      if (res.ok) {
        setMeetings(Array.isArray(data) ? data : []);
      } else {
        toast.error(data.message || "Failed to fetch meetings");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Unable to load meetings");
    } finally {
      if (!silent) setFetching(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasAnyUpdate = Object.values(formData.updates).some(
      (value) => value.trim() !== ""
    );

    if (!hasAnyUpdate && !formData.note.trim()) {
      toast.error("Please enter at least one update or note");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        meetingDate: new Date().toISOString(),
        note: formData.note.trim(),
        updates: Object.fromEntries(
          Object.entries(formData.updates).map(([key, value]) => [
            key,
            value.trim(),
          ])
        ),
      };

      const res = await fetch(API_BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setFormData(createInitialForm());
        toast.success("Meeting submitted successfully");
        fetchMeetings({ silent: true });
      } else {
        toast.error(data.message || "Failed to save meeting");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-900 to-slate-800 p-6 shadow-2xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                <ClipboardList size={14} />
                Weekly Sales Meeting
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Team Discussion Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                Collect sales updates from each member, add meeting notes, and
                review previous discussions in one place.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:w-auto">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs text-slate-400">Members</p>
                <p className="mt-1 text-lg font-semibold">{members.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs text-slate-400">Meetings</p>
                <p className="mt-1 text-lg font-semibold">{meetings.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/4 p-5 shadow-xl backdrop-blur sm:p-6">
            <div className="mb-6 flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Meeting Discussion Form</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Fill in member-wise updates and add an overall note.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                {filledUpdatesCount} / {members.length} updates filled
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                {members.map((member) => (
                  <div
                    key={member}
                    className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 transition hover:border-blue-500/30"
                  >
                    <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-200">
                      <span>{member}</span>
                      <span className="text-xs text-slate-500">
                        {formData.updates[member].length} chars
                      </span>
                    </label>

                    <textarea
                      value={formData.updates[member]}
                      onChange={(e) => handleUpdateChange(member, e.target.value)}
                      rows={4}
                      placeholder={`Enter ${member}'s sales update`}
                      className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-200">
                  <span>Note</span>
                  <span className="text-xs text-slate-500">
                    {formData.note.length} chars
                  </span>
                </label>

                <textarea
                  value={formData.note}
                  onChange={(e) => handleNoteChange(e.target.value)}
                  rows={5}
                  placeholder="Enter overall meeting note"
                  className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Meeting"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(createInitialForm())}
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  Reset Form
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/4 p-5 shadow-xl backdrop-blur sm:p-6">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <h2 className="text-xl font-semibold">Previous Meetings</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Review saved sales meeting records by date.
                </p>
              </div>

              <button
                type="button"
                onClick={() => fetchMeetings()}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-white/10"
              >
                <RefreshCcw size={14} />
                Refresh
              </button>
            </div>

            {fetching ? (
              <div className="flex min-h-55 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-900/40">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Loader2 size={16} className="animate-spin" />
                  Loading meetings...
                </div>
              </div>
            ) : meetings.length === 0 ? (
              <div className="flex min-h-5 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-900/40 px-6 text-center">
                <CalendarDays className="mb-3 text-slate-500" size={28} />
                <p className="text-sm font-medium text-slate-300">
                  No meeting records found
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Submitted meetings will appear here.
                </p>
              </div>
            ) : (
              <div className="max-h-[75vh] space-y-4 overflow-y-auto pr-1">
                {meetings.map((meeting, index) => (
                  <Link
                    key={meeting._id}
                    to={`/meeting-details/${meeting._id}`}
                    className="group block rounded-2xl border border-white/10 bg-slate-900/70 p-4 transition hover:border-blue-500/40 hover:bg-slate-900"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-blue-300/80">
                          Meeting #{meetings.length - index}
                        </p>
                        <h3 className="mt-1 text-base font-semibold text-white">
                          Sales Meeting
                        </h3>
                      </div>

                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                        {new Date(meeting.meetingDate).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm text-slate-400">
                      {meeting.note?.trim()
                        ? meeting.note
                        : "Open details to view member updates and discussion notes."}
                    </p>

                    <div className="mt-4 text-sm font-medium text-blue-400 transition group-hover:text-blue-300">
                      View details →
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}