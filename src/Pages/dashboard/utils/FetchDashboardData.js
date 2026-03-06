export const fetchDashboardData = async () => {
  try {
    const [visitorRes, clientRes] = await Promise.all([
      fetch(`https://wmibcstaff-server.vercel.app/api/visitor?limit=2000`),
      fetch(`https://wmibcstaff-server.vercel.app/api/clients`),
    ]);

    const visitorData = await visitorRes.json();
    const clientData = await clientRes.json();

    const visitors = visitorData.visitors || [];
    const clients = Array.isArray(clientData) ? clientData : [];

    return {
      visitors,
      clients,
      stats: {
        todayVisitors: visitors.length,
        totalVisitors: visitors.length,
        totalClients: clients.length,
        monthlyRevenue: 0,
      },
    };
  } catch (err) {
    console.error(err);
    return { visitors: [], clients: [], stats: {} };
  }
};