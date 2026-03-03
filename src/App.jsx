
import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

const App = () => {
  const location = useLocation();

  // Check if current path is exactly "/login"
  const isLoginPage = location.pathname === "/login";

  return (
    // Added min-h-screen to ensure the footer stays at the bottom 
    // even if the page content is short
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Only show Navbar if we are NOT on the login page */}
      {!isLoginPage && <Navbar />}

      {/* 2. Main content area */}
      <main className="flex-1 bg-linear-to-b from-purple-50 to-orange-50">
        <Outlet /> 
      </main>

      {/* 3. Footer stays visible on ALL pages */}
      <Footer />
      
    </div>
  );
};

export default App;