import React from "react";
import { NavLink } from "react-router-dom";
// import underConstructionAnimation from "../assets/lottie/site under construction.json";
// import Lottie from "lottie-react";
import uc from "../assets/uc.gif";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
      {/* UNDER CONSTRUCTION LOTTIE (KEEPING AS COMMENT PER REQUEST)
          <div className="min-h-screen">
            <Lottie
              animationData={underConstructionAnimation}
              loop={true}
              className="w-96 h-96 mx-auto"
            />
          </div> 
      */}

      {/* ACTIVE GIF DISPLAY */}
      <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-pink-500 to-rose-400 rounded-4xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <img 
            src={uc} 
            alt="Under Construction" 
            className="relative w-full rounded-3xl shadow-2xl border border-slate-100 object-cover"
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            Access <span className="text-pink-500">Restricted</span>
          </h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
            404 :: Intelligence Not Found
          </p>
          <p className="text-slate-500 text-sm font-medium max-w-xs mx-auto">
            The requested module is currently undergoing a scheduled systems upgrade.
          </p>
        </div>

        <div className="pt-4">
          <NavLink 
            to="/" 
            className="inline-flex items-center justify-center px-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-pink-600 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-slate-900/20 active:scale-95"
          >
            Return to Home 
          </NavLink>
        </div>
      </div>

      {/* ORIGINAL 404 TEXT (KEEPING AS COMMENT)
          <div className="min-h-screen text-center mt-10">
              <p>404 :: page not found</p>
              <NavLink to='/'>goto <span className="text-blue-500">Home</span></NavLink>
          </div> 
      */}
    </div>
  );
};

export default NotFound;