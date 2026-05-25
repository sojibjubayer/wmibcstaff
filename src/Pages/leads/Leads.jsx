import React, { useEffect, useMemo, useState } from "react";

const today = new Date().toISOString().slice(0, 10);
const API_URL = "https://wmibcstaff-server.vercel.app/api/leads";

const getWeekRangeTillSaturday = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDay(); // Sunday = 0, Saturday = 6

  const start = new Date(date);
  start.setDate(date.getDate() - day);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
};

export default function Leads() {
  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  };

  const loggedInUser = getUser();

  const userName =
    loggedInUser?.name ||
    loggedInUser?.userName ||
    loggedInUser?.fullName ||
    "Unknown User";

  const [entries, setEntries] = useState([]);
  const [weeklyEntries, setWeeklyEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    date: today,
    totalLeads: "",
    notInterested: "",
    notReachable: "",
    expectedVisitorBySaturday: "",
  });

  const interested = Math.max(
    Number(form.totalLeads || 0) -
      Number(form.notInterested || 0) -
      Number(form.notReachable || 0),
    0
  );

  const fetchData = async () => {
    try {
      setLoading(true);

      // Important: no date query here.
      // This will fetch all previous saved data.
      const res = await fetch(API_URL);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch data");

      const sortedData = Array.isArray(data)
        ? [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
        : [];

      setEntries(sortedData);
    } catch (err) {
      console.error("Failed to fetch lead summary", err);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeeklyData = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch weekly data");

      const { startDate, endDate } = getWeekRangeTillSaturday(form.date);

      const filtered = Array.isArray(data)
        ? data.filter((item) => item.date >= startDate && item.date <= endDate)
        : [];

      setWeeklyEntries(filtered);
    } catch (err) {
      console.error("Failed to fetch weekly visitor data", err);
      setWeeklyEntries([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchWeeklyData();
  }, [form.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.totalLeads) {
      alert("Please enter total leads");
      return;
    }

    const payload = {
      date: form.date,
      userName,
      totalLeads: Number(form.totalLeads || 0),
      notInterested: Number(form.notInterested || 0),
      notReachable: Number(form.notReachable || 0),
      interested,
      expectedVisitorBySaturday: Number(form.expectedVisitorBySaturday || 0),
    };

    try {
      setSaving(true);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const savedData = await res.json();

      if (!res.ok) throw new Error(savedData.message || "Failed to save data");

      await fetchData();
      await fetchWeeklyData();

      setForm((prev) => ({
        ...prev,
        totalLeads: "",
        notInterested: "",
        notReachable: "",
        expectedVisitorBySaturday: "",
      }));
    } catch (err) {
      console.error("Failed to save lead summary", err);
      alert("Failed to save data");
    } finally {
      setSaving(false);
    }
  };

  const totals = useMemo(() => {
    const allDataTotals = entries.reduce(
      (acc, item) => {
        const totalLeads = Number(item.totalLeads || 0);
        const notInterested = Number(item.notInterested || 0);
        const notReachable = Number(item.notReachable || 0);

        acc.totalLeads += totalLeads;
        acc.notInterested += notInterested;
        acc.notReachable += notReachable;

        acc.interested += Math.max(
          Number(item.interested ?? totalLeads - notInterested - notReachable),
          0
        );

        return acc;
      },
      {
        totalLeads: 0,
        notInterested: 0,
        notReachable: 0,
        interested: 0,
      }
    );

    const weeklyVisitorBySaturday = weeklyEntries.reduce((acc, item) => {
      return acc + Number(item.expectedVisitorBySaturday || 0);
    }, 0);

    return {
      ...allDataTotals,
      expectedVisitorBySaturday: weeklyVisitorBySaturday,
    };
  }, [entries, weeklyEntries]);

  const weekRange = getWeekRangeTillSaturday(form.date);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 overflow-hidden rounded-3xl bg-slate-950 shadow-xl">
          <div className="bg-linear-to-r from-slate-950 via-blue-950 to-slate-900 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
              WMIBC Leads
            </p>

            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-black text-white sm:text-4xl">
                  Daily Visitor Query
                </h1>
                <p className="mt-2 text-sm text-slate-300">
                  Track daily leads, interested clients, not reachable clients,
                  and expected visitors by Saturday.
                </p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-7">
            <InputBox label="Date">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="input-style"
              />
            </InputBox>

            <InputBox label="User">
              <input
                value={userName}
                readOnly
                className="input-style bg-slate-100 font-bold text-slate-700"
              />
            </InputBox>

            <InputBox label="Total Leads">
              <input
                type="number"
                name="totalLeads"
                min="0"
                value={form.totalLeads}
                onChange={handleChange}
                placeholder="0"
                className="input-style"
              />
            </InputBox>

            <InputBox label="Not Interested">
              <input
                type="number"
                name="notInterested"
                min="0"
                value={form.notInterested}
                onChange={handleChange}
                placeholder="0"
                className="input-style"
              />
            </InputBox>

            <InputBox label="Not Reachable">
              <input
                type="number"
                name="notReachable"
                min="0"
                value={form.notReachable}
                onChange={handleChange}
                placeholder="0"
                className="input-style"
              />
            </InputBox>

            <InputBox label="Interested">
              <input
                value={interested}
                readOnly
                className="input-style border-emerald-200 bg-emerald-50 font-black text-emerald-700"
              />
            </InputBox>

            <InputBox label="Visitor by Saturday">
              <input
                type="number"
                name="expectedVisitorBySaturday"
                min="0"
                value={form.expectedVisitorBySaturday}
                onChange={handleChange}
                placeholder="0"
                className="input-style"
              />
            </InputBox>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-5 rounded-2xl bg-blue-900 px-6 py-3 font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Daily Query"}
          </button>
        </form>

        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
          <StatCard title="Total Leads" value={totals.totalLeads} />
          <StatCard title="Not Interested" value={totals.notInterested} />
          <StatCard title="Not Reachable" value={totals.notReachable} orange />
          <StatCard title="Interested" value={totals.interested} green />
          <StatCard
            title="Visitor by Saturday"
            value={totals.expectedVisitorBySaturday}
            blue
            note={`${weekRange.startDate} to ${weekRange.endDate}`}
          />
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-black text-slate-900">All Previous Records</h2>
            <p className="text-sm text-slate-500">
              Showing all saved lead data. Visitor by Saturday total is weekly:{" "}
              {weekRange.startDate} to {weekRange.endDate}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-250 text-left">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-4 py-4 text-sm">Date</th>
                  <th className="px-4 py-4 text-sm">User</th>
                  <th className="px-4 py-4 text-sm">Total Leads</th>
                  <th className="px-4 py-4 text-sm">Not Interested</th>
                  <th className="px-4 py-4 text-sm">Not Reachable</th>
                  <th className="px-4 py-4 text-sm">Interested</th>
                  <th className="px-4 py-4 text-sm">Visitor by Saturday</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-10 text-center text-sm font-bold text-slate-400"
                    >
                      Loading data...
                    </td>
                  </tr>
                ) : entries.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-10 text-center text-sm font-bold text-slate-400"
                    >
                      No previous data found.
                    </td>
                  </tr>
                ) : (
                  entries.map((item) => {
                    const itemTotalLeads = Number(item.totalLeads || 0);
                    const itemNotInterested = Number(item.notInterested || 0);
                    const itemNotReachable = Number(item.notReachable || 0);

                    const itemInterested = Math.max(
                      Number(
                        item.interested ??
                          itemTotalLeads - itemNotInterested - itemNotReachable
                      ),
                      0
                    );

                    return (
                      <tr
                        key={item._id}
                        className="border-b border-slate-100 transition hover:bg-slate-50"
                      >
                        <td className="px-4 py-4 text-sm font-bold text-slate-700">
                          {item.date}
                        </td>

                        <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                          {item.userName}
                        </td>

                        <td className="px-4 py-4 text-sm">
                          {itemTotalLeads}
                        </td>

                        <td className="px-4 py-4 text-sm">
                          {itemNotInterested}
                        </td>

                        <td className="px-4 py-4 text-sm font-bold text-orange-600">
                          {itemNotReachable}
                        </td>

                        <td className="px-4 py-4 text-sm font-black text-emerald-600">
                          {itemInterested}
                        </td>

                        <td className="px-4 py-4 text-sm font-black text-blue-700">
                          {item.expectedVisitorBySaturday || 0}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>

              <tfoot className="bg-blue-50">
                <tr>
                  <td className="px-4 py-4 text-sm font-black" colSpan="2">
                    Total All Previous Data
                  </td>

                  <td className="px-4 py-4 text-sm font-black">
                    {totals.totalLeads}
                  </td>

                  <td className="px-4 py-4 text-sm font-black">
                    {totals.notInterested}
                  </td>

                  <td className="px-4 py-4 text-sm font-black text-orange-700">
                    {totals.notReachable}
                  </td>

                  <td className="px-4 py-4 text-sm font-black text-emerald-700">
                    {totals.interested}
                  </td>

                  <td className="px-4 py-4 text-sm font-black text-blue-700">
                    {totals.expectedVisitorBySaturday}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .input-style {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid #e2e8f0;
          padding: 0.65rem 0.85rem;
          outline: none;
        }

        .input-style:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
        }
      `}</style>
    </div>
  );
}

function InputBox({ label, children }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-black text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}

function StatCard({ title, value, green, blue, orange, note }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-slate-500">{title}</p>

      <p
        className={`mt-2 text-3xl font-black ${
          green
            ? "text-emerald-600"
            : blue
            ? "text-blue-700"
            : orange
            ? "text-orange-600"
            : "text-slate-900"
        }`}
      >
        {value}
      </p>

      {note && (
        <p className="mt-1 text-xs font-semibold text-slate-400">{note}</p>
      )}
    </div>
  );
}