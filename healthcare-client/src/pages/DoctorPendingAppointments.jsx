
// pages/DoctorPendingAppointments.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorPendingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch & Access Control
  useEffect(() => {
    const fetchPendingAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (role !== 'doctor') {
          toast.error('Access denied');
          navigate('/');
          return;
        }

        const res = await axios.get('http://localhost:5000/api/appointments/doctor/pending', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } catch (err) {
        toast.error('Failed to load pending appointments');
        console.error(err);
      }
    };

    fetchPendingAppointments();
  }, [navigate]);

  // ✅ Floating "+" Animation
  const triggerPlusEffect = () => {
    const TOTAL_PLUSES = 40;
    const plusElements = [];

    for (let i = 0; i < TOTAL_PLUSES; i++) {
      const plus = document.createElement('div');
      plus.className = 'floating-plus';
      plus.innerText = '+';

      const left = Math.random() * 100;
      plus.style.left = `${left}%`;

      const size = Math.random() * 20 + 15;
      plus.style.fontSize = `${size}px`;

      const duration = Math.random() * 2 + 2;
      const delay = Math.random() * 2;
      plus.style.animationDuration = `${duration}s`;
      plus.style.animationDelay = `${delay}s`;

      document.body.appendChild(plus);
      plusElements.push(plus);
    }

    setTimeout(() => {
      plusElements.forEach((el) => document.body.removeChild(el));
    }, 5000);
  };

  // ✅ Approve / Reject
  const handleDecision = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/appointments/${id}/decision`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`Appointment ${status}`);
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));

      if (status === 'approved') {
        triggerPlusEffect();
      }
    } catch (err) {
      toast.error('Failed to update appointment');
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/medical-background.jpg')" }}
    >
      <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-xl">
        {/* ✅ Header with Button to View History */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-green-800">
            🔍 Pending Appointments
          </h2>
          <button
            onClick={() => navigate('/doctor/history')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            📚 View History
          </button>
        </div>

        {/* ✅ Appointment List */}
        {appointments.length === 0 ? (
          <p className="text-center text-gray-700">No pending requests</p>
        ) : (
          <div className="space-y-6">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white rounded-md shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <div className="text-left">
                  <p className="font-semibold text-lg text-green-700">
                    Patient: {appt.patient?.name}
                  </p>
                  <p className="text-gray-700 text-sm">📅 {appt.date} | ⏰ {appt.time}</p>
                  {appt.reason && (
                    <p className="text-gray-600 text-sm mt-1">📝 {appt.reason}</p>
                  )}
                </div>

                <div className="flex gap-4 mt-4 md:mt-0">
                  <button
                    onClick={() => handleDecision(appt._id, 'approved')}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => handleDecision(appt._id, 'rejected')}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPendingAppointments;








// // pages/DoctorPendingAppointments.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const DoctorPendingAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const navigate = useNavigate();

//   // ✅ Backend URL (env first, fallback to localhost)
//   const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

//   // ✅ Fetch & Access Control
//   useEffect(() => {
//     const fetchPendingAppointments = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const role = localStorage.getItem('role');

//         if (role !== 'doctor') {
//           toast.error('Access denied');
//           navigate('/');
//           return;
//         }

//         const res = await axios.get(`${BASE_URL}/api/appointments/doctor/pending`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAppointments(res.data);
//       } catch (err) {
//         toast.error('Failed to load pending appointments');
//         console.error(err);
//       }
//     };

//     fetchPendingAppointments();
//   }, [navigate, BASE_URL]);

//   // ✅ Floating "+" Animation
//   const triggerPlusEffect = () => {
//     const TOTAL_PLUSES = 40;
//     const plusElements = [];

//     for (let i = 0; i < TOTAL_PLUSES; i++) {
//       const plus = document.createElement('div');
//       plus.className = 'floating-plus';
//       plus.innerText = '+';

//       const left = Math.random() * 100;
//       plus.style.left = `${left}%`;

//       const size = Math.random() * 20 + 15;
//       plus.style.fontSize = `${size}px`;

//       const duration = Math.random() * 2 + 2;
//       const delay = Math.random() * 2;
//       plus.style.animationDuration = `${duration}s`;
//       plus.style.animationDelay = `${delay}s`;

//       document.body.appendChild(plus);
//       plusElements.push(plus);
//     }

//     setTimeout(() => {
//       plusElements.forEach((el) => document.body.removeChild(el));
//     }, 5000);
//   };

//   // ✅ Approve / Reject
//   const handleDecision = async (id, status) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `${BASE_URL}/api/appointments/${id}/decision`,
//         { status },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       toast.success(`Appointment ${status}`);
//       setAppointments((prev) => prev.filter((appt) => appt._id !== id));

//       if (status === 'approved') {
//         triggerPlusEffect();
//       }
//     } catch (err) {
//       toast.error('Failed to update appointment');
//       console.error(err);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center p-6"
//       style={{ backgroundImage: "url('/medical-background.jpg')" }}
//     >
//       <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-xl">
//         {/* ✅ Header with Button to View History */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-green-800">
//             🔍 Pending Appointments
//           </h2>
//           <button
//             onClick={() => navigate('/doctor/history')}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//           >
//             📚 View History
//           </button>
//         </div>

//         {/* ✅ Appointment List */}
//         {appointments.length === 0 ? (
//           <p className="text-center text-gray-700">No pending requests</p>
//         ) : (
//           <div className="space-y-6">
//             {appointments.map((appt) => (
//               <div
//                 key={appt._id}
//                 className="bg-white rounded-md shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between"
//               >
//                 <div className="text-left">
//                   <p className="font-semibold text-lg text-green-700">
//                     Patient: {appt.patient?.name}
//                   </p>
//                   <p className="text-gray-700 text-sm">
//                     📅 {appt.date} | ⏰ {appt.time}
//                   </p>
//                   {appt.reason && (
//                     <p className="text-gray-600 text-sm mt-1">📝 {appt.reason}</p>
//                   )}
//                 </div>

//                 <div className="flex gap-4 mt-4 md:mt-0">
//                   <button
//                     onClick={() => handleDecision(appt._id, 'approved')}
//                     className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//                   >
//                     ✅ Approve
//                   </button>
//                   <button
//                     onClick={() => handleDecision(appt._id, 'rejected')}
//                     className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
//                   >
//                     ❌ Reject
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorPendingAppointments;
