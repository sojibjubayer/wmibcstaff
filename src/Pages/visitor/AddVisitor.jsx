import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FaUndo,
  FaUserPlus,
  FaClock,
  FaCalendarAlt,
  FaUserTie,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSearch,
  FaPhone,
  FaChevronDown,
  FaTimes,
  FaMapMarkerAlt,
} from "react-icons/fa";

const API_BASE_URL =
  "https://wmibcstaff-server.vercel.app";

const consultationStatuses = [
  "Highly Interested",
  "Interested",
  "Needs Follow-up",
  "Documents Pending",
  "Not Eligible",
];

const nationalities = [
  "Bangladeshi",
  "Pakistani",
  "Indian",
  "Nepali",
  "Filipino",
  "Moroccan",
  "African",
];

const interestedCountries = [
  "Greece",
  "Portugal",
  "Poland",
  "Bulgaria",
  "Croatia",
  "Serbia",
  "Montenegro",
  "North Macedonia",
  "Cyprus",
];

const visaTypes = [
  "Visit",
  "Work",
  "Student",
  "Others",
];

const visitVisaCountries = {
  europe: [
    { name: "France" },
    { name: "Germany" },
    { name: "Italy" },
    { name: "Spain" },
    { name: "Greece" },
    { name: "Netherlands" },
    { name: "Switzerland" },
    { name: "Austria" },
  ],

  other: [
    { name: "USA" },
    { name: "Canada" },
    { name: "Australia" },
    { name: "New Zealand" },
    { name: "United Kingdom" },
    { name: "Turkey" },
  ],
};

function getLocalDateString() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(
    now.getMonth() + 1,
  ).padStart(2, "0");
  const day = String(now.getDate()).padStart(
    2,
    "0",
  );

  return `${year}-${month}-${day}`;
}

function getLocalTimeString() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function createInitialState() {
  return {
    date: getLocalDateString(),
    time: getLocalTimeString(),
    consultant: "",
    name: "",
    mobile: "",
    type: "New Visitor",
    clientOf: "",
    age: "",
    currentAddress: "",
    profession: "",
    visaType: "",
    nationality: "",
    location: "",
    interestedCountry: "",
    paymentTerms: "",
    consultationStatus: "",
    customStatus: "",
    nextFollowupDate: "",
    visitorEnquiry: "",
    visaTypeManual: "",
  };
}

function normalizePhoneNumber(value) {
  return String(value || "").replace(/\D/g, "");
}

function formatToDMY(dateString) {
  if (!dateString) {
    return "";
  }

  const cleanDate = String(dateString).slice(
    0,
    10,
  );

  const parts = cleanDate.split("-");

  if (parts.length !== 3) {
    return cleanDate;
  }

  const [year, month, day] = parts;

  return `${day}-${month}-${year}`;
}

