// import React, { useState } from 'react';
// import axios from 'axios';

// const DoctorSetSlots = () => {
//   const [date, setDate] = useState('');
//   const [slots, setSlots] = useState(['']);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleSlotChange = (index, value) => {
//     const updatedSlots = [...slots];
//     updatedSlots[index] = value;
//     setSlots(updatedSlots);
//   };

//   const addSlotField = () => setSlots([...slots, '']);
//   const removeSlotField = (index) => {
//     const updatedSlots = slots.filter((_, i) => i !== index);
//     setSlots(updatedSlots);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.put(
//         'http://localhost:5000/api/doctor/slots',
//         { date, slots },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessage(res.data.message);
//       setError('');
//     } catch (err) {
//       console.error(err);
//       setMessage('');
//       setError(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center flex items-center justify-center"
//       style={{ backgroundImage: "url('/medical-background.jpg')" }}
//     >
//       <div className="bg-white bg-opacity-90 p-8 rounded shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
//           🕐 Set Available Slots
//         </h2>

//         <form onSubmit={handleSubmit}>
//           <label className="block mb-2 font-semibold">Date:</label>
//           <input
//             type="date"
//             className="w-full border p-2 rounded mb-4"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//           />

//           <label className="block mb-2 font-semibold">Time Slots:</label>
//           {slots.map((slot, index) => (
//             <div key={index} className="flex mb-2 gap-2">
//               <input
//                 type="time"
//                 className="w-full border p-2 rounded"
//                 value={slot}
//                 onChange={(e) => handleSlotChange(index, e.target.value)}
//                 required
//               />
//               {slots.length > 1 && (
//                 <button
//                   type="button"
//                   className="text-red-500 font-bold"
//                   onClick={() => removeSlotField(index)}
//                 >
//                   ×
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             className="text-blue-600 text-sm mb-4"
//             onClick={addSlotField}
//           >
//             + Add More Slots
//           </button>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Save Slots
//           </button>
//         </form>

//         {message && (
//           <div className="mt-4 text-green-700 bg-green-100 p-2 rounded">
//             ✅ {message}
//           </div>
//         )}
//         {error && (
//           <div className="mt-4 text-red-700 bg-red-100 p-2 rounded">
//             ❌ {error}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorSetSlots;



import React, { useState } from 'react';
import axios from 'axios';

const DoctorSetSlots = () => {
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState(['']);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // ✅ Backend URL (use env var first, fallback to localhost)
  const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  const handleSlotChange = (index, value) => {
    const updatedSlots = [...slots];
    updatedSlots[index] = value;
    setSlots(updatedSlots);
  };

  const addSlotField = () => setSlots([...slots, '']);
  const removeSlotField = (index) => {
    const updatedSlots = slots.filter((_, i) => i !== index);
    setSlots(updatedSlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${BASE_URL}/api/doctor/slots`,
        { date, slots },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setError('');
    } catch (err) {
      console.error(err);
      setMessage('');
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/medical-background.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
          🕐 Set Available Slots
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold">Date:</label>
          <input
            type="date"
            className="w-full border p-2 rounded mb-4"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label className="block mb-2 font-semibold">Time Slots:</label>
          {slots.map((slot, index) => (
            <div key={index} className="flex mb-2 gap-2">
              <input
                type="time"
                className="w-full border p-2 rounded"
                value={slot}
                onChange={(e) => handleSlotChange(index, e.target.value)}
                required
              />
              {slots.length > 1 && (
                <button
                  type="button"
                  className="text-red-500 font-bold"
                  onClick={() => removeSlotField(index)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="text-blue-600 text-sm mb-4"
            onClick={addSlotField}
          >
            + Add More Slots
          </button>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save Slots
          </button>
        </form>

        {message && (
          <div className="mt-4 text-green-700 bg-green-100 p-2 rounded">
            ✅ {message}
          </div>
        )}
        {error && (
          <div className="mt-4 text-red-700 bg-red-100 p-2 rounded">
            ❌ {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSetSlots;
