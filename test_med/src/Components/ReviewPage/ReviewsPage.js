import React, { useState, useEffect } from "react";
import ReviewForm from "../ReviewForm/ReviewForm";
import "./ReviewsPage.css";

const ReviewsPage = () => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [reviews, setReviews] = useState({});
  const [activeDoctor, setActiveDoctor] = useState(null);

  // Load doctors and reviews from localStorage on mount
  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem("doctorsList")) || [];
    setDoctorsList(storedDoctors);

    const storedReviews = JSON.parse(localStorage.getItem("doctorReviews")) || {};
    setReviews(storedReviews);
  }, []);

  const handleOpenForm = (doctor) => {
    setActiveDoctor(doctor);
  };

  const handleSubmitReview = (reviewData) => {
    const updatedReviews = {
      ...reviews,
      [reviewData.doctorName]: reviewData
    };

    // Save to state and localStorage
    setReviews(updatedReviews);
    localStorage.setItem("doctorReviews", JSON.stringify(updatedReviews));

    setActiveDoctor(null); // Close form after submit
  };

  const handleCancelForm = () => {
    setActiveDoctor(null); // Close form
  };

  return (
    <div className="reviews-page-container">
      <h2>Doctor Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Doctor Name</th>
            <th>Speciality</th>
            <th>Provide Feedback</th>
            <th>Reviews</th>
          </tr>
        </thead>
        <tbody>
          {doctorsList.length > 0 ? (
            doctorsList.map((doctor, index) => (
              <tr key={doctor.name}>
                <td>{index + 1}</td>
                <td>{doctor.name}</td>
                <td>{doctor.speciality}</td>
                <td>
                  <button
                    disabled={!!reviews[doctor.name]} // Disable if review exists
                    onClick={() => handleOpenForm(doctor)}
                  >
                    Click Here
                  </button>
                </td>
                <td>
                  {reviews[doctor.name]
                    ? `${reviews[doctor.name].reviewText} (Rating: ${reviews[doctor.name].rating}/5)`
                    : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No doctors available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {activeDoctor && (
        <ReviewForm
          doctorName={activeDoctor.name}
          doctorSpeciality={activeDoctor.speciality}
          onSubmit={handleSubmitReview}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default ReviewsPage;
