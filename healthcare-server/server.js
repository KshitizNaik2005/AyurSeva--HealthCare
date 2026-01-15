// // server.js

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const http = require('http');
// const socketIO = require('socket.io');
// require('dotenv').config();

// const authRoutes = require('./routes/auth');
// const dashboardRoutes = require('./routes/dashboard');
// const doctorRoutes = require('./routes/doctor');
// const appointmentRoutes = require('./routes/appointments');
// const userRoutes = require('./routes/users');
// const messageRoutes = require('./routes/messages');
// const chatRoutes = require('./routes/chat');
// const Message = require('./models/Message');

// const app = express();
// const server = http.createServer(app);

// // app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
// // app.use(express.json());

// // const io = socketIO(server, {
// //   cors: {
// //     origin: ['http://localhost:3000'],
// //     methods: ['GET', 'POST'],
// //     credentials: true
// //   }
// // });

// // ✅ Middleware
// app.use(express.json()); // parse JSON body
// app.use(express.urlencoded({ extended: true })); // parse form data if needed
// //app.use(cors()); // allow frontend to connect

// const allowedOrigins = [
//   "http://localhost:3000",             // local development
//   "https://smart-care-sigma.vercel.app" // deployed frontend on Vercel
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   })
// );

// const io = socketIO(server, {
//   cors: {
//     origin: allowedOrigins,
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });


// const connectedUsers = new Map();

// io.on('connection', (socket) => {
//   console.log('✅ A user connected');

//   socket.on('register', (userId) => {
//     if (userId) {
//       connectedUsers.set(userId, socket.id);
//       console.log(`📌 Registered user ${userId} with socket ID ${socket.id}`);
//       socket.join(userId);
//     }
//   });

//   socket.on('joinRoom', ({ doctorId, patientId }) => {
//     const roomId = `${patientId}_${doctorId}`;
//     socket.join(roomId);
//     console.log(`👥 Joined room ${roomId}`);

//     // Broadcast online status
//     io.to(roomId).emit('userOnlineStatus', { userId: socket.userId, online: true });
//   });

//   socket.on('typing', ({ roomId, userId }) => {
//     socket.to(roomId).emit('showTyping', { userId });
//   });

//   socket.on('stopTyping', ({ roomId, userId }) => {
//     socket.to(roomId).emit('hideTyping', { userId });
//   });

//   socket.on('sendMessage', async ({ sender, receiver, content }) => {
//     if (!sender || !receiver || !content?.trim()) return;

//     const savedMessage = await Message.create({ sender, receiver, content });

//     io.to(sender).emit('receiveMessage', { ...savedMessage._doc, fromSelf: true });
//     io.to(receiver).emit('receiveMessage', { ...savedMessage._doc, fromSelf: false });

//     // Mark as delivered
//     io.to(receiver).emit('messageDelivered', { messageId: savedMessage._id });
//   });

//   socket.on('markAsRead', ({ messageId, roomId }) => {
//     io.to(roomId).emit('messageRead', { messageId });
//   });

//   socket.on('disconnect', () => {
//     for (let [userId, sockId] of connectedUsers.entries()) {
//       if (sockId === socket.id) {
//         connectedUsers.delete(userId);
//         console.log(`❌ User ${userId} disconnected`);
//         break;
//       }
//     }
//   });
// });

// app.set('io', io);
// app.set('connectedUsers', connectedUsers);

// app.use('/api/auth', authRoutes);
// app.use('/api/dashboard', dashboardRoutes);
// app.use('/api/doctor', doctorRoutes);
// app.use('/api/appointments', appointmentRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/messages', messageRoutes);
// app.use('/api/chat', chatRoutes);

// app.use('/api/chat', (req, res, next) => {
//   console.log('➡️ chat route hit:', req.path);
//   next();
// }, chatRoutes);


// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true, useUnifiedTopology: true
// }).then(() => console.log('✅ Connected to MongoDB Atlas'))
//   .catch(err => console.error('❌ MongoDB connection error:', err));


//   app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });


// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();

// Routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const doctorRoutes = require('./routes/doctor');
const appointmentRoutes = require('./routes/appointments');
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');
const chatRoutes = require('./routes/chat');

// Models
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const allowedOrigins = [
//   "http://localhost:3000",             // local dev
//   "https://smart-care-sigma.vercel.app" // deployed frontend
// ];

// const allowedOrigins = [
//   "http://localhost:3000",             
//   "https://smart-care-sigma.vercel.app", // frontend
//   "https://smartcare-6j9f.onrender.com" // backend itself
// ];


// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   })
// );



const allowedOrigins = [
  "http://localhost:3000",             
  "https://smart-care-sigma.vercel.app", // frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
  next();
});



// ✅ Socket.io
// const io = socketIO(server, {
//   cors: {
//     origin: allowedOrigins,
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

const io = socketIO(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS (Socket.IO)"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});


const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('✅ A user connected');

  socket.on('register', (userId) => {
    if (userId) {
      connectedUsers.set(userId, socket.id);
      console.log(`📌 Registered user ${userId} with socket ID ${socket.id}`);
      socket.join(userId);
    }
  });

  socket.on('joinRoom', ({ doctorId, patientId }) => {
    const roomId = `${patientId}_${doctorId}`;
    socket.join(roomId);
    console.log(`👥 Joined room ${roomId}`);
    io.to(roomId).emit('userOnlineStatus', { userId: socket.userId, online: true });
  });

  socket.on('typing', ({ roomId, userId }) => {
    socket.to(roomId).emit('showTyping', { userId });
  });

  socket.on('stopTyping', ({ roomId, userId }) => {
    socket.to(roomId).emit('hideTyping', { userId });
  });

  socket.on('sendMessage', async ({ sender, receiver, content }) => {
    if (!sender || !receiver || !content?.trim()) return;

    const savedMessage = await Message.create({ sender, receiver, content });

    io.to(sender).emit('receiveMessage', { ...savedMessage._doc, fromSelf: true });
    io.to(receiver).emit('receiveMessage', { ...savedMessage._doc, fromSelf: false });

    io.to(receiver).emit('messageDelivered', { messageId: savedMessage._id });
  });

  socket.on('markAsRead', ({ messageId, roomId }) => {
    io.to(roomId).emit('messageRead', { messageId });
  });

  socket.on('disconnect', () => {
    for (let [userId, sockId] of connectedUsers.entries()) {
      if (sockId === socket.id) {
        connectedUsers.delete(userId);
        console.log(`❌ User ${userId} disconnected`);
        break;
      }
    }
  });
});

app.set('io', io);
app.set('connectedUsers', connectedUsers);

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/chat', chatRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
