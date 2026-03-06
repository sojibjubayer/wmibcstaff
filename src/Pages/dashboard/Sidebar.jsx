import React from "react";
import { FaChartPie, FaUsers, FaPassport, FaSuitcase } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1 w-full px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition
    ${active ? "bg-pink-300 text-slate-900" : "text-slate-300 hover:bg-slate-800"}`}
  >
    {icon}
    {label}
  </button>
);

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-slate-900 hidden lg:flex flex-col shadow-2xl">
      <div className="p-8">
        <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">
          WMIBC <span className="text-pink-300">HQ</span>
        </h2>
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
          label="Visitors"
          active={activeTab === "Visitors"}
          onClick={() => setActiveTab("Visitors")}
        />

        <SidebarItem
          icon={<FaSuitcase />}
          label="Clients"
          active={activeTab === "Clients"}
          onClick={() => setActiveTab("Clients")}
        />
        <SidebarItem
          icon={<FaUserGroup />}
          label="Manage Consultants"
          active={activeTab === "Manage Consultants"}
          onClick={() => setActiveTab("Manage Consultants")}
        />

        <SidebarItem
          icon={<FaPassport />}
          label="Manage Visa"
          active={activeTab === "Manage Visa"}
          onClick={() => setActiveTab("Manage Visa")}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;