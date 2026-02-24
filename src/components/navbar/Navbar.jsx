import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronRight, FaChevronDown, FaBars } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import Logo from "../../assets/company-logo.jpg";

/* ================= MENU DATA ================= */
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

/* ================= DESKTOP COMPONENTS ================= */

const DesktopVisaServices = () => (
  <li className="group relative">
    <button className="hover:bg-cyan-400 text-gray-800 flex items-center bg-fuchsia-300 px-3 py-1 rounded-md transition-colors">
      Visa Services <FaChevronDown className="ml-1 text-sm text-white" />
    </button>

    <ul className="absolute left-0 top-full hidden group-hover:block w-52 bg-white shadow-xl rounded-md z-50 py-2 border border-gray-100">
      {/* 1. Work Visa */}
      <li className="group/visa relative px-4 py-2 hover:bg-cyan-100 cursor-pointer flex justify-between items-center text-gray-700">
        Work Visa <FaChevronRight className="text-xs" />
        <ul className="absolute top-0 left-full hidden group-hover/visa:block w-48 bg-white shadow-lg rounded-md border border-gray-100">
          {menuData.workVisa.map((item, idx) => (
            <li key={idx}>
              <Link className="block px-4 py-2 hover:bg-cyan-200 text-gray-500 border-b border-gray-50" to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </li>

      {/* 2. Visit Visa */}
      <li className="group/visa relative px-4 py-2 hover:bg-cyan-100 cursor-pointer flex justify-between items-center text-gray-700">
        Visit Visa <FaChevronRight className="text-xs" />
        <div className="absolute top-0 left-full hidden group-hover/visa:block w-52 bg-white shadow-lg rounded-md border border-gray-100">
          {/* Europe Sub */}
          <div className="group/country relative px-4 py-2 hover:bg-cyan-200 flex justify-between items-center">
            Europe <FaChevronRight className="text-xs" />
            <ul className="absolute top-0 left-full hidden group-hover/country:block w-48 bg-white shadow-lg rounded-md">
              {menuData.visitVisa.europe.map((item, idx) => (
                <li key={idx}><Link className="block px-4 py-2 hover:bg-cyan-200 text-gray-500 border-b" to={item.link}>{item.name}</Link></li>
              ))}
            </ul>
          </div>
          {/* Primary Others */}
          {menuData.visitVisa.other.map((item, idx) => (
            <Link key={idx} className="block px-4 py-2 hover:bg-cyan-200 text-gray-500 border-b" to={item.link}>{item.name}</Link>
          ))}
          {/* Asian/Others Sub */}
          <div className="group/country relative px-4 py-2 hover:bg-cyan-200 flex justify-between items-center border-t border-gray-50">
            Others <FaChevronRight className="text-xs" />
            <ul className="absolute top-0 left-full hidden group-hover/country:block w-48 bg-white shadow-lg rounded-md">
              {menuData.visitVisa.visitOthers.map((item, idx) => (
                <li key={idx}><Link className="block px-4 py-2 hover:bg-cyan-200 text-gray-500 border-b" to={item.link}>{item.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </li>

      {/* 3. Student Visa */}
      {/* <li className="group/visa relative px-4 py-2 hover:bg-cyan-100 cursor-pointer flex justify-between items-center text-gray-700 border-t">
        Student Visa <FaChevronRight className="text-xs" />
        <div className="absolute top-0 left-full hidden group-hover/visa:block w-52 bg-white shadow-lg rounded-md border border-gray-100">
          <div className="group/country relative px-4 py-2 hover:bg-cyan-200 flex justify-between items-center">
            Europe <FaChevronRight className="text-xs" />
            <ul className="absolute top-0 left-full hidden group-hover/country:block w-48 bg-white shadow-lg rounded-md">
              {menuData.studentVisa.europe.map((item, idx) => (
                <li key={idx}><Link className="block px-4 py-2 hover:bg-cyan-200 text-gray-500 border-b" to={item.link}>{item.name}</Link></li>
              ))}
            </ul>
          </div>
          {menuData.studentVisa.other.map((item, idx) => (
            <Link key={idx} className="block px-4 py-2 hover:bg-cyan-200 text-gray-500 border-b" to={item.link}>{item.name}</Link>
          ))}
        </div>
      </li> */}
    </ul>
  </li>
);

const DesktopSimpleDropdown = ({ title, items }) => (
  <li className="group relative">
    <button className="hover:bg-cyan-400 text-gray-800 flex items-center bg-fuchsia-300 px-3 py-1 rounded-md">
      {title} <FaChevronDown className="ml-1 text-sm text-white" />
    </button>
    <ul className="absolute left-0 top-full hidden group-hover:block w-48 bg-white shadow-lg rounded-md z-50 py-1">
      {items.map((item, idx) => (
        <li key={idx}>
          <Link className="block px-4 py-2 hover:bg-cyan-200 text-gray-500 border-b border-gray-100" to={item.link}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </li>
);

/* ================= MOBILE COMPONENTS ================= */

const MobileSimpleMenu = ({ title, items, closeMenu }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-gray-100">
      <button className="w-full text-left px-4 py-3 font-medium flex justify-between items-center hover:bg-fuchsia-50" onClick={() => setOpen(!open)}>
        {title} {open ? <FaChevronDown /> : <FaChevronRight />}
      </button>
      {open && (
        <div className="bg-fuchsia-50/30">
          {items.map((item, idx) => (
            <Link key={idx} to={item.link} onClick={closeMenu} className="block px-8 py-2 border-b border-gray-100 text-gray-600">
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const MobileNestedMenu = ({ title, europe, other, visitOthers, closeMenu }) => {
  const [open, setOpen] = useState(false);
  const [europeOpen, setEuropeOpen] = useState(false);
  const [othersOpen, setOthersOpen] = useState(false);

  return (
    <div className="border-t border-gray-100">
      <button className="w-full text-left px-4 py-3 font-medium flex justify-between items-center" onClick={() => setOpen(!open)}>
        {title} {open ? <FaChevronDown /> : <FaChevronRight />}
      </button>
      {open && (
        <div className="bg-fuchsia-50/30">
          {/* Europe */}
          <button className="w-full text-left px-8 py-2 flex justify-between items-center text-gray-700" onClick={() => setEuropeOpen(!europeOpen)}>
            Europe {europeOpen ? <FaChevronDown className="text-xs"/> : <FaChevronRight className="text-xs"/>}
          </button>
          {europeOpen && (
            <div className="pl-12 bg-white/50">
              {europe.map((item, idx) => (
                <Link key={idx} to={item.link} onClick={closeMenu} className="block py-2 border-b text-sm text-gray-500">{item.name}</Link>
              ))}
            </div>
          )}

          {/* Asian/VisitOthers */}
          {visitOthers && (
            <>
              <button className="w-full text-left px-8 py-2 flex justify-between items-center text-gray-700" onClick={() => setOthersOpen(!othersOpen)}>
                Others {othersOpen ? <FaChevronDown className="text-xs"/> : <FaChevronRight className="text-xs"/>}
              </button>
              {othersOpen && (
                <div className="pl-12 bg-white/50">
                  {visitOthers.map((item, idx) => (
                    <Link key={idx} to={item.link} onClick={closeMenu} className="block py-2 border-b text-sm text-gray-500">{item.name}</Link>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Main "Other" list */}
          {other.map((item, idx) => (
            <Link key={idx} to={item.link} onClick={closeMenu} className="block px-8 py-2 border-b text-gray-600">{item.name}</Link>
          ))}
        </div>
      )}
    </div>
  );
};

/* ================= MAIN NAVBAR ================= */

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileVisaOpen, setMobileVisaOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const isTareqAdmin = user?.name === "Tareq" && user?.role === "admin";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    setMobileOpen(false);
  };

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <nav className="bg-white shadow-md shadow-fuchsia-100 relative z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" onClick={closeMobileMenu}>
          <img src={Logo} alt="Logo" className="h-12 w-12 rounded-full border border-fuchsia-200" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-1 justify-center space-x-4 items-center font-medium">
          <li><Link to="/" className="hover:bg-cyan-400 text-gray-800 bg-fuchsia-300 px-3 py-1 rounded-md transition-all">Home</Link></li>
          <DesktopVisaServices />
          <DesktopSimpleDropdown title="Client Info" items={menuData.clientInfo} />
          <DesktopSimpleDropdown title="Visitor" items={menuData.visitor} />
          {isTareqAdmin && (
            <li><Link to="/dashboard" className="hover:bg-green-400 text-gray-800 bg-green-300 px-3 py-2 rounded-md">Dashboard</Link></li>
          )}
        </ul>

        <div className="flex items-center">
          {token && (
            <button onClick={handleLogout} className="hidden md:block bg-fuchsia-400 text-white hover:bg-red-400 px-4 py-1 rounded-lg transition-colors">Logout</button>
          )}
          <div className="md:hidden ml-4">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <GiCancel className="w-8 h-8 text-fuchsia-700" /> : <FaBars className="w-8 h-8 text-fuchsia-500" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-fuchsia-100 shadow-2xl absolute w-full left-0">
          <Link to="/" onClick={closeMobileMenu} className="block px-4 py-3 font-semibold hover:bg-gray-50 border-b">Home</Link>
          <div className="border-b">
            <button className="w-full text-left px-4 py-3 font-bold text-fuchsia-600 flex justify-between items-center bg-fuchsia-50/50" onClick={() => setMobileVisaOpen(!mobileVisaOpen)}>
              VISA SERVICES {mobileVisaOpen ? <FaChevronDown /> : <FaChevronRight />}
            </button>
            {mobileVisaOpen && (
              <div className="bg-white">
                <MobileSimpleMenu title="Work Visa" items={menuData.workVisa} closeMenu={closeMobileMenu} />
                {/* 🔥 Updated Visit Visa with visitOthers prop */}
                <MobileNestedMenu 
                    title="Visit Visa" 
                    europe={menuData.visitVisa.europe} 
                    other={menuData.visitVisa.other} 
                    visitOthers={menuData.visitVisa.visitOthers} 
                    closeMenu={closeMobileMenu} 
                />
                <MobileNestedMenu title="Student Visa" europe={menuData.studentVisa.europe} other={menuData.studentVisa.other} closeMenu={closeMobileMenu} />
              </div>
            )}
          </div>
          <MobileSimpleMenu title="Client Info" items={menuData.clientInfo} closeMenu={closeMobileMenu} />
          <MobileSimpleMenu title="Visitor" items={menuData.visitor} closeMenu={closeMobileMenu} />
          {isTareqAdmin && (
            <Link to="/clients" onClick={closeMobileMenu} className="block px-4 py-3 border-t font-semibold text-cyan-600">Clients</Link>
          )}
          {token && <button onClick={handleLogout} className="w-full bg-red-500 text-white py-3 font-bold">Logout</button>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;