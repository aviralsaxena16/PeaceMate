'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const [users, setUsers] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const res = await fetch(`/api/get-users?userId=${user?.id}`);
      const data = await res.json();
      console.log('AdminPage: data =', data)
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

 useEffect(() => {
  console.log('AdminPage: useEffect triggered');
  if (!isLoaded) {
    console.log('AdminPage: isLoaded = false');
    return;
  }

  if (!user) {
    console.log('AdminPage: user is null or undefined');
    return;
  }

  if (user.publicMetadata?.isAdmin) {
    console.log('AdminPage: User is admin');
    setIsAuthorized(true);
    fetchUsers();
  } else {
    console.log('AdminPage: User is not admin, redirecting');
    router.replace('/');
  }
}, [isLoaded, user]);

  if (!isLoaded || !isAuthorized) return null;

  return (
    <div className="min-h-screen p-6  flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white text-black rounded-md shadow-lg z-10 relative p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white">
            <thead>
              <tr className="bg-orange-200 text-left">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-500">No users found.</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-t hover:bg-gray-100">
                    <td className="p-3 border">{u.id}</td>
                    <td className="p-3 border">{u.name || '—'}</td>
                    <td className="p-3 border">{u.email}</td>
                    <td className="p-3 border">{u.isAdmin ? 'Yes' : 'No'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
