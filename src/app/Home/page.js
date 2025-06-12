'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import CalendarDisplay from '@/components/CalendarDisplay';
import Chat from '@/components/Chat';
import DateDisplay from '@/components/DateDisplay';

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
    <div className="flex w-full h-screen">
      {/* Left Chat Section */}
      <div className="w-1/2 p-4">
        <Chat selectedDate={selectedDate} />
      </div>
        <DateDisplay  />

      {/* Right Calendar + Date Display */}
      <div className="w-1/2 p-4 border-l bg-gray-50">
        <CalendarDisplay handleDateChange={handleDateChange} selectedDate={selectedDate} />
      </div>
    </div>
  );
}
