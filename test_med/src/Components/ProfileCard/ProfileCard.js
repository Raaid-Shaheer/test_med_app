import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ user }) => {
  return (
    <div className="profile-card">
      <div className="profile-img-container">
        <img 
          src={user.image || "/default-profile.png"} 
          alt="profile"
          className="profile-img"
        />
      </div>

      <h2 className="profile-name">{user.name}</h2>
      <p className="profile-email">{user.email}</p>

      <div className="profile-details">
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
