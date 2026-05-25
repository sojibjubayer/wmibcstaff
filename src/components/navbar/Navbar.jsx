import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChevronRight,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Logo from "../../assets/company-logo.jpg";

const API_BASE_URL = "https://wmibcstaff-server.vercel.app";

const menuData = {
  workVisa: {
    schengen: [
      { name: "Greece", link: "/work-visa/greece" },
      { name: "Portugal", link: "/work-visa/portugal" },
      { name: "Portugal <- KSA", link: "/work-visa/portugalksa" },
      { name: "Germany", link: "/work-visa/germany" },
      { name: "Poland", link: "/work-visa/poland" },
      { name: "Croatia", link: "/work-visa/croatia" },
      { name: "Bulgaria", link: "/work-visa/bulgaria" },
      { name: "Slovakia", link: "/work-visa/slovakia" },
    ],
    nonSchengenEurope: [
      { name: "Serbia", link: "/work-visa/serbia" },
      { name: "North Macedonia", link: "/work-visa/north-macedonia" },
      { name: "Cyprus", link: "/work-visa/cyprus" },
      { name: "Montenegro", link: "/work-visa/montenegro" },
      { name: "Bosnia", link: "/work-visa/bosnia" },
      { name: "Moldova", link: "/work-visa/moldova" },
      { name: "Albania", link: "/work-visa/albania" },
    ],
    direct: [
      { name: "UK", link: "/work-visa/uk" },
      { name: "Canada", link: "/work-visa/canada" },
      { name: "Australia", link: "/work-visa/australia" },
      { name: "New Zealand", link: "/work-visa/new-zealand" },
      { name: "Turkey", link: "/work-visa/turkey" },
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

const getTodayDateString = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activeSubAccordion, setActiveSubAccordion] = useState(null);
  const [refundTodayCount, setRefundTodayCount] = useState(0);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const userName = user?.name || user?.userName || user?.fullName || "";
  const normalizedUserName = userName.toLowerCase().trim();

  const isAdmin = user?.role === "admin";

  const canSeeLeads = ["adil", "saru", "sumaiya", "saiful"].includes(
    normalizedUserName
  );

  const canSeeRefund =
    isAdmin || ["saiful", "tarikul", "nizam"].includes(normalizedUserName);

  const canViewAttendanceReport =
    token && user?.name?.trim().toLowerCase() === "mohammed";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    closeMobile();
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setActiveAccordion(null);
    setActiveSubAccordion(null);
  };

  const toggleAccordion = (val) => {
    setActiveAccordion(activeAccordion === val ? null : val);
    setActiveSubAccordion(null);
  };

  const toggleSubAccordion = (val) => {
    setActiveSubAccordion(activeSubAccordion === val ? null : val);
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const fetchTodayRefundCount = async () => {
      if (!token || !canSeeRefund) {
        setRefundTodayCount(0);
        return;
      }

      try {
        const today = getTodayDateString();

        const params = new URLSearchParams({
          page: "1",
          limit: "1",
          nextRefundDate: today,
        });

        const response = await fetch(`${API_BASE_URL}/api/refunds?${params}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setRefundTodayCount(0);
          return;
        }

        setRefundTodayCount(Number(data?.pagination?.total || 0));
      } catch (error) {
        setRefundTodayCount(0);
      }
    };

    fetchTodayRefundCount();

    const interval = setInterval(fetchTodayRefundCount, 60000);

    return () => clearInterval(interval);
  }, [token, canSeeRefund]);

  const avatarSrc = user?.name
    ? `/avatars/${user.name.trim().toLowerCase()}.webp`
    : "/avatars/default.webp";

  const RefundBadge = ({ mobile = false }) => {
    return (
      <span
        className={`absolute flex items-center justify-center rounded-full px-1.5 font-black leading-none text-white ring-2 ring-white ${
          mobile
            ? "right-3 top-2 h-6 min-w-6 text-[11px]"
            : "-right-2 -top-2 h-5 min-w-5 text-[10px]"
        } ${refundTodayCount > 0 ? "bg-red-600" : "bg-slate-500"}`}
      >
        {refundTodayCount > 99 ? "99+" : refundTodayCount}
      </span>
    );
  };

  const MobileAccordionButton = ({ id, title }) => {
    const isActive = activeAccordion === id;

    return (
      <button
        type="button"
        onClick={() => toggleAccordion(id)}
        className="flex w-full items-center justify-between rounded-xl bg-pink-100 px-4 py-3 text-left font-bold text-slate-800"
      >
        <span>{title}</span>
        <FaChevronDown
          className={`text-xs transition-transform duration-200 ${
            isActive ? "rotate-180" : ""
          }`}
        />
      </button>
    );
  };

  const MobileSubAccordionButton = ({ id, title }) => {
    const isActive = activeSubAccordion === id;

    return (
      <button
        type="button"
        onClick={() => toggleSubAccordion(id)}
        className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 text-left text-sm font-bold text-slate-700"
      >
        <span>{title}</span>
        <FaChevronDown
          className={`text-[10px] transition-transform duration-200 ${
            isActive ? "rotate-180" : ""
          }`}
        />
      </button>
    );
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={closeMobile}>
          <img
            src={Logo}
            alt="Logo"
            className="h-10 w-10 rounded-xl border border-pink-100 shadow-sm"
          />
          <span className="hidden text-xl font-black tracking-tighter text-slate-800 lg:block">
            WMIBC
          </span> 
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden flex-1 items-center justify-center space-x-3 md:flex">
          <li>
            <Link
              to="/"
              className="rounded-lg bg-pink-200 px-4 py-1.5 font-bold text-slate-800 shadow-md shadow-pink-500/30 transition-all hover:bg-pink-300"
            >
              Home
            </Link>
          </li>

          <li className="group relative">
            <button
              type="button"
              className="flex items-center rounded-lg bg-pink-200 px-4 py-1.5 font-bold text-slate-800 shadow-md shadow-pink-500/30 transition-all hover:bg-pink-300"
            >
              Work Visa
              <FaChevronDown className="ml-2 text-[10px] opacity-50" />
            </button>

            <div className="absolute left-0 top-full z-999 hidden w-56 pt-2 group-hover:block">
              <ul className="overflow-visible rounded-xl border border-white bg-pink-200 shadow-2xl">
                <li className="group/schengen relative flex cursor-pointer items-center justify-between border-b border-white px-4 py-3 text-sm font-medium text-slate-800 hover:bg-white">
                  Schengen
                  <FaChevronRight className="text-[10px] opacity-40" />

                  <div className="absolute left-full top-0 z-999 hidden w-56 pl-2 group-hover/schengen:block">
                    <ul className="overflow-hidden rounded-xl border border-slate-100 bg-pink-100 shadow-xl">
                      {menuData.workVisa.schengen.map((item, idx) => (
                        <li
                          key={idx}
                          className="border-b border-white last:border-b-0"
                        >
                          <Link
                            to={item.link}
                            className="block px-4 py-3 text-sm text-slate-800 hover:bg-white"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                <li className="group/nonSchengen relative flex cursor-pointer items-center justify-between border-b border-white px-4 py-3 text-sm font-medium text-slate-800 hover:bg-white">
                  Non Schengen
                  <FaChevronRight className="text-[10px] opacity-40" />

                  <div className="absolute left-full top-0 z-999 hidden w-60 pl-2 group-hover/nonSchengen:block">
                    <ul className="overflow-hidden rounded-xl border border-slate-100 bg-pink-100 shadow-xl">
                      {menuData.workVisa.nonSchengenEurope.map((item, idx) => (
                        <li
                          key={idx}
                          className="border-b border-white last:border-b-0"
                        >
                          <Link
                            to={item.link}
                            className="block px-4 py-3 text-sm text-slate-800 hover:bg-white"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                {menuData.workVisa.direct.map((item, idx) => (
                  <li
                    key={idx}
                    className="border-b border-white last:border-b-0"
                  >
                    <Link
                      to={item.link}
                      className="block px-4 py-3 text-sm font-medium text-slate-800 hover:bg-white"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li className="group relative">
            <button
              type="button"
              className="flex items-center rounded-lg bg-pink-200 px-4 py-1.5 font-bold text-slate-800 shadow-md shadow-pink-500/30 transition-all hover:bg-pink-300"
            >
              Client
              <FaChevronDown className="ml-2 text-[10px] opacity-50" />
            </button>

            <div className="absolute left-0 top-full z-999 hidden w-48 pt-2 group-hover:block">
              <ul className="overflow-hidden rounded-xl border border-slate-100 bg-pink-200 shadow-2xl">
                {menuData.clientInfo.map((item, idx) => (
                  <li
                    key={idx}
                    className="border-t border-white first:border-0"
                  >
                    <Link
                      to={item.link}
                      className="block px-4 py-2 text-sm text-slate-800 hover:bg-white"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li className="group relative">
            <button
              type="button"
              className="flex items-center rounded-lg bg-pink-200 px-4 py-1.5 font-bold text-slate-800 shadow-md shadow-pink-500/30 transition-all hover:bg-pink-300"
            >
              Visitor
              <FaChevronDown className="ml-2 text-[10px] opacity-50" />
            </button>

            <div className="absolute left-0 top-full z-999 hidden w-48 pt-2 group-hover:block">
              <ul className="overflow-hidden rounded-xl border border-slate-100 bg-pink-200 shadow-2xl">
                {menuData.visitor.map((item, idx) => (
                  <li
                    key={idx}
                    className="border-t border-white first:border-0"
                  >
                    <Link
                      to={item.link}
                      className="block px-4 py-2 text-sm text-slate-800 hover:bg-white"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {canViewAttendanceReport && (
            <li>
              <Link
                to="/attendance/report"
                className="rounded-lg bg-emerald-700 px-4 py-1.5 font-bold text-white shadow-md shadow-emerald-300 transition-all hover:bg-emerald-600"
              >
                Attendance Report
              </Link>
            </li>
          )}

          {isAdmin && (
            <li className="group relative">
              <button
                type="button"
                className="flex items-center rounded-lg bg-slate-900 px-4 py-1.5 font-bold text-white shadow-md shadow-blue-400/40 transition-all hover:bg-slate-800"
              >
                Admin
                <FaChevronDown className="ml-2 text-[10px] opacity-70" />
              </button>

              <div className="absolute left-0 top-full z-999 hidden w-52 pt-2 group-hover:block">
                <ul className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-2xl">
                  <li className="border-b border-slate-100">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li className="border-b border-slate-100">
                    <Link
                      to="/applications"
                      className="block px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
                    >
                      Application
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/meeting"
                      className="block px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
                    >
                      Meeting
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          )}

          {canSeeLeads && (
            <li>
              <Link
                to="/leads"
                className="rounded-lg bg-blue-900 px-4 py-1.5 font-bold text-white shadow-md shadow-blue-400 transition-all hover:bg-blue-700"
              >
                Leads
              </Link>
            </li>
          )}

          {canSeeRefund && (
            <li>
              <Link
                to="/refund"
                className="relative inline-flex rounded-lg bg-orange-500 px-4 py-1.5 font-bold text-white shadow-md shadow-orange-300 transition-all hover:bg-orange-600"
              >
                Refund
                <RefundBadge />
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-4">
          {token && (
            <div className="hidden items-center space-x-4 border-l border-slate-100 pl-4 md:flex">
              <div className="h-10 w-10 overflow-hidden rounded-full border border-slate-200 shadow-sm">
                <img
                  src={avatarSrc}
                  alt="profile"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/avatars/default.webp";
                  }}
                />
              </div>

              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold uppercase leading-none text-slate-400">
                  Team
                </span>
                <span className="text-sm font-bold leading-tight text-slate-900">
                  {user?.name}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-slate-100 px-4 py-1.5 text-sm font-bold text-slate-600 transition-all hover:bg-red-50 hover:text-red-600"
              >
                Logout
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded-lg bg-pink-100 p-2 text-pink-600 md:hidden"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-16 z-999 h-[calc(100vh-64px)] overflow-y-auto bg-white px-4 py-5 shadow-2xl md:hidden">
          <div className="space-y-3 pb-10">
            {token && (
              <div className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
                <div className="h-11 w-11 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
                  <img
                    src={avatarSrc}
                    alt="profile"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/avatars/default.webp";
                    }}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                    Team
                  </p>
                  <p className="truncate text-sm font-black text-slate-900">
                    {user?.name || "User"}
                  </p>
                </div>
              </div>
            )}

            <Link
              to="/"
              onClick={closeMobile}
              className="block rounded-xl bg-pink-100 px-4 py-3 font-bold text-slate-800"
            >
              Home
            </Link>

            {/* Work Visa Mobile Accordion */}
            <div className="space-y-2">
              <MobileAccordionButton id="workVisa" title="Work Visa" />

              {activeAccordion === "workVisa" && (
                <div className="space-y-2 rounded-2xl bg-pink-50 p-3">
                  <MobileSubAccordionButton id="schengen" title="Schengen" />

                  {activeSubAccordion === "schengen" && (
                    <div className="space-y-1 rounded-xl bg-white p-2">
                      {menuData.workVisa.schengen.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.link}
                          onClick={closeMobile}
                          className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-pink-50"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  <MobileSubAccordionButton
                    id="nonSchengen"
                    title="Non Schengen"
                  />

                  {activeSubAccordion === "nonSchengen" && (
                    <div className="space-y-1 rounded-xl bg-white p-2">
                      {menuData.workVisa.nonSchengenEurope.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.link}
                          onClick={closeMobile}
                          className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-pink-50"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className="space-y-1 rounded-xl bg-white p-2">
                    {menuData.workVisa.direct.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.link}
                        onClick={closeMobile}
                        className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-pink-50"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Client Mobile Accordion */}
            <div className="space-y-2">
              <MobileAccordionButton id="client" title="Client" />

              {activeAccordion === "client" && (
                <div className="space-y-1 rounded-2xl bg-pink-50 p-3">
                  {menuData.clientInfo.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.link}
                      onClick={closeMobile}
                      className="block rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-700"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Visitor Mobile Accordion */}
            <div className="space-y-2">
              <MobileAccordionButton id="visitor" title="Visitor" />

              {activeAccordion === "visitor" && (
                <div className="space-y-1 rounded-2xl bg-pink-50 p-3">
                  {menuData.visitor.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.link}
                      onClick={closeMobile}
                      className="block rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-700"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {canViewAttendanceReport && (
              <Link
                to="/attendance/report"
                onClick={closeMobile}
                className="block rounded-xl bg-emerald-700 px-4 py-3 font-bold text-white"
              >
                Attendance Report
              </Link>
            )}

            {isAdmin && (
              <div className="space-y-2">
                <MobileAccordionButton id="admin" title="Admin" />

                {activeAccordion === "admin" && (
                  <div className="space-y-1 rounded-2xl bg-slate-100 p-3">
                    <Link
                      to="/dashboard"
                      onClick={closeMobile}
                      className="block rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-800"
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/applications"
                      onClick={closeMobile}
                      className="block rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-800"
                    >
                      Application
                    </Link>

                    <Link
                      to="/meeting"
                      onClick={closeMobile}
                      className="block rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-800"
                    >
                      Meeting
                    </Link>
                  </div>
                )}
              </div>
            )}

            {canSeeLeads && (
              <Link
                to="/leads"
                onClick={closeMobile}
                className="block rounded-xl bg-blue-900 px-4 py-3 font-bold text-white shadow-md shadow-blue-300"
              >
                Leads
              </Link>
            )}

            {canSeeRefund && (
              <Link
                to="/refund"
                onClick={closeMobile}
                className="relative block rounded-xl bg-orange-500 px-4 py-3 font-bold text-white shadow-md shadow-orange-200 transition-all hover:bg-orange-600"
              >
                Refund
                <RefundBadge mobile />
              </Link>
            )}

            {token && (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-xl bg-red-50 px-4 py-3 text-left font-bold text-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;