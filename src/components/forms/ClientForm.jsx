import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaUser,
  FaPhone,
  FaPassport,
  FaGlobe,
  FaBriefcase,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaFileAlt,
  FaHandshake,
} from "react-icons/fa";
import DatePicker from "react-datepicker";

const touristCountries = {
  europe: ["France", "Germany", "Italy", "Spain", "Greece", "Netherlands", "Switzerland", "Austria"],
  other: ["USA", "Canada", "Australia", "New Zealand", "United Kingdom", "Turkey"],
};

const workCountries = ["Greece", "Portugal", "Poland", "Bulgaria", "Croatia", "Serbia", "North Macedonia", "Cyprus"];

export default function ClientForm() {
  const inputStyle = "w-full border border-gray-300 rounded-lg p-2 text-gray-800 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition duration-200";
  const labelStyle = "flex items-center gap-2 mb-2 font-medium text-emerald-600";

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
    paymentTerms: "",
    // Changed to reflect a single payment entry for the form
    amountReceived: {
      paymentType: "",
      amount: "",
      paymentDate: null,
      paymentMethod: "",
    },
    paymentDue: "",
    refundTerms: "",
    handover: "",
    applicationStatus: "",
    consultant: "",
    agreementPaper: "",
    remarks: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

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
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "visaType" && { destinationCountry: "" }),
    }));
  };

  const handleAmountChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      amountReceived: {
        ...prev.amountReceived,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // FIX: Wrap the amountReceived object into an ARRAY before sending to server
    // This matches your "Md Arif Khan Record" structure which expects an array
    const dataToSend = {
      ...formData,
      amountReceived: [formData.amountReceived] 
    };

    try {
      const response = await fetch(
        "https://wmibcstaff-server.vercel.app/api/clients",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend), // Send fixed data
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to save client");

      toast.success("Client added successfully!");
      const currentConsultant = formData.consultant;
      setFormData({ ...initialState, consultant: currentConsultant });
    } catch (error) {
      toast.error(error.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 md:p-6 p-2">
      <Toaster position="top-center" />
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="bg-emerald-500 text-white p-3 rounded-t-lg text-2xl font-bold mb-8 text-center">
          Client Registration Form
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Identity Fields */}
          <div>
            <label className={labelStyle}><FaUser /> Client Name</label>
            <input className={inputStyle} value={formData.clientName} onChange={(e) => handleChange("clientName", e.target.value)} required />
          </div>

          <div>
            <label className={labelStyle}><FaPhone /> Contact Number</label>
            <input className={inputStyle} value={formData.contactNo} onChange={(e) => handleChange("contactNo", e.target.value)} required />
          </div>

          <div>
            <label className={labelStyle}><FaPassport /> Passport Number</label>
            <input className={inputStyle} value={formData.passport} onChange={(e) => handleChange("passport", e.target.value)} required />
          </div>

          <div>
            <label className={labelStyle}><FaPassport /> QID Number</label>
            <input className={inputStyle} value={formData.QID} onChange={(e) => handleChange("QID", e.target.value)} required />
          </div>

          {/* Location & Visa */}
          <div>
            <label className={labelStyle}><FaGlobe /> Nationality</label>
            <select className={inputStyle} value={formData.nationality} onChange={(e) => handleChange("nationality", e.target.value)} required>
              <option value="">Select Nationality</option>
              {["Bangladeshi", "Pakistani", "Indian", "Nepali", "Filipino", "Moroccan", "African"].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div>
            <label className={labelStyle}><FaGlobe /> Current Country</label>
            <select className={inputStyle} value={formData.currentCountry} onChange={(e) => handleChange("currentCountry", e.target.value)} required>
              <option value="">Select Country</option>
              {["Qatar", "Bangladesh", "Saudi Arabia", "Oman", "Kuwait", "Singapore"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className={labelStyle}><FaBriefcase /> Visa Type</label>
            <select className={inputStyle} value={formData.visaType} onChange={(e) => handleChange("visaType", e.target.value)} required>
              <option value="">Select Type</option>
              <option>Tourist</option>
              <option>Work Permit</option>
              <option>Student</option>
            </select>
          </div>

          {/* Destination Logic */}
          <div>
            <label className={labelStyle}><FaGlobe /> Destination Country</label>
            {formData.visaType === "Tourist" ? (
              <select className={inputStyle} value={formData.destinationCountry} onChange={(e) => handleChange("destinationCountry", e.target.value)} required>
                <option value="">Select Country</option>
                <optgroup label="Europe">{touristCountries.europe.map(c => <option key={c} value={c}>{c}</option>)}</optgroup>
                <optgroup label="Other">{touristCountries.other.map(c => <option key={c} value={c}>{c}</option>)}</optgroup>
              </select>
            ) : formData.visaType === "Work Permit" ? (
              <select className={inputStyle} value={formData.destinationCountry} onChange={(e) => handleChange("destinationCountry", e.target.value)} required>
                <option value="">Select Country</option>
                {workCountries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            ) : (
              <input type="text" className={inputStyle} placeholder="Enter Destination" value={formData.destinationCountry} onChange={(e) => handleChange("destinationCountry", e.target.value)} required />
            )}
          </div>

          {/* Dates and Times */}
          <div>
            <label className={labelStyle}><FaCalendarAlt /> File Submission Date</label>
            <DatePicker selected={formData.fileSubmissionDate} onChange={(date) => handleChange("fileSubmissionDate", date)} dateFormat="dd/MM/yyyy" className={inputStyle} placeholderText="dd/mm/yyyy" />
          </div>

          <div>
            <label className={labelStyle}><FaCalendarAlt /> Processing Time</label>
            <input className={inputStyle} value={formData.processingTime} onChange={(e) => handleChange("processingTime", e.target.value)} placeholder="e.g. 3 Months" required />
          </div>

          {/* FINANCE SECTION - FIXED MAPPINGS */}
          <div>
            <label className={labelStyle}><FaMoneyBillWave /> Total Service Charge</label>
            <input type="number" className={inputStyle} value={formData.totalServiceCharge} onChange={(e) => handleChange("totalServiceCharge", e.target.value)} required />
          </div>

          <div>
            <label className={labelStyle}><FaMoneyBillWave /> Payment Terms</label>
            <input className={inputStyle} value={formData.paymentTerms} onChange={(e) => handleChange("paymentTerms", e.target.value)} required />
          </div>

          {/* Amount Received Sub-fields */}
          <div>
            <label className={labelStyle}><FaMoneyBillWave /> Amount Received</label>
            <div className="flex gap-2">
              <select className="w-1/2 border border-gray-300 rounded-lg p-2" value={formData.amountReceived.paymentType} onChange={(e) => handleAmountChange("paymentType", e.target.value)}>
                <option value="">Type</option>
                <option>1st Payment</option>
                <option>Full Payment</option>
              </select>
              <input type="number" className="w-1/2 border border-gray-300 rounded-lg p-2" placeholder="Amount" value={formData.amountReceived.amount} onChange={(e) => handleAmountChange("amount", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}><FaCalendarAlt /> Payment Date</label>
              <DatePicker selected={formData.amountReceived.paymentDate} onChange={(date) => handleAmountChange("paymentDate", date)} dateFormat="dd/MM/yyyy" className={inputStyle} placeholderText="dd/mm/yyyy" />
            </div>
            <div>
              <label className={labelStyle}>Payment Method</label>
              <select 
                className={inputStyle} 
                // FIXED: was formData.paymentMethod, now handleAmountChange updates amountReceived object
                value={formData.amountReceived.paymentMethod} 
                onChange={(e) => handleAmountChange("paymentMethod", e.target.value)}
              >
                <option value="">Select Method</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Bank">Bank</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelStyle}><FaMoneyBillWave /> Payment Due</label>
            <input type="number" className={inputStyle} value={formData.paymentDue} onChange={(e) => handleChange("paymentDue", e.target.value)} required />
          </div>

          {/* Rest of the fields */}
          <div>
            <label className={labelStyle}><FaFileAlt /> Refund Terms</label>
            <input className={inputStyle} value={formData.refundTerms} onChange={(e) => handleChange("refundTerms", e.target.value)} required />
          </div>

          <div>
            <label className={labelStyle}><FaBriefcase /> Trade</label>
            <input className={inputStyle} value={formData.trade} onChange={(e) => handleChange("trade", e.target.value)} required />
          </div>

          <div>
            <label className={labelStyle}><FaHandshake /> Handover</label>
            <input className={inputStyle} value={formData.handover} onChange={(e) => handleChange("handover", e.target.value)} required />
          </div>

          <div>
            <label className={labelStyle}><FaFileAlt /> Application Status</label>
            <input className={inputStyle} value={formData.applicationStatus} onChange={(e) => handleChange("applicationStatus", e.target.value)} />
          </div>

          <div>
            <label className={labelStyle}><FaGlobe /> Consultant</label>
            <input className={inputStyle + " bg-gray-50 cursor-not-allowed"} value={formData.consultant} readOnly />
          </div>

          <div>
            <label className={labelStyle}><FaGlobe /> Agreement Paper</label>
            <select className={inputStyle} value={formData.agreementPaper} onChange={(e) => handleChange("agreementPaper", e.target.value)} required>
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelStyle}><FaFileAlt /> Remarks</label>
            <textarea rows="3" className={inputStyle} value={formData.remarks} onChange={(e) => handleChange("remarks", e.target.value)} />
          </div>

          <div className="md:col-span-2 mt-6">
            <button type="submit" disabled={loading} className="w-full md:w-1/2 mx-auto block bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-emerald-600 transition-all disabled:opacity-50">
              {loading ? "Processing..." : "Register Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}