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
        icon: "🛡️",
        style: {
          borderRadius: "14px",
          background: "#0f172a",
          color: "#fff",
          border: "1px solid rgba(59, 130, 246, 0.35)",
        },
      });

      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Unauthorized access attempt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 bg-[#020617]">
      <Toaster position="top-right" />

      {/* Premium Background */}
      <div className="absolute inset-0 bg-[radial-linear(circle_at_top,rgba(37,99,235,0.35),transparent_35%),radial-linear(circle_at_bottom_right,rgba(14,165,233,0.22),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-linear(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-linear(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[44px_44px] opacity-20" />

      <div className="relative z-10 w-full max-w-md">
        {/* Branding Header */}
        <div className="mb-8 text-center">
          <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-3xl border border-blue-400/30 bg-white/10 shadow-2xl shadow-blue-500/20 backdrop-blur-xl">
            <FiShield className="text-3xl text-blue-300" />
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white">
            WMIBC Visa Portal
          </h1>

          <p className="mt-2 text-sm font-medium text-blue-100/70">
            Authorized Personnel Only
          </p>
        </div>

        {/* Card */}
        <div className="rounded-4xl border border-white/10 bg-white/8 p-8 shadow-2xl shadow-blue-950/60 backdrop-blur-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-widest text-blue-100/60">
                Email Address
              </label>

              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200/60" />

                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/50 py-3.5 pl-12 pr-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-blue-400/70 focus:bg-slate-950/70 focus:ring-4 focus:ring-blue-500/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-widest text-blue-100/60">
                Password
              </label>

              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200/60" />

                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/50 py-3.5 pl-12 pr-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-blue-400/70 focus:bg-slate-950/70 focus:ring-4 focus:ring-blue-500/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              disabled={loading}
              className={`group mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-4 font-black text-white shadow-xl transition-all active:scale-95 ${
                loading
                  ? "cursor-not-allowed bg-slate-700 text-slate-400 shadow-none"
                  : "bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400 shadow-blue-500/30 hover:shadow-blue-400/50"
              }`}
            >
              {loading ? "Verifying..." : "Sign In to Portal"}

              {!loading && (
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-xs font-medium text-blue-100/45">
          Protected by secure encrypted access.
        </p>
      </div>
    </div>
  );
}