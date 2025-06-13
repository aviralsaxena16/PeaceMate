"use client";
import { useEffect, useState } from "react";

export default function DateDisplay() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setDate(formatted);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div 
        className="h-40 w-full max-w-xl p-6 rounded-2xl shadow-xl relative overflow-hidden mb-40 mt-5"
        style={{ background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 100%)' }}
      >
        {/* Shine effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-pulse duration-2000" />

        {/* Content container */}
        <div className="relative z-10 flex items-center justify-between">
          {/* Date text section */}
          <div className="flex-1">
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-600">Today's Date</span>
            </div>
            <div className="text-xl font-bold">
              <span style={{ color: '#ea580c' }}>
                {date.split(',')[0]}
              </span>
              <span className="text-gray-700">
                {date.includes(',') ? `, ${date.split(',')[1]}` : ''}
              </span>
            </div>
          </div>

         
          <div className="relative ml-4">
            <div 
              className="w-16 h-16 rounded-full overflow-hidden border-3 border-white shadow-lg relative"
              style={{ 
                background: 'linear-gradient(45deg, #ea580c, #ec4899)',
                boxShadow: '0 8px 32px rgba(234, 88, 12, 0.3)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent animate-pulse" />
              <div className="w-full h-full flex items-center justify-center text-white text-xs font-medium">
                Muku
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Bottom gradient accent */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
          style={{ background: 'linear-gradient(45deg, #ea580c, #ec4899)' }}
        />
      </div>

     
    <img 
        src="/muku1.png"  
        alt="Muku Sticker"
        className="relative -bottom-8 -right-4 w-100 h-100 object-contain select-none pointer-events-none"
        style={{ transform: 'rotate(-6deg)' }} 
      />
    </div>
  );
}
