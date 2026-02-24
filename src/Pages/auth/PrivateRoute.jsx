// PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Check if token exists in localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Logged in, render the protected component
  return children;
};

export default PrivateRoute;
