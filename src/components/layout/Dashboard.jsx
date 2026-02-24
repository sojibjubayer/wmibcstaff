import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation
import { 
  FaChartPie, FaUsers, FaPassport, FaCog, FaBell, 
  FaSearch, FaChevronLeft, FaChevronRight, FaSync 
} from "react-icons/fa";

const ITEMS_PER_PAGE = 15;
const CONSULTANTS = ["shohag", "adil", "nizam", "sandesh"];

const Dashboard = () => {
  const navigate = useNavigate(); // Hook for the "Details" button
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState(true);
  
  const [allVisitors, setAllVisitors] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [stats, setStats] = useState({
    todayVisitors: 0,
    totalVisitors: 0,
    totalClients: 0,
    monthlyRevenue: 0
  });

  const [visitorPage, setVisitorPage] = useState(1);
  const [clientPage, setClientPage] = useState(1);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const visitorRes = await fetch(`https://wmibcstaff-server.vercel.app/api/visitor?limit=2000`);
      const visitorData = await visitorRes.json();
      const visitors = visitorData.visitors || [];

      const clientRes = await fetch(`https://wmibcstaff-server.vercel.app/api/clients`);
      const clientData = await clientRes.json();
      const clients = Array.isArray(clientData) ? clientData : [];

      // Calculate Global Stats
      const todayString = new Date().toLocaleDateString();
      const todayCount = visitors.filter(v => v.date && new Date(v.date).toLocaleDateString() === todayString).length;
      
      let monthlySum = 0;
      const now = new Date();
      clients.forEach(c => {
        const payments = Array.isArray(c.amountReceived) ? c.amountReceived : [c.amountReceived];
        payments.forEach(p => {
          const d = new Date(p?.paymentDate || p?.date || c.createdAt);
          if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
            monthlySum += parseFloat(p?.amount || 0);
          }
        });
      });

      setStats({
        todayVisitors: todayCount,
        totalVisitors: visitors.length,
        totalClients: clients.length,
        monthlyRevenue: monthlySum
      });
      
      setAllVisitors(visitors.sort((a, b) => new Date(b.date) - new Date(a.date)));
      setAllClients(clients.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const paginate = (data, page) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-600 tracking-tight">WMIBC Global</h2>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <SidebarItem icon={<FaChartPie />} label="Overview" active={activeTab === "Overview"} onClick={() => setActiveTab("Overview")} />
          <SidebarItem icon={<FaUsers />} label="Visitors" active={activeTab === "Visitors"} onClick={() => {setActiveTab("Visitors"); setVisitorPage(1);}} />
          <SidebarItem icon={<FaPassport />} label="Clients" active={activeTab === "Clients"} onClick={() => {setActiveTab("Clients"); setClientPage(1);}} />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="relative w-96 text-slate-400">
            <FaSearch className="absolute left-3 top-3"/>
            <input type="text" placeholder="Search database..." className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex items-center gap-4">
            <button onClick={fetchData} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
               <FaSync className={loading ? "animate-spin" : ""} />
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-xs">HQ</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "Overview" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Today's Visitor" value={stats.todayVisitors} color="text-blue-600" loading={loading} live />
                <StatCard label="Total Visitors" value={stats.totalVisitors} color="text-slate-800" loading={loading} />
                <StatCard label="Total Clients" value={stats.totalClients} color="text-green-600" loading={loading} />
                <StatCard label="Monthly Revenue" value={`${stats.monthlyRevenue.toLocaleString()} QAR`} color="text-indigo-600" loading={loading} />
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/30">
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Recent Visitors</h3>
                </div>
                <Table 
                  columns={["Name", "Consultant", "Country", "Date"]}
                  data={allVisitors.slice(0, 10)}
                  loading={loading}
                />
              </div>
            </div>
          )}

          {/* TAB 2: VISITORS */}
          {activeTab === "Visitors" && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h3 className="font-bold text-slate-800">All Visitors List</h3>
              </div>
              <Table 
                columns={["Name", "Consultant", "Country", "Date"]}
                data={paginate(allVisitors, visitorPage)}
                loading={loading}
              />
              <Pagination 
                currentPage={visitorPage} 
                totalItems={allVisitors.length} 
                onPageChange={setVisitorPage} 
              />
            </div>
          )}

          {/* TAB 3: CLIENTS */}
          {activeTab === "Clients" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {CONSULTANTS.map(name => {
                   const consultantClients = allClients.filter(c => c.consultant?.toLowerCase() === name.toLowerCase());
                   const totalSales = consultantClients.reduce((sum, client) => {
                     const payments = Array.isArray(client.amountReceived) ? client.amountReceived : [client.amountReceived];
                     const first = payments.find(p => p?.paymentType === "1st Payment");
                     return sum + parseFloat(first?.amount || 0);
                   }, 0);

                   return (
                    <div key={name} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-xs font-black text-blue-600 uppercase tracking-widest">{name}</p>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{consultantClients.length} Clients</span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-800">{totalSales.toLocaleString()} QAR</h4>
                    </div>
                   );
                })}
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/30 font-bold text-slate-800 uppercase text-xs tracking-widest">
                  Global Client Directory
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wider border-b">
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Destination</th>
                        <th className="px-6 py-4">Submission Date</th>
                        <th className="px-6 py-4">Consultant</th>
                        <th className="px-6 py-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {loading ? (
                        <tr><td colSpan="5" className="text-center py-10">Loading...</td></tr>
                      ) : paginate(allClients, clientPage).map((client) => (
                        <tr key={client._id} className="hover:bg-blue-50/30 transition-colors">
                          <td className="px-6 py-4 font-semibold text-slate-800">{client.clientName || client.name}</td>
                          <td className="px-6 py-4 text-slate-600">{client.destinationCountry || "N/A"}</td>
                          <td className="px-6 py-4 text-slate-500">
                            {client.fileSubmissionDate ? new Date(client.fileSubmissionDate).toLocaleDateString() : "-"}
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-[10px] font-bold uppercase border border-blue-100">
                              {client.consultant || "Unassigned"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button 
                              onClick={() => navigate(`/client-details/${client._id}`)}
                              className="bg-slate-900 text-white text-[10px] px-4 py-2 rounded-lg font-bold uppercase hover:bg-blue-600 transition-all"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Pagination 
                  currentPage={clientPage} 
                  totalItems={allClients.length} 
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

// --- SUB-COMPONENTS (Keep these below or in separate files) ---

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${active ? "bg-blue-50 text-blue-600 shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}>
    <span className="text-lg mr-4">{icon}</span>
    <span className="font-semibold text-sm">{label}</span>
  </button>
);

const StatCard = ({ label, value, color, loading, live }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
    <div className="flex justify-between items-start mb-1">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      {live && <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse mt-1"></span>}
    </div>
    <h3 className={`text-2xl font-bold ${color} ${loading ? 'animate-pulse' : ''}`}>{loading ? "..." : value}</h3>
  </div>
);

const Table = ({ columns, data, loading }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
        <tr>
          {columns.map(col => <th key={col} className="px-6 py-4 font-semibold">{col}</th>)}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 text-sm">
        {!loading && data.map((item, idx) => (
          <tr key={idx} className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 font-medium text-slate-700">{item.name || item.clientName}</td>
            <td className="px-6 py-4">
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-[10px] font-bold uppercase">
                {item.consultant || "Unassigned"}
              </span>
            </td>
            <td className="px-6 py-4 text-slate-600">
              {item.interestedCountry || item.country || item.destinationCountry || "N/A"}
            </td>
            <td className="px-6 py-4 text-slate-500">
              {new Date(item.date || item.createdAt).toLocaleDateString()}
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
    <div className="px-6 py-4 border-t flex items-center justify-between bg-slate-50">
      <span className="text-xs text-slate-500 font-medium">Showing page {currentPage} of {totalPages}</span>
      <div className="flex gap-2">
        <button 
          disabled={currentPage === 1} 
          onClick={() => onPageChange(prev => prev - 1)}
          className="p-2 border rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors shadow-sm"
        >
          <FaChevronLeft size={12} />
        </button>
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => onPageChange(prev => prev + 1)}
          className="p-2 border rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors shadow-sm"
        >
          <FaChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;