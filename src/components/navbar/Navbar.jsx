import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronRight, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/company-logo.jpg";

const API_BASE_URL = "https://wmibcstaff-server.vercel.app";

const menuData = {
  workVisa: {
    schengen: [
      { name: "Greece", link: "/work-visa/greece" },
      { name: "Qatar ➜ Portugal", link: "/work-visa/qatar-portugal" },
      { name: "Saudi ➜ Portugal", link: "/work-visa/saudi-portugal" },
      { name: "Singapore ➜ Portugal", link: "/work-visa/singapore-portugal" },
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
    { name: "Add Visitor", link: "/add-new-visitor", newTab: true },
    { name: "Visitor List", link: "/visitor-list" },
  ],

  leads: [
    // { name: "Add Lead", link: "/add-leads" },
    { name: "View Leads", link: "/leads" },
  ],

  others: [
    { name: "Flyer", link: "/flyer" },
    { name: "Stat", link: "/current-status" },
  ],
};

const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const styles = {
  desktopButton:
    "inline-flex items-center rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-blue-50 shadow-lg shadow-blue-950/30 backdrop-blur-xl transition-all hover:border-sky-300/40 hover:bg-sky-400/15 hover:text-white focus:outline-none focus:ring-4 focus:ring-sky-400/20",
  desktopPrimary:
  "inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300",
  dropdown:
    "rounded-2xl border border-sky-300/15 bg-slate-950/95 shadow-2xl shadow-blue-950/60 backdrop-blur-2xl",
  dropdownItem:
    "block px-4 py-3 text-sm font-bold text-blue-50/85 transition-all hover:bg-sky-400/15 hover:text-white",
  dropdownParent:
    "relative flex cursor-pointer items-center justify-between border-b border-white/10 px-4 py-3 text-sm font-bold text-blue-50/85 transition-all last:border-b-0 hover:bg-sky-400/15 hover:text-white",
  mobileButton:
    "flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3.5 text-left font-black text-blue-50 shadow-lg shadow-blue-950/20 backdrop-blur-xl",
  mobilePanel:
    "space-y-2 rounded-2xl border border-white/10 bg-white/[0.06] p-3",
  mobileLink:
    "block rounded-xl border border-white/10 bg-slate-950/45 px-4 py-3 text-sm font-bold text-blue-50/85 transition-all hover:bg-sky-400/15 hover:text-white",
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activeSubAccordion, setActiveSubAccordion] = useState(null);
  const [refundTodayCount, setRefundTodayCount] = useState(0);
  const [followupTodayCount, setFollowupTodayCount] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const userName = user?.name || user?.userName || user?.fullName || "";
  const normalizedUserName = userName.toLowerCase().trim();

  const isAdmin = user?.role === "admin";

  const canSeeRefund =
    isAdmin ||
    ["saiful", "tarikul", "nizam", "nisha", "imtiyaj", "neshat"].includes(
      normalizedUserName,
    );

  const canViewAttendanceReport =
    token && user?.name?.trim().toLowerCase() === "mohammed";

  const avatarSrc = userName
    ? `/avatars/${userName.trim().toLowerCase()}.webp`
    : "/avatars/default.webp";

  const closeMobile = () => {
    setMobileOpen(false);
    setActiveAccordion(null);
    setActiveSubAccordion(null);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setProfileOpen(false);
    closeMobile();
    navigate("/login");
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
    const handleClickOutside = (event) => {
      if (!profileRef.current) return;

      if (!profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchTodayRefundCount = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken || !canSeeRefund) {
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
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setRefundTodayCount(0);
          return;
        }

        setRefundTodayCount(Number(data?.pagination?.total || 0));
      } catch {
        setRefundTodayCount(0);
      }
    };

    fetchTodayRefundCount();

    const interval = setInterval(fetchTodayRefundCount, 60000);

    return () => clearInterval(interval);
  }, [canSeeRefund]);

  useEffect(() => {
    const fetchTodayFollowupCount = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setFollowupTodayCount(0);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/followups`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setFollowupTodayCount(0);
          return;
        }

        setFollowupTodayCount(Array.isArray(data) ? data.length : 0);
      } catch {
        setFollowupTodayCount(0);
      }
    };

    fetchTodayFollowupCount();

    const interval = setInterval(fetchTodayFollowupCount, 60000);

    return () => clearInterval(interval);
  }, []);

  const RefundBadge = ({ mobile = false }) => (
    <span
      className={`absolute flex items-center justify-center rounded-full px-1.5 font-black leading-none text-white ring-2 ring-slate-950 ${
        mobile
          ? "right-3 top-2.5 h-6 min-w-6 text-[11px]"
          : "-right-2 -top-2 h-5 min-w-5 text-[10px]"
      } ${refundTodayCount > 0 ? "bg-red-600" : "bg-slate-500"}`}
    >
      {refundTodayCount > 99 ? "99+" : refundTodayCount}
    </span>
  );

  const FollowupBadge = ({ mobile = false }) => (
    <span
      className={`absolute flex items-center justify-center rounded-full px-1.5 font-black leading-none text-white ring-2 ring-slate-950 ${
        mobile
          ? "right-3 top-2.5 h-6 min-w-6 text-[11px]"
          : "-right-2 -top-2 h-5 min-w-5 text-[10px]"
      } ${followupTodayCount > 0 ? "bg-red-600" : "bg-slate-500"}`}
    >
      {followupTodayCount > 99 ? "99+" : followupTodayCount}
    </span>
  );

  const MobileAccordionButton = ({ id, title }) => {
    const isActive = activeAccordion === id;

    return (
      <button
        type="button"
        onClick={() => toggleAccordion(id)}
        className={styles.mobileButton}
      >
        <span>{title}</span>
        <FaChevronDown
          className={`text-xs text-sky-200 transition-transform duration-200 ${
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
        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-slate-950/45 px-4 py-3 text-left text-sm font-black text-blue-50"
      >
        <span>{title}</span>
        <FaChevronDown
          className={`text-[10px] text-sky-200 transition-transform duration-200 ${
            isActive ? "rotate-180" : ""
          }`}
        />
      </button>
    );
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-sky-300/10 bg-slate-950/90 shadow-2xl shadow-blue-950/30 backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-linear(circle_at_top_left,rgba(37,99,235,0.28),transparent_28%),radial-linear(circle_at_top_right,rgba(14,165,233,0.18),transparent_24%)]" />

      <div className="container relative mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3"
          onClick={closeMobile}
        >
          <img
            src={Logo}
            alt="Logo"
            className="h-11 w-11 rounded-2xl border border-sky-300/25 object-cover shadow-lg shadow-blue-500/15"
          />
          <span className="hidden text-xl font-black tracking-tight text-white lg:block">
            WMIBC
          </span>
        </Link>

        <ul className="hidden flex-1 items-center justify-center gap-2 px-5 md:flex">
          {/* Work Visa */}
          <li className="group relative">
            <button type="button" className={styles.desktopButton}>
              Work Visa
              <FaChevronDown className="ml-2 text-[10px] text-sky-200" />
            </button>

            <div className="absolute left-0 top-full z-999 hidden w-60 pt-2 group-hover:block">
              <ul className={styles.dropdown}>
                <li className={`group/schengen ${styles.dropdownParent}`}>
                  Schengen
                  <FaChevronRight className="text-[10px] text-sky-200/70" />

                  <div className="absolute left-full top-0 z-999 hidden w-60 pl-2 group-hover/schengen:block">
                    <ul className={styles.dropdown}>
                      {menuData.workVisa.schengen.map((item, idx) => (
                        <li
                          key={idx}
                          className="border-b border-white/10 last:border-b-0"
                        >
                          <Link to={item.link} className={styles.dropdownItem}>
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                <li className={`group/nonSchengen ${styles.dropdownParent}`}>
                  Non Schengen
                  <FaChevronRight className="text-[10px] text-sky-200/70" />

                  <div className="absolute left-full top-0 z-999 hidden w-64 pl-2 group-hover/nonSchengen:block">
                    <ul className={styles.dropdown}>
                      {menuData.workVisa.nonSchengenEurope.map((item, idx) => (
                        <li
                          key={idx}
                          className="border-b border-white/10 last:border-b-0"
                        >
                          <Link to={item.link} className={styles.dropdownItem}>
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
                    className="border-b border-white/10 last:border-b-0"
                  >
                    <Link to={item.link} className={styles.dropdownItem}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Client */}
          <li className="group relative">
            <button type="button" className={styles.desktopButton}>
              Client
              <FaChevronDown className="ml-2 text-[10px] text-sky-200" />
            </button>

            <div className="absolute left-0 top-full z-999 hidden w-52 pt-2 group-hover:block">
              <ul className={styles.dropdown}>
                {menuData.clientInfo.map((item, idx) => (
                  <li
                    key={idx}
                    className="border-b border-white/10 last:border-b-0"
                  >
                    <Link to={item.link} className={styles.dropdownItem}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Visitor */}
          <li className="group relative">
            <button type="button" className={styles.desktopButton}>
              Visitor
              <FaChevronDown className="ml-2 text-[10px] text-sky-200" />
            </button>

            <div className="absolute left-0 top-full z-999 hidden w-52 pt-2 group-hover:block">
              <ul className={styles.dropdown}>
                {menuData.visitor.map((item, idx) => (
                  <li
                    key={idx}
                    className="border-b border-white/10 last:border-b-0"
                  >
                    <Link
                      to={item.link}
                      target={item.newTab ? "_blank" : undefined}
                      rel={item.newTab ? "noopener noreferrer" : undefined}
                      className={styles.dropdownItem}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Leads */}
          <li className="group relative">
            <button type="button" className={styles.desktopButton}>
              Leads
              <FaChevronDown className="ml-2 text-[10px] text-sky-200" />
            </button>

            <div className="absolute left-0 top-full z-999 hidden w-52 pt-2 group-hover:block">
              <ul className={styles.dropdown}>
                {menuData.leads.map((item, idx) => (
                  <li
                    key={idx}
                    className="border-b border-white/10 last:border-b-0"
                  >
                    <Link to={item.link} className={styles.dropdownItem}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Followup */}
          <li>
            <Link
              to="/followups"
              className="relative inline-flex rounded-xl border border-pink-300/30 bg-pink-500/90 px-4 py-2 text-sm font-black text-white shadow-lg shadow-pink-500/20 transition-all hover:bg-pink-500"
            >
              Followup
              <FollowupBadge />
            </Link>
          </li>

          {/* Attendance Report */}
          {canViewAttendanceReport && (
            <li>
              <Link
                to="/attendance/report"
                className="rounded-xl border border-emerald-300/25 bg-emerald-500/15 px-4 py-2 text-sm font-black text-emerald-100 shadow-lg shadow-emerald-950/25 transition-all hover:bg-emerald-500/25"
              >
                Attendance Report
              </Link>
            </li>
          )}

          {/* ToDo */}
          <li>
            <Link to="/todo" className={styles.desktopPrimary}>
              ToDo
            </Link>
          </li>

          {/* Others */}
          <li className="group relative">
            <button type="button" className={styles.desktopButton}>
              Others
              <FaChevronDown className="ml-2 text-[10px] text-sky-200" />
            </button>

            <div className="absolute left-0 top-full z-999 hidden w-52 pt-2 group-hover:block">
              <ul className={styles.dropdown}>
                {menuData.others.map((item, idx) => (
                  <li
                    key={idx}
                    className="border-b border-white/10 last:border-b-0"
                  >
                    <Link to={item.link} className={styles.dropdownItem}>
                      {item.name}
                    </Link>
                  </li>
                ))}

                {canSeeRefund && (
                  <li className="border-b border-white/10 last:border-b-0">
                    <Link
                      to="/refund"
                      className={`${styles.dropdownItem} relative pr-10`}
                    >
                      Refund
                      <RefundBadge />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          {token && (
            <div ref={profileRef} className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-2.5 py-2 text-white shadow-lg shadow-blue-950/25 transition-all hover:bg-white/15"
              >
                <img
                  src={avatarSrc}
                  alt="profile"
                  className="h-8 w-8 rounded-full border border-sky-300/25 object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/avatars/default.webp";
                  }}
                />

                <span className="max-w-20 truncate text-xs font-black">
                  {userName || "User"}
                </span>

                <FaChevronDown
                  className={`text-[10px] text-sky-200 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full z-999 mt-2 w-52 rounded-2xl border border-sky-300/15 bg-slate-950/95 p-2 shadow-2xl shadow-blue-950/60 backdrop-blur-2xl">
                  <div className="border-b border-white/10 px-3 py-2">
                    <p className="text-[10px] font-black uppercase tracking-wider text-blue-200/55">
                      Logged in
                    </p>
                    <p className="truncate text-sm font-black text-white">
                      {userName || "User"}
                    </p>
                  </div>

                  {isAdmin && (
                    <div className="mt-2 border-b border-white/10 pb-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-black text-blue-50 transition-all hover:bg-sky-400/15 hover:text-white"
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/applications"
                        onClick={() => setProfileOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-black text-blue-50 transition-all hover:bg-sky-400/15 hover:text-white"
                      >
                        Application
                      </Link>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 w-full rounded-xl border border-red-300/20 bg-red-500/15 px-3 py-2 text-left text-sm font-black text-red-100 transition-all hover:bg-red-500/25"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded-xl border border-sky-300/20 bg-white/10 p-2.5 text-sky-100 shadow-lg shadow-blue-950/30 backdrop-blur-xl md:hidden"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-x-0 top-17 z-999 h-[calc(100vh-68px)] overflow-y-auto border-t border-sky-300/10 bg-slate-950 px-4 py-5 shadow-2xl shadow-blue-950/60 md:hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-linear(circle_at_top,rgba(37,99,235,0.26),transparent_34%)]" />

          <div className="relative space-y-3 pb-10">
            {token && (
              <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.07] p-3 shadow-lg shadow-blue-950/25">
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={avatarSrc}
                      alt="profile"
                      className="h-10 w-10 rounded-full border border-sky-300/25 object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/avatars/default.webp";
                      }}
                    />

                    <p className="truncate text-sm font-black text-white">
                      {userName || "User"}
                    </p>
                  </div>

                  <FaChevronDown
                    className={`text-xs text-sky-200 transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div className="mt-3 space-y-2">
                    {isAdmin && (
                      <div className="rounded-xl border border-white/10 bg-slate-950/45 p-2">
                        <Link
                          to="/dashboard"
                          onClick={closeMobile}
                          className={styles.mobileLink}
                        >
                          Dashboard
                        </Link>

                        <Link
                          to="/applications"
                          onClick={closeMobile}
                          className={styles.mobileLink}
                        >
                          Application
                        </Link>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-xl border border-red-300/25 bg-red-500/15 px-4 py-3 text-left text-sm font-black text-red-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Work Visa */}
            <div className="space-y-2">
              <MobileAccordionButton id="workVisa" title="Work Visa" />

              {activeAccordion === "workVisa" && (
                <div className={styles.mobilePanel}>
                  <MobileSubAccordionButton id="schengen" title="Schengen" />

                  {activeSubAccordion === "schengen" && (
                    <div className="space-y-1 rounded-2xl bg-slate-950/40 p-2">
                      {menuData.workVisa.schengen.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.link}
                          onClick={closeMobile}
                          className={styles.mobileLink}
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
                    <div className="space-y-1 rounded-2xl bg-slate-950/40 p-2">
                      {menuData.workVisa.nonSchengenEurope.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.link}
                          onClick={closeMobile}
                          className={styles.mobileLink}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className="space-y-1 rounded-2xl bg-slate-950/40 p-2">
                    {menuData.workVisa.direct.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.link}
                        onClick={closeMobile}
                        className={styles.mobileLink}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Client */}
            <div className="space-y-2">
              <MobileAccordionButton id="client" title="Client" />

              {activeAccordion === "client" && (
                <div className={styles.mobilePanel}>
                  {menuData.clientInfo.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.link}
                      onClick={closeMobile}
                      className={styles.mobileLink}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Visitor */}
            <div className="space-y-2">
              <MobileAccordionButton id="visitor" title="Visitor" />

              {activeAccordion === "visitor" && (
                <div className={styles.mobilePanel}>
                  {menuData.visitor.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.link}
                      target={item.newTab ? "_blank" : undefined}
                      rel={item.newTab ? "noopener noreferrer" : undefined}
                      onClick={closeMobile}
                      className={styles.mobileLink}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Leads */}
            <div className="space-y-2">
              <MobileAccordionButton id="leads" title="Leads" />

              {activeAccordion === "leads" && (
                <div className={styles.mobilePanel}>
                  {menuData.leads.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.link}
                      onClick={closeMobile}
                      className={styles.mobileLink}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Followup */}
            <Link
              to="/followups"
              onClick={closeMobile}
              className="relative block rounded-2xl border border-pink-300/30 bg-pink-500/90 px-4 py-3.5 font-black text-white shadow-lg shadow-pink-500/20"
            >
              Followup
              <FollowupBadge mobile />
            </Link>

            {/* Mobile Attendance Report */}
            {canViewAttendanceReport && (
              <Link
                to="/attendance/report"
                onClick={closeMobile}
                className="block rounded-2xl border border-emerald-300/25 bg-emerald-500/15 px-4 py-3.5 font-black text-emerald-100 shadow-lg shadow-emerald-950/25"
              >
                Attendance Report
              </Link>
            )}

            {/* Mobile ToDo */}
            <Link
              to="/todo"
              onClick={closeMobile}
              className="block rounded-2xl bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400 px-4 py-3.5 font-black text-white shadow-lg shadow-blue-500/25"
            >
              ToDo
            </Link>

            {/* Mobile Others */}
            <div className="space-y-2">
              <MobileAccordionButton id="others" title="Others" />

              {activeAccordion === "others" && (
                <div className={styles.mobilePanel}>
                  {menuData.others.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.link}
                      onClick={closeMobile}
                      className={styles.mobileLink}
                    >
                      {item.name}
                    </Link>
                  ))}

                  {canSeeRefund && (
                    <Link
                      to="/refund"
                      onClick={closeMobile}
                      className={`${styles.mobileLink} relative pr-12`}
                    >
                      Refund
                      <RefundBadge mobile />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;