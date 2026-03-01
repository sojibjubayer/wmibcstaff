import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaPassport,
  FaGlobe,
  FaMoneyBillWave,
  FaArrowLeft,
  FaEdit,
  FaFileDownload,
  FaFileInvoice,
  FaBriefcase,
  FaHandshake,
  FaFileAlt,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoImg from "../../assets/company-logo.jpg";
import headerArabicImg from "../../assets/headr.jpg";

export default function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [newRemark, setNewRemark] = useState("");
  const [loading, setLoading] = useState(true);

  // --- ADDED: Get user role from local storage ---
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = storedUser?.role?.toLowerCase();
  const userName = storedUser?.name?.toLowerCase();
  const isAuthorized = userRole === "admin" || userRole === "accountant";

  // Logic: Hide if user is BOTH an accountant AND named Neshat
  const canSeeReceipt = !(userRole === "accountant" && userName === "neshat");

  useEffect(() => {
    setLoading(true); // Start loading when ID changes
    fetch(`https://wmibcstaff-server.vercel.app/api/clients/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Client not found");
        return res.json();
      })
      .then((data) => {
        setClient(data);
        setLoading(false); // SUCCESS: Stop loading
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load client details");
        setLoading(false); // ERROR: Stop loading so we don't get stuck
      });
  }, [id]);

  // --- MODERN PDF REPORT LOGIC ---
  const downloadPDF = () => {
    if (!client) return;
    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    // --- 1. HEADER SECTION ---
    if (logoImg) {
      doc.addImage(logoImg, "JPEG", 40, 40, 60, 60);
    }

    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129);
    doc.setFont("helvetica", "bold");
    doc.text("OFFICIAL CLIENT RECORD", 110, 70);

    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.setFont("helvetica", "normal");
    doc.text(`Consultant: ${client.consultant || "N/A"}`, 110, 85);
    doc.text(`Report Generated: ${new Date().toLocaleString()}`, 110, 97);
    doc.line(40, 115, pageWidth - 40, 115);

    // --- 2. SECTION: IDENTITY & JOURNEY ---
    const identityBody = [
      ["Full Name", client.clientName || "—"],
      ["Passport No", client.passport || "—"],
      client.newPassport ? ["New Passport", client.newPassport] : null,
      ["QID Number", client.QID || "—"],
      ["Nationality", client.nationality || "—"],
      ["Contact No", client.contactNo || "—"],
    ].filter(Boolean);

    autoTable(doc, {
      startY: 130, // Hardcoded start for the first table
      head: [
        [
          {
            content: "PRIMARY IDENTITY",
            colSpan: 2,
            styles: { halign: "center", fillColor: [51, 65, 85] },
          },
        ],
      ],
      body: identityBody,
      theme: "grid",
      styles: { fontSize: 9 },
      columnStyles: { 0: { fontStyle: "bold", width: 100 } },
      margin: { right: 300 },
    });

    const journeyBody = [
      ["Current Country", client.currentCountry || "—"],
      ["Destination", client.destinationCountry || "—"],
      client.changedDestination
        ? ["Changed Destination", client.changedDestination]
        : null,
      ["Visa Type", client.visaType || "—"],
      ["Trade / Job", client.trade || "—"],
      [
        "Submission Date",
        client.fileSubmissionDate
          ? new Date(client.fileSubmissionDate).toLocaleDateString()
          : "—",
      ],
      ["App. Status", client.applicationStatus || "Pending"],
    ].filter(Boolean);

    autoTable(doc, {
      startY: 130, // Same start as Identity (side-by-side)
      head: [
        [
          {
            content: "APPLICATION DETAILS",
            colSpan: 2,
            styles: { halign: "center", fillColor: [16, 185, 129] },
          },
        ],
      ],
      body: journeyBody,
      theme: "grid",
      styles: { fontSize: 9 },
      columnStyles: { 0: { fontStyle: "bold", width: 100 } },
      margin: { left: 305 },
    });

    // --- 3. SECTION: STATUS & TERMS ---
    // Safe Y calculation: Use 300 if lastAutoTable is somehow missing
    const statusY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : 300;

    autoTable(doc, {
      startY: statusY,
      head: [
        [
          "Agreement Status",
          "Handover Status",
          "Refund Policy",
          "Payment Terms",
        ],
      ],
      body: [
        [
          client.agreementPaper || "—",
          client.handover || "—",
          client.refundTerms || "—",
          client.paymentTerms || "—", // Added Payment Terms here
        ],
      ],
      theme: "striped",
      headStyles: { fillColor: [100, 116, 139] },
      styles: { fontSize: 9, halign: "center" },
    });

    // --- 4. SECTION: FINANCIAL HISTORY ---
    const financialTitleY = doc.lastAutoTable
      ? doc.lastAutoTable.finalY + 30
      : 400;

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text("FINANCIAL SUMMARY", 40, financialTitleY);

    const paymentRows = client.amountReceived?.map((p) => [
      p.paymentType || "Payment",
      p.paymentMethod || "Cash",
      p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : "—",
      `${p.amount} QAR`,
    ]) || [["No payments recorded", "", "", ""]];

    autoTable(doc, {
      startY: financialTitleY + 10,
      head: [["Type", "Method", "Date", "Amount"]],
      body: [
        ...paymentRows,
        [
          {
            content: `Total Service Charge: ${client.totalServiceCharge || 0} QAR\nPayment Terms: ${client.paymentTerms || "N/A"}`,
            colSpan: 2,
            styles: { fontStyle: "bold" },
          },
          {
            content: `Pending Balance:`,
            colSpan: 1,
            styles: { fontStyle: "bold", halign: "right" },
          },
          {
            content: `${client.pendingBalance || 0} QAR`,
            styles: { fontStyle: "bold", fillColor: [254, 226, 226] },
          },
        ],
      ],
      theme: "grid",
      styles: { fontSize: 9 },
    });

    // --- 5. REMARKS HISTORY ---
    const remarksY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 30 : 600;
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text("OFFICE REMARKS HISTORY:", 40, remarksY);

    let currentRemarkY = remarksY + 20;
    doc.setFontSize(8);

    if (client.remarksHistory && client.remarksHistory.length > 0) {
      client.remarksHistory.forEach((remark) => {
        const dateStr = new Date(remark.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        doc.setFont("helvetica", "bold");
        doc.setTextColor(100);
        doc.text(`${dateStr}:`, 40, currentRemarkY);

        doc.setFont("helvetica", "italic");
        doc.setTextColor(60);
        const wrappedText = doc.splitTextToSize(
          remark.text || "",
          pageWidth - 140,
        );
        doc.text(wrappedText, 110, currentRemarkY);

        const lineHeight = 12;
        currentRemarkY += wrappedText.length * lineHeight + 5;

        // Simple Page Break check
        if (currentRemarkY > 800) {
          doc.addPage();
          currentRemarkY = 40;
        }
      });
    } else {
      doc.text("No official remarks recorded.", 40, currentRemarkY);
    }

    doc.save(`${client.clientName}_Detailed_Report.pdf`);
  };

  //CONFIRM RECEIPT
  const handleReceiptClick = () => {
  toast((t) => (
    <div className="flex flex-col gap-3 min-w-50">
      <span className="text-xs font-black text-slate-800 uppercase tracking-widest">
        Confirm Receipt?
      </span>
      <p className="text-[11px] text-slate-500">
        Generate and download the voucher for {client.clientName}?
      </p>
      <div className="flex gap-2 justify-end mt-2">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="text-[10px] font-black text-gray-400 uppercase hover:text-gray-600 px-2"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            generateReceipt(); // Your original PDF function
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-100 active:scale-95 transition-all"
        >
          Generate
        </button>
      </div>
    </div>
  ), {
    duration: 6000,
    position: 'top-center',
    style: {
      borderRadius: '20px',
      background: '#fff',
      border: '1px solid #f1f5f9',
      padding: '16px',
    },
  });
};

  // --- 3-COPY RECEIPT LOGIC ---
  const generateReceipt = () => {
    
    if (
      !client ||
      !client.amountReceived ||
      client.amountReceived.length === 0
    ) {
      toast.error("No payment records found");
      return;
    }

    const toWords = (num) => {
      const a = [
        "",
        "One ",
        "Two ",
        "Three ",
        "Four ",
        "Five ",
        "Six ",
        "Seven ",
        "Eight ",
        "Nine ",
        "Ten ",
        "Eleven ",
        "Twelve ",
        "Thirteen ",
        "Fourteen ",
        "Fifteen ",
        "Sixteen ",
        "Seventeen ",
        "Eighteen ",
        "Nineteen ",
      ];
      const b = [
        "",
        "",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
      ];
      let amount = Math.floor(num);
      if (amount === 0) return "Zero Qatari Riyals Only";
      let n = ("000000000" + amount)
        .substr(-9)
        .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return "";
      let str = "";
      str +=
        n[1] != 0
          ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore "
          : "";
      str +=
        n[2] != 0
          ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh "
          : "";
      str +=
        n[3] != 0
          ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand "
          : "";
      str +=
        n[4] != 0
          ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred "
          : "";
      str +=
        n[5] != 0
          ? (str != "" ? "and " : "") +
            (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]])
          : "";
      return str.trim() + " Qatari Riyals Only";
    };

    const latestPayment =
      client.amountReceived[client.amountReceived.length - 1];
    const doc = new jsPDF("p", "pt", "a4");
    const copyTypes = ["OFFICE COPY", "ACCOUNTANT COPY", "CLIENT COPY"];
    const today = new Date().toLocaleDateString("en-GB");

    copyTypes.forEach((copyTitle, index) => {
      const yOffset = index * 280;
      const pageWidth = doc.internal.pageSize.getWidth();

      // --- 1. HEADERS & IMAGES ---
      doc.setFontSize(11);
      doc.setTextColor(22, 53, 118);
      doc.setFont("helvetica", "bold");
      doc.text("WORLD MULTINATIONAL", 40, yOffset + 25);
      doc.setFontSize(7);
      doc.text("IMMIGRATION & BUSINESS CONSULTANCY", 40, yOffset + 33);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      doc.text(
        "Office # 1306, 13th Floor, Gitco Tower, Doha, Qatar",
        40,
        yOffset + 43,
      );
      doc.text("Tel: +974 40298070 | www.wmibc.com", 40, yOffset + 51);

      // Center: Logo
      const logoWidth = 80;
      const logoHeight = 80;
      if (logoImg)
        doc.addImage(
          logoImg,
          "JPEG",
          (pageWidth - logoWidth) / 2,
          yOffset - 1,
          logoWidth,
          logoHeight,
        );

      // Right: Arabic Image
      const arWidth = 130;
      const arHeight = 55;
      if (headerArabicImg) {
        doc.addImage(
          headerArabicImg,
          "JPEG",
          pageWidth - arWidth - 40,
          yOffset + 12,
          arWidth,
          arHeight,
        );
      }

      // --- 2. LABELS & TITLE ---
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(150, 150, 150);
      doc.text(`[ ${copyTitle} ]`, pageWidth / 2, yOffset + 68, {
        align: "center",
      });

      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text("Receipt Voucher", pageWidth / 2, yOffset + 82, {
        align: "center",
      });

      // --- 3. INFO BAR ---
      doc.setFontSize(10);
      doc.setTextColor(200, 0, 0);
      const displayId = id ? id.slice(-4).toUpperCase() : "0000";
      doc.text(`No: ${displayId}`, 40, yOffset + 105);

      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.rect(230, yOffset + 92, 130, 20);
      doc.text(`Amount: ${latestPayment.amount || 0} QAR`, 235, yOffset + 106);

      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${today}`, 460, yOffset + 105);

      // --- 4. CONTENT BOX (Dynamic Height based on Pending Balance) ---
      const hasBalance = client.pendingBalance && client.pendingBalance > 0;
      const boxHeight = hasBalance ? 110 : 92;
      doc.setDrawColor(22, 53, 118);
      doc.rect(30, yOffset + 120, 535, boxHeight);

      let currentRowY = yOffset + 138;
      doc.setFontSize(9);

      // Row 1: Received From
      doc.setFont("helvetica", "normal");
      doc.text("Received from Mr. or M/s.", 45, currentRowY);
      doc.setFont("helvetica", "bold");
      doc.text(`${client.clientName || ""}`, 155, currentRowY);
      doc.line(150, currentRowY + 2, 530, currentRowY + 2);

      // Row 2: Sum in Words
      currentRowY += 18;
      doc.setFont("helvetica", "normal");
      doc.text("The Sum of Q.Rs.", 45, currentRowY);
      doc.setFont("helvetica", "italic");
      doc.text(toWords(latestPayment.amount || 0), 125, currentRowY);
      doc.line(120, currentRowY + 2, 530, currentRowY + 2);

      // OPTIONAL Row: Pending Balance (Only shows if value exists)
      if (hasBalance) {
        currentRowY += 18;
        doc.setFont("helvetica", "normal");
        doc.text("Pending Balance:", 45, currentRowY);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(200, 0, 0); // Red for balance
        doc.text(`${client.pendingBalance} QAR`, 125, currentRowY);
        doc.setTextColor(0, 0, 0); // Reset
        doc.line(120, currentRowY + 2, 530, currentRowY + 2);
      }

      // Row 3: Passport & Mobile
      currentRowY += 18;
      doc.setFont("helvetica", "normal");
      doc.text("Passport No:", 45, currentRowY);
      doc.text(`${client.passport || "—"}`, 105, currentRowY);
      doc.line(100, currentRowY + 2, 280, currentRowY + 2);

      doc.text("Mobile No:", 300, currentRowY);
      doc.text(`${client.contactNo || "—"}`, 355, currentRowY);
      doc.line(350, currentRowY + 2, 530, currentRowY + 2);

      // Row 4: Purpose
      currentRowY += 18;
      doc.text("Being for:", 45, currentRowY);
      doc.setFont("helvetica", "italic");
      const purpose = `${latestPayment.paymentType || ""} ${client.visaType || ""} Service`;
      doc.text(purpose.trim(), 95, currentRowY);
      doc.line(90, currentRowY + 2, 530, currentRowY + 2);

      // Row 5: Payment Method (ALWAYS LAST)
      currentRowY += 18;
      doc.setFont("helvetica", "normal");
      doc.text("Payment Method:", 45, currentRowY);
      doc.setFont("helvetica", "bold");
      doc.text(`${latestPayment.paymentMethod || "Cash"}`, 125, currentRowY);
      doc.line(120, currentRowY + 2, 530, currentRowY + 2);

      // --- 5. SIGNATURES ---
      doc.setFontSize(8);
      doc.text("Manager's Sign", 65, yOffset + 255);
      doc.text("Accountant's Sign", 260, yOffset + 255);
      doc.text("Receiver's Sign", 465, yOffset + 255);

      if (index < 2) {
        doc.setLineDash([5, 5], 0);
        doc.line(10, yOffset + 278, 585, yOffset + 278);
        doc.setLineDash([], 0);
      }
    });

    doc.save(`Voucher_${client.clientName || "Client"}.pdf`);
  };

  // EDITABLE OFFICE REMARK
  // Update the handleSave function
  const handleAddRemark = async () => {
    if (!newRemark.trim()) return toast.error("Please enter a remark");

    try {
      const response = await fetch(
        `https://wmibcstaff-server.vercel.app/api/clients/${id}/remarks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: newRemark }),
        },
      );

      if (response.ok) {
        const updatedClient = await response.json();
        setClient(updatedClient); // Refresh UI
        setNewRemark(""); // Clear input
        toast.success("Remark added!");
      }
    } catch (err) {
      toast.error("Failed to add remark");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mb-4"></div>
        <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">
          Loading Database...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <Toaster />
      <div className="max-w-5xl mx-auto">
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 hover:text-emerald-600"
          >
            <FaArrowLeft /> Back
          </button>

          <div className="flex gap-2">
            {isAuthorized && canSeeReceipt && (
              <button
                onClick={handleReceiptClick}
                className="bg-white border border-blue-100 p-2 px-4 rounded-xl text-xs font-bold flex items-center gap-2 text-blue-600 shadow-sm active:scale-95"
              >
                <FaFileInvoice /> RECEIPT
              </button>
            )}
            <button
              onClick={downloadPDF}
              className="bg-white border p-2 px-4 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm active:scale-95"
            >
              <FaFileDownload className="text-emerald-600" /> PDF REPORT
            </button>
            {/* CONDITIONAL EDIT BUTTON */}
            {isAuthorized && (
              <Link
                to={`/edit-client/${id}`}
                className="bg-pink-400 text-white p-2 px-5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg hover:bg-pink-500 active:scale-95"
              >
                <FaEdit /> EDIT
              </Link>
            )}
          </div>
        </div>

        {/* MAIN CARD UI */}
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
          {/* HEADER */}
          <div className="bg-slate-200 p-5 text-pink-600 flex justify-between">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight">
                {client.clientName}
              </h1>
              <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">
                Consultant: {client.consultant}
              </p>
            </div>

            <p className="mt-2 text-gray-600 text-[10px] font-black uppercase tracking-widest">
              {client.updatedBy && client.updatedBy.length > 0 ? (
                <>
                  Last Updated By:{" "}
                  {client.updatedBy[client.updatedBy.length - 1].name}
                  <br />
                  at{" "}
                  {new Date(
                    client.updatedBy[client.updatedBy.length - 1].date,
                  ).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </>
              ) : (
                ""
              )}
            </p>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* COLUMN 1: IDENTITY */}
              <div className="space-y-4">
                <h3 className="text-pink-600 font-black text-[10px] uppercase border-b pb-2 flex items-center gap-2">
                  <FaUser /> Identity
                </h3>
                <InfoBox label="Full Name" value={client.clientName} />
                <InfoBox label="Contact No" value={client.contactNo} />
                <InfoBox label="Passport" value={client.passport} />
                {client.newPassport && (
                  <InfoBox label="New Passport" value={client.newPassport} />
                )}
                <InfoBox label="Nationality" value={client.nationality} />
                <InfoBox label="QID Number" value={client.QID} />
              </div>

              {/* COLUMN 2: JOURNEY */}
              <div className="space-y-4">
                <h3 className="text-pink-600 font-black text-[10px] uppercase border-b pb-2 flex items-center gap-2">
                  <FaGlobe /> Journey
                </h3>
                <InfoBox
                  label="Current Country"
                  value={client.currentCountry}
                />
                <InfoBox
                  label="Destination"
                  value={client.destinationCountry}
                />
                {client.changedDestination && (
                  <InfoBox
                    label="Changed Destination"
                    value={client.changedDestination}
                  />
                )}
                <InfoBox label="Visa Type" value={client.visaType} />
                <InfoBox label="Trade / Job" value={client.trade} />
                <InfoBox
                  label="Submission Date"
                  value={
                    client.fileSubmissionDate
                      ? new Date(client.fileSubmissionDate).toLocaleDateString()
                      : "—"
                  }
                />
              </div>

              {/* COLUMN 3: ACCOUNTS SIDEBAR */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-3xl border border-slate-100 shadow-inner">
                <h3 className="text-pink-800 font-black text-[10px] uppercase border-b pb-2 flex items-center gap-2">
                  <FaMoneyBillWave /> Accounts
                </h3>
                <InfoBox
                  label="Total Service Charge"
                  value={`${client.totalServiceCharge || 0} QAR`}
                />
                {/* ADD THIS NEW BLOCK HERE */}
                <InfoBox label="Payment Terms" value={client.paymentTerms} />

                <div className="space-y-2 mt-4">
                  <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                    Payment Received
                  </p>
                  {client.amountReceived?.map((pay, i) => (
                    <div
                      key={i}
                      className="bg-white p-3 rounded-xl border border-emerald-50 shadow-sm flex justify-between items-center"
                    >
                      <div>
                        <p className="text-[8px] text-gray-400 font-bold uppercase">
                          {pay.paymentType || "Payment"}
                        </p>
                        <span className="text-[9px] text-gray-500">
                          {pay.paymentMethod} •{" "}
                          {pay.paymentDate
                            ? new Date(pay.paymentDate).toLocaleDateString()
                            : "—"}
                        </span>
                      </div>
                      <span className="font-black text-emerald-600 text-xs">
                        {pay.amount} QAR
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 mt-2 border-t border-slate-200">
                  <InfoBox
                    label="Pending Balance"
                    value={`${client.pendingBalance || 0} QAR`}
                  />
                </div>
              </div>
            </div>

            {/* BOTTOM GRID: STATUS & TERMS */}
            <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-6">
              <InfoBox label="Agreement Status" value={client.agreementPaper} />
              <InfoBox label="Handover Status" value={client.handover} />
              <InfoBox label="Refund Policy" value={client.refundTerms} />
              <InfoBox
                label="Application Status"
                value={client.applicationStatus || "Pending"}
              />

              <div className="md:col-span-4 mt-8 border-t pt-6">
                <h3 className="text-slate-800 font-black text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <FaFileAlt className="text-emerald-500" /> Office Remarks
                  History
                </h3>

                {/* History List */}
                <div className="space-y-3 mb-6 max-h-100 overflow-y-auto pr-2">
                  {client.remarksHistory && client.remarksHistory.length > 0 ? (
                    [...client.remarksHistory].reverse().map((r, i) => (
                      <div
                        key={i}
                        className="bg-slate-50 p-4 rounded-2xl border border-slate-100 relative group transition-all hover:border-emerald-200"
                      >
                        <span className="text-[8px] font-bold text-slate-400 absolute top-4 right-4 italic">
                          {new Date(r.date).toLocaleString("en-GB", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                        <p className="text-sm text-slate-600 leading-relaxed pr-24 font-medium">
                          {r.text}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic bg-slate-50 p-4 rounded-xl border border-dashed">
                      No history recorded yet.
                    </p>
                  )}
                </div>

                {/* Input Section */}
                <div className="bg-white p-2 rounded-3xl border-2 border-dashed border-slate-200 focus-within:border-emerald-400 transition-all">
                  <textarea
                    value={newRemark}
                    onChange={(e) => setNewRemark(e.target.value)}
                    placeholder="Type a new update..."
                    className="w-full p-4 text-sm text-slate-700 outline-none min-h-20 bg-transparent"
                  />
                  <div className="flex justify-end p-2">
                    <button
                      onClick={handleAddRemark}
                      className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200 flex items-center gap-2"
                    >
                      <FaHandshake /> Add New Remark
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for clean rendering
const InfoBox = ({ label, value }) => (
  <div className="p-2 border-b border-gray-50/50">
    <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">
      {label}
    </p>
    <p className="text-sm font-bold text-slate-700 leading-relaxed">
      {value || "—"}
    </p>
  </div>
);
