import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSave, FaTrash, FaPlus, FaCalendarAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const COUNTRIES = ["Qatar", "UAE", "Saudi Arabia", "Kuwait", "Oman", "Bahrain", "Poland", "Romania", "Croatia", "Malta", "UK", "Canada", "Other"];
const AGREEMENT_OPTIONS = ["Pending", "Not Required", "Handed over to Client"];
const PAYMENT_TYPES = ["1st Payment", "2nd Payment", "Final Payment", "Due Payment", "Refund"];
const PAYMENT_METHODS = ["Cash", "Bank Transfer", "Card Payment", "Cheque"];

export default function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  
  // State for adding a new payment (Includes Date)
  const [newPayment, setNewPayment] = useState({ 
    paymentType: "", 
    amount: "", 
    paymentMethod: "",
    paymentDate: new Date() 
  });

  useEffect(() => {
    fetch(`https://wmibcstaff-server.vercel.app/api/clients/${id}`)
      .then(res => res.json())
      .then(data => setFormData({
        ...data,
        amountReceived: Array.isArray(data.amountReceived) ? data.amountReceived : [],
        fileSubmissionDate: data.fileSubmissionDate ? new Date(data.fileSubmissionDate) : null
      }))
      .catch(() => toast.error("Error loading data"));
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`https://wmibcstaff-server.vercel.app/api/clients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Client Updated Successfully!");
        setTimeout(() => navigate(`/client-details/${id}`), 1000);
      }
    } catch (err) { toast.error("Failed to update"); }
  };

  const addPayment = () => {
    if (!newPayment.paymentType || !newPayment.amount || !newPayment.paymentMethod) {
      return toast.error("Fill all payment fields including method");
    }
    const updated = [
      ...formData.amountReceived, 
      { 
        ...newPayment, 
        amount: Number(newPayment.amount), 
        paymentDate: newPayment.paymentDate.toISOString() 
      }
    ];
    setFormData({ ...formData, amountReceived: updated });
    // Reset payment adder
    setNewPayment({ paymentType: "", amount: "", paymentMethod: "", paymentDate: new Date() });
    toast.success("Payment added to list");
  };

  if (!formData) return <div className="p-20 text-center font-bold text-amber-600 uppercase">Loading Client Data...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <Toaster />
      <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-xl border border-amber-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-amber-500 p-8 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight">Edit Client</h1>
            <p className="text-white/80 text-xs font-bold uppercase tracking-widest">{formData.clientName}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate(-1)} className="bg-white/20 p-2 px-6 rounded-xl text-xs font-black uppercase hover:bg-white/30 transition-all">Cancel</button>
            <button onClick={handleUpdate} className="bg-slate-900 p-2 px-6 rounded-xl text-xs font-black uppercase shadow-lg hover:scale-105 transition-all">Save Changes</button>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* COLUMN 1: IDENTITY */}
            <div className="space-y-5">
              <h3 className="text-amber-600 font-black text-[10px] uppercase border-b pb-2 tracking-widest">Identity</h3>
              <EditField label="Full Name" value={formData.clientName} onChange={(v) => setFormData({...formData, clientName: v})} />
              <EditField label="Contact No" value={formData.contactNo} onChange={(v) => setFormData({...formData, contactNo: v})} />
              <EditField label="Current Passport" value={formData.passport} onChange={(v) => setFormData({...formData, passport: v})} />
              <EditField label="New Passport" value={formData.newPassport} onChange={(v) => setFormData({...formData, newPassport: v})} />
              <EditField label="Nationality" value={formData.nationality} onChange={(v) => setFormData({...formData, nationality: v})} />
              <EditField label="QID Number" value={formData.QID} onChange={(v) => setFormData({...formData, QID: v})} />
            </div>

            {/* COLUMN 2: JOURNEY TRACKING */}
            <div className="space-y-5">
              <h3 className="text-amber-600 font-black text-[10px] uppercase border-b pb-2 tracking-widest">Journey Tracking</h3>
              <EditSelect label="Current Country" value={formData.currentCountry} options={COUNTRIES} onChange={(v) => setFormData({...formData, currentCountry: v})} />
              <EditField label="Original Destination" value={formData.destinationCountry} onChange={(v) => setFormData({...formData, destinationCountry: v})} />
              <EditField label="Changed Destination" value={formData.changedDestination} onChange={(v) => setFormData({...formData, changedDestination: v})} />
              <EditField label="Visa Type" value={formData.visaType} onChange={(v) => setFormData({...formData, visaType: v})} />
              <EditField label="Trade / Job" value={formData.trade} onChange={(v) => setFormData({...formData, trade: v})} />
              <div className="p-2 border-b border-gray-100">
                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">File Submission Date</p>
                <DatePicker selected={formData.fileSubmissionDate} onChange={(d) => setFormData({...formData, fileSubmissionDate: d})} className="w-full text-sm font-bold bg-amber-50 p-2 rounded-lg outline-none" dateFormat="dd/MM/yyyy" />
              </div>
            </div>

            {/* COLUMN 3: ACCOUNTS (MANUAL DUE INPUT) */}
            <div className="bg-slate-50 p-6 rounded-4xl border border-amber-100 shadow-inner">
              <h3 className="text-slate-800 font-black text-[10px] uppercase border-b pb-3 mb-5 tracking-widest">Accounts Ledger</h3>
              
              <EditField label="Total Service Charge" value={formData.totalServiceCharge} onChange={(v) => setFormData({...formData, totalServiceCharge: v})} />
              
              {/* Manual Due Field as requested */}
              <EditField label="Outstanding Due Amount" value={formData.paymentDue} onChange={(v) => setFormData({...formData, paymentDue: v})} />

              {/* History List */}
              <div className="space-y-2 mt-6 max-h-40 overflow-y-auto pr-2">
                {formData.amountReceived.map((pay, i) => (
                  <div key={i} className="flex justify-between items-center bg-white p-3 rounded-xl text-[10px] border border-amber-50 shadow-sm">
                    <div>
                      <p className="font-bold text-slate-700">{pay.paymentType}</p>
                      <p className="text-[8px] text-gray-400 uppercase">{new Date(pay.paymentDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-emerald-600">{pay.amount} QAR</span>
                      <button onClick={() => {
                        const up = formData.amountReceived.filter((_, idx) => idx !== i);
                        setFormData({...formData, amountReceived: up});
                      }} className="text-red-400 hover:text-red-600"><FaTrash size={12}/></button>
                    </div>
                  </div>
                ))}
              </div>

              {/* PAYMENT ADDER (WITH DATE PICKER) */}
              <div className="mt-6 p-4 bg-white rounded-2xl border-2 border-dashed border-amber-200 space-y-3">
                <div className="flex gap-2">
                  <select className="flex-1 text-[10px] font-bold p-2 border rounded-lg bg-slate-50" value={newPayment.paymentType} onChange={(e) => setNewPayment({...newPayment, paymentType: e.target.value})}>
                    <option value="">Type</option>
                    {PAYMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <select className="flex-1 text-[10px] font-bold p-2 border rounded-lg bg-slate-50" value={newPayment.paymentMethod} onChange={(e) => setNewPayment({...newPayment, paymentMethod: e.target.value})}>
                    <option value="">Method</option>
                    {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 border rounded-lg p-2">
                  <FaCalendarAlt className="text-amber-500 text-xs" />
                  <DatePicker 
                    selected={newPayment.paymentDate} 
                    onChange={(date) => setNewPayment({...newPayment, paymentDate: date})} 
                    className="bg-transparent text-[10px] font-bold outline-none w-full"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>

                <input type="number" placeholder="Amount (QAR)" className="w-full text-[10px] font-bold p-2 border rounded-lg" value={newPayment.amount} onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})} />

                <button onClick={addPayment} className="w-full bg-amber-500 text-white py-2 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2 hover:bg-amber-600 transition-all">
                  <FaPlus size={10}/> Add Payment
                </button>
              </div>
            </div>
          </div>

          {/* BOTTOM GRID: STATUS & REMARKS */}
          <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-6">
             <EditSelect label="Agreement" value={formData.agreementPaper} options={AGREEMENT_OPTIONS} onChange={(v) => setFormData({...formData, agreementPaper: v})} />
             <EditField label="Handover Status" value={formData.handover} onChange={(v) => setFormData({...formData, handover: v})} />
             <EditField label="Refund Policy" value={formData.refundTerms} onChange={(v) => setFormData({...formData, refundTerms: v})} />
             <EditField label="Application Status" value={formData.applicationStatus} onChange={(v) => setFormData({...formData, applicationStatus: v})} />
             
             <div className="md:col-span-4 mt-6">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Office Remarks</p>
                <textarea className="w-full p-5 bg-amber-50 border border-amber-100 rounded-3xl text-sm outline-none focus:ring-1 focus:ring-amber-300" rows="4" value={formData.remarks} onChange={(e) => setFormData({...formData, remarks: e.target.value})} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const EditField = ({ label, value, onChange }) => (
  <div className="p-2 border-b border-gray-100">
    <p className="text-[9px] font-black text-gray-400 uppercase mb-1">{label}</p>
    <input type="text" className="w-full text-sm font-bold bg-amber-50 p-2 rounded-lg outline-none focus:ring-1 focus:ring-amber-300" value={value || ""} onChange={(e) => onChange(e.target.value)} />
  </div>
);

const EditSelect = ({ label, value, options, onChange }) => (
  <div className="p-2 border-b border-gray-100">
    <p className="text-[9px] font-black text-gray-400 uppercase mb-1">{label}</p>
    <select className="w-full text-sm font-bold bg-amber-50 p-2 rounded-lg outline-none" value={value || ""} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);