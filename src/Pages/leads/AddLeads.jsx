import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock,
  PhoneCall,
  PlusCircle,
  RefreshCw,
  Search,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";

const API_BASE_URL = "https://wmibcstaff-server.vercel.app";
const API_URL = `${API_BASE_URL}/api/leads`;

const consultants = ["Tarikul", "Adil", "Sandesh", "Nizam", "Sumaiya", "Farhan"];

const statuses = [
  "New",
  "Interested",
  "Busy",
  "No Answer",
  "Switched Off",
  "Wrong Number",
  "Not Interested",
  "Visited",
  "Already Contacted by Another Consultant",
];

export default function AdminLeadsDashboard() {
  const [numbersText, setNumbersText] = useState("");
  const [consultant, setConsultant] = useState("Tarikul");

  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [consultantFilter, setConsultantFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ackFilter, setAckFilter] = useState("all");
  const [searchPhone, setSearchPhone] = useState("");

  const numbers = useMemo(() => {
    return numbersText
      .split(/\n|,|\s+/)
      .map((num) => num.trim())
      .filter(Boolean);
  }, [numbersText]); 

  const fetchDashboard = async () => {
    try {
      setFetching(true);

      const res = await fetch(`${API_URL}/admin-dashboard`); 
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to load dashboard");
        setBatches([]);
        return;
      }

      setBatches(data.batches || []); 
    } catch (error) {
      console.error("Fetch dashboard error:", error);
      alert("Server error while loading dashboard");
      setBatches([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const allPhones = useMemo(() => {
    return batches.flatMap((batch) =>
      (batch.phones || []).map((phone, index) => ({
        ...phone,
        phoneIndex: index,
        batchId: batch._id,
        batchName: batch.batchName,
        assignedTo: batch.assignedTo,
        batchStatus: batch.status,
        batchCreatedAt: batch.createdAt,
      }))
    );
  }, [batches]);

  const today = new Date().toISOString().slice(0, 10);

  const dashboardStats = useMemo(() => {
    const total = allPhones.length;
    const acknowledged = allPhones.filter((lead) => lead.acknowledged).length;
    const unacknowledged = allPhones.filter((lead) => !lead.acknowledged).length;

    const todayFollowups = allPhones.filter(
      (lead) => lead.nextFollowUpDate?.slice(0, 10) === today
    ).length;

    const overdue = allPhones.filter(
      (lead) =>
        lead.nextFollowUpDate && lead.nextFollowUpDate.slice(0, 10) < today
    ).length;

    const assignedToday = allPhones.filter(
      (lead) => lead.batchCreatedAt?.slice(0, 10) === today
    ).length;

    return {
      total,
      acknowledged,
      unacknowledged,
      todayFollowups,
      overdue,
      assignedToday,
    };
  }, [allPhones, today]);

  const consultantStats = useMemo(() => {
    return consultants.map((name) => {
      const list = allPhones.filter((lead) => lead.assignedTo === name);

      return {
        name,
        total: list.length,
        acknowledged: list.filter((lead) => lead.acknowledged).length,
        unacknowledged: list.filter((lead) => !lead.acknowledged).length,
        todayFollowups: list.filter(
          (lead) => lead.nextFollowUpDate?.slice(0, 10) === today
        ).length,
        overdue: list.filter(
          (lead) =>
            lead.nextFollowUpDate && lead.nextFollowUpDate.slice(0, 10) < today
        ).length,
        assignedToday: list.filter(
          (lead) => lead.batchCreatedAt?.slice(0, 10) === today
        ).length,
      };
    });
  }, [allPhones, today]);

  const filteredPhones = useMemo(() => {
    return allPhones.filter((lead) => {
      const phone = String(lead.number || "");

      const matchesConsultant =
        consultantFilter === "all" || lead.assignedTo === consultantFilter;

      const matchesStatus =
        statusFilter === "all" ||
        String(lead.status || "New").toLowerCase() === statusFilter;

      const matchesAck =
        ackFilter === "all" ||
        (ackFilter === "acknowledged" && lead.acknowledged) ||
        (ackFilter === "unacknowledged" && !lead.acknowledged);

      const matchesSearch =
        !searchPhone.trim() || phone.includes(searchPhone.trim());

      return matchesConsultant && matchesStatus && matchesAck && matchesSearch;
    });
  }, [allPhones, consultantFilter, statusFilter, ackFilter, searchPhone]);

  const addNumbers = async () => {
    if (!consultant) {
      alert("Please select a consultant");
      return;
    }

    if (numbers.length === 0) {
      alert("Please enter phone numbers");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numbers,
          assignedTo: consultant,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add leads");
        return;
      }

      alert(data.message || `${numbers.length} leads added successfully`);
      setNumbersText("");
      setConsultant("Tarikul");
      fetchDashboard();
    } catch (error) {
      console.error("Add leads error:", error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="overflow-hidden rounded-3xl bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-white shadow-xl">
          <div className="p-5 sm:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-black uppercase tracking-widest text-cyan-200">
                  Admin Panel
                </p>

                <h1 className="mt-3 text-3xl font-black sm:text-4xl">
                  Lead Management Dashboard
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-slate-300">
                  Add leads, assign consultants, monitor acknowledgements,
                  follow-ups, and overdue leads.
                </p>
              </div>

              <button
                onClick={fetchDashboard}
                disabled={fetching}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-900 shadow-lg transition hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  className={`h-4 w-4 ${fetching ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              <DashboardCard
                title="Total Leads"
                value={dashboardStats.total}
                icon={<PhoneCall className="h-5 w-5" />}
              />

              <DashboardCard
                title="Assigned Today"
                value={dashboardStats.assignedToday}
                icon={<CalendarDays className="h-5 w-5" />}
                amber
              />

              <DashboardCard
                title="Acknowledged"
                value={dashboardStats.acknowledged}
                icon={<CheckCircle2 className="h-5 w-5" />}
                green
              />

              <DashboardCard
                title="Unacknowledged"
                value={dashboardStats.unacknowledged}
                icon={<XCircle className="h-5 w-5" />}
                red
              />

              <DashboardCard
                title="Today Follow-ups"
                value={dashboardStats.todayFollowups}
                icon={<Clock className="h-5 w-5" />}
                amber
              />

              <DashboardCard
                title="Overdue"
                value={dashboardStats.overdue}
                icon={<Clock className="h-5 w-5" />}
                red
              />
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-100 p-3 text-blue-700">
                <PlusCircle className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Add / Assign Leads
                </h2>
                <p className="text-sm text-slate-500">
                  Paste phone numbers and assign them directly.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-black text-slate-700">
                Select Consultant
              </label>

              <select
                value={consultant}
                onChange={(e) => setConsultant(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                {consultants.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-black text-slate-700">
                Phone Numbers
              </label>

              <textarea
                rows={12}
                value={numbersText}
                onChange={(e) => setNumbersText(e.target.value)}
                placeholder={`01712345678
01812345678
01912345678

or comma/space separated`}
                className="w-full resize-none rounded-2xl border border-slate-300 p-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              <p className="mt-2 text-xs font-semibold text-slate-500">
                Total numbers:{" "}
                <span className="font-black text-slate-900">
                  {numbers.length}
                </span>{" "}
                | Assigned to:{" "}
                <span className="font-black text-blue-700">{consultant}</span>
              </p>
            </div>

            <button
              onClick={addNumbers}
              disabled={loading}
              className="mt-5 w-full rounded-2xl bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? "Adding Leads..." : "Add Leads"}
            </button>
          </section>

          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                <Users className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Consultant Wise Summary
                </h2>
                <p className="text-sm text-slate-500">
                  See who has how many assigned, acknowledged and unacknowledged
                  leads.
                </p>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Consultant</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Today</th>
                    <th className="px-4 py-3">Ack</th>
                    <th className="px-4 py-3">Unack</th>
                    <th className="px-4 py-3">Follow-up</th>
                    <th className="px-4 py-3">Overdue</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {consultantStats.map((item) => (
                    <tr key={item.name} className="hover:bg-slate-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-black text-blue-700">
                            {item.name.charAt(0)}
                          </div>

                          <span className="font-black text-slate-900">
                            {item.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4 font-black text-slate-900">
                        {item.total}
                      </td>

                      <td className="px-4 py-4 font-black text-blue-700">
                        {item.assignedToday}
                      </td>

                      <td className="px-4 py-4">
                        <Badge green>{item.acknowledged}</Badge>
                      </td>

                      <td className="px-4 py-4">
                        <Badge red>{item.unacknowledged}</Badge>
                      </td>

                      <td className="px-4 py-4">
                        <Badge amber>{item.todayFollowups}</Badge>
                      </td>

                      <td className="px-4 py-4">
                        <Badge red>{item.overdue}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
              <BarChart3 className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">
                Recent Batches
              </h2>
              <p className="text-sm text-slate-500">
                Latest lead batches from database.
              </p>
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">Batch</th>
                  <th className="px-4 py-3">Assigned To</th>
                  <th className="px-4 py-3">Numbers</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {batches.slice(0, 10).map((batch) => (
                  <tr key={batch._id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-black text-slate-900">
                      {batch.batchName || "Lead Batch"}
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {batch.assignedTo}
                    </td>

                    <td className="px-4 py-4 font-black text-blue-700">
                      {batch.totalNumbers || batch.phones?.length || 0}
                    </td>

                    <td className="px-4 py-4">
                      <Badge>{batch.status || "New"}</Badge>
                    </td>

                    <td className="px-4 py-4 text-slate-500">
                      {batch.createdAt
                        ? new Date(batch.createdAt).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))}

                {!fetching && batches.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-sm font-black text-slate-500"
                    >
                      No batches found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section> 

        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Lead Monitoring
              </h2>
              <p className="text-sm text-slate-500">
                Filter leads by consultant, status, acknowledgement and phone
                number.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  placeholder="Search phone..."
                  className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm font-bold outline-none focus:border-blue-500"
                />
              </div>

              <select
                value={consultantFilter}
                onChange={(e) => setConsultantFilter(e.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold outline-none focus:border-blue-500"
              >
                <option value="all">All Consultants</option>
                {consultants.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold outline-none focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status.toLowerCase()}>
                    {status}
                  </option>
                ))}
              </select>

              <select
                value={ackFilter}
                onChange={(e) => setAckFilter(e.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold outline-none focus:border-blue-500"
              >
                <option value="all">All Acknowledgement</option>
                <option value="acknowledged">Acknowledged</option>
                <option value="unacknowledged">Unacknowledged</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate-500">
              Showing{" "}
              <span className="font-black text-slate-900">
                {filteredPhones.length}
              </span>{" "}
              leads
            </p>

            <button
              onClick={() => {
                setConsultantFilter("all");
                setStatusFilter("all");
                setAckFilter("all");
                setSearchPhone("");
              }}
              className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-black text-white hover:bg-slate-800"
            >
              Reset Filters
            </button>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-250 text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Consultant</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Acknowledgement</th>
                    <th className="px-4 py-3">Follow-up</th>
                    <th className="px-4 py-3">Batch</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredPhones.slice(0, 100).map((lead) => (
                    <tr
                      key={`${lead.batchId}-${lead.phoneIndex}`}
                      className="hover:bg-slate-50"
                    >
                      <td className="px-4 py-4 font-black text-slate-900">
                        {lead.number}
                      </td>

                      <td className="px-4 py-4">
                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                          <UserCheck className="h-3.5 w-3.5" />
                          {lead.assignedTo}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <Badge>{lead.status || "New"}</Badge>
                      </td>

                      <td className="px-4 py-4">
                        {lead.acknowledged ? (
                          <Badge green>Acknowledged</Badge>
                        ) : (
                          <Badge red>Unacknowledged</Badge>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <FollowUpBadge date={lead.nextFollowUpDate} />
                      </td>

                      <td className="px-4 py-4 text-slate-500">
                        {lead.batchName || "Lead Batch"}
                      </td>
                    </tr>
                  ))}

                  {!fetching && filteredPhones.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-10 text-center text-sm font-black text-slate-500"
                      >
                        No leads found.
                      </td>
                    </tr>
                  )}

                  {fetching && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-10 text-center text-sm font-black text-blue-600"
                      >
                        Loading dashboard...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {filteredPhones.length > 100 && (
            <p className="mt-3 text-xs font-semibold text-slate-500">
              Showing first 100 leads only. Use filters to narrow results.
            </p>
          )}
        </section>

      
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon, green, red, amber }) {
  return (
    <div
      className={`rounded-2xl border p-4 backdrop-blur ${
        green
          ? "border-green-300/30 bg-green-500/15"
          : red
            ? "border-red-300/30 bg-red-500/15"
            : amber
              ? "border-amber-300/30 bg-amber-500/15"
              : "border-white/10 bg-white/10"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold text-slate-300">{title}</p>
        <div className="text-white/80">{icon}</div>
      </div>

      <h3
        className={`mt-2 text-3xl font-black ${
          green
            ? "text-green-300"
            : red
              ? "text-red-300"
              : amber
                ? "text-amber-300"
                : "text-white"
        }`}
      >
        {value}
      </h3>
    </div>
  );
}

function Badge({ children, green, red, amber }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${
        green
          ? "bg-green-100 text-green-700"
          : red
            ? "bg-red-100 text-red-700"
            : amber
              ? "bg-amber-100 text-amber-700"
              : "bg-blue-100 text-blue-700"
      }`}
    >
      {children}
    </span>
  );
}

function FollowUpBadge({ date }) {
  if (!date) {
    return <Badge>No Follow-up</Badge>;
  }

  const cleanDate = date.slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);

  if (cleanDate === today) {
    return <Badge amber>Due Today</Badge>;
  }

  if (cleanDate < today) {
    return <Badge red>Overdue</Badge>;
  }

  return <Badge green>{formatDate(cleanDate)}</Badge>;
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
}