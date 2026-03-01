import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaPassport,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaSync,
  FaTimes,
  FaFilter,
  FaIdBadge,
} from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ITEMS_PER_PAGE = 12;
const CONSULTANTS = ["nizam", "sandesh", "saru", "shohag", "adil"];

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Data States
  const [allVisitors, setAllVisitors] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [stats, setStats] = useState({
    todayVisitors: 0,
    totalVisitors: 0,
    totalClients: 0,
    monthlyRevenue: 0,
  });

  // Pagination & Filter States
  const [visitorPage, setVisitorPage] = useState(1);
  const [clientPage, setClientPage] = useState(1);

  // Visitor specific filters
  const [visitorFilterConsultant, setVisitorFilterConsultant] = useState("");

  // Client specific filters
  const [clientFilterConsultant, setClientFilterConsultant] = useState("");
  const [clientFilterCountry, setClientFilterCountry] = useState("");

  // Helper: Calculate total collected from a client
  const calculateClientTotal = (client) => {
    const payments = Array.isArray(client.amountReceived)
      ? client.amountReceived
      : [client.amountReceived];
    return payments.reduce((sum, p) => sum + (parseFloat(p?.amount) || 0), 0);
  };

  // Fetch Data logic
const fetchData = useCallback(async () => {
  setLoading(true);
  try {
    // Fetch visitors and clients
    const [visitorRes, clientRes] = await Promise.all([
      fetch(`https://wmibcstaff-server.vercel.app/api/visitor?limit=2000`),
      fetch(`https://wmibcstaff-server.vercel.app/api/clients`),
    ]);

    const visitorData = await visitorRes.json();
    const clientData = await clientRes.json();

    const visitors = visitorData.visitors || [];
    const clients = Array.isArray(clientData) ? clientData : [];

    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    // --- Visitor Stats ---
    const todayVisitors = visitors.filter(v => v.date === todayStr).length;

    const monthlyVisitors = visitors.filter(v => {
      const d = new Date(v.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    // --- Client Stats (monthly) ---
    const monthlyActiveClients = clients.filter(c => {
      const d = new Date(c.createdAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    // Monthly revenue
    let monthlyRevenue = 0;
    clients.forEach(c => {
      const payments = Array.isArray(c.amountReceived) ? c.amountReceived : [c.amountReceived];
      payments.forEach(p => {
        const d = new Date(p?.paymentDate || c.createdAt);
        if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
          monthlyRevenue += parseFloat(p?.amount) || 0;
        }
      });
    });

    // Update stats
    setStats({
      todayVisitors,
      totalVisitors: monthlyVisitors,       // monthly visitor volume
      totalClients: monthlyActiveClients,   // monthly active clients
      monthlyRevenue,
    });

    // Sort data
    setAllVisitors(visitors.sort((a, b) => new Date(b.date) - new Date(a.date)));
    setAllClients(clients.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

  } catch (err) {
    console.error("Fetch Error:", err);
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Unique countries for the dropdown filter
  const uniqueCountries = useMemo(
    () =>
      [
        ...new Set(allClients.map((c) => c.destinationCountry).filter(Boolean)),
      ].sort(),
    [allClients],
  );

  // --- FILTERING LOGIC ---
  const filteredVisitors = useMemo(() => {
    let data = allVisitors;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (v) =>
          (v.name || "").toLowerCase().includes(q) ||
          (v.mobile || "").toString().includes(q),
      );
    }
    if (visitorFilterConsultant) {
      data = data.filter(
        (v) =>
          v.consultant?.toLowerCase() === visitorFilterConsultant.toLowerCase(),
      );
    }
    return data;
  }, [allVisitors, searchQuery, visitorFilterConsultant]);

  const filteredClients = useMemo(() => {
    let data = allClients;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (item) =>
          (item.clientName || "").toLowerCase().includes(q) ||
          (item.contactNo || "").toString().includes(q) ||
          (item.QID || "").toString().includes(q),
      );
    }
    if (clientFilterConsultant) {
      data = data.filter(
        (c) =>
          c.consultant?.toLowerCase() === clientFilterConsultant.toLowerCase(),
      );
    }
    if (clientFilterCountry) {
      data = data.filter((c) => c.destinationCountry === clientFilterCountry);
    }
    return data;
  }, [allClients, searchQuery, clientFilterConsultant, clientFilterCountry]);

  const paginate = (data, page) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  };

  // PDF REPORT

  const generateSalesReport = () => {
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

    ORDERED_CONSULTANTS.forEach((name) => {
      consultantSummary[name] = { totalSales: 0, clientCount: 0 };
    });

    allClients.forEach((client) => {
      const payments = Array.isArray(client.amountReceived)
        ? client.amountReceived
        : [];
      const consultantName = (client.consultant || "Unknown").toLowerCase();
      let clientAlreadyCounted = false;

      payments.forEach((p) => {
        if (!p || !p.amount) return;
        const pDate = new Date(p.paymentDate || client.createdAt);
        const isThisMonth =
          pDate.getMonth() === now.getMonth() &&
          pDate.getFullYear() === now.getFullYear();

        if (isThisMonth) {
          const amt = parseFloat(p.amount) || 0;
          officeGrandTotal += amt;

          const isTargetPayment =
            p.paymentType === "1st Payment" ||
            p.paymentType === "Pending Balance";

          if (
            isTargetPayment &&
            consultantSummary.hasOwnProperty(consultantName)
          ) {
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
            pDate.toLocaleDateString(undefined, {
              day: "2-digit",
              month: "short",
            }),
            p.paymentType || "Payment",
            `${amt.toLocaleString()} QAR`,
          ]);
        }
      });
    });

    // --- REDUCED HEADER (Gray Background) ---
    doc.setFillColor(71, 85, 105); // Slate-600 (Professional Gray)
    doc.rect(0, 0, 210, 25, "F"); // Height reduced from 40 to 25

    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text("WMIBC SALES SUMMARY", 14, 12);

    doc.setFontSize(9);
    doc.text(`${monthName.toUpperCase()} ${year} PERFORMANCE REPORT`, 14, 19);
    doc.text(`Generated: ${now.toLocaleDateString()}`, 170, 15);

    // --- TABLE 1: Performance Summary ---
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(11);
    doc.text("CONSULTANT PERFORMANCE", 14, 35);

    const summaryBody = ORDERED_CONSULTANTS.map((name) => [
      name.toUpperCase(),
      consultantSummary[name].clientCount,
      `${consultantSummary[name].totalSales.toLocaleString()} QAR`,
    ]);

    autoTable(doc, {
      startY: 40,
      head: [["Consultant", "Total Clients", "Total Sales"]],
      body: summaryBody,
      theme: "grid",
      headStyles: {
        fillColor: [244, 114, 182], // Pink-400
        halign: "center", // Default all headers to center
      },
      columnStyles: {
        0: { halign: "left" }, // Consultant Name Left
        1: { halign: "center" }, // Total Clients Center
        2: { halign: "center", fontStyle: "bold" }, // Total Sales Center
      },
      foot: [
        [
          { content: "TOTAL:", styles: { halign: "right", fontStyle: "bold" } },
          {
            content: summaryTotalClients.toString(),
            styles: { halign: "center", fontStyle: "bold" },
          },
          {
            content: `${summaryTotalSales.toLocaleString()} QAR`,
            styles: { halign: "center", fontStyle: "bold" },
          },
        ],
      ],
      footStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59] },
    });

    // --- TABLE 2: Detailed Breakdown ---
    let finalY = doc.lastAutoTable.finalY || 60;
    if (finalY > 260) {
      doc.addPage();
      finalY = 20;
    }
    doc.text("DETAILED TRANSACTION BREAKDOWN", 14, finalY + 12);

    autoTable(doc, {
      startY: finalY + 16,
      head: [["Client Name", "Staff", "Date", "Payment Type", "Amount"]],
      body: detailedRows,
      theme: "striped",
      headStyles: { fillColor: [71, 85, 105], halign: "center" }, // Match Gray Header
      columnStyles: {
        0: { halign: "left" },
        4: { halign: "right", fontStyle: "bold" },
      },
      foot: [
        [
          {
            content: "OFFICE GRAND TOTAL (ALL PAYMENTS)",
            colSpan: 4,
            styles: { halign: "right", fontStyle: "bold" },
          },
          {
            content: `${officeGrandTotal.toLocaleString()} QAR`,
            styles: {
              halign: "right",
              fontStyle: "bold",
              fillColor: [71, 85, 105],
              textColor: [255, 255, 255],
            },
          },
        ],
      ],
      didDrawPage: (data) => {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text("Page " + pageCount, 14, doc.internal.pageSize.height - 10);
      },
    });

    doc.save(`WMIBC_Sales_Report_${monthName}.pdf`);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 hidden lg:flex flex-col shadow-2xl">
        <div className="p-8">
          <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">
            WMIBC <span className="text-pink-300">HQ</span>
          </h2>
          <p className="text-[9px] text-slate-500 font-bold tracking-[0.3em] mt-1 uppercase">
            Administrative Suite
          </p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <SidebarItem
            icon={<FaChartPie />}
            label="Overview"
            active={activeTab === "Overview"}
            onClick={() => setActiveTab("Overview")}
          />
          <SidebarItem
            icon={<FaUsers />}
            label="Visitor Log"
            active={activeTab === "Visitors"}
            onClick={() => {
              setActiveTab("Visitors");
              setVisitorPage(1);
            }}
          />
          <SidebarItem
            icon={<FaPassport />}
            label="Client Base"
            active={activeTab === "Clients"}
            onClick={() => {
              setActiveTab("Clients");
              setClientPage(1);
            }}
          />
        </nav>
        <div className="p-6 border-t border-slate-800">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <p className="text-[10px] font-bold text-slate-500 uppercase">
              System Status
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs text-slate-300 font-medium">
                Live Server
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-full max-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search directory..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisitorPage(1);
                setClientPage(1);
              }}
              className="w-full pl-11 pr-12 py-3 bg-slate-100 border-none rounded-2xl text-xs font-medium focus:ring-2 focus:ring-pink-200 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={fetchData}
              className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all border border-slate-100"
            >
              <FaSync className={loading ? "animate-spin" : ""} />
            </button>

            {/* Add this inside the <header> right section next to the Sync button */}
            <button
              onClick={generateSalesReport}
              className="flex items-center gap-2 bg-pink-200 text-slate-900 text-[10px] px-4 py-2.5 rounded-xl font-black uppercase tracking-widest hover:bg-pink-300 transition-all shadow-lg shadow-pink-500/10"
            >
              <FaPassport className="text-sm" />
              Sales Report
            </button>

            <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase leading-none">
                  Global Admin
                </p>
                <p className="text-xs font-bold text-slate-900 mt-1">
                  Superuser
                </p>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-pink-200 flex items-center justify-center text-slate-900 font-black text-xs shadow-lg shadow-pink-100">
                HQ
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "Overview" && (
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  label="Today's Arrival"
                  value={stats.todayVisitors}
                  color="text-pink-600"
                  loading={loading}
                  live
                />
                <StatCard
                  label="Monthly Volume"
                  value={stats.totalVisitors} // <-- monthly client count
                  color="text-slate-900"
                  loading={loading}
                />
                <StatCard
                  label="Active Clients"
                  value={stats.totalClients}
                  color="text-blue-600"
                  loading={loading}
                />
                <StatCard
                  label="Monthly Revenue"
                  value={`${stats.monthlyRevenue.toLocaleString()} QAR`}
                  color="text-emerald-600"
                  loading={loading}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-4xl shadow-xl shadow-slate-200/50 border border-white overflow-hidden">
                  <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <h3 className="font-black text-slate-900 text-xs uppercase tracking-[0.2em]">
                      Latest Consultation Log
                    </h3>
                    <button
                      onClick={() => setActiveTab("Visitors")}
                      className="text-[10px] font-bold text-pink-500 uppercase hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <Table
                    columns={[
                      "Visitor Name",
                      "Consultant",
                      "Interested In",
                      "Date",
                    ]}
                    data={allVisitors.slice(0, 8)}
                    loading={loading}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] px-2">
                    Consultant Performance(Monthly)
                  </h3>
                  {CONSULTANTS.map((name) => {
                    const now = new Date();
                    const currentMonth = now.getMonth();
                    const currentYear = now.getFullYear();

                    let totalSales = 0;
                    let monthlyClientCount = 0;

                    allClients.forEach((client) => {
                      if (
                        client.consultant?.toLowerCase() !== name.toLowerCase()
                      )
                        return;

                      const payments = Array.isArray(client.amountReceived)
                        ? client.amountReceived
                        : [client.amountReceived];

                      let countedThisClient = false;

                      payments.forEach((p) => {
                        if (!p?.amount) return;

                        const pDate = new Date(
                          p.paymentDate || client.createdAt,
                        );

                        if (
                          pDate.getMonth() === currentMonth &&
                          pDate.getFullYear() === currentYear
                        ) {
                          totalSales += parseFloat(p.amount) || 0;

                          // Count client only once per month
                          if (!countedThisClient) {
                            monthlyClientCount++;
                            countedThisClient = true;
                          }
                        }
                      });
                    });

                    return (
                      <div
                        key={name}
                        className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:scale-[1.02] transition-transform"
                      >
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-black text-slate-900 uppercase tracking-widest">
                            {name}
                          </p>

                          {/* ✅ Monthly client count */}
                          <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                            {monthlyClientCount}
                          </span>
                        </div>

                        {/* ✅ Monthly sales */}
                        <h4 className="text-lg font-bold text-slate-800 mt-2">
                          {totalSales.toLocaleString()}{" "}
                          <span className="text-[10px] text-slate-400">
                            QAR
                          </span>
                        </h4>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VISITORS */}
          {activeTab === "Visitors" && (
            <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
              {/* NEW VISITOR LOG FILTERS & TOTAL */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 bg-slate-500 p-5 rounded-3xl shadow-lg  flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-pink-300/20 p-3 rounded-2xl text-pink-300">
                      <FaUsers size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-100 uppercase tracking-widest">
                        Total Results
                      </p>
                      <h4 className="text-xl font-black text-white">
                        {filteredVisitors.length}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="relative flex-1">
                    <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                    <select
                      value={visitorFilterConsultant}
                      onChange={(e) => {
                        setVisitorFilterConsultant(e.target.value);
                        setVisitorPage(1);
                      }}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-[11px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-pink-200 outline-none cursor-pointer appearance-none"
                    >
                      <option value="">Filter By Consultant</option>
                      {CONSULTANTS.map((name) => (
                        <option key={name} value={name}>
                          {name.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      setVisitorFilterConsultant("");
                      setSearchQuery("");
                    }}
                    className="px-6 py-3 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-4xl shadow-xl shadow-slate-200/50 border border-white overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
                  <h3 className="font-black text-slate-900 text-xs uppercase tracking-[0.2em]">
                    Global Visitor Registry
                  </h3>
                </div>
                <Table
                  columns={["Name", "Consultant", "Interested In", "Date"]}
                  data={paginate(filteredVisitors, visitorPage)}
                  loading={loading}
                />
                <Pagination
                  currentPage={visitorPage}
                  totalItems={filteredVisitors.length}
                  onPageChange={setVisitorPage}
                />
              </div>
            </div>
          )}

          {/* TAB 3: CLIENTS */}
          {activeTab === "Clients" && (
            <div className="max-w-7xl mx-auto space-y-4 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900 p-4 rounded-3xl shadow-lg border border-slate-800">
                <select
                  value={clientFilterConsultant}
                  onChange={(e) => {
                    setClientFilterConsultant(e.target.value);
                    setClientPage(1);
                  }}
                  className="bg-slate-800 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-3 rounded-2xl border-none focus:ring-2 focus:ring-pink-300 outline-none cursor-pointer transition-all"
                >
                  <option value="">All Consultants</option>
                  {CONSULTANTS.map((name) => (
                    <option key={name} value={name}>
                      {name.toUpperCase()}
                    </option>
                  ))}
                </select>

                <select
                  value={clientFilterCountry}
                  onChange={(e) => {
                    setClientFilterCountry(e.target.value);
                    setClientPage(1);
                  }}
                  className="bg-slate-800 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-3 rounded-2xl border-none focus:ring-2 focus:ring-pink-300 outline-none cursor-pointer transition-all"
                >
                  <option value="">All Destination Countries</option>
                  {uniqueCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    setClientFilterConsultant("");
                    setClientFilterCountry("");
                    setSearchQuery("");
                  }}
                  className="bg-pink-200 text-slate-900 text-[11px] font-black uppercase tracking-widest px-4 py-3 rounded-2xl hover:bg-pink-300 transition-all shadow-lg shadow-pink-500/10"
                >
                  Reset Directory
                </button>
              </div>

              <div className="bg-white rounded-4xl shadow-xl shadow-slate-200/50 border border-white overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
                  <h3 className="font-black text-slate-900 text-xs uppercase tracking-[0.2em]">
                    Active Client Database
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      Filtered Result:
                    </span>
                    <span className="text-xs font-bold text-pink-500">
                      {filteredClients.length}
                    </span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50 text-slate-400 text-[9px] uppercase font-black tracking-[0.2em] border-b">
                        <th className="px-8 py-4 text-center w-16">#</th>
                        <th className="px-8 py-4">Client Detail</th>
                        <th className="px-8 py-4">Identification</th>
                        <th className="px-8 py-4">Consultant</th>
                        <th className="px-8 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {!loading &&
                        paginate(filteredClients, clientPage).map(
                          (client, idx) => (
                            <tr
                              key={client._id}
                              className="hover:bg-slate-50/80 transition-all group"
                            >
                              <td className="px-8 py-5 text-center text-slate-300 font-bold text-xs">
                                {(clientPage - 1) * ITEMS_PER_PAGE + idx + 1}
                              </td>
                              <td className="px-8 py-5">
                                <div className="font-bold text-slate-900 text-sm">
                                  {client.clientName}
                                </div>
                                <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">
                                  {client.destinationCountry || "Global"} •{" "}
                                  {client.nationality}
                                </div>
                              </td>
                              <td className="px-8 py-5">
                                <div className="text-xs font-bold text-slate-700">
                                  {client.contactNo}
                                </div>
                                <div className="text-[10px] text-slate-400 font-bold mt-0.5">
                                  QID: {client.QID}
                                </div>
                              </td>
                              <td className="px-8 py-5">
                                <span
                                  className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${client.consultant ? "bg-slate-900 text-white" : "bg-rose-100 text-rose-600"}`}
                                >
                                  {client.consultant || "System"}
                                </span>
                              </td>
                              <td className="px-8 py-5 text-right">
                                <button
                                  onClick={() =>
                                    navigate(`/client-details/${client._id}`)
                                  }
                                  className="bg-white border border-slate-200 text-slate-900 text-[10px] px-4 py-2 rounded-xl font-black uppercase tracking-widest hover:bg-pink-200 hover:border-pink-200 transition-all shadow-sm"
                                >
                                  Profile
                                </button>
                              </td>
                            </tr>
                          ),
                        )}
                    </tbody>
                  </table>
                  {filteredClients.length === 0 && !loading && (
                    <div className="p-20 text-center text-slate-300 font-black uppercase tracking-[0.3em] text-xs">
                      No records found matching filters
                    </div>
                  )}
                </div>
                <Pagination
                  currentPage={clientPage}
                  totalItems={filteredClients.length}
                  onPageChange={setClientPage}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-6 py-4 rounded-2xl transition-all duration-300 ${active ? "bg-pink-200 text-slate-900 shadow-xl shadow-pink-500/10 scale-105" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
  >
    <span className="text-lg mr-4">{icon}</span>
    <span className="font-bold text-xs uppercase tracking-widest">{label}</span>
  </button>
);

const StatCard = ({ label, value, color, loading, live }) => (
  <div className="bg-white p-6 rounded-4xl shadow-xl shadow-slate-200/50 border border-white">
    <div className="flex justify-between items-center mb-3">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      {live && (
        <div className="h-2 w-2 rounded-full bg-pink-400 animate-ping"></div>
      )}
    </div>
    <h3
      className={`text-2xl font-black ${color} tracking-tight ${loading ? "animate-pulse" : ""}`}
    >
      {loading ? "..." : value}
    </h3>
  </div>
);

const Table = ({ columns, data, loading }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead className="bg-slate-50/50 text-slate-400 text-[9px] uppercase font-black tracking-[0.2em] border-b">
        <tr>
          {columns.map((col) => (
            <th key={col} className="px-8 py-4">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {!loading &&
          data.map((item, idx) => (
            <tr key={idx} className="hover:bg-slate-50/80 transition-all group">
              <td className="px-8 py-5 font-bold text-slate-900 text-xs capitalize">
                {item.name || item.clientName}
              </td>
              <td className="px-8 py-5">
                <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                  {item.consultant || "HQ"}
                </span>
              </td>
              <td className="px-8 py-5 text-slate-700 font-bold text-xs">
                {item.interestedCountry ||
                  item.destinationCountry ||
                  "General Inquiry"}
              </td>
              <td className="px-8 py-5 text-slate-400 font-bold text-[10px]">
                {new Date(item.date || item.createdAt).toLocaleDateString(
                  undefined,
                  { month: "short", day: "numeric", year: "numeric" },
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

const Pagination = ({ currentPage, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  if (totalPages <= 1) return null;
  return (
    <div className="px-8 py-5 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange((prev) => prev - 1)}
          className="p-2.5 border border-slate-200 rounded-xl bg-white hover:bg-pink-50 disabled:opacity-30 transition-all shadow-sm"
        >
          <FaChevronLeft size={10} />
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange((prev) => prev + 1)}
          className="p-2.5 border border-slate-200 rounded-xl bg-white hover:bg-pink-50 disabled:opacity-30 transition-all shadow-sm"
        >
          <FaChevronRight size={10} />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
