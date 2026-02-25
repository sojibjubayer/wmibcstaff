import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const consultationStatuses = [
  "Highly Interested", "Interested", "Needs Follow-up",
  "Documents Pending", "Not Eligible", "Not Interested",
];

const nationalities = [
  "Bangladeshi", "Pakistani", "Indian", "Nepali",
  "Filipino", "Moroccan", "African",
];

const interestedCountries = [
  "Greece", "Portugal", "Poland", "Bulgaria",
  "Croatia", "Serbia", "North Macedonia", "Cyprus",
];

const visaTypes = ["Visit", "Work", "Student", "Others"];

const visitVisaCountries = {
  europe: [
    { name: "France", link: "/visit-visa/france" },
    { name: "Germany", link: "/visit-visa/germany" },
    { name: "Italy", link: "/visit-visa/italy" },
    { name: "Spain", link: "/visit-visa/spain" },
    { name: "Greece", link: "/visit-visa/greece" },
    { name: "Netherlands", link: "/visit-visa/netherlands" },
    { name: "Switzerland", link: "/visit-visa/switzerland" },
    { name: "Austria", link: "/visit-visa/austria" },
  ],
  other: [
    { name: "USA", link: "/visit-visa/usa" },
    { name: "Canada", link: "/visit-visa/canada" },
    { name: "Australia", link: "/visit-visa/australia" },
    { name: "New Zealand", link: "/visit-visa/new-zealand" },
    { name: "United Kingdom", link: "/visit-visa/uk" },
    { name: "Turkey", link: "/visit-visa/turkey" },
  ],
};

// ✅ Added 'time' field to state
const initialState = {
  date: new Date().toISOString().split("T")[0],
  time: "", 
  consultant: "",
  name: "",
  mobile: "",
  age: "",
  currentAddress: "",
  profession: "",
  visaType: "",
  nationality: "",
  interestedCountry: "",
  paymentTerms: "",
  consultationStatus: "",
  visitorComment: "",
  remarks: "",
};

export default function AddVisitor() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // Auto-fill consultant and initial time from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setFormData((prev) => ({
        ...prev,
        consultant: parsedUser.name || parsedUser.username || "",
        time: timeString,
      }));
    } else {
      setFormData(prev => ({ ...prev, time: timeString }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "visaType" && { interestedCountry: "" }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Capture exact time of submission
    const now = new Date();
    const submissionTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    const dataToSubmit = {
      ...formData,
      time: submissionTime
    };

    try {
      const response = await fetch(
        "https://wmibcstaff-server.vercel.app/api/visitor",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSubmit),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save visitor");
      }

      toast.success("Visitor added successfully!");

      const currentConsultant = formData.consultant;
      setFormData({
        ...initialState,
        consultant: currentConsultant,
        date: now.toISOString().split("T")[0],
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      });
    } catch (error) {
      toast.error(error.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "bg-white mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-200 focus:border-amber-400 outline-none transition-all";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Toaster position="top-center" />

      <div className="w-full max-w-3xl bg-amber-50 border border-amber-200 rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-amber-200 pb-3">
          Immigration Consultation Form 
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Header Data: Consultant, Date, Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Consultant</label>
              <input type="text" name="consultant" value={formData.consultant} readOnly className={`${inputStyle} bg-amber-100/50 font-semibold`} />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Date</label>
              <input type="date" name="date" value={formData.date} readOnly className={`${inputStyle} bg-amber-100/50`} />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Entry Time</label>
              <input type="text" name="time" value={formData.time} readOnly className={`${inputStyle} bg-amber-100/50`} />
            </div>
          </div>

          <hr className="border-amber-200" />

          {/* Visitor Type */}
          {/* <div>
            <label className="text-xs font-bold text-gray-600">Visitor Type</label>
            <select name="visitorType" value={formData.visitorType} onChange={handleChange} required className={inputStyle}>
              <option value="">Select Visitor Type</option>
              <option value="New Visitor">New</option>
              <option value="Client">Client</option>
            </select>
          </div> */}

          {/* Name + Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Visitor Name" value={formData.name} onChange={handleChange} required className={inputStyle} />
            <input type="text" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required className={inputStyle} />
          </div>

          {/* Age + Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className={inputStyle} />
            <input type="text" name="currentAddress" placeholder="Current Address" value={formData.currentAddress} onChange={handleChange} className={inputStyle} />
          </div>

          {/* Profession + Nationality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="profession" placeholder="Profession" value={formData.profession} onChange={handleChange} className={inputStyle} />
            <select name="nationality" value={formData.nationality} onChange={handleChange} className={inputStyle}>
              <option value="">Select Nationality</option>
              {nationalities.map((nat) => <option key={nat} value={nat}>{nat}</option>)}
            </select>
          </div>

          {/* Visa Type + Country Mapping */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="visaType" value={formData.visaType} onChange={handleChange} className={inputStyle}>
              <option value="">Select Visa Type</option>
              {visaTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>

            {formData.visaType === "Visit" && (
              <select name="interestedCountry" value={formData.interestedCountry} onChange={handleChange} className={inputStyle}>
                <option value="">Select Country</option>
                <optgroup label="Europe">
                  {visitVisaCountries.europe.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                </optgroup>
                <optgroup label="Other">
                  {visitVisaCountries.other.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                </optgroup>
              </select>
            )}

            {formData.visaType === "Work" && (
              <select name="interestedCountry" value={formData.interestedCountry} onChange={handleChange} className={inputStyle}>
                <option value="">Select Country</option>
                {interestedCountries.map((country) => <option key={country} value={country}>{country}</option>)}
              </select>
            )}

            {(formData.visaType === "Student" || formData.visaType === "Others") && (
              <input type="text" name="interestedCountry" placeholder="Enter Country" value={formData.interestedCountry} onChange={handleChange} className={inputStyle} />
            )}
          </div>

          {/* Payment + Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="paymentTerms" placeholder="Payment Terms" value={formData.paymentTerms} onChange={handleChange} className={inputStyle} />
            <select name="consultationStatus" value={formData.consultationStatus} onChange={handleChange} required className={inputStyle}>
              <option value="">Select Status</option>
              {consultationStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>

          <textarea name="visitorComment" placeholder="Visitor Comment" value={formData.visitorComment} onChange={handleChange} rows="2" className={inputStyle} />
          <textarea name="remarks" placeholder="Remarks" value={formData.remarks} onChange={handleChange} rows="2" className={inputStyle} />

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-1/2 mx-auto block bg-amber-300 text-black hover:text-white font-bold py-3 rounded-xl shadow-lg hover:bg-amber-500 transition-all disabled:opacity-50"
          >
            {loading ? "Saving to Database..." : "Save Visitor Record"}
          </button>
        </form>
      </div>
    </div>
  );
}