import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPhoneAlt,
  FaRedo,
  FaEye,
  FaTimes,
  FaSave,
  FaUserCheck,
  FaUserTimes,
  FaInfoCircle,
  FaGlobeEurope,
  FaCalendarAlt,
} from "react-icons/fa";

const API_BASE_URL = "https://wmibcstaff-server.vercel.app";

const Followups = () => {
  const [followups, setFollowups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [followupStatus, setFollowupStatus] = useState("Still Interested");
  const [followedUpDate, setFollowedUpDate] = useState("");
  const [nextFollowupDate, setNextFollowupDate] = useState("");
  const [followupRemarks, setFollowupRemarks] = useState("");

  const followedUpDateRef = useRef(null);
  const nextFollowupDateRef = useRef(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const userName = user?.name || user?.userName || user?.fullName || "User";

const getQatarDateString = () => {
  const qatarDate = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Qatar",
  });

  return qatarDate;
};

const todayDate = useMemo(() => {
  return getQatarDateString();
}, []);

  const formatDateDMY = (dateValue) => {
    if (!dateValue) return "Select Date";

    const cleanDate = String(dateValue).split("T")[0];

    if (!/^\d{4}-\d{2}-\d{2}$/.test(cleanDate)) {
      return dateValue;
    }

    const [year, month, day] = cleanDate.split("-");
    return `${day}-${month}-${year}`;
  };

  const openDatePicker = (inputRef) => {
    const input = inputRef.current;
    if (!input) return;

    input.focus();

    if (typeof input.showPicker === "function") {
      input.showPicker();
    } else {
      input.click();
    }
  };

const fetchFollowups = async () => {
  if (!token) {
    navigate("/login");
    return;
  }

  try {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const response = await fetch(`${API_BASE_URL}/api/followups`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data?.message || "Failed to fetch followups");
      setFollowups([]);
      return;
    }

    setFollowups(Array.isArray(data) ? data : []);
  } catch (error) {
    setErrorMessage("Something went wrong while loading followups");
    setFollowups([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchFollowups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (visitor) => {
    setSelectedVisitor(visitor);
    setErrorMessage("");
    setSuccessMessage("");

    setFollowupStatus(
      visitor.consultationStatus === "Not Interested"
        ? "Not Interested"
        : "Still Interested",
    );

    setFollowedUpDate(todayDate);
    setNextFollowupDate(visitor.nextFollowupDate || "");
    setFollowupRemarks(visitor.followupRemarks || visitor.remarks || "");

    setShowModal(true);
  };

  const closeModal = () => {
    if (updating) return;

    setShowModal(false);
    setSelectedVisitor(null);
    setFollowupStatus("Still Interested");
    setFollowedUpDate("");
    setNextFollowupDate("");
    setFollowupRemarks("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleUpdateFollowup = async () => {
    if (!selectedVisitor?._id) return;

    if (!followedUpDate) {
      setErrorMessage("Please select followed up date.");
      return;
    }

    if (!followupRemarks.trim()) {
      setErrorMessage("Please write follow-up remarks.");
      return;
    }

    if (followupStatus === "Still Interested" && !nextFollowupDate) {
      setErrorMessage("Please select next follow-up date.");
      return;
    }

    try {
      setUpdating(true);
      setErrorMessage("");
      setSuccessMessage("");

      const payload = {
        followedUpDate,
        followupRemarks: followupRemarks.trim(),
        remarks: followupRemarks.trim(),

        consultationStatus:
          followupStatus === "Not Interested"
            ? "Not Interested"
            : "Needs Follow-up",

        interestedStatus:
          followupStatus === "Not Interested"
            ? "Not Interested"
            : "Still Interested",

        nextFollowupDate:
          followupStatus === "Not Interested" ? "" : nextFollowupDate,

        lastFollowupBy: userName,
        lastFollowupAt: new Date().toISOString(),
      };

      const response = await fetch(
        `${API_BASE_URL}/api/followups/${selectedVisitor._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.message || "Failed to update follow-up");
        return;
      }

      setSuccessMessage("Follow-up updated successfully.");

      setFollowups((prev) =>
        prev
          .map((visitor) =>
            visitor._id === selectedVisitor._id
              ? {
                  ...visitor,
                  ...payload,
                }
              : visitor,
          )
          .filter((visitor) => {
            if (visitor._id !== selectedVisitor._id) return true;
            if (payload.consultationStatus === "Not Interested") return false;
            if (payload.nextFollowupDate !== todayDate) return false;
            return true;
          }),
      );

      setTimeout(() => {
        closeModal();
      }, 700);
    } catch (error) {
      setErrorMessage("Something went wrong while updating follow-up");
    } finally {
      setUpdating(false);
    }
  };

  const DatePickerBox = ({ label, value, setValue, inputRef, min }) => {
    return (
      <div>
        <label className="mb-2 block text-xs font-black uppercase tracking-wider text-blue-100/55">
          {label}
        </label>

        <button
          type="button"
          onClick={() => openDatePicker(inputRef)}
          className="relative flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-left transition-all hover:border-sky-300/35 focus:border-sky-300/45 focus:outline-none"
        >
          <span className="flex items-center gap-3">
            <FaCalendarAlt className="text-pink-200" />
            <span className="text-base font-black text-white">
              {formatDateDMY(value)}
            </span>
          </span>

          <span className="rounded-xl border border-white/10 bg-white/5 p-2 text-blue-100">
            <FaCalendarAlt />
          </span>

          <input
            ref={inputRef}
            type="date"
            value={value}
            min={min}
            onChange={(e) => setValue(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </button>
      </div>
    );
  };

  const detailRows = selectedVisitor
    ? [
        ["Name", selectedVisitor.name],
        ["Mobile", selectedVisitor.mobile],
        ["Type", selectedVisitor.type],
        ["Client Of", selectedVisitor.clientOf],
        ["Age", selectedVisitor.age],
        ["Current Address", selectedVisitor.currentAddress],
        ["Profession", selectedVisitor.profession],
        ["Visa Type", selectedVisitor.visaType],
        ["Nationality", selectedVisitor.nationality],
        ["Location", selectedVisitor.location],
        ["Interested Country", selectedVisitor.interestedCountry],
        ["Payment Terms", selectedVisitor.paymentTerms],
        ["Consultation Status", selectedVisitor.consultationStatus],
        [
          "Next Follow-up Date",
          formatDateDMY(selectedVisitor.nextFollowupDate),
        ],
        ["Visitor Enquiry", selectedVisitor.visitorEnquiry],
        ["Remarks", selectedVisitor.remarks],
        ["Consultant", selectedVisitor.consultant],
        ["Visit Date", formatDateDMY(selectedVisitor.date)],
        ["Visit Time", selectedVisitor.time],
        ["Followed Up Date", formatDateDMY(selectedVisitor.followedUpDate)],
        ["Follow-up Remarks", selectedVisitor.followupRemarks],
        ["Last Follow-up By", selectedVisitor.lastFollowupBy],
        ["Last Follow-up At", formatDateDMY(selectedVisitor.lastFollowupAt)],
      ]
    : [];

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.25),transparent_30%),radial-gradient(circle_at_top_right,rgba(236,72,153,0.18),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-blue-950/30 backdrop-blur-2xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-pink-200/70">
                Today Followups
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                Follow-up Visitors
              </h1>

              <p className="mt-2 text-sm font-semibold text-blue-100/65">
                Showing today’s follow-ups for{" "}
                <span className="font-black text-white">{userName}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-pink-300/20 bg-pink-500/15 px-4 py-3 text-center">
                <p className="text-[10px] font-black uppercase tracking-wider text-pink-100/70">
                  Total
                </p>
                <p className="text-2xl font-black text-white">
                  {followups.length}
                </p>
              </div>

              <button
                type="button"
                onClick={fetchFollowups}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-2xl border border-sky-300/20 bg-sky-500/15 px-4 py-3 text-sm font-black text-sky-100 transition-all hover:bg-sky-500/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaRedo className={loading ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {successMessage && !showModal && (
          <div className="mb-4 rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-4 text-sm font-bold text-emerald-100">
            {successMessage}
          </div>
        )}

        {!loading && errorMessage && !showModal && (
          <div className="mb-4 rounded-2xl border border-red-300/20 bg-red-500/10 p-4 text-sm font-bold text-red-100">
            {errorMessage}
          </div>
        )}

        {loading && (
          <div className="rounded-3xl border border-white/10 bg-white/6 p-8 text-center shadow-xl shadow-blue-950/25">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-sky-300/20 border-t-sky-300" />
            <p className="font-bold text-blue-100/75">Loading follow-ups...</p>
          </div>
        )}

        {!loading && !errorMessage && followups.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/6 p-8 text-center shadow-xl shadow-blue-950/25">
            <p className="text-xl font-black text-white">No follow-ups today</p>
            <p className="mt-2 text-sm font-semibold text-blue-100/60">
              There are no visitor follow-ups assigned to you for today.
            </p>
          </div>
        )}

        {!loading && followups.length > 0 && (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.07] shadow-2xl shadow-blue-950/30 backdrop-blur-2xl">
            <div className="hidden grid-cols-[1.4fr_1fr_1.2fr_1fr_150px] gap-4 border-b border-white/10 bg-white/6 px-5 py-4 text-xs font-black uppercase tracking-wider text-blue-100/60 md:grid">
              <div>Name</div>
              <div>Mobile</div>
              <div>Interested Country</div>
              <div>Follow-up Date</div>
              <div className="text-right">Action</div>
            </div>

            <div className="divide-y divide-white/10">
              {followups.map((visitor) => (
                <div
                  key={visitor._id}
                  className="grid gap-4 px-5 py-4 transition-all hover:bg-white/6 md:grid-cols-[1.4fr_1fr_1.2fr_1fr_150px] md:items-center"
                >
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-pink-100/50 md:hidden">
                      Name
                    </p>
                    <p className="mt-1 font-black text-white">
                      {visitor.name || "No Name"}
                    </p>
                    <p className="mt-1 text-xs font-bold text-blue-100/50">
                      {visitor.type || "Visitor"} •{" "}
                      {visitor.consultationStatus || "Needs Follow-up"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-pink-100/50 md:hidden">
                      Mobile
                    </p>
                    <p className="mt-1 inline-flex items-center gap-2 text-sm font-bold text-blue-50/85">
                      <FaPhoneAlt className="text-pink-200" />
                      {visitor.mobile || "No Mobile"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-pink-100/50 md:hidden">
                      Interested Country
                    </p>
                    <p className="mt-1 inline-flex items-center gap-2 text-sm font-bold text-blue-50/85">
                      <FaGlobeEurope className="text-pink-200" />
                      {visitor.interestedCountry || "No Country"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-pink-100/50 md:hidden">
                      Follow-up Date
                    </p>
                    <p className="mt-1 inline-flex items-center gap-2 text-sm font-bold text-blue-50/85">
                      <FaCalendarAlt className="text-pink-200" />
                      {formatDateDMY(visitor.nextFollowupDate)}
                    </p>
                  </div>

                  <div className="flex md:justify-end">
                    <button
                      type="button"
                      onClick={() => openModal(visitor)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-sky-300/20 bg-sky-500/15 px-4 py-3 text-sm font-black text-sky-100 transition-all hover:bg-sky-500/25 md:w-auto"
                    >
                      <FaEye />
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showModal && selectedVisitor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/50">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-white/[0.07] p-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-pink-200/70">
                  Visitor Details
                </p>

                <h2 className="mt-2 text-2xl font-black text-white">
                  {selectedVisitor.name || "No Name"}
                </h2>

                <p className="mt-1 text-sm font-bold text-blue-100/60">
                  {selectedVisitor.mobile || "No Mobile"} •{" "}
                  {selectedVisitor.interestedCountry || "No Country"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={updating}
                className="rounded-2xl border border-white/10 bg-white/10 p-3 text-white transition-all hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaTimes />
              </button>
            </div>

            <div className="max-h-[calc(92vh-96px)] overflow-y-auto p-5">
              {errorMessage && (
                <div className="mb-4 rounded-2xl border border-red-300/20 bg-red-500/10 p-4 text-sm font-bold text-red-100">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="mb-4 rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-4 text-sm font-bold text-emerald-100">
                  {successMessage}
                </div>
              )}

              <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <FaInfoCircle className="text-sky-200" />
                    <h3 className="font-black text-white">
                      Visitor Information
                    </h3>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {detailRows.map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-white/10 bg-slate-950/45 p-4"
                      >
                        <p className="text-[10px] font-black uppercase tracking-wider text-blue-200/45">
                          {label}
                        </p>

                        <p className="mt-1 wrap-break-word text-sm font-bold text-blue-50/85">
                          {value || "N/A"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <FaUserCheck className="text-emerald-200" />
                    <h3 className="font-black text-white">Update Follow-up</h3>
                  </div>

                  <div className="space-y-4">
                    <DatePickerBox
                      label="Followed Up Date"
                      value={followedUpDate}
                      setValue={setFollowedUpDate}
                      inputRef={followedUpDateRef}
                    />

                    <div>
                      <label className="mb-2 block text-xs font-black uppercase tracking-wider text-blue-100/55">
                        Client Status
                      </label>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={() => setFollowupStatus("Still Interested")}
                          className={`rounded-2xl border px-4 py-3 text-sm font-black transition-all ${
                            followupStatus === "Still Interested"
                              ? "border-emerald-300/40 bg-emerald-500/20 text-emerald-100"
                              : "border-white/10 bg-slate-950/50 text-blue-100/60 hover:bg-white/10"
                          }`}
                        >
                          <span className="inline-flex items-center gap-2">
                            <FaUserCheck />
                            Still Interested
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setFollowupStatus("Not Interested");
                            setNextFollowupDate("");
                          }}
                          className={`rounded-2xl border px-4 py-3 text-sm font-black transition-all ${
                            followupStatus === "Not Interested"
                              ? "border-red-300/40 bg-red-500/20 text-red-100"
                              : "border-white/10 bg-slate-950/50 text-blue-100/60 hover:bg-white/10"
                          }`}
                        >
                          <span className="inline-flex items-center gap-2">
                            <FaUserTimes />
                            Not Interested
                          </span>
                        </button>
                      </div>
                    </div>

                    {followupStatus === "Still Interested" && (
                      <DatePickerBox
                        label="Next Follow-up Date"
                        value={nextFollowupDate}
                        setValue={setNextFollowupDate}
                        inputRef={nextFollowupDateRef}
                        min={todayDate}
                      />
                    )}

                    <div>
                      <label className="mb-2 block text-xs font-black uppercase tracking-wider text-blue-100/55">
                        Follow-up Remarks
                      </label>

                      <textarea
                        value={followupRemarks}
                        onChange={(e) => setFollowupRemarks(e.target.value)}
                        rows={6}
                        placeholder="Example: Called client today. Client is still interested. Asked to follow up next week."
                        className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-bold text-white outline-none transition-all placeholder:text-blue-100/30 focus:border-sky-300/40"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleUpdateFollowup}
                      disabled={updating}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-sky-500 to-pink-500 px-5 py-4 text-sm font-black text-white shadow-xl shadow-pink-950/25 transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <FaSave />
                      {updating ? "Updating..." : "Update Follow-up"}
                    </button>

                    <p className="text-xs font-semibold leading-relaxed text-blue-100/45">
                      Display format is day-month-year. Database value stays
                      year-month-day for safe filtering.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Followups;
