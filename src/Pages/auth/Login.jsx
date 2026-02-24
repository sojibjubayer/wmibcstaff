import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { FiUser, FiLock, FiLogIn } from "react-icons/fi"; // Install react-icons

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("https://wmibcstaff-server.vercel.app/api/login", {
        name,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // toast.success("Welcome back, " + res.data.user.name + "!", {
      toast.success("Welcome to visa info dashboard!", {
        icon: '🚀',
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
      
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="flex md:min-h-screen items-center justify-center px-2 py-20  md:px-6 bg-linear-to-br from-cyan-200 via-green-300 to-pink-300 animate-gradient-xy">


      <Toaster position="top-center" reverseOrder={false} /> 

      <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01]">
        <div className="text-center mb-10"> 
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-tr from-emerald-400 to-cyan-500 rounded-2xl shadow-lg mb-4 text-white text-3xl">
            <FiLogIn />
          </div> 
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">Staff Login</h2>
          <p className="text-gray-500 mt-2">Please enter your details to sign in</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6"> 
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-bold shadow-lg transform transition-all active:scale-95 ${
              loading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-linear-to-r from-emerald-400 to-cyan-500 hover:from-emerald-500 hover:to-cyan-600 hover:shadow-emerald-200"
            }`}
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
        

      </div>
    </div>
  );
}