import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { FiShield, FiMail, FiLock, FiArrowRight } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("https://wmibcstaff-server.vercel.app/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Access Granted. Redirecting...", {
        icon: '🛡️',
        style: { borderRadius: '12px', background: '#0f172a', color: '#fff' }
      });
      
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Unauthorized access attempt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-slate-50">
      <Toaster position="top-right" /> 

      <div className="w-full max-w-md">
        {/* Branding Header */}
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white shadow-sm border border-slate-100 rounded-2xl mb-4">
                <FiShield className="text-pink-400 text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">WMIBC Staff Portal</h1>
            <p className="text-slate-500 text-sm mt-1">Authorized Personnel Only</p>
        </div>

        {/* Card */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white">
          <form onSubmit={handleLogin} className="space-y-4"> 
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-100 focus:border-pink-200 transition-all outline-none text-slate-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-100 focus:border-pink-200 transition-all outline-none text-slate-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className={`w-full group mt-4 flex items-center justify-center gap-2 py-4 px-4 rounded-2xl text-slate-800 font-black shadow-lg shadow-pink-200/50 transform transition-all active:scale-95 ${
                loading 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                : "bg-pink-200 hover:bg-pink-300 hover:shadow-pink-300/60"
              }`}
            >
              {loading ? "Verifying..." : "Sign In to Portal"}
              {!loading && <FiArrowRight className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-slate-400 text-xs font-medium">
            Protected by end-to-end encryption.
        </p>
      </div>
    </div>
  );
}