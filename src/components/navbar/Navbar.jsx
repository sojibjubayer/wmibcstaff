import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronRight, FaChevronDown, FaBars } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import Logo from "../../assets/company-logo.jpg";

/* ================= ALL DATA RESTORED ================= */
const menuData = {
  studentVisa: {
    europe: [
      { name: "Germany", link: "/student-visa/Germany" },
      { name: "Netherlands", link: "/student-visa/Netherlands" },
      { name: "Sweden", link: "/student-visa/Sweden" },
      { name: "Denmark", link: "/student-visa/Denmark" },
      { name: "Poland", link: "/student-visa/Poland" },
      { name: "France", link: "/student-visa/France" },
      { name: "Italy", link: "/student-visa/Italy" },
      { name: "Malta", link: "/student-visa/Malta" },
      { name: "Hungary", link: "/student-visa/Hungary" },
      { name: "Lithuania", link: "/student-visa/Lithuania" },
      { name: "Estonia", link: "/student-visa/Estonia" },
      { name: "Romania", link: "/student-visa/Romania" },
    ],
    other: [
      { name: "USA", link: "/student-visa/USA" },
      { name: "Canada", link: "/student-visa/Canada" },
      { name: "Australia", link: "/student-visa/Australia" },
      { name: "New Zealand", link: "/student-visa/NewZealand" },
      { name: "UK", link: "/student-visa/UK" },
      { name: "Malaysia", link: "/student-visa/Malaysia" },
    ],
  },
  visitVisa: {
    europe: [
      { name: "France", link: "/visit-visa/france" },
      { name: "Germany", link: "/visit-visa/germany" },
      { name: "Italy", link: "/visit-visa/italy" },
      { name: "Spain", link: "/visit-visa/spain" },
      { name: "Greece", link: "/visit-visa/greece" },
      { name: "Netherlands", link: "/visit-visa/netherlands" },
      { name: "Switzerland", link: "/visit-visa/switzerland" },
      { name: "Austria", link: "/visit-visa/austria" },
    ],
    other: [
      { name: "USA", link: "/visit-visa/usa" },
      { name: "Canada", link: "/visit-visa/canada" },
      { name: "Australia", link: "/visit-visa/australia" },
      { name: "New Zealand", link: "/visit-visa/new-zealand" },
      { name: "United Kingdom", link: "/visit-visa/uk" },
      { name: "Turkey", link: "/visit-visa/turkey" },
    ],
    visitOthers: [
      { name: "Thailand", link: "/visit-visa/thailand" },
      { name: "China", link: "/visit-visa/china" },
      { name: "Singapore", link: "/visit-visa/singapore" },
      { name: "South Korea", link: "/visit-visa/south-korea" },
      { name: "Japan", link: "/visit-visa/japan" },
      { name: "India", link: "/visit-visa/india" },
      { name: "Malaysia", link: "/visit-visa/malaysia" },
    ],
  },
  workVisa: [
    { name: "Greece", link: "/work-visa/greece" },
    { name: "Portugal", link: "/work-visa/portugal" },
    { name: "Poland", link: "/work-visa/poland" },
    { name: "Bulgaria", link: "/work-visa/bulgaria" },
    { name: "Croatia", link: "/work-visa/croatia" },
    { name: "Serbia", link: "/work-visa/serbia" },
    { name: "North Macedonia", link: "/work-visa/north-macedonia" },
    { name: "Cyprus", link: "/work-visa/cyprus" },
    { name: "Montenegro", link: "/work-visa/montenegro" },
  ],
  clientInfo: [
    { name: "Add Client ", link: "/client-form" },
    { name: "View Client ", link: "/client-info" },
  ],
  visitor: [
    { name: "Add Visitor ", link: "/add-new-visitor" },
    { name: "Visitor List", link: "/visitor-list" },
  ],
};

/* ================= DESKTOP COMPONENTS WITH GAP FIX ================= */

