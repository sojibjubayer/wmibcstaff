import React, { useState, useRef, useEffect } from "react";
// import adilPic from "../../assets/Adil.jpg";

const Footer = () => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  // Close on outside click (mobile only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        window.innerWidth < 768 && // only mobile
        open &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <footer className="bg-fuchsia-500 text-white py-6 mt-auto relative">
      <div className="container mx-auto text-center font-medium space-y-1 relative">
        <div>© {new Date().getFullYear()} WMIBC. All rights reserved.</div>

        <div className="text-gray-200 text-xs relative inline-block group">
          Developed by{" "}
          <span
            onClick={() => {
              if (window.innerWidth < 768) {
                setOpen(true); // open only on mobile
              }
            }}
            className="italic cursor-pointer hover:text-white transition"
          >
            J. Adil
          </span>

          {/* Popover */}
          <div
            ref={popoverRef}
            className={`
              absolute bottom-8 left-1/2 -translate-x-1/2 w-64
              bg-white text-black rounded-lg shadow-xl p-4 z-50
              transition-all duration-300
              
              ${open ? "opacity-100 visible" : "opacity-0 invisible"}
              md:opacity-0 md:invisible
              md:group-hover:opacity-100 md:group-hover:visible
            `}
          >
            <div className="text-center space-y-1">
              <h2 className="text-sm font-bold">
                Jubayer Adil
              </h2>

              <p className="text-[10px]">
                BSc & MSc in CSE
              </p>

              <p className="text-[10px] font-medium">
                Student Visa Counselor, WMIBC
              </p>

              <div className="text-[11px] mt-2">
                <p className="font-semibold underline">Certified</p>

                <ul className="text-left mt-1 space-y-1">
                  <li className="flex gap-1">
                    <span className="text-green-600">✓</span>
                    Web Development –{" "}
                    <span className="italic">Programming Hero</span>
                  </li>
                  <li className="flex gap-1">
                    <span className="text-green-600">✓</span>
                    Google IT Support –{" "}
                    <span className="italic">Google</span>
                  </li>
                  <li className="flex gap-1">
                    <span className="text-green-600">✓</span>
                    Google Cyber Security –{" "}
                    <span className="italic">Google</span>
                  </li>
                </ul>
              </div>

              <p className="mt-2 text-[11px]">
                <a
                  href="mailto:info@wmibc.com"
                  className="text-blue-600 hover:underline"
                >
                  info@wmibc.com
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
