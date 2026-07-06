import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaGlobe,
  FaMoneyBillWave,
  FaArrowLeft,
  FaEdit,
  FaFileDownload,
  FaFileInvoice,
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

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = storedUser?.role?.toLowerCase();
  const userName = storedUser?.name?.toLowerCase();
  const isAuthorized = userRole === "admin" || userRole === "accountant";
  const canSeeReceipt = !(userRole === "accountant" && userName === "neshat");

  useEffect(() => {
    setLoading(true);

    fetch(`https://wmibcstaff-server.vercel.app/api/clients/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Client not found");
        return res.json();
      })
      .then((data) => {
        setClient(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load client details");
        setLoading(false);
      });
  }, [id]);

  const downloadPDF = () => {
    if (!client) return;

    const currency = client.currency || "Riyal";
    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

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

    const identityBody = [
      ["Full Name", client.clientName || "—"],
      ["Passport No", client.passport || "—"],
      client.newPassport ? ["New Passport", client.newPassport] : null,
      ["QID Number", client.QID || "—"],
      ["Nationality", client.nationality || "—"],
      ["Contact No", client.contactNo || "—"],
    ].filter(Boolean);

    autoTable(doc, {
      startY: 130,
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
      startY: 130,
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
          client.paymentTerms || "—",
        ],
      ],
      theme: "striped",
      headStyles: { fillColor: [100, 116, 139] },
      styles: { fontSize: 9, halign: "center" },
    });

    const financialTitleY = doc.lastAutoTable
      ? doc.lastAutoTable.finalY + 30
      : 400;

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text("FINANCIAL SUMMARY", 40, financialTitleY);

    const paymentRows =
      client.amountReceived?.map((p) => [
        p.paymentType || "Payment",
        p.paymentMethod || "Cash",
        p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : "—",
        `${p.amount} ${currency}`,
      ]) || [["No payments recorded", "", "", ""]];

    autoTable(doc, {
      startY: financialTitleY + 10,
      head: [["Type", "Method", "Date", "Amount"]],
      body: [
        ...paymentRows,
        [
          {
            content: `Total Service Charge: ${
              client.totalServiceCharge || 0
            } ${currency}\nPayment Terms: ${client.paymentTerms || "N/A"}`,
            colSpan: 2,
            styles: { fontStyle: "bold" },
          },
          {
            content: "Pending Balance:",
            colSpan: 1,
            styles: { fontStyle: "bold", halign: "right" },
          },
          {
            content: `${client.pendingBalance || 0} ${currency}`,
            styles: { fontStyle: "bold", fillColor: [254, 226, 226] },
          },
        ],
      ],
      theme: "grid",
      styles: { fontSize: 9 },
    });

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
        currentRemarkY += wrappedText.length * 12 + 5;

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

  const handleReceiptClick = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 min-w-50">
          <span className="text-xs font-black text-white uppercase tracking-widest">
            Confirm Receipt?
          </span>
          <p className="text-[11px] text-blue-100/60">
            Generate and download the voucher for {client.clientName}?
          </p>
          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-[10px] font-black text-blue-100/45 uppercase hover:text-blue-100 px-2"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                generateReceipt();
              }}
              className="rounded-xl bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-500/25 transition-all active:scale-95"
            >
              Generate
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
        position: "top-center",
        style: {
          borderRadius: "20px",
          background: "#0f172a",
          border: "1px solid rgba(56, 189, 248, 0.28)",
          color: "#fff",
          padding: "16px",
        },
      },
    );
  };

  const generateReceipt = () => {
    if (
      !client ||
      !client.amountReceived ||
      client.amountReceived.length === 0
    ) {
      toast.error("No payment records found");
      return;
    }

    const currency = client.currency || "Riyal";
    const currencyInWords =
      currency === "BDT" ? "Bangladeshi Taka Only" : "Riyal Only";

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

      const amount = Math.floor(num);
      if (amount === 0) return `Zero ${currencyInWords}`;

      const n = ("000000000" + amount)
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

      return `${str.trim()} ${currencyInWords}`;
    };

    const latestPayment =
      client.amountReceived[client.amountReceived.length - 1];
    const doc = new jsPDF("p", "pt", "a4");
    const copyTypes = ["OFFICE COPY", "ACCOUNTANT COPY", "CLIENT COPY"];
    const today = new Date().toLocaleDateString("en-GB");

    copyTypes.forEach((copyTitle, index) => {
      const yOffset = index * 280;
      const pageWidth = doc.internal.pageSize.getWidth();

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

      const logoWidth = 80;
      const logoHeight = 80;

      if (logoImg) {
        doc.addImage(
          logoImg,
          "JPEG",
          (pageWidth - logoWidth) / 2,
          yOffset - 1,
          logoWidth,
          logoHeight,
        );
      }

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

      doc.setFontSize(10);
      doc.setTextColor(200, 0, 0);

      const displayId = id ? id.slice(-4).toUpperCase() : "0000";
      doc.text(`No: ${displayId}`, 40, yOffset + 105);

      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.rect(230, yOffset + 92, 130, 20);
      doc.text(
        `Amount: ${latestPayment.amount || 0} ${currency}`,
        235,
        yOffset + 106,
      );

      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${today}`, 460, yOffset + 105);

      const hasBalance = client.pendingBalance && client.pendingBalance > 0;
      const boxHeight = hasBalance ? 110 : 92;

      doc.setDrawColor(22, 53, 118);
      doc.rect(30, yOffset + 120, 535, boxHeight);

      let currentRowY = yOffset + 138;
      doc.setFontSize(9);

      doc.setFont("helvetica", "normal");
      doc.text("Received from Mr. or M/s.", 45, currentRowY);

      doc.setFont("helvetica", "bold");
      doc.text(`${client.clientName || ""}`, 155, currentRowY);
      doc.line(150, currentRowY + 2, 530, currentRowY + 2);

      currentRowY += 18;
      doc.setFont("helvetica", "normal");
      doc.text(`The Sum of ${currency}`, 45, currentRowY);

      doc.setFont("helvetica", "italic");
      doc.text(toWords(latestPayment.amount || 0), 125, currentRowY);
      doc.line(120, currentRowY + 2, 530, currentRowY + 2);

      if (hasBalance) {
        currentRowY += 18;
        doc.setFont("helvetica", "normal");
        doc.text("Pending Balance:", 45, currentRowY);

        doc.setFont("helvetica", "bold");
        doc.setTextColor(200, 0, 0);
        doc.text(`${client.pendingBalance} ${currency}`, 125, currentRowY);
        doc.setTextColor(0, 0, 0);
        doc.line(120, currentRowY + 2, 530, currentRowY + 2);
      }

      currentRowY += 18;
      doc.setFont("helvetica", "normal");
      doc.text("Passport No:", 45, currentRowY);
      doc.text(`${client.passport || "—"}`, 105, currentRowY);
      doc.line(100, currentRowY + 2, 280, currentRowY + 2);

      doc.text("Mobile No:", 300, currentRowY);
      doc.text(`${client.contactNo || "—"}`, 355, currentRowY);
      doc.line(350, currentRowY + 2, 530, currentRowY + 2);

      currentRowY += 18;
      doc.text("Being for:", 45, currentRowY);

      doc.setFont("helvetica", "italic");
      const purpose = `${latestPayment.paymentType || ""} ${
        client.visaType || ""
      } Service`;
      doc.text(purpose.trim(), 95, currentRowY);
      doc.line(90, currentRowY + 2, 530, currentRowY + 2);

      currentRowY += 18;
      doc.setFont("helvetica", "normal");
      doc.text("Payment Method:", 45, currentRowY);

      doc.setFont("helvetica", "bold");
      doc.text(`${latestPayment.paymentMethod || "Cash"}`, 125, currentRowY);
      doc.line(120, currentRowY + 2, 530, currentRowY + 2);

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
        setClient(updatedClient);
        setNewRemark("");
        toast.success("Remark added!");
      }
    } catch (err) {
      toast.error("Failed to add remark");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-950">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-2 border-sky-400/20 border-b-sky-300" />
        <p className="animate-pulse text-xs font-black uppercase tracking-widest text-blue-100/60">
          Loading Database...
        </p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-8">
        <p className="rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 text-sm font-black text-blue-100/60">
          Client details not found.
        </p>
      </div>
    );
  }

  const currency = client.currency || "Riyal";

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 p-4 md:p-8">
      <Toaster />
      <div className="pointer-events-none absolute inset-0 bg-[radial-linear(circle_at_top_left,rgba(37,99,235,0.34),transparent_32%),radial-linear(circle_at_bottom_right,rgba(14,165,233,0.22),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-linear(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-linear(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[44px_44px] opacity-20" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-100/60 transition-all hover:text-sky-300"
          >
            <FaArrowLeft /> Back
          </button>

          <div className="flex flex-wrap gap-2">
            {/* {isAuthorized && canSeeReceipt && (
              <button
                onClick={handleReceiptClick}
                className="bg-white border border-blue-100 p-2 px-4 rounded-xl text-xs font-bold flex items-center gap-2 text-blue-600 shadow-sm active:scale-95"
              >
                <FaFileInvoice /> RECEIPT
              </button>
            )} */}

            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] p-2 px-4 text-xs font-black text-blue-50 shadow-lg shadow-blue-950/25 transition-all hover:border-sky-300/30 hover:bg-sky-400/10 active:scale-95"
            >
              <FaFileDownload className="text-sky-300" /> PDF REPORT
            </button>

            {isAuthorized && (
              <Link
                to={`/edit-client/${id}`}
                className="flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400 p-2 px-5 text-xs font-black text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-400/45 active:scale-95"
              >
                <FaEdit /> EDIT
              </Link>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/[0.07] shadow-2xl shadow-blue-950/60 backdrop-blur-2xl md:rounded-[2.5rem]">
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 bg-linear-to-r from-blue-950 via-blue-900 to-sky-900 p-5 text-white sm:flex-row">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight">
                {client.clientName}
              </h1>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-100/60">
                Consultant: {client.consultant}
              </p>
            </div>

            <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-blue-100/60">
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

          <div className="p-5 sm:p-6 md:p-10">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 border-b border-white/10 pb-2 text-[10px] font-black uppercase tracking-widest text-sky-300">
                  <FaUser /> Identity
                </h3>
                <InfoBox label="Full Name" value={client.clientName} />
                <InfoBox label="Contact No" value={client.contactNo} />
                <InfoBox label="Passport" value={client.passport} />
                {client.newPassport && (
                  <InfoBox label="New Passport" value={client.newPassport} />
                )}
                <InfoBox label="Nationality" value={client.nationality} />
                <InfoBox label="ID Number" value={client.ID} />
              </div>

              <div className="space-y-4">
                <h3 className="flex items-center gap-2 border-b border-white/10 pb-2 text-[10px] font-black uppercase tracking-widest text-sky-300">
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

              <div className="space-y-4 rounded-3xl border border-sky-300/15 bg-slate-950/35 p-5 shadow-inner shadow-blue-950/20">
                <h3 className="flex items-center gap-2 border-b border-white/10 pb-2 text-[10px] font-black uppercase tracking-widest text-sky-300">
                  <FaMoneyBillWave /> Accounts
                </h3>

                <InfoBox
                  label="Total Service Charge"
                  value={`${client.totalServiceCharge || 0} ${currency}`}
                />

                <InfoBox label="Payment Terms" value={client.paymentTerms} />

                <div className="space-y-2 mt-4">
                  <p className="text-[9px] font-black text-sky-500 uppercase tracking-widest">
                    Payment Received
                  </p>

                  {client.amountReceived?.map((pay, i) => (
                    <div
                      key={i}
                    className="flex items-center justify-between rounded-xl border border-sky-300/15 bg-slate-950/45 p-3 shadow-sm"
                  >
                    <div>
                        <p className="text-[8px] font-bold uppercase text-blue-100/45">
                          {pay.paymentType || "Payment"}
                        </p>
                        <span className="text-[9px] text-blue-100/55">
                          {pay.paymentMethod} •{" "}
                          {pay.paymentDate
                            ? new Date(pay.paymentDate).toLocaleDateString()
                            : "—"}
                        </span>
                      </div>

                      <span className="text-xs font-black text-sky-300">
                        {pay.amount} {currency}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-2 border-t border-white/10 pt-4">
                  <InfoBox
                    label="Pending Balance"
                    value={`${client.pendingBalance || 0} ${currency}`}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
              <InfoBox label="Agreement Status" value={client.agreementPaper} />
              <InfoBox label="Handover Status" value={client.handover} />
              <InfoBox label="Refund Policy" value={client.refundTerms} />
              <InfoBox
                label="Application Status"
                value={client.applicationStatus || "Pending"}
              />

              <div className="mt-8 border-t border-white/10 pt-6 md:col-span-4">
                <h3 className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white">
                  <FaFileAlt className="text-sky-300" /> Office Remarks
                  History
                </h3>

                <div className="max-h-100 mb-6 space-y-3 overflow-y-auto pr-2">
                  {client.remarksHistory && client.remarksHistory.length > 0 ? (
                    [...client.remarksHistory].reverse().map((r, i) => (
                      <div
                        key={i}
                        className="group relative rounded-2xl border border-white/10 bg-slate-950/35 p-4 transition-all hover:border-sky-300/30"
                      >
                        <span className="absolute right-4 top-4 text-[8px] font-bold italic text-blue-100/45">
                          {new Date(r.date).toLocaleString("en-GB", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                        <p className="pr-24 text-sm font-medium leading-relaxed text-blue-50">
                          {r.text}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="rounded-xl border border-dashed border-white/10 bg-slate-950/35 p-4 text-xs italic text-blue-100/50">
                      No history recorded yet.
                    </p>
                  )}
                </div>

                <div className="rounded-3xl border-2 border-dashed border-white/10 bg-slate-950/35 p-2 transition-all focus-within:border-sky-300/70">
                  <textarea
                    value={newRemark}
                    onChange={(e) => setNewRemark(e.target.value)}
                    placeholder="Type a new update..."
                    className="min-h-20 w-full bg-transparent p-4 text-sm text-white outline-none placeholder:text-blue-100/35"
                  />
                  <div className="flex justify-end p-2">
                    <button
                      onClick={handleAddRemark}
                      className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400 px-8 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-400/45"
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

const InfoBox = ({ label, value }) => (
  <div className="border-b border-white/10 p-2">
    <p className="text-[9px] font-black uppercase tracking-widest text-blue-100/45">
      {label}
    </p>
    <p className="text-sm font-black leading-relaxed text-blue-50">
      {value || "—"}
    </p>
  </div>
);
