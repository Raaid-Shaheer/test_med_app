import React, { useState } from 'react';
import './Sign_Up.css';
import { useNavigate } from 'react-router-dom';

const Sign_Up = () => {
  // State variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showerr, setShowerr] = useState('');
  const navigate = useNavigate();

  // Function to handle form submission
  const register = (e) => {
    e.preventDefault();
    setShowerr(''); // Reset previous errors

    // Basic frontend validation
    if (!name || !email || !password) {
      setShowerr('Please fill all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setShowerr('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setShowerr('Password must be at least 6 characters long.');
      return;
    }

    // Mock success: store data in sessionStorage (no backend)
    sessionStorage.setItem('auth-token', 'dummy-token');
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('phone', phone);
    sessionStorage.setItem('email', email);

    // Navigate to home page
    navigate('/');
    window.location.reload();
  };

  // Handle reset
  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setShowerr('');
  };

  return (
    <div className="container">
      <div className="signup-grid">
        {/* Header Section */}
        <div className="signup-header">
          <h1>Sign Up</h1>
          <h3>
            Already a member?{' '}
            <span onClick={() => navigate('/login')}>Login</span>
          </h3>
        </div>

        {/* Form Section */}
        <div className="signup-form">
          <form onSubmit={register}>
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                id="phone"
                className="form-control"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
              />
            </div>

            {/* Error Message */}
            {showerr && <div className="error">{showerr}</div>}

            {/* Buttons */}
            <div className="btn-group">
              <button type="submit" className="submit-btn btn">
                Submit
              </button>
              <button type="button" onClick={handleReset} className="reset-btn btn">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
