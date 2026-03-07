import React from "react";
import {
  FaChartLine,
  FaUsers,
  FaUserTie,
  FaSignOutAlt,
  FaPassport,
} from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-5 py-3 rounded-2xl transition-all duration-300 ${
      active
        ? "bg-pink-200 text-slate-900 shadow-xl shadow-pink-500/10 scale-105"
        : "text-slate-400 hover:text-white hover:bg-slate-800"
    }`}
  >
    <span className="text-lg mr-2">{icon}</span>
    <span className="font-bold text-xs uppercase tracking-widest">{label}</span>
  </button>
);

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-73 bg-slate-900 hidden lg:flex flex-col p-4 z-40 mt-14">
      <div className="mb-12 px-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-linear-to-tr from-pink-400 to-rose-300 rounded-xl rotate-3"></div>
          <div>
            <h2 className="text-white font-black text-xl tracking-tighter">
              WMIBC
            </h2>
            <p className="text-pink-400 text-[8px] font-black uppercase tracking-[0.3em]">
              Administrator
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-3">
        <SidebarItem
          icon={<FaChartLine />}
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
          icon={<FaUserTie />}
          label="Clients"
          active={activeTab === "Clients"}
          onClick={() => setActiveTab("Clients")}
        />
        <SidebarItem
          icon={<FaUserGroup />}
          label="Consultant Management"
          active={activeTab === "Consultant Management"}
          onClick={() => setActiveTab("Consultant Management")}
        />
        <SidebarItem
          icon={<FaPassport />}
          label="Visa Management"
          active={activeTab === "Visa Management"}
          onClick={() => setActiveTab("Visa Management")}
        />
      </nav>

      {/* <div className="pt-8 border-t border-slate-800">
        <button className="w-full flex items-center px-6 py-4 rounded-2xl text-rose-400 hover:bg-rose-500/10 transition-all group">
          <FaSignOutAlt className="mr-4 group-hover:translate-x-1 transition-transform" />
          <span className="font-bold text-xs uppercase tracking-widest">Logout System</span>
        </button>
      </div> */}
    </aside>
  );
};

export default Sidebar;
