import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import Overview from './tabs/Overview';
import Visitors from './tabs/Visitors';
import Clients from './tabs/Clients';
import Consultants from './tabs/Consultants'; // Import the new component

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [allVisitors, setAllVisitors] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [visitorRes, clientRes] = await Promise.all([
        fetch("https://wmibcstaff-server.vercel.app/api/visitor?limit=1000"),
        fetch("https://wmibcstaff-server.vercel.app/api/clients")
      ]);
      
      const vJson = await visitorRes.json();
      const cJson = await clientRes.json();
      
      setAllVisitors(vJson.visitors || []); 
      setAllClients(Array.isArray(cJson) ? cJson : []);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const stats = useMemo(() => {
    const now = new Date();
    const todayStr = now.toDateString();
    
    const todayVisitors = allVisitors.filter(v => 
      new Date(v.date || v.createdAt).toDateString() === todayStr
    ).length;

    const monthlyVisitors = allVisitors.filter(v => {
      const vDate = new Date(v.date || v.createdAt);
      return vDate.getMonth() === now.getMonth() && vDate.getFullYear() === now.getFullYear();
    }).length;

    let monthlyRevenue = 0;
    let monthlyNewClients = 0;
    const countedInMonth = new Set();

    allClients.forEach(client => {
      const payments = Array.isArray(client.amountReceived) ? client.amountReceived : [];
      payments.forEach(p => {
        const pDate = new Date(p.paymentDate || client.createdAt);
        if (pDate.getMonth() === now.getMonth() && pDate.getFullYear() === now.getFullYear()) {
          monthlyRevenue += (parseFloat(p.amount) || 0);
          if (['1st Payment', 'Pending Balance'].includes(p.paymentType) && !countedInMonth.has(client._id)) {
            monthlyNewClients++;
            countedInMonth.add(client._id);
          }
        }
      });
    });

    return { todayVisitors, monthlyVisitors, monthlyRevenue, monthlyNewClients, totalClients: allClients.length };
  }, [allVisitors, allClients]);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 lg:ml-80 p-4 lg:p-2">
        <DashboardHeader  />
        <div className="mt-8">
          {activeTab === "Overview" && <Overview stats={stats} allClients={allClients} loading={loading} />}
          {activeTab === "Visitors" && <Visitors searchQuery={searchQuery} />}
          {activeTab === "Clients" && <Clients data={allClients} searchQuery={searchQuery} loading={loading} />}
          {/* New Tab Render */}
          {activeTab === "Consultant Management" && <Consultants />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;