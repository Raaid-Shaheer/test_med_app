import React, { useState } from "react";
import DoctorCard from "../Components/DoctorCard/DoctorCard";
import FindDoctorSearch from "../Components/FindDoctorSearch/FindDoctorSearch";
import "./BookingConsultation.css"; // Use design similar to InstantConsultation.css

const BookingConsultation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // Example doctor data — replace with API or props later
  const doctorsList = [
    {
      name: "Dr. John Doe",
      speciality: "Cardiologist",
      experience: 10,
      ratings: 4.5,
      profilePic: null,
    },
    {
      name: "Dr. Jane Smith",
      speciality: "Dermatologist",
      experience: 8,
      ratings: 4.7,
      profilePic: null,
    },
    {
      name: "Dr. Alex Brown",
      speciality: "Neurologist",
      experience: 12,
      ratings: 4.9,
      profilePic: null,
    },
  ];

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);

    const filtered = doctorsList.filter((doctor) =>
      doctor.name.toLowerCase().includes(query.toLowerCase()) ||
      doctor.speciality.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredDoctors(filtered);
  };

  return (
    <div className="booking-consultation-container">
      <h2>Book a Consultation</h2>

      {/* Search Component */}
      <FindDoctorSearch searchQuery={searchQuery} onSearch={handleSearch} />

      {/* Doctor Cards */}
      <div className="doctor-cards-container">
        {(filteredDoctors.length > 0 ? filteredDoctors : doctorsList).map(
          (doctor, index) => (
            <DoctorCard
              key={index}
              name={doctor.name}
              speciality={doctor.speciality}
              experience={doctor.experience}
              ratings={doctor.ratings}
              profilePic={doctor.profilePic}
            />
          )
        )}
      </div>
    </div>
  );
};

export default BookingConsultation;
