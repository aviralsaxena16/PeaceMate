'use client';

import { useState } from 'react';
import { SignIn, SignUp } from '@clerk/nextjs';

export default function AuthButtons() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('sign-in');

  const handleOpen = (type) => {
    setMode(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => handleOpen('sign-in')}>Login</button>
      <button onClick={() => handleOpen('sign-up')}>Sign Up</button>

      {open && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <button className="custom-close" onClick={handleClose}>×</button>
            {mode === 'sign-in' ? (
  <SignIn routing="hash" />
) : (
  <SignUp routing="hash" />
)}
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .custom-modal {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          position: relative;
          width: 90%;
          max-width: 450px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .custom-close {
          position: absolute;
          top: 0.5rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        button {
          margin: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #4338ca;
        }
      `}</style>
    </>
  );
}
