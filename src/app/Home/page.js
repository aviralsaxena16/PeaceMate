'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import CalendarDisplay from '@/components/CalendarDisplay';
import Chat from '@/components/Chat';
import DateDisplay from '@/components/DateDisplay';

export default function HomePage() {
  const { user } = useUser();

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

  return( 
<>

<Chat/>
<CalendarDisplay/>
<DateDisplay/>
</>
  );
}