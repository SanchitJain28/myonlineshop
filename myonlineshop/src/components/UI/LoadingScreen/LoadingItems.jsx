import React from 'react';
import { Shirt, Trees as Dress, ShoppingBag, Glasses } from 'lucide-react';

const LoadingItems = ({ progress }) => {
  const items = [
    { Icon: Shirt, delay: 0 },
    { Icon: Dress, delay: 0.1 },
    { Icon: ShoppingBag, delay: 0.2 },
    { Icon: Glasses, delay: 0.3 },
    { Icon: Shirt, delay: 0.4 },
    { Icon: Dress, delay: 0.5 },
  ];

  const itemsToShow = Math.ceil((progress / 100) * items.length);
  
  return (
    <div className="flex justify-center w-full py-8 overflow-hidden bg-stone-100/70 backdrop-blur-sm">
      <div className="flex space-x-8 md:space-x-12">
        {items.map((item, index) => {
          const { Icon, delay } = item;
          const isVisible = index < itemsToShow;
          
          return (
            <div 
              key={index}
              className="transition-all duration-700 ease-out transform"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                transitionDelay: `${delay}s`
              }}
            >
              <Icon 
                size={28} 
                className="text-stone-600"
                strokeWidth={1.5}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoadingItems;