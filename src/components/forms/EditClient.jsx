import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaTrash,
  FaPlus,
  FaCalendarAlt,
  FaUserEdit,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const COUNTRIES = [
  "Qatar",
  "UAE",
  "Saudi Arabia",
  "Kuwait",
  "Oman",
  "Bahrain",
  "Poland",
  "Romania",
  "Croatia",
  "Malta",
  "UK",
  "Canada",
  "Other",
];

const AGREEMENT_OPTIONS = ["Pending", "Not Required", "Handed over to Client"];

const PAYMENT_TYPES = [
  "1st Payment",
  "2nd Payment",
  "Final Payment",
  "Pending Balance",
  "Refund",
];

const PAYMENT_METHODS = ["Cash", "Bank Transfer", "Card Payment", "Cheque"];

const CURRENCY_OPTIONS = ["Riyal", "BDT"];

export default function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStaff, setCurrentStaff] = useState("Staff Member");

  const [newPayment, setNewPayment] = useState({
    paymentType: "",
    amount: "",
    paymentMethod: "",
    paymentDate: new Date(),
  });

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");

      if (userData) {
        const parsedUser = JSON.parse(userData);
        setCurrentStaff(parsedUser.name || "Staff Member");
      }
    } catch (err) {
      console.error("Auth parsing error:", err);
    }
  }, []);

  useEffect(() => {
    setLoading(true);

    fetch(`https://wmibcstaff-server.vercel.app/api/clients/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Client not found");
        return res.json();
      })
      .then((data) => {
        setFormData({
          ...data,
          currency: data.currency || "Riyal",
          paymentTerms: data.paymentTerms || "",
          amountReceived: Array.isArray(data.amountReceived)
            ? data.amountReceived
            : [],
          fileSubmissionDate: data.fileSubmissionDate
            ? new Date(data.fileSubmissionDate)
            : null,
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error loading client data");
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async () => {
    let currentStaffName = "Unknown Staff";

    try {
      const userData = localStorage.getItem("user");

      if (userData) {
        const parsedUser = JSON.parse(userData);
        currentStaffName = parsedUser.name || "Unknown Staff";
      }
    } catch (err) {
      console.error("Auth parsing error:", err);
    }

    const newLogEntry = {
      name: currentStaffName,
      date: new Date().toISOString(),
    };

    const finalData = {
      ...formData,
      updatedBy: [...(formData.updatedBy || []), newLogEntry],
    };

    try {
      const res = await fetch(
        `https://wmibcstaff-server.vercel.app/api/clients/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update");
      }

      toast.success("Client Updated Successfully!");

      setTimeout(() => {
        navigate(`/client-details/${id}`);
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    }
  };

  const addPayment = () => {
    if (
      !newPayment.paymentType ||
      !newPayment.amount ||
      !newPayment.paymentMethod
    ) {
      return toast.error("Fill all payment fields including method");
    }

    const updatedPayments = [
      ...(formData.amountReceived || []),
      {
        ...newPayment,
        amount: Number(newPayment.amount),
        paymentDate: newPayment.paymentDate.toISOString(),
      },
    ];

    setFormData({
      ...formData,
      amountReceived: updatedPayments,
    });

    setNewPayment({
      paymentType: "",
      amount: "",
      paymentMethod: "",
      paymentDate: new Date(),
    });

    toast.success("Payment added to list");
  };

  if (loading || !formData) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-50">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-yellow-400"></div>

        <p className="animate-pulse text-xs font-bold uppercase tracking-widest text-slate-500">
          Fetching Profile for Editing...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <Toaster />

      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-amber-100 bg-white shadow-xl">
        <div className="flex items-center justify-between bg-amber-200 p-8 text-gray-700">
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-tight">
              Edit Client
            </h1>

            <div className="mt-1 flex items-center gap-2">
              <FaUserEdit className="text-amber-600" />

              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                Editing as:{" "}
                <span className="text-slate-900">{currentStaff}</span>
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl border border-red-100 bg-white/50 p-2 px-6 text-xs font-black uppercase transition-all hover:bg-red-200"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleUpdate}
              className="rounded-xl bg-slate-900 p-2 px-6 text-xs font-black uppercase text-white shadow-lg transition-all hover:scale-105"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* IDENTITY */}
            <div className="space-y-5">
              <h3 className="border-b pb-2 text-[10px] font-black uppercase tracking-widest text-amber-600">
                Identity
              </h3>

              <EditField
                label="Full Name"
                value={formData.clientName}
                onChange={(v) => setFormData({ ...formData, clientName: v })}
              />

              <EditField
                label="Contact No"
                value={formData.contactNo}
                onChange={(v) => setFormData({ ...formData, contactNo: v })}
              />

              <EditField
                label="Current Passport"
                value={formData.passport}
                onChange={(v) => setFormData({ ...formData, passport: v })}
              />

              <EditField
                label="New Passport"
                value={formData.newPassport}
                onChange={(v) => setFormData({ ...formData, newPassport: v })}
              />

              <EditField
                label="Nationality"
                value={formData.nationality}
                onChange={(v) => setFormData({ ...formData, nationality: v })}
              />

              <EditField
                label="QID Number"
                value={formData.QID || formData.ID}
                onChange={(v) =>
                  setFormData({
                    ...formData,
                    QID: v,
                    ID: v,
                  })
                }
              />
            </div>

            {/* JOURNEY */}
            <div className="space-y-5">
              <h3 className="border-b pb-2 text-[10px] font-black uppercase tracking-widest text-amber-600">
                Journey Tracking
              </h3>

              <EditSelect
                label="Current Country"
                value={formData.currentCountry}
                options={COUNTRIES}
                onChange={(v) =>
                  setFormData({ ...formData, currentCountry: v })
                }
              />

              <EditField
                label="Original Destination"
                value={formData.destinationCountry}
                onChange={(v) =>
                  setFormData({ ...formData, destinationCountry: v })
                }
              />

              <EditField
                label="Changed Destination"
                value={formData.changedDestination}
                onChange={(v) =>
                  setFormData({ ...formData, changedDestination: v })
                }
              />

              <EditField
                label="Visa Type"
                value={formData.visaType}
                onChange={(v) => setFormData({ ...formData, visaType: v })}
              />

              <EditField
                label="Trade / Job"
                value={formData.trade}
                onChange={(v) => setFormData({ ...formData, trade: v })}
              />

              <div className="border-b border-gray-100 p-2">
                <p className="mb-1 text-[9px] font-black uppercase text-gray-400">
                  File Submission Date
                </p>

                <DatePicker
                  selected={formData.fileSubmissionDate}
                  onChange={(d) =>
                    setFormData({ ...formData, fileSubmissionDate: d })
                  }
                  className="w-full rounded-lg bg-amber-50 p-2 text-sm font-bold outline-none"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>

            {/* ACCOUNTS */}
            <div className="rounded-4xl border border-amber-100 bg-slate-50 p-6 shadow-inner">
              <h3 className="mb-5 border-b pb-3 text-[10px] font-black uppercase tracking-widest text-slate-800">
                Accounts Ledger
              </h3>

              <EditSelect
                label="Currency"
                value={formData.currency}
                options={CURRENCY_OPTIONS}
                onChange={(v) => setFormData({ ...formData, currency: v })}
              />

              <EditField
                label={`Total Service Charge (${formData.currency || "Riyal"})`}
                value={formData.totalServiceCharge}
                onChange={(v) =>
                  setFormData({ ...formData, totalServiceCharge: v })
                }
              />

              <EditField
                label="Payment Terms"
                value={formData.paymentTerms}
                onChange={(v) =>
                  setFormData({ ...formData, paymentTerms: v })
                }
              />

              <EditField
                label={`Pending Balance (${formData.currency || "Riyal"})`}
                value={formData.pendingBalance}
                onChange={(v) =>
                  setFormData({ ...formData, pendingBalance: v })
                }
              />

              <div className="mt-6 max-h-40 space-y-2 overflow-y-auto pr-2">
                {(formData.amountReceived || []).map((pay, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-amber-50 bg-white p-3 text-[10px] shadow-sm"
                  >
                    <div>
                      <p className="font-bold text-slate-700">
                        {pay.paymentType}
                      </p>

                      <p className="text-[8px] uppercase text-gray-400">
                        {pay.paymentDate
                          ? new Date(pay.paymentDate).toLocaleDateString()
                          : "No Date"}
                      </p>

                      <p className="text-[8px] uppercase text-gray-400">
                        {pay.paymentMethod}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-black text-emerald-600">
                        {pay.amount} {formData.currency || "Riyal"}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          const updatedPayments = formData.amountReceived.filter(
                            (_, idx) => idx !== i,
                          );

                          setFormData({
                            ...formData,
                            amountReceived: updatedPayments,
                          });
                        }}
                        className="text-red-400 hover:text-red-600"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 rounded-2xl border-2 border-dashed border-amber-200 bg-white p-4">
                <div className="flex gap-2">
                  <select
                    className="flex-1 rounded-lg border bg-slate-50 p-2 text-[10px] font-bold outline-none"
                    value={newPayment.paymentType}
                    onChange={(e) =>
                      setNewPayment({
                        ...newPayment,
                        paymentType: e.target.value,
                      })
                    }
                  >
                    <option value="">Type</option>

                    {PAYMENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>

                  <select
                    className="flex-1 rounded-lg border bg-slate-50 p-2 text-[10px] font-bold outline-none"
                    value={newPayment.paymentMethod}
                    onChange={(e) =>
                      setNewPayment({
                        ...newPayment,
                        paymentMethod: e.target.value,
                      })
                    }
                  >
                    <option value="">Method</option>

                    {PAYMENT_METHODS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 rounded-lg border bg-slate-50 p-2">
                  <FaCalendarAlt className="text-xs text-amber-500" />

                  <DatePicker
                    selected={newPayment.paymentDate}
                    onChange={(date) =>
                      setNewPayment({ ...newPayment, paymentDate: date })
                    }
                    className="w-full bg-transparent text-[10px] font-bold outline-none"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>

                <input
                  type="number"
                  placeholder={`Amount (${formData.currency || "Riyal"})`}
                  className="w-full rounded-lg border p-2 text-[10px] font-bold outline-none"
                  value={newPayment.amount}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, amount: e.target.value })
                  }
                  onWheel={(e) => e.target.blur()}
                />

                <button
                  type="button"
                  onClick={addPayment}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-2 text-[10px] font-black uppercase text-white shadow-md transition-all hover:bg-amber-600"
                >
                  <FaPlus size={10} /> Add Payment
                </button>
              </div>
            </div>
          </div>

          {/* BOTTOM DETAILS */}
          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-slate-100 pt-8 md:grid-cols-4">
            <EditSelect
              label="Agreement"
              value={formData.agreementPaper}
              options={AGREEMENT_OPTIONS}
              onChange={(v) => setFormData({ ...formData, agreementPaper: v })}
            />

            <EditField
              label="Handover Status"
              value={formData.handover}
              onChange={(v) => setFormData({ ...formData, handover: v })}
            />

            <EditField
              label="Refund Policy"
              value={formData.refundTerms}
              onChange={(v) => setFormData({ ...formData, refundTerms: v })}
            />

            <EditField
              label="Application Status"
              value={formData.applicationStatus}
              onChange={(v) =>
                setFormData({ ...formData, applicationStatus: v })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const EditField = ({ label, value, onChange }) => (
  <div className="border-b border-gray-100 p-2">
    <p className="mb-1 text-[9px] font-black uppercase text-gray-400">
      {label}
    </p>

    <input
      type="text"
      className="w-full rounded-lg bg-amber-50 p-2 text-sm font-bold outline-none focus:ring-1 focus:ring-amber-300"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const EditSelect = ({ label, value, options, onChange }) => (
  <div className="border-b border-gray-100 p-2">
    <p className="mb-1 text-[9px] font-black uppercase text-gray-400">
      {label}
    </p>

    <select
      className="w-full rounded-lg bg-amber-50 p-2 text-sm font-bold outline-none"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select</option>

      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);