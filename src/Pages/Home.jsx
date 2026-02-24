import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Card data
  const cards = [
    {
      title: "Work Visa",
      description: "Explore job opportunities and work permits.",
      route: "/work-visa",
      color: "bg-white",
    },
    {
      title: "Student Visa",
      description: "Study abroad programs and admission process.",
      route: "/student-visa",
      color: "bg-white",
    },
    {
      title: "Visit Visa",
      description: "Tourist and short-term travel visas.",
      route: "/visit-visa",
      color: "bg-white",
    },
  ];

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-400 flex mx-auto">
          Visa Dashboard
        </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => navigate(card.route)}
            className="cursor-pointer bg-white shadow-lg shadow-emerald-300 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transform transition-all"
          >
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">
              {card.title} 
            </h2>
            <p className="text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
