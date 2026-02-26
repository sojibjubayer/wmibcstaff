import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaUndo, FaUserPlus, FaClock, FaCalendarAlt, FaUserTie } from "react-icons/fa";

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
    { name: "France" }, { name: "Germany" }, { name: "Italy" }, { name: "Spain" },
    { name: "Greece" }, { name: "Netherlands" }, { name: "Switzerland" }, { name: "Austria" },
  ],
  other: [
    { name: "USA" }, { name: "Canada" }, { name: "Australia" }, 
    { name: "New Zealand" }, { name: "United Kingdom" }, { name: "Turkey" },
  ],
};

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
  const [isManualCountry, setIsManualCountry] = useState(false);

  // Auto-fill consultant and initial time
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
    if (name === "interestedCountry" && value === "Others") {
      setIsManualCountry(true);
      setFormData(prev => ({ ...prev, interestedCountry: "" }));
    } else if (name === "visaType") {
      setIsManualCountry(false);
      setFormData(prev => ({ ...prev, visaType: value, interestedCountry: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const now = new Date();
    const submissionTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const dataToSubmit = { ...formData, time: submissionTime };

    try {
      const response = await fetch("https://wmibcstaff-server.vercel.app/api/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) throw new Error("Failed to save visitor lead");
      
      toast.success("Visitor Lead Created!", {
        style: { background: '#0f172a', color: '#fff', borderRadius: '12px' }
      });
      
      setIsManualCountry(false);
      setFormData({
        ...initialState,
        consultant: formData.consultant,
        date: now.toISOString().split("T")[0],
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full border border-slate-200 bg-slate-50 rounded-xl p-2.5 text-sm text-slate-700 focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-100 transition duration-200";
  const labelStyle = "flex items-center gap-2 mb-1 font-bold text-[10px] uppercase tracking-widest text-slate-400";

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto bg-white rounded-4xl shadow-2xl shadow-slate-200 border border-white overflow-hidden">
        
        {/* Compact Header */}
        <div className="bg-slate-700 py-4 px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-pink-200 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/20">
                    <FaUserPlus className="text-slate-900 text-lg" />
                </div>
                <div>
                    <h1 className="text-white text-lg font-black tracking-tight uppercase leading-none">Visitor Entry</h1>
                    <p className="text-slate-400 text-[9px] tracking-widest uppercase font-bold mt-1">Consultation Lead</p>
                </div>
            </div>
            <div className="hidden sm:block bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                <span className="text-pink-200 text-[9px] font-black tracking-widest uppercase">Lead Gen v2.1</span>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50/80 p-4 rounded-xl border border-slate-100">
            <div>
              <label className={labelStyle}><FaUserTie className="text-pink-300"/> Consultant</label>
              <input type="text" value={formData.consultant} readOnly className={`${inputStyle} bg-white font-bold text-slate-400 cursor-not-allowed`} />
            </div>
            <div>
              <label className={labelStyle}><FaCalendarAlt className="text-pink-300"/> Date</label>
              <input type="date" value={formData.date} readOnly className={`${inputStyle} bg-white cursor-not-allowed`} />
            </div>
            <div>
              <label className={labelStyle}><FaClock className="text-pink-300"/> Time</label>
              <input type="text" value={formData.time} readOnly className={`${inputStyle} bg-white cursor-not-allowed`} />
            </div>
          </div>

          {/* Visitor Identity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 flex items-center gap-2 mb-1">
                <div className="h-4 w-1 bg-pink-300 rounded-full"></div>
                <h2 className="text-slate-900 font-bold text-[11px] uppercase tracking-wider">Visitor Identity</h2>
              </div>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className={inputStyle} />
              <input type="text" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required className={inputStyle} />
              <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className={inputStyle} />
              <input type="text" name="currentAddress" placeholder="Address / Location" value={formData.currentAddress} onChange={handleChange} className={inputStyle} />
          </div>

          {/* Visa Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 flex items-center gap-2 mb-1">
                    <div className="h-4 w-1 bg-pink-300 rounded-full"></div>
                    <h2 className="text-slate-900 font-bold text-[11px] uppercase tracking-wider">Service Requirements</h2>
                </div>
                <input type="text" name="profession" placeholder="Current Profession" value={formData.profession} onChange={handleChange} className={inputStyle} />
                
                <select name="nationality" value={formData.nationality} onChange={handleChange} className={inputStyle}>
                    <option value="">Select Nationality</option>
                    {nationalities.map((nat) => <option key={nat} value={nat}>{nat}</option>)}
                </select>

                <select name="visaType" value={formData.visaType} onChange={handleChange} required className={inputStyle}>
                    <option value="">Select Visa Type</option>
                    {visaTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>

                <div className="relative">
                    {isManualCountry || formData.visaType === "Student" || formData.visaType === "Others" ? (
                        <div className="relative">
                            <input type="text" name="interestedCountry" placeholder="Type Country..." value={formData.interestedCountry} onChange={handleChange} autoFocus required className={`${inputStyle} border-pink-100 bg-pink-50/30 font-bold text-pink-700`} />
                            {isManualCountry && (
                                <button type="button" onClick={() => { setIsManualCountry(false); setFormData(p => ({...p, interestedCountry: ""})) }} className="absolute right-3 top-2.5 text-pink-400 hover:text-pink-600 transition-colors">
                                    <FaUndo size={11}/>
                                </button>
                            )}
                        </div>
                    ) : (
                        <select name="interestedCountry" value={formData.interestedCountry} onChange={handleChange} className={inputStyle}>
                            <option value="">Interested Country</option>
                            {formData.visaType === "Visit" && (
                                <>
                                    <optgroup label="Europe">{visitVisaCountries.europe.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}</optgroup>
                                    <optgroup label="Other">{visitVisaCountries.other.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}</optgroup>
                                </>
                            )}
                            {formData.visaType === "Work" && interestedCountries.map((country) => <option key={country} value={country}>{country}</option>)}
                            {formData.visaType && <option value="Others" className="font-bold text-pink-500">-- Others (Manual Entry) --</option>}
                        </select>
                    )}
                </div>
          </div>

          {/* Remarks & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 flex items-center gap-2 mb-1">
                  <div className="h-4 w-1 bg-pink-300 rounded-full"></div>
                  <h2 className="text-slate-900 font-bold text-[11px] uppercase tracking-wider">Assessment & Remarks</h2>
              </div>
              <input type="text" name="paymentTerms" placeholder="Payment Terms Discussed" value={formData.paymentTerms} onChange={handleChange} className={inputStyle} />
              <select name="consultationStatus" value={formData.consultationStatus} onChange={handleChange} required className={`${inputStyle} font-bold text-pink-600`}>
                  <option value="">Consultation Status</option>
                  {consultationStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
              <textarea name="visitorComment" placeholder="Visitor Comments" value={formData.visitorComment} onChange={handleChange} rows="1" className={inputStyle} />
              <textarea name="remarks" placeholder="Internal Remarks" value={formData.remarks} onChange={handleChange} rows="1" className={inputStyle} />
          </div>

          <div className="pt-2">
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-200 text-slate-900 font-black py-4 rounded-xl shadow-xl shadow-pink-100 hover:bg-pink-300 transform transition-all active:scale-[0.98] disabled:opacity-50 tracking-[0.2em] text-[11px] uppercase"
            >
                {loading ? "Processing Database..." : "Create Visitor Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}