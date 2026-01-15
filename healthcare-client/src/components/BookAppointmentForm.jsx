

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useNavigate } from 'react-router-dom';

// const BookAppointmentForm = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [availableDates, setAvailableDates] = useState([]);
//   const [calendarDate, setCalendarDate] = useState(null);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState('');
//   const [reason, setReason] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('/api/users/doctors', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setDoctors(res.data);
//       } catch (err) {
//         toast.error('Failed to load doctors');
//       }
//     };
//     fetchDoctors();
//   }, []);

//   useEffect(() => {
//     const fetchSlots = async () => {
//       if (!selectedDoctor) return;
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get(`http://localhost:5000/api/doctor/${selectedDoctor}/slots`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setAvailableDates(res.data.map(entry => entry.date));
//         setAvailableSlots([]);
//         setSelectedDate('');
//         setCalendarDate(null);
//       } catch (err) {
//         toast.error('Failed to load slots');
//       }
//     };
//     fetchSlots();
//   }, [selectedDoctor]);

//   useEffect(() => {
//     const fetchSlotsForDate = async () => {
//       if (!selectedDoctor || !selectedDate) return;
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get(`/api/doctor/${selectedDoctor}/slots`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const dateObj = res.data.find(d => d.date === selectedDate);
//         setAvailableSlots(dateObj ? dateObj.slots : []);
//       } catch (err) {
//         toast.error('Failed to get slots for date');
//       }
//     };
//     fetchSlotsForDate();
//   }, [selectedDate]);

//   // ✅ Floating + animation
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
//     if (!selectedDoctor || !selectedDate || !selectedSlot) {
//       return toast.error('Please fill all required fields');
//     }

//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       await axios.post('/api/appointments/book', {
//         doctor: selectedDoctor,
//         date: selectedDate,
//         time: selectedSlot,
//         reason
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       toast.success('Appointment booked successfully!');
//       triggerPlusEffect(); // 🎉 Show floating pluses

//       // Reset form
//       setSelectedDoctor('');
//       setAvailableDates([]);
//       setCalendarDate(null);
//       setSelectedDate('');
//       setAvailableSlots([]);
//       setSelectedSlot('');
//       setReason('');
//     } catch (err) {
//       toast.error('Booking failed');
//     } finally {
//       setLoading(false);
//     }
//   };


// // src/components/BookAppointmentForm.js
// import React, { useState, useEffect } from 'react';
// import api from '../utils/axios'; // ✅ import instance
// import { toast } from 'react-toastify';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useNavigate } from 'react-router-dom';

// const BookAppointmentForm = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [availableDates, setAvailableDates] = useState([]);
//   const [calendarDate, setCalendarDate] = useState(null);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState('');
//   const [reason, setReason] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await api.get('/api/users/doctors');
//         setDoctors(res.data);
//       } catch (err) {
//         toast.error('Failed to load doctors');
//       }
//     };
//     fetchDoctors();
//   }, []);

//   useEffect(() => {
//     const fetchSlots = async () => {
//       if (!selectedDoctor) return;
//       try {
//         const res = await api.get(`/api/doctor/${selectedDoctor}/slots`);
//         setAvailableDates(res.data.map(entry => entry.date));
//         setAvailableSlots([]);
//         setSelectedDate('');
//         setCalendarDate(null);
//       } catch (err) {
//         toast.error('Failed to load slots');
//       }
//     };
//     fetchSlots();
//   }, [selectedDoctor]);

//   useEffect(() => {
//     const fetchSlotsForDate = async () => {
//       if (!selectedDoctor || !selectedDate) return;
//       try {
//         const res = await api.get(`/api/doctor/${selectedDoctor}/slots`);
//         const dateObj = res.data.find(d => d.date === selectedDate);
//         setAvailableSlots(dateObj ? dateObj.slots : []);
//       } catch (err) {
//         toast.error('Failed to get slots for date');
//       }
//     };
//     fetchSlotsForDate();
//   }, [selectedDate, selectedDoctor]);

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
//     if (!selectedDoctor || !selectedDate || !selectedSlot) {
//       return toast.error('Please fill all required fields');
//     }

//     try {
//       setLoading(true);
//       await api.post('/api/appointments/book', {
//         doctor: selectedDoctor,
//         date: selectedDate,
//         time: selectedSlot,
//         reason,
//       });

//       toast.success('Appointment booked successfully!');
//       triggerPlusEffect();

//       // Reset form
//       setSelectedDoctor('');
//       setAvailableDates([]);
//       setCalendarDate(null);
//       setSelectedDate('');
//       setAvailableSlots([]);
//       setSelectedSlot('');
//       setReason('');
//     } catch (err) {
//       toast.error('Booking failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
//       style={{ backgroundImage: "url('/medical-background.jpg')" }}
//     >
//       <div className="w-full max-w-2xl bg-white/40 backdrop-blur-md p-8 rounded-xl shadow-xl animate-fade-in">
//         <h2 className="text-3xl font-bold text-green-800 text-center mb-6">
//           🗓️ Book an Appointment
//         </h2>

//         <form className="space-y-6" onSubmit={handleSubmit}>
//           {/* Doctor Selection */}
//           <div className="flex items-center gap-3">
//             <span className="text-green-700 text-xl">🩺</span>
//             <select
//               value={selectedDoctor}
//               onChange={(e) => setSelectedDoctor(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
//               required
//             >
//               <option value="">Select Doctor</option>
//               {doctors.map(doc => (
//                 <option key={doc._id} value={doc._id}>{doc.name}</option>
//               ))}
//             </select>
//           </div>

//           {/* Date Picker */}
//           <div className="flex items-center gap-3">
//             <span className="text-green-700 text-xl">📅</span>
//             <DatePicker
//               selected={calendarDate}
//               onChange={(date) => {
//                 setCalendarDate(date);
//                 const formattedDate = date?.toISOString().split('T')[0];
//                 setSelectedDate(formattedDate);
//               }}
//               className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
//               placeholderText="Pick an available date"
//               dateFormat="yyyy-MM-dd"
//               includeDates={availableDates.map(date => new Date(date))}
//             />
//           </div>

//           {/* Time Slot Selection */}
//           <div className="flex items-center gap-3">
//             <span className="text-green-700 text-xl">⏰</span>
//             <select
//               value={selectedSlot}
//               onChange={(e) => setSelectedSlot(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
//               required
//             >
//               <option value="">Select Time Slot</option>
//               {availableSlots.map((slot, idx) => (
//                 <option key={idx} value={slot}>{slot}</option>
//               ))}
//             </select>
//           </div>

//           {/* Reason */}
//           <div className="flex items-start gap-3">
//             <span className="text-green-700 text-xl mt-2">📝</span>
//             <textarea
//               placeholder="Reason for appointment (optional)"
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
//               rows={3}
//             ></textarea>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-md transition transform hover:scale-[1.02] shadow-md"
//           >
//             {loading ? "⏳ Booking..." : "✅ Confirm Appointment"}
//           </button>
//         </form>

//         {/* View History Button */}
//         <div className="mt-6 text-center">
//           <button
//             onClick={() => navigate('/patient/history')}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition transform hover:scale-105 shadow"
//           >
//             📖 View Appointment History
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookAppointmentForm;











// src/components/BookAppointmentForm.js
import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const BookAppointmentForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [calendarDate, setCalendarDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get('/api/users/doctors');
        setDoctors(res.data);
      } catch (err) {
        toast.error('Failed to load doctors');
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDoctor) return;
      try {
        const res = await api.get(`/api/doctor/${selectedDoctor}/slots`);
        setAvailableDates(res.data.map(entry => entry.date));
        setAvailableSlots([]);
        setSelectedDate('');
        setCalendarDate(null);
      } catch (err) {
        toast.error('Failed to load slots');
      }
    };
    fetchSlots();
  }, [selectedDoctor]);

  useEffect(() => {
    const fetchSlotsForDate = async () => {
      if (!selectedDoctor || !selectedDate) return;
      try {
        const res = await api.get(`/api/doctor/${selectedDoctor}/slots`);
        const dateObj = res.data.find(d => d.date === selectedDate);
        setAvailableSlots(dateObj ? dateObj.slots : []);
      } catch (err) {
        toast.error('Failed to get slots for date');
      }
    };
    fetchSlotsForDate();
  }, [selectedDate, selectedDoctor]);

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
    if (!selectedDoctor || !selectedDate || !selectedSlot) {
      return toast.error('Please fill all required fields');
    }

    try {
      setLoading(true);
      await api.post('/api/appointments/book', {
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedSlot,
        reason,
      });

      toast.success('Appointment booked successfully!');
      triggerPlusEffect();

      setSelectedDoctor('');
      setAvailableDates([]);
      setCalendarDate(null);
      setSelectedDate('');
      setAvailableSlots([]);
      setSelectedSlot('');
      setReason('');
    } catch (err) {
      toast.error('Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative bg-gray-100">
      {/* White Card with Dark Inputs */}
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-2xl relative z-10 text-gray-900">
        <h2 className="text-3xl font-bold text-center mb-6">
          🗓️ Book an Appointment
        </h2>

        <form className="space-y-6 font-medium" onSubmit={handleSubmit}>
          {/* Doctor Selection */}
          <div className="flex items-center gap-3">
            <span className="text-xl">🩺</span>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-md bg-gray-800 text-white shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 appearance-none"
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map(doc => (
                <option key={doc._id} value={doc._id}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div className="flex items-center gap-3">
            <span className="text-xl">📅</span>
            <DatePicker
              selected={calendarDate}
              onChange={(date) => {
                setCalendarDate(date);
                const formattedDate = date?.toISOString().split('T')[0];
                setSelectedDate(formattedDate);
              }}
              className="w-full px-4 py-2 border border-gray-400 rounded-md bg-gray-800 text-white shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              placeholderText="Pick an available date"
              dateFormat="yyyy-MM-dd"
              includeDates={availableDates.map(date => new Date(date))}
            />
          </div>

          {/* Time Slot */}
          <div className="flex items-center gap-3">
            <span className="text-xl">⏰</span>
            <select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-md bg-gray-800 text-white shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 appearance-none"
              required
            >
              <option value="">Select Time Slot</option>
              {availableSlots.map((slot, idx) => (
                <option key={idx} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* Reason */}
          <div className="flex items-start gap-3">
            <span className="text-xl mt-2">📝</span>
            <textarea
              placeholder="Reason for appointment (optional)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-md bg-gray-800 text-white shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              rows={3}
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 rounded-md shadow-lg transition"
          >
            {loading ? "⏳ Booking..." : "✅ Confirm Appointment"}
          </button>
        </form>

        {/* View History */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/patient/history')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition"
          >
            📖 View Appointment History
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentForm;
