import React, { useState, useEffect } from "react";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showForm, setShowForm] = useState(false);
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  // Add doctor to global list for Reviews page
  useEffect(() => {
    const savedDoctors = JSON.parse(localStorage.getItem("doctorsList")) || [];
    const exists = savedDoctors.some(d => d.name === name);
    if (!exists) {
      savedDoctors.push({ name, speciality });
      localStorage.setItem("doctorsList", JSON.stringify(savedDoctors));
    }
  }, [name, speciality]);

  // When Book Appointment button is clicked
  const handleBookClick = () => {
    setShowForm(true);
  };

  // When appointment form is submitted
  const handleFormSubmit = (appointmentData) => {
    setAppointmentDetails(appointmentData);
    setAppointmentBooked(true);
    setShowForm(false);

    // Save data for Notification component
    const userEmail = sessionStorage.getItem("email") || "patient@example.com";
    localStorage.setItem("doctorData", JSON.stringify({ name, speciality }));
    localStorage.setItem(name, JSON.stringify({
      date: appointmentData.appointmentDate,
      time: appointmentData.appointmentTime
    }));
    sessionStorage.setItem("email", userEmail);
  };

  // Cancel appointment
  const handleCancelAppointment = () => {
    setAppointmentBooked(false);
    setAppointmentDetails(null);
    localStorage.removeItem(name);
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        {/* Doctor profile image */}
        <div className="doctor-card-profile-image-container">
          {profilePic ? (
            <img src={profilePic} alt={name} className="doctor-profile-pic" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          )}
        </div>

        {/* Doctor details */}
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">
            {experience} years experience
          </div>
          <div className="doctor-card-detail-ratings">Ratings: {ratings}</div>
        </div>

        {/* Doctor card options (Book / Cancel) */}
        <div className="doctor-card-options-container">
          {!appointmentBooked && (
            <button className="book-appointment-btn" onClick={handleBookClick}>
              <div>Book Appointment</div>
              <div>No Booking Fee</div>
            </button>
          )}

          {appointmentBooked && (
            <>
              <div className="appointment-confirmation">
                <p>
                  <strong>Appointment Confirmed:</strong>{" "}
                  {appointmentDetails.appointmentDate} at{" "}
                  {appointmentDetails.appointmentTime}
                </p>
              </div>
              <button
                className="cancel-appointment-btn"
                onClick={handleCancelAppointment}
              >
                Cancel Appointment
              </button>
            </>
          )}
        </div>
      </div>

      {/* Appointment Form Section */}
      {showForm && !appointmentBooked && (
        <div className="appointment-form-container">
          <AppointmentForm
            doctorName={name}
            doctorSpeciality={speciality}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
