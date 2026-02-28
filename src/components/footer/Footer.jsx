import React, { useState, useRef, useEffect } from "react";

const Footer = () => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        window.innerWidth < 768 &&
        open &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    /* Changed to bg-slate-900 and added a pink top border to match your menu items */
    <footer className="bg-slate-900 border-t-2 border-pink-200 text-slate-400 py-8 mt-auto relative">
      <div className="container mx-auto text-center font-medium space-y-2 relative">
        {/* Main Copyright - Text made lighter for readability */}
        <div className="text-slate-200 text-sm tracking-wide">
          © {new Date().getFullYear()}{" "}
          <span className="text-pink-200">WMIBC</span>. All rights reserved.
        </div>

        <div className="text-slate-500 text-xs relative inline-block group">
          Developed by{" "}
          <span
            onClick={() => {
              if (window.innerWidth < 768) setOpen(true);
            }}
            /* Hover matches your menu item color */
            className="italic cursor-pointer hover:text-pink-200 transition-colors duration-300 font-semibold"
          >
            J. Adil
          </span>
          {/* Popover - Now with higher contrast against the dark background */}
          <div
            ref={popoverRef}
            className={`
              absolute bottom-10 left-1/2 -translate-x-1/2 w-64
              bg-white text-slate-800 rounded-xl shadow-2xl p-5 z-50
              transition-all duration-300 border border-pink-100
              ${open ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-2 invisible"}
              md:opacity-0 md:invisible
              md:group-hover:opacity-100 md:group-hover:visible md:group-hover:translate-y-0
            `}
          >
            {/* Triangle Arrow for Popover */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-b border-r border-pink-100"></div>

            <div className="text-center space-y-1 relative z-10">
              <h2 className="text-sm font-bold text-slate-900">Jubayer Adil</h2>
              <p className="text-[10px] text-pink-600 font-bold tracking-wider">
                BSc & MSc in CSE
              </p>
              <p className="text-[10px] font-medium text-slate-500">
                Student Visa Counselor, WMIBC
              </p>

              <div className="text-[11px] mt-3 pt-3 border-t border-slate-100">
                <p className="font-bold text-slate-700 mb-2">Certifications</p>
                <ul className="text-left space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500">✦</span>
                    <span>
                      Web Development –
                      <span className="text-slate-500 italic">Programming Hero</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500">✦</span>
                    <span>
                      Cyber Security Professional –
                      <span className="text-slate-500 italic">Google</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500">✦</span>
                    <span>
                      IT Support Professional –
                      <span className="text-slate-500 italic">Google</span>
                    </span>
                  </li>
                </ul>
              </div>

              <p className="mt-3 text-[11px]">
                <a
                  href="mailto:adilwmibc@gmail.com"
                  className="text-blue-600 font-semibold hover:text-pink-600 transition-colors"
                >
                  adilwmibc@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
