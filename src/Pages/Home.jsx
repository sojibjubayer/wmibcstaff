import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGlobeAmericas, FaUserGraduate, FaBriefcase } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const cards = [
    {
      title: "Work Visa",
      description: "Explore job opportunities and work permits for skilled professionals.",
      route: "/work-visa",
      icon: <FaBriefcase className="text-3xl mb-4 text-pink-400" />,
    },
    {
      title: "Student Visa",
      description: "Admission guidance and visa support for top global universities.",
      route: "/student-visa",
      icon: <FaUserGraduate className="text-3xl mb-4 text-pink-400" />,
    },
    {
      title: "Visit Visa",
      description: "Hassle-free tourist and short-term travel visas for your next trip.",
      route: "/visit-visa",
      icon: <FaGlobeAmericas className="text-3xl mb-4 text-pink-400" />,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-100 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
             <span className="text-pink-400">Visa</span> Portal
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Welcome to the WMIBC management system. Streamline your visa applications and client consulting from one central hub.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="px-6 py-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => navigate(card.route)}
              className="group cursor-pointer bg-white border border-slate-100 rounded-3xl p-8 
                         shadow-sm hover:shadow-xl hover:shadow-pink-200/40 
                         transform transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-100 transition-colors">
                {card.icon}
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-pink-500 transition-colors">
                {card.title}
              </h2>
              
              <p className="text-slate-500 leading-relaxed mb-6">
                {card.description}
              </p>

              <div className="flex items-center text-pink-500 font-bold text-sm uppercase tracking-wider">
                Explore Services
                <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;