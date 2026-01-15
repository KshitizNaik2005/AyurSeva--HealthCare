// // src/socket.js
// import { io } from 'socket.io-client';

// const SOCKET_SERVER = 'http://localhost:5000'; // ✅ backend URL

// const socket = io(SOCKET_SERVER, {
//   auth: {
//     token: localStorage.getItem('token')
//   },
//   autoConnect: false, // optional, improves control
// });

// export default socket;



// src/socket.js
import { io } from 'socket.io-client';

// Use Render backend when deployed, localhost for local testing
const SOCKET_SERVER =
  process.env.NODE_ENV === "production"
    ? "https://smartcare-6j9f.onrender.com" // your Render backend
    : "http://localhost:5000"; // local dev

const socket = io(SOCKET_SERVER, {
  auth: {
    token: localStorage.getItem("token"),
  },
  autoConnect: false,
});

export default socket;
