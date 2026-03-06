import jsPDF from "jspdf";

export const generateSalesReport = () => {
  const doc = new jsPDF();
  doc.text("WMIBC SALES REPORT", 20, 20);
  doc.save("sales-report.pdf");
};