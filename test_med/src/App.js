// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";           // Navbar.js
import LandingPage from "./Components/Landing_Page/LandingPage"; // Landing_Page.js
import LoginPage from "./Components/Login_Page/login";     // Login_Page.js
import SignUpPage from "./Components/Sign_Up/Sign_Up";       // Sign_Up.js
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultationBooking/InstantConsultation';
import FindDoctorSearch from "./Components/FindDoctorSearch/FindDoctorSearch";

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Navbar will render on every page */}
      <Routes>
        <Route path="/" element={<LandingPage />} />          {/* Home / Landing page */}
        <Route path="/login" element={<LoginPage />} />      {/* Login page */}
        <Route path="/signup" element={<SignUpPage />} />    {/* Sign Up page */}
        <Route path="/instant-consultation" element={<InstantConsultation />} />
        <Route path="/find-doctor" element={<FindDoctorSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
