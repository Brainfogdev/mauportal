import React, { useState } from 'react';

function Success({ isOpen, onClose }) {
  const [disapprovalReason, setDisapprovalReason] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

      <div className="relative bg-white rounded-lg shadow-lg max-w-screen-lg mx-auto p-6 z-10">
        {/* Close button */}
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
        <div className="mt-8">
          <label htmlFor="disapprovalReason" className="block text-sm font-medium text-gray-700">
           Are you sure you want to disapprove it ?
          </label>
          <textarea
            id="disapprovalReason"
            rows="4"
            className="mt-3 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={disapprovalReason}
            onChange={(e) => setDisapprovalReason(e.target.value)}
            placeholder="Enter the reason for disapproval..."
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            No, cancel
          </button>
          <button
            onClick={() => {
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

export default Success;
