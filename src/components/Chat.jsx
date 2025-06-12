import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export default function ChatSection({ selectedDate }) {
  const [message, setMessage] = useState('');
  const [entry, setEntry] = useState(null);
  const { user, isLoaded } = useUser(); // 👈 Add isLoaded

  const userId = user?.id;

  
function formatToYYYYMMDD(date) {
  return date.toISOString().split('T')[0]; // '2025-06-13'
}

const formattedDate = formatToYYYYMMDD(selectedDate || new Date());

  const handleSend = async () => {
   
    if (!isLoaded || !user || !message.trim()) return;

    const res = await fetch('/api/submit-entry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId,
        content: message,
        date: formattedDate,
      }),
    });

    const saved = await res.json();
    setEntry(saved);
    setMessage('');
  };

  useEffect(() => {
    const fetchEntry = async () => {
      const res = await fetch(`/api/get-entry?date=${formattedDate}`);
      const data = await res.json();
      setEntry(data || null);
    };
    fetchEntry();
  }, [formattedDate]);

  return (
    <div className="w-1/2 h-full flex flex-col justify-between border rounded-xl shadow p-4 bg-white">
      {/* Chat Display */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {entry ? (
          <>
            <div className="bg-gray-100 p-3 rounded-xl max-w-[80%] self-start shadow-sm">
              <p className="text-sm text-gray-800">{entry.content}</p>
            </div>

            <div className="text-xs text-green-600 font-semibold self-end">
              Productivity Score:
              <span className="ml-1 inline-block bg-green-200 px-2 py-1 rounded-full">
                {entry.score}%
              </span>
            </div>

            <div className="bg-blue-100 border border-blue-300 p-4 rounded-xl self-end max-w-[80%] shadow">
              <p className="text-sm text-blue-900">{entry.feedback}</p>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-400 italic">No reflection yet for this day.</p>
        )}
      </div>

      {/* Typebar */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type how your day went..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
