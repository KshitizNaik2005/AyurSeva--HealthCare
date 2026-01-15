// // // pages/DoctorChatPage.jsx
// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import socket from '../socket';
// import axios from 'axios';
// import { FaPaperPlane } from 'react-icons/fa';

// const SOCKET_SERVER = 'http://localhost:5000';
// axios.defaults.baseURL = SOCKET_SERVER;

// const DoctorChatPage = () => {
//   const { patientId } = useParams();
//   const doctorId = localStorage.getItem('userId');
//   const token = localStorage.getItem('token');

//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [patientInfo, setPatientInfo] = useState(null);
//   const [online, setOnline] = useState(false);
//   const typingTimeoutRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   const roomId = `${patientId}_${doctorId}`;

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const res = await axios.get(`/api/users/${patientId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPatientInfo(res.data);
//     };

//     const fetchHistory = async () => {
//       const res = await axios.get(`/api/chat/history/${patientId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessages(res.data);
//     };

//     fetchUser();
//     fetchHistory();

//     socket.connect();
//     socket.emit('register', doctorId);
//     socket.emit('joinRoom', { doctorId, patientId });

//     socket.on('receiveMessage', (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     socket.on('showTyping', () => setIsTyping(true));
//     socket.on('hideTyping', () => setIsTyping(false));
//     socket.on('userOnlineStatus', ({ online }) => setOnline(online));

//     return () => {
//       socket.off('receiveMessage');
//       socket.off('showTyping');
//       socket.off('hideTyping');
//       socket.off('userOnlineStatus');
//     };
//   }, [doctorId, patientId, token]);

//   const sendMessage = () => {
//     const cleanMsg = messageInput.trim();
//     if (!cleanMsg) return;

//     const message = {
//       sender: doctorId,
//       receiver: patientId,
//       content: cleanMsg,
//       timestamp: new Date().toISOString(),
//     };

//     socket.emit('sendMessage', message);
//     setMessages((prev) => [...prev, { ...message, fromSelf: true }]);
//     setMessageInput('');
//     socket.emit('stopTyping', { roomId, userId: doctorId });
//   };

//   const handleTyping = () => {
//     socket.emit('typing', { roomId, userId: doctorId });

//     clearTimeout(typingTimeoutRef.current);
//     typingTimeoutRef.current = setTimeout(() => {
//       socket.emit('stopTyping', { roomId, userId: doctorId });
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-blue-50">
//       <div className="bg-blue-600 text-white px-6 py-4 text-xl font-semibold shadow flex justify-between">
//         <span>Chat with {patientInfo?.name || 'Patient'}</span>
//         <span className={`text-sm ${online ? 'text-green-300' : 'text-red-200'}`}>
//           {online ? '● Online' : '● Offline'}
//         </span>
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
//               msg.sender === doctorId
//                 ? 'bg-blue-500 text-white ml-auto'
//                 : 'bg-white text-black'
//             }`}
//           >
//             {msg.content}
//           </div>
//         ))}
//         {isTyping && (
//           <div className="ml-2 text-sm text-gray-500 animate-pulse">💬 Patient is typing...</div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="p-4 bg-white shadow-md flex">
//         <input
//           type="text"
//           className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
//           value={messageInput}
//           onChange={(e) => {
//             setMessageInput(e.target.value);
//             handleTyping();
//           }}
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 flex items-center gap-2"
//         >
//           <FaPaperPlane />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DoctorChatPage;




// pages/DoctorChatPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../socket';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
axios.defaults.baseURL = BACKEND_URL;

const DoctorChatPage = () => {
  const { patientId } = useParams();
  const doctorId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);
  const [online, setOnline] = useState(false);

  const typingTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);
  const roomId = `${patientId}_${doctorId}`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatientInfo(res.data);
    };

    const fetchHistory = async () => {
      const res = await axios.get(`/api/chat/history/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    };

    fetchUser();
    fetchHistory();

    socket.connect();
    socket.emit('register', doctorId);
    socket.emit('joinRoom', { doctorId, patientId });

    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('showTyping', () => setIsTyping(true));
    socket.on('hideTyping', () => setIsTyping(false));
    socket.on('userOnlineStatus', ({ online }) => setOnline(online));

    return () => {
      socket.off('receiveMessage');
      socket.off('showTyping');
      socket.off('hideTyping');
      socket.off('userOnlineStatus');
      socket.disconnect();
    };
  }, [doctorId, patientId, token]);

  const sendMessage = () => {
    const cleanMsg = messageInput.trim();
    if (!cleanMsg) return;

    const message = {
      sender: doctorId,
      receiver: patientId,
      content: cleanMsg,
      timestamp: new Date().toISOString(),
    };

    socket.emit('sendMessage', message);
    setMessages((prev) => [...prev, { ...message, fromSelf: true }]);
    setMessageInput('');
    socket.emit('stopTyping', { roomId, userId: doctorId });
  };

  const handleTyping = () => {
    socket.emit('typing', { roomId, userId: doctorId });

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stopTyping', { roomId, userId: doctorId });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <div className="bg-blue-600 text-white px-6 py-4 text-xl font-semibold shadow flex justify-between">
        <span>Chat with {patientInfo?.name || 'Patient'}</span>
        <span className={`text-sm ${online ? 'text-green-300' : 'text-red-200'}`}>
          {online ? '● Online' : '● Offline'}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
              msg.sender === doctorId
                ? 'bg-blue-500 text-white ml-auto'
                : 'bg-white text-black'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {isTyping && (
          <div className="ml-2 text-sm text-gray-500 animate-pulse">💬 Patient is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white shadow-md flex">
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
          value={messageInput}
          onChange={(e) => {
            setMessageInput(e.target.value);
            handleTyping();
          }}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default DoctorChatPage;
