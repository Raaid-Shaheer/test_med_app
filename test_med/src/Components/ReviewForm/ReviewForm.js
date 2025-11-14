import React, { useState } from "react";
import "./ReviewForm.css";

const ReviewForm = ({ doctorName, doctorSpeciality, onSubmit, onCancel }) => {
  const [reviewerName, setReviewerName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      reviewerName,
      doctorName,
      doctorSpeciality,
      rating,
      reviewText,
    });
    // Reset form fields
    setReviewerName("");
    setReviewText("");
    setRating(1);
  };

  return (
    <div className="review-form-container">
      <h3>Provide Review for {doctorName}</h3>
      <form onSubmit={handleSubmit} className="review-form">
        <label>
          Your Name:
          <input
            type="text"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            required
          />
        </label>

        <label>
          Rating (1-5):
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>

        <label>
          Review:
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
        </label>

        <div className="review-form-buttons">
          <button type="submit">Submit</button>
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
