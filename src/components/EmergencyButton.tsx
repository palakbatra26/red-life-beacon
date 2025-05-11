
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const EmergencyButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/urgent');
  };

  return (
    <button
      className="fixed bottom-6 right-6 bg-primary hover:bg-red-700 text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300 transform hover:scale-105 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <AlertTriangle className="h-6 w-6" />
      <span 
        className={`
          absolute right-full mr-3 bg-gray-900 text-white text-xs px-2 py-1 rounded 
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
      >
        Emergency Request
      </span>
    </button>
  );
};

export default EmergencyButton;
