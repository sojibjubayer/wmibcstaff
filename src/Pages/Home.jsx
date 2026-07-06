import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGlobeAmericas,
  FaUserGraduate,
  FaBriefcase,
  FaBuilding,
} from "react-icons/fa";

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
      description:
        "Explore job opportunities and work permits for skilled professionals.",
      route: "/work-visa",
      icon: FaBriefcase,
    },
    {
      title: "Visit Visa",
      description:
        "Hassle-free tourist and short-term travel visas for your next trip.",
      route: "/visit-visa",
      icon: FaGlobeAmericas,
    },
    {
      title: "Student Visa",
      description:
        "Admission guidance and visa support for top global universities.",
      route: "/student-visa",
      icon: FaUserGraduate,
    },
    {
      title: "Business Visa",
      description:
        "Business travel visa support for meetings, conferences, and company visits.",
      route: "/business-visa",
      icon: FaBuilding,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.34),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.22),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[44px_44px] opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <div className="mb-8 rounded-4xl border border-white/10 bg-white/[0.07] px-6 py-10 text-center shadow-2xl shadow-blue-950/50 backdrop-blur-2xl md:rounded-[2.5rem] md:px-10 md:py-14">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border border-sky-300/30 bg-white/10 shadow-lg shadow-blue-500/20">
            <FaGlobeAmericas className="text-3xl text-sky-200" />
          </div>

          <h1 className="mb-4 text-4xl font-black tracking-tight text-white md:text-5xl">
            Visa Portal
          </h1>

          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-blue-100/60 md:text-lg">
            Welcome to the WMIBC management system. Streamline your visa
            applications and client consulting from one central hub.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, idx) => {
            const Icon = card.icon;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => navigate(card.route)}
                className="group rounded-4xl border border-white/10 bg-white/[0.07] p-6 text-left shadow-xl shadow-blue-950/35 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/30 hover:bg-sky-400/10 hover:shadow-blue-500/20 active:scale-[0.98]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/25 bg-sky-400/10 text-sky-200 shadow-lg shadow-blue-500/10 transition-all group-hover:bg-sky-400/20 group-hover:text-white">
                  <Icon className="text-2xl" />
                </div>

                <h2 className="mb-3 text-xl font-black text-white">
                  {card.title}
                </h2>

                <p className="mb-6 min-h-20 text-sm font-medium leading-relaxed text-blue-100/55">
                  {card.description}
                </p>

                <div className="flex items-center text-xs font-black uppercase tracking-widest text-sky-300">
                  Explore Services
                  <span className="ml-2 transition-transform group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;