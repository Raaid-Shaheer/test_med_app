import React, { useState, useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
// import { API_URL } from '../../config'; // Uncomment when backend is connected

const Login = () => {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  // Dummy backend logic (replace with actual API when DB is ready)
  const login = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      validationErrors.email = "Invalid email format";
    }

    // Password validation
    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Dummy success response (replace with actual API call)
      // const res = await fetch(`${API_URL}/api/auth/login`, { ... });
      // const json = await res.json();
      const json = { authtoken: "dummy-token" };

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("email", email);

        // Optional: store username extracted from email for Navbar
        const nameFromEmail = email.split("@")[0];
        sessionStorage.setItem("username", nameFromEmail);

        navigate("/");
        window.location.reload();
      } else {
        alert("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1>Login</h1>
        <h3>
          Not a member?{" "}
          <Link to="/signup" style={{ color: "#2190FF" }}>
            Sign Up
          </Link>
        </h3>
      </div>

      <form className="login-form" onSubmit={login}>
        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter your Email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your Password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {/* Buttons */}
        <div className="btn-group">
          <button type="submit" className="submit-btn btn">
            Submit
          </button>
          <button
            type="reset"
            className="reset-btn btn"
            onClick={() => {
              setEmail("");
              setPassword("");
              setErrors({});
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
