'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import CalendarDisplay from '@/components/CalendarDisplay';
import Chat from '@/components/Chat';
import DateDisplay from '@/components/DateDisplay';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // This function will be called when user selects a date from calendar
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  useEffect(() => {
    if (user && user.primaryEmailAddress) {
      const registerUser = async () => {
        await fetch('/api/register-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: user.id,
            name: user.fullName,
            email: user.primaryEmailAddress.emailAddress,
          }),
        });
      };

      registerUser();
    }
  }, [user]);

  return (
    <>
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <div 
        style={{ backgroundImage: `url(https://wallpaperaccess.com/full/4308123.jpg)` }} 
        className="flex w-full h-screen bg-cover bg-center bg-fixed homepage-container"
      >
        {/* Left Section - Date Display */}
        <DateDisplay />
        
        {/* Middle Section - Calendar */}
        <div className="w-1/2 p-4">
          <CalendarDisplay handleDateChange={handleDateChange} selectedDate={selectedDate} />
        </div>
        
        {/* Right Section - Chat */}
        <div className="w-1/2 p-4">
          <Chat selectedDate={selectedDate} />
        </div>
      </div>
    </>
  );
}