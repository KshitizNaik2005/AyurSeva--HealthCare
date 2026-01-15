// src/pages/SelectDoctorChat.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SelectDoctorChat = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('/api/users/doctors', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setDoctors(res.data);
      } catch (err) {
        console.error('Failed to load doctors', err);
      }
    };

    fetchDoctors();
  }, []);

  const handleChatStart = (doctorId) => {
    navigate(`/patient/chat/${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-6">Select a Doctor to Chat</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {doctors.map((doc) => (
          <div key={doc._id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-green-800">{doc.name}</h2>
            <p className="text-gray-700">{doc.specialization || 'General Physician'}</p>
            <p className="text-sm text-gray-500">{doc.email}</p>
            <button
              onClick={() => handleChatStart(doc._id)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Chat Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectDoctorChat;
