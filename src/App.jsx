// App.jsx
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col ">
      <Navbar />

      <main className="flex-1 bg-linear-to-b from-purple-50 to-orange-50  ">
        {/* Outlet renders child routes like WorkVisa, VisitVisa, StudentVisa */}
        <Outlet /> 
      </main>

      <Footer />
    </div>
  );
};

export default App;
