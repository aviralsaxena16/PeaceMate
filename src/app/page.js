'use client'
import React, { useState, useEffect } from 'react'
import { Star, Calendar, TrendingUp, Zap, Heart, Award, ArrowRight, Sparkles } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation';
import { SignIn, SignUp } from '@clerk/nextjs';
import { SignedIn ,SignedOut} from '@clerk/nextjs';
import Image from 'next/image';


const PeaceMateLanding = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('sign-in');
  const router=useRouter()

const Redirect = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/Home');
  }, [router]);
  return null;
};

  const handleOpen = (type) => {
    setMode(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const features = [
    { icon: <Star className="w-8 h-8" />, title: "Daily Reflection", desc: "Share your day with your AI buddy", color: "from-orange-400 to-red-500" },
    { icon: <Award className="w-8 h-8" />, title: "AI Feedback", desc: "Get personalized scores & tips", color: "from-yellow-400 to-orange-500" },
    { icon: <Calendar className="w-8 h-8" />, title: "Calendar View", desc: "Track your journey over time", color: "from-red-400 to-pink-500" },
    { icon: <TrendingUp className="w-8 h-8" />, title: "Weekly Insights", desc: "See your productivity trends", color: "from-pink-400 to-red-500" }
  ]

  
  const staticParticles = [
    { left: '10%', top: '20%', delay: '0s' },
    { left: '20%', top: '60%', delay: '1s' },
    { left: '80%', top: '30%', delay: '2s' },
    { left: '70%', top: '70%', delay: '0.5s' },
    { left: '30%', top: '80%', delay: '1.5s' },
    { left: '90%', top: '50%', delay: '2.5s' },
    { left: '5%', top: '40%', delay: '3s' },
    { left: '60%', top: '10%', delay: '2.2s' },
  ]

  return (
    <>
    <SignedOut>
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 relative overflow-hidden">
      {/* Static Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {staticParticles.map((particle, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: '4s'
            }}
          >
            <div className="w-2 h-2 bg-orange-300 rounded-full opacity-60"></div>
          </div>
        ))}
      </div>

      {/* Cursor Follower */}
      <div 
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePos.x - 10,
          top: mousePos.y - 10,
          transition: 'all 0.1s ease-out'
        }}
      >
        <div className="w-5 h-5 bg-white rounded-full opacity-80"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 p-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            PeaceMate- Made by Aviral Saxena
          </span>
        </div>
        <button onClick={() => handleOpen('sign-in')} className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-red-500 hover:to-orange-500">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-8 pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className={`lg:w-1/2 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-sm font-semibold mb-4">
                🎉 Meet Your New Best Friend!
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                End Your Day
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                With Insight
              </span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Your personal AI companion that listens to your daily journey, 
              gives you feedback, and helps you find peace in reflection. 🌟
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button onClick={() => handleOpen('sign-in')} className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-red-500 hover:to-orange-500 flex items-center justify-center">
                Login
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => handleOpen('sign-up')} className="px-8 py-4 border-2 border-orange-300 text-orange-700 rounded-2xl font-bold text-lg hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 hover:border-orange-500">
                Register
              </button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-orange-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full border-2 border-white"></div>
                </div>
                <span className="ml-3">Join us for your self-growth</span>
              </div>
            </div>
          </div>

          {/* Right Content - Mascot Muku */}
          <div className={`lg:w-1/2 flex justify-center transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            <div className="relative">
              {/* Glowing Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-red-300 rounded-full blur-3xl opacity-20 scale-110"></div>
              
              {/* Mascot Container */}
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                
                {/* Circular Image Placeholder for Muku */}
                <div className="flex flex-col items-center">
                  <div className="relative w-64 h-64 mb-6">
                    {/* Gradient Border */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 p-1">
                      <div className="w-full h-full rounded-full bg-white p-2">
                        <div className="w-full h-full rounded-full overflow-hidden shadow-lg">
                          <Image width={500} height={300}
                            src="/dog.jpg" 
                            alt="Muku" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                            />
                          <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 rounded-full items-center justify-center text-8xl hidden">
                            🐕
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Muku Description */}
                  <div className="text-center">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                      Meet Muku
                    </h3>
                    <p className="text-lg text-gray-700 font-medium mb-2">
                      Your Friendly AI Companion
                    </p>
                    <p className="text-gray-600 max-w-sm">
                      Muku is here to listen to your daily stories, provide thoughtful insights, and help you find peace through reflection.
                    </p>
                  </div>
                </div>
                
                {/* Floating Chat Bubbles */}
                <div className="absolute -left-8 top-1/3 transform -translate-y-1/2 animate-float">
                  <div className="bg-gradient-to-r from-pink-400 to-red-500 text-white px-4 py-2 rounded-2xl rounded-bl-sm text-sm font-semibold shadow-lg">
                    How was your day?
                  </div>
                </div>
                
                <div className="absolute -right-8 bottom-1/3 animate-float-delayed">
                  <div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-4 py-2 rounded-2xl rounded-br-sm text-sm font-semibold shadow-lg">
                    Great progress! 🌟
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Powerful Features for Your Growth
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to track, reflect, and improve your daily life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
              key={index}
                className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 text-white group-hover:rotate-12 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Get Ready to Find Peace Through Reflection
            </h2>
            <p className="text-xl text-orange-100 mb-8">
             Made By Aviral saxena
            </p>
            {/* <button className="group px-12 py-4 bg-white text-orange-600 rounded-2xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:bg-orange-50 flex items-center justify-center mx-auto">
              Get Started for Free
              <Zap className="ml-2 w-6 h-6 group-hover:text-yellow-500 transition-colors" />
            </button> */}
          </div>
        </div>
      </section>

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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
            }
            
            .animate-float-delayed {
              animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
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
    </div>
    </SignedOut>
   <SignedIn>
    <Redirect/>
   </SignedIn> 
   </>
  )
}

export default PeaceMateLanding