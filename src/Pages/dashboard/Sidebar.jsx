import React, { useState } from "react";
import {
  FaChartLine,
  FaUsers,
  FaUserTie,
  FaPassport,
  FaChevronDown,
  FaPlus,
  FaListUl
} from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

const SidebarItem = ({ icon, label, active, onClick, hasSubmenu, isOpen }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
      active
        ? "bg-pink-200 text-slate-900 shadow-xl shadow-pink-500/10 scale-105"
        : "text-slate-400 hover:text-white hover:bg-slate-800"
    }`}
  >
    <div className="flex items-center">
      <span className="text-lg mr-2">{icon}</span>
      <span className="font-bold text-[10px] uppercase tracking-widest text-left">{label}</span>
    </div>
    {hasSubmenu && (
      <FaChevronDown className={`text-[10px] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
    )}
  </button>
);

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [visaMenuOpen, setVisaMenuOpen] = useState(false);

  return (
    <aside className="fixed left-0 top-0 h-full w-80 bg-slate-900 hidden lg:flex flex-col p-4 z-40 mt-14">
      <div className="mb-12 px-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-linear-to-tr from-pink-400 to-rose-300 rounded-xl rotate-3"></div>
          <div>
            <h2 className="text-white font-black text-xl tracking-tighter">WMIBC</h2>
            <p className="text-pink-400 text-[8px] font-black uppercase tracking-[0.3em]">Administrator</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-3">
        <SidebarItem icon={<FaChartLine />} label="Overview" active={activeTab === "Overview"} onClick={() => setActiveTab("Overview")} />
        <SidebarItem icon={<FaUsers />} label="Visitors" active={activeTab === "Visitors"} onClick={() => setActiveTab("Visitors")} />
        <SidebarItem icon={<FaUserTie />} label="Clients" active={activeTab === "Clients"} onClick={() => setActiveTab("Clients")} />
        <SidebarItem icon={<FaUserGroup />} label="Consultant" active={activeTab === "Consultant Management"} onClick={() => setActiveTab("Consultant Management")} />
        
        {/* Visa Management with Sub-menu */}
        <div className="space-y-1">
          <SidebarItem 
            icon={<FaPassport />} 
            label="Visa Management" 
            active={activeTab.startsWith("Visa_")} 
            onClick={() => setVisaMenuOpen(!visaMenuOpen)} 
            hasSubmenu={true}
            isOpen={visaMenuOpen}
          />
          
          {visaMenuOpen && (
            <div className="ml-6 space-y-1 mt-2 animate-in slide-in-from-top-2 duration-200">
              <button 
                onClick={() => setActiveTab("Visa_View")}
                className={`w-full flex items-center px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${
                  activeTab === "Visa_View" ? "text-pink-400 bg-slate-800" : "text-slate-500 hover:text-white"
                }`}
              >
                <FaListUl className="mr-2" /> View Visa Info
              </button>
              <button 
                onClick={() => setActiveTab("Visa_Add")}
                className={`w-full flex items-center px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${
                  activeTab === "Visa_Add" ? "text-pink-400 bg-slate-800" : "text-slate-500 hover:text-white"
                }`}
              >
                <FaPlus className="mr-2" /> Add Visa Info
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;