'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

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

  return <div className="p-6">Welcome, {user?.fullName} 👋</div>;
}