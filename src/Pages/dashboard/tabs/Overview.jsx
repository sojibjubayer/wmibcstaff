import React from "react";
import StatCard from "../components/StatCard";

const Overview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      <StatCard title="Visitors Today" value="25" />
      <StatCard title="Total Clients" value="140" />
      <StatCard title="Revenue" value="$3200" />

    </div>
  );
};

export default Overview;