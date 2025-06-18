import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Bold } from 'lucide-react';
import styles from './Chat.module.css'; // ✅ CSS Modules

export default function ChatSection({ selectedDate }) {
  const [message, setMessage] = useState('');
  const [entry, setEntry] = useState(null);
  const { user, isLoaded } = useUser();

  const userId = user?.id;

  function formatToYYYYMMDD(date) {
    return date.toISOString().split('T')[0];
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
      if (!user) return;

      const res = await fetch(`/api/get-entry?date=${formattedDate}&userId=${user.id}`);
      const data = await res.json();
      setEntry(data || null);
    };

    fetchEntry();
  }, [formattedDate, user]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatDisplay}>
        {entry ? (
          <>
            <div className={styles.userMessage}>{entry.content}</div>

            <div className={styles.responseContainer}>
              <div className={styles.scoreCircle}>
                <div className={styles.scoreValue}>{entry.score}%</div>
                <div className={styles.scoreLabel}>Productivity</div>
              </div>

              <div className={styles.responseMessage}>
                <div className={styles.messageHeading}>Summary</div>
                <div className={styles.messageContent}>{entry.summary}</div>
              </div>

              <div className={styles.responseMessage}>
                <div className={styles.messageHeading}>Feedback</div>
                <div className={styles.messageContent}>{entry.feedback}</div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.noEntry}>No reflection yet for this day.</div>
        )}
      </div>

      <div className={styles.inputSection}>
        <input
          type="text"
          className={styles.messageInput}
          placeholder="Type how your day went..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <button className={styles.sendButton} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
