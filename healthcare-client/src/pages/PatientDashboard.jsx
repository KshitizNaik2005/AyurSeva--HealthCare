
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   FaBars, FaCalendarCheck, FaUserMd, FaFilePrescription,
//   FaBrain, FaHeartbeat, FaComments, FaSignOutAlt, FaUserCircle, FaBell
// } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import axios from '../utils/axios'; // Adjust if needed
// import io from 'socket.io-client';

// const SOCKET_SERVER = 'http://localhost:5000';

// const PatientDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctorId, setSelectedDoctorId] = useState('');
//   const navigate = useNavigate();

//   const patientName = "Oshan Khati";

//   useEffect(() => {
//     const socket = io(SOCKET_SERVER, {
//       auth: { token: localStorage.getItem('token') }
//     });

//     socket.on('appointmentStatusUpdate', ({ status, doctorName, date, time }) => {
//       toast.info(`📢 Your appointment with Dr. ${doctorName} on ${date} at ${time} was ${status}.`);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) return toast.error("🔒 Not logged in");

//         const res = await axios.get('/api/users/doctors', {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         setDoctors(res.data);
//         if (res.data.length > 0) setSelectedDoctorId(res.data[0]._id);
//       } catch (err) {
//         console.error("❌ Error fetching doctors:", err);
//         toast.error("Failed to load doctors");
//       }
//     };

//     fetchDoctors();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/login';
//   };

//   const handleDiseasePrediction = () => navigate('/dashboard/patient/predict');
//   const handleBookAppointment = () => navigate('/patient/book-appointment');
//   const handleViewAppointments = () => navigate('/patient/appointments');

//   const handleChat = () => {
//     if (selectedDoctorId) {
//       localStorage.setItem('lastChatReceiver', selectedDoctorId); // ✅ Save for auto-join
//       navigate(`/patient/chat/${selectedDoctorId}`);
//     } else {
//       toast.error("Please select a doctor");
//     }
//   };











// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   FaBars, FaCalendarCheck, FaUserMd, FaFilePrescription,
//   FaBrain, FaHeartbeat, FaComments, FaSignOutAlt, FaUserCircle, FaBell
// } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import axios from '../utils/axios'; // ✅ already configured axios
// import io from 'socket.io-client';

// // ✅ Use env backend URL with fallback
// const SOCKET_SERVER = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// const PatientDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctorId, setSelectedDoctorId] = useState('');
//   const navigate = useNavigate();

//   const patientName = "Oshan Khati";

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     // ✅ connect socket dynamically
//     const socket = io(SOCKET_SERVER, {
//       auth: { token }
//     });

//     socket.on('appointmentStatusUpdate', ({ status, doctorName, date, time }) => {
//       toast.info(`📢 Your appointment with Dr. ${doctorName} on ${date} at ${time} was ${status}.`);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) return toast.error("🔒 Not logged in");

//         const res = await axios.get('/api/users/doctors', {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         setDoctors(res.data);
//         if (res.data.length > 0) setSelectedDoctorId(res.data[0]._id);
//       } catch (err) {
//         console.error("❌ Error fetching doctors:", err);
//         toast.error("Failed to load doctors");
//       }
//     };

//     fetchDoctors();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/login';
//   };

//   const handleDiseasePrediction = () => navigate('/dashboard/patient/predict');
//   const handleBookAppointment = () => navigate('/patient/book-appointment');
//   const handleViewAppointments = () => navigate('/patient/appointments');

//   const handleChat = () => {
//     if (selectedDoctorId) {
//       localStorage.setItem('lastChatReceiver', selectedDoctorId); // ✅ Save for auto-join
//       navigate(`/patient/chat/${selectedDoctorId}`);
//     } else {
//       toast.error("Please select a doctor");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/medical-background.jpg')" }}>
//       <div className="absolute inset-0 bg-white/60 backdrop-brightness-110 z-0" />
//       <div className="relative z-10 flex min-h-screen">
//         {/* Sidebar */}
//         <div className={`fixed md:relative z-10 w-64 bg-white/70 backdrop-blur-md shadow-md transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
//           <div className="p-6 border-b border-gray-200 text-2xl font-bold text-green-800">
//             Smart-Healthcare
//           </div>
//           <nav className="p-4 flex flex-col gap-4">
//             <button onClick={handleViewAppointments} className="flex items-center gap-3 text-green-700 font-medium hover:bg-green-100 p-2 rounded-md transition">
//               <FaCalendarCheck /> My Appointments
//             </button>
//             <button className="flex items-center gap-3 text-green-700 font-medium hover:bg-green-100 p-2 rounded-md transition">
//               <FaUserMd /> Doctor Info
//             </button>
//             <button className="flex items-center gap-3 text-green-700 font-medium hover:bg-green-100 p-2 rounded-md transition">
//               <FaFilePrescription /> Prescriptions
//             </button>
//             <button onClick={handleDiseasePrediction} className="flex items-center gap-3 text-green-700 font-medium hover:bg-green-100 p-2 rounded-md transition">
//               <FaBrain /> AI Disease Prediction
//             </button>
//             <button className="flex items-center gap-3 text-green-700 font-medium hover:bg-green-100 p-2 rounded-md transition">
//               <FaHeartbeat /> Symptom Checker
//             </button>
//             <button onClick={handleChat} className="flex items-center gap-3 text-green-700 font-medium hover:bg-green-100 p-2 rounded-md transition">
//               <FaComments /> Live Chat
//             </button>
//             <button onClick={handleLogout} className="flex items-center gap-3 text-red-600 hover:bg-red-100 p-2 rounded-md transition mt-6">
//               <FaSignOutAlt /> Logout
//             </button>
//           </nav>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col">
//           <div className="p-4 bg-white/90 shadow-md flex items-center justify-between">
//             <h1 className="text-xl font-bold text-green-800 hidden md:block">Smart-Healthcare</h1>
//             <div className="flex items-center gap-4">
//               <FaBell className="text-green-800" size={20} />
//               <span className="text-green-900 font-semibold">Hello, {patientName}</span>
//               <FaUserCircle className="text-green-800" size={28} />
//               <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
//                 <FaBars size={24} />
//               </button>
//             </div>
//           </div>

