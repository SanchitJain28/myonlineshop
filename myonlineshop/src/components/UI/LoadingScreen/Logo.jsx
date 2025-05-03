import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Logo = ({ progress }) => {
  const scale = 1 + (progress / 100) * 0.1;
  const rotateY = progress * 3.6;
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative flex items-center justify-center w-20 h-20 mb-4"
        style={{ 
          transform: `scale(${scale}) rotateY(${rotateY}deg)`,
          transition: 'transform 0.5s ease-out'
        }}
      >
        <ShoppingBag 
          size={64} 
          className="transition-all duration-500 text-stone-900"
          strokeWidth={progress < 50 ? 1 : 1.5}
        />
        
        <div 
          className="absolute inset-0 border rounded-full border-stone-300"
          style={{ 
            background: `conic-gradient(#1F2937 ${progress}%, transparent ${progress}%)`,
            opacity: 0.15
          }}
        ></div>
      </div>
      
      <h1 
        className="mb-1 text-2xl font-semibold tracking-wider text-stone-900"
        style={{ 
          letterSpacing: `${0.1 + (progress / 100) * 0.1}em`
        }}
      >
        INSTA MART
      </h1>
      <p className="text-sm tracking-widest uppercase text-stone-600">est. 2025</p>
    </div>
  );
};

export default Logo;