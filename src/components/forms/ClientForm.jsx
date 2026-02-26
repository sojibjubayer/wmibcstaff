import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaUser, FaPhone, FaPassport, FaGlobe, FaBriefcase,
  FaCalendarAlt, FaMoneyBillWave, FaFileAlt, FaHandshake, FaUndo, FaShieldAlt, FaFileSignature
} from "react-icons/fa";
import DatePicker from "react-datepicker";

const touristCountries = {
  europe: ["France", "Germany", "Italy", "Spain", "Greece", "Netherlands", "Switzerland", "Austria"],
  other: ["USA", "Canada", "Australia", "New Zealand", "United Kingdom", "Turkey", "Others"],
};

const workCountries = ["Greece", "Portugal", "Poland", "Bulgaria", "Croatia", "Serbia", "North Macedonia", "Cyprus", "Others"];

export default function ClientForm() {
  const inputStyle = "w-full border border-slate-200 bg-slate-50 rounded-xl p-3 text-slate-700 focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-100 transition duration-200 text-sm";
  const labelStyle = "flex items-center gap-2 mb-2 font-bold text-[10px] uppercase tracking-widest text-slate-400";

  const initialState = {
    clientName: "",
    contactNo: "",
    QID: "",
    passport: "",
    nationality: "",
    currentCountry: "",
    visaType: "",
    destinationCountry: "",
    trade: "",
    fileSubmissionDate: null,
    processingTime: "",
    totalServiceCharge: "",
    paymentTerms: "", // Restored
    amountReceived: {
      paymentType: "",
      amount: "",
      paymentDate: null,
      paymentMethod: "",
    },
    pendingBalance: "", 
    refundTerms: "", // Restored
    handover: "", // Restored
    applicationStatus: "",
    consultant: "",
    agreementPaper: "", // Restored
    remarksHistory: [],
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [isManualInput, setIsManualInput] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setFormData((prev) => ({
        ...prev,
        consultant: parsedUser.name || parsedUser.username || "",
      }));
    }
  }, []);

  const handleChange = (field, value) => {
    if (field === "destinationCountry" && value === "Others") {
      setIsManualInput(true);
      setFormData((prev) => ({ ...prev, [field]: "" }));
    } else if (field === "visaType") {
      setIsManualInput(false);
      setFormData((prev) => ({ ...prev, [field]: value, destinationCountry: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleAmountChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      amountReceived: { ...prev.amountReceived, [field]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dataToSend = { ...formData, amountReceived: [formData.amountReceived] };

    try {
      const response = await fetch("https://wmibcstaff-server.vercel.app/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to save client");
      toast.success("Client registered successfully!", {
        style: { background: '#0f172a', color: '#fff', borderRadius: '12px' }
      });
      setFormData({ ...initialState, consultant: formData.consultant });
      setIsManualInput(false);
    } catch (error) {
      toast.error(error.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 md:p-8 p-4">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-white overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-500 p-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-200 rounded-xl mb-3">
                <FaShieldAlt className="text-slate-900 text-xl" />
            </div>
            <h1 className="text-white text-2xl font-black tracking-tight uppercase">Client Registration Portal</h1>
            <p className="text-slate-400 text-xs mt-1 tracking-widest uppercase">Authorized Personnel Entry</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* SECTION 1: PERSONAL & VISA */}
          <div className="space-y-6">
            <h2 className="text-slate-900 font-bold border-l-4 border-pink-200 pl-3 text-sm">Identity & Location</h2>
            
            <div>
              <label className={labelStyle}><FaUser className="text-pink-300"/> Client Name</label>
              <input className={inputStyle} value={formData.clientName} onChange={(e) => handleChange("clientName", e.target.value)} required placeholder="Full Name" />
            </div>

            <div>
              <label className={labelStyle}><FaPhone className="text-pink-300"/> Contact No</label>
              <input className={inputStyle} value={formData.contactNo} onChange={(e) => handleChange("contactNo", e.target.value)} required placeholder="974 ..." />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelStyle}><FaPassport className="text-pink-300"/> Passport</label>
                <input className={inputStyle} value={formData.passport} onChange={(e) => handleChange("passport", e.target.value)} required />
              </div>
              <div>
                <label className={labelStyle}><FaPassport className="text-pink-300"/> QID</label>
                <input className={inputStyle} value={formData.QID} onChange={(e) => handleChange("QID", e.target.value)} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className={labelStyle}><FaGlobe className="text-pink-300"/> Nationality</label>
                    <select className={inputStyle} value={formData.nationality} onChange={(e) => handleChange("nationality", e.target.value)} required>
                        <option value="">Select</option>
                        {["Bangladeshi", "Pakistani", "Indian", "Nepali", "Filipino", "Moroccan", "African"].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>
                <div>
                    <label className={labelStyle}><FaGlobe className="text-pink-300"/> Current Loc</label>
                    <select className={inputStyle} value={formData.currentCountry} onChange={(e) => handleChange("currentCountry", e.target.value)} required>
                        <option value="">Select</option>
                        {["Qatar", "Bangladesh", "Saudi Arabia", "Oman", "Kuwait", "Singapore"].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>
          </div>

          {/* SECTION 2: VISA & SUBMISSION */}
          <div className="space-y-6">
            <h2 className="text-slate-900 font-bold border-l-4 border-pink-200 pl-3 text-sm">Visa & Processing</h2>
            
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className={labelStyle}><FaBriefcase className="text-pink-300"/> Visa Type</label>
                    <select className={inputStyle} value={formData.visaType} onChange={(e) => handleChange("visaType", e.target.value)} required>
                        <option value="">Type</option>
                        <option>Tourist</option>
                        <option>Work Permit</option>
                        <option>Student</option>
                    </select>
                </div>
                <div>
                    <div className="flex justify-between items-center">
                        <label className={labelStyle}><FaGlobe className="text-pink-300"/> Destination</label>
                        {isManualInput && (
                            <button type="button" onClick={() => setIsManualInput(false)} className="text-[9px] font-bold text-pink-400 flex items-center gap-1 hover:text-pink-600 mb-1">
                                <FaUndo size={7}/> RESET
                            </button>
                        )}
                    </div>
                    {isManualInput ? (
                        <input type="text" className={inputStyle} placeholder="Enter country" value={formData.destinationCountry} onChange={(e) => handleChange("destinationCountry", e.target.value)} autoFocus required />
                    ) : (
                        <select className={inputStyle} value={formData.destinationCountry} onChange={(e) => handleChange("destinationCountry", e.target.value)} required>
                            <option value="">Select</option>
                            {formData.visaType === "Tourist" && (
                                <>
                                    <optgroup label="Europe">{touristCountries.europe.map(c => <option key={c} value={c}>{c}</option>)}</optgroup>
                                    <optgroup label="Other">{touristCountries.other.map(c => <option key={c} value={c}>{c}</option>)}</optgroup>
                                </>
                            )}
                            {formData.visaType === "Work Permit" && workCountries.map(c => <option key={c} value={c}>{c}</option>)}
                            <option value="Others">Type Manually</option>
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className={labelStyle}><FaCalendarAlt className="text-pink-300"/> Submit Date</label>
                    <DatePicker selected={formData.fileSubmissionDate} onChange={(date) => handleChange("fileSubmissionDate", date)} dateFormat="dd/MM/yyyy" className={inputStyle} />
                </div>
                <div>
                    <label className={labelStyle}><FaCalendarAlt className="text-pink-300"/> Duration</label>
                    <input className={inputStyle} value={formData.processingTime} onChange={(e) => handleChange("processingTime", e.target.value)} placeholder="e.g. 6 Months" />
                </div>
            </div>

            <div>
                <label className={labelStyle}><FaFileAlt className="text-pink-300"/> Application Status</label>
                <select className={inputStyle} value={formData.applicationStatus} onChange={(e) => handleChange("applicationStatus", e.target.value)} required>
                    <option value="">Select Status</option>
                    <option>Ongoing</option>
                    <option>Offer Letter Received</option>
                    <option>Work Permit Received</option>
                    <option>Visa Received</option>
                </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className={labelStyle}><FaBriefcase className="text-pink-300"/> Trade</label>
                    <input className={inputStyle} value={formData.trade} onChange={(e) => handleChange("trade", e.target.value)} placeholder="Mason/Eng" />
                </div>
                <div>
                    <label className={labelStyle}><FaHandshake className="text-pink-300"/> Handover</label>
                    <input className={inputStyle} value={formData.handover} onChange={(e) => handleChange("handover", e.target.value)} placeholder="Status" />
                </div>
            </div>
          </div>

          {/* SECTION 3: FINANCE & AGREEMENT */}
          <div className="space-y-6">
            <h2 className="text-slate-900 font-bold border-l-4 border-pink-200 pl-3 text-sm">Finance & Agreement</h2>
            
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className={labelStyle}><FaMoneyBillWave className="text-pink-300"/> Total Charge</label>
                    <input type="number" className={inputStyle} value={formData.totalServiceCharge} onChange={(e) => handleChange("totalServiceCharge", e.target.value)} required />
                </div>
                <div>
                    <label className={labelStyle}><FaFileSignature className="text-pink-300"/> Agreement</label>
                    <select className={inputStyle} value={formData.agreementPaper} onChange={(e) => handleChange("agreementPaper", e.target.value)} required>
                        <option value="">Status</option>
                        <option>Pending</option>
                        <option>Handed Over</option>
                        <option>Not Required</option>
                    </select>
                </div>
            </div>

            {/* Payment Box */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-pink-50 space-y-3">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-2">Initial Collection</p>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-[9px] font-bold text-slate-400">Paid</label>
                        <input type="number" className={inputStyle} value={formData.amountReceived.amount} onChange={(e) => handleAmountChange("amount", e.target.value)} />
                    </div>
                    <div>
                        <label className="text-[9px] font-bold text-pink-400">Pending</label>
                        <input type="number" className={`${inputStyle} border-pink-100 bg-pink-50/50`} value={formData.pendingBalance} onChange={(e) => handleChange("pendingBalance", e.target.value)} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <select className={inputStyle} value={formData.amountReceived.paymentMethod} onChange={(e) => handleAmountChange("paymentMethod", e.target.value)}>
                        <option value="">Method</option>
                        <option>Cash</option><option>Card</option><option>Bank</option>
                    </select>
                    <DatePicker selected={formData.amountReceived.paymentDate} onChange={(date) => handleAmountChange("paymentDate", date)} dateFormat="dd/MM/yyyy" className={inputStyle} placeholderText="Date" />
                </div>
            </div>

            <div>
                <label className={labelStyle}>Payment Terms</label>
                <input className={inputStyle} value={formData.paymentTerms} onChange={(e) => handleChange("paymentTerms", e.target.value)} placeholder="e.g. 2000-5000-23000" />
            </div>

            <div>
                <label className={labelStyle}>Refund Terms</label>
                <input className={inputStyle} value={formData.refundTerms} onChange={(e) => handleChange("refundTerms", e.target.value)} placeholder="Terms of refund" />
            </div>
          </div>

          {/* FOOTER: REMARKS & SUBMIT */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-slate-50">
             <div className="md:col-span-2">
                <label className={labelStyle}><FaFileAlt className="text-pink-300"/> Internal Remarks</label>
                <textarea rows="2" className={inputStyle} placeholder="General notes..." value={formData.remarksHistory[0]?.text || ""} onChange={(e) => {
                    const val = e.target.value;
                    setFormData(prev => ({ ...prev, remarksHistory: val ? [{ text: val, date: new Date() }] : [] }));
                  }}
                />
             </div>
             <div>
                <label className={labelStyle}>Consultant In Charge</label>
                <input className={inputStyle + " bg-slate-100 font-bold text-slate-400 cursor-not-allowed"} value={formData.consultant} readOnly />
                
                <button type="submit" disabled={loading} className="w-full mt-4 bg-pink-200 text-slate-900 font-black py-4 rounded-xl shadow-lg shadow-pink-100 hover:bg-pink-300 transition-all active:scale-95 disabled:opacity-50 text-sm uppercase">
                    {loading ? "Processing..." : "Register Client"}
                </button>
             </div>
          </div>
        </form>
      </div>
    </div>
  );
}