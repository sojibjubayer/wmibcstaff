import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const formatDate = (date) => {
  if (!date) return "—";

  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "—";

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};

export const formatDateTime = (date) => {
  if (!date) return "—";

  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "—";

  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${formatDate(d)} ${time}`;
};

export const safeFileName = (name) =>
  String(name || "Client")
    .replace(/[\\/:*?"<>|]/g, "")
    .trim();

export const generateClientReportPDF = ({ client, logoImg }) => {
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
  doc.text(`Report Generated: ${formatDateTime(new Date())}`, 110, 97);
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
    ["Submission Date", formatDate(client.fileSubmissionDate)],
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
      ["Agreement Status", "Handover Status", "Refund Policy", "Payment Terms"],
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
      formatDate(p.paymentDate),
      `${p.amount || 0} ${currency}`,
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
      const dateStr = formatDate(remark.date);

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

  doc.save(`${safeFileName(client.clientName)}_Detailed_Report.pdf`);
};

export const generateReceiptPDF = ({ client, id, logoImg, headerArabicImg }) => {
  if (!client || !client.amountReceived || client.amountReceived.length === 0) {
    return false;
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

    const amount = Math.floor(Number(num) || 0);
    if (amount === 0) return `Zero ${currencyInWords}`;

    const n = (`000000000${amount}`)
      .slice(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);

    if (!n) return "";

    let str = "";

    str +=
      Number(n[1]) !== 0
        ? `${a[Number(n[1])] || `${b[n[1][0]]} ${a[n[1][1]]}`}Crore `
        : "";

    str +=
      Number(n[2]) !== 0
        ? `${a[Number(n[2])] || `${b[n[2][0]]} ${a[n[2][1]]}`}Lakh `
        : "";

    str +=
      Number(n[3]) !== 0
        ? `${a[Number(n[3])] || `${b[n[3][0]]} ${a[n[3][1]]}`}Thousand `
        : "";

    str +=
      Number(n[4]) !== 0
        ? `${a[Number(n[4])] || `${b[n[4][0]]} ${a[n[4][1]]}`}Hundred `
        : "";

    str +=
      Number(n[5]) !== 0
        ? `${str !== "" ? "and " : ""}${
            a[Number(n[5])] || `${b[n[5][0]]} ${a[n[5][1]]}`
          }`
        : "";

    return `${str.trim()} ${currencyInWords}`;
  };

  const latestPayment = client.amountReceived[client.amountReceived.length - 1];
  const doc = new jsPDF("p", "pt", "a4");
  const copyTypes = ["OFFICE COPY", "ACCOUNTANT COPY", "CLIENT COPY"];
  const today = formatDate(new Date());

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
    doc.text("Office # 1306, 13th Floor, Gitco Tower, Doha, Qatar", 40, yOffset + 43);
    doc.text("Tel: +974 40298070 | www.wmibc.com", 40, yOffset + 51);

    if (logoImg) {
      doc.addImage(logoImg, "JPEG", (pageWidth - 80) / 2, yOffset - 1, 80, 80);
    }

    if (headerArabicImg) {
      doc.addImage(headerArabicImg, "JPEG", pageWidth - 170, yOffset + 12, 130, 55);
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

    const displayId = id ? id.slice(-4).toUpperCase() : "0000";

    doc.setFontSize(10);
    doc.setTextColor(200, 0, 0);
    doc.text(`No: ${displayId}`, 40, yOffset + 105);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.rect(230, yOffset + 92, 130, 20);
    doc.text(`Amount: ${latestPayment.amount || 0} ${currency}`, 235, yOffset + 106);

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

    const purpose = `${latestPayment.paymentType || ""} ${
      client.visaType || ""
    } Service`;

    doc.setFont("helvetica", "italic");
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

  doc.save(`Voucher_${safeFileName(client.clientName)}.pdf`);
  return true;
};