//           <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-lg font-semibold mb-2">Upcoming Appointment</h2>
//               <p>Dr. A. Sharma - 20 July, 10:30 AM</p>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-lg font-semibold mb-2">Doctor Information</h2>
//               <p>Dr. A. Sharma, Cardiologist</p>
//               <p>Contact: 9876543210</p>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-lg font-semibold mb-2">Prescriptions</h2>
//               <p>Last prescription: 5 July 2025</p>
//               <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
//                 View Records
//               </button>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-lg font-semibold mb-4">AI Disease Prediction</h2>
//               <button onClick={handleDiseasePrediction} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full">
//                 Predict Now
//               </button>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-lg font-semibold mb-4">Live Consultation</h2>
//               <label htmlFor="doctorSelect" className="block mb-1 text-gray-700">Select Doctor</label>
//               <select
//                 id="doctorSelect"
//                 value={selectedDoctorId}
//                 onChange={(e) => setSelectedDoctorId(e.target.value)}
//                 className="w-full mb-3 px-3 py-2 border border-blue-500 rounded"
//               >
//                 {doctors.length === 0 ? (
//                   <option value="">No doctors found</option>
//                 ) : (
//                   doctors.map((doc) => (
//                     <option key={doc._id} value={doc._id}>
//                       Dr. {doc.name} ({doc.specialization || 'General'})
//                     </option>
//                   ))
//                 )}
//               </select>
//               <button
//                 onClick={handleChat}
//                 disabled={!selectedDoctorId}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
//               >
//                 Chat with Doctor
//               </button>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-lg font-semibold mb-2">Health Stats</h2>
//               <p>BP: 120/80 mmHg</p>
//               <p>Heart Rate: 72 bpm</p>
//               <p>Oxygen Level: 98%</p>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-lg font-semibold mb-2">Profile</h2>
//               <p>Name: {patientName}</p>
//               <p>Email: oshan@example.com</p>
//               <p>Age: 25</p>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-lg font-semibold mb-2">Notifications</h2>
//               <ul className="list-disc list-inside text-sm text-gray-800">
//                 <li>New prescription uploaded</li>
//                 <li>Reminder: Appointment tomorrow</li>
//               </ul>
//             </div>
//           </div>

//           {/* Book Appointment CTA */}
//           <div className="flex justify-center mt-6 mb-10 px-6">
//             <button
//               onClick={handleBookAppointment}
//               className="animate-pulseGlow bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition text-lg font-semibold"
//             >
//               Book an Appointment with Your Doctor
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDashboard;









import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBars, FaCalendarCheck, FaUserMd, FaFilePrescription,
  FaBrain, FaHeartbeat, FaComments, FaSignOutAlt, FaUserCircle, FaBell
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from '../utils/axios';
import io from 'socket.io-client';

