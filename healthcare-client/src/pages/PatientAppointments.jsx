

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // ⬅️ for navigation

const PatientAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/doctors', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDoctors(res.data);
      } catch (err) {
        console.error('Doctor fetch error:', err);
        toast.error('Failed to fetch doctors');
      }
    };

    fetchDoctors();
  }, []);

  // ➕ Floating animation effect
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDoctor || !date || !time) {
      toast.warning('Please fill all required fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/appointments/book', {
        doctor: selectedDoctor,
        date,
        time,
        reason
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Appointment requested successfully!');
      triggerPlusEffect(); // ➕ animate

      // Reset form
      setSelectedDoctor('');
      setDate('');
      setTime('');
      setReason('');
    } catch (err) {
      console.error(err);
      toast.error('Failed to book appointment');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
          <span role="img" aria-label="calendar">📅</span> Book an Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Doctor Dropdown */}
          <div>
            <label className="block font-semibold mb-1">Select Doctor</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">-- Choose a Doctor --</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.name} ({doc.email})
                </option>
              ))}
            </select>
          </div>

          {/* Date Input */}
          <div>
            <label className="block font-semibold mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Time Input */}
          <div>
            <label className="block font-semibold mb-1">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Reason Input */}
          <div>
            <label className="block font-semibold mb-1">Reason (Optional)</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Optional notes for the doctor"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition"
          >
            Request Appointment
          </button>
        </form>
      </div>

      {/* View History Button */}
      <div className="mt-6">
        <button
          onClick={() => navigate('/patient/history')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition transform hover:scale-105 shadow"
        >
          📖 View Appointment History
        </button>
      </div>
    </div>
  );
};

export default PatientAppointment;







// // pages/PatientAppointment.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// const PatientAppointment = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [reason, setReason] = useState('');
//   const navigate = useNavigate();

//   // ✅ Use env variable (fallback to localhost for dev)
//   const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get(`${BASE_URL}/api/users/doctors`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setDoctors(res.data);
//       } catch (err) {
//         console.error('Doctor fetch error:', err);
//         toast.error('Failed to fetch doctors');
//       }
//     };

//     fetchDoctors();
//   }, [BASE_URL]);

//   // ➕ Floating animation effect
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedDoctor || !date || !time) {
//       toast.warning('Please fill all required fields');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(
//         `${BASE_URL}/api/appointments/book`,
//         { doctor: selectedDoctor, date, time, reason },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success('Appointment requested successfully!');
//       triggerPlusEffect(); // ➕ animate

//       // Reset form
//       setSelectedDoctor('');
//       setDate('');
//       setTime('');
//       setReason('');
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to book appointment');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
//       <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-xl">
//         <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
//           <span role="img" aria-label="calendar">📅</span> Book an Appointment
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Doctor Dropdown */}
//           <div>
//             <label className="block font-semibold mb-1">Select Doctor</label>
//             <select
//               value={selectedDoctor}
//               onChange={(e) => setSelectedDoctor(e.target.value)}
//               className="w-full border rounded px-3 py-2"
//               required
//             >
//               <option value="">-- Choose a Doctor --</option>
//               {doctors.map((doc) => (
//                 <option key={doc._id} value={doc._id}>
//                   {doc.name} ({doc.email})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Date Input */}
//           <div>
//             <label className="block font-semibold mb-1">Date</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>

//           {/* Time Input */}
//           <div>
//             <label className="block font-semibold mb-1">Time</label>
//             <input
//               type="time"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>

//           {/* Reason Input */}
//           <div>
//             <label className="block font-semibold mb-1">Reason (Optional)</label>
//             <textarea
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               className="w-full border rounded px-3 py-2"
//               placeholder="Optional notes for the doctor"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition"
//           >
//             Request Appointment
//           </button>
//         </form>
//       </div>

//       {/* View History Button */}
//       <div className="mt-6">
//         <button
//           onClick={() => navigate('/patient/history')}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition transform hover:scale-105 shadow"
//         >
//           📖 View Appointment History
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PatientAppointment;
