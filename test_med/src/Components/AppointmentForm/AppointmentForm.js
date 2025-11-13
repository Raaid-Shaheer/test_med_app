import React, { useState } from 'react';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [patientName, setPatientName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
    setAppointmentTime(slot); // ✅ Automatically fills the time input
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!patientName || !appointmentDate || !appointmentTime) {
      alert('⚠️ Please fill in all fields before submitting.');
      return;
    }

    const appointmentData = {
      doctorName,
      doctorSpeciality,
      patientName,
      appointmentDate,
      appointmentTime,
      selectedSlot
    };

    onSubmit(appointmentData);

    // Reset form
    setPatientName('');
    setAppointmentDate('');
    setAppointmentTime('');
    setSelectedSlot('');
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <h3>Book Appointment with {doctorName}</h3>

      <div className="form-group">
        <label htmlFor="patientName">Patient Name:</label>
        <input
          type="text"
          id="patientName"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Enter patient name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentDate">Appointment Date:</label>
        <input
          type="date"
          id="appointmentDate"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentTime">Appointment Time:</label>
        <input
          type="text"
          id="appointmentTime"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          placeholder="Select or enter time"
          required
        />
      </div>

      <div className="form-group">
        <label>Select Time Slot:</label>
        <div className="time-slots">
          {['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'].map((slot) => (
            <button
              key={slot}
              type="button"
              className={`slot-btn ${selectedSlot === slot ? 'selected' : ''}`}
              onClick={() => handleSlotSelection(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Confirm Booking
      </button>
    </form>
  );
};

export default AppointmentForm;
