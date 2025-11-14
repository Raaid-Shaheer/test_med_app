import React, { useEffect, useState } from "react";
import "../Notifications/Notifications.css";

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(true);

  // Function to load appointment data from storage
  const loadAppointment = () => {
    const storedUsername = sessionStorage.getItem("email");
    const storedDoctorData = JSON.parse(localStorage.getItem("doctorData"));
    const storedAppointmentData = storedDoctorData
      ? JSON.parse(localStorage.getItem(storedDoctorData.name))
      : null;

    setIsLoggedIn(!!storedUsername);
    setUsername(storedUsername || "");
    setDoctorData(storedDoctorData);
    setAppointmentData(storedAppointmentData);
    setShowNotification(!!storedAppointmentData);
  };

  // Load once on mount
  useEffect(() => {
    loadAppointment();

    // Listen for storage changes in other tabs
    const handleStorageChange = () => {
      loadAppointment();
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Optional: poll for updates in the same tab (since storage event doesn't fire in same tab)
  useEffect(() => {
    const interval = setInterval(() => {
      loadAppointment();
    }, 500); // check every 0.5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {children}

      {isLoggedIn && appointmentData && showNotification && (
        <div className="notification-container">
          <div className="appointment-card">
            <div className="appointment-card__content">
              <h3 className="appointment-card__title">Appointment Details</h3>

              <p className="appointment-card__message">
                <strong>Booked By:</strong> {username}
              </p>

              <p className="appointment-card__message">
                <strong>Doctor:</strong> {doctorData?.name}
              </p>
               <p className="appointment-card__message">
                <strong>Speciality:</strong> {doctorData?.speciality}
              </p>
              <p className="appointment-card__message">
                <strong>Date:</strong> {appointmentData?.date}
              </p>

              <p className="appointment-card__message">
                <strong>Time:</strong> {appointmentData?.time}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
