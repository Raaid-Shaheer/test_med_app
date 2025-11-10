import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom"; // For SPA navigation

const Navbar = () =>{
  const navigate = useNavigate(); //Hook from React Router

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the given route
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
      {/* Navigation links */}
      <div className="nav-links">
        <ul>
          <li className="link-item">
            <button onClick={() => handleNavigation("/")} className="link-button">
              Home
            </button>
          </li>
          <li className="link-item">
            <button onClick={() => handleNavigation("/appointment")} className="link-button">
              Appointment
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
        </ul>
      </div>
    </nav>
  );
  
};

export default Navbar;

