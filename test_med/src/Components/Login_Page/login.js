import React, { useState } from "react";
import "./login.css";

const Login = () => {
  // State to store form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State to store errors
  const [errors, setErrors] = useState({});

  // Regex for simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Email validation
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

    // If no errors, form is valid
    if (Object.keys(validationErrors).length === 0) {
      console.log("Login successful:", { email, password });
      // Here you can call your backend API
      alert("Login successful!");
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1>Login</h1>
        <h3>
          Not a member? <a href="/signup">Sign Up</a>
        </h3>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
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
