// import React, { useState } from 'react';
// import axios from 'axios';

// const SetDoctorSlotsForm = () => {
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
//     setMessage('');
//     setError('');

//     const token = localStorage.getItem('token');

//     if (!token) {
//       setError('Token not found. Please login.');
//       return;
//     }

//     try {
//       const response = await axios.put(
//         'http://localhost:5000/api/doctor/slots',
//         { date, slots },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setMessage(response.data.message);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Server error');
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4">🕒 Set Available Time Slots</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-semibold">Select Date:</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-semibold mb-1">Available Slots:</label>
//           {slots.map((slot, index) => (
//             <div key={index} className="flex gap-2 mb-2">
//               <input
//                 type="time"
//                 value={slot}
//                 onChange={(e) => handleSlotChange(index, e.target.value)}
//                 className="border px-3 py-1 rounded w-full"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => removeSlotField(index)}
//                 className="text-red-500 font-bold"
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addSlotField}
//             className="text-blue-600 font-semibold"
//           >
//             + Add Slot
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Save Slots
//         </button>
//       </form>

//       {message && (
//         <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">{message}</div>
//       )}
//       {error && (
//         <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>
//       )}
//     </div>
//   );
// };

// export default SetDoctorSlotsForm;


import React, { useState } from 'react';
import api from '../utils/axios'; // ✅ use custom axios instance

const SetDoctorSlotsForm = () => {
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState(['']);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
    setMessage('');
    setError('');

    try {
      const response = await api.put('/api/doctor/slots', { date, slots }); // ✅ no localhost
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">🕒 Set Available Time Slots</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Available Slots:</label>
          {slots.map((slot, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="time"
                value={slot}
                onChange={(e) => handleSlotChange(index, e.target.value)}
                className="border px-3 py-1 rounded w-full"
                required
              />
              <button
                type="button"
                onClick={() => removeSlotField(index)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSlotField}
            className="text-blue-600 font-semibold"
          >
            + Add Slot
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Slots
        </button>
      </form>

      {message && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default SetDoctorSlotsForm;
