'use client';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import CalendarDisplay from '@/components/CalendarDisplay';
import Chat from '@/components/Chat';
import DateDisplay from '@/components/DateDisplay';
import Navbar from '@/components/Navbar';
import { useRouter, usePathname } from 'next/navigation';

export default function HomePage() {
  const { isLoaded, user } = useUser();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAdminChecked, setIsAdminChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // Register user on mount
  useEffect(() => {
    if (user && user.primaryEmailAddress) {
      const registerUser = async () => {
        try {
          await fetch('/api/register-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
              name: user.fullName,
              email: user.primaryEmailAddress.emailAddress,
            }),
          });
        } catch (err) {
          // Optionally handle registration errors here
          console.error('User registration failed:', err);
        }
      };

      registerUser();
    }
  }, [user]);

  // Admin check with pathname condition, with robust JSON handling
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch(`/api/check-admin?userId=${user?.id}`);
        if (!res.ok) {
          setIsAdminChecked(true);
          return;
        }
        const text = await res.text();
        if (!text) {
          setIsAdminChecked(true);
          return;
        }
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          setIsAdminChecked(true);
          return;
        }
        if (data.isAdmin && pathname !== '/admin') {
          router.replace('/admin');
        } else {
          setIsAdminChecked(true);
        }
      } catch (err) {
        // Optionally handle fetch errors here
        setIsAdminChecked(true);
      }
    };

    if (user) checkAdmin();
  }, [user, pathname, router]);

  if (!isLoaded || (user && !isAdminChecked)) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div
        style={{ backgroundImage: `url(https://wallpaperaccess.com/full/4308123.jpg)` }}
        className="flex w-full h-screen bg-cover bg-center bg-fixed homepage-container"
      >
        <DateDisplay />
        <div className="w-1/2 p-4">
          <CalendarDisplay handleDateChange={handleDateChange} selectedDate={selectedDate} />
        </div>
        <div className="w-1/2 p-4">
          <Chat selectedDate={selectedDate} />
        </div>
      </div>
    </>
  );
}
