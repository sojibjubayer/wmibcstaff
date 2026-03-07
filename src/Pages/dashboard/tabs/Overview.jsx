import React, { useMemo } from 'react';
import StatCard from '../components/StatCard';

const CONSULTANTS = ["nizam", "sandesh", "saru", "shohag", "adil"];

const Overview = ({ stats, allClients, loading }) => {
  
  const consultantPerformance = useMemo(() => {
    const now = new Date();
    return CONSULTANTS.map(name => {
      let totalSales = 0;
      let monthlyClientCount = 0;
      const countedInMonth = new Set();

      allClients.forEach(client => {
        if (client.consultant?.toLowerCase() === name.toLowerCase()) {
          const payments = Array.isArray(client.amountReceived) ? client.amountReceived : [];
          payments.forEach(p => {
            const pDate = new Date(p.paymentDate || client.createdAt);
            if (pDate.getMonth() === now.getMonth() && pDate.getFullYear() === now.getFullYear()) {
              totalSales += (parseFloat(p.amount) || 0);
              if (['1st Payment', 'Pending Balance'].includes(p.paymentType) && !countedInMonth.has(client._id)) {
                monthlyClientCount++;
                countedInMonth.add(client._id);
              }
            }
          });
        }
      });
      return { name, totalSales, monthlyClientCount };
    });
  }, [allClients]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <StatCard 
          label="Today's Visitors" 
          value={stats.todayVisitors} 
          color="text-pink-500" 
          loading={loading} 
          live 
        />

        <StatCard 
          label="Monthly Visitors" 
          value={stats.monthlyVisitors} 
          color="text-slate-900" 
          loading={loading} 
        />

        {/* Updated Total Clients Card with dual values */}
        <StatCard 
          label="Total Clients" 
          value={stats.totalClients} 
          subValue={`${stats.monthlyNewClients} this month`} // Ensure StatCard supports a subValue prop or similar
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

      <div className="space-y-6">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] pl-1">Consultant Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {consultantPerformance.map(({ name, totalSales, monthlyClientCount }) => (
            <div key={name} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center">
                <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{name}</p>
                <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{monthlyClientCount}</span>
              </div>
              <h4 className="text-lg font-bold text-slate-800 mt-2">
                {totalSales.toLocaleString()} <span className="text-[10px] text-slate-400">QAR</span>
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;