function formatDateTime(value) {
  if (!value) {
    return "Date & time unavailable";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date & time unavailable";
  }

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function getLeadOwner(lead) {
  return (
    lead?.assignedTo ||
    lead?.owner ||
    lead?.consultant ||
    lead?.consultantName ||
    ""
  );
}

function getAssignmentDate(lead) {
  return (
    lead?.assignedAt ||
    lead?.assignmentDate ||
    lead?.createdAt ||
    null
  );
}

function getLeadUniqueId(lead, index = 0) {
  if (!lead) {
    return "";
  }

  return String(
    lead._id ||
      `${lead.batchId || "lead"}-${
        lead.phoneIndex ?? index
      }`,
  );
}

function isSameLead(
  firstLead,
  secondLead,
  firstIndex = 0,
  secondIndex = 0,
) {
  if (!firstLead || !secondLead) {
    return false;
  }

  if (firstLead._id && secondLead._id) {
    return (
      String(firstLead._id) ===
      String(secondLead._id)
    );
  }

  return (
    String(firstLead.batchId || "") ===
      String(secondLead.batchId || "") &&
    Number(
      firstLead.phoneIndex ?? firstIndex,
    ) ===
      Number(
        secondLead.phoneIndex ?? secondIndex,
      )
  );
}

export default function AddVisitor() {
  const [formData, setFormData] = useState(
    createInitialState,
  );

  const [loading, setLoading] = useState(false);

  const [
    isManualCountry,
    setIsManualCountry,
  ] = useState(false);

  const [
    isCustomStatus,
    setIsCustomStatus,
  ] = useState(false);

  const [leadMatches, setLeadMatches] =
    useState([]);

  const [selectedLead, setSelectedLead] =
    useState(null);

  const [searchingLead, setSearchingLead] =
    useState(false);

  const [leadSearchError, setLeadSearchError] =
    useState("");

  const [
    leadSearchComplete,
    setLeadSearchComplete,
  ] = useState(false);

  const [
    showLeadTooltip,
    setShowLeadTooltip,
  ] = useState(false);

  const hiddenPickerRef = useRef(null);
  const leadTooltipRef = useRef(null);
  const leadSearchRequestRef = useRef(0);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      setFormData((previous) => ({
        ...previous,
        date: getLocalDateString(),
        time: getLocalTimeString(),
      }));

      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      setFormData((previous) => ({
        ...previous,

        consultant:
          parsedUser.name ||
          parsedUser.username ||
          parsedUser.userName ||
          "",

        date: getLocalDateString(),
        time: getLocalTimeString(),
      }));
    } catch (error) {
      console.error(
        "Stored user parse error:",
        error,
      );

      setFormData((previous) => ({
        ...previous,
        date: getLocalDateString(),
        time: getLocalTimeString(),
      }));
    }
  }, []);

  useEffect(() => {
    const cleanNumber = normalizePhoneNumber(
      formData.mobile,
    );

    setLeadSearchError("");
    setLeadSearchComplete(false);
    setSelectedLead(null);
    setShowLeadTooltip(false);

    if (cleanNumber.length < 6) {
      leadSearchRequestRef.current += 1;

      setLeadMatches([]);
      setSearchingLead(false);

      return undefined;
    }

    const requestId =
      leadSearchRequestRef.current + 1;

    leadSearchRequestRef.current = requestId;

    const controller = new AbortController();

    const timer = window.setTimeout(async () => {
      try {
        setSearchingLead(true);
        setLeadSearchError("");

        const response = await fetch(
          `${API_BASE_URL}/api/leads/global-search?number=${encodeURIComponent(
            cleanNumber,
          )}`,
          {
            method: "GET",
            signal: controller.signal,
          },
        );

        const data = await response
          .json()
          .catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            data.error ||
              data.message ||
              `Lead search failed with status ${response.status}`,
          );
        }

        if (
          leadSearchRequestRef.current !==
          requestId
        ) {
          return;
        }

        const matches = Array.isArray(data.leads)
          ? data.leads
          : [];

        setLeadMatches(matches);
        setLeadSearchComplete(true);

        if (matches.length === 1) {
          setSelectedLead(matches[0]);
        } else {
          setSelectedLead(null);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error(
          "Lead search error:",
          error,
        );

        if (
          leadSearchRequestRef.current ===
          requestId
        ) {
          setLeadMatches([]);
          setSelectedLead(null);
          setLeadSearchComplete(true);

          setLeadSearchError(
            error.message ||
              "Could not search the leads database",
          );
        }
      } finally {
        if (
          leadSearchRequestRef.current ===
          requestId
        ) {
          setSearchingLead(false);
        }
      }
    }, 500);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [formData.mobile]);

  useEffect(() => {
    if (!showLeadTooltip) {
      return undefined;
    }

    const handleOutsideClick = (event) => {
      if (
        leadTooltipRef.current &&
        !leadTooltipRef.current.contains(
          event.target,
        )
      ) {
        setShowLeadTooltip(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, [showLeadTooltip]);

  const resetLeadSearch = () => {
    leadSearchRequestRef.current += 1;

    setLeadMatches([]);
    setSelectedLead(null);
    setSearchingLead(false);
    setLeadSearchError("");
    setLeadSearchComplete(false);
    setShowLeadTooltip(false);
  };

  const triggerCalendar = () => {
    if (
      hiddenPickerRef.current &&
      typeof hiddenPickerRef.current
        .showPicker === "function"
    ) {
      hiddenPickerRef.current.showPicker();
      return;
    }

    hiddenPickerRef.current?.click();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "type") {
      setFormData((previous) => ({
        ...previous,
        type: value,

        clientOf:
          value === "Client"
            ? previous.clientOf
            : "",
      }));

      return;
    }

    if (name === "mobile") {
      setFormData((previous) => ({
        ...previous,
        mobile: value,
      }));

      return;
    }

    if (
      name === "interestedCountry" &&
      value === "Others"
    ) {
      setIsManualCountry(true);

      setFormData((previous) => ({
        ...previous,
        interestedCountry: "",
      }));

      return;
    }

    if (name === "visaType") {
      setIsManualCountry(false);

      setFormData((previous) => ({
        ...previous,
        visaType: value,
        interestedCountry: "",

        visaTypeManual:
          value === "Others"
            ? previous.visaTypeManual
            : "",
      }));

      return;
    }

    if (name === "consultationStatus") {
      if (value === "CustomStatus") {
        setIsCustomStatus(true);

        setFormData((previous) => ({
          ...previous,
          consultationStatus: "",
        }));
      } else {
        setIsCustomStatus(false);

        setFormData((previous) => ({
          ...previous,
          consultationStatus: value,
          customStatus: "",

          nextFollowupDate:
            value === "Not Eligible"
              ? ""
              : previous.nextFollowupDate,
        }));
      }

      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSelectLead = (lead) => {
    setSelectedLead(lead);
    setShowLeadTooltip(false);

    const consultantName =
      getLeadOwner(lead) ||
      "Unknown consultant";

    toast.success(
      `${consultantName}'s lead selected`,
      {
        duration: 2200,

        style: {
          background: "#0f172a",
          border:
            "1px solid rgba(52, 211, 153, 0.3)",
          borderRadius: "14px",
          color: "#fff",
        },
      },
    );
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (searchingLead) {
      toast.error(
        "Please wait for the lead search to finish",
      );

      return;
    }

    if (
      leadMatches.length > 1 &&
      !selectedLead
    ) {
      toast.error(
        "Select the correct existing lead before submitting",
      );

      setShowLeadTooltip(true);
      return;
    }

    setLoading(true);

    const submissionTime =
      getLocalTimeString();

    const visitedAt =
      new Date().toISOString();

    try {
      const payload = {
        ...formData,

        location: String(
          formData.location || "",
        ).trim(),

        date: getLocalDateString(),
        time: submissionTime,

        visaType:
          formData.visaType === "Others"
            ? formData.visaTypeManual ||
              "Others"
            : formData.visaType,

        consultationStatus: isCustomStatus
          ? formData.customStatus ||
            "Other Status"
          : formData.consultationStatus,

        leadSource: selectedLead
          ? "Global Leads Database"
          : "Direct Visitor",

        originalLeadConsultant:
          getLeadOwner(selectedLead),

        originalLeadBatchId:
          selectedLead?.batchId || null,

        originalLeadPhoneIndex:
          selectedLead?.phoneIndex !==
          undefined
            ? selectedLead.phoneIndex
            : null,

        visitedLead:
          Boolean(selectedLead),

        visitedTo: selectedLead
          ? formData.consultant
          : "",

        visitedAt: selectedLead
          ? visitedAt
          : null,

        sourceLead: selectedLead
          ? {
              batchId:
                selectedLead.batchId || null,

              phoneIndex:
                selectedLead.phoneIndex !==
                undefined
                  ? selectedLead.phoneIndex
                  : null,

              number:
                selectedLead.number ||
                formData.mobile,

              originalConsultant:
                getLeadOwner(selectedLead),

              leadStatus: "Visited",

              visitedTo:
                formData.consultant,

              visitedAt,

              acknowledged:
                selectedLead.acknowledged ===
                true,

              acknowledgedAt:
                selectedLead.acknowledgedAt ||
                null,

              note:
                selectedLead.note || "",

              nextFollowUpDate:
                selectedLead.nextFollowUpDate ||
                null,

              assignedAt:
                selectedLead.assignedAt ||
                selectedLead.assignmentDate ||
                selectedLead.createdAt ||
                null,

              createdAt:
                selectedLead.createdAt || null,

              updatedAt:
                selectedLead.updatedAt || null,
            }
          : null,
      };

      delete payload.visaTypeManual;
      delete payload.customStatus;

      const response = await fetch(
        `${API_BASE_URL}/api/visitor`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(payload),
        },
      );

      const data = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save visitor lead",
        );
      }


      toast.success(
        selectedLead
          ? "Visitor created and lead marked as Visited"
          : "Visitor Lead Created!",
        {
          style: {
            background: "#0f172a",

            border:
              "1px solid rgba(56, 189, 248, 0.28)",

            borderRadius: "14px",
            color: "#fff",
          },
        },
      );

      const currentConsultant =
        formData.consultant;

      setIsManualCountry(false);
      setIsCustomStatus(false);
      resetLeadSearch();

      setFormData({
        ...createInitialState(),

        consultant: currentConsultant,
        date: getLocalDateString(),
        time: getLocalTimeString(),
      });
    } catch (error) {
      console.error(
        "Visitor submit error:",
        error,
      );

      toast.error(
        error.message ||
          "Failed to save visitor",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full rounded-2xl border border-white/10 bg-slate-950/45 p-3 text-sm text-white placeholder:text-blue-100/35 shadow-inner shadow-blue-950/20 outline-none transition duration-200 focus:border-sky-300/70 focus:bg-slate-950/65 focus:ring-4 focus:ring-sky-400/20 [color-scheme:dark]";

  const labelStyle =
    "mb-1.5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-100/60";

  const sectionTitle = (title) => (
    <div className="flex items-center gap-2 md:col-span-2">
      <div className="h-5 w-1 rounded-full bg-linear-to-b from-sky-300 to-cyan-400" />

      <h2 className="text-[11px] font-black uppercase tracking-wider text-white">
        {title}
      </h2>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 p-4 md:p-6">
      <Toaster position="top-right" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-linear(circle_at_top_left,rgba(37,99,235,0.34),transparent_32%),radial-linear(circle_at_bottom_right,rgba(14,165,233,0.22),transparent_34%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-linear(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-linear(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[44px_44px] opacity-20" />

      <div className="relative mx-auto max-w-4xl overflow-visible rounded-4xl border border-white/10 bg-white/[0.07] shadow-2xl shadow-blue-950/60 backdrop-blur-2xl md:rounded-[2.5rem]">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 rounded-t-4xl border-b border-white/10 bg-linear-to-r from-blue-950 via-blue-900 to-sky-900 px-5 py-4 sm:px-8 md:rounded-t-[2.5rem]">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-sky-300/30 bg-white/10 shadow-lg shadow-blue-500/20">
              <FaUserPlus className="text-lg text-sky-200" />
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-black uppercase leading-none tracking-tight text-white">
                Visitor Entry
              </h1>

              <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-blue-100/60">
                Consultation Lead
              </p>
            </div>
          </div>

          <div className="hidden rounded-full border border-sky-300/15 bg-slate-950/45 px-3 py-1 sm:block">
            <span className="text-[9px] font-black uppercase tracking-widest text-sky-200">
              Global Lead Search
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-5 sm:p-6"
        >
          {/* Consultant, Date and Time */}
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-sky-300/15 bg-slate-950/35 p-4 shadow-inner shadow-blue-950/20 md:grid-cols-3">
            <div>
              <label className={labelStyle}>
                <FaUserTie className="text-sky-300" />
                Consultant
              </label>

              <input
                type="text"
                value={formData.consultant}
                readOnly
                className={`${inputStyle} cursor-not-allowed bg-slate-900/70 font-black text-blue-100/50`}
              />
            </div>

            <div>
              <label className={labelStyle}>
                <FaCalendarAlt className="text-sky-300" />
                Date
              </label>

              <input
                type="text"
                value={formatToDMY(
                  formData.date,
                )}
                readOnly
                className={`${inputStyle} cursor-not-allowed bg-slate-900/70 text-blue-100/70`}
              />
            </div>

            <div>
              <label className={labelStyle}>
                <FaClock className="text-sky-300" />
                Time
              </label>

              <input
                type="text"
                value={formData.time}
                readOnly
                className={`${inputStyle} cursor-not-allowed bg-slate-900/70 text-blue-100/70`}
              />
            </div>
          </div>

{/* Visitor Identity */}
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  {sectionTitle("Visitor Identity")}

  {/* Row 1: Full Name */}
  <input
    type="text"
    name="name"
    placeholder="Full Name"
    value={formData.name}
    onChange={handleChange}
    required
    className={inputStyle}
  />

  {/* Row 1: Mobile */}
  <div className="relative">
    <FaPhone className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-xs text-sky-300/60" />

    <input
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      name="mobile"
      placeholder="Mobile Number"
      value={formData.mobile}
      onChange={handleChange}
      required
      className={`${inputStyle} pl-10 pr-28`}
    />

    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
      {searchingLead ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-400/15 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-sky-200">
          <FaSearch className="animate-pulse" />
          Searching
        </span>
      ) : selectedLead ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/15 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-200">
          <FaCheckCircle />
          Found
        </span>
      ) : null}
    </div>
  </div>

  {/* Row 2: Search message/result across full width */}
  <div
    ref={leadTooltipRef}
    className="relative md:col-span-2"
  >
    {leadSearchError && (
      <p className="flex items-center gap-2 rounded-xl border border-red-300/15 bg-red-400/10 px-3 py-2 text-xs font-bold text-red-300">
        <FaExclamationTriangle />
        {leadSearchError}
      </p>
    )}

    {!searchingLead &&
      leadSearchComplete &&
      !leadSearchError &&
      leadMatches.length === 0 && (
        <p className="rounded-xl border border-white/10 bg-slate-950/30 px-3 py-2 text-xs font-bold text-blue-100/45">
          No existing lead found for this number.
        </p>
      )}

    {!searchingLead &&
      leadMatches.length > 0 && (
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              if (leadMatches.length > 1) {
                setShowLeadTooltip(
                  (previous) => !previous,
                );
              }
            }}
            className={`w-full rounded-xl border px-3 py-2.5 text-left transition ${
              leadMatches.length > 1
                ? "cursor-pointer border-emerald-300/25 bg-emerald-400/10 hover:bg-emerald-400/15"
                : "cursor-default border-emerald-300/20 bg-emerald-400/10"
            }`}
          >
            {selectedLead ? (
              <CompactLeadResult
                lead={selectedLead}
                showSelected
              />
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-amber-200/60">
                    Multiple leads found
                  </p>

                  <p className="mt-0.5 text-xs font-black text-amber-100">
                    Select the assigned person
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-amber-300 px-2.5 py-1 text-[9px] font-black text-amber-950">
                    {leadMatches.length}
                  </span>

                  <FaChevronDown
                    size={10}
                    className={`text-amber-300 transition-transform ${
                      showLeadTooltip
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </div>
              </div>
            )}
          </button>

          {leadMatches.length > 1 &&
            showLeadTooltip && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/70">
                <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-4 py-3">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-sky-300">
                      Select Assigned
                    </p>

                    <p className="mt-1 text-[10px] text-blue-100/45">
                      {leadMatches.length} matching records
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setShowLeadTooltip(false)
                    }
                    className="rounded-lg p-2 text-blue-100/45 transition hover:bg-white/10 hover:text-white"
                    aria-label="Close lead list"
                  >
                    <FaTimes size={11} />
                  </button>
                </div>

                <div className="max-h-80 space-y-2 overflow-y-auto p-2">
                  {leadMatches.map(
                    (lead, index) => {
                      const selected =
                        isSameLead(
                          selectedLead,
                          lead,
                          0,
                          index,
                        );

                      return (
                        <button
                          key={getLeadUniqueId(
                            lead,
                            index,
                          )}
                          type="button"
                          onClick={() =>
                            handleSelectLead(lead)
                          }
                          className={`w-full rounded-xl border p-3 text-left transition ${
                            selected
                              ? "border-emerald-300/40 bg-emerald-400/15"
                              : "border-transparent bg-white/3 hover:border-white/10 hover:bg-white/[0.07]"
                          }`}
                        >
                          <CompactLeadResult
                            lead={lead}
                            showSelected={selected}
                          />
                        </button>
                      );
                    },
                  )}
                </div>
              </div>
            )}
        </div>
      )}
  </div>

  {/* Row 3 */}
  <input
    type="text"
    inputMode="numeric"
    name="age"
    placeholder="Age"
    value={formData.age}
    onChange={handleChange}
    required
    className={inputStyle}
  />

  {formData.type === "Client" ? (
    <div className="relative">
      <input
        type="text"
        name="clientOf"
        placeholder="Client Of?"
        value={formData.clientOf}
        onChange={handleChange}
        className={`${inputStyle} border-sky-300/25 bg-sky-400/10 pr-10 font-black text-sky-100`}
        required
        autoFocus
      />

      <button
        type="button"
        onClick={() =>
          setFormData((previous) => ({
            ...previous,
            type: "New Visitor",
            clientOf: "",
          }))
        }
        className="absolute right-3 top-3 text-sky-300 transition hover:text-cyan-200"
        aria-label="Reset visitor type"
      >
        <FaUndo size={11} />
      </button>
    </div>
  ) : (
    <select
      name="type"
      value={formData.type}
      onChange={handleChange}
      className={`${inputStyle} font-black text-sky-200`}
    >
      <option value="New Visitor">
        New Visitor
      </option>

      <option value="Client">
        Client
      </option>
    </select>
  )}

  {/* Row 4 */}
  <input
    type="text"
    name="currentAddress"
    placeholder="Address"
    value={formData.currentAddress}
    onChange={handleChange}
    className={`${inputStyle} md:col-span-2`}
  />
</div>

          {/* Service Requirements */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {sectionTitle(
              "Service Requirements",
            )}

            <input
              type="text"
              name="profession"
              placeholder="Current Profession"
              value={formData.profession}
              onChange={handleChange}
              className={inputStyle}
              required
            />

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <input
                  list="nationalityOptions"
                  type="text"
                  name="nationality"
                  placeholder="Select or type nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />

                <datalist id="nationalityOptions">
                  {nationalities.map(
                    (nationality) => (
                      <option
                        key={nationality}
                        value={nationality}
                      />
                    ),
                  )}
                </datalist>
              </div>

              <div className="relative">
                <FaMapMarkerAlt className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-xs text-sky-300/50" />

                <input
                  type="text"
                  name="location"
                  placeholder="City / Area (Optional)"
                  value={formData.location}
                  onChange={handleChange}
                  className={`${inputStyle} pl-10`}
                />
              </div>
            </div>

            <div className="relative">
              {formData.visaType ===
              "Others" ? (
                <div className="relative">
                  <input
                    type="text"
                    name="visaTypeManual"
                    placeholder="Specify Visa Type..."
                    value={
                      formData.visaTypeManual
                    }
                    onChange={handleChange}
                    autoFocus
                    required
                    className={`${inputStyle} border-sky-300/25 bg-sky-400/10 pr-10 font-black text-sky-100`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setFormData(
                        (previous) => ({
                          ...previous,
                          visaType: "",
                          visaTypeManual: "",
                          interestedCountry: "",
                        }),
                      )
                    }
                    className="absolute right-3 top-3 text-sky-300 transition hover:text-cyan-200"
                    aria-label="Reset visa type"
                  >
                    <FaUndo size={11} />
                  </button>
                </div>
              ) : (
                <select
                  name="visaType"
                  value={formData.visaType}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                >
                  <option value="">
                    Select Visa Type
                  </option>

                  {visaTypes.map((type) => (
                    <option
                      key={type}
                      value={type}
                    >
                      {type}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="relative">
              {isManualCountry ||
              formData.visaType ===
                "Student" ? (
                <div className="relative">
                  <input
                    type="text"
                    name="interestedCountry"
                    placeholder="Type Country..."
                    value={
                      formData.interestedCountry
                    }
                    onChange={handleChange}
                    autoFocus
                    required
                    className={`${inputStyle} border-sky-300/25 bg-sky-400/10 pr-10 font-black text-sky-100`}
                  />

                  {isManualCountry && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsManualCountry(
                          false,
                        );

                        setFormData(
                          (previous) => ({
                            ...previous,
                            interestedCountry: "",
                          }),
                        );
                      }}
                      className="absolute right-3 top-3 text-sky-300 transition hover:text-cyan-200"
                      aria-label="Reset country"
                    >
                      <FaUndo size={11} />
                    </button>
                  )}
                </div>
              ) : (
                <select
                  name="interestedCountry"
                  value={
                    formData.interestedCountry
                  }
                  onChange={handleChange}
                  className={inputStyle}
                  required
                >
                  <option value="">
                    Interested Country
                  </option>

                  {formData.visaType ===
                    "Visit" && (
                    <>
                      <optgroup label="Europe">
                        {visitVisaCountries.europe.map(
                          (country) => (
                            <option
                              key={
                                country.name
                              }
                              value={
                                country.name
                              }
                            >
                              {
                                country.name
                              }
                            </option>
                          ),
                        )}
                      </optgroup>

                      <optgroup label="Other">
                        {visitVisaCountries.other.map(
                          (country) => (
                            <option
                              key={
                                country.name
                              }
                              value={
                                country.name
                              }
                            >
                              {
                                country.name
                              }
                            </option>
                          ),
                        )}
                      </optgroup>
                    </>
                  )}

                  {(formData.visaType ===
                    "Work" ||
                    formData.visaType ===
                      "Others") &&
                    interestedCountries.map(
                      (country) => (
                        <option
                          key={country}
                          value={country}
                        >
                          {country}
                        </option>
                      ),
                    )}

                  <option value="Others">
                    -- Others Manual Entry --
                  </option>
                </select>
              )}
            </div>
          </div>

          {/* Assessment */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {sectionTitle("Assessment")}

            <input
              type="text"
              name="paymentTerms"
              placeholder="Payment Terms Discussed"
              value={formData.paymentTerms}
              onChange={handleChange}
              className={inputStyle}
            />

            <div className="relative">
              {isCustomStatus ? (
                <div className="relative">
                  <input
                    type="text"
                    name="customStatus"
                    placeholder="Specify Consultation Status..."
                    value={
                      formData.customStatus
                    }
                    onChange={handleChange}
                    autoFocus
                    required
                    className={`${inputStyle} border-sky-300/25 bg-sky-400/10 pr-10 font-black text-sky-100`}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomStatus(false);

                      setFormData(
                        (previous) => ({
                          ...previous,
                          consultationStatus:
                            "",
                          customStatus: "",
                          nextFollowupDate: "",
                        }),
                      );
                    }}
                    className="absolute right-3 top-3 text-sky-300 transition hover:text-cyan-200"
                    aria-label="Reset status"
                  >
                    <FaUndo size={11} />
                  </button>
                </div>
              ) : (
                <select
                  name="consultationStatus"
                  value={
                    formData.consultationStatus
                  }
                  onChange={handleChange}
                  required
                  className={`${inputStyle} font-black text-sky-200`}
                >
                  <option value="">
                    Consultation Status
                  </option>

                  {consultationStatuses.map(
                    (status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    ),
                  )}

                  <option value="CustomStatus">
                    -- Others / Specify Status...
                    --
                  </option>
                </select>
              )}
            </div>

            {(formData.consultationStatus ||
              isCustomStatus) && (
              <div className="relative md:col-span-2">
                <label className={labelStyle}>
                  Next Follow-up Date
                </label>

                <input
                  type="text"
                  readOnly
                  placeholder="DD-MM-YYYY"
                  value={formatToDMY(
                    formData.nextFollowupDate,
                  )}
                  onClick={triggerCalendar}
                  className={`${inputStyle} cursor-pointer`}
                />

                <input
                  ref={hiddenPickerRef}
                  type="date"
                  name="nextFollowupDate"
                  value={
                    formData.nextFollowupDate
                  }
                  onChange={handleChange}
                  className="absolute bottom-0 left-0 -z-50 h-0 w-0 opacity-0"
                />
              </div>
            )}

            <textarea
              name="visitorEnquiry"
              placeholder="Visitor Enquiry"
              value={formData.visitorEnquiry}
              onChange={handleChange}
              rows={3}
              required
              className={`${inputStyle} md:col-span-2`}
            />
          </div>

          <button
            type="submit"
            disabled={
              loading || searchingLead
            }
            className="w-full rounded-2xl bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-blue-500/25 transition-all hover:shadow-blue-400/45 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Processing Database..."
              : searchingLead
                ? "Checking Lead Database..."
                : "Create Visitor Record"}
          </button>
        </form>
      </div>
    </div>
  );
}

function CompactLeadResult({
  lead,
  showSelected = false,
}) {
  const assignedPerson =
    getLeadOwner(lead) || "Unknown";

  const assignmentDate =
    getAssignmentDate(lead);

  return (
    <div className="space-y-2.5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        {/* Assigned */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
              Assigned
            </p>

            {showSelected && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-300 px-2 py-0.5 text-[8px] font-black uppercase text-emerald-950">
                <FaCheckCircle />
                Selected
              </span>
            )}
          </div>

          <p className="mt-1 truncate text-sm font-black capitalize text-white">
            {assignedPerson}
          </p>

          <p className="mt-0.5 text-[9px] text-blue-100/45">
            {formatDateTime(assignmentDate)}
          </p>
        </div>

        {/* Status + acknowledgement */}
        <div className="flex flex-wrap gap-2 sm:justify-end">
          <div className="rounded-lg border border-amber-300/15 bg-amber-400/10 px-2.5 py-1.5">
            <p className="text-[8px] font-black uppercase tracking-wide text-amber-200/50">
              Status
            </p>

            <p className="mt-0.5 text-[10px] font-black text-amber-200">
              {lead.status || "New"}
            </p>
          </div>

          <div
            className={`rounded-lg border px-2.5 py-1.5 ${
              lead.acknowledged
                ? "border-emerald-300/15 bg-emerald-400/10"
                : "border-red-300/15 bg-red-400/10"
            }`}
          >
            <p
              className={`text-[10px] font-black ${
                lead.acknowledged
                  ? "text-emerald-200"
                  : "text-red-200"
              }`}
            >
              {lead.acknowledged
                ? "Acknowledged"
                : "Unacknowledged"}
            </p>

            {lead.acknowledged &&
              lead.acknowledgedAt && (
                <p className="mt-0.5 whitespace-nowrap text-[8px] text-emerald-100/45">
                  {formatDateTime(
                    lead.acknowledgedAt,
                  )}
                </p>
              )}
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="flex items-start gap-2 rounded-lg border border-white/5 bg-slate-950/35 px-3 py-2">
        <p className="shrink-0 text-[8px] font-black uppercase tracking-wider text-blue-100/40">
          Note
        </p>

        <p className="min-w-0 flex-1 wrap-break-word text-[10px] leading-4 text-blue-100/75">
          {lead.note?.trim() ||
            "No note available"}
        </p>
      </div>

      {lead.nextFollowUpDate && (
        <p className="text-[8px] font-bold text-amber-200">
          Follow-up:{" "}
          {formatToDMY(
            lead.nextFollowUpDate,
          )}
        </p>
      )}
    </div>
  );
}