// // // pages/PatientChatPage.jsx

// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import socket from '../socket';
// import axios from 'axios';
// import { FaPaperPlane } from 'react-icons/fa';

// const SOCKET_SERVER = 'http://localhost:5000';
// axios.defaults.baseURL = SOCKET_SERVER;

// const PatientChatPage = () => {
//   const { doctorId } = useParams();
//   const patientId = localStorage.getItem('userId');
//   const token = localStorage.getItem('token');

//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState('');
//   const [doctorInfo, setDoctorInfo] = useState(null);
//   const [isTyping, setIsTyping] = useState(false);
//   const [online, setOnline] = useState(false);
//   const messagesEndRef = useRef(null);
//   const typingTimeoutRef = useRef(null);

//   const roomId = `${patientId}_${doctorId}`;

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(scrollToBottom, [messages]);

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         const res = await axios.get(`/api/users/${doctorId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setDoctorInfo(res.data);
//       } catch (err) {
//         console.error('❌ Failed to fetch doctor info:', err);
//       }
//     };

//     const fetchHistory = async () => {
//       try {
//         const res = await axios.get(`/api/chat/history/${doctorId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setMessages(res.data);
//       } catch (err) {
//         console.error('❌ Failed to fetch chat history:', err);
//       }
//     };

//     fetchDoctor();
//     fetchHistory();

//     socket.connect();
//     socket.emit('register', patientId);
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
//     const cleanMessage = (messageInput || '').trim();
//     if (!cleanMessage) return;

//     const messageData = {
//       sender: patientId,
//       receiver: doctorId,
//       content: cleanMessage,
//       timestamp: new Date().toISOString(),
//     };

//     socket.emit('sendMessage', messageData);
//     setMessages((prev) => [...prev, { ...messageData, fromSelf: true }]);
//     setMessageInput('');
//     socket.emit('stopTyping', { roomId, userId: patientId });
//   };

//   const handleTyping = () => {
//     socket.emit('typing', { roomId, userId: patientId });

//     clearTimeout(typingTimeoutRef.current);
//     typingTimeoutRef.current = setTimeout(() => {
//       socket.emit('stopTyping', { roomId, userId: patientId });
//     }, 1500);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') sendMessage();
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-green-50">
//       <div className="bg-green-600 text-white px-6 py-4 text-xl font-semibold shadow flex justify-between">
//         <span>Chat with {doctorInfo ? doctorInfo.name : 'Doctor'}</span>
//         <span className={`text-sm ${online ? 'text-lime-200' : 'text-red-300'}`}>
//           {online ? '● Online' : '● Offline'}
//         </span>
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {messages.map((msg, idx) => {
//           const fromSelf = msg.sender === patientId;
//           return (
//             <div
//               key={idx}
//               className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
//                 fromSelf
//                   ? 'bg-green-500 text-white ml-auto'
//                   : 'bg-white text-black'
//               }`}
//             >
//               {msg.content}
//             </div>
//           );
//         })}
//         {isTyping && (
//           <div className="ml-2 text-sm text-gray-500 animate-pulse">💬 Doctor is typing...</div>
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
//           onKeyPress={handleKeyPress}
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-green-600 text-white px-6 py-2 rounded-r-lg hover:bg-green-700 flex items-center gap-2"
//         >
//           <FaPaperPlane />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PatientChatPage;



// pages/PatientChatPage.jsx

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../socket';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';

// ✅ Use env variable (fallback to localhost for dev)
const SOCKET_SERVER = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
axios.defaults.baseURL = SOCKET_SERVER;

const PatientChatPage = () => {
  const { doctorId } = useParams();
  const patientId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [online, setOnline] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const roomId = `${patientId}_${doctorId}`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`/api/users/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctorInfo(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch doctor info:', err);
      }
    };

    const fetchHistory = async () => {
      try {
        const res = await axios.get(`/api/chat/history/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch chat history:', err);
      }
    };

    fetchDoctor();
    fetchHistory();

    // ✅ Connect socket dynamically
    socket.io.opts.extraHeaders = { Authorization: `Bearer ${token}` };
    socket.io.uri = SOCKET_SERVER;
    socket.connect();

    socket.emit('register', patientId);
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
    const cleanMessage = (messageInput || '').trim();
    if (!cleanMessage) return;

    const messageData = {
      sender: patientId,
      receiver: doctorId,
      content: cleanMessage,
      timestamp: new Date().toISOString(),
    };

    socket.emit('sendMessage', messageData);
    setMessages((prev) => [...prev, { ...messageData, fromSelf: true }]);
    setMessageInput('');
    socket.emit('stopTyping', { roomId, userId: patientId });
  };

  const handleTyping = () => {
    socket.emit('typing', { roomId, userId: patientId });

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stopTyping', { roomId, userId: patientId });
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <div className="bg-green-600 text-white px-6 py-4 text-xl font-semibold shadow flex justify-between">
        <span>Chat with {doctorInfo ? doctorInfo.name : 'Doctor'}</span>
        <span className={`text-sm ${online ? 'text-lime-200' : 'text-red-300'}`}>
          {online ? '● Online' : '● Offline'}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => {
          const fromSelf = msg.sender === patientId;
          return (
            <div
              key={idx}
              className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
                fromSelf
                  ? 'bg-green-500 text-white ml-auto'
                  : 'bg-white text-black'
              }`}
            >
              {msg.content}
            </div>
          );
        })}
        {isTyping && (
          <div className="ml-2 text-sm text-gray-500 animate-pulse">💬 Doctor is typing...</div>
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
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-6 py-2 rounded-r-lg hover:bg-green-700 flex items-center gap-2"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default PatientChatPage;
