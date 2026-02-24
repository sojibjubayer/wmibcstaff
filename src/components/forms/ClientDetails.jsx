import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  FaUser, FaPassport, FaGlobe, FaMoneyBillWave, 
  FaArrowLeft, FaEdit, FaFileDownload, FaFileInvoice, FaBriefcase, FaHandshake, FaFileAlt
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

  useEffect(() => {
    fetch(`https://wmibcstaff-server.vercel.app/api/clients/${id}`)
      .then(res => res.json())
      .then(data => setClient(data))
      .catch(() => toast.error("Failed to load client"));
  }, [id]);

  // --- MODERN PDF REPORT LOGIC ---
  const downloadPDF = () => {
    if (!client) return;
    const doc = new jsPDF("p", "pt", "a4");
    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129); 
    doc.setFont("helvetica", "bold");
    doc.text("CLIENT RECORD", 40, 60);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Consultant: ${client.consultant || "N/A"}`, 40, 80);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 40, 95);

    const infoData = [
      ["Client Name", client.clientName || "—"],
      ["Contact Number", client.contactNo || "—"],
      ["Passport", client.passport || "—"],
      ["Nationality", client.nationality || "—"],
      ["Current Country", client.currentCountry || "—"],
      ["Destination", client.destinationCountry || "—"],
      ["Visa Type", client.visaType || "—"],
      ["Submission Date", client.fileSubmissionDate ? new Date(client.fileSubmissionDate).toLocaleDateString() : "—"],
    ];

    autoTable(doc, {
      startY: 120,
      head: [["Field", "Details"]],
      body: infoData,
      theme: "grid",
      headStyles: { fillColor: [16, 185, 129] },
    });

    if (client.amountReceived?.length > 0) {
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 20,
        head: [["Payment", "Method", "Date", "Amount"]],
        body: client.amountReceived.map(p => [p.paymentType, p.paymentMethod, p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : "—", `${p.amount} QAR`]),
        theme: "striped",
      });
    }

    doc.save(`${client.clientName}_Full_Record.pdf`);
  };

  // --- 3-COPY RECEIPT LOGIC ---
const generateReceipt = () => {
    if (!client || !client.amountReceived || client.amountReceived.length === 0) {
      toast.error("No payment records found");
      return;
    }

    const toWords = (num) => {
      const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
      const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
      let amount = Math.floor(num);
      if (amount === 0) return 'Zero Qatari Riyals Only';
      let n = ('000000000' + amount).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return '';
      let str = '';
      str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
      str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
      str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
      str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
      str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
      return str.trim() + ' Qatari Riyals Only';
    };

    const latestPayment = client.amountReceived[client.amountReceived.length - 1];
    const doc = new jsPDF("p", "pt", "a4");
    const copyTypes = ["OFFICE COPY", "ACCOUNTANT COPY", "CLIENT COPY"];
    const today = new Date().toLocaleDateString('en-GB'); 

    copyTypes.forEach((copyTitle, index) => {
      const yOffset = index * 280;
      const pageWidth = doc.internal.pageSize.getWidth();

      // --- 1. HEADERS & IMAGES ---
      // Left: English
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

      // Center: Logo
      const logoWidth = 80; 
      const logoHeight = 80;
      if (logoImg) doc.addImage(logoImg, "JPEG", (pageWidth - logoWidth) / 2, yOffset + -1.5, logoWidth, logoHeight);

      // Right: Arabic Image
      const arWidth = 130;
      const arHeight = 55;
      if (headerArabicImg) {
        doc.addImage(headerArabicImg, "JPEG", pageWidth - arWidth - 40, yOffset + 12, arWidth, arHeight);
      }

      // --- 2. LABELS & TITLE ---
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(150, 150, 150);
      doc.text(`[ ${copyTitle} ]`, pageWidth / 2, yOffset + 68, { align: "center" });

      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text("Receipt Voucher", pageWidth / 2, yOffset + 82, { align: "center" });

      // --- 3. INFO BAR (Added Safety for ID) ---
      doc.setFontSize(10);
      doc.setTextColor(200, 0, 0); 
      // Safety check: ensure id exists before slicing
      const displayId = id ? id.slice(-4).toUpperCase() : "0000";
      doc.text(`No: ${displayId}`, 40, yOffset + 105);
      
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.rect(230, yOffset + 92, 130, 20); 
      doc.text(`Amount: ${latestPayment.amount || 0} QAR`, 235, yOffset + 106);
      
      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${today}`, 460, yOffset + 105);

      // --- 4. CONTENT BOX ---
      doc.setDrawColor(22, 53, 118);
      doc.rect(30, yOffset + 120, 535, 90); 

      const rowStart = yOffset + 138;
      doc.setFontSize(9);
      
      // Received From
      doc.text("Received from Mr. or M/s.", 45, rowStart);
      doc.setFont("helvetica", "bold");
      doc.text(`${client.clientName || ""}`, 155, rowStart);
      doc.line(150, rowStart + 2, 500, rowStart + 2);

      // Sum
      doc.setFont("helvetica", "normal");
      doc.text("The Sum of Q.Rs.", 45, rowStart + 16);
      doc.setFont("helvetica", "italic");
      doc.text(toWords(latestPayment.amount || 0), 125, rowStart + 16);
      doc.line(120, rowStart + 18, 500, rowStart + 18);

      // Passport & Mobile
      doc.setFont("helvetica", "normal");
      doc.text("Passport No:", 45, rowStart + 32);
      doc.text(`${client.passport || "—"}`, 105, rowStart + 32);
      doc.line(100, rowStart + 34, 230, rowStart + 34);

      doc.text("Mobile No:", 250, rowStart + 32);
      doc.text(`${client.contactNo || "—"}`, 305, rowStart + 32);
      doc.line(300, rowStart + 34, 500, rowStart + 34);

      // Being For & Method (Safety checks added)
      doc.text("Being for:", 45, rowStart + 48);
      doc.setFont("helvetica", "italic");
      const purpose = `${latestPayment.paymentType || ""} ${client.visaType || ""} Service`;
      doc.text(purpose.trim(), 95, rowStart + 48);
      doc.line(90, rowStart + 50, 265, rowStart + 50);

      doc.setFont("helvetica", "normal");
      doc.text("Payment Method:", 275, rowStart + 48);
      doc.setFont("helvetica", "bold");
      doc.text(`${latestPayment.paymentMethod || "Cash"}`, 355, rowStart + 48);
      doc.line(350, rowStart + 50, 500, rowStart + 50);

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




  if (!client) return <div className="h-screen flex items-center justify-center font-bold text-emerald-600">LOADING...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <Toaster />
      <div className="max-w-5xl mx-auto">
        
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate(-1)} className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 hover:text-emerald-600">
            <FaArrowLeft /> Back
          </button>
          
          <div className="flex gap-2">
            <button onClick={generateReceipt} className="bg-white border border-blue-100 p-2 px-4 rounded-xl text-xs font-bold flex items-center gap-2 text-blue-600 shadow-sm active:scale-95">
              <FaFileInvoice /> RECEIPT
            </button>
            <button onClick={downloadPDF} className="bg-white border p-2 px-4 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm active:scale-95">
              <FaFileDownload className="text-emerald-600"/> PDF REPORT
            </button>
            <Link to={`/edit-client/${id}`} className="bg-emerald-600 text-white p-2 px-5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg hover:bg-emerald-700 active:scale-95">
              <FaEdit /> EDIT
            </Link>
          </div>
        </div>

        {/* MAIN CARD UI */}
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
          
          {/* HEADER */}
          <div className="bg-emerald-600 p-8 text-white">
            <h1 className="text-2xl font-black uppercase tracking-tight">{client.clientName}</h1>
            <p className="text-white/70 text-[10px] font-black uppercase tracking-widest">Consultant: {client.consultant}</p>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              
              {/* COLUMN 1: IDENTITY */}
              <div className="space-y-4">
                <h3 className="text-emerald-600 font-black text-[10px] uppercase border-b pb-2 flex items-center gap-2"><FaUser /> Identity</h3>
                <InfoBox label="Full Name" value={client.clientName} />
                <InfoBox label="Contact No" value={client.contactNo} />
                <InfoBox label="Passport" value={client.passport} />
                {client.newPassport && <InfoBox label="New Passport" value={client.newPassport} />}
                <InfoBox label="Nationality" value={client.nationality} />
                <InfoBox label="QID Number" value={client.QID} />
              </div>

              {/* COLUMN 2: JOURNEY */}
              <div className="space-y-4">
                <h3 className="text-emerald-600 font-black text-[10px] uppercase border-b pb-2 flex items-center gap-2"><FaGlobe /> Journey</h3>
                <InfoBox label="Current Country" value={client.currentCountry} />
                <InfoBox label="Destination" value={client.destinationCountry} />
                {client.changedDestination && <InfoBox label="Changed Destination" value={client.changedDestination} />}
                <InfoBox label="Visa Type" value={client.visaType} />
                <InfoBox label="Trade / Job" value={client.trade} />
                <InfoBox label="Submission Date" value={client.fileSubmissionDate ? new Date(client.fileSubmissionDate).toLocaleDateString() : "—"} />
              </div>

              {/* COLUMN 3: ACCOUNTS SIDEBAR */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-3xl border border-slate-100 shadow-inner">
                <h3 className="text-slate-800 font-black text-[10px] uppercase border-b pb-2 flex items-center gap-2"><FaMoneyBillWave /> Accounts</h3>
                <InfoBox label="Total Service Charge" value={`${client.totalServiceCharge || 0} QAR`} />
                
                <div className="space-y-2 mt-4">
                   <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Payment History</p>
                   {client.amountReceived?.map((pay, i) => (
                     <div key={i} className="bg-white p-3 rounded-xl border border-emerald-50 shadow-sm flex justify-between items-center">
                       <div>
                         <p className="text-[8px] text-gray-400 font-bold uppercase">{pay.paymentType || 'Payment'}</p>
                         <span className="text-[9px] text-gray-500">{pay.paymentMethod} • {pay.paymentDate ? new Date(pay.paymentDate).toLocaleDateString() : '—'}</span>
                       </div>
                       <span className="font-black text-emerald-600 text-xs">{pay.amount} QAR</span>
                     </div>
                   ))}
                </div>
                
                <div className="pt-4 mt-2 border-t border-slate-200">
                  <InfoBox label="Outstanding Due" value={`${client.paymentDue || 0} QAR`} />
                </div>
              </div>
            </div>

            {/* BOTTOM GRID: STATUS & TERMS */}
            <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-6">
                <InfoBox label="Agreement Status" value={client.agreementPaper} />
                <InfoBox label="Handover Status" value={client.handover} />
                <InfoBox label="Refund Policy" value={client.refundTerms} />
                <InfoBox label="Application Status" value={client.applicationStatus || "Pending"} />
                
                <div className="md:col-span-4 mt-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Office Remarks</p>
                  <p className="p-6 bg-slate-50 rounded-2xl text-sm text-slate-600 italic border border-dashed border-slate-200">
                    "{client.remarks || "No official remarks recorded."}"
                  </p>
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
    <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">{label}</p>
    <p className="text-sm font-bold text-slate-700 leading-relaxed">{value || "—"}</p>
  </div>
);