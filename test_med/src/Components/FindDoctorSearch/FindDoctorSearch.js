import React, { useState } from "react";
import "./FindDoctorSearch.css";

const initSpecialities = [
  "Dentist",
  "Gynecologist/Obstetrician",
  "General Physician",
  "Dermatologist",
  "ENT Specialist",
  "Homeopath",
  "Ayurveda",
];

const FindDoctorSearch = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSelect = (speciality) => {
    setSearchText(speciality);
    setIsDropdownVisible(false);
    if (onSearch) onSearch(speciality); // optional callback
  };

  const filteredSpecialities = initSpecialities.filter((spec) =>
    spec.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="finddoctor-container">
      <h1>Find a doctor and consult immediately</h1>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search doctors, clinics, hospitals..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsDropdownVisible(true)}
          onBlur={() => setTimeout(() => setIsDropdownVisible(false), 150)}
          className="search-input"
        />
        <button
          className="search-button"
          onClick={() => onSearch && onSearch(searchText)}
        >
          🔍
        </button>

        {isDropdownVisible && filteredSpecialities.length > 0 && (
          <div className="dropdown-menu">
            {filteredSpecialities.map((spec) => (
              <div
                key={spec}
                className="dropdown-item"
                onMouseDown={() => handleSelect(spec)}
              >
                {spec}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctorSearch;
