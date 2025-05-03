import { useEffect, useState } from 'react';

export const useLoadingAnimation = ({
  minLoadingTime = 2000,
  maxLoadingTime = 4000,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const loadingDuration = 
      Math.random() * (maxLoadingTime - minLoadingTime) + minLoadingTime;
    
    const steps = 30;
    const stepDuration = loadingDuration / steps;
    const progressIncrement = 100 / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      
      const t = currentStep / steps;
      const easedProgress = t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
      
      const newProgress = Math.min(easedProgress * 100, 100);
      setProgress(newProgress);
      
      if (currentStep >= steps) {
        clearInterval(interval);
        
        setTimeout(() => {
          setIsComplete(true);
          onComplete?.();
        }, 300);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [minLoadingTime, maxLoadingTime, onComplete]);

  return { progress, isComplete };
};

export default useLoadingAnimation;