const DesktopVisaServices = () => (
  <li className="group relative">
    <button className="bg-pink-200 shadow-md shadow-pink-200/50 hover:bg-pink-300 text-slate-800 flex items-center px-4 py-1.5 rounded-lg transition-all font-bold">
      Visa Services <FaChevronDown className="ml-2 text-[10px] opacity-50" />
    </button>

    <ul className="absolute left-0 top-full hidden group-hover:block w-52 bg-white shadow-2xl rounded-xl z-50 py-2 border border-slate-100 transition-all">
      {/* Bridge Div to prevent closing when moving mouse */}
      <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>

      {/* 1. Work Visa */}
      <li className="group/visa relative px-4 py-2 hover:bg-slate-50 cursor-pointer flex justify-between items-center text-slate-700 font-medium text-sm">
        Work Visa <FaChevronRight className="text-[10px] opacity-40" />
        <ul className="absolute top-0 left-full hidden group-hover/visa:block w-52 bg-white shadow-xl rounded-xl border border-slate-100 py-2 ml-0">
          <div className="absolute top-0 -left-4 w-4 h-full bg-transparent"></div>
          {menuData.workVisa.map((item, idx) => (
            <li key={idx}><Link className="block px-4 py-2 hover:bg-pink-50 text-slate-500 text-sm border-b border-slate-50 last:border-0" to={item.link}>{item.name}</Link></li>
          ))}
        </ul>
      </li>

      {/* 2. Visit Visa */}
      <li className="group/visa relative px-4 py-2 hover:bg-slate-50 cursor-pointer flex justify-between items-center text-slate-700 font-medium text-sm">
        Visit Visa <FaChevronRight className="text-[10px] opacity-40" />
        <div className="absolute top-0 left-full hidden group-hover/visa:block w-52 bg-white shadow-xl rounded-xl border border-slate-100 py-2 ml-0">
          <div className="absolute top-0 -left-4 w-4 h-full bg-transparent"></div>
          {/* Europe Sub */}
          <div className="group/country relative px-4 py-2 hover:bg-pink-50 flex justify-between items-center">
            Europe <FaChevronRight className="text-[10px]" />
            <ul className="absolute top-0 left-full hidden group-hover/country:block w-48 bg-white shadow-xl rounded-xl border border-slate-100 py-2">
              <div className="absolute top-0 -left-4 w-4 h-full bg-transparent"></div>
              {menuData.visitVisa.europe.map((item, idx) => (
                <li key={idx}><Link className="block px-4 py-2 hover:bg-pink-50 text-slate-500" to={item.link}>{item.name}</Link></li>
              ))}
            </ul>
          </div>
          {menuData.visitVisa.other.map((item, idx) => (
            <Link key={idx} className="block px-4 py-2 hover:bg-pink-50 text-slate-500 border-b border-slate-50 last:border-0" to={item.link}>{item.name}</Link>
          ))}
        </div>
      </li>

      {/* 3. Student Visa (Restored) */}
      <li className="group/visa relative px-4 py-2 hover:bg-slate-50 cursor-pointer flex justify-between items-center text-slate-700 font-medium text-sm">
        Student Visa <FaChevronRight className="text-[10px] opacity-40" />
        <div className="absolute top-0 left-full hidden group-hover/visa:block w-52 bg-white shadow-xl rounded-xl border border-slate-100 py-2 ml-0">
          <div className="absolute top-0 -left-4 w-4 h-full bg-transparent"></div>
          <div className="group/country relative px-4 py-2 hover:bg-pink-50 flex justify-between items-center text-sm">
            Europe <FaChevronRight className="text-[10px]" />
            <ul className="absolute top-0 left-full hidden group-hover/country:block w-48 bg-white shadow-xl rounded-xl border border-slate-100 py-2">
              <div className="absolute top-0 -left-4 w-4 h-full bg-transparent"></div>
              {menuData.studentVisa.europe.map((item, idx) => (
                <li key={idx}><Link className="block px-4 py-2 hover:bg-pink-50 text-slate-500 border-b border-slate-50 last:border-0" to={item.link}>{item.name}</Link></li>
              ))}
            </ul>
          </div>
          {menuData.studentVisa.other.map((item, idx) => (
            <Link key={idx} className="block px-4 py-2 hover:bg-pink-50 text-slate-500 border-b border-slate-50 last:border-0" to={item.link}>{item.name}</Link>
          ))}
        </div>
      </li>
    </ul>
  </li>
);

const DesktopSimpleDropdown = ({ title, items }) => (
  <li className="group relative">
    <button className="bg-pink-200 shadow-md shadow-pink-200/50 hover:bg-pink-300 text-slate-800 flex items-center px-4 py-1.5 rounded-lg font-bold transition-all">
      {title} <FaChevronDown className="ml-2 text-[10px] opacity-50" />
    </button>
    <ul className="absolute left-0 top-full hidden group-hover:block w-48 bg-white shadow-2xl rounded-xl z-50 py-2 border border-slate-100 transition-all">
      <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
      {items.map((item, idx) => (
        <li key={idx}>
          <Link className="block px-4 py-2 hover:bg-pink-50 text-slate-600 text-sm border-b border-slate-50 last:border-0" to={item.link}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </li>
);

/* ================= MAIN NAVBAR ================= */

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const isTareqAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    setMobileOpen(false);
  };

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={Logo} alt="Logo" className="h-10 w-10 rounded-xl shadow-sm border border-pink-100" />
          <span className="font-black text-slate-800 tracking-tighter text-xl hidden lg:block">WMIBC</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-1 justify-center space-x-3 items-center">
          <li>
            <Link to="/" className="bg-pink-200 shadow-md shadow-pink-200/50 hover:bg-pink-300 text-slate-800 px-4 py-1.5 rounded-lg transition-all font-bold">
              Home
            </Link>
          </li>
          <DesktopVisaServices />
          <DesktopSimpleDropdown title="Client Info" items={menuData.clientInfo} />
          <DesktopSimpleDropdown title="Visitor" items={menuData.visitor} />
          
          {isTareqAdmin && (
            <li>
              <Link to="/dashboard" className="bg-slate-900 text-white hover:bg-slate-800 px-4 py-1.5 rounded-lg shadow-lg shadow-slate-200 transition-all font-bold">
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {token && (
            <div className="hidden md:flex items-center space-x-4 border-l border-slate-100 pl-4">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Staff</span>
                <span className="text-slate-900 font-bold text-sm leading-tight">{user?.name || "User"}</span>
              </div>
              <button onClick={handleLogout} className="bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 px-4 py-1.5 rounded-lg transition-all text-sm font-bold">
                Logout
              </button>
            </div>
          )}
          {/* Mobile Bars icon goes here... */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;