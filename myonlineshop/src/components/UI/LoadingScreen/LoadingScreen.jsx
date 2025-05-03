import React from 'react';
import { Loader } from 'lucide-react';
import Logo from './Logo';
import ProgressBar from './ProgressBar';
import LoadingItems from './LoadingItems';
import useLoadingAnimation from '../../../hooks/useLoadingAnimation';


const LoadingScreen = ({
  onLoadingComplete,
  minLoadingTime = 2000,
  maxLoadingTime = 4000,
}) => {
  const { progress, isComplete } = useLoadingAnimation({
    minLoadingTime,
    maxLoadingTime,
    onComplete: onLoadingComplete,
  });

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-50 transition-opacity duration-700 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center w-full max-w-md px-4">
        <div className="mb-10 transition-transform duration-700 transform scale-100">
          <Logo progress={progress} />
        </div>
        
        <div className="w-full mb-6">
          <ProgressBar progress={progress} />
        </div>
        
        <div className="flex items-center justify-center mb-10 text-stone-700">
          <Loader className="w-4 h-4 mr-2 animate-spin" />
          <p className="text-sm font-medium tracking-wider">
            {isComplete ? 'READY' : `LOADING ${Math.round(progress)}%`}
          </p>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <LoadingItems progress={progress} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;