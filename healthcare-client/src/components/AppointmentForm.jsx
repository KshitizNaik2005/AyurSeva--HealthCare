import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    timeSlot: '',
    reason: ''
  });
  const [confirmation, setConfirmation] = useState('');

  useEffect(() => {
    // Fetch doctors (only those with role = doctor)
    axios.get('/api/doctors').then(res => setDoctors(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const patientId = localStorage.getItem('userId');
    const res = await axios.post('/api/appointments/book', { ...formData, patientId });
    setConfirmation(`✅ Appointment booked with Dr. ${res.data.appointment.doctorId} on ${formData.date}`);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">📅 Book an Appointment</h2>

      <select name="doctorId" onChange={handleChange} className="mb-3 w-full p-2 border rounded">
        <option value="">-- Select Doctor --</option>
        {doctors.map(doc => (
          <option key={doc._id} value={doc._id}>{doc.name} ({doc.specialization})</option>
        ))}
      </select>

      <input type="date" name="date" onChange={handleChange} className="mb-3 w-full p-2 border rounded" />
      <input type="time" name="timeSlot" onChange={handleChange} className="mb-3 w-full p-2 border rounded" />
      <textarea name="reason" onChange={handleChange} className="mb-3 w-full p-2 border rounded" placeholder="Reason for visit" />

      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded w-full">Book</button>

      {confirmation && (
        <div className="mt-4 bg-green-100 text-green-700 p-3 rounded">{confirmation}</div>
      )}
    </div>
  );
};

export default AppointmentForm;
