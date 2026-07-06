import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FaUndo,
  FaUserPlus,
  FaClock,
  FaCalendarAlt,
  FaUserTie,
} from "react-icons/fa";

const consultationStatuses = [
  "Highly Interested",
  "Interested",
  "Needs Follow-up",
  "Documents Pending",
  "Not Eligible",
  "Not Interested",
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

const visaTypes = ["Visit", "Work", "Student", "Others"];

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

const initialState = {
  date: new Date().toISOString().split("T")[0],
  time: "",
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
  visitorEnquiry: "",
  remarks: "",
  visaTypeManual: "",
};

export default function AddVisitor() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [isManualCountry, setIsManualCountry] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const now = new Date();

    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setFormData((prev) => ({
        ...prev,
        consultant: parsedUser.name || parsedUser.username || "",
        time: timeString,
      }));
    } else {
      setFormData((prev) => ({ ...prev, time: timeString }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      setFormData((prev) => ({
        ...prev,
        type: value,
        clientOf: value === "Client" ? prev.clientOf : "",
      }));
      return;
    }

    if (name === "interestedCountry" && value === "Others") {
      setIsManualCountry(true);
      setFormData((prev) => ({ ...prev, interestedCountry: "" }));
      return;
    }

    if (name === "visaType") {
      setIsManualCountry(false);
      setFormData((prev) => ({
        ...prev,
        visaType: value,
        interestedCountry: "",
        visaTypeManual: value === "Others" ? prev.visaTypeManual : "",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const now = new Date();

    const submissionTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    try {
      const payload = {
        ...formData,
        time: submissionTime,
        visaType:
          formData.visaType === "Others"
            ? formData.visaTypeManual || "Others"
            : formData.visaType,
      };

      delete payload.visaTypeManual;

      const response = await fetch(
        "https://wmibcstaff-server.vercel.app/api/visitor",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) throw new Error("Failed to save visitor lead");

      toast.success("Visitor Lead Created!", {
        style: {
          background: "#0f172a",
          border: "1px solid rgba(56, 189, 248, 0.28)",
          borderRadius: "14px",
          color: "#fff",
        },
      });

      setIsManualCountry(false);

      setFormData({
        ...initialState,
        consultant: formData.consultant,
        date: now.toISOString().split("T")[0],
        time: submissionTime,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full rounded-2xl border border-white/10 bg-slate-950/45 p-3 text-sm text-white placeholder:text-blue-100/35 shadow-inner shadow-blue-950/20 outline-none transition duration-200 focus:border-sky-300/70 focus:bg-slate-950/65 focus:ring-4 focus:ring-sky-400/20";

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

      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-4xl border border-white/10 bg-white/[0.07] shadow-2xl shadow-blue-950/60 backdrop-blur-2xl md:rounded-[2.5rem]">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-linear-to-r from-blue-950 via-blue-900 to-sky-900 px-5 py-4 sm:px-8">
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
              Lead Gen v2.3
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-sky-300/15 bg-slate-950/35 p-4 shadow-inner shadow-blue-950/20 md:grid-cols-3">
            <div>
              <label className={labelStyle}>
                <FaUserTie className="text-sky-300" /> Consultant
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
                <FaCalendarAlt className="text-sky-300" /> Date
              </label>
              <input
                type="date"
                value={formData.date}
                readOnly
                className={`${inputStyle} cursor-not-allowed bg-slate-900/70 text-blue-100/70`}
              />
            </div>

            <div>
              <label className={labelStyle}>
                <FaClock className="text-sky-300" /> Time
              </label>
              <input
                type="text"
                value={formData.time}
                readOnly
                className={`${inputStyle} cursor-not-allowed bg-slate-900/70 text-blue-100/70`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {sectionTitle("Visitor Identity")}

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputStyle}
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className={inputStyle}
            />

            <input
              type="text"
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
                    setFormData((prev) => ({
                      ...prev,
                      type: "New Visitor",
                      clientOf: "",
                    }))
                  }
                  className="absolute right-3 top-3 text-sky-300 hover:text-cyan-200"
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
                <option value="New Visitor">New Visitor</option>
                <option value="Client">Client</option>
              </select>
            )}

            <input
              type="text"
              name="currentAddress"
              placeholder="Full Address"
              value={formData.currentAddress}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {sectionTitle("Service Requirements")}

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
                  {nationalities.map((nat) => (
                    <option key={nat} value={nat} />
                  ))}
                </datalist>
              </div>

              <input
                type="text"
                name="location"
                placeholder="City / Area"
                value={formData.location}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div className="relative">
              {formData.visaType === "Others" ? (
                <div className="relative">
                  <input
                    type="text"
                    name="visaTypeManual"
                    placeholder="Specify Visa Type..."
                    value={formData.visaTypeManual}
                    onChange={handleChange}
                    autoFocus
                    required
                    className={`${inputStyle} border-sky-300/25 bg-sky-400/10 pr-10 font-black text-sky-100`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        visaType: "",
                        visaTypeManual: "",
                        interestedCountry: "",
                      }))
                    }
                    className="absolute right-3 top-3 text-sky-300 hover:text-cyan-200"
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
                  <option value="">Select Visa Type</option>
                  {visaTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="relative">
              {isManualCountry || formData.visaType === "Student" ? (
                <div className="relative">
                  <input
                    type="text"
                    name="interestedCountry"
                    placeholder="Type Country..."
                    value={formData.interestedCountry}
                    onChange={handleChange}
                    autoFocus
                    required
                    className={`${inputStyle} border-sky-300/25 bg-sky-400/10 pr-10 font-black text-sky-100`}
                  />

                  {isManualCountry && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsManualCountry(false);
                        setFormData((p) => ({
                          ...p,
                          interestedCountry: "",
                        }));
                      }}
                      className="absolute right-3 top-3 text-sky-300 hover:text-cyan-200"
                    >
                      <FaUndo size={11} />
                    </button>
                  )}
                </div>
              ) : (
                <select
                  name="interestedCountry"
                  value={formData.interestedCountry}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                >
                  <option value="">Interested Country</option>

                  {formData.visaType === "Visit" && (
                    <>
                      <optgroup label="Europe">
                        {visitVisaCountries.europe.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </optgroup>

                      <optgroup label="Other">
                        {visitVisaCountries.other.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </optgroup>
                    </>
                  )}

                  {(formData.visaType === "Work" ||
                    formData.visaType === "Others") &&
                    interestedCountries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}

                  <option value="Others">-- Others Manual Entry --</option>
                </select>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {sectionTitle("Assessment & Remarks")}

            <input
              type="text"
              name="paymentTerms"
              placeholder="Payment Terms Discussed"
              value={formData.paymentTerms}
              onChange={handleChange}
              className={inputStyle}
            />

            <select
              name="consultationStatus"
              value={formData.consultationStatus}
              onChange={handleChange}
              required
              className={`${inputStyle} font-black text-sky-200`}
            >
              <option value="">Consultation Status</option>
              {consultationStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <textarea
              name="visitorEnquiry"
              placeholder="Visitor Enquiry"
              value={formData.visitorEnquiry}
              onChange={handleChange}
              rows="1"
              required
              className={inputStyle}
            />

            <textarea
              name="remarks"
              placeholder="Consultant Remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows="1"
              required
              className={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-blue-500/25 transition-all hover:shadow-blue-400/45 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Processing Database..." : "Create Visitor Record"}
          </button>
        </form>
      </div>
    </div>
  );
}
