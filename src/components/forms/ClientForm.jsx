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
  FaUndo,
  FaShieldAlt,
  FaFileSignature,
} from "react-icons/fa";
import DatePicker from "react-datepicker";

const touristCountries = {
  europe: [
    "France",
    "Germany",
    "Italy",
    "Spain",
    "Greece",
    "Netherlands",
    "Switzerland",
    "Austria",
  ],
  other: [
    "USA",
    "Canada",
    "Australia",
    "New Zealand",
    "United Kingdom",
    "Turkey",
  ],
};

const workCountries = [
  "Greece",
  "Portugal",
  "Poland",
  "Bulgaria",
  "Croatia",
  "Serbia",
  "North Macedonia",
  "Cyprus",
];

const MAX_FILE_SIZE_MB = 20;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function ClientForm() {
  const inputStyle =
    "w-full rounded-2xl border border-white/10 bg-slate-950/45 p-3 text-sm text-white placeholder:text-blue-100/35 shadow-inner shadow-blue-950/20 outline-none transition duration-200 focus:border-sky-300/70 focus:bg-slate-950/65 focus:ring-4 focus:ring-sky-400/20";
  const labelStyle =
    "flex items-center gap-2 mb-2 font-black text-[10px] uppercase tracking-widest text-blue-100/60";

  const initialState = {
    clientName: "",
    contactNo: "",
    ID: "", 
    passport: "",
    nationality: "",
    currentCountry: "",
    visaType: "",
    destinationCountry: "",
    trade: "",
    fileSubmissionDate: null,
    processingTime: "",
    currency: "Riyal",
    totalServiceCharge: "",
    paymentTerms: "",
    amountReceived: {
      paymentType: "",
      amount: "",
      paymentDate: null,
      paymentMethod: "",
    },
    pendingBalance: "",
    refundTerms: "",
    handover: "",
    applicationStatus: "",
    consultant: "",
    agreementPaper: "",
    agreementFile: "",
    remarksHistory: [],
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [isManualInput, setIsManualInput] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
      setFormData((prev) => ({
        ...prev,
        [field]: value,
        destinationCountry: "",
      }));
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

  const uploadFileWithProgress = (url, file) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Content-Type", file.type || "application/pdf");

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadProgress(100);
          resolve();
        } else {
          reject(new Error(`Failed to upload PDF: ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error("Network error while uploading PDF"));
      };

      xhr.send(file);
    });

  const uploadPDF = async () => {
    if (!pdfFile) return "";

    if (pdfFile.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`PDF must be ${MAX_FILE_SIZE_MB}MB or smaller`);
      throw new Error(`PDF must be ${MAX_FILE_SIZE_MB}MB or smaller`);
    }

    setUploadingPdf(true);
    setUploadProgress(0);

    try {
      const safeFileName = pdfFile.name.replace(/\s+/g, "-");

      const res = await fetch(
        `https://wmibcstaff-server.vercel.app/api/upload-url?name=${encodeURIComponent(
          safeFileName,
        )}&type=${encodeURIComponent(pdfFile.type)}`,
      );

      const uploadData = await res.json();

      if (!res.ok) {
        throw new Error(
          uploadData.message || uploadData.error || "Failed to get upload URL",
        );
      }

      const { url, fileUrl } = uploadData;

      await uploadFileWithProgress(url, pdfFile);

      return fileUrl;
    } catch (error) {
      console.error("uploadPDF error:", error);
      toast.error(error.message || "URL generate failed");
      throw error;
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pdfFile && pdfFile.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`PDF must be ${MAX_FILE_SIZE_MB}MB or smaller`);
      return;
    }

    setLoading(true);

    try {
      let uploadedPdfUrl = formData.agreementFile || "";

      if (pdfFile) {
        uploadedPdfUrl = await uploadPDF();
      }

      const dataToSend = {
        ...formData,
        agreementFile: uploadedPdfUrl,
        amountReceived: [formData.amountReceived],
      };

      const response = await fetch(
        "https://wmibcstaff-server.vercel.app/api/clients",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save client");
      }

      toast.success("Client registered successfully!", {
        style: { background: "#0f172a", color: "#fff", borderRadius: "12px" },
      });

      setFormData({ ...initialState, consultant: formData.consultant });
      setIsManualInput(false);
      setPdfFile(null);
      setUploadProgress(0);
    } catch (error) {
      toast.error(error.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 p-4 md:p-8">
      <Toaster position="top-center" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-linear(circle_at_top_left,rgba(37,99,235,0.34),transparent_32%),radial-linear(circle_at_bottom_right,rgba(14,165,233,0.22),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-linear(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-linear(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[44px_44px] opacity-20" />

      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-4xl border border-white/10 bg-white/[0.07] shadow-2xl shadow-blue-950/60 backdrop-blur-2xl md:rounded-[2.5rem]">
        <div className="flex items-center justify-center gap-3 border-b border-white/10 bg-linear-to-r from-blue-950 via-blue-900 to-sky-900 px-4 py-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-300/30 bg-white/10 shadow-lg shadow-blue-500/20">
            <FaShieldAlt className="text-lg text-sky-200" />
          </div>

          <div className="leading-tight">
            <h1 className="text-base font-black uppercase tracking-wide text-white sm:text-lg">
              Client Registration Portal
            </h1>
            <p className="text-[10px] uppercase tracking-wider text-blue-100/60">
              Authorized Personnel Entry
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-8 p-5 sm:p-6 md:grid-cols-3 md:p-8"
        >
          <div className="space-y-6">
            <h2 className="border-l-4 border-sky-300 pl-3 text-sm font-black text-white">
              Identity & Location
            </h2>

            <div>
              <label className={labelStyle}>
                <FaUser className="text-sky-300" /> Client Name
              </label>
              <input
                className={inputStyle}
                value={formData.clientName}
                onChange={(e) => handleChange("clientName", e.target.value)}
                required
                placeholder="Full Name"
              />
            </div>

            <div>
              <label className={labelStyle}>
                <FaPhone className="text-sky-300" /> Contact No
              </label>
              <input
                className={inputStyle}
                value={formData.contactNo}
                onChange={(e) => handleChange("contactNo", e.target.value)}
                required
                placeholder="974 ..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelStyle}>
                  <FaPassport className="text-sky-300" /> Passport
                </label>
                <input
                  className={inputStyle}
                  value={formData.passport}
                  onChange={(e) => handleChange("passport", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelStyle}>
                  <FaPassport className="text-sky-300" /> QID/ID
                </label>
                <input
                  className={inputStyle}
                  value={formData.ID}
                  onChange={(e) => handleChange("ID", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelStyle}>
                  <FaGlobe className="text-sky-300" /> Nationality
                </label>

                <input
                  list="nationality-list"
                  className={inputStyle}
                  value={formData.nationality}
                  onChange={(e) => handleChange("nationality", e.target.value)}
                  placeholder="Select or type nationality"
                  required
                />

                <datalist id="nationality-list">
                  {[
                    "Bangladeshi",
                    "Pakistani",
                    "Indian",
                    "Nepali",
                    "Filipino",
                    "Moroccan",
                    "African",
                  ].map((n) => (
                    <option key={n} value={n} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className={labelStyle}>
                  <FaGlobe className="text-sky-300" /> Current Loc
                </label>

                <input
                  list="current-country-list"
                  className={inputStyle}
                  value={formData.currentCountry}
                  onChange={(e) =>
                    handleChange("currentCountry", e.target.value)
                  }
                  placeholder="Select or type country"
                  required
                />

                <datalist id="current-country-list">
                  {[
                    "Qatar",
                    "UAE",
                    "Bangladesh",
                    "Saudi Arabia",
                    "Oman",
                    "Kuwait",
                    "Singapore",
                    "Pakistan",
                    "Nepal",
                  ].map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="border-l-4 border-sky-300 pl-3 text-sm font-black text-white">
              Visa & Processing
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelStyle}>
                  <FaBriefcase className="text-sky-300" /> Visa Type
                </label>
                <select
                  className={inputStyle}
                  value={formData.visaType}
                  onChange={(e) => handleChange("visaType", e.target.value)}
                  required
                >
                  <option value="">Type</option>
                  <option>Tourist</option>
                  <option>Work Permit</option>
                  <option>Student</option>
                  <option>Appointment</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label className={labelStyle}>
                    <FaGlobe className="text-sky-300" /> Destination
                  </label>
                  {isManualInput && (
                    <button
                      type="button"
                      onClick={() => setIsManualInput(false)}
                      className="mb-1 flex items-center gap-1 text-[9px] font-black text-sky-300 hover:text-cyan-200"
                    >
                      <FaUndo size={7} /> RESET
                    </button>
                  )}
                </div>

                {isManualInput ? (
                  <input
                    type="text"
                    className={inputStyle}
                    placeholder="Enter country"
                    value={formData.destinationCountry}
                    onChange={(e) =>
                      handleChange("destinationCountry", e.target.value)
                    }
                    autoFocus
                    required
                  />
                ) : (
                  <select
                    className={inputStyle}
                    value={formData.destinationCountry}
                    onChange={(e) =>
                      handleChange("destinationCountry", e.target.value)
                    }
                    required
                  >
                    <option value="">Select</option>

                    {formData.visaType === "Tourist" && (
                      <>
                        <optgroup label="Europe">
                          {touristCountries.europe.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Other">
                          {touristCountries.other.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </optgroup>
                      </>
                    )}

                    {formData.visaType === "Work Permit" &&
                      workCountries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}

                    <option value="Others">Type Manually</option>
                  </select>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelStyle}>
                  <FaCalendarAlt className="text-sky-300" /> File Submit Date
                </label>
                <DatePicker
                  selected={formData.fileSubmissionDate}
                  onChange={(date) => handleChange("fileSubmissionDate", date)}
                  dateFormat="dd/MM/yyyy"
                  className={inputStyle}
                  required
                />
              </div>
              <div>
                <label className={labelStyle}>
                  <FaCalendarAlt className="text-sky-300" /> Processing Time
                </label>
                <input
                  className={inputStyle}
                  value={formData.processingTime}
                  onChange={(e) =>
                    handleChange("processingTime", e.target.value)
                  }
                  placeholder="e.g. 6 Months"
                  required
                />
              </div>
            </div>

            <div>
              <label className={labelStyle}>
                <FaFileAlt className="text-sky-300" /> Application Status
              </label>
              <select
                className={inputStyle}
                value={formData.applicationStatus}
                onChange={(e) =>
                  handleChange("applicationStatus", e.target.value)
                }
                required
              >
                <option value="">Select Status</option>
                <option>Ongoing</option>
                <option>Offer Letter Received</option>
                <option>Work Permit Received</option>
                <option>Visa Received</option>
                <option>Appointment Received</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelStyle}>
                  <FaBriefcase className="text-sky-300" /> Trade
                </label>
                <input
                  className={inputStyle}
                  value={formData.trade}
                  onChange={(e) => handleChange("trade", e.target.value)}
                  placeholder="Mason/Eng"
                />
              </div>
              <div>
                <label className={labelStyle}>
                  <FaHandshake className="text-sky-300" /> Handover
                </label>
                <input
                  className={inputStyle}
                  value={formData.handover}
                  onChange={(e) => handleChange("handover", e.target.value)}
                  placeholder="Status"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-100/60">
                <FaFileAlt className="text-sky-300" /> Upload Client File
              </label>

              <input
                type="file"
                accept="application/pdf"
                className={`${inputStyle} file:mr-3 file:rounded-xl file:border-0 file:bg-sky-400/15 file:px-4 file:py-2 file:font-black file:text-sky-100 hover:file:bg-sky-400/25`}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  if (file.type !== "application/pdf") {
                    toast.error("Only PDF files are allowed");
                    e.target.value = "";
                    setPdfFile(null);
                    setUploadProgress(0);
                    return;
                  }

                  if (file.size > MAX_FILE_SIZE_BYTES) {
                    toast.error(
                      `File size must be ${MAX_FILE_SIZE_MB}MB or less`,
                    );
                    e.target.value = "";
                    setPdfFile(null);
                    setUploadProgress(0);
                    return;
                  }

                  setPdfFile(file);
                  setUploadProgress(0);
                }}
              />

              <p className="mt-2 text-[11px] text-blue-100/60">
                Maximum file size: {MAX_FILE_SIZE_MB}MB |{" "}
                <a
                  href="https://tools.pdf24.org/en/compress-pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-sky-300 underline hover:text-cyan-200"
                >
                  Compress File? Click Here
                </a>{" "}
                <br />
                <p className="mt-2 text-[11px] text-blue-100/60">
                  To compress your PDF: Set DPI to 200 for best results.
                </p>
              </p>

              {pdfFile && (
                <div className="mt-2 text-[11px] text-blue-100/60 space-y-1">
                  <div>
                    Selected:{" "}
                    <span className="font-semibold">{pdfFile.name}</span>
                  </div>
                  <div>
                    Size:{" "}
                    <span className="font-semibold">
                      {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
              )}

              {uploadingPdf && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-sky-300">
                      Uploading PDF...
                    </span>
                    <span className="text-[11px] font-bold text-blue-100/60">
                      {uploadProgress}%
                    </span>
                  </div>

                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-950/70 ring-1 ring-white/10">
                    <div
                      className="h-full bg-linear-to-r from-blue-500 via-sky-400 to-cyan-300 transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {formData.agreementFile && !pdfFile && (
                <a
                  href={formData.agreementFile}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-[11px] font-bold text-sky-300 hover:text-cyan-200"
                >
                  View Uploaded PDF
                </a>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="border-l-4 border-sky-300 pl-3 text-sm font-black text-white">
              Finance & Agreement
            </h2>

            <div>
              <label className={labelStyle}>
                <FaMoneyBillWave className="text-sky-300" /> Currency
              </label>
              <select
                className={inputStyle}
                value={formData.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
                required
              >
                <option value="Riyal">Riyal</option>
                <option value="BDT">BDT</option> 
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelStyle}>
                  <FaMoneyBillWave className="text-sky-300" /> Total Charge (
                  {formData.currency})
                </label>
                <input
                  type="number"
                  className={inputStyle}
                  value={formData.totalServiceCharge}
                  onChange={(e) =>
                    handleChange("totalServiceCharge", e.target.value)
                  }
                  onWheel={(e) => e.target.blur()}
                  required
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Non Refundable ({formData.currency})
                </label>
                <input
                  className={inputStyle}
                  value={formData.refundTerms}
                  onChange={(e) => handleChange("refundTerms", e.target.value)}
                  placeholder="amount"
                  required
                />
              </div>
            </div>

            <div>
              <label className={labelStyle}>Payment Terms</label>
              <input
                className={inputStyle}
                value={formData.paymentTerms}
                onChange={(e) => handleChange("paymentTerms", e.target.value)}
                placeholder="e.g. 2000-5000-23000"
                required
              />
            </div>

            <div className="space-y-3 rounded-2xl border border-sky-300/15 bg-slate-950/35 p-4 shadow-inner shadow-blue-950/20">
              <p className="mb-2 text-[9px] font-black uppercase tracking-widest text-sky-200/65">
                Initial Collection
              </p>

              <div>
                <label className="text-[9px] font-bold uppercase tracking-wide text-blue-100/55">
                  Transaction Type
                </label>
                <select
                  className={inputStyle}
                  value={formData.amountReceived.paymentType}
                  onChange={(e) =>
                    handleAmountChange("paymentType", e.target.value)
                  }
                  required
                >
                  <option value="">Select Type</option>
                  {["1st Payment", "Final Payment"].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-wide text-blue-100/55">
                    Amount ({formData.currency})
                  </label>
                  <input
                    type="number"
                    className={inputStyle}
                    value={formData.amountReceived.amount}
                    onChange={(e) =>
                      handleAmountChange("amount", e.target.value)
                    }
                    onWheel={(e) => e.target.blur()}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="text-[9px] font-bold uppercase tracking-wide text-sky-300">
                    Pending ({formData.currency})
                  </label>
                  <input
                    type="number"
                    className={`${inputStyle} border-sky-300/25 bg-sky-400/10`}
                    value={formData.pendingBalance}
                    onChange={(e) =>
                      handleChange("pendingBalance", e.target.value)
                    }
                    onWheel={(e) => e.target.blur()}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <select
                  className={inputStyle}
                  value={formData.amountReceived.paymentMethod}
                  onChange={(e) =>
                    handleAmountChange("paymentMethod", e.target.value)
                  }
                  required
                >
                  <option value="">Method</option>
                  <option>Cash</option>
                  <option>Card</option>
                  <option>Bank Transfer</option>
                  <option>Cheque</option>
                </select>

                <DatePicker
                  selected={formData.amountReceived.paymentDate}
                  onChange={(date) => handleAmountChange("paymentDate", date)}
                  dateFormat="dd/MM/yyyy"
                  className={inputStyle}
                  placeholderText="Date"
                  required
                />
              </div>
            </div>

            <div>
              <label className={labelStyle}>
                <FaFileSignature className="text-sky-300" /> Agreement
              </label>

              <select
                className={inputStyle}
                value={formData.agreementPaper}
                onChange={(e) => handleChange("agreementPaper", e.target.value)}
                required
              >
                <option value="">Status</option>
                <option>Pending</option>
                <option>Handed Over</option>
                <option>Not Required</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-4 md:col-span-3 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className={labelStyle}>
                <FaFileAlt className="text-sky-300" /> Internal Remarks
              </label>

              <textarea
                rows="2"
                className={inputStyle}
                placeholder="General notes..."
                value={formData.remarksHistory[0]?.text || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    remarksHistory: val
                      ? [{ text: val, date: new Date() }]
                      : [],
                  }));
                }}
              />
            </div>

            <div>
              <label className={labelStyle}>Consultant In Charge</label>
              <input
                className={
                  inputStyle +
                  " cursor-not-allowed bg-slate-900/70 font-black text-blue-100/50"
                }
                value={formData.consultant}
                readOnly
              />

              <button
                type="submit"
                disabled={loading || uploadingPdf}
                className="mt-4 w-full rounded-2xl bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400 py-4 text-sm font-black uppercase text-white shadow-xl shadow-blue-500/25 transition-all hover:shadow-blue-400/45 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploadingPdf
                  ? `Uploading File... ${uploadProgress}%`
                  : loading
                    ? "Saving..."
                    : "Register Client"}
              </button>
            </div>
          </div>
        </form>
      </div> 
    </div>
  );
}
