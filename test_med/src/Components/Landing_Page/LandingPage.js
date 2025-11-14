import React from "react";
import "./LandingPage.css"; // Importing the renamed CSS file

const LandingPage = () => {
  return (
    <section className="hero-section">
      <div>
        <div data-aos="fade-up" className="flex-hero">
          {/* Main Heading */}
          <h1>
            Your Health
            <br />
            <span className="text-gradient">Our Responsibility</span>
          </h1>

          {/* Blob background animations */}
          <div className="blob-cont">
            <div className="blue blob"></div>
          </div>
          <div className="blob-cont">
            <div className="blue1 blob"></div>
          </div>

          {/* Subheading / Description */}
          <h4>
           Manage your health with ease — book doctor appointments, consult specialists online, and access trusted healthcare services all in one place. We connect you with certified professionals to ensure quick, safe, and reliable care whenever you need it.
          </h4>

          {/* Get Started Button */}
          <a href="appointments">
            <button className="button">Get Started</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
