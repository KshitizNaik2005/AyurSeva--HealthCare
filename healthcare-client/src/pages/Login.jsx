
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
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
//       const delay = Math.random() * 5;
//       plus.style.animationDuration = `${duration}s`;
//       plus.style.animationDelay = `${delay}s`;

//       document.body.appendChild(plus);
//       plusElements.push(plus);
//     }

//     return () => {
//       plusElements.forEach((plus) => document.body.removeChild(plus));
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok && data.token) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('role', data.role);
//         localStorage.setItem('name', data.name);
//         localStorage.setItem('userId', data.id);
//         localStorage.setItem('email', data.email);

//         toast.success('Login successful!');
//         console.log('Logged in role:', data.role);

//         if (data.role === 'doctor') navigate('/doctor-dashboard');
//         else navigate('/patient-dashboard');
//       } else {
//         toast.error(data.msg || 'Login failed');
//       }
//     } catch (err) {
//       toast.error('Something went wrong. Please try again.');
//       console.error(err);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: "url('/medical-background.jpg')" }}
//     >
//       <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-lg flex w-[90%] max-w-4xl overflow-hidden">

//         {/* LEFT: Login Form */}
//         <div className="w-full md:w-1/2 p-10 animate-slide-in-left">
//           <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Welcome Back</h2>

//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
//               required
//             />

//             <button
//               type="submit"
//               className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 shadow-md transition"
//             >
//               Login
//             </button>
//           </form>

//           <p className="mt-4 text-center text-sm text-gray-700">
//             Don’t have an account?{' '}
//             <Link to="/register" className="text-green-700 font-semibold hover:underline">
//               Register
//             </Link>
//           </p>
//         </div>

//         {/* RIGHT: Illustration Image */}
//         <div className="hidden md:block w-1/2 animate-slide-in-right">
//           <img
//             src="/login-illustration.jpg"
//             alt="Healthcare Illustration"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;













// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   //✅ Backend URL (env first, fallback to localhost)
//   // const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

//   const BASE_URL = "https://smartcare-6j9f.onrender.com" || "http://localhost:5000";


//   // const BASE_URL =
//   // process.env.NODE_ENV === 'development'
//   //   ? 'http://localhost:5000'
//   //   : process.env.REACT_APP_BACKEND_URL || 'https://smartcare-6j9f.onrender.com';


//   // ✅ Floating Plus Animation
//   useEffect(() => {
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
//       const delay = Math.random() * 5;
//       plus.style.animationDuration = `${duration}s`;
//       plus.style.animationDelay = `${delay}s`;

//       document.body.appendChild(plus);
//       plusElements.push(plus);
//     }

//     return () => {
//       plusElements.forEach((plus) => document.body.removeChild(plus));
//     };
//   }, []);

//   // ✅ Handle Login
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${BASE_URL}/api/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok && data.token) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('role', data.role);
//         localStorage.setItem('name', data.name);
//         localStorage.setItem('userId', data.id);
//         localStorage.setItem('email', data.email);

//         toast.success('Login successful!');
//         console.log('Logged in role:', data.role);

//         if (data.role === 'doctor') navigate('/doctor-dashboard');
//         else navigate('/patient-dashboard');
//       } else {
//         toast.error(data.msg || 'Login failed');
//       }
//     } catch (err) {
//       toast.error('Something went wrong. Please try again.');
//       console.error(err);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: "url('/medical-background.jpg')" }}
//     >
//       <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-lg flex w-[90%] max-w-4xl overflow-hidden">

//         {/* LEFT: Login Form */}
//         <div className="w-full md:w-1/2 p-10 animate-slide-in-left">
//           <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Welcome Back</h2>

//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
//               required
//             />

//             <button
//               type="submit"
//               className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 shadow-md transition"
//             >
//               Login
//             </button>
//           </form>

//           <p className="mt-4 text-center text-sm text-gray-700">
//             Don’t have an account?{' '}
//             <Link to="/register" className="text-green-700 font-semibold hover:underline">
//               Register
//             </Link>
//           </p>
//         </div>

//         {/* RIGHT: Illustration Image */}
//         <div className="hidden md:block w-1/2 animate-slide-in-right">
//           <img
//             src="/login-illustration.jpg"
//             alt="Healthcare Illustration"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;





//Login
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // ✅ Use Render backend by default
 const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://smartcare-6j9f.onrender.com"
    : "http://localhost:5000";


  useEffect(() => {
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
      const delay = Math.random() * 5;
      plus.style.animationDuration = `${duration}s`;
      plus.style.animationDelay = `${delay}s`;

      document.body.appendChild(plus);
      plusElements.push(plus);
    }

    return () => {
      plusElements.forEach((plus) => document.body.removeChild(plus));
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.name);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('email', data.email);

        toast.success('Login successful!');
        console.log('Logged in role:', data.role);

        if (data.role === 'doctor') navigate('/doctor-dashboard');
        else navigate('/patient-dashboard');
      } else {
        toast.error(data.msg || 'Login failed');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/medical-background.jpg')" }}
    >
      <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-lg flex w-[90%] max-w-4xl overflow-hidden">

        {/* LEFT: Login Form */}
        <div className="w-full md:w-1/2 p-10 animate-slide-in-left">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Welcome Back</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 shadow-md transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-700">
            Don’t have an account?{' '}
            <Link to="/register" className="text-green-700 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>

        {/* RIGHT: Illustration Image */}
        <div className="hidden md:block w-1/2 animate-slide-in-right">
          <img
            src="/login-illustration.jpg"
            alt="Healthcare Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
