import React, { useState } from 'react';
import axios from 'axios';

function Approve({ isOpen, onClose, data }) {
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen && !successfulModal) return null;

  const addFunds = async (referenceNo, amountCredited) => {
    const data = { userId: referenceNo, amount: amountCredited };

    const config = {
      method: 'put',
      url: 'http://150.129.118.10:8080/user/wallet/mou',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    setIsProcessing(true);

    try {
      const response = await axios(config);
      console.log('Funds added successfully:', response.data);

      setIsProcessing(false);
      setSuccessfulModal(true);

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Error adding funds:', error);
      setIsProcessing(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessfulModal(false);
  };

  return (
    <>
      {isOpen && (
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
            <h2 className="text-lg font-bold text-black">Approve</h2>
            <p className="mt-4 text-black">Are you sure you want to approve it?</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100"
              >
                No, cancel
              </button>
              <button
                onClick={() => addFunds(data.referenceNo, data.amountCredited)}
                className={`py-2.5 px-5 ms-3 text-sm font-medium text-white ${
                  isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-800'
                } focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 rounded-lg`}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : "Yes, I'm sure"}
              </button>
            </div>
          </div>
        </div>
      )}

      {successfulModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseSuccessModal}
          ></div>

          <div className="relative bg-white rounded-lg shadow-lg max-w-md mx-auto p-6 z-10">
            <button
              onClick={handleCloseSuccessModal}
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
            <h2 className="text-lg font-bold text-black">Success</h2>
            <p className="mt-4 text-black">Funds have been successfully added!</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseSuccessModal}
                className="py-2.5 px-5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Approve;
