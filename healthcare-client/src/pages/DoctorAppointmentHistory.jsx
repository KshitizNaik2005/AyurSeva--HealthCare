import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// const DoctorAppointmentHistory = () => {
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:5000/api/appointments/doctor/history', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setHistory(res.data);
//       } catch (err) {
//         toast.error('Failed to load history');
//         console.error(err);
//       }
//     };

//     fetchHistory();
//   }, []);

const DoctorAppointmentHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');

        // ✅ Pick backend URL dynamically (production or localhost)
        const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

        const res = await axios.get(`${BASE_URL}/api/appointments/doctor/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setHistory(res.data);
      } catch (err) {
        toast.error('Failed to load history');
        console.error(err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/medical-background.jpg')" }}
    >
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">📚 Appointment History</h2>

        {history.length === 0 ? (
          <p className="text-center text-gray-600">No history available</p>
        ) : (
          <div className="space-y-6">
            {history.map((appt) => (
              <div
                key={appt._id}
                className={`p-4 rounded-md shadow-md ${
                  appt.status === 'approved' ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                <p className="font-semibold text-lg text-indigo-900">
                  Patient: {appt.patient?.name || 'Unknown'}
                </p>
                <p className="text-gray-800">📅 {appt.date} | ⏰ {appt.time}</p>
                {appt.reason && <p className="text-sm text-gray-600">📝 {appt.reason}</p>}
                <p className="mt-2 font-semibold">
                  Status:{' '}
                  <span
                    className={`${
                      appt.status === 'approved' ? 'text-green-700' : 'text-red-700'
                    }`}
                  >
                    {appt.status.toUpperCase()}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointmentHistory;
