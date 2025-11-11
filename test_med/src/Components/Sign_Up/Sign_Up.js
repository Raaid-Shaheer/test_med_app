import React, { useState } from "react";
import "./Sign_Up.css";

const SignUp = () => {
  // State to store form values
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // State for errors
  const [errors, setErrors] = useState({});

  // Regex for simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form validation
  const validate = () => {
    const validationErrors = {};

    // Role
    if (!formData.role.trim()) {
      validationErrors.role = "Role is required";
    }

    // Name
    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }

    // Email
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }

    // Phone (optional but if filled, must be 10 digits)
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      validationErrors.phone = "Phone number must be 10 digits";
    }

    // Password
    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    return validationErrors;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Sign Up successful:", formData);
      alert("Sign Up successful!");
      // Here you can call your backend API
    }
  };

  // Handle reset
  const handleReset = () => {
    setFormData({ role: "", name: "", email: "", phone: "", password: "" });
    setErrors({});
  };

  return (
    <div className="container">
      <div className="sign-up-container">
        <h1>Sign Up</h1>
        <h3>
          Already a member? <a href="/login">Login</a>
        </h3>
      </div>

      <form className="sign-up-form" onSubmit={handleSubmit}>
        {/* Role */}
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            name="role"
            id="role"
            placeholder="Enter your Role"
            className="form-control"
            value={formData.role}
            onChange={handleChange}
          />
          {errors.role && <span className="error">{errors.role}</span>}
        </div>

        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your Name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter your Email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Enter your Phone Number"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your Password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {/* Buttons */}
        <div className="btn-group">
          <button type="submit" className="submit-btn btn">
            Submit
          </button>
          <button type="reset" className="reset-btn btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
