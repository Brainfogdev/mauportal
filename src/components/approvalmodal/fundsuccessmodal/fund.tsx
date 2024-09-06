import React, { useState } from 'react';
import axios from 'axios';

function Approve({ isOpen, onClose }) {
  if (!isOpen) return null;
 
  const addFunds = async (referenceNo: any, amountCredited: any) => {
    const data = { userId: 'NUQI00000001', amount: 1000 };

    const config = {
      method: 'put',
      url: 'http://150.129.118.10:8080/user/wallet/mau',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      const response = await axios(config);
      console.log('Funds added successfully:', response.data);
    } catch (error) {
      console.error('Error adding funds:', error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

      <div className="relative bg-white rounded-lg shadow-lg max-w-md mx-auto p-6 z-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-lg font-bold text-black">Success!</h2>
        <p className="mt-4 text-black">Funds Added Successfully</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            No, cancel
          </button>
          <button
            onClick={() => {
              addFunds('NUQI00000001', 1000);
              onClose();
            }}
            className="py-2.5 px-5 ms-3 text-sm font-medium text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 rounded-lg"
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </div>
  );
}

export default Approve;
