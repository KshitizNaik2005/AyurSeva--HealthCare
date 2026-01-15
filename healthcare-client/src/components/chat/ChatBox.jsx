
import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const SOCKET_SERVER = 'http://localhost:5000';

const ChatBox = ({ receiverId, receiverName }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`/api/chat/history/${receiverId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch history', err);
      }
    };

    fetchHistory();

    const newSocket = io(SOCKET_SERVER, {
      auth: { token }
    });

    newSocket.emit('joinRoom', { doctorId: userId, patientId: receiverId });

    newSocket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [receiverId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg = {
      sender: userId,
      receiver: receiverId,
      content: input.trim(),
    };
    socket.emit('sendMessage', msg);
    setMessages((prev) => [...prev, { ...msg, fromSelf: true }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-blue-50">
      <div className="bg-blue-600 text-white px-6 py-4 text-xl font-semibold">
        Chat with {receiverName}
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xs px-4 py-2 rounded shadow ${
              msg.sender === userId ? 'ml-auto bg-blue-500 text-white' : 'bg-white text-black'
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white shadow-md flex">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
