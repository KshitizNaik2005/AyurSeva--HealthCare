import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatBox from '../components/chat/ChatBox';

const ChatPage = () => {
  const { recipientId } = useParams(); // Doctor's ID
  const navigate = useNavigate();

  const loggedInUserId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  console.log("🧾 Logged-in user:", loggedInUserId);
  console.log("💬 Chatting with doctor ID:", recipientId);

  if (!recipientId || !loggedInUserId || !token) {
    return (
      <div className="text-center text-red-500 p-10">
        ❌ Unauthorized or missing information.
        <br />
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate('/login')}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', background: '#f0f4f8', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center' }}>💬 Chat</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ChatBox
          userId={loggedInUserId}
          recipientId={recipientId}
          token={token}
        />
      </div>
    </div>
  );
};

export default ChatPage;
