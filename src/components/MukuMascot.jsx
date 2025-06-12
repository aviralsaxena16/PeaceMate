import React from 'react';

const MukuMascot = ({ message = "Pick a date! 🐕" }) => {
  return (
    <div className="relative">
      {/* Speech bubble */}
      <div 
        className="absolute -top-12 left-8 px-3 py-2 rounded-full text-xs text-white font-medium shadow-lg animate-pulse"
        style={{ background: 'linear-gradient(45deg, #ec4899, #f97316)' }}
      >
        {message}
        <div 
          className="absolute bottom-0 left-6 transform translate-y-1/2 rotate-45 w-2 h-2" 
          style={{ background: '#ec4899' }}
        />
      </div>
      
      {/* Muku Dog SVG */}
      <svg 
        width="80" 
        height="80" 
        viewBox="0 0 100 100" 
        className="drop-shadow-lg hover:scale-105 transition-transform duration-300"
      >
        {/* Dog body */}
        <ellipse cx="50" cy="70" rx="20" ry="15" fill="#d2691e" />
        
        {/* Dog head */}
        <circle cx="50" cy="45" r="18" fill="#daa520" />
        
        {/* Dog ears */}
        <ellipse 
          cx="38" 
          cy="35" 
          rx="8" 
          ry="12" 
          fill="#8b4513" 
          transform="rotate(-20 38 35)" 
        />
        <ellipse 
          cx="62" 
          cy="35" 
          rx="8" 
          ry="12" 
          fill="#8b4513" 
          transform="rotate(20 62 35)" 
        />
        
        {/* Inner ears */}
        <ellipse 
          cx="40" 
          cy="35" 
          rx="4" 
          ry="6" 
          fill="#cd853f" 
          transform="rotate(-20 40 35)" 
        />
        <ellipse 
          cx="60" 
          cy="35" 
          rx="4" 
          ry="6" 
          fill="#cd853f" 
          transform="rotate(20 60 35)" 
        />
        
        {/* Dog snout */}
        <ellipse cx="50" cy="52" rx="8" ry="6" fill="#f4a460" />
        
        {/* Dog nose */}
        <ellipse cx="50" cy="48" rx="2" ry="1.5" fill="#000" />
        
        {/* Dog eyes */}
        <circle cx="44" cy="40" r="3" fill="#000" />
        <circle cx="56" cy="40" r="3" fill="#000" />
        
        {/* Eye highlights */}
        <circle cx="45" cy="39" r="1" fill="#fff" />
        <circle cx="57" cy="39" r="1" fill="#fff" />
        
        {/* Dog mouth */}
        <path 
          d="M 50 50 Q 45 55 42 52" 
          stroke="#000" 
          strokeWidth="1.5" 
          fill="none" 
          strokeLinecap="round" 
        />
        <path 
          d="M 50 50 Q 55 55 58 52" 
          stroke="#000" 
          strokeWidth="1.5" 
          fill="none" 
          strokeLinecap="round" 
        />
        
        {/* Dog tongue */}
        <ellipse cx="50" cy="56" rx="3" ry="2" fill="#ff69b4" />
        
        {/* Dog legs */}
        <rect x="38" y="80" width="6" height="12" rx="3" fill="#8b4513" />
        <rect x="48" y="80" width="6" height="12" rx="3" fill="#8b4513" />
        <rect x="58" y="80" width="6" height="12" rx="3" fill="#8b4513" />
        
        {/* Dog tail - animated wag */}
        <ellipse 
          cx="72" 
          cy="65" 
          rx="4" 
          ry="10" 
          fill="#8b4513" 
          transform="rotate(30 72 65)"
          className="animate-pulse"
        />
        
        {/* Collar */}
        <rect x="32" y="60" width="36" height="4" rx="2" fill="#ff4500" />
        
        {/* Collar tag */}
        <circle cx="68" cy="62" r="2" fill="#ffd700" />
      </svg>
    </div>
  );
};

export default MukuMascot;