const SOCKET_SERVER = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const PatientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const navigate = useNavigate();

  const patientName = "Oshan Khati";

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const socket = io(SOCKET_SERVER, { auth: { token } });

    socket.on('appointmentStatusUpdate', ({ status, doctorName, date, time }) => {
      toast.info(`📢 Your appointment with Dr. ${doctorName} on ${date} at ${time} was ${status}.`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return toast.error("🔒 Not logged in");

        const res = await axios.get('/api/users/doctors', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setDoctors(res.data);
        if (res.data.length > 0) setSelectedDoctorId(res.data[0]._id);
      } catch (err) {
        console.error("❌ Error fetching doctors:", err);
        toast.error("Failed to load doctors");
      }
    };

    fetchDoctors();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleDiseasePrediction = () => navigate('/dashboard/patient/predict');
  const handleBookAppointment = () => navigate('/patient/book-appointment');
  const handleViewAppointments = () => navigate('/patient/appointments');

  const handleChat = () => {
    if (selectedDoctorId) {
      localStorage.setItem('lastChatReceiver', selectedDoctorId);
      navigate(`/patient/chat/${selectedDoctorId}`);
    } else {
      toast.error("Please select a doctor");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/medical-background.jpg')" }}>
      {/* Stronger overlay for readability */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0" />

      <div className="relative z-10 flex min-h-screen text-gray-900">
        {/* Sidebar */}
        <div className={`fixed md:relative z-10 w-64 bg-white/80 backdrop-blur-md shadow-md transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className="p-6 border-b border-gray-200 text-2xl font-bold text-green-900">
            Smart-Healthcare
          </div>
          <nav className="p-4 flex flex-col gap-4">
            <button onClick={handleViewAppointments} className="flex items-center gap-3 text-green-900 font-medium hover:bg-green-100 p-2 rounded-md transition">
              <FaCalendarCheck /> My Appointments
            </button>
            <button className="flex items-center gap-3 text-green-900 font-medium hover:bg-green-100 p-2 rounded-md transition">
              <FaUserMd /> Doctor Info
            </button>
            <button className="flex items-center gap-3 text-green-900 font-medium hover:bg-green-100 p-2 rounded-md transition">
              <FaFilePrescription /> Prescriptions
            </button>
            <button onClick={handleDiseasePrediction} className="flex items-center gap-3 text-green-900 font-medium hover:bg-green-100 p-2 rounded-md transition">
              <FaBrain /> AI Disease Prediction
            </button>
            <button className="flex items-center gap-3 text-green-900 font-medium hover:bg-green-100 p-2 rounded-md transition">
              <FaHeartbeat /> Symptom Checker
            </button>
            <button onClick={handleChat} className="flex items-center gap-3 text-green-900 font-medium hover:bg-green-100 p-2 rounded-md transition">
              <FaComments /> Live Chat
            </button>
            <button onClick={handleLogout} className="flex items-center gap-3 text-red-600 hover:bg-red-100 p-2 rounded-md transition mt-6">
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 bg-white/90 shadow-md flex items-center justify-between">
            <h1 className="text-xl font-bold text-green-900 hidden md:block">Smart-Healthcare</h1>
            <div className="flex items-center gap-4">
              <FaBell className="text-green-900" size={20} />
              <span className="text-green-900 font-semibold">Hello, {patientName}</span>
              <FaUserCircle className="text-green-900" size={28} />
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
                <FaBars size={24} />
              </button>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {[
              { title: "Upcoming Appointment", content: <p>Dr. A. Sharma - 20 July, 10:30 AM</p> },
              { title: "Doctor Information", content: <><p>Dr. A. Sharma, Cardiologist</p><p>Contact: 9876543210</p></> },
              { title: "Prescriptions", content: <><p>Last prescription: 5 July 2025</p><button className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">View Records</button></> },
              { title: "AI Disease Prediction", content: <button onClick={handleDiseasePrediction} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full">Predict Now</button> },
              {
                title: "Live Consultation", content: <>
                  <label htmlFor="doctorSelect" className="block mb-1 text-gray-800">Select Doctor</label>
                  <select
                    id="doctorSelect"
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    className="w-full mb-3 px-3 py-2 border border-blue-500 rounded text-gray-900"
                  >
                    {doctors.length === 0 ? (
                      <option value="">No doctors found</option>
                    ) : (
                      doctors.map((doc) => (
                        <option key={doc._id} value={doc._id}>
                          Dr. {doc.name} ({doc.specialization || 'General'})
                        </option>
                      ))
                    )}
                  </select>
                  <button
                    onClick={handleChat}
                    disabled={!selectedDoctorId}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
                  >
                    Chat with Doctor
                  </button>
                </>
              },
              { title: "Health Stats", content: <><p>BP: 120/80 mmHg</p><p>Heart Rate: 72 bpm</p><p>Oxygen Level: 98%</p></> },
              { title: "Profile", content: <><p>Name: {patientName}</p><p>Email: oshan@example.com</p><p>Age: 25</p></> },
              { title: "Notifications", content: <ul className="list-disc list-inside text-sm text-gray-800"><li>New prescription uploaded</li><li>Reminder: Appointment tomorrow</li></ul> }
            ].map((card, idx) => (
              <div key={idx} className="bg-white/90 p-6 rounded-lg shadow-md text-gray-900">
                <h2 className="text-lg font-bold text-green-900 mb-2">{card.title}</h2>
                {card.content}
              </div>
            ))}
          </div>

          {/* Book Appointment CTA */}
          <div className="flex justify-center mt-6 mb-10 px-6">
            <button
              onClick={handleBookAppointment}
              className="animate-pulseGlow bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition text-lg font-semibold"
            >
              Book an Appointment with Your Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
