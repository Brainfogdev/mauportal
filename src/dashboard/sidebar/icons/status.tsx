import React from 'react';

const StatusIcon = ({ status }) => {
  const getColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'pending':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <span className={`inline-block w-4 h-4 rounded-full ${getColor(status)}`}>
     
    </span>
  );
};

export default StatusIcon;
