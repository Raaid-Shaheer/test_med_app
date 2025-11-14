import React, { useEffect, useState } from "react";
import "./ReportsLayout.css";

const ReportsLayout = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctor list from sessionStorage (replace with actual data if available)
    const storedDoctors = JSON.parse(sessionStorage.getItem("doctors")) || [
      { id: 1, name: "Dr. John Smith", specialty: "Cardiology" },
      { id: 2, name: "Dr. Bob Johnson", specialty: "Orthopedics" },
      
    ];
    setDoctors(storedDoctors);
  }, []);

  const reportUrl = "/patient_report.pdf"; // PDF file stored in public folder

  const handleViewReport = (doctor) => {
    // Open PDF in a new tab
    window.open(reportUrl, "_blank");
  };

  const handleDownloadReport = (doctor) => {
    // Trigger download with dynamic filename
    const link = document.createElement("a");
    link.href = reportUrl;
    link.download = `Report_${doctor.name}.pdf`;
    link.click();
  };

  return (
    <div className="reports-container">
      <h2>Your Reports</h2>
      {doctors.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        <table className="reports-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Doctor Name</th>
              <th>Specialty</th>
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={doctor.id}>
                <td>{index + 1}</td>
                <td>{doctor.name}</td>
                <td>{doctor.specialty}</td>
                <td>
                  <button
                    className="report-btn view-btn"
                    onClick={() => handleViewReport(doctor)}
                  >
                    View Report
                  </button>
                </td>
                <td>
                  <button
                    className="report-btn download-btn"
                    onClick={() => handleDownloadReport(doctor)}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportsLayout;
