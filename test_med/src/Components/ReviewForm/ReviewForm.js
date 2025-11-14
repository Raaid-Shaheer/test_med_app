import React, { useState } from "react";
import "./ReviewForm.css";

const ReviewForm = ({ doctorName, doctorSpeciality, onClose }) => {
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save review in localStorage with key 'review-DoctorName'
    if (reviewText.trim() !== "") {
      localStorage.setItem(`review-${doctorName}`, reviewText.trim());
      setReviewText("");
      onClose(); // Close popup
    }
  };

  return (
    <div className="review-form-container">
      <h3>Provide Feedback</h3>
      <p>
        <strong>Doctor:</strong> {doctorName}
      </p>
      <p>
        <strong>Speciality:</strong> {doctorSpeciality}
      </p>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows="5"
          required
        />
        <div className="review-form-buttons">
          <button type="submit" className="submit-review-btn">
            Submit Review
          </button>
          <button
            type="button"
            className="cancel-review-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
