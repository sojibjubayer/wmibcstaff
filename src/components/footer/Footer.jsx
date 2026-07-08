import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t-2 border-pink-200 text-slate-400 py-8 mt-auto relative">
      <div className="container mx-auto text-center font-medium space-y-2 relative">
        {/* Main Copyright */}
        <div className="text-slate-200 text-sm tracking-wide">
          © {new Date().getFullYear()}{" "}
          <span className="text-blue-700">WMIBC</span>. All rights reserved.
        </div>

        {/* Developer Attribution Segment */}
        <div className="text-slate-500 text-xs relative inline-block">
          Developed and Secured by{" "}
          <span className="text-slate-200 hover:text-blue-600 transition-colors duration-300 font-bold tracking-wide select-none">
            IIT
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;