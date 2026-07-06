import React, { useMemo } from "react";
import StatCard from "../components/StatCard";

const CONSULTANTS = ["nizam", "sandesh", "tarikul", "adil",]; 

const normalizeCurrency = (currency) => {
  if (currency === "BDT") return "BDT";
  return "Riyal";
};

const formatMoney = (amount, currency) => {
  return `${Number(amount || 0).toLocaleString()} ${currency}`;
};

const Overview = ({ stats, allClients = [], loading }) => {
  const currentMonthData = useMemo(() => {
    const now = new Date();

    const monthlyRevenue = {
      Riyal: 0,
      BDT: 0,
    };

    allClients.forEach((client) => {
      const currency = normalizeCurrency(client.currency);
      const payments = Array.isArray(client.amountReceived)
        ? client.amountReceived
        : [];

      payments.forEach((payment) => {
        const paymentDate = new Date(payment.paymentDate || client.createdAt);

        const isCurrentMonth =
          paymentDate.getMonth() === now.getMonth() &&
          paymentDate.getFullYear() === now.getFullYear();

        if (isCurrentMonth) {
          monthlyRevenue[currency] += parseFloat(payment.amount) || 0;
        }
      });
    });

    return monthlyRevenue;
  }, [allClients]);

  const consultantPerformance = useMemo(() => {
    const now = new Date();

    return CONSULTANTS.map((name) => {
      const totalSales = {
        Riyal: 0,
        BDT: 0,
      };

      let monthlyClientCount = 0;
      const countedInMonth = new Set();

      allClients.forEach((client) => {
        if (client.consultant?.toLowerCase() !== name.toLowerCase()) return;

        const currency = normalizeCurrency(client.currency);
        const payments = Array.isArray(client.amountReceived)
          ? client.amountReceived
          : [];

        payments.forEach((payment) => {
          const paymentDate = new Date(payment.paymentDate || client.createdAt);

          const isCurrentMonth =
            paymentDate.getMonth() === now.getMonth() &&
            paymentDate.getFullYear() === now.getFullYear();

          if (!isCurrentMonth) return;

          totalSales[currency] += parseFloat(payment.amount) || 0;

          if (
            ["1st Payment", "Pending Balance"].includes(payment.paymentType) &&
            !countedInMonth.has(client._id)
          ) {
            monthlyClientCount++;
            countedInMonth.add(client._id);
          }
        });
      });

      return {
        name,
        totalSales,
        monthlyClientCount,
      };
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

        <StatCard
          label="Total Clients"
          value={stats.totalClients}
          subValue={`${stats.monthlyNewClients} this month`}
          color="text-blue-600"
          loading={loading}
        />

        <StatCard
          label="Monthly Revenue"
          value={formatMoney(currentMonthData.Riyal, "Riyal")}
          subValue={formatMoney(currentMonthData.BDT, "BDT")}
          color="text-emerald-600"
          loading={loading}
        />
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] pl-1">
          Consultant Performance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {consultantPerformance.map(
            ({ name, totalSales, monthlyClientCount }) => (
              <div
                key={name}
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100"
              >
                <div className="flex justify-between items-center">
                  <p className="text-xs font-black text-slate-900 uppercase tracking-widest">
                    {name}
                  </p>

                  <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                    {monthlyClientCount}
                  </span>
                </div>

                <div className="mt-3 space-y-1">
                  <h4 className="text-lg font-bold text-slate-800">
                    {totalSales.Riyal.toLocaleString()}{" "}
                    <span className="text-[10px] text-slate-400">Riyal</span>
                  </h4>

                  <p className="text-sm font-bold text-slate-500">
                    {totalSales.BDT.toLocaleString()}{" "}
                    <span className="text-[10px] text-slate-400">BDT</span>
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;