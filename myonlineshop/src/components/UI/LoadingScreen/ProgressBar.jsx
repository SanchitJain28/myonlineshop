import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full h-1 overflow-hidden rounded-full bg-stone-200">
      <div 
        className="h-full transition-all duration-300 ease-out bg-stone-800"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;