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
    top: 0; left: 0; right: 0;
    z-index: 1000;
    background: linear-gradient(100deg, #ff6b35 0%, #f7931e 60%, #ffb74d 100%);
    border-bottom: 2px solid #ff6b35;
    box-shadow: 0 4px 18px 0 rgba(255, 107, 53, 0.12);
    animation: navbarEnter 1s cubic-bezier(0.68,-0.55,0.27,1.55);
    min-height: 44px;
  }

  @keyframes navbarEnter {
    0% { transform: translateY(-60px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }

  .navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 20px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .navbar-left {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .navbar-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }

  .navbar-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
  }

  .app-name {
    font-size: 1.1rem;
    font-weight: 900;
    letter-spacing: -0.5px;
    display: flex;
    align-items: center;
    gap: 7px;
    background: linear-gradient(90deg, #fff 30%, #ffe0b2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 10px rgba(255, 123, 53, 0.10);
    filter: drop-shadow(0 1px 0 #ffb74d);
    text-transform: uppercase;
    font-family: 'Montserrat', system-ui, sans-serif;
    transition: letter-spacing 0.2s;
    white-space: nowrap;
  }

  .app-name:hover {
    letter-spacing: 1.5px;
  }

  .app-icon {
    font-size: 1.15rem;
    filter: drop-shadow(0 1px 4px rgba(255, 107, 53, 0.3));
    animation: iconBounce 1.2s infinite alternate;
  }

  @keyframes iconBounce {
    0% { transform: translateY(0);}
    100% { transform: translateY(-4px);}
  }

  .signin-button {
    background: linear-gradient(90deg, #ff6b35 60%, #f7931e 100%);
    color: #fff;
    border: none;
    border-radius: 999px;
    padding: 5px 16px;
    font-size: 0.92rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 2px 8px 0 rgba(255, 107, 53, 0.13);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: background 0.3s, transform 0.15s, box-shadow 0.2s;
    outline: 2px solid transparent;
  }

  .signin-button:hover {
    background: linear-gradient(90deg, #ffb74d 0%, #ff6b35 100%);
    transform: scale(1.03) translateY(-1px) rotate(-1deg);
    box-shadow: 0 4px 16px 0 rgba(255, 123, 53, 0.19);
    outline: 2px solid #ffb74d;
  }

  .user-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  @media (max-width: 900px) {
    .navbar-container {
      padding: 4px 10px;
    }
    .app-name {
      font-size: 0.95rem;
    }
    .app-icon {
      font-size: 0.95rem;
    }
    .signin-button {
      padding: 4px 10px;
      font-size: 0.85rem;
    }
  }

  @media (max-width: 600px) {
    .navbar-container {
      flex-direction: column;
      align-items: stretch;
      gap: 4px;
    }
    .navbar-left,
    .navbar-right,
    .navbar-center {
      flex: unset;
      width: 100%;
      justify-content: center;
    }
    .navbar-center {
      position: relative;
      left: 0;
      transform: none;
      text-align: center;
    }
    .app-name {
      font-size: 0.9rem;
    }
  }
`}</style>
  </nav>
  );
}