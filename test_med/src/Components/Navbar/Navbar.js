import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    const email = sessionStorage.getItem("email");
    if (token && email) {
      setIsLoggedIn(true);
      const nameFromEmail = sessionStorage.getItem("name") || email.split("@")[0];
      setUsername(nameFromEmail);
    }
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
    setShowDropdown(false);
  };

  return (
    <nav className="navbar-container">
      <div className="nav-logo-container">
        <span>Stay Healthy</span>
        <img
          className="logo"
          src="https://img.pikbest.com/png-images/20241019/creative-doctor-logo-vector-design_10974091.png!sw800"
          alt="logo"
        />
      </div>

      <ul className="nav-links">
        <li><button onClick={() => handleNavigation("/")} className="link-button">Home</button></li>
        <li><button onClick={() => handleNavigation("/appointments")} className="link-button">Appointment</button></li>
        <li><button onClick={() => handleNavigation("/blog")} className="link-button">Health Blog</button></li>
        <li><button onClick={() => handleNavigation("/reviewspage")} className="link-button">Reviews</button></li>
        <li><button onClick={() => handleNavigation("/instant-consultation")} className="link-button">Instant Consultation</button></li>

        {!isLoggedIn ? (
          <>
            <li><button onClick={() => handleNavigation("/signup")} className="circle">Sign Up</button></li>
            <li><button onClick={() => handleNavigation("/login")} className="circle">Login</button></li>
          </>
        ) : (
          <li className="profile-menu">
            <button className="profile-btn">{username} ▾</button>

        <div className="profile-panel">
          <button onClick={() => handleNavigation("/profile")} className="panel-item">
            Your Profile
          </button>

          <button onClick={() => handleNavigation("/reports")} className="panel-item">
            Your Reports
          </button>

          <button onClick={handleLogout} className="panel-item logout-item">
            Logout
          </button>
        </div>
      </li>

        )}
      </ul>
    </nav>
  );
};

export default Navbar;
