import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronRight, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/company-logo.jpg";

const menuData = {
  workVisa: {
    schengen: [
      { name: "Greece", link: "/work-visa/greece" },
      { name: "Portugal", link: "/work-visa/portugal" },
      { name: "Poland", link: "/work-visa/poland" },
      { name: "Croatia", link: "/work-visa/croatia" },
      { name: "Bulgaria", link: "/work-visa/bulgaria" },
    ],
    nonSchengenEurope: [
      { name: "Serbia", link: "/work-visa/serbia" },
      { name: "North Macedonia", link: "/work-visa/north-macedonia" },
      { name: "Cyprus", link: "/work-visa/cyprus" },
      { name: "Montenegro", link: "/work-visa/montenegro" },
      { name: "Bosnia", link: "/work-visa/bosnia" },
      { name: "Albania", link: "/work-visa/albania" },
    ],
    direct: [
      { name: "Turkey", link: "/work-visa/turkey" },
      { name: "UK", link: "/work-visa/uk" },
      { name: "Australia", link: "/work-visa/australia" },
      { name: "New Zealand", link: "/work-visa/new-zealand" },
      { name: "International", link: "/work-visa/international" },
    ],
  },

  clientInfo: [
    { name: "Add Client", link: "/client-form" },
    { name: "View Client", link: "/client-info" },
  ],

  visitor: [
    { name: "Add Visitor", link: "/add-new-visitor" },
    { name: "Visitor List", link: "/visitor-list" },
  ],
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activeSubAccordion, setActiveSubAccordion] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isTareqAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    setMobileOpen(false);
  };

  const toggleAccordion = (val) =>
    setActiveAccordion(activeAccordion === val ? null : val);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [mobileOpen]);

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Logo"
            className="h-10 w-10 rounded-xl shadow-sm border border-pink-100"
          />
          <span className="font-black text-slate-800 tracking-tighter text-xl hidden lg:block">
            WMIBC
          </span>
        </Link>

        {/* --- Desktop Menu --- */}
        <ul className="hidden md:flex flex-1 justify-center space-x-3 items-center">
          {/* Home */}
          <li>
            <Link
              to="/"
              className="bg-pink-200 shadow-md shadow-pink-500 hover:bg-pink-300 text-slate-800 px-4 py-1.5 rounded-lg transition-all font-bold"
            >
              Home
            </Link>
          </li>

          {/* Visa Services */}
          <li className="group relative">
            <button className="bg-pink-200 shadow-md shadow-pink-500 hover:bg-pink-300 text-slate-800 flex items-center px-4 py-1.5 rounded-lg transition-all font-bold">
              Visa Services{" "}
              <FaChevronDown className="ml-2 text-[10px] opacity-50" />
            </button>

            <div className="absolute left-0 top-full pt-2 hidden group-hover:block w-52 z-100">
              <ul className="bg-pink-200 shadow-2xl rounded-xl py-2 border border-slate-100">
                {/* Work Visa */}
                <li className="group/work relative px-4 py-2 hover:bg-white cursor-pointer flex justify-between items-center text-slate-800 font-medium text-sm">
                  Work Visa
                  <FaChevronRight className="text-[10px] opacity-40" />
                  <div className="absolute top-0 left-full pl-2 hidden group-hover/work:block w-56">
                    <ul className="bg-pink-100 shadow-xl rounded-xl border border-slate-100 py-2">
                      {/* Schengen */}
                      <li className="group/schengen relative px-4 py-2 hover:bg-white cursor-pointer flex justify-between items-center text-slate-800 text-sm font-medium">
                        Schengen
                        <FaChevronRight className="text-[10px] opacity-40" />
                        <div className="absolute top-0 left-full pl-2 hidden group-hover/schengen:block w-56">
                          <ul className="bg-pink-50 shadow-xl rounded-xl border border-slate-100 py-2">
                            {menuData.workVisa.schengen.map((item, idx) => (
                              <li key={idx}>
                                <Link
                                  to={item.link}
                                  className="block px-4 py-2 hover:bg-white text-slate-800 text-sm border-b border-white"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>

                      {/* Non-Schengen Europe */}
                      <li className="group/nonschengen relative px-4 py-2 hover:bg-white cursor-pointer flex justify-between items-center text-slate-800 text-sm font-medium border-t border-white">
                        Non-Schengen Europe
                        <FaChevronRight className="text-[10px] opacity-40" />
                        <div className="absolute top-0 left-full pl-2 hidden group-hover/nonschengen:block w-64">
                          <ul className="bg-pink-50 shadow-xl rounded-xl border border-slate-100 py-2">
                            {menuData.workVisa.nonSchengenEurope.map(
                              (item, idx) => (
                                <li key={idx}>
                                  <Link
                                    to={item.link}
                                    className="block px-4 py-2 hover:bg-white text-slate-800 text-sm border-b border-white"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </li>

                      {/* Direct items */}
                      {menuData.workVisa.direct.map((item, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 border-t border-white hover:bg-white cursor-pointer text-slate-800 text-sm font-medium"
                        >
                          <Link to={item.link} className="block w-full">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                <li className="px-4 py-2 border-t border-white hover:bg-white cursor-pointer text-slate-700 font-medium text-sm">
                  <Link to="/visit-visa" className="block w-full">
                    Visit Visa
                  </Link>
                </li>

                <li className="px-4 py-2 border-t border-white hover:bg-white cursor-pointer text-slate-700 font-medium text-sm">
                  <Link to="/student-visa" className="block w-full">
                    Student Visa
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/* Client & Visitor */}
          {[
            { title: "Client", items: menuData.clientInfo },
            { title: "Visitor", items: menuData.visitor },
          ].map((drop, i) => (
            <li key={i} className="group relative">
              <button className="bg-pink-200 shadow-md shadow-pink-500 hover:bg-pink-300 text-slate-800 flex items-center px-4 py-1.5 rounded-lg font-bold transition-all">
                {drop.title}{" "}
                <FaChevronDown className="ml-2 text-[10px] opacity-50" />
              </button>
              <div className="absolute left-0 top-full pt-2 hidden group-hover:block w-48 z-100">
                <ul className="bg-pink-200 shadow-2xl rounded-xl border border-slate-100 overflow-hidden">
                  {drop.items.map((item, idx) => {
                    // Only open in a new tab if it is exactly the "Add Visitor" link
                    const isAddVisitor = item.name === "Add Visitor";

                    return (
                      <li
                        key={idx}
                        className="border-t border-white first:border-0"
                      >
                        <Link
                          className="block px-4 py-2 hover:bg-white text-slate-800 text-sm transition-colors"
                          to={item.link}
                          target={isAddVisitor ? "_blank" : undefined}
                          rel={isAddVisitor ? "noopener noreferrer" : undefined}
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          ))}

          {/* Dashboard */}
          {isTareqAdmin && (
            <li>
              <Link
                to="/dashboard"
                className="bg-slate-900 text-white hover:bg-slate-800 px-4 py-1.5 rounded-lg shadow-md shadow-blue-400 transition-all font-bold"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Desktop User Info & Logout */}
          {token && (
            <div className="hidden md:flex items-center space-x-4 border-l border-slate-100 pl-4">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-400 font-bold uppercase leading-none">
                  Staff
                </span>
                <span className="text-slate-900 font-bold text-sm leading-tight">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 px-4 py-1.5 rounded-lg transition-all text-sm font-bold"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-pink-600 bg-pink-100 rounded-lg"
          >
            {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-md z-100 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden overflow-y-auto`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 border-b border-pink-100 pb-4">
            <div className="flex items-center gap-2">
              <img src={Logo} className="h-8 w-8 rounded-lg" alt="logo" />
              <span className="font-black text-slate-800 tracking-tighter">
                WMIBC MENU
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-slate-500 bg-slate-100 p-2 rounded-full"
            >
              <FaTimes />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="block w-full bg-pink-200 text-slate-800 font-bold px-4 py-3 rounded-xl shadow-sm"
              >
                Home
              </Link>
            </li>

            {/* Dashboard */}
            {isTareqAdmin && (
              <li>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full bg-slate-900 text-white font-bold px-4 py-3 rounded-xl shadow-sm"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {/* Visa Services */}
            <li>
              <button
                onClick={() => toggleAccordion("visa")}
                className="flex justify-between items-center w-full bg-pink-200 text-slate-800 font-bold px-4 py-3 rounded-xl shadow-sm"
              >
                Visa Services{" "}
                <FaChevronDown
                  className={`transition-transform ${activeAccordion === "visa" ? "rotate-180" : ""}`}
                />
              </button>
              {activeAccordion === "visa" && (
                <div className="mt-2 space-y-2 bg-pink-50 p-4 rounded-xl border border-pink-100 shadow-inner">
                  <button
                    onClick={() =>
                      setActiveSubAccordion(
                        activeSubAccordion === "work" ? null : "work",
                      )
                    }
                    className="flex justify-between w-full text-slate-700 font-bold text-sm uppercase py-1"
                  >
                    Work Visa{" "}
                    {activeSubAccordion === "work" ? (
                      <FaChevronDown className="text-pink-500" />
                    ) : (
                      <FaChevronRight className="text-pink-300" />
                    )}
                  </button>
                  {activeSubAccordion === "work" && (
                    <div className="grid grid-cols-2 gap-2 pl-2 pb-2">
                      {menuData.workVisa.map((v, i) => (
                        <Link
                          key={i}
                          to={v.link}
                          onClick={() => setMobileOpen(false)}
                          className="text-xs bg-white p-2 rounded border border-pink-100 text-slate-600 font-semibold"
                        >
                          {v.name}
                        </Link>
                      ))}
                    </div>
                  )}
                  <Link
                    to="/visit-visa"
                    onClick={() => setMobileOpen(false)}
                    className="block text-slate-700 font-bold border-t border-pink-200 pt-2 pb-1"
                  >
                    Visit Visa
                  </Link>
                  <Link
                    to="/student-visa"
                    onClick={() => setMobileOpen(false)}
                    className="block text-slate-700 font-bold border-t border-pink-200 pt-2"
                  >
                    Student Visa
                  </Link>
                </div>
              )}
            </li>

            {/* Client & Visitor */}
            {[
              {
                key: "client",
                label: "Client Info",
                data: menuData.clientInfo,
              },
              { key: "visitor", label: "Visitor", data: menuData.visitor },
            ].map((section) => (
              <li key={section.key}>
                <button
                  onClick={() => toggleAccordion(section.key)}
                  className="flex justify-between items-center w-full bg-pink-200 text-slate-800 font-bold px-4 py-3 rounded-xl shadow-sm"
                >
                  {section.label}{" "}
                  <FaChevronDown
                    className={`transition-transform ${activeAccordion === section.key ? "rotate-180" : ""}`}
                  />
                </button>
                {activeAccordion === section.key && (
                  <div className="mt-2 space-y-2 bg-pink-50 p-4 rounded-xl border border-pink-100">
                    {section.data.map((item, i) => (
                      <Link
                        key={i}
                        to={item.link}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-slate-700 border-b border-white last:border-0 font-bold text-sm"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}

            {/* Logout */}
            {token && (
              <div className="mt-8 border-t border-pink-100 pt-6">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">
                  Logged in as
                </p>
                <p className="font-bold text-slate-800 mb-3">{user?.name}</p>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-100 text-red-600 font-bold px-4 py-2 rounded-lg hover:bg-red-200"
                >
                  Logout
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
