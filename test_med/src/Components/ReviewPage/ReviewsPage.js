import React, { useState, useEffect } from "react";
import ReviewForm from "../ReviewForm/ReviewForm"; // Your existing ReviewForm
import "./ReviewsPage.css";

const ReviewsPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorsList, setDoctorsList] = useState([]);

  // Load doctors list from localStorage or define static list
  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem("doctorsList"));
    if (storedDoctors && storedDoctors.length > 0) {
      setDoctorsList(storedDoctors);
    } else {
      // Static example if no data in localStorage
      setDoctorsList([
        { name: "Dr. John Doe", speciality: "Cardiologist" },
        { name: "Dr. Jane Smith", speciality: "Dermatologist" },
        { name: "Dr. Alex Brown", speciality: "Neurologist" },
      ]);
    }
  }, []);

  return (
    <div className="reviews-page-container">
      <h2>Doctor Reviews</h2>

      <table className="reviews-table">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Doctor Name</th>
            <th>Speciality</th>
            <th>Provide Feedback</th>
            <th>Reviews</th>
          </tr>
        </thead>
        <tbody>
          {doctorsList.map((doctor, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{doctor.name}</td>
              <td>{doctor.speciality}</td>
              <td>
                <button
                  className="feedback-btn"
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  Click Here
                </button>
              </td>
              <td>
                {localStorage.getItem(`review-${doctor.name}`) || "No Review"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Review form popup */}
      {selectedDoctor && (
        <div className="review-form-popup">
          <ReviewForm
            doctorName={selectedDoctor.name}
            doctorSpeciality={selectedDoctor.speciality}
            onClose={() => setSelectedDoctor(null)}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
