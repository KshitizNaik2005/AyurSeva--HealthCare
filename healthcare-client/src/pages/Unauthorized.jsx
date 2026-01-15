import React from 'react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700">You are not authorized to view this page.</p>
      </div>
    </div>
  );
};

export default Unauthorized;
