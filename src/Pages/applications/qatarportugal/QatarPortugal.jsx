import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeftRight,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  FilePlus2,
  FileText,
  Globe2,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const fromCountry = "qatar";
const destinationCountry = "portugal";
const readableFrom = "Qatar";
const readableDestination = "Portugal";

const defaultChecklist = [
  "D1 checklist / Residence Visa for a Subordinate Work Activity checklist",
  "National Visa application form filled and signed",
  "2 passport-size photos",
  "Original passport",
  "Passport bio-page copy",
  "Qatar ID / Residence Permit copy",
  "Work contract / work promise / employer interest letter",
  "Proof of financial resources / responsibility letter",
  "Flight reservation",
  "Valid travel insurance",
  "Police clearance certificate",
  "SEF/AIMA authorization form",
  "Professional certificate, if applicable",
];

const applicationForm = {
  title: "Portugal National Visa Application Form",
  url: "https://www.vfsglobal.com/one-pager/portugal/qatar/english/index.html",
  note: "Open VFS Portugal Qatar page, choose D-Visa / National Visa, then download the National Visa application form.",
};

const emptyClientForm = {
  name: "",
  mobile: "",
  nationality: "",
  email: "",
  passportNumber: "",
  qidNumber: "",
  visaType: "Portugal D1 Work Visa",

  currentOccupation: "",
  currentJobTitle: "",
  currentEmployerName: "",
  currentEmployerPhone: "",
  currentEmployerAddress: "",
  currentWorkStartDate: "",
  currentSalary: "",
  qidExpiryDate: "",

  notes: "",
};

