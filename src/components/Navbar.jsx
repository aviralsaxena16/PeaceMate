import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left side - could add menu items later */}
        <div className="navbar-left">
          {/* Future menu items can go here */}
        </div>

        {/* Center - App Name */}
        <div className="navbar-center">
          <h1 className="app-name">
            <span className="app-icon">🍃</span>
            PeaceMate
          </h1>
        </div>

        {/* Right side - Auth buttons */}
        <div className="navbar-right">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="signin-button">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <div className="user-section">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-full border-2 border-white/30 hover:border-white/50 transition-all duration-300",
                    userButtonPopoverCard: "bg-white/95 backdrop-blur-md border border-orange-200 shadow-2xl",
                    userButtonPopoverActions: "text-gray-700",
                    userButtonPopoverActionButton: "hover:bg-orange-50 text-gray-700 rounded-md transition-colors",
                    userButtonPopoverActionButtonText: "text-gray-700 font-medium",
                    userButtonPopoverFooter: "hidden"
                  }
                }}
                showName={false}
                userProfileMode="modal"
              />
            </div>
          </SignedIn>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(255, 107, 53, 0.1);
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          max-width: 100%;
          margin: 0 auto;
        }

        .navbar-left, .navbar-right {
          flex: 1;
          display: flex;
          align-items: center;
        }

        .navbar-right {
          justify-content: flex-end;
        }

        .navbar-center {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .app-name {
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(135deg, #ff6b35, #f7931e, #ffb74d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: flex;
          align-items: center;
          gap: 8px;
          text-shadow: 0 2px 4px rgba(255, 107, 53, 0.2);
          letter-spacing: -0.5px;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .app-icon {
          font-size: 20px;
          filter: drop-shadow(0 2px 4px rgba(255, 107, 53, 0.3));
        }

        .signin-button {
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          color: white;
          border: none;
          border-radius: 20px;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(255, 107, 53, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .signin-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 107, 53, 0.5);
          background: linear-gradient(135deg, #f7931e, #ff6b35);
        }

        .signin-button:active {
          transform: translateY(0);
        }

        .user-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .navbar-container {
            padding: 10px 16px;
          }

          .app-name {
            font-size: 20px;
          }

          .app-icon {
            font-size: 18px;
          }

          .signin-button {
            padding: 8px 16px;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .navbar-left, .navbar-right {
            flex: 0.8;
          }

          .navbar-center {
            flex: 1.4;
          }

          .app-name {
            font-size: 18px;
          }
        }
      `}</style>
    </nav>
  );
}