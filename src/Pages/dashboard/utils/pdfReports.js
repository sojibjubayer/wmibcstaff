import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const formatLabel = (key) => key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
const formatValue = (key, value) => {
  if (!value) return "N/A";
  if (key.toLowerCase().includes("date") || (typeof value === 'string' && value.includes('T'))) {
    const date = new Date(value);
    return isNaN(date.getTime()) ? String(value) : date.toLocaleDateString();
  }
  return String(value);
};

export const generateSalesReport = (allClients) => {
  const doc = new jsPDF();
  const now = new Date();
  const monthName = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();
  const ORDERED_CONSULTANTS = ["nizam", "sandesh", "saru", "shohag", "adil"];
  
  const detailedRows = [];
  const consultantSummary = {};
  let summaryTotalClients = 0;
  let summaryTotalSales = 0;
  let officeGrandTotal = 0;

  ORDERED_CONSULTANTS.forEach(name => {
    consultantSummary[name] = { totalSales: 0, clientCount: 0 };
  });

  allClients.forEach((client) => {
    const payments = Array.isArray(client.amountReceived) ? client.amountReceived : [];
    const consultantName = (client.consultant || "Unknown").toLowerCase();
    let clientAlreadyCounted = false;

    payments.forEach((p) => {
      if (!p || !p.amount) return;
      const pDate = new Date(p.paymentDate || client.createdAt);
      const isThisMonth = pDate.getMonth() === now.getMonth() && pDate.getFullYear() === now.getFullYear();

      if (isThisMonth) {
        const amt = parseFloat(p.amount) || 0;
        officeGrandTotal += amt;
        const isTargetPayment = p.paymentType === "1st Payment" || p.paymentType === "Pending Balance";

        if (isTargetPayment && consultantSummary.hasOwnProperty(consultantName)) {
          consultantSummary[consultantName].totalSales += amt;
          summaryTotalSales += amt;
          if (!clientAlreadyCounted) {
            consultantSummary[consultantName].clientCount += 1;
            summaryTotalClients += 1;
            clientAlreadyCounted = true;
          }
        }
        detailedRows.push([
          client.clientName,
          consultantName.toUpperCase(),
          pDate.toLocaleDateString(undefined, { day: "2-digit", month: "short" }),
          p.paymentType || "Payment",
          `${amt.toLocaleString()} QAR`,
        ]);
      }
    });
  });

  doc.setFillColor(71, 85, 105);
  doc.rect(0, 0, 210, 25, "F");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("WMIBC SALES SUMMARY", 14, 12);
  doc.setFontSize(9);
  doc.text(`${monthName.toUpperCase()} ${year} PERFORMANCE REPORT`, 14, 19);
  doc.text(`Generated: ${now.toLocaleDateString()}`, 170, 15);

  autoTable(doc, {
    startY: 40,
    head: [["Consultant", "Total Clients", "Total Sales"]],
    body: ORDERED_CONSULTANTS.map(name => [
      name.toUpperCase(),
      consultantSummary[name].clientCount,
      `${consultantSummary[name].totalSales.toLocaleString()} QAR`
    ]),
    theme: "grid",
    headStyles: { fillColor: [244, 114, 182], halign: 'center' },
    columnStyles: { 0: { halign: 'left' }, 1: { halign: 'center' }, 2: { halign: 'center', fontStyle: 'bold' } },
    foot: [[
      { content: 'TOTAL:', styles: { halign: 'right', fontStyle: 'bold' } },
      { content: summaryTotalClients.toString(), styles: { halign: 'center', fontStyle: 'bold' } },
      { content: `${summaryTotalSales.toLocaleString()} QAR`, styles: { halign: 'center', fontStyle: 'bold' } }
    ]],
    footStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59] }
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 15,
    head: [["Client Name", "Staff", "Date", "Payment Type", "Amount"]],
    body: detailedRows,
    theme: "striped",
    headStyles: { fillColor: [71, 85, 105], halign: 'center' },
    columnStyles: { 4: { halign: 'right', fontStyle: 'bold' } },
    foot: [[
      { content: 'OFFICE GRAND TOTAL (ALL PAYMENTS)', colSpan: 4, styles: { halign: 'right', fontStyle: 'bold' } },
      { content: `${officeGrandTotal.toLocaleString()} QAR`, styles: { halign: 'right', fontStyle: 'bold', fillColor: [71, 85, 105], textColor: [255, 255, 255] } }
    ]]
  });

  doc.save(`WMIBC_Sales_Report_${monthName}.pdf`);
};

export const downloadVisitorPDF = (visitor) => {
  const doc = new jsPDF('p', 'pt', 'a4');
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42);
  doc.text("Consultation Profile", 40, 50);

  const tableRows = Object.entries(visitor)
    .filter(([key]) => !["_id", "__v", "createdAt", "consultant", "date", "time"].includes(key))
    .map(([key, value]) => [formatLabel(key), formatValue(key, value)]);

  autoTable(doc, {
    startY: 80,
    head: [["Field", "Information"]],
    body: tableRows,
    theme: "striped",
    headStyles: { fillColor: [15, 23, 42] }
  });

  doc.save(`${visitor.name}_Profile.pdf`);
};