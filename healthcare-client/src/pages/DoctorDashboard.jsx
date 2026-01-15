// //pages/DoctorDashboard.jsx

// import React, { useState, useEffect } from 'react';
// import {
//   FaBars, FaUserMd, FaChartLine, FaBell, FaSignOutAlt, FaComments
// } from 'react-icons/fa';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell, Legend
// } from 'recharts';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import io from 'socket.io-client';
// import { toast } from 'react-toastify';

// const SOCKET_SERVER = 'http://localhost:5000';

// const sampleData = [
//   { name: 'Mon', patients: 5 },
//   { name: 'Tue', patients: 10 },
//   { name: 'Wed', patients: 6 },
//   { name: 'Thu', patients: 10 },
//   { name: 'Fri', patients: 7 },
// ];

// const DoctorDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [doctorName, setDoctorName] = useState('');
//   const [stats, setStats] = useState({ approved: 0, rejected: 0 });
//   const [patients, setPatients] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         setDoctorName(payload.name || 'Doctor');
//       } catch {
//         setDoctorName('Doctor');
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('/api/appointments/doctor/stats', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setStats(res.data);
//       } catch (err) {
//         console.error('Failed to fetch stats', err);
//       }
//     };
//     fetchStats();
//   }, []);

//   useEffect(() => {
//     const socket = io(SOCKET_SERVER, {
//       auth: { token: localStorage.getItem('token') }
//     });

//     socket.on('appointmentStatusUpdate', ({ status, patientName, date, time }) => {
//       toast.info(`📢 You ${status} an appointment for ${patientName} on ${date} at ${time}.`);
//     });

//     return () => socket.disconnect();
//   }, []);

// useEffect(() => {
//   const fetchPatients = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('/api/chat/patients/with-appointments', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setPatients(res.data);
//     } catch (err) {
//       console.error('❌ Error fetching patients with appointments', err);
//     }
//   };

//   fetchPatients();
// }, []);


//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/login';
//   };

//   return (
//     <div className="flex min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/medical-background.jpg')" }}>
//       {/* Sidebar */}
//       <div className={`fixed md:relative z-10 w-64 bg-white/70 backdrop-blur-md shadow-lg transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
//         <div className="p-6 border-b border-gray-300 text-2xl font-bold text-green-800">
//           Smart-Healthcare
//         </div>
//         <nav className="p-4 flex flex-col gap-4">
//           <button className="flex items-center gap-3 text-green-700 font-medium hover:bg-green-100 p-2 rounded-md transition">
//             <FaUserMd /> Profile
//           </button>
//           <button className="flex items-center gap-3 text-green-700 font-medium hover:bg-green-100 p-2 rounded-md transition">
//             <FaChartLine /> Analytics
//           </button>
//           <button className="flex items-center gap-3 text-green-700 font-medium hover:bg-green-100 p-2 rounded-md transition">
//             <FaBell /> Notifications
//           </button>
//           <button onClick={handleLogout} className="flex items-center gap-3 text-red-600 hover:bg-red-100 p-2 rounded-md transition mt-6">
//             <FaSignOutAlt /> Logout
//           </button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         <div className="md:hidden p-4 bg-white/80 backdrop-blur-md shadow-md flex items-center justify-between">
//           <h1 className="text-xl font-bold text-green-800">Smart-Healthcare</h1>
//           <button onClick={() => setSidebarOpen(!sidebarOpen)}>
//             <FaBars size={24} />
//           </button>
//         </div>

//         <div className="p-6 text-center">
//           <h2 className="text-2xl font-semibold text-green-900 mb-4">
//             Hello, <span className="text-green-700">{doctorName}</span>
//           </h2>

//           {/* Widgets Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Profile */}
//             <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg">
//               <img src="/doctor-avatar.png" alt="Doctor" className="w-24 h-24 mx-auto rounded-full border-4 border-green-500" />
//               <h3 className="text-xl font-bold mt-4">{doctorName}</h3>
//               <p className="text-gray-600">Cardiologist, 10+ years</p>
//               <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
//                 Edit Profile
//               </button>
//             </div>

//             {/* Weekly Visits Line Chart */}
//             <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg col-span-2">
//               <h3 className="text-lg font-semibold mb-2">Weekly Patient Visits</h3>
//               <ResponsiveContainer width="100%" height={200}>
//                 <LineChart data={sampleData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={3} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Appointment Stats */}
//             <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg col-span-3 text-left">
//               <h3 className="text-lg font-semibold mb-3">📊 Appointment Stats</h3>
//               <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//                 <div className="w-full md:w-1/2">
//                   <PieChart width={300} height={200}>
//                     <Pie
//                       data={[
//                         { name: 'Approved', value: stats.approved },
//                         { name: 'Rejected', value: stats.rejected }
//                       ]}
//                       cx="50%"
//                       cy="50%"
//                       outerRadius={70}
//                       dataKey="value"
//                       label
//                     >
//                       <Cell fill="#10b981" />
//                       <Cell fill="#ef4444" />
//                     </Pie>
//                     <Legend />
//                   </PieChart>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
//                   <div className="bg-green-100 p-4 rounded-md shadow text-center">
//                     <p className="text-green-800 font-bold text-lg">✅ Approved</p>
//                     <p className="text-2xl font-bold text-green-700">{stats.approved}</p>
//                   </div>
//                   <div className="bg-red-100 p-4 rounded-md shadow text-center">
//                     <p className="text-red-800 font-bold text-lg">❌ Rejected</p>
//                     <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 onClick={() => navigate('/doctor/pending-appointments')}
//                 className="mt-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//               >
//                 🔍 View Pending Requests
//               </button>
//             </div>

//             {/* 💬 Chat with Patients */}
//             <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg col-span-3">
//               <h3 className="text-lg font-semibold mb-2">💬 Chat with Patients</h3>

//               {patients.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {patients.map((patient) => (
//                     <div
//                       key={patient._id}
//                       className="flex items-center justify-between bg-gray-100 p-3 rounded shadow"
//                     >
//                       <div className="flex items-center gap-3">
//                         <img
//                           src="/default-avatar.png"
//                           alt="Patient"
//                           className="w-10 h-10 rounded-full"
//                         />
//                         <div>
//                           <p className="font-semibold text-green-800">
//                             {patient.name || patient.email}
//                           </p>
//                           <p className="text-sm text-gray-600">{patient.email}</p>
//                         </div>
//                       </div>
//                       <Link
//                         to={`/doctor/chat/${patient._id}`}
//                         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2"
//                       >
//                         <FaComments /> Chat
//                       </Link>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No patients with appointments available for chat.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;



//pages/DoctorDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  FaBars, FaUserMd, FaChartLine, FaBell, FaSignOutAlt, FaComments
} from 'react-icons/fa';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import { toast } from 'react-toastify';

