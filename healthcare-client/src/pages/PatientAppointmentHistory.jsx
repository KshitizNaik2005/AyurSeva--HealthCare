// // pages/PatientAppointmentHistory.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PatientAppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        // 🔒 Restrict to patients
        if (role !== 'patient') {
          toast.error('Access denied');
          navigate('/');
          return;
        }

        const res = await axios.get('http://localhost:5000/api/appointments/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } catch (err) {
        toast.error('Failed to load appointment history');
        console.error(err);
      }
    };

    fetchAppointments();
  }, [navigate]);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/medical-background.jpg')" }}
    >
      <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-800">
            📅 Your Appointments
          </h2>
          <button
            onClick={() => navigate('/patient-dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            🔙 Back to Dashboard
          </button>
        </div>

        {appointments.length === 0 ? (
          <p className="text-center text-gray-700">No appointments found</p>
        ) : (
          <div className="space-y-6">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white rounded-md shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold text-lg text-blue-700">
                    Doctor: {appt.doctor?.name}
                  </p>
                  <p className="text-gray-700 text-sm">
                    📅 {appt.date} | ⏰ {appt.time}
                  </p>
                  {appt.reason && (
                    <p className="text-gray-600 text-sm mt-1">📝 {appt.reason}</p>
                  )}
                </div>

                <span
                  className={`mt-4 md:mt-0 text-sm font-semibold px-3 py-1 rounded-full ${
                    appt.status === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : appt.status === 'rejected'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {appt.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAppointmentHistory;




// // pages/PatientAppointmentHistory.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const PatientAppointmentHistory = () => {
//   const [appointments, setAppointments] = useState([]);
//   const navigate = useNavigate();

//   // ✅ Backend URL (from .env, fallback to localhost)
//   const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const role = localStorage.getItem('role');

//         // 🔒 Restrict to patients only
//         if (role !== 'patient') {
//           toast.error('Access denied');
//           navigate('/');
//           return;
//         }

//         const res = await axios.get(`${BASE_URL}/api/appointments/my`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAppointments(res.data);
//       } catch (err) {
//         toast.error('Failed to load appointment history');
//         console.error(err);
//       }
//     };

//     fetchAppointments();
//   }, [navigate, BASE_URL]);

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center p-6"
//       style={{ backgroundImage: "url('/medical-background.jpg')" }}
//     >
//       <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-xl">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-blue-800">
//             📅 Your Appointments
//           </h2>
//           <button
//             onClick={() => navigate('/patient-dashboard')}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//           >
//             🔙 Back to Dashboard
//           </button>
//         </div>

//         {appointments.length === 0 ? (
//           <p className="text-center text-gray-700">No appointments found</p>
//         ) : (
//           <div className="space-y-6">
//             {appointments.map((appt) => (
//               <div
//                 key={appt._id}
//                 className="bg-white rounded-md shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between"
//               >
//                 <div>
//                   <p className="font-semibold text-lg text-blue-700">
//                     Doctor: {appt.doctor?.name}
//                   </p>
//                   <p className="text-gray-700 text-sm">
//                     📅 {appt.date} | ⏰ {appt.time}
//                   </p>
//                   {appt.reason && (
//                     <p className="text-gray-600 text-sm mt-1">📝 {appt.reason}</p>
//                   )}
//                 </div>

//                 <span
//                   className={`mt-4 md:mt-0 text-sm font-semibold px-3 py-1 rounded-full ${
//                     appt.status === 'approved'
//                       ? 'bg-green-100 text-green-700'
//                       : appt.status === 'rejected'
//                       ? 'bg-red-100 text-red-700'
//                       : 'bg-yellow-100 text-yellow-700'
//                   }`}
//                 >
//                   {appt.status.toUpperCase()}
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PatientAppointmentHistory;
