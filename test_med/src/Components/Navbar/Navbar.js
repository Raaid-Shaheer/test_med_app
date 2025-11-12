import React, { useEffect, useState } from "react"; 
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    const email = sessionStorage.getItem("email");
    if (token && email) {
      setIsLoggedIn(true);
      const nameFromEmail = email.split("@")[0]; // Extract name
      setUsername(nameFromEmail);
    }
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar-container">
      {/* Logo */}
      <div className="nav-logo-container">
        <span>Stay Healthy</span>
        <img
          className="logo"
          src="https://img.pikbest.com/png-images/20241019/creative-doctor-logo-vector-design_10974091.png!sw800"
          alt="logo"
        />
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <ul>
          <li className="link-item">
            <button onClick={() => handleNavigation("/")} className="link-button">
              Home
            </button>
          </li>
          <li className="link-item">
            <button onClick={() => handleNavigation("/Appointment")} className="link-button">
              Appointment
            </button>
          </li>
          <li className="link-item">
            <button onClick={() => handleNavigation("/find-doctor")} className="link-button">
              Find Doctor
            </button>
          </li>

          <li className="link-item">
            <button onClick={() => handleNavigation("/blog")} className="link-button">
              Health Blog
            </button>
          </li>
          <li className="link-item">
            <button onClick={() => handleNavigation("/reviews")} className="link-button">
              Reviews
            </button>
          </li>
          
          {/* 🔹 Instant Consultation Link Added */}
          <li className="link-item">
            <button 
              onClick={() => handleNavigation("/instant-consultation")} 
              className="link-button"
              
            >
              Instant Consultation
            </button>
          </li>

          {/* Conditional Rendering */}
          {!isLoggedIn ? (
            <>
              <li>
                <button onClick={() => handleNavigation("/signup")} className="circle">
                  Sign Up
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/login")} className="circle">
                  Login
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="link-item" style={{ marginRight: "10px", color: "#2190FF" }}>
                {username}
              </li>
              <li>
                <button onClick={handleLogout} className="circle">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
