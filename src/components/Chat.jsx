import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Bold } from 'lucide-react';
import './Chat.css'

export default function ChatSection({ selectedDate }) {
  const [message, setMessage] = useState('');
  const [entry, setEntry] = useState(null);
  const { user, isLoaded } = useUser();

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
    <div className="chat-container">
      {/* Chat Display */}
      <div className="chat-display">
        {entry ? (
          <>
            {/* User Message */}
            <div className="user-message">
              {entry.content}
            </div>
            
            {/* Response Container */}
            <div className="response-container">
              {/* Productivity Score Circle */}
              <div className="score-circle">
                <div className="score-value">{entry.score}%</div>
                <div className="score-label">Productivity</div>
              </div>
              
              {/* Summary Message */}
              <div className="response-message">
                <div className="message-heading">Summary</div>
                <div className="message-content">{entry.summary}</div>
              </div>
              
              {/* Feedback Message */}
              <div className="response-message">
                <div className="message-heading">Feedback</div>
                <div className="message-content">{entry.feedback}</div>
              </div>
            </div>
          </>
        ) : (
          <div className="no-entry">
            No reflection yet for this day.
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          className="message-input"
          placeholder="Type how your day went..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}