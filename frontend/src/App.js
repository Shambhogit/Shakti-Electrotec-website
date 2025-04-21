import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "./components/Header";
import AdminHome from "./pages/adminHome";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";

// Create a wrapper component to handle header visibility
const LayoutWrapper = ({ children, isLoggedIn }) => {
  const location = useLocation();
  const showHeader = !['/login', '/admin-dashboard'].includes(location.pathname);

  return (
    <>
      {showHeader && <Header isLoggedIn={isLoggedIn} />}
      {children}
    </>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("loggedIn") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick
        theme="colored"
      />
      
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="*" element={
            <LayoutWrapper isLoggedIn={isLoggedIn}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={isLoggedIn ? <Navigate to="/admin-dashboard" /> : <Home />} />
                <Route path="/login" element={<Login />} />

                <Route path="/products" element={<Products />} />

                {/* Protected routes */}
                <Route
                  path="/admin-dashboard"
                  element={
                    isLoggedIn ? (
                      <AdminHome />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </LayoutWrapper>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;