export default function QatarPortugal() {
  const [checklist, setChecklist] = useState(defaultChecklist);
  const [newDoc, setNewDoc] = useState("");
  const [editingDocIndex, setEditingDocIndex] = useState(null);

  const [clients, setClients] = useState([]);
  const [clientForm, setClientForm] = useState(emptyClientForm);

  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [editingClientId, setEditingClientId] = useState(null);

  const [search, setSearch] = useState("");
  const [loadingClients, setLoadingClients] = useState(false);
  const [savingClient, setSavingClient] = useState(false);

  const fetchClients = async () => {
    try {
      setLoadingClients(true);

      const res = await fetch(
        `${API_URL}/api/application-clients?fromCountry=${fromCountry}&destinationCountry=${destinationCountry}`
      );

      const data = await res.json();
      setClients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch clients error:", error);
      setClients([]);
    } finally {
      setLoadingClients(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return clients;

    return clients.filter((client) => {
      return (
        client.name?.toLowerCase().includes(value) ||
        client.mobile?.toLowerCase().includes(value) ||
        client.nationality?.toLowerCase().includes(value) ||
        client.passportNumber?.toLowerCase().includes(value) ||
        client.qidNumber?.toLowerCase().includes(value) ||
        client.currentEmployerName?.toLowerCase().includes(value)
      );
    });
  }, [clients, search]);

  const handleAddOrUpdateDoc = () => {
    if (!newDoc.trim()) return;

    if (editingDocIndex !== null) {
      setChecklist((prev) =>
        prev.map((item, index) =>
          index === editingDocIndex ? newDoc.trim() : item
        )
      );
      setEditingDocIndex(null);
    } else {
      setChecklist((prev) => [...prev, newDoc.trim()]);
    }

    setNewDoc("");
  };

  const handleEditDoc = (index) => {
    setNewDoc(checklist[index]);
    setEditingDocIndex(index);
  };

  const handleDeleteDoc = (index) => {
    const confirmDelete = window.confirm("Delete this checklist item?");
    if (!confirmDelete) return;

    setChecklist((prev) => prev.filter((_, i) => i !== index));

    if (editingDocIndex === index) {
      setEditingDocIndex(null);
      setNewDoc("");
    }
  };

  const handleCancelDocEdit = () => {
    setEditingDocIndex(null);
    setNewDoc("");
  };

  const handleClientChange = (e) => {
    const { name, value } = e.target;

    setClientForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenClientModal = () => {
    setClientForm(emptyClientForm);
    setEditingClientId(null);
    setShowClientModal(true);
  };

  const handleCloseClientModal = () => {
    setClientForm(emptyClientForm);
    setEditingClientId(null);
    setShowClientModal(false);
  };

  const handleEditClient = (client) => {
    setClientForm({
      name: client.name || "",
      mobile: client.mobile || "",
      nationality: client.nationality || "",
      email: client.email || "",
      passportNumber: client.passportNumber || "",
      qidNumber: client.qidNumber || "",
      visaType: client.visaType || "Portugal D1 Work Visa",

      currentOccupation: client.currentOccupation || "",
      currentJobTitle: client.currentJobTitle || "",
      currentEmployerName: client.currentEmployerName || "",
      currentEmployerPhone: client.currentEmployerPhone || "",
      currentEmployerAddress: client.currentEmployerAddress || "",
      currentWorkStartDate: client.currentWorkStartDate || "",
      currentSalary: client.currentSalary || "",
      qidExpiryDate: client.qidExpiryDate || "",

      notes: client.notes || "",
    });

    setEditingClientId(client._id);
    setSelectedClient(null);
    setShowClientModal(true);
  };

  const handleSaveClient = async (e) => {
    e.preventDefault();

    if (!clientForm.name.trim() || !clientForm.mobile.trim()) {
      alert("Client name and mobile number are required");
      return;
    }

    const payload = {
      name: clientForm.name.trim(),
      mobile: clientForm.mobile.trim(),
      nationality: clientForm.nationality.trim(),
      email: clientForm.email.trim(),
      passportNumber: clientForm.passportNumber.trim(),
      qidNumber: clientForm.qidNumber.trim(),
      visaType: clientForm.visaType.trim(),

      currentOccupation: clientForm.currentOccupation.trim(),
      currentJobTitle: clientForm.currentJobTitle.trim(),
      currentEmployerName: clientForm.currentEmployerName.trim(),
      currentEmployerPhone: clientForm.currentEmployerPhone.trim(),
      currentEmployerAddress: clientForm.currentEmployerAddress.trim(),
      currentWorkStartDate: clientForm.currentWorkStartDate.trim(),
      currentSalary: clientForm.currentSalary.trim(),
      qidExpiryDate: clientForm.qidExpiryDate.trim(),

      notes: clientForm.notes.trim(),
      fromCountry,
      destinationCountry,
      route: `${readableFrom} to ${readableDestination}`,
    };

    try {
      setSavingClient(true);

      const url = editingClientId
        ? `${API_URL}/api/application-clients/${editingClientId}`
        : `${API_URL}/api/application-clients`;

      const method = editingClientId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to save client");
        return;
      }

      setClientForm(emptyClientForm);
      setEditingClientId(null);
      setShowClientModal(false);
      fetchClients();
    } catch (error) {
      console.error("Save client error:", error);
      alert("Failed to save client");
    } finally {
      setSavingClient(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-3 py-4 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <section className="overflow-hidden rounded-3xl bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 p-5 text-white shadow-xl shadow-slate-900/10 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">
                <Globe2 className="h-4 w-4" />
                Application Route
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {readableFrom} to {readableDestination}
              </h1>

              <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-blue-100 sm:text-base">
                <span>{readableFrom}</span>
                <ArrowLeftRight className="h-4 w-4" />
                <span>{readableDestination}</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
                  D1 Work Visa
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenClientModal}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              <UserPlus className="h-5 w-5" />
              Collect Client Info
            </button>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[430px_1fr]">
          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-950">
                  <ClipboardList className="h-5 w-5 text-blue-600" />
                  Document Checklist
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add, update, or remove checklist items.
                </p>
              </div>

              <div className="mb-4 space-y-2">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    value={newDoc}
                    onChange={(e) => setNewDoc(e.target.value)}
                    placeholder="Add document name"
                    className="min-w-0 flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={handleAddOrUpdateDoc}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    {editingDocIndex !== null ? (
                      <Pencil className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                    {editingDocIndex !== null ? "Update" : "Add"}
                  </button>
                </div>

                {editingDocIndex !== null && (
                  <button
                    type="button"
                    onClick={handleCancelDocEdit}
                    className="text-xs font-bold text-slate-500 hover:text-red-600"
                  >
                    Cancel editing
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {checklist.map((doc, index) => (
                  <div
                    key={`${doc}-${index}`}
                    className="flex items-start gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

                    <p className="min-w-0 flex-1 text-sm font-semibold leading-5 text-slate-800">
                      {index + 1}. {doc}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleEditDoc(index)}
                      className="rounded-xl bg-blue-50 p-2 text-blue-700 transition hover:bg-blue-100"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteDoc(index)}
                      className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-950">
                <FileText className="h-5 w-5 text-blue-600" />
                Application Form
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Official form link for Portugal National Visa application.
              </p>

              <a
                href={applicationForm.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                <ExternalLink className="h-5 w-5" />
                Open Form Link
              </a>

              <div className="mt-4 rounded-2xl bg-blue-50 p-4">
                <p className="text-sm font-bold text-blue-800">
                  {applicationForm.title}
                </p>
                <p className="mt-1 text-xs leading-5 text-blue-700">
                  {applicationForm.note}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold text-slate-950">
                    <Users className="h-5 w-5 text-blue-600" />
                    Client Info
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Search by name, mobile, nationality, passport, QID, or
                    employer.
                  </p>
                </div>

                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search client..."
                    className="w-full rounded-2xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 md:w-72"
                  />
                </div>
              </div>
            </div>

            {loadingClients ? (
              <div className="flex min-h-64 items-center justify-center rounded-3xl border border-slate-200 bg-white">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : filteredClients.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-blue-200 bg-white p-10 text-center">
                <FilePlus2 className="mx-auto h-12 w-12 text-blue-500" />
                <h3 className="mt-4 text-lg font-bold text-slate-950">
                  No client info found
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Add client information using the Collect Client Info button.
                </p>
              </div>
            ) : (
              <div className="grid gap-3">
                {filteredClients.map((client, index) => (
                  <article
                    key={client._id || index}
                    className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/70"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-slate-950">
                          {client.name || "Unnamed Client"}
                        </h3>

                        <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                            {client.mobile || "Mobile N/A"}
                          </span>

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                            {client.nationality || "Nationality N/A"}
                          </span>

                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                            {client.visaType || "Portugal D1 Work Visa"}
                          </span>
                        </div>

                        {client.currentEmployerName && (
                          <p className="mt-2 text-sm text-slate-500">
                            Employer:{" "}
                            <span className="font-semibold text-slate-700">
                              {client.currentEmployerName}
                            </span>
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedClient(client)}
                        className="group inline-flex items-center justify-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-600 hover:text-white hover:shadow-md"
                      >
                        View
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-blue-700 transition group-hover:bg-blue-500 group-hover:text-white">
                          →
                        </span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {showClientModal && (
        <Modal
          title={editingClientId ? "Update Client Info" : "Collect Client Info"}
          onClose={handleCloseClientModal}
        >
          <form onSubmit={handleSaveClient} className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-4">
              <h3 className="text-base font-bold text-slate-950">
                Personal Information
              </h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Input
                  label="Client Name"
                  name="name"
                  value={clientForm.name}
                  onChange={handleClientChange}
                  required
                />

                <Input
                  label="Mobile"
                  name="mobile"
                  value={clientForm.mobile}
                  onChange={handleClientChange}
                  required
                />

                <Input
                  label="Nationality"
                  name="nationality"
                  value={clientForm.nationality}
                  onChange={handleClientChange}
                />

                <Input
                  label="Email"
                  name="email"
                  value={clientForm.email}
                  onChange={handleClientChange}
                />

                <Input
                  label="Passport Number"
                  name="passportNumber"
                  value={clientForm.passportNumber}
                  onChange={handleClientChange}
                />

                <Input
                  label="QID / ID Number"
                  name="qidNumber"
                  value={clientForm.qidNumber}
                  onChange={handleClientChange}
                />

                <Input
                  label="QID / RP Expiry Date"
                  name="qidExpiryDate"
                  type="date"
                  value={clientForm.qidExpiryDate}
                  onChange={handleClientChange}
                />

                <Input
                  label="Visa Type"
                  name="visaType"
                  value={clientForm.visaType}
                  onChange={handleClientChange}
                  placeholder="Portugal D1 Work Visa"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-base font-bold text-slate-950">
                Current Employment Information
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Information normally needed for visa forms and applicant profile
                review.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Input
                  label="Current Occupation"
                  name="currentOccupation"
                  value={clientForm.currentOccupation}
                  onChange={handleClientChange}
                  placeholder="Sales Executive"
                />

                <Input
                  label="Current Job Title"
                  name="currentJobTitle"
                  value={clientForm.currentJobTitle}
                  onChange={handleClientChange}
                  placeholder="Document Controller"
                />

                <Input
                  label="Current Employer Name"
                  name="currentEmployerName"
                  value={clientForm.currentEmployerName}
                  onChange={handleClientChange}
                  placeholder="Company name in Qatar"
                />

                <Input
                  label="Employer Phone"
                  name="currentEmployerPhone"
                  value={clientForm.currentEmployerPhone}
                  onChange={handleClientChange}
                  placeholder="+974..."
                />

                <Input
                  label="Work Start Date"
                  name="currentWorkStartDate"
                  type="date"
                  value={clientForm.currentWorkStartDate}
                  onChange={handleClientChange}
                />

                <Input
                  label="Current Salary"
                  name="currentSalary"
                  value={clientForm.currentSalary}
                  onChange={handleClientChange}
                  placeholder="QAR 2500"
                />
              </div>

              <div className="mt-3">
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Employer Address
                </label>

                <textarea
                  name="currentEmployerAddress"
                  value={clientForm.currentEmployerAddress}
                  onChange={handleClientChange}
                  rows="3"
                  placeholder="Full employer/company address in Qatar"
                  className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Details / Notes
              </label>

              <textarea
                name="notes"
                value={clientForm.notes}
                onChange={handleClientChange}
                rows="4"
                placeholder="Client document status, pending docs, special notes..."
                className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={savingClient}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {savingClient ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  {editingClientId ? (
                    <Pencil className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                  {editingClientId ? "Update Client Info" : "Save Client Info"}
                </>
              )}
            </button>
          </form>
        </Modal>
      )}

      {selectedClient && (
        <Modal title="Client Profile" onClose={() => setSelectedClient(null)}>
          <div className="space-y-5">
            <div className="rounded-3xl bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 p-5 text-white">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">
                    {selectedClient.route || "Qatar to Portugal"}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    {selectedClient.name || "N/A"}
                  </h3>

                  <p className="mt-1 text-sm text-blue-100">
                    {selectedClient.visaType || "Portugal D1 Work Visa"}
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                  <div className="rounded-2xl bg-white/10 px-4 py-3 sm:text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                      Mobile
                    </p>
                    <p className="mt-1 text-sm font-bold">
                      {selectedClient.mobile || "N/A"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleEditClient(selectedClient)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit / Update
                  </button>
                </div>
              </div>
            </div>

            <InfoGroup title="Personal Information">
              <CompactDetail
                label="Nationality"
                value={selectedClient.nationality}
              />
              <CompactDetail label="Email" value={selectedClient.email} />
              <CompactDetail
                label="Passport No."
                value={selectedClient.passportNumber}
              />
              <CompactDetail
                label="QID / ID No."
                value={selectedClient.qidNumber}
              />
              <CompactDetail
                label="QID / RP Expiry"
                value={selectedClient.qidExpiryDate}
              />
              <CompactDetail label="Route" value={selectedClient.route} />
            </InfoGroup>

            <InfoGroup title="Current Employment">
              <CompactDetail
                label="Occupation"
                value={selectedClient.currentOccupation}
              />
              <CompactDetail
                label="Job Title"
                value={selectedClient.currentJobTitle}
              />
              <CompactDetail
                label="Employer"
                value={selectedClient.currentEmployerName}
              />
              <CompactDetail
                label="Employer Phone"
                value={selectedClient.currentEmployerPhone}
              />
              <CompactDetail
                label="Work Start Date"
                value={selectedClient.currentWorkStartDate}
              />
              <CompactDetail
                label="Current Salary"
                value={selectedClient.currentSalary}
              />
            </InfoGroup>

            {selectedClient.currentEmployerAddress && (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Employer Address
                </p>

                <p className="mt-2 whitespace-pre-wrap text-sm font-semibold leading-6 text-slate-700">
                  {selectedClient.currentEmployerAddress}
                </p>
              </div>
            )}

            {selectedClient.notes && (
              <div className="rounded-3xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-500">
                  Notes
                </p>

                <p className="mt-2 whitespace-pre-wrap text-sm font-medium leading-6 text-blue-900">
                  {selectedClient.notes}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </main>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-4 shadow-2xl sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-950">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

function Input({ label, required, ...props }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        {...props}
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </div>
  );
}

function InfoGroup({ title, children }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4">
      <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
        {title}
      </h4>

      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function CompactDetail({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 wrap-break-words text-sm font-semibold text-slate-800">
        {value || "N/A"}
      </p>
    </div>
  );
}