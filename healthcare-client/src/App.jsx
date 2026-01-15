
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import LandingPage from "./pages/LandingPage";
// import Login from './pages/Login';
// import Register from './pages/Register';
// import DoctorDashboard from './pages/DoctorDashboard';
// import PatientDashboard from './pages/PatientDashboard';
// import ProtectedRoute from './components/ProtectedRoute';
// import Unauthorized from './pages/Unauthorized';
// import AIDiseasePredictionForm from './pages/AIDiseasePredictionForm';
// import DoctorSetSlots from './pages/DoctorSetSlots';
// import BookAppointmentForm from './components/BookAppointmentForm';
// import DoctorPendingAppointments from './pages/DoctorPendingAppointments';
// import PatientAppointments from './pages/PatientAppointments';
// import DoctorAppointmentHistory from './pages/DoctorAppointmentHistory';
// import PatientAppointmentHistory from './pages/PatientAppointmentHistory';
// import ChatPage from './pages/ChatPage';
// import SelectDoctorChat from './pages/SelectDoctorChat';
// import DoctorChatPage from './pages/DoctorChatPage';
// import PatientChatPage from './pages/PatientChatPage';

// import './App.css';

// function App() {
//   return (
//     <Router>
//       {/* Toast notifications */}
//       <ToastContainer position="top-center" autoClose={3000} theme="colored" />

//       <Routes>
//         {/* 🌐 Public Routes */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/unauthorized" element={<Unauthorized />} />
//         <Route path="/doctor/history" element={<DoctorAppointmentHistory />} />
//         <Route path="/patient/history" element={<PatientAppointmentHistory />} />
//         {/* <Route path="/patient/chat/:doctorId" element={<ChatPage />} /> */}

//         <Route
//           path="/patient/chat/:recipientId"
//           element={
//             <ProtectedRoute allowedRole="patient">
//               <ChatPage />
//             </ProtectedRoute>
//           }
//         />


//         <Route
//   path="/doctor/chat/:patientId"
//   element={
//     <ProtectedRoute allowedRole="doctor">
//       <DoctorChatPage />
//     </ProtectedRoute>
//   }
// />

// <Route path="/patient/chat/:doctorId" element={<PatientChatPage />} />


        
//         <Route path="/patient/select-doctor" element={<SelectDoctorChat />} />

        

//         {/* 👨‍⚕️ Doctor Routes (Protected) */}
//         <Route
//           path="/doctor-dashboard"
//           element={
//             <ProtectedRoute allowedRole="doctor">
//               <DoctorDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/doctor/slots"
//           element={
//             <ProtectedRoute allowedRole="doctor">
//               <DoctorSetSlots />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/doctor/pending-appointments"
//           element={
//             <ProtectedRoute allowedRole="doctor">
//               <DoctorPendingAppointments />
//             </ProtectedRoute>
//           }
//         />

//         {/* 🧑‍⚕️ Patient Routes (Protected) */}
//         <Route
//           path="/patient-dashboard"
//           element={
//             <ProtectedRoute allowedRole="patient">
//               <PatientDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/patient/predict"
//           element={
//             <ProtectedRoute allowedRole="patient">
//               <AIDiseasePredictionForm />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/book-appointment"
//           element={
//             <ProtectedRoute allowedRole="patient">
//               <BookAppointmentForm />
//             </ProtectedRoute>
//           }
//         />
        
//         <Route
//           path="/patient/book-appointment"
//           element={
//             <ProtectedRoute allowedRole="patient">
//               <PatientAppointments />
//             </ProtectedRoute>
//           }
//         />
        
        
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SplashScreen from "./components/SplashScreen";
//import LandingPage from "./pages/LandingPage";
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import AIDiseasePredictionForm from './pages/AIDiseasePredictionForm';
import DoctorSetSlots from './pages/DoctorSetSlots';
import BookAppointmentForm from './components/BookAppointmentForm';
import DoctorPendingAppointments from './pages/DoctorPendingAppointments';
import PatientAppointments from './pages/PatientAppointments';
import DoctorAppointmentHistory from './pages/DoctorAppointmentHistory';
import PatientAppointmentHistory from './pages/PatientAppointmentHistory';
import SelectDoctorChat from './pages/SelectDoctorChat';
import DoctorChatPage from './pages/DoctorChatPage';
import PatientChatPage from './pages/PatientChatPage';
import Land from './components/LandingPage/Land';

import './App.css';

function App() {
  return (
    
    <Router>
      {/* ✅ Toast notifications */}
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />

      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/landing" element={<Land />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/doctor/history" element={<DoctorAppointmentHistory />} />
        <Route path="/patient/history" element={<PatientAppointmentHistory />} />

        {/* 🧑‍⚕️ Patient Routes (Protected) */}
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute allowedRole="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/patient/predict"
          element={
            <ProtectedRoute allowedRole="patient">
              <AIDiseasePredictionForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-appointment"
          element={
            <ProtectedRoute allowedRole="patient">
              <BookAppointmentForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/book-appointment"
          element={
            <ProtectedRoute allowedRole="patient">
              <PatientAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/select-doctor"
          element={<SelectDoctorChat />}
        />
        <Route
          path="/patient/chat/:doctorId"
          element={
            <ProtectedRoute allowedRole="patient">
              <PatientChatPage />
            </ProtectedRoute>
          }
        />

        {/* 👨‍⚕️ Doctor Routes (Protected) */}
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/slots"
          element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorSetSlots />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/pending-appointments"
          element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorPendingAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/chat/:patientId"
          element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorChatPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
