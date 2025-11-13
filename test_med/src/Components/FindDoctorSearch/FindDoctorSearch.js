import React, { useState, useEffect } from "react";
import DoctorCard from "../DoctorCard/DoctorCard"; // Adjust path if needed
import "./FindDoctorSearch.css";

const SPECIALITIES = [
  "Dentist",
  "Gynecologist/Obstetrician",
  "General Physician",
  "Dermatologist",
  "ENT Specialist",
  "Homeopath",
  "Ayurveda",
];

const FindDoctorSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Fetch doctor data once
  useEffect(() => {
    fetch("https://api.npoint.io/9a5543d36f1460da2f63")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.log(err));
  }, []);

  // Filter doctors based on search
  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = doctors.filter((doc) =>
      doc.speciality.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDoctors(filtered);
    setIsDropdownVisible(false);
  };

  return (
    <div className="find-doctor-page">
      <h1>Find a doctor and consult immediately</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search doctors, clinics, hospitals..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsDropdownVisible(true)}
          onBlur={() => setTimeout(() => setIsDropdownVisible(false), 150)}
          className="search-input"
        />
        <button onClick={() => handleSearch(searchText)} className="search-btn">
          Search
        </button>

        {isDropdownVisible && (
          <div className="dropdown">
            {SPECIALITIES.filter((spec) =>
              spec.toLowerCase().includes(searchText.toLowerCase())
            ).map((spec) => (
              <div
                key={spec}
                className="dropdown-item"
                onMouseDown={() => handleSearch(spec)}
              >
                {spec}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="doctor-results">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc,index) => <DoctorCard key={doc.id || index} {...doc} />)
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default FindDoctorSearch;