// ✅ Use backend URL from .env or fallback to localhost
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// Set axios default baseURL
axios.defaults.baseURL = BACKEND_URL;

const sampleData = [
  { name: 'Mon', patients: 5 },
  { name: 'Tue', patients: 10 },
  { name: 'Wed', patients: 6 },
  { name: 'Thu', patients: 10 },
  { name: 'Fri', patients: 7 },
];

const DoctorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [doctorName, setDoctorName] = useState('');
  const [stats, setStats] = useState({ approved: 0, rejected: 0 });
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setDoctorName(payload.name || 'Doctor');
      } catch {
        setDoctorName('Doctor');
      }
    }
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/appointments/doctor/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const socket = io(BACKEND_URL, {
      auth: { token: localStorage.getItem('token') },
      transports: ["websocket"], // ✅ ensures stability on Render
    });

    socket.on('appointmentStatusUpdate', ({ status, patientName, date, time }) => {
      toast.info(`📢 You ${status} an appointment for ${patientName} on ${date} at ${time}.`);
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/chat/patients/with-appointments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPatients(res.data);
      } catch (err) {
        console.error('❌ Error fetching patients with appointments', err);
      }
    };

    fetchPatients();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/medical-background.jpg')" }}
    >
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-10 w-64 bg-white/70 backdrop-blur-md shadow-lg transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-300 text-2xl font-bold text-green-800">
          Smart-Healthcare
        </div>
        <nav className="p-4 flex flex-col gap-4">
          <button className="flex items-center gap-3 text-green-700 font-medium hover:bg-green-100 p-2 rounded-md transition">
            <FaUserMd /> Profile
          </button>
          <button className="flex items-center gap-3 text-green-700 font-medium hover:bg-green-100 p-2 rounded-md transition">
            <FaChartLine /> Analytics
          </button>
          <button className="flex items-center gap-3 text-green-700 font-medium hover:bg-green-100 p-2 rounded-md transition">
            <FaBell /> Notifications
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-600 hover:bg-red-100 p-2 rounded-md transition mt-6"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="md:hidden p-4 bg-white/80 backdrop-blur-md shadow-md flex items-center justify-between">
          <h1 className="text-xl font-bold text-green-800">Smart-Healthcare</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars size={24} />
          </button>
        </div>

        <div className="p-6 text-center">
          <h2 className="text-2xl font-semibold text-green-900 mb-4">
            Hello, <span className="text-green-700">{doctorName}</span>
          </h2>

          {/* Widgets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg">
              <img
                src="/doctor-avatar.png"
                alt="Doctor"
                className="w-24 h-24 mx-auto rounded-full border-4 border-green-500"
              />
              <h3 className="text-xl font-bold mt-4">{doctorName}</h3>
              <p className="text-gray-600">Cardiologist, 10+ years</p>
              <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                Edit Profile
              </button>
            </div>

            {/* Weekly Visits Line Chart */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg col-span-2">
              <h3 className="text-lg font-semibold mb-2">Weekly Patient Visits</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={sampleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Appointment Stats */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg col-span-3 text-left">
              <h3 className="text-lg font-semibold mb-3">📊 Appointment Stats</h3>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="w-full md:w-1/2">
                  <PieChart width={300} height={200}>
                    <Pie
                      data={[
                        { name: 'Approved', value: stats.approved },
                        { name: 'Rejected', value: stats.rejected }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      dataKey="value"
                      label
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#ef4444" />
                    </Pie>
                    <Legend />
                  </PieChart>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                  <div className="bg-green-100 p-4 rounded-md shadow text-center">
                    <p className="text-green-800 font-bold text-lg">✅ Approved</p>
                    <p className="text-2xl font-bold text-green-700">{stats.approved}</p>
                  </div>
                  <div className="bg-red-100 p-4 rounded-md shadow text-center">
                    <p className="text-red-800 font-bold text-lg">❌ Rejected</p>
                    <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/doctor/pending-appointments')}
                className="mt-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                🔍 View Pending Requests
              </button>
            </div>

            {/* 💬 Chat with Patients */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg col-span-3">
              <h3 className="text-lg font-semibold mb-2">💬 Chat with Patients</h3>

              {patients.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {patients.map((patient) => (
                    <div
                      key={patient._id}
                      className="flex items-center justify-between bg-gray-100 p-3 rounded shadow"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src="/default-avatar.png"
                          alt="Patient"
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-green-800">
                            {patient.name || patient.email}
                          </p>
                          <p className="text-sm text-gray-600">{patient.email}</p>
                        </div>
                      </div>
                      <Link
                        to={`/doctor/chat/${patient._id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2"
                      >
                        <FaComments /> Chat
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No patients with appointments available for chat.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
