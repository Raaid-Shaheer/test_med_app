import React, { useEffect, useState } from "react";
import "./ProfileCard.css";

const ProfileCard = ({ onClose }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [updatedDetails, setUpdatedDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [editMode, setEditMode] = useState(false);

  // Load from sessionStorage
  useEffect(() => {
    const name = sessionStorage.getItem("name") || "";
    const email = sessionStorage.getItem("email") || "";
    const phone = sessionStorage.getItem("phone") || "";

    const user = { name, email, phone };
    setUserDetails(user);
    setUpdatedDetails(user);
  }, []);

  const handleEdit = () => setEditMode(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Update sessionStorage
    sessionStorage.setItem("name", updatedDetails.name);
    sessionStorage.setItem("phone", updatedDetails.phone);

    setUserDetails(updatedDetails);
    setEditMode(false);

    alert("Profile updated successfully!");
    if (onClose) onClose();
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        {editMode ? (
          <form onSubmit={handleSave}>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={updatedDetails.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={updatedDetails.email}
                readOnly
              />
            </label>

            <label>
              Phone
              <input
                type="text"
                name="phone"
                value={updatedDetails.phone}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="profile-details">
            <h2>{userDetails.name}</h2>
            <p><b>Email:</b> {userDetails.email}</p>
            <p><b>Phone:</b> {userDetails.phone}</p>

            <button onClick={handleEdit}>Edit</button>
            {onClose && (
              <button onClick={onClose} className="cancel-btn">
                Close
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
