import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/leads";

const consultants = ["Siam", "Rafi", "Hasan", "Karim"];

export default function Leads() {
  const [user, setUser] = useState("Siam");
  const [leads, setLeads] = useState([]);
  const [file, setFile] = useState(null);
  const [assignTo, setAssignTo] = useState("Rafi");
  const [quantity, setQuantity] = useState("");

  const isAdmin = user === "Siam";

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${API_URL}?user=${user}`);
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [user]);

  const uploadExcel = async () => {
    if (!file) return alert("Please select Excel file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploadedBy", "Siam");

    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.message || "Uploaded successfully");
      setFile(null);
      fetchLeads();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const distributeLeads = async () => {
    if (!assignTo || !quantity) return alert("Select consultant and quantity");

    try {
      const res = await fetch(`${API_URL}/distribute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          consultant: assignTo,
          quantity: Number(quantity),
        }),
      });

      const data = await res.json();
      alert(data.message || "Distributed successfully");
      setQuantity("");
      fetchLeads();
    } catch (err) {
      console.error(err);
      alert("Distribution failed");
    }
  };

  const updateLead = async (id, status, note) => {
    try {
      await fetch(`${API_URL}/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          note,
        }),
      });

      fetchLeads();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const totalLeads = leads.length;
  const unassignedLeads = leads.filter((lead) => !lead.assignedTo).length;

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-2xl bg-white p-5 shadow">
          <h1 className="text-2xl font-bold text-slate-900">Leads Management</h1>
          <p className="mt-1 text-sm text-slate-500">
            Upload, distribute, and update lead status.
          </p>

          <div className="mt-4 max-w-xs">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Login As
            </label>
            <select
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
            >
              {consultants.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isAdmin && (
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow">
              <p className="text-sm text-slate-500">Total Leads</p>
              <h2 className="mt-2 text-3xl font-bold">{totalLeads}</h2>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow">
              <p className="text-sm text-slate-500">Unassigned Leads</p>
              <h2 className="mt-2 text-3xl font-bold">{unassignedLeads}</h2>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow">
              <p className="text-sm text-slate-500">Current User</p>
              <h2 className="mt-2 text-3xl font-bold">{user}</h2>
            </div>
          </div>
        )}

        {isAdmin && (
          <div className="mb-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 shadow">
              <h2 className="mb-4 text-lg font-semibold">Upload Excel</h2>

              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full rounded-xl border border-slate-300 p-3"
              />

              <button
                onClick={uploadExcel}
                className="mt-4 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
              >
                Upload Numbers
              </button>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow">
              <h2 className="mb-4 text-lg font-semibold">Distribute Leads</h2>

              <div className="grid gap-3 sm:grid-cols-2">
                <select
                  value={assignTo}
                  onChange={(e) => setAssignTo(e.target.value)}
                  className="rounded-xl border border-slate-300 px-4 py-2"
                >
                  {consultants
                    .filter((name) => name !== "Siam")
                    .map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                </select>

                <input
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="rounded-xl border border-slate-300 px-4 py-2"
                />
              </div>

              <button
                onClick={distributeLeads}
                className="mt-4 rounded-xl bg-emerald-600 px-5 py-2.5 font-semibold text-white hover:bg-emerald-700"
              >
                Distribute
              </button>
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-2xl bg-white shadow">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-lg font-semibold">
              {isAdmin ? "All Leads" : `${user}'s Leads`}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Assigned To</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Note</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-slate-500">
                      No leads found
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <LeadRow
                      key={lead._id}
                      lead={lead}
                      isAdmin={isAdmin}
                      onUpdate={updateLead}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadRow({ lead, isAdmin, onUpdate }) {
  const [status, setStatus] = useState(lead.status || "new");
  const [note, setNote] = useState(lead.note || "");

  const phone = lead.phone;

  return (
    <tr className="border-b border-slate-100">
      <td className="px-4 py-3 font-medium text-slate-900">
        <div>{phone}</div>

        <div className="mt-2 flex gap-2">
          <a
            href={`tel:${phone}`}
            className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
          >
            Call
          </a>

          <a
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
          >
            WhatsApp
          </a>
        </div>
      </td>

      <td className="px-4 py-3">{lead.assignedTo || "Unassigned"}</td>

      <td className="px-4 py-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={isAdmin}
          className="rounded-lg border border-slate-300 px-3 py-2"
        >
          <option value="new">New</option>
          <option value="interested">Interested</option>
          <option value="not_interested">Not Interested</option>
          <option value="not_reachable">Not Reachable</option>
          <option value="follow_up">Follow Up</option>
          <option value="converted">Converted</option>
          <option value="wrong_number">Wrong Number</option>
        </select>
      </td>

      <td className="px-4 py-3">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={isAdmin}
          placeholder="Write note..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </td>

      <td className="px-4 py-3">
        {!isAdmin ? (
          <button
            onClick={() => onUpdate(lead._id, status, note)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          >
            Save
          </button>
        ) : (
          <span className="text-xs text-slate-400">Admin view</span>
        )}
      </td>
    </tr>
  );
}