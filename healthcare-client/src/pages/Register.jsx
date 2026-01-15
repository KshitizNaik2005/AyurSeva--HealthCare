
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  // ✅ Floating "+" effect
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
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName, email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Registration successful! Please login.');
        navigate('/login');
      } else {
        toast.error(data.error || 'Registration failed.');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/medical-background.jpg')" }}
    >
      <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-lg flex w-[90%] max-w-4xl overflow-hidden">

        {/* LEFT: Register Form */}
        <div className="w-full md:w-1/2 p-10 animate-slide-in-left">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Create an Account</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
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
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            >
              <option value="">Select Role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 shadow-md transition"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-700">
            Already have an account?{' '}
            <Link to="/login" className="text-green-700 font-semibold hover:underline">
              Login
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

export default Register;





// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Register = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const navigate = useNavigate();

//   // ✅ Floating "+" background effect
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
//       const res = await fetch(
//         `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ name: fullName, email, password, role }),
//         }
//       );

//       const data = await res.json();

//       if (res.ok) {
//         toast.success('Registration successful! Please login.');
//         navigate('/login');
//       } else {
//         toast.error(data.error || 'Registration failed.');
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: "url('/medical-background.jpg')" }}
//     >
//       <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-lg flex w-[90%] max-w-4xl overflow-hidden">
        
//         {/* LEFT: Register Form */}
//         <div className="w-full md:w-1/2 p-10 animate-slide-in-left">
//           <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Create an Account</h2>

//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
//               required
//             />
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
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
//               required
//             >
//               <option value="">Select Role</option>
//               <option value="patient">Patient</option>
//               <option value="doctor">Doctor</option>
//             </select>

//             <button
//               type="submit"
//               className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 shadow-md transition"
//             >
//               Register
//             </button>
//           </form>

//           <p className="mt-4 text-center text-sm text-gray-700">
//             Already have an account?{' '}
//             <Link to="/login" className="text-green-700 font-semibold hover:underline">
//               Login
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

// export default Register;
