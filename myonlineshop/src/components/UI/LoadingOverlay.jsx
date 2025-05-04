import React from 'react';

const LoadingOverlay = ({ isLoading, message = "Opening payment window" }) => {
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex flex-col items-center w-full max-w-sm p-6 mx-4 bg-white shadow-xl rounded-xl">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 rounded-full border-t-blue-500 animate-spin"></div>
        </div>
        <p className="text-lg font-medium text-gray